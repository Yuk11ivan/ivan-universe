import React, { useState, useEffect, useRef } from 'react';
import '../styles/index.css';

// 音乐数据
const musicData = [
  {
    id: 'drake1',
    artist: 'Drake',
    album: 'Scorpion',
    image: 'https://raw.githubusercontent.com/Yuk11ivan/ivan-universe-images/main/Drake/Drake2.jpg',
    rating: 5,
    releaseYear: 2018,
    favoriteTracks: ['God\'s Plan', 'In My Feelings', 'Don\'t Matter To Me'],
    review: 'Drake的双专辑《Scorpion》展现了他音乐创作的高度多样性。一面展现了他的脆弱情感，另一面则是充满自信的说唱。这张专辑成功融合了流行、R&B和嘻哈元素，是Drake职业生涯的又一巅峰之作。'
  },
  {
    id: 'drake2',
    artist: 'Drake',
    album: 'Views',
    image: 'https://raw.githubusercontent.com/Yuk11ivan/ivan-universe-images/main/Drake/Drake1.png',
    rating: 4,
    releaseYear: 2016,
    favoriteTracks: ['Hotline Bling', 'One Dance', 'Controlla'],
    review: '《Views》标志着Drake音乐风格的转变，更多融入了加勒比海和舞厅音乐元素。这张专辑在全球范围内取得巨大成功，尤其是《One Dance》成为Drake首支英国排行榜冠军单曲。'
  },
  {
    id: 'drake3',
    artist: 'Drake',
    album: 'Take Care',
    image: 'https://raw.githubusercontent.com/Yuk11ivan/ivan-universe-images/main/Drake/Drake3.png',
    rating: 5,
    releaseYear: 2011,
    favoriteTracks: ['Headlines', 'Take Care', 'Marvins Room'],
    review: '《Take Care》是Drake的突破性专辑，将R&B与嘻哈完美融合。专辑充满了情感深度和艺术性，展现了Drake作为音乐人的成熟和多样性。这张专辑获得了格莱美奖，并成为他职业生涯的里程碑。'
  },
  {
    id: 'drake4',
    artist: 'Drake',
    album: 'Nothing Was The Same',
    image: 'https://raw.githubusercontent.com/Yuk11ivan/ivan-universe-images/main/Drake/Drake4.png',
    rating: 4,
    releaseYear: 2013,
    favoriteTracks: ['Started From The Bottom', 'Hold On, We\'re Going Home', 'Too Much'],
    review: '《Nothing Was The Same》展现了Drake在音乐上的自信和成长。专辑融合了大气的声音设计和深刻的歌词，探讨了成名后的挣扎和人际关系。这张专辑巩固了Drake在嘻哈音乐界的地位。'
  },
  {
    id: 'weeknd1',
    artist: 'The Weeknd',
    album: 'After Hours',
    image: 'https://raw.githubusercontent.com/Yuk11ivan/ivan-universe-images/main/The Weeknd/The Weeknd1.png',
    rating: 5,
    releaseYear: 2020,
    favoriteTracks: ['Blinding Lights', 'In Your Eyes', 'Save Your Tears'],
    review: '《After Hours》是The Weeknd音乐风格的重要转折点，融合了80年代合成器流行与现代R&B。整张专辑如同一部电影，展现了孤独、悔恨和自我救赎的主题，是The Weeknd最完整、最成熟的作品之一。'
  },
  {
    id: 'weeknd2',
    artist: 'The Weeknd',
    album: 'Dawn FM',
    image: 'https://raw.githubusercontent.com/Yuk11ivan/ivan-universe-images/main/The Weeknd/The Weeknd2.png',
    rating: 5,
    releaseYear: 2022,
    favoriteTracks: ['Take My Breath', 'Sacrifice', 'Out of Time'],
    review: '《Dawn FM》是一张概念专辑，如同在深夜电台中播放的音乐。The Weeknd邀请听众进入一段灵魂的旅程，探讨死亡、重生和自我接纳。独特的音乐风格和深刻的主题使其成为近年最引人入胜的专辑之一。'
  },
  {
    id: 'weeknd3',
    artist: 'The Weeknd',
    album: 'Starboy',
    image: 'https://raw.githubusercontent.com/Yuk11ivan/ivan-universe-images/main/The Weeknd/The Weeknd3.png',
    rating: 4,
    releaseYear: 2016,
    favoriteTracks: ['Starboy', 'I Feel It Coming', 'Party Monster'],
    review: '《Starboy》标志着The Weeknd音乐风格的转变，与Daft Punk的合作带来了更加流行化的声音。专辑融合了放克、流行和电子音乐元素，展现了他作为流行巨星的自信和魅力。'
  },
  {
    id: 'weeknd4',
    artist: 'The Weeknd',
    album: 'Beauty Behind The Madness',
    image: 'https://raw.githubusercontent.com/Yuk11ivan/ivan-universe-images/main/The Weeknd/The Weeknd4.png',
    rating: 4,
    releaseYear: 2015,
    favoriteTracks: ['Can\'t Feel My Face', 'The Hills', 'Earned It'],
    review: '《Beauty Behind The Madness》是The Weeknd的突破性专辑，将他推向了主流音乐舞台。专辑中的《Can\'t Feel My Face》和《The Hills》成为全球热门单曲，展现了他在流行音乐领域的巨大潜力。'
  }
];

