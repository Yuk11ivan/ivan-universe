import { useState } from 'react';
import '../styles/index.css';

// 咖啡数据
const coffeeData = [
  {
    id: 'coffee1',
    name: '手冲肯尼亚AA',
    type: '手冲',
    image: './assets/coffee/肯尼亚风�?png',
    description: '来自肯尼亚的高山咖啡豆，带有明亮的酸度和浓郁的莓果香气�?,
    rating: 5,
    roastLevel: '中浅�?,
    origin: '肯尼�?,
    brewTime: '3-4分钟',
    tasteNotes: ['莓果', '柑橘', '黑巧克力'],
    location: '星巴克臻选店'
  },
  {
    id: 'coffee2',
    name: '西班牙风味拿�?,
    type: '意式',
    image: './assets/coffee/西班牙风味拿�?png',
    description: '浓郁的意式浓缩与丝滑的牛奶完美结合，带有淡淡的甜味�?,
    rating: 4,
    roastLevel: '中烘',
    origin: '哥伦比亚',
    brewTime: '2-3分钟',
    tasteNotes: ['焦糖', '坚果', '牛奶巧克�?],
    location: '独立咖啡�?
  },
  {
    id: 'coffee3',
    name: '低温Dirty',
    type: '冷萃',
    image: './assets/coffee/低温dirty.png',
    description: '冰牛奶与浓缩咖啡的经典结合，层次分明，口感丰富�?,
    rating: 5,
    roastLevel: '中深�?,
    origin: '巴西',
    brewTime: '5分钟',
    tasteNotes: ['黑巧克力', '焦糖', '烤杏�?],
    location: '网红咖啡�?
  },
  {
    id: 'coffee4',
    name: '黄油Pro拿铁',
    type: '意式',
    image: './assets/coffee/黄油pro拿铁.png',
    description: '加入黄油的创新拿铁，口感丰富顺滑，带有独特的黄油香气�?,
    rating: 4,
    roastLevel: '中烘',
    origin: '埃塞俄比�?,
    brewTime: '3分钟',
    tasteNotes: ['黄油', '香草', '坚果'],
    location: '创意咖啡�?
  },
  {
    id: 'coffee5',
    name: '印度尼西亚手冲咖�?,
    type: '手冲',
    image: './assets/coffee/印度尼西亚手冲咖�?png',
    description: '来自印度尼西亚的曼特宁咖啡，口感醇厚，带有木质和香料味�?,
    rating: 4,
    roastLevel: '中深�?,
    origin: '印度尼西�?,
    brewTime: '4-5分钟',
    tasteNotes: ['木质', '香料', '黑巧克力'],
    location: '精品咖啡�?
  },
  {
    id: 'coffee6',
    name: '星巴克臻选系�?,
    type: '意式',
    image: './assets/coffee/星巴克臻选系�?png',
    description: '星巴克臻选系列中的精品咖啡豆，口感平衡，回味悠长�?,
    rating: 5,
    roastLevel: '中烘',
    origin: '多国混合',
    brewTime: '2-3分钟',
    tasteNotes: ['焦糖', '坚果', '柑橘'],
    location: '星巴克臻选店'
  },
  {
    id: 'coffee7',
    name: '秋季限定枫糖拿铁',
    type: '意式',
    image: './assets/coffee/秋季限定枫糖.png',
    description: '秋季限定的枫糖拿铁，甜而不腻，带来温暖的秋日感受�?,
    rating: 5,
    roastLevel: '中烘',
    origin: '危地马拉',
    brewTime: '3分钟',
    tasteNotes: ['枫糖', '香草', '肉桂'],
    location: '星巴�?
  },
  {
    id: 'coffee8',
    name: 'Peet\'s咖啡',
    type: '手冲',
    image: './assets/coffee/peet‘s.png',
    description: '来自Peet\'s Coffee的经典手冲，口感浓郁，带有烟熏和巧克力味�?,
    rating: 4,
    roastLevel: '深烘',
    origin: '哥斯达黎�?,
    brewTime: '3-4分钟',
    tasteNotes: ['烟熏', '黑巧克力', '焦糖'],
    location: 'Peet\'s Coffee'
  },
  {
    id: 'coffee9',
    name: '冰淇淋饼干咖�?,
    type: '意式',
    image: './assets/coffee/冰淇淋饼干咖�?png',
    description: '创意冰淇淋咖啡，冷热交融，带来独特的味觉体验�?,
    rating: 4,
    roastLevel: '中烘',
    origin: '多国混合',
    brewTime: '5分钟',
    tasteNotes: ['冰淇�?, '饼干', '巧克�?],
    location: '创意咖啡�?
  }
];

const CoffeeCard: React.FC<{ coffee: any }> = ({ coffee }) => {
  return (
    <div className="bg-gray-800/70 backdrop-blur border border-gray-700 hover:border-coffee-brown card-hover overflow-hidden group rounded-lg">
      <div className="p-0">
        <div className="aspect-square relative overflow-hidden">
          <img 
            src={coffee.image} 
            alt={coffee.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2">
            <span className="bg-coffee-brown/20 text-coffee-brown border border-coffee-brown/30 px-2 py-1 text-xs rounded-full">
              {coffee.type}
            </span>
          </div>
          <div className="absolute top-2 right-2">
            <div className="flex items-center bg-black/50 rounded-full px-2 py-1">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={`text-xs ${i < coffee.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                >
                  �?
                </span>
              ))}
              <span className="text-white text-xs ml-1">{coffee.rating}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white mb-2 font-semibold">{coffee.name}</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">烘焙程度:</span>
            <span className="text-gray-300">{coffee.roastLevel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">产地:</span>
            <span className="text-gray-300">{coffee.origin}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">冲泡时间:</span>
            <span className="text-gray-300">{coffee.brewTime}</span>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {coffee.tasteNotes.map((note: string, index: number) => (
            <span key={index} className="bg-coffee-brown/10 text-coffee-brown border border-coffee-brown/20 px-2 py-1 text-xs rounded">
              {note}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center text-gray-400 text-xs">
          <span>📍 {coffee.location}</span>
        </div>
      </div>
    </div>
  );
};

const CoffeeStats: React.FC = () => {
  const handDripCount = coffeeData.filter(c => c.type === '手冲').length;
  const espressoCount = coffeeData.filter(c => c.type === '意式').length;
  const coldBrewCount = coffeeData.filter(c => c.type === '冷萃').length;
  const total = coffeeData.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300">手冲咖啡</span>
          <span className="text-2xl font-bold text-coffee-brown">{handDripCount}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-coffee-brown h-2 rounded-full" 
            style={{width: `${(handDripCount / total) * 100}%`}}
          ></div>
        </div>
        <p className="text-gray-500 text-xs mt-1">{Math.round((handDripCount / total) * 100)}% of collection</p>
      </div>
      
      <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300">意式咖啡</span>
          <span className="text-2xl font-bold text-coffee-brown">{espressoCount}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-coffee-brown h-2 rounded-full" 
            style={{width: `${(espressoCount / total) * 100}%`}}
          ></div>
        </div>
        <p className="text-gray-500 text-xs mt-1">{Math.round((espressoCount / total) * 100)}% of collection</p>
      </div>
      
      <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300">冷萃咖啡</span>
          <span className="text-2xl font-bold text-coffee-brown">{coldBrewCount}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-coffee-brown h-2 rounded-full" 
            style={{width: `${(coldBrewCount / total) * 100}%`}}
          ></div>
        </div>
        <p className="text-gray-500 text-xs mt-1">{Math.round((coldBrewCount / total) * 100)}% of collection</p>
      </div>
    </div>
  );
};

const Coffee: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const getFilteredCoffee = () => {
    if (activeTab === 'all') return coffeeData;
    return coffeeData.filter(coffee => coffee.type === activeTab);
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{backgroundImage: 'url(/src/assets/闪电壁纸.jpg)'}}>
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      {/* 动态背景元�?*/}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-coffee-brown/20 rounded-full blur-3xl top-20 right-20 animate-float"></div>
        <div className="absolute w-96 h-96 bg-amber-600/20 rounded-full blur-3xl bottom-20 left-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute w-80 h-80 bg-yellow-600/20 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
      </div>
      
      <div className="max-w-6xl mx-auto p-8 lg:p-16 relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-gradient animate-float">咖啡爱好�?/h1>
          <p className="text-gray-300 text-lg glass-effect rounded-xl p-4 inline-block animate-pulse-slow">探索手冲、意式与冷萃的咖啡世�?/p>
        </div>

        <CoffeeStats />
        
        {/* Tabs */}
        <div className="bg-gray-800/70 border border-gray-700 rounded-lg mb-8 p-1 flex grid grid-cols-4">
          <button
            className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'all' ? 'bg-coffee-brown text-white' : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setActiveTab('all')}
          >
            全部
          </button>
          <button
            className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === '手冲' ? 'bg-coffee-brown text-white' : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setActiveTab('手冲')}
          >
            手冲
          </button>
          <button
            className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === '意式' ? 'bg-coffee-brown text-white' : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setActiveTab('意式')}
          >
            意式
          </button>
          <button
            className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === '冷萃' ? 'bg-coffee-brown text-white' : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setActiveTab('冷萃')}
          >
            冷萃
          </button>
        </div>
        
        {/* Coffee Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredCoffee().map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coffee;
