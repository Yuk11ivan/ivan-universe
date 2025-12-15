import React, { useState } from 'react';
import '../styles/index.css';

// 电影数据
const moviesData = [
  {
    id: 'movie1',
    title: '东方快车谋杀案',
    originalTitle: 'Murder on the Orient Express',
    type: '剧情',
    image: '/src/assets/movies/东方快车谋杀案.webp',
    rating: 4,
    year: 2017,
    duration: '114分钟',
    director: '肯尼思·布拉纳',
    cast: '肯尼思·布拉纳, 佩内洛普·克鲁兹, 威廉·达福',
    review: '阿加莎·克里斯蒂的经典作品再次搬上银幕，精彩的群像演绎和出色的视觉效果，让人仿佛置身于那节充满谜团的列车上。波洛的推理过程精彩绝伦，结局令人回味。',
    genreTags: ['推理', '悬疑', '剧情']
  },
  {
    id: 'movie2',
    title: '利刃出鞘',
    originalTitle: 'Knives Out',
    type: '剧情',
    image: '/src/assets/movies/利刃出鞘.jpg',
    rating: 5,
    year: 2019,
    duration: '130分钟',
    director: '莱恩·约翰逊',
    cast: '丹尼尔·克雷格, 克里斯·埃文斯, 安娜·德·阿玛斯',
    review: '现代推理片的佳作，将经典推理元素与现代手法完美结合。丹尼尔·克雷格饰演的侦探独具魅力，剧情反转令人惊喜，是一部从头到尾都保持高度紧张感的精彩电影。',
    genreTags: ['推理', '悬疑', '喜剧']
  },
  {
    id: 'movie3',
    title: '名校风暴',
    originalTitle: 'Élite',
    type: '剧情',
    image: '/src/assets/movies/名校风暴.jpg',
    rating: 4,
    year: 2018,
    duration: '季/50分钟',
    director: '拉蒙·萨拉萨尔, 西尔维娅·卢奇',
    cast: '玛利亚·佩德拉萨, 伊塔zan·埃斯卡米利亚, 米格尔·贝尔纳尔德阿尤',
    review: '西班牙青春剧中的佼佼者，将校园生活与悬疑推理巧妙结合。角色性格鲜明，剧情紧凑不拖沓，每一季都保持着高水准的制作和引人入胜的剧情发展。',
    genreTags: ['青春', '校园', '悬疑']
  },
  {
    id: 'movie4',
    title: '尼罗河上的惨案',
    originalTitle: 'Death on the Nile',
    type: '剧情',
    image: '/src/assets/movies/尼罗河上的惨案.jpg',
    rating: 4,
    year: 2022,
    duration: '127分钟',
    director: '肯尼思·布拉纳',
    cast: '肯尼思·布拉纳, 盖尔·加朵, 艾米·汉莫',
    review: '阿加莎·克里斯蒂的另一部经典推理作品，埃及尼罗河的壮丽景色与精心设计的谋杀案相得益彰。波洛的智慧再次展现，影片的视觉效果和服装设计都非常出色。',
    genreTags: ['推理', '悬疑', '剧情']
  },
  {
    id: 'movie5',
    title: '千与千寻',
    originalTitle: '千と千尋の神隠し',
    type: '动画',
    image: '/src/assets/movies/千与千寻.webp',
    rating: 5,
    year: 2001,
    duration: '125分钟',
    director: '宫崎骏',
    cast: '柊瑠美, 入野自由, 夏木真理',
    review: '宫崎骏的经典之作，一部充满想象力和深意的动画电影。千寻的成长故事令人感动，影片中的每一个角色都栩栩如生，充满日本神话色彩的世界观令人着迷。',
    genreTags: ['动画', '奇幻', '成长']
  },
  {
    id: 'movie6',
    title: '疯狂动物城',
    originalTitle: 'Zootopia',
    type: '动画',
    image: '/src/assets/movies/疯狂动物城.jpg',
    rating: 5,
    year: 2016,
    duration: '108分钟',
    director: '拜伦·霍华德, 瑞奇·摩尔',
    cast: '金妮弗·古德温, 杰森·贝特曼, 伊德瑞斯·艾尔巴',
    review: '迪士尼的又一力作，将动物世界与现代社会完美结合。影片不仅视觉效果出色，更蕴含深刻的社会寓意，关于偏见、梦想和坚持的主题令人深思。',
    genreTags: ['动画', '喜剧', '冒险']
  },
  {
    id: 'movie7',
    title: '黑暗荣耀',
    originalTitle: 'The Glory',
    type: '剧情',
    image: '/src/assets/movies/黑暗荣耀.jpg',
    rating: 5,
    year: 2022,
    duration: '季/50分钟',
    director: '安吉镐',
    cast: '宋慧乔, 李到晛, 林智妍',
    review: '一部关于校园暴力和复仇的韩剧，深刻探讨了人性的黑暗面。女主角的复仇计划周密而精彩，演员的表演极具张力，剧情紧凑引人入胜。',
    genreTags: ['剧情', '悬疑', '复仇']
  },
  {
    id: 'movie8',
    title: '无耻之徒',
    originalTitle: 'Shameless',
    type: '剧情',
    image: '/src/assets/movies/无耻之徒.jpg',
    rating: 5,
    year: 2011,
    duration: '季/45分钟',
    director: '马克·米罗, 约翰·威尔斯',
    cast: '威廉·H·梅西, 埃米·罗森, 杰瑞米·艾伦·怀特',
    review: '一部关于芝加哥底层家庭生活的美剧，真实而残酷地展现了贫困家庭的生存状态。每个角色都充满人性复杂性，剧情既幽默又深刻，令人深思。',
    genreTags: ['剧情', '喜剧', '家庭']
  },
  {
    id: 'movie9',
    title: '消失的她',
    originalTitle: 'Lost in the Stars',
    type: '剧情',
    image: '/src/assets/movies/消失的她.jpg',
    rating: 4,
    year: 2023,
    duration: '122分钟',
    director: '崔睿, 刘翔',
    cast: '朱一龙, 倪妮, 文咏珊',
    review: '一部悬疑爱情片，剧情反转令人意想不到。影片在爱情与悬疑之间找到了完美平衡，演员的表演出色，特别是男主角的演技令人印象深刻。',
    genreTags: ['悬疑', '爱情', '剧情']
  },
  {
    id: 'movie10',
    title: '顶楼',
    originalTitle: 'The Penthouse',
    type: '剧情',
    image: '/src/assets/movies/顶楼.jpg',
    rating: 4,
    year: 2020,
    duration: '季/70分钟',
    director: '朱东民',
    cast: '李智雅, 金素妍, 柳真',
    review: '韩国的狗血剧巅峰之作，剧情反转不断，人物关系复杂。影片展现了上层社会的黑暗面，每个角色都有自己的秘密和动机，令人欲罢不能。',
    genreTags: ['剧情', '悬疑', '狗血']
  }
];

const Movies: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const filteredMovies = selectedType === 'all' 
    ? moviesData 
    : moviesData.filter(movie => movie.type === selectedType);

  const toggleCardExpansion = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const movieTypes = ['all', ...new Set(moviesData.map(movie => movie.type))];

  return (
    <div className="min-h-screen relative bg-cover bg-center" style={{backgroundImage: 'url(/src/assets/闪电壁纸.jpg)'}}>
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      {/* 动态背景元素 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-3xl top-20 right-20 animate-float"></div>
        <div className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-3xl bottom-20 left-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute w-80 h-80 bg-red-600/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
      </div>
      
      <div className="max-w-6xl mx-auto p-8 lg:p-16 relative z-10">
        <div className="mb-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gradient animate-float">影视分享</h1>
          <p className="text-xl text-gray-300 glass-effect rounded-xl p-6 inline-block animate-pulse-slow">
            精选影视作品 - 10部不同类型推荐
          </p>
        </div>
        
        {/* 影视统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">{moviesData.length}</div>
            <div className="text-gray-300">影视作品</div>
            <div className="text-sm text-gray-400 mt-2">多样化选择</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">2</div>
            <div className="text-gray-300">主要类型</div>
            <div className="text-sm text-gray-400 mt-2">剧情与动画</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">4.6</div>
            <div className="text-gray-300">平均评分</div>
            <div className="text-sm text-gray-400 mt-2">高品质推荐</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">6</div>
            <div className="text-gray-300">不同国家</div>
            <div className="text-sm text-gray-400 mt-2">国际化视野</div>
          </div>
        </div>
        
        {/* 影视分类筛选 */}
        <div className="glass-dark rounded-xl p-4 mb-12">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="mr-2">🎬</span>
            影视分类
          </h3>
          <div className="flex flex-wrap gap-2">
            {movieTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedType === type 
                    ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-red-600 text-white neon-glow' 
                    : 'text-gray-300 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <span className="flex items-center">
                  <span className="mr-2">
                    {type === 'all' ? '🎬' : 
                     type === '剧情' ? '🎭' : 
                     type === '动画' ? '🐭' : '📺'}
                  </span>
                  {type === 'all' ? '全部' : type}
                  <span className="ml-2 bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                    {type === 'all' ? moviesData.length : moviesData.filter(m => m.type === type).length}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {/* 影视卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredMovies.map((movie, index) => (
            <div 
              key={movie.id}
              className={`glass-effect border border-white/10 rounded-xl overflow-hidden transform transition-all duration-700 ${
                expandedCard === movie.id ? 'scale-105' : 'hover:scale-102'
              }`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={movie.image} 
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-medium bg-purple-600/80 text-white">
                    {movie.type}
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center bg-black/50 rounded-full px-3 py-1">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`text-sm ${i < movie.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                        >
                          ⭐
                        </span>
                      ))}
                      <span className="text-white text-sm ml-1">{movie.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-1">{movie.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{movie.originalTitle}</p>
                <p className="text-gray-400 text-sm mb-4">{movie.year}年 · {movie.duration}</p>
                
                <button
                  onClick={() => toggleCardExpansion(movie.id)}
                  className="w-full flex justify-between items-center py-2 text-movie-purple hover:text-purple-400 transition-colors ripple"
                >
                  <span>查看详情</span>
                  <span className={`transform transition-transform ${expandedCard === movie.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                
                {expandedCard === movie.id && (
                  <div className="mt-4 pt-4 border-t border-white/10 animate-fadeIn">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-white font-medium mb-1">导演</h4>
                        <p className="text-gray-300 text-sm">{movie.director}</p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">主演</h4>
                        <p className="text-gray-300 text-sm">{movie.cast}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-white font-medium mb-2">类型标签</h4>
                      <div className="flex flex-wrap gap-2">
                        {movie.genreTags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-2">个人评价</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{movie.review}</p>
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

export default Movies;