import React, { useState } from 'react';
import '../styles/index.css';

// 咖啡数据
const coffeeData = [
  {
    id: 'coffee1',
    name: '手冲肯尼亚AA',
    type: '手冲',
    image: './src/assets/coffee/肯尼亚风味.jpg',
    description: '来自肯尼亚的高山咖啡豆，带有明亮的酸度和浓郁的莓果香气。',
    rating: 5,
    roastLevel: '中浅烘',
    origin: '肯尼亚',
    brewTime: '3-4分钟',
    tasteNotes: ['莓果', '柑橘', '黑巧克力'],
    location: '星巴克臻选店'
  },
  {
    id: 'coffee2',
    name: '西班牙风味拿铁',
    type: '意式',
    image: './src/assets/coffee/西班牙风味拿铁.jpg',
    description: '浓郁的意式浓缩与丝滑的牛奶完美结合，带有淡淡的甜味。',
    rating: 4,
    roastLevel: '中烘',
    origin: '哥伦比亚',
    brewTime: '2-3分钟',
    tasteNotes: ['焦糖', '坚果', '牛奶巧克力'],
    location: '独立咖啡店'
  },
  {
    id: 'coffee3',
    name: '低温Dirty',
    type: '冷萃',
    image: './src/assets/coffee/低温dirty.jpg',
    description: '冰牛奶与浓缩咖啡的经典结合，层次分明，口感丰富。',
    rating: 5,
    roastLevel: '中深烘',
    origin: '巴西',
    brewTime: '5分钟',
    tasteNotes: ['黑巧克力', '焦糖', '烤杏仁'],
    location: '网红咖啡馆'
  },
  {
    id: 'coffee4',
    name: '黄油Pro拿铁',
    type: '意式',
    image: './src/assets/coffee/黄油pro拿铁.jpg',
    description: '加入黄油的创新拿铁，口感丰富顺滑，带有独特的黄油香气。',
    rating: 4,
    roastLevel: '中烘',
    origin: '危地马拉',
    brewTime: '3分钟',
    tasteNotes: ['黄油', '焦糖', '烤面包'],
    location: '精品咖啡店'
  },
  {
    id: 'coffee5',
    name: '印尼手冲',
    type: '手冲',
    image: './src/assets/coffee/印度尼西亚手冲咖啡.jpg',
    description: '印度尼西亚产区的特色咖啡，带有独特的草药和香料风味。',
    rating: 5,
    roastLevel: '中深烘',
    origin: '印度尼西亚',
    brewTime: '4分钟',
    tasteNotes: ['草药', '香料', '木质调'],
    location: '手冲专门店'
  },
  {
    id: 'coffee6',
    name: '星巴克臻选',
    type: '手冲',
    image: './src/assets/coffee/星巴克臻选系列.jpg',
    description: '星巴克高端系列咖啡，精选全球优质产区咖啡豆。',
    rating: 4,
    roastLevel: '中烘',
    origin: '多产区',
    brewTime: '3-4分钟',
    tasteNotes: ['坚果', '巧克力', '焦糖'],
    location: '星巴克臻选店'
  },
  {
    id: 'coffee7',
    name: 'Peet\'s Coffee',
    type: '意式',
    image: './src/assets/coffee/peet‘s.jpg',
    description: '美式精品咖啡代表，浓郁醇厚的经典美式风味。',
    rating: 4,
    roastLevel: '深烘',
    origin: '美国',
    brewTime: '2分钟',
    tasteNotes: ['烤坚果', '黑巧克力', '焦糖'],
    location: 'Peet\'s Coffee'
  },
  {
    id: 'coffee8',
    name: '冰淇淋饼干咖啡',
    type: '创意',
    image: './src/assets/coffee/冰淇淋饼干咖啡.jpg',
    description: '创意咖啡饮品，结合冰淇淋和饼干的风味，口感丰富。',
    rating: 5,
    roastLevel: '中烘',
    origin: '混合',
    brewTime: '5分钟',
    tasteNotes: ['冰淇淋', '饼干', '焦糖'],
    location: '创意咖啡店'
  },
  {
    id: 'coffee9',
    name: '秋季限定枫糖',
    type: '季节限定',
    image: './src/assets/coffee/秋季限定枫糖.jpg',
    description: '秋季限定枫糖风味咖啡，带有枫糖的甜美香气。',
    rating: 4,
    roastLevel: '中烘',
    origin: '加拿大',
    brewTime: '3分钟',
    tasteNotes: ['枫糖', '坚果', '焦糖'],
    location: '季节限定店'
  }
];

