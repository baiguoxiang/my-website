const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const rootDir = __dirname;
const port = Number(process.env.PORT || 5177);
const upstreamBaseUrl = "https://xiaoji.baziapi.site/v1";
const defaultChatModel = process.env.PANDORA_CHAT_MODEL || "gpt-5.5";

loadEnv(path.join(path.dirname(rootDir), ".env"));
loadEnv(path.join(rootDir, ".env"));

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml; charset=utf-8",
  ".ico": "image/x-icon"
};

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const equalIndex = trimmed.indexOf("=");
    if (equalIndex === -1) continue;
    const key = trimmed.slice(0, equalIndex).trim();
    const value = trimmed.slice(equalIndex + 1).trim().replace(/^["']|["']$/g, "");
    if (key && !process.env[key]) process.env[key] = value;
  }
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
  });
  res.end(JSON.stringify(payload));
}

function getApiKey() {
  return process.env.PANDORA_XIAOJI_API_KEY || process.env.XIAOJI_API_KEY || process.env.OPENAI_API_KEY;
}

function sendStatic(req, res) {
  const requestUrl = new URL(req.url, `http://localhost:${port}`);
  const pathname = decodeURIComponent(requestUrl.pathname);
  const safePath = path.normalize(pathname === "/" ? "/index.html" : pathname).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(rootDir, safePath);

  if (!filePath.startsWith(rootDir) || path.basename(filePath).startsWith(".")) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(content);
  });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 16 * 1024 * 1024) {
        reject(new Error("上传图片不能超过 10MB。"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

async function readJson(req) {
  const body = await readBody(req);
  if (!body.length) return {};
  try {
    return JSON.parse(body.toString("utf8"));
  } catch {
    throw new Error("请求内容不是有效的 JSON。");
  }
}

function cleanText(value, limit = 1200) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function pickAllowed(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

function buildCopyPrompt(input) {
  const role = cleanText(input.role, 80) || "大学生女性创业者";
  const need = cleanText(input.need, 120) || "想低成本开始副业";
  const time = cleanText(input.time, 80) || "30分钟以内";
  const goal = cleanText(input.goal, 160) || "先完成体验，再学习内容表达和私域跟进";
  const scenario = cleanText(input.scenario, 80) || "朋友圈文案";
  const tone = cleanText(input.tone, 80) || "真诚温柔";
  const notes = cleanText(input.notes, 1600);
  const product = cleanText(input.product, 120) || "潘多拉之礼女性健康体验包、7天陪跑、AI内容成交工具、服务站合作路径";

  const outputMap = {
    "朋友圈文案": "输出 5 条朋友圈文案：体验型、成长型、招募型、客户见证型、行动邀约型。每条 80-140 字，像真人发朋友圈，不要硬广。",
    "私聊跟进话术": "输出 1 套微信私聊跟进：开场破冰、需求确认、体验包推荐、异议处理、下一步邀约。语气亲切，适合一对一发送。",
    "短视频口播": "输出 3 条短视频口播脚本：每条包含标题、前3秒钩子、60秒口播正文、结尾行动指令。",
    "招商邀约文案": "输出 3 条招商/合作邀约：适合服务站、美业门店、城市合伙人。强调低门槛试运营、真实体验、可复盘数据。",
    "小红书种草": "输出 3 篇小红书图文笔记：标题、正文、标签。风格真实、有画面感，避免夸张承诺。"
  };

  return [
    "你是潘多拉之礼的中文私域文案与女性轻创业转化顾问。",
    "请基于创业测评信息，生成可直接复制使用的中文文案。",
    "",
    "品牌与产品背景：",
    product,
    "",
    "用户测评信息：",
    `身份：${role}`,
    `当前需求：${need}`,
    `每天可投入时间：${time}`,
    `当前目标：${goal}`,
    `使用场景：${scenario}`,
    `语气风格：${tone}`,
    notes ? `补充信息：${notes}` : "补充信息：无",
    "",
    "输出要求：",
    outputMap[scenario] || outputMap["朋友圈文案"],
    "同时给出：1）推荐发布/跟进节奏；2）一句合规提醒。",
    "不要承诺保证赚钱、保证变美、零风险、治愈疾病、夸大收益；用真实体验、学习过程、陪跑、服务、复盘和轻创业路径来表达价值。",
    "格式清晰，使用小标题和编号，直接给结果，不要解释你是怎么生成的。"
  ].join("\n");
}

function extractChatAnswer(payload) {
  const choice = payload?.choices?.[0];
  return choice?.message?.content || choice?.text || "";
}

async function callChatCompletions(messages, options = {}) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("还没有配置 API Key。请在项目根目录 .env 里设置 PANDORA_XIAOJI_API_KEY。");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 90000);
  try {
    const response = await fetch(`${upstreamBaseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        model: cleanText(options.model, 80) || defaultChatModel,
        messages,
        temperature: Number.isFinite(Number(options.temperature)) ? Number(options.temperature) : 0.72,
        max_tokens: Number.isFinite(Number(options.max_tokens)) ? Number(options.max_tokens) : 1800
      }),
      signal: controller.signal
    });

    const text = await response.text();
    let payload;
    try {
      payload = text ? JSON.parse(text) : {};
    } catch {
      payload = { raw: text };
    }
    if (!response.ok) {
      const message = payload?.error?.message || payload?.message || payload?.msg || text || response.statusText;
      throw new Error(`对话模型请求失败：${message}`);
    }
    return payload;
  } finally {
    clearTimeout(timeout);
  }
}

async function generateCopy(req, res) {
  try {
    const body = await readJson(req);
    const prompt = buildCopyPrompt(body);
    const payload = await callChatCompletions([
      {
        role: "system",
        content: "你只输出适合中文私域运营的成品文案，保持真实、合规、可复制。"
      },
      {
        role: "user",
        content: prompt
      }
    ], {
      model: pickAllowed(cleanText(body.model, 80), ["gpt-5.5", "gpt-4o-mini"], defaultChatModel),
      temperature: 0.76,
      max_tokens: 2200
    });
    const answer = extractChatAnswer(payload);
    if (!answer) throw new Error("模型已返回，但没有拿到可展示的文案内容。");
    sendJson(res, 200, {
      ok: true,
      model: payload.model || body.model || defaultChatModel,
      answer
    });
  } catch (error) {
    sendJson(res, 500, {
      ok: false,
      error: error.name === "AbortError" ? "文案生成超时，请稍后再试。" : error.message
    });
  }
}

async function proxyImageEdit(req, res) {
  const apiKey = getApiKey();
  if (!apiKey) {
    sendJson(res, 500, {
      error: "还没有配置 API Key。请在项目根目录 .env 里设置 PANDORA_XIAOJI_API_KEY。"
    });
    return;
  }

  try {
    const body = await readBody(req);
    const contentType = req.headers["content-type"] || "";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 125000);
    const upstream = await fetch(`${upstreamBaseUrl}/images/edits`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": contentType
      },
      body,
      signal: controller.signal
    });
    clearTimeout(timeout);

    const text = await upstream.text();
    res.writeHead(upstream.status, {
      "Content-Type": upstream.headers.get("content-type") || "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
    });
    res.end(text);
  } catch (error) {
    sendJson(res, 500, {
      error: error.name === "AbortError" ? "图片生成超时，请稍后再试。" : error.message
    });
  }
}

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
    });
    res.end();
    return;
  }

  if (req.url === "/api/health") {
    sendJson(res, 200, { ok: true, hasKey: Boolean(getApiKey()), chatModel: defaultChatModel });
    return;
  }

  if (req.method === "POST" && req.url === "/api/generate-copy") {
    generateCopy(req, res);
    return;
  }

  if (req.method === "POST" && req.url === "/api/images/edits") {
    proxyImageEdit(req, res);
    return;
  }

  if (req.method === "GET" || req.method === "HEAD") {
    sendStatic(req, res);
    return;
  }

  sendJson(res, 405, { error: "Method not allowed" });
});

server.listen(port, () => {
  console.log(`Pandora site running at http://localhost:${port}`);
});
