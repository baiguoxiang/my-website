import { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
    }> = [];

    const colors = ['#00d4ff', '#a855f7', '#ec4899', '#00ff88', '#ffff00'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)]
    });

    const init = () => {
      resize();
      for (let i = 0; i < 100; i++) {
        particles.push(createParticle());
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(')', `, ${p.alpha})`).replace('rgb', 'rgba');
        ctx.fill();

        particles.forEach((p2, index2) => {
          if (index === index2) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - distance / 150)})`;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const titleColors = ['#00d4ff', '#a855f7', '#ec4899', '#00ff88', '#ffff00'];

  const renderColorfulTitle = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="inline-block animate-float"
        style={{
          color: titleColors[i % titleColors.length],
          textShadow: `0 0 20px ${titleColors[i % titleColors.length]}, 0 0 40px ${titleColors[i % titleColors.length]}, 0 0 60px ${titleColors[i % titleColors.length]}`,
          animationDelay: `${i * 200}ms`
        }}
      >
        {char}
      </span>
    ));
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0f]" />
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#a855f7] flex items-center justify-center glow-blue">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-[#00d4ff] text-lg tracking-widest font-medium">OPC AI</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          {renderColorfulTitle('智能体超市')}
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-4 font-medium">
          <span className="text-[#00d4ff]">AI</span>产业联盟 · 一站式智能体服务平台
        </p>
        
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          整合前沿AI能力，为企业战略、产品策划、营销推广提供全方位智能解决方案
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-[#00d4ff]/30 mb-8">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-gray-300">
            <span className="text-[#00ff88]">公开访问</span> · 无需注册 · 点击即用
          </span>
        </div>
        
        <div className="mt-4 flex justify-center gap-4">
          <a
            href="#categories"
            className="group relative px-8 py-4 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 glow-blue"
          >
            <span className="relative z-10">探索智能体</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#ec4899] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>
        
        <div className="mt-20 flex justify-center">
          <div className="animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-[#00d4ff] flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-[#00d4ff] rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}