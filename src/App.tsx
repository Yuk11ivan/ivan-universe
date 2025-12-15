import React, { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Music from './pages/Music'
import Photos from './pages/Photos'
import Coffee from './pages/Coffee'
import Movies from './pages/Movies'
import Guestbook from './pages/Guestbook'
import './styles/index.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: '首页', path: '/', icon: '👤' },
    { name: '音乐', path: '/music', icon: '🎵' },
    { name: '照片', path: '/photos', icon: '📸' },
    { name: '咖啡', path: '/coffee', icon: '☕' },
    { name: '影视', path: '/movies', icon: '🎬' },
    { name: '留言板', path: '/guestbook', icon: '💬' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // 首页使用冰块背景，其他页面使用闪电背景
  const isHomePage = location.pathname === '/';
  
  return (
    <div className={`min-h-screen text-white relative ${isHomePage ? '' : 'lightning-bg'}`}>
      {!isHomePage && (
        <>
          {/* 动态闪电效果背景元素 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div 
              className="absolute w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl top-10 left-10"
              style={{transform: `translateY(${scrollY * 0.1}px)`}}
            ></div>
            <div 
              className="absolute w-96 h-96 bg-blue-400/5 rounded-full blur-3xl bottom-10 right-10"
              style={{transform: `translateY(${-scrollY * 0.1}px)`}}
            ></div>
            <div 
              className="absolute w-64 h-64 bg-white/5 rounded-full blur-3xl top-1/2 left-1/2"
              style={{transform: `translateY(${-scrollY * 0.15}px)`}}
            ></div>
          </div>
        </>
      )}

      {/* 移动端菜单按钮 */}
      <div className={`lg:hidden fixed top-4 left-4 z-50 ${isHomePage ? 'text-gray-800' : 'text-white'}`}>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="glass-effect p-2 rounded-md ripple"
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* 侧边栏 */}
      <div 
        ref={parallaxRef}
        className={`lg:block fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out ${
          isHomePage ? 'glass-dark' : 'glass-effect'
        } border-r border-white/10 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={!isHomePage ? {transform: `translateY(${scrollY * 0.05}px)`} : {}}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/10">
            <h1 className="text-2xl font-bold text-gradient animate-pulse-slow">Ivan's Universe</h1>
          </div>
          
          <nav className="flex-1 p-4">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`nav-item flex items-center px-4 py-3 mb-2 rounded-md transition-all duration-300 ${
                  isActive(item.path)
                    ? 'active text-magic-purple neon-glow'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white hover:translate-x-1'
                }`}
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                <span>{item.name}</span>
                {isActive(item.path) && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-magic-purple animate-pulse"></div>
                )}
              </Link>
            ))}
          </nav>
          
          <div className="p-4 border-t border-white/10">
            <div className="text-sm">
              <p className="font-medium text-white">Ivan Wang (王明宇)</p>
              <p className="text-gray-400 text-xs mt-1">浙江义乌・2024级・智能经济专业</p>
              <p className="text-gray-400 text-xs">绩点 3.9・专业排名 2</p>
              <p className="text-gray-400 text-xs mt-2 italic">"生活是一门艺术"</p>
            </div>
            <div className="mt-3 flex space-x-2 text-xs text-gray-400">
              <a href="https://instagram.com/yuk11andre" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                IG: yuk11andre
              </a>
              <span>•</span>
              <span className="hover:text-white transition-colors">抖音: 宇酱</span>
              <span>•</span>
              <a href="mailto:320673961@qq.com" className="hover:text-white transition-colors">
                邮箱
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="lg:pl-64">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/coffee" element={<Coffee />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/guestbook" element={<Guestbook />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;