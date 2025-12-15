import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';

const Home: React.FC = () => {
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

  return (
    <div className="ice-bg min-h-screen text-white relative overflow-hidden">
      {/* 动态粒子背景 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-3xl top-20 left-20 animate-float"></div>
        <div className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-3xl bottom-20 right-20 animate-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl top-1/2 left-1/2 animate-float" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      <div className="max-w-6xl mx-auto p-8 lg:p-16 relative z-10">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-gradient animate-float">
              Ivan's Universe
              <div className="text-shimmer mt-2">王明宇的个人空间</div>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 mb-12 italic glass-effect rounded-xl p-6 animate-pulse-slow">
              "生活是一门艺术，探索是一种态度"
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div 
                ref={el => sectionRefs.current[0] = el as HTMLDivElement}
                className={`glass-dark rounded-xl p-6 transform transition-all duration-700 ${
                  scrollReveals.includes(0) ? 'scroll-reveal active' : 'scroll-reveal'
                }`}
              >
                <h3 className="text-2xl font-semibold mb-4 text-gradient">个人信息</h3>
                <div className="space-y-3">
                  <p className="text-lg font-medium">Ivan Wang (王明宇)</p>
                  <p className="text-gray-300">浙江义乌・2024级・智能经济专业</p>
                  <p className="text-gray-300">绩点 3.9・专业排名 2</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1 bg-purple-600/30 rounded-full text-sm">勤奋好学</span>
                    <span className="px-3 py-1 bg-blue-600/30 rounded-full text-sm">思维创新</span>
                    <span className="px-3 py-1 bg-indigo-600/30 rounded-full text-sm">追求卓越</span>
                  </div>
                </div>
              </div>
              
              <div 
                ref={el => sectionRefs.current[1] = el as HTMLDivElement}
                className={`glass-dark rounded-xl p-6 transform transition-all duration-700 ${
                  scrollReveals.includes(1) ? 'scroll-reveal active' : 'scroll-reveal'
                }`}
                style={{transitionDelay: '0.2s'}}
              >
                <h3 className="text-2xl font-semibold mb-4 text-gradient">兴趣爱好</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg px-4 py-2 ripple">
                    <span className="text-xl">☕</span>
                    <span>咖啡</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg px-4 py-2 ripple">
                    <span className="text-xl">🎾</span>
                    <span>网球</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg px-4 py-2 ripple">
                    <span className="text-xl">🎵</span>
                    <span>音乐</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg px-4 py-2 ripple">
                    <span className="text-xl">🎨</span>
                    <span>陶艺</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg px-4 py-2 ripple">
                    <span className="text-xl">🎬</span>
                    <span>电影</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Cards */}
        <section 
          ref={el => sectionRefs.current[2] = el as HTMLDivElement}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 ${
            scrollReveals.includes(2) ? 'scroll-reveal active' : 'scroll-reveal'
          }`}
          style={{transitionDelay: '0.4s'}}
        >
          <Link to="/music" className="block group">
            <div className="glass-effect border border-purple-500/30 hover:border-purple-400 card-hover overflow-hidden h-full rounded-xl neon-glow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-red-600/30 flex items-center justify-center mr-4 group-hover:animate-pulse">
                    <span className="text-3xl">🎵</span>
                  </div>
                  <h3 className="text-2xl font-semibold">音乐分享</h3>
                </div>
                <p className="text-gray-200 mb-6">Drake 与 The Weeknd 音乐世界</p>
                <div className="flex items-center text-sm">
                  <span className="mr-2">探索音乐激情</span>
                  <div className="ml-auto w-8 h-8 rounded-full bg-purple-600/30 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <span>→</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/photos" className="block group">
            <div className="glass-effect border border-purple-500/30 hover:border-purple-400 card-hover overflow-hidden h-full rounded-xl neon-glow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-purple-600/30 flex items-center justify-center mr-4 group-hover:animate-pulse">
                    <span className="text-3xl">📸</span>
                  </div>
                  <h3 className="text-2xl font-semibold">个人照片</h3>
                </div>
                <p className="text-gray-200 mb-6">生活点滴与美好瞬间</p>
                <div className="flex items-center text-sm">
                  <span className="mr-2">记录精彩生活</span>
                  <div className="ml-auto w-8 h-8 rounded-full bg-purple-600/30 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <span>→</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/coffee" className="block group">
            <div className="glass-effect border border-purple-500/30 hover:border-purple-400 card-hover overflow-hidden h-full rounded-xl neon-glow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-yellow-600/30 flex items-center justify-center mr-4 group-hover:animate-pulse">
                    <span className="text-3xl">☕</span>
                  </div>
                  <h3 className="text-2xl font-semibold">咖啡爱好者</h3>
                </div>
                <p className="text-gray-200 mb-6">手冲、意式与冷萃品味</p>
                <div className="flex items-center text-sm">
                  <span className="mr-2">探索咖啡文化</span>
                  <div className="ml-auto w-8 h-8 rounded-full bg-purple-600/30 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <span>→</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/movies" className="block group">
            <div className="glass-effect border border-blue-500/30 hover:border-blue-400 card-hover overflow-hidden h-full rounded-xl neon-glow-blue">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-blue-600/30 flex items-center justify-center mr-4 group-hover:animate-pulse">
                    <span className="text-3xl">🎬</span>
                  </div>
                  <h3 className="text-2xl font-semibold">影视爱好者</h3>
                </div>
                <p className="text-gray-200 mb-6">电影与剧集心得分享</p>
                <div className="flex items-center text-sm">
                  <span className="mr-2">品味光影艺术</span>
                  <div className="ml-auto w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <span>→</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/guestbook" className="block group">
            <div className="glass-effect border border-purple-500/30 hover:border-purple-400 card-hover overflow-hidden h-full rounded-xl neon-glow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-purple-600/30 flex items-center justify-center mr-4 group-hover:animate-pulse">
                    <span className="text-3xl">💬</span>
                  </div>
                  <h3 className="text-2xl font-semibold">留言板</h3>
                </div>
                <p className="text-gray-200 mb-6">访客留言互动交流</p>
                <div className="flex items-center text-sm">
                  <span className="mr-2">留下您的足迹</span>
                  <div className="ml-auto w-8 h-8 rounded-full bg-purple-600/30 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <span>→</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <div 
            ref={el => sectionRefs.current[3] = el}
            className={`glass-effect border border-gray-500/30 overflow-hidden h-full rounded-xl ${
              scrollReveals.includes(3) ? 'scroll-reveal active' : 'scroll-reveal'
            }`}
            style={{transitionDelay: '0.6s'}}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 rounded-full bg-gray-600/30 flex items-center justify-center mr-4">
                  <span className="text-3xl">👤</span>
                </div>
                <h3 className="text-2xl font-semibold">关于我</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-3 text-lg">社交媒体</p>
                  <div className="flex flex-col space-y-2 text-gray-300">
                    <div className="flex items-center space-x-2 ripple p-2 rounded-lg hover:bg-gray-700/30 transition-colors">
                      <span>📷</span>
                      <span>IG: yuk11andre</span>
                    </div>
                    <div className="flex items-center space-x-2 ripple p-2 rounded-lg hover:bg-gray-700/30 transition-colors">
                      <span>🎵</span>
                      <span>抖音: 宇酱</span>
                    </div>
                    <div className="flex items-center space-x-2 ripple p-2 rounded-lg hover:bg-gray-700/30 transition-colors">
                      <span>✉️</span>
                      <span>邮箱: 320673961@qq.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer with social links */}
        <footer 
          ref={el => sectionRefs.current[4] = el}
          className={`border-t border-gray-700 pt-8 ${
            scrollReveals.includes(4) ? 'scroll-reveal active' : 'scroll-reveal'
          }`}
          style={{transitionDelay: '0.8s'}}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2024 Ivan's Universe. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a 
                href="https://instagram.com/yuk11andre" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2 ripple"
              >
                <span>📷</span>
                <span>Instagram</span>
              </a>
              <a 
                href="mailto:320673961@qq.com" 
                className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2 ripple"
              >
                <span>✉️</span>
                <span>Email</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;