const Music: React.FC = () => {
  const [selectedArtist, setSelectedArtist] = useState<string>('all');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [scrollReveals, setScrollReveals] = useState<number[]>([]);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      sectionRefs.current.forEach((ref, index) => {
        if (ref && !scrollReveals.includes(index)) {
          const rect = ref.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight * 0.8;
          
          if (isInView) {
            setScrollReveals(prev => [...prev, index]);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始检查
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollReveals]);

  const filteredMusic = selectedArtist === 'all' 
    ? musicData 
    : musicData.filter(music => music.artist.toLowerCase() === selectedArtist.toLowerCase());

  const toggleCardExpansion = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="min-h-screen relative bg-cover bg-center" style={{backgroundImage: 'url(https://raw.githubusercontent.com/Yuk11ivan/ivan-universe-images/main/壁纸/闪电壁纸.jpg)'}}>
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      {/* 动态背景元素 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-red-600/10 rounded-full blur-3xl top-20 right-20 animate-float"></div>
        <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-3xl bottom-20 left-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute w-80 h-80 bg-blue-600/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
      </div>
      
      <div className="max-w-6xl mx-auto p-8 lg:p-16 relative z-10">
        <div 
          ref={el => sectionRefs.current[0] = el}
          className={`mb-12 ${
            scrollReveals.includes(0) ? 'scroll-reveal active' : 'scroll-reveal'
          }`}
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gradient animate-float">音乐分享</h1>
          <p className="text-xl text-gray-300 glass-effect rounded-xl p-6 inline-block animate-pulse-slow">
            Drake 与 The Weeknd 完整音乐收藏 - 8张经典专辑
          </p>
        </div>
        
        {/* Music Statistics */}
        <div 
          ref={el => sectionRefs.current[1] = el}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 ${
            scrollReveals.includes(1) ? 'scroll-reveal active' : 'scroll-reveal'
          }`}
          style={{transitionDelay: '0.2s'}}
        >
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">{musicData.filter(m => m.artist === 'Drake').length}</div>
            <div className="text-gray-300">Drake 专辑</div>
            <div className="text-sm text-gray-400 mt-2">经典嘻哈与R&B</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">{musicData.filter(m => m.artist === 'The Weeknd').length}</div>
            <div className="text-gray-300">The Weeknd 专辑</div>
            <div className="text-sm text-gray-400 mt-2">暗黑R&B与流行</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{musicData.length}</div>
            <div className="text-gray-300">总专辑数</div>
            <div className="text-sm text-gray-400 mt-2">精选音乐收藏</div>
          </div>
        </div>
        
        {/* Advanced Artist Filter */}
        <div 
          ref={el => sectionRefs.current[2] = el}
          className={`glass-dark rounded-xl p-4 mb-12 ${
            scrollReveals.includes(2) ? 'scroll-reveal active' : 'scroll-reveal'
          }`}
          style={{transitionDelay: '0.4s'}}
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="mr-2">🎵</span>
            音乐分类
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedArtist('all')}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedArtist === 'all' 
                  ? 'bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 text-white neon-glow' 
                  : 'text-gray-300 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              <span className="flex items-center">
                <span className="mr-2">🎼</span>
                全部专辑
              </span>
            </button>
            <button
              onClick={() => setSelectedArtist('drake')}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedArtist === 'drake' 
                  ? 'bg-red-600 text-white neon-glow' 
                  : 'text-gray-300 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              <span className="flex items-center">
                <span className="mr-2">🔥</span>
                Drake 作品
                <span className="ml-2 bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded-full">
                  {musicData.filter(m => m.artist === 'Drake').length}
                </span>
              </span>
            </button>
            <button
              onClick={() => setSelectedArtist('weeknd')}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedArtist === 'weeknd' 
                  ? 'bg-purple-600 text-white neon-glow' 
                  : 'text-gray-300 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              <span className="flex items-center">
                <span className="mr-2">🌟</span>
                The Weeknd 作品
                <span className="ml-2 bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">
                  {musicData.filter(m => m.artist === 'The Weeknd').length}
                </span>
              </span>
            </button>
          </div>
        </div>
        
        {/* Music Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredMusic.map((music, index) => (
            <div 
              key={music.id}
              ref={el => sectionRefs.current[index + 3] = el}
              className={`glass-effect border border-white/10 rounded-xl overflow-hidden transform transition-all duration-700 ${
                scrollReveals.includes(index + 3) ? 'scroll-reveal active' : 'scroll-reveal'
              } ${expandedCard === music.id ? 'scale-105' : 'hover:scale-102'}`}
              style={{transitionDelay: `${0.6 + index * 0.1}s`}}
            >
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={music.image} 
                    alt={music.album}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-medium ${
                    music.artist === 'Drake' 
                      ? 'bg-red-600/80 text-white' 
                      : 'bg-purple-600/80 text-white'
                  }`}>
                    {music.artist}
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center bg-black/50 rounded-full px-3 py-1">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`text-sm ${i < music.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="text-white text-sm ml-1">{music.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{music.album}</h3>
                <p className="text-gray-400 text-sm mb-4">{music.releaseYear}年发行</p>
                
                <button
                  onClick={() => toggleCardExpansion(music.id)}
                  className="w-full flex justify-between items-center py-2 text-music-red hover:text-red-400 transition-colors ripple"
                >
                  <span>查看详情</span>
                  <span className={`transform transition-transform ${expandedCard === music.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                
                {expandedCard === music.id && (
                  <div className="mt-4 pt-4 border-t border-white/10 animate-fadeIn">
                    <div className="mb-4">
                      <h4 className="text-white font-medium mb-2">热门曲目</h4>
                      <ul className="space-y-1 text-sm text-gray-300">
                        {music.favoriteTracks.map((track, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs mr-2">
                              {index + 1}
                            </span>
                            {track}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-2">个人评价</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{music.review}</p>
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

export default Music;