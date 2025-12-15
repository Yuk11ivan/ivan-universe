import { useState } from 'react';
import '../styles/index.css';

// 电影数据
const moviesData = [
  {
    id: 'movie1',
    title: '东方快车谋杀�?,
    originalTitle: 'Murder on the Orient Express',
    type: '剧情',
    image: './assets/movies/东方快车谋杀�?webp',
    rating: 4,
    year: 2017,
    duration: '114分钟',
    director: '肯尼思·布拉纳',
    cast: '肯尼思·布拉纳, 佩内洛普·克鲁�? 威廉·达福',
    review: '阿加莎·克里斯蒂的经典作品再次搬上银幕，精彩的群像演绎和出色的视觉效果，让人仿佛置身于那节充满谜团的列车上。波洛的推理过程精彩绝伦，结局令人回味�?,
    genreTags: ['推理', '悬疑', '剧情']
  },
  {
    id: 'movie2',
    title: '利刃出鞘',
    originalTitle: 'Knives Out',
    type: '剧情',
    image: './assets/movies/利刃出鞘.jpg',
    rating: 5,
    year: 2019,
    duration: '130分钟',
    director: '莱恩·约翰�?,
    cast: '丹尼尔·克雷格, 克里斯·埃文斯, 安娜·德·阿玛斯',
    review: '现代推理片的佳作，将经典推理元素与现代手法完美结合。丹尼尔·克雷格饰演的侦探独具魅力，剧情反转令人惊喜，是一部从头到尾都保持高度紧张感的精彩电影�?,
    genreTags: ['推理', '悬疑', '喜剧']
  },
  {
    id: 'movie3',
    title: '名校风暴',
    originalTitle: 'Élite',
    type: '剧情',
    image: './assets/movies/名校风暴.jpg',
    rating: 4,
    year: 2018,
    duration: '�?50分钟',
    director: '拉蒙·萨拉萨尔, 西尔维娅·卢奇',
    cast: '玛利亚·佩德拉�? 伊塔zan·埃斯卡米利亚, 米格尔·贝尔纳尔德阿尤',
    review: '西班牙青春剧中的佼佼者，将校园生活与悬疑推理巧妙结合。角色性格鲜明，剧情紧凑不拖沓，每一季都保持着高水准的制作和引人入胜的剧情发展�?,
    genreTags: ['青春', '校园', '悬疑']
  },
  {
    id: 'movie4',
    title: '尼罗河上的惨�?,
    originalTitle: 'Death on the Nile',
    type: '剧情',
    image: './assets/movies/尼罗河上的惨�?jpg',
    rating: 4,
    year: 2022,
    duration: '127分钟',
    director: '肯尼思·布拉纳',
    cast: '肯尼思·布拉纳, 盖尔·加朵, 艾米·汉莫',
    review: '又一部阿加莎·克里斯蒂作品的精彩改编，将故事背景从列车转移到尼罗河上的游船，壮丽的自然风光与紧张悬疑的剧情形成鲜明对比。波洛的推理依然精彩绝伦�?,
    genreTags: ['推理', '悬疑', '剧情']
  },
  {
    id: 'movie5',
    title: '顶楼',
    originalTitle: 'The Penthouse',
    type: '剧情',
    image: './assets/movies/顶楼.jpg',
    rating: 4,
    year: 2020,
    duration: '�?70分钟',
    director: '朱东�?,
    cast: '柳真, 严基�? 金素�?,
    review: '韩国复仇题材剧的巅峰之作，剧情反转不断，人物关系错综复杂。每一集都充满悬念，让观众欲罢不能，是一部极具娱乐性和观赏性的剧集�?,
    genreTags: ['剧情', '悬疑', '复仇']
  },
  {
    id: 'movie6',
    title: '疯狂动物�?,
    originalTitle: 'Zootopia',
    type: '动画',
    image: './assets/movies/疯狂动物�?jpg',
    rating: 5,
    year: 2016,
    duration: '108分钟',
    director: '拜恩·霍华�? 里奇·摩尔',
    cast: '金妮弗·古德温, 杰森·贝特�? 伊德里斯·艾尔�?,
    review: '迪士尼动画的杰作，不仅适合儿童观看，成年人也能从中获得深刻思考。影片通过动物世界巧妙探讨了现实社会中的偏见与歧视问题，寓教于乐，堪称现代动画的典范�?,
    genreTags: ['动画', '冒险', '喜剧']
  },
  {
    id: 'movie7',
    title: '黑暗荣耀',
    originalTitle: 'The Glory',
    type: '剧情',
    image: './assets/movies/黑暗荣耀.jpg',
    rating: 5,
    year: 2022,
    duration: '�?60分钟',
    director: '宋贤�?,
    cast: '宋慧�? 李到�? 林智�?,
    review: '宋慧乔转型力作，讲述校园霸凌复仇的故事。剧本扎实，演员演技精湛，尤其是宋慧乔的表演令人惊艳。通过深刻的社会问题探讨，引发观众对校园暴力的深思�?,
    genreTags: ['剧情', '复仇', '社会']
  },
  {
    id: 'movie8',
    title: '千与千寻',
    originalTitle: 'Spirited Away',
    type: '动画',
    image: './assets/movies/千与千寻.webp',
    rating: 5,
    year: 2001,
    duration: '125分钟',
    director: '宫崎�?,
    cast: '柊瑠�? 入野自由, 夏木真理',
    review: '宫崎骏的不朽经典，充满想象力的奇幻世界。通过小女孩千寻的冒险，探讨了成长、勇气与环保等主题。影片画面精美绝伦，音乐动人，是一部值得反复观看的艺术品�?,
    genreTags: ['动画', '奇幻', '冒险']
  },
  {
    id: 'movie9',
    title: '无耻之�?,
    originalTitle: 'Shameless',
    type: '剧情',
    image: './assets/movies/无耻之�?jpg',
    rating: 4,
    year: 2011,
    duration: '�?60分钟',
    director: '保罗·克莱�?,
    cast: '威廉姆·H·梅西, 艾米·罗森, 杰瑞米·艾伦·怀�?,
    review: '美式黑色幽默的代表作，通过 Gallagher 一家的荒诞生活，展现了美国底层社会的真实面貌。角色鲜活有趣，剧情既有笑点又有泪点，是一部深刻探讨家庭关系的佳作�?,
    genreTags: ['剧情', '喜剧', '家庭']
  },
  {
    id: 'movie10',
    title: '消失的她',
    originalTitle: 'Lost in the Stars',
    type: '悬疑',
    image: './assets/movies/消失的她.jpg',
    rating: 4,
    year: 2022,
    duration: '121分钟',
    director: '刘翔',
    cast: '朱一�? 倪妮, 文咏�?,
    review: '国产悬疑片的突破之作，情节跌宕起伏，谜团层层递进。朱一龙和倪妮的表演出彩，剧情反转出人意料，是一部能够引发观众热烈讨论的优秀悬疑电影�?,
    genreTags: ['悬疑', '犯罪', '剧情']
  }
];

