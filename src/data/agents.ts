export interface Agent {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: 'blue' | 'purple' | 'pink';
  agents: Agent[];
}

export const categories: Category[] = [
  {
    id: 'strategy',
    name: '战略板块',
    icon: 'Target',
    color: 'blue',
    agents: [
      {
        id: 'business-insight',
        name: '商业洞察专家',
        url: 'https://www.coze.cn/s/CwbUV6CJBgY/',
        icon: 'TrendingUp'
      },
      {
        id: 'brand-marketing',
        name: '顶级品牌营销策划专家',
        url: 'https://www.coze.cn/s/_k6c7TCs4VI/',
        icon: 'Award'
      },
      {
        id: 'negotiation',
        name: '商业谈判专家',
        url: 'https://www.coze.cn/s/oraKv4vY2G8/',
        icon: 'MessageSquare'
      }
    ]
  },
  {
    id: 'product',
    name: '产品板块',
    icon: 'Package',
    color: 'purple',
    agents: [
      {
        id: 'product-planning',
        name: '产品策划专家',
        url: 'https://www.coze.cn/s/1XgR6j6Xrps/',
        icon: 'Lightbulb'
      }
    ]
  },
  {
    id: 'marketing',
    name: '营销板块',
    icon: 'Megaphone',
    color: 'pink',
    agents: [
      {
        id: 'xiaohongshu',
        name: '小红书生产机器',
        url: 'https://www.coze.cn/s/rwGIsPSX6jM/',
        icon: 'BookOpen'
      },
      {
        id: 'pandora',
        name: '潘多拉智能体',
        url: 'https://www.coze.cn/s/xxw35h5xj9E/',
        icon: 'Sparkles'
      },
      {
        id: 'viral-replica',
        name: '爆款复刻',
        url: 'https://www.coze.cn/s/SNsDUImDdCU/',
        icon: 'Zap'
      },
      {
        id: 'ip-content',
        name: 'IP内容生产',
        url: 'https://www.coze.cn/space/7608459362386591763/bot/7643437263460270099',
        icon: 'Camera'
      },
      {
        id: 'short-video',
        name: '热点短视频文案编导',
        url: 'https://www.coze.cn/s/IJrSxt3oUPM/',
        icon: 'Video'
      },
      {
        id: 'batch-copy',
        name: '批量自媒体文案',
        url: 'https://www.coze.cn/s/6C-4hJCIwIM/',
        icon: 'FileText'
      }
    ]
  }
];