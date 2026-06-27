const personas = {
  student: {
    title: "大学生创业学习：和同学一起学 AI、表达和轻创业",
    img: "./assets/female-retail-learning-yoga-triptych.png",
    desc: "适合想低成本尝试创业、愿意和同学伙伴一起学习短视频、AI工具和女性健康服务表达的大学生女生。",
    points: ["校园伙伴学习小组", "AI选题和口播训练", "低成本轻创业起步"]
  },
  mom: {
    title: "宝妈创业学习：开心结伴，一边顾家一边轻量成长",
    img: "./assets/female-business-wellness-triptych.png",
    desc: "适合希望兼顾家庭和成长的宝妈，从真实体验、真实分享和社群陪跑开始，轻一点也能慢慢做起来。",
    points: ["宝妈社群陪跑", "真实体验更有信任", "内容表达不硬卖"]
  },
  beauty: {
    title: "美容院合作：让门店客户体验、学习、复购更自然",
    img: "./assets/female-business-wellness-triptych.png",
    desc: "适合美容院、皮肤管理和私域门店，用体验包、AI测评和回访SOP提高客户互动与复购。",
    points: ["30个老客户测试", "7天打卡回访", "14天试运营"]
  },
  wellness: {
    title: "康养店合作：把体验、服务和转介绍连成一条线",
    img: "./assets/female-retail-learning-yoga-triptych.png",
    desc: "适合康养店、健康馆和本地服务站，把活动、学习、客户体验和合作节奏串起来。",
    points: ["城市合作点", "线下学习与活动", "客户承接和复购"]
  }
};

const personaCard = document.querySelector("#personaCard");

function renderPersona(key) {
  const p = personas[key];
  personaCard.innerHTML = `
    <div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="persona-points">${p.points.map((x) => `<span>${x}</span>`).join("")}</div>
    </div>
    <img src="${p.img}" alt="${p.title}">
  `;
}

renderPersona("student");

document.querySelectorAll(".audience-tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".audience-tab").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderPersona(btn.dataset.persona);
  });
});

const products = {
  starter: {
    title: "100元体验包",
    img: "./assets/female-business-wellness-triptych.png",
    text: "低门槛体验入口，让新客户先感受女性健康产品和服务流程。适合大学生、宝妈、门店客户第一次了解潘多拉。"
  },
  ritual: {
    title: "7天美丽健康陪跑",
    img: "./assets/female-retail-learning-yoga-triptych.png",
    text: "通过打卡、回访、AI测评和内容引导建立信任，让体验从一次购买变成持续关系。"
  },
  station: {
    title: "门店试运营",
    img: "./assets/female-business-wellness-triptych.png",
    text: "美容院或康养店先用 30 个老客户做 14 天试运营，用真实数据判断客户激活、复购和合作潜力。"
  }
};

const modal = document.querySelector("#productModal");
const modalContent = document.querySelector("#modalContent");