const Coffee: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const filteredCoffee = selectedType === 'all' 
    ? coffeeData 
    : coffeeData.filter(coffee => coffee.type === selectedType);

  const toggleCardExpansion = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const coffeeTypes = ['all', ...new Set(coffeeData.map(coffee => coffee.type))];
  const typeLabels: Record<string, string> = {
    'all': '全部',
    '手冲': '手冲',
    '意式': '意式',
    '冷萃': '冷萃',
    '创意': '创意',
    '季节限定': '季节限定'
  };

  return (
    <div className="min-h-screen relative bg-cover bg-center" style={{backgroundImage: 'url(./src/assets/闪电壁纸.jpg)'}}>
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      {/* 动态背景元素 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-brown-600/10 rounded-full blur-3xl top-20 right-20 animate-float"></div>
        <div className="absolute w-96 h-96 bg-orange-600/10 rounded-full blur-3xl bottom-20 left-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute w-80 h-80 bg-yellow-600/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
      </div>
      
      <div className="max-w-6xl mx-auto p-8 lg:p-16 relative z-10">
        <div className="mb-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gradient animate-float">咖啡之旅</h1>
          <p className="text-xl text-gray-300 glass-effect rounded-xl p-6 inline-block animate-pulse-slow">
            精选咖啡体验 - 9种不同风味探索
          </p>
        </div>
        
        {/* 咖啡统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-brown-400 mb-2">{coffeeData.length}</div>
            <div className="text-gray-300">咖啡种类</div>
            <div className="text-sm text-gray-400 mt-2">多样风味选择</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">5</div>
            <div className="text-gray-300">制作方式</div>
            <div className="text-sm text-gray-400 mt-2">不同冲泡技术</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">8</div>
            <div className="text-gray-300">产地来源</div>
            <div className="text-sm text-gray-400 mt-2">全球优质产区</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">4.7</div>
            <div className="text-gray-300">平均评分</div>
            <div className="text-sm text-gray-400 mt-2">高品质体验</div>
          </div>
        </div>
        
        {/* 咖啡分类筛选 */}
        <div className="glass-dark rounded-xl p-4 mb-12">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="mr-2">☕</span>
            咖啡分类
          </h3>
          <div className="flex flex-wrap gap-2">
            {coffeeTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedType === type 
                    ? 'bg-gradient-to-r from-brown-600 via-orange-600 to-yellow-600 text-white neon-glow' 
                    : 'text-gray-300 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <span className="flex items-center">
                  <span className="mr-2">
                    {type === 'all' ? '☕' : 
                     type === '手冲' ? '💧' : 
                     type === '意式' ? '⚡' : 
                     type === '冷萃' ? '❄️' : 
                     type === '创意' ? '✨' : '🍂'}
                  </span>
                  {typeLabels[type]}
                  <span className="ml-2 bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                    {type === 'all' ? coffeeData.length : coffeeData.filter(c => c.type === type).length}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {/* 咖啡卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCoffee.map((coffee, index) => (
            <div 
              key={coffee.id}
              className={`glass-effect border border-white/10 rounded-xl overflow-hidden transform transition-all duration-700 ${
                expandedCard === coffee.id ? 'scale-105' : 'hover:scale-102'
              }`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={coffee.image} 
                    alt={coffee.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-medium bg-brown-600/80 text-white">
                    {coffee.type}
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center bg-black/50 rounded-full px-3 py-1">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`text-sm ${i < coffee.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                        >
                          ⭐
                        </span>
                      ))}
                      <span className="text-white text-sm ml-1">{coffee.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{coffee.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{coffee.description}</p>
                
                <button
                  onClick={() => toggleCardExpansion(coffee.id)}
                  className="w-full flex justify-between items-center py-2 text-coffee-brown hover:text-orange-400 transition-colors ripple"
                >
                  <span>查看详情</span>
                  <span className={`transform transition-transform ${expandedCard === coffee.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                
                {expandedCard === coffee.id && (
                  <div className="mt-4 pt-4 border-t border-white/10 animate-fadeIn">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-white font-medium mb-1">产地</h4>
                        <p className="text-gray-300 text-sm">{coffee.origin}</p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">烘焙度</h4>
                        <p className="text-gray-300 text-sm">{coffee.roastLevel}</p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">冲泡时间</h4>
                        <p className="text-gray-300 text-sm">{coffee.brewTime}</p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">品尝地点</h4>
                        <p className="text-gray-300 text-sm">{coffee.location}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-2">风味特征</h4>
                      <div className="flex flex-wrap gap-2">
                        {coffee.tasteNotes.map((note, index) => (
                          <span key={index} className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-xs">
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coffee;