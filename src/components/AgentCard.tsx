import { ArrowUpRight, type LucideIcon } from 'lucide-react';

interface AgentCardProps {
  name: string;
  url: string;
  icon: LucideIcon;
  color: 'blue' | 'purple' | 'pink';
  index: number;
}

const colorSchemes = {
  blue: ['#00d4ff', '#00ff88', '#ffff00', '#ff6b6b', '#a855f7'],
  purple: ['#a855f7', '#ec4899', '#00d4ff', '#ffd700', '#ff6b9d'],
  pink: ['#ec4899', '#f472b6', '#00d4ff', '#a855f7', '#ffd700']
};

export function AgentCard({ name, url, icon: Icon, color, index }: AgentCardProps) {
  const colors = colorSchemes[color];
  const borderColors = {
    blue: 'border-[#00d4ff]/30 hover:border-[#00d4ff]',
    purple: 'border-[#a855f7]/30 hover:border-[#a855f7]',
    pink: 'border-[#ec4899]/30 hover:border-[#ec4899]'
  };
  const glowColors = {
    blue: 'group-hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]',
    purple: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]',
    pink: 'group-hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]'
  };
  const iconColors = {
    blue: 'text-[#00d4ff]',
    purple: 'text-[#a855f7]',
    pink: 'text-[#ec4899]'
  };
  const bgColors = {
    blue: 'group-hover:bg-[#00d4ff]/10',
    purple: 'group-hover:bg-[#a855f7]/10',
    pink: 'group-hover:bg-[#ec4899]/10'
  };

  const renderColorfulText = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="inline-block transition-all duration-300 hover:scale-125 hover:-translate-y-1"
        style={{
          color: colors[i % colors.length],
          textShadow: `0 0 10px ${colors[i % colors.length]}, 0 0 20px ${colors[i % colors.length]}`,
          animationDelay: `${i * 100}ms`
        }}
      >
        {char}
      </span>
    ));
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative p-6 rounded-xl bg-glass ${borderColors[color]} ${glowColors[color]} transition-all duration-500 hover:-translate-y-2 cursor-pointer`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`absolute inset-0 rounded-xl ${bgColors[color]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="absolute top-0 left-0 w-full h-1 rounded-t-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className={`w-14 h-14 rounded-xl bg-black/30 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${iconColors[color]}`}>
          <Icon className="w-7 h-7" />
        </div>
        
        <h3 className="text-lg font-bold mb-2 tracking-wide">
          {renderColorfulText(name)}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-white transition-colors duration-300">
          <span>立即使用</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
        </div>
      </div>
      
      <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ArrowUpRight className="w-4 h-4 text-white/50" />
      </div>
    </a>
  );
}