document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("click", () => {
    const p = products[card.dataset.product];
    modalContent.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <h2>${p.title}</h2>
      <p>${p.text}</p>
      <a class="btn primary" href="#contact">预约了解</a>
    `;
    modal.classList.add("open");
  });
});

document.querySelector("#modalClose").addEventListener("click", () => modal.classList.remove("open"));
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.classList.remove("open");
});

const agents = [
  ["成交话术", "客户问价格、效果、怎么加入时，智能体生成更像真人的微信回复。", "示例：姐，你可以先从 7 天体验开始，适合再继续，不适合也没有压力。"],
  ["朋友圈文案", "生成体验型、成长型、招募型朋友圈，让客户持续看见价值。", "示例：轻创业不是一上来重投入，而是先从真实体验和真实分享开始。"],
  ["短视频脚本", "为大学生女生、宝妈、门店伙伴生成口播选题和分镜。", "示例：如果你也想低成本开始女性健康轻创业，先别急着囤货，先学会这 3 件事。"],
  ["服务站复盘", "根据邀约人数、体验人数、客户反馈，生成下一步动作。", "示例：下一轮把客户分为高温、中温、低温，高温推进复购，中温继续回访。"]
];

const menu = document.querySelector("#agentMenu");
const demo = document.querySelector("#agentDemo");
const quizForm = document.querySelector("#quizForm");
const quizResult = document.querySelector("#quizResult");
const copyGenForm = document.querySelector("#copyGenForm");
const copyGenOutput = document.querySelector("#copyGenOutput");
const copyGenStatus = document.querySelector("#copyGenStatus");
const copyCopyOutput = document.querySelector("#copyCopyOutput");

const quizState = {
  role: "大学生创业学习者",
  need: "想低成本开始副业",
  time: "30分钟以内"
};

let latestCopyText = "";

function getCopyApiEndpoint() {
  return window.location.protocol === "file:"
    ? "http://localhost:5177/api/generate-copy"
    : "/api/generate-copy";
}

function buildMatchedRecommendation() {
  const map = {
    "大学生创业学习者": {
      title: "校园轻创业路径",
      intro: "先从低成本体验和同学伙伴分享开始，适合先建立表达和内容习惯。",
      tags: ["校园社群", "AI口播", "低成本起步"]
    },
    "宝妈创业学习者": {
      title: "宝妈轻量成长路径",
      intro: "先从真实体验、真实分享和熟人信任开始，更适合兼顾家庭节奏。",
      tags: ["真实体验", "社群陪跑", "轻量内容"]
    },
    "美容院合作伙伴": {
      title: "美容院激活路径",
      intro: "先用体验包和 7 天回访激活老客，再把内容和私聊变成稳定动作。",
      tags: ["老客激活", "私聊跟进", "门店复购"]
    },
    "康养店合作伙伴": {
      title: "康养店合作路径",
      intro: "先承接体验、学习、活动和复购，适合做本地合作和场景转化。",
      tags: ["本地合作", "活动承接", "复购复盘"]
    }
  };

  const entry = map[quizState.role] || map["大学生创业学习者"];
  const needText = quizState.need || "想低成本开始副业";
  const timeText = quizState.time || "30分钟以内";
  return `
    <div class="copygen-result-head">
      <strong>${entry.title}</strong>
      <span>${needText} · 每天${timeText}</span>
    </div>
    <p>${entry.intro}</p>
    <div class="tag-row">${entry.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
  `;
}

function syncQuizStateFromForm() {
  const data = new FormData(quizForm);
  quizState.role = data.get("role") || quizState.role;
  quizState.need = data.get("need") || quizState.need;
  quizState.time = data.get("time") || quizState.time;
}

function renderCopyResult(text) {
  copyGenOutput.innerHTML = `<div class="copygen-rendered">${text}</div>`;
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand("copy");
  textarea.remove();
  if (!ok) throw new Error("浏览器没有开放剪贴板权限。");
  return true;
}

function selectCopyOutputText() {
  const target = copyGenOutput.querySelector("pre") || copyGenOutput;
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(target);
  selection.removeAllRanges();
  selection.addRange(range);
}

function renderAgent(index) {
  menu.innerHTML = agents.map((a, idx) => `<button class="${idx === index ? "active" : ""}" data-i="${idx}">${a[0]}</button>`).join("");
  demo.innerHTML = `
    <h3>${agents[index][0]}</h3>
    <p>${agents[index][1]}</p>
    <div class="demo-output">${agents[index][2]}</div>
    <a class="btn primary" href="#quiz">匹配我的路径</a>
  `;
  menu.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => renderAgent(Number(button.dataset.i)));
  });
}

renderAgent(0);

const imageGenForm = document.querySelector("#imageGenForm");
const productImageInput = document.querySelector("#productImageInput");
const uploadedPreview = document.querySelector("#uploadedPreview");
const uploadLabel = document.querySelector("#uploadLabel");
const generatedGrid = document.querySelector("#generatedGrid");
const imageGenStatus = document.querySelector("#imageGenStatus");
let currentProductImageUrl = "";
let generatedItems = [];

const imagePackTemplates = [
  {
    title: "商品主图",
    tag: "MAIN",
    className: "hero-shot",
    ratio: "1:1",
    purpose: "适合官网首屏、电商主图和课程现场展示。",
    visual: "明亮女性创业风产品摄影，干净背景，产品居中，柔和自然光"
  },
  {
    title: "核心卖点图",
    tag: "VALUE",
    className: "benefit-shot",
    ratio: "4:5",
    purpose: "把产品卖点变成客户一眼能看懂的详情页图。",
    visual: "产品旁边有清晰卖点排版，质感专业，适合详情页第二屏"
  },
  {
    title: "女性健康场景图",
    tag: "SCENE",
    className: "scene-shot",
    ratio: "4:5",
    purpose: "展示女性健康、美业护理、轻养护的生活场景。",
    visual: "明亮自然的女性健康体验场景，人物自信放松，产品自然出现"
  },
  {
    title: "大学生创业图",
    tag: "STUDENT",
    className: "social-shot",
    ratio: "4:5",
    purpose: "用于校园女性创业、社群招募和学习打卡传播。",
    visual: "大学生女生伙伴一起学习创业，年轻、开心、干净、有行动感"
  },
  {
    title: "宝妈创业图",
    tag: "MOM",
    className: "warm-shot",
    ratio: "4:5",
    purpose: "表达宝妈低门槛轻创业、兼顾家庭和成长的状态。",
    visual: "宝妈伙伴开心交流，温柔明亮，不焦虑，产品作为可信体验入口"
  },
  {
    title: "美容院合作图",
    tag: "BEAUTY",
    className: "sage-shot",
    ratio: "16:9",
    purpose: "适合讲美容院、皮肤管理和线下沙龙合作。",
    visual: "女性合作伙伴围坐讨论美容院方案，像明亮的门店工作坊"
  },
  {
    title: "康养店合作图",
    tag: "WELLNESS",
    className: "store-shot",
    ratio: "16:9",
    purpose: "给康养店、健康馆、私域门店看合作应用场景。",
    visual: "高级康养门店接待区，女性客户体验产品，专业但不强销售"
  },
  {
    title: "小红书封面",
    tag: "RED",
    className: "social-shot",
    ratio: "3:4",
    purpose: "适合种草笔记、活动招募、课程现场朋友圈转发。",
    visual: "小红书风封面，明亮、漂亮、标题醒目，女性轻创业氛围"
  },
  {
    title: "朋友圈海报",
    tag: "WECHAT",
    className: "benefit-shot",
    ratio: "3:4",
    purpose: "用于私域发布，让客户看到产品体验和创业机会。",
    visual: "朋友圈海报风格，真实亲近，产品图和一句清晰主张"
  },
  {
    title: "招商说明图",
    tag: "PARTNER",
    className: "hero-shot",
    ratio: "16:9",
    purpose: "适合课程展示、招商会、服务站合作说明。",
    visual: "女性创业平台视觉，清晰展示合作路径和伙伴成长感"
  },
  {
    title: "详情页长图结构",
    tag: "DETAIL",
    className: "scene-shot",
    ratio: "9:16",
    purpose: "生成整套详情页排版逻辑，方便后续继续扩展成多张图。",
    visual: "商品详情页长图框架，包含主图、卖点、场景、人群、合作入口"
  },
  {
    title: "成交话术图",
    tag: "CHAT",
    className: "warm-shot",
    ratio: "4:5",
    purpose: "把产品图和一段温柔成交话术结合，适合私聊跟进。",
    visual: "微信私域风但高级克制，产品旁边配温柔可信的成交提示"
  }
];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function getImageGenValues() {
  const data = new FormData(imageGenForm);
  return {
    productName: data.get("productName") || "女性健康体验包",
    sellingPoint: data.get("sellingPoint") || "轻养护体验、7天陪跑、适合女性轻创业分享",
    audience: data.get("audience") || "大学生创业学习",
    style: data.get("style") || "明亮女性学习风"
  };
}

function buildImagePrompt(template, values) {
  return [
    `参考上传产品图，生成${template.title}。`,
    `产品：${values.productName}。卖点：${values.sellingPoint}。`,
    `人群：${values.audience}。风格：${values.style}。`,
    `画面：${template.visual}。用途：${template.purpose}。比例：${template.ratio}。`,
    "保持产品外观真实，不改变包装文字、颜色和形状。整体像女性创业学习平台的专业详情页素材。"
  ].join("\n");
}

function renderImagePack(values = getImageGenValues()) {
  generatedItems = imagePackTemplates.map((template) => ({
    ...template,
    prompt: buildImagePrompt(template, values),
    productName: values.productName,
    sellingPoint: values.sellingPoint,
    audience: values.audience,
    style: values.style
  }));

  generatedGrid.innerHTML = generatedItems.map((item, index) => {
    const imageSrc = item.resultUrl || currentProductImageUrl || `./assets/${index % 2 === 0 ? "female-business-wellness-triptych.png" : "female-retail-learning-yoga-triptych.png"}`;
    return `
      <article class="generated-card ${item.className}" data-index="${index}" tabindex="0" role="button" aria-label="查看${escapeHtml(item.title)}">
        <em>${item.tag}</em>
        <div class="generated-visual">
          <img src="${imageSrc}" alt="${escapeHtml(item.productName)}">
          <small>${escapeHtml(item.ratio)}</small>
        </div>
        <b>${escapeHtml(item.title)}</b>
        <span>${escapeHtml(item.purpose)}</span>
        <div class="generated-status">${item.resultUrl ? "已生成真实AI图" : "方案预览"}</div>
        <div class="generated-actions">
          <button class="mini-btn real-btn" type="button" data-generate-index="${index}">真实生成</button>
          <button class="mini-btn" type="button" data-copy-index="${index}">复制提示词</button>
        </div>
      </article>
    `;
  }).join("");

  generatedGrid.querySelectorAll(".generated-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      openGeneratedDetail(Number(card.dataset.index));
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openGeneratedDetail(Number(card.dataset.index));
      }
    });
  });

  generatedGrid.querySelectorAll(".mini-btn").forEach((button) => {
    if (button.hasAttribute("data-copy-index")) {
      button.addEventListener("click", () => copyGeneratedPrompt(Number(button.dataset.copyIndex), button));
    }
    if (button.hasAttribute("data-generate-index")) {
      button.addEventListener("click", () => generateRealImage(Number(button.dataset.generateIndex), button));
    }
  });
}

function openGeneratedDetail(index) {
  const item = generatedItems[index];
  if (!item) return;
  const imageSrc = item.resultUrl || currentProductImageUrl || `./assets/${index % 2 === 0 ? "female-business-wellness-triptych.png" : "female-retail-learning-yoga-triptych.png"}`;
  modalContent.innerHTML = `
    <img src="${imageSrc}" alt="${escapeHtml(item.productName)}">
    <h2>${escapeHtml(item.title)}</h2>
    <p>${escapeHtml(item.purpose)}</p>
    <div class="prompt-box">
      <strong>给生图接口的提示词</strong>
      <pre>${escapeHtml(item.prompt)}</pre>
    </div>
    <button class="btn primary" type="button" id="copyModalPrompt">复制这张图的提示词</button>
  `;
  modal.classList.add("open");
  document.querySelector("#copyModalPrompt").addEventListener("click", (event) => copyText(item.prompt, event.currentTarget));
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

async function copyText(text, button) {
  const originalText = button.textContent;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      fallbackCopy(text);
    }
    button.textContent = "已复制";
  } catch {
    button.textContent = "复制失败";
  }
  window.setTimeout(() => {
    button.textContent = originalText;
  }, 1400);
}

function copyGeneratedPrompt(index, button) {
  const item = generatedItems[index];
  if (!item) return;
  copyText(item.prompt, button);
}

function sizeForRatio(ratio) {
  if (ratio === "16:9") return "1792x1024";
  if (ratio === "9:16" || ratio === "3:4") return "1024x1792";
  return "1024x1024";
}

function extractImageUrl(payload) {
  const first = payload && payload.data && payload.data[0];
  if (!first) return "";
  if (first.url) return first.url;
  if (first.b64_json) return `data:image/png;base64,${first.b64_json}`;
  return "";
}

async function generateRealImage(index, button) {
  const item = generatedItems[index];
  const file = productImageInput.files[0];
  if (!item) return;
  if (!file) {
    imageGenStatus.textContent = "请先上传一张产品图片，再生成真实AI图。";
    imageGenStatus.classList.add("error");
    productImageInput.focus();
    return;
  }

  const originalText = button.textContent;
  const card = button.closest(".generated-card");
  button.disabled = true;
  button.textContent = "生成中...";
  card.classList.add("is-generating");
  imageGenStatus.classList.remove("error");
  imageGenStatus.textContent = `正在生成「${item.title}」，图片任务可能需要 60-90 秒，请先不要关闭页面。`;

  try {
    const formData = new FormData();
    formData.append("model", "gpt-image-2");
    formData.append("prompt", item.prompt);
    formData.append("image", file);
    formData.append("n", "1");
    formData.append("size", sizeForRatio(item.ratio));
    formData.append("response_format", "url");

    const endpoint = window.location.protocol === "file:"
      ? "http://localhost:5177/api/images/edits"
      : "/api/images/edits";
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData
    });
    const payload = await response.json();
    if (!response.ok) {
      const message = payload.error && payload.error.message ? payload.error.message : payload.error;
      throw new Error(message || "图片生成失败，请稍后再试。");
    }
    const resultUrl = extractImageUrl(payload);
    if (!resultUrl) throw new Error("接口已返回，但没有拿到图片地址。");
    generatedItems[index].resultUrl = resultUrl;
    imageGenStatus.textContent = `「${item.title}」已生成，可以点击卡片查看大图和提示词。`;
    renderExistingImagePack();
  } catch (error) {
    imageGenStatus.textContent = error.message || "图片生成失败，请稍后再试。";
    imageGenStatus.classList.add("error");
  } finally {
    button.disabled = false;
    button.textContent = originalText;
    card.classList.remove("is-generating");
  }
}

function renderExistingImagePack() {
  const existing = generatedItems;
  generatedItems = existing;
  generatedGrid.innerHTML = existing.map((item, index) => {
    const imageSrc = item.resultUrl || currentProductImageUrl || `./assets/${index % 2 === 0 ? "female-business-wellness-triptych.png" : "female-retail-learning-yoga-triptych.png"}`;
    return `
      <article class="generated-card ${item.className}" data-index="${index}" tabindex="0" role="button" aria-label="查看${escapeHtml(item.title)}">
        <em>${item.tag}</em>
        <div class="generated-visual">
          <img src="${imageSrc}" alt="${escapeHtml(item.productName)}">
          <small>${escapeHtml(item.ratio)}</small>
        </div>
        <b>${escapeHtml(item.title)}</b>
        <span>${escapeHtml(item.purpose)}</span>
        <div class="generated-status">${item.resultUrl ? "已生成真实AI图" : "方案预览"}</div>
        <div class="generated-actions">
          <button class="mini-btn real-btn" type="button" data-generate-index="${index}">真实生成</button>
          <button class="mini-btn" type="button" data-copy-index="${index}">复制提示词</button>
        </div>
      </article>
    `;
  }).join("");

  generatedGrid.querySelectorAll(".generated-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      openGeneratedDetail(Number(card.dataset.index));
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openGeneratedDetail(Number(card.dataset.index));
      }
    });
  });
  generatedGrid.querySelectorAll("[data-copy-index]").forEach((button) => {
    button.addEventListener("click", () => copyGeneratedPrompt(Number(button.dataset.copyIndex), button));
  });
  generatedGrid.querySelectorAll("[data-generate-index]").forEach((button) => {
    button.addEventListener("click", () => generateRealImage(Number(button.dataset.generateIndex), button));
  });
}

productImageInput.addEventListener("change", () => {
  const file = productImageInput.files[0];
  if (!file) return;
  if (currentProductImageUrl) URL.revokeObjectURL(currentProductImageUrl);
  currentProductImageUrl = URL.createObjectURL(file);
  uploadLabel.textContent = file.name.length > 18 ? `${file.name.slice(0, 18)}...` : file.name;
  uploadedPreview.innerHTML = `<img src="${currentProductImageUrl}" alt="上传的产品图预览">`;
  imageGenStatus.classList.remove("error");
  imageGenStatus.textContent = "产品图已上传。你可以先生成图片包方案，再挑一张真实AI生成。";
  renderImagePack();
});

imageGenForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = imageGenForm.querySelector("button[type='submit']");
  const originalText = button.textContent;
  button.textContent = "生成中...";
  window.setTimeout(() => {
    renderImagePack();
    button.textContent = originalText;
    generatedGrid.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 360);
});

renderImagePack();

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  syncQuizStateFromForm();
  quizResult.innerHTML = `推荐路径：${quizState.role}适合从「${quizState.need}」开始。建议先体验女性健康产品，再用AI工具做内容表达，每天投入${quizState.time}即可启动第一阶段。`;
});

copyGenForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  syncQuizStateFromForm();
  const data = new FormData(copyGenForm);
  const button = copyGenForm.querySelector("button[type='submit']");
  const originalText = button.textContent;
  const payload = {
    role: quizState.role,
    need: quizState.need,
    time: quizState.time,
    goal: `${quizState.need}，并把它变成可直接发布的文案`,
    scenario: data.get("scenario"),
    tone: data.get("tone"),
    product: data.get("product"),
    notes: data.get("notes"),
    model: "gpt-5.5"
  };

  button.disabled = true;
  button.textContent = "生成中...";
  copyGenStatus.textContent = "正在调用对话模型生成文案。";
  copyGenStatus.classList.remove("error");
  renderCopyResult('<div class="copygen-empty"><strong>生成中</strong><span>模型正在组织内容。</span></div>');

  try {
    const response = await fetch(getCopyApiEndpoint(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok || !result.ok) {
      throw new Error((result && result.error) || "文案生成失败，请稍后再试。");
    }
    latestCopyText = result.answer || "";
    renderCopyResult(`<pre>${escapeHtml(result.answer)}</pre>`);
    copyGenStatus.textContent = `已生成 ${data.get("scenario")}，可以直接复制使用。`;
  } catch (error) {
    latestCopyText = "";
    renderCopyResult(`<div class="copygen-empty error"><strong>生成失败</strong><span>${escapeHtml(error.message || "请稍后再试")}</span></div>`);
    copyGenStatus.textContent = error.message || "文案生成失败";
    copyGenStatus.classList.add("error");
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
});

copyCopyOutput.addEventListener("click", async () => {
  if (!latestCopyText) {
    copyGenStatus.textContent = "当前没有可复制的结果，请先生成文案。";
    copyGenStatus.classList.add("error");
    return;
  }
  const originalText = copyCopyOutput.textContent;
  try {
    await copyTextToClipboard(latestCopyText);
    copyCopyOutput.textContent = "已复制";
    copyGenStatus.textContent = "文案已复制到剪贴板。";
    copyGenStatus.classList.remove("error");
  } catch {
    selectCopyOutputText();
    copyCopyOutput.textContent = "已选中";
    copyGenStatus.textContent = "浏览器拦截了自动复制，文案已选中，可直接按 Ctrl+C。";
    copyGenStatus.classList.remove("error");
  } finally {
    window.setTimeout(() => {
      copyCopyOutput.textContent = originalText;
    }, 1400);
  }
});

document.querySelector("#contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  document.querySelector("#formResult").textContent = `${data.get("name")}，已收到你的${data.get("type")}预约需求，后续可接入企业微信或表单系统。`;
});
