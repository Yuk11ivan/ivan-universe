import { useState } from 'react';
import '../styles/index.css';

// 模拟数据 - 在实际应用中这些数据会从SQL Server获取
const mockMessages = [
  {
    id: 1,
    nickname: "音乐爱好�?,
    content: "你的音乐分享太棒了！特别是Drake的部分，我也很喜欢他的音乐。希望能听到更多你的分享�?,
    email: "music@example.com",
    createTime: "2024-11-20T14:30:00Z"
  },
  {
    id: 2,
    nickname: "咖啡探索�?,
    content: "咖啡照片拍得真专业，看起来都很好喝！下次有机会一起去探店吧�?,
    createTime: "2024-11-18T09:15:00Z"
  },
  {
    id: 3,
    nickname: "电影�?,
    content: "你的影评写得很详细，推荐的电影我都很喜欢。有没有其他类型的电影推荐？",
    email: "movie@example.com",
    createTime: "2024-11-15T16:45:00Z"
  },
  {
    id: 4,
    nickname: "访客",
    content: "网站设计得很有艺术感，特别是UI风格。请问使用的是什么UI框架�?,
    createTime: "2024-11-12T11:20:00Z"
  },
  {
    id: 5,
    nickname: "老同�?,
    content: "好久不见！看到你分享的照片感觉你现在过得很精彩啊！有空联系一下�?,
    email: "classmate@example.com",
    createTime: "2024-11-10T20:10:00Z"
  }
];

const Guestbook: React.FC = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    content: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5;

  // 格式化日�?
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '昨天';
    if (diffDays <= 7) return `${diffDays}天前`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)}周前`;
    if (diffDays <= 365) return `${Math.floor(diffDays / 30)}个月前`;
    
    return date.toLocaleDateString('zh-CN');
  };

  // 隐藏邮箱
  const hideEmail = (email?: string) => {
    if (!email) return '';
    const [name, domain] = email.split('@');
    const visibleName = name.length <= 2 ? name : name.substring(0, 2) + '*'.repeat(name.length - 2);
    return `${visibleName}@${domain}`;
  };

  // 处理表单输入
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 表单验证
  const validateForm = () => {
    if (!formData.nickname.trim()) {
      alert('请输入昵�?);
      return false;
    }
    if (formData.nickname.length < 1 || formData.nickname.length > 20) {
      alert('昵称长度应在1-20个字符之�?);
      return false;
    }
    if (!formData.content.trim()) {
      alert('请输入留言内容');
      return false;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert('请输入有效的邮箱地址');
      return false;
    }
    return true;
  };

  // 提交留言
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setSubmitStatus('idle');
    
    // 模拟API调用
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 创建新留言
      const newMessage = {
        id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1,
        nickname: formData.nickname,
        email: formData.email,
        content: formData.content,
        createTime: new Date().toISOString()
      };
      
      // 添加到留言列表
      setMessages(prev => [newMessage, ...prev]);
      
      // 重置表单
      setFormData({ nickname: '', email: '', content: '' });
      setSubmitStatus('success');
      
      // 显示成功消息3�?
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error('提交留言失败:', error);
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  // 获取当前页的留言
  const getCurrentPageMessages = () => {
    const indexOfLastMessage = currentPage * messagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
    return messages.slice(indexOfFirstMessage, indexOfLastMessage);
  };

  // 分页控制
  const totalPages = Math.ceil(messages.length / messagesPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{backgroundImage: 'url(/src/assets/闪电壁纸.jpg)'}}>
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      {/* 动态背景元�?*/}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl top-20 right-20 animate-float"></div>
        <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl bottom-20 left-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
      </div>
      
      <div className="max-w-6xl mx-auto p-8 lg:p-16 relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-gradient animate-float">留言�?/h1>
          <p className="text-gray-300 text-lg glass-effect rounded-xl p-4 inline-block animate-pulse-slow">留下您的足迹，与Ivan互动交流</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 留言表单 */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/70 backdrop-blur border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">✉️</span>
                发布留言
              </h2>
              <p className="text-gray-300 text-sm mb-6">分享您的想法和建�?/p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">
                    昵称 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                    <input
                      name="nickname"
                      type="text"
                      placeholder="请输入昵�?
                      value={formData.nickname}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:border-magic-purple"
                      maxLength={20}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">1-20个字�?/p>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm mb-2">
                    邮箱
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
                    <input
                      name="email"
                      type="email"
                      placeholder="选填，不会公开显示"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:border-magic-purple"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm mb-2">
                    留言内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="content"
                    placeholder="分享您的想法..."
                    value={formData.content}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:border-magic-purple min-h-[100px] resize-none"
                    maxLength={500}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">最�?00个字�?/p>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-magic-purple hover:bg-magic-purple/90 text-white rounded-md px-4 py-2 font-medium transition-colors disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="inline-block animate-spin mr-2">�?/span>
                      提交�?..
                    </>
                  ) : (
                    <>
                      <span className="mr-2">📤</span>
                      发布留言
                    </>
                  )}
                </button>
                
                {submitStatus === 'success' && (
                  <div className="p-3 bg-green-900/30 border border-green-700 rounded-md text-green-300 text-sm">
                    留言发布成功！感谢您的分享�?
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-900/30 border border-red-700 rounded-md text-red-300 text-sm">
                    留言提交失败，请稍后重试�?
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* 留言列表 */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/70 backdrop-blur border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
                <span className="flex items-center">
                  <span className="mr-2">💬</span>
                  留言列表
                </span>
                <span className="text-sm text-gray-400">�?{messages.length} 条留言</span>
              </h2>
              
              {messages.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <div className="text-4xl mb-3 opacity-50">💬</div>
                  <p>还没有留言，快来抢沙发吧！</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {getCurrentPageMessages().map((message) => (
                    <div
                      key={message.id}
                      className="p-4 bg-gray-700/30 rounded-lg border border-gray-600 hover:border-magic-purple/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-magic-purple/20 rounded-full flex items-center justify-center mr-3">
                            <span>👤</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{message.nickname}</h4>
                            {message.email && (
                              <p className="text-xs text-gray-400">{hideEmail(message.email)}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-gray-400">
                          <span>📅</span>
                          <span className="ml-1">{formatDate(message.createTime)}</span>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{message.content}</p>
                    </div>
                  ))}
                  
                  {/* 分页 */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-6">
                      <div className="flex space-x-1">
                        <button
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md text-sm hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          上一�?
                        </button>
                        
                        {Array.from({ length: totalPages }, (_, i) => (
                          <button
                            key={i}
                            onClick={() => paginate(i + 1)}
                            className={`px-3 py-1 rounded-md text-sm ${
                              currentPage === i + 1
                                ? "bg-magic-purple text-white"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        
                        <button
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md text-sm hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          下一�?
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guestbook;
