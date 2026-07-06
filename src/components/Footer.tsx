import { Sparkles, Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative py-16 px-4 border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-t from-[#00d4ff]/5 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#a855f7] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-lg">OPC AI</span>
              <p className="text-gray-500 text-sm">智能体超市</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#00d4ff] hover:bg-white/10 transition-all duration-300">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#00d4ff] hover:bg-white/10 transition-all duration-300">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-500 text-sm">
              © 2026 OPC AI. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs mt-1">
              AI产业联盟 · 赋能未来
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-[#00d4ff] transition-colors duration-300">关于我们</a>
            <a href="#" className="hover:text-[#00d4ff] transition-colors duration-300">联系我们</a>
            <a href="#" className="hover:text-[#00d4ff] transition-colors duration-300">服务条款</a>
            <a href="#" className="hover:text-[#00d4ff] transition-colors duration-300">隐私政策</a>
          </div>
        </div>
      </div>
    </footer>
  );
}