const typeColors: Record<string, string> = {
  '剧情': 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  '科幻': 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
  '文艺': 'bg-green-500/20 text-green-300 border border-green-500/30',
  '动画': 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
  '悬疑': 'bg-red-500/20 text-red-300 border border-red-500/30',
  'all': 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
};

const MovieCard: React.FC<{ 
  movie: any; 
  onOpenReview: (movie: any) => void;
}> = ({ movie, onOpenReview }) => {
  return (
    <div className="bg-gray-800/70 backdrop-blur border border-gray-700 hover:border-movie-blue card-hover overflow-hidden group rounded-lg">
      <div className="p-0">
        <div className="aspect-[2/3] relative overflow-hidden">
          <img 
            src={movie.image} 
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 text-xs rounded-full ${typeColors[movie.type]}`}>
              {movie.type}
            </span>
          </div>
          <div className="absolute top-2 right-2">
            <div className="flex items-center bg-black/50 rounded-full px-2 py-1">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={`text-xs ${i < movie.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                >
                  �?
                </span>
              ))}
              <span className="text-white text-xs ml-1">{movie.rating}</span>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button 
              className="bg-movie-blue/80 hover:bg-movie-blue text-white rounded-md px-4 py-2 text-sm"
              onClick={() => onOpenReview(movie)}
            >
              查看影评
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white mb-1 text-lg font-semibold">{movie.title}</h3>
        {movie.originalTitle && (
          <p className="text-gray-400 text-sm mb-2">{movie.originalTitle}</p>
        )}
        <div className="flex items-center text-gray-400 text-xs mb-2">
          <span>{movie.year}</span>
          <span className="mx-2">�?/span>
          <span>{movie.duration}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genreTags.slice(0, 3).map((tag: string, index: number) => (
            <span key={index} className="bg-movie-blue/10 text-movie-blue border border-movie-blue/20 px-2 py-1 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
        <button 
          className="w-full bg-movie-blue/80 hover:bg-movie-blue text-white rounded-md px-4 py-2 text-sm transition-colors"
          onClick={() => onOpenReview(movie)}
        >
          查看影评
        </button>
      </div>
    </div>
  );
};

