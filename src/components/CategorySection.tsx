import { Target, Package, Megaphone, type LucideIcon } from 'lucide-react';
import { AgentCard } from './AgentCard';
import { type Category } from '@/data/agents';

interface CategorySectionProps {
  category: Category;
}

const iconMap: Record<string, LucideIcon> = {
  Target,
  Package,
  Megaphone,
  TrendingUp: Target,
  Award: Target,
  MessageSquare: Target,
  Lightbulb: Package,
  BookOpen: Megaphone,
  Sparkles: Megaphone,
  Zap: Megaphone,
  Camera: Megaphone,
  Video: Megaphone,
  FileText: Megaphone
};

const titleColors = {
  blue: ['#00d4ff', '#00ff88', '#ffff00'],
  purple: ['#a855f7', '#ec4899', '#00d4ff'],
  pink: ['#ec4899', '#f472b6', '#a855f7']
};

const renderColorfulTitle = (text: string, colors: string[]) => {
  return text.split('').map((char, i) => (
    <span
      key={i}
      style={{
        color: colors[i % colors.length],
        textShadow: `0 0 15px ${colors[i % colors.length]}, 0 0 30px ${colors[i % colors.length]}`,
        animationDelay: `${i * 150}ms`
      }}
    >
      {char}
    </span>
  ));
};

export function CategorySection({ category }: CategorySectionProps) {
  const Icon = iconMap[category.icon] || Target;
  const colors = titleColors[category.color];
  
  const colorClasses = {
    blue: {
      border: 'border-[#00d4ff]/30',
      glow: 'shadow-[0_0_30px_rgba(0,212,255,0.2)]',
      text: 'text-[#00d4ff]',
      gradient: 'from-[#00d4ff]/10 to-transparent'
    },
    purple: {
      border: 'border-[#a855f7]/30',
      glow: 'shadow-[0_0_30px_rgba(168,85,247,0.2)]',
      text: 'text-[#a855f7]',
      gradient: 'from-[#a855f7]/10 to-transparent'
    },
    pink: {
      border: 'border-[#ec4899]/30',
      glow: 'shadow-[0_0_30px_rgba(236,72,153,0.2)]',
      text: 'text-[#ec4899]',
      gradient: 'from-[#ec4899]/10 to-transparent'
    }
  };

  const colorClass = colorClasses[category.color];

  return (
    <div className="relative">
      <div className={`absolute -inset-4 bg-gradient-to-b ${colorClass.gradient} rounded-2xl opacity-50`} />
      
      <div className={`relative p-6 rounded-2xl bg-glass ${colorClass.border} ${colorClass.glow} backdrop-blur-xl`}>
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center ${colorClass.text}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {renderColorfulTitle(category.name, colors)}
            </h2>
            <p className="text-sm text-gray-500">
              {category.agents.length} 个智能体
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {category.agents.map((agent, index) => (
            <AgentCard
              key={agent.id}
              name={agent.name}
              url={agent.url}
              icon={iconMap[agent.icon] || Target}
              color={category.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}