const MovieReview: React.FC<{
  movie: any;
  isOpen: boolean;
  onClose: () => void;
}> = ({ movie, isOpen, onClose }) => {
  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={onClose}>
      <div className="bg-gray-800 border border-gray-700 rounded-lg max-w-2xl w-full mx-4 relative" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          �?
        </button>
        
        <div className="p-6">
          <div className="aspect-video overflow-hidden rounded-md mb-6">
            <img 
              src={movie.image} 
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 text-sm rounded-full ${typeColors[movie.type]}`}>
                {movie.type}
              </span>
              <div className="flex items-center text-sm text-gray-400">
                <span>{movie.year}</span>
                <span className="mx-2">�?/span>
                <span>{movie.duration}</span>
              </div>
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={`text-sm ${i < movie.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                >
                  �?
                </span>
              ))}
              <span className="text-white ml-1">{movie.rating}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-white font-medium mb-1">导演</h4>
              <p className="text-gray-300">{movie.director}</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">主演</h4>
              <p className="text-gray-300">{movie.cast}</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">类型标签</h4>
              <div className="flex flex-wrap gap-1">
                {movie.genreTags.map((tag: string, index: number) => (
                  <span key={index} className="bg-movie-blue/10 text-movie-blue border border-movie-blue/20 px-2 py-1 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">个人影评</h4>
              <p className="text-gray-300 leading-relaxed">{movie.review}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Movies: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const openReview = (movie: any) => {
    setSelectedMovie(movie);
    setIsReviewOpen(true);
  };

  const closeReview = () => {
    setIsReviewOpen(false);
  };

  const getFilteredMovies = () => {
    if (activeTab === 'all') return moviesData;
    return moviesData.filter(movie => movie.type === activeTab);
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{backgroundImage: 'url(/src/assets/闪电壁纸.jpg)'}}>
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      {/* 动态背景元�?*/}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl top-20 right-20 animate-float"></div>
        <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl bottom-20 left-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
      </div>
      
      <div className="max-w-6xl mx-auto p-8 lg:p-16 relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-gradient animate-float">影视爱好�?/h1>
          <p className="text-gray-300 text-lg glass-effect rounded-xl p-4 inline-block animate-pulse-slow">品味光影艺术，分享观影心�?/p>
        </div>
        
        {/* Tabs */}
        <div className="bg-gray-800/70 border border-gray-700 rounded-lg mb-8 p-1 flex">
          <button
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'all' ? 'bg-movie-blue text-white' : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setActiveTab('all')}
          >
            全部
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === '剧情' ? 'bg-movie-blue text-white' : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setActiveTab('剧情')}
          >
            剧情
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === '动画' ? 'bg-movie-blue text-white' : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setActiveTab('动画')}
          >
            动画
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === '悬疑' ? 'bg-movie-blue text-white' : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setActiveTab('悬疑')}
          >
            悬疑
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === '科幻' ? 'bg-movie-blue text-white' : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setActiveTab('科幻')}
          >
            科幻
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === '文艺' ? 'bg-movie-blue text-white' : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setActiveTab('文艺')}
          >
            文艺
          </button>
        </div>
        
        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredMovies().map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie}
              onOpenReview={openReview}
            />
          ))}
        </div>

        {/* Movie review modal */}
        {selectedMovie && (
          <MovieReview 
            movie={selectedMovie}
            isOpen={isReviewOpen}
            onClose={closeReview}
          />
        )}
      </div>
    </div>
  );
};

export default Movies;
