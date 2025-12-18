import { useState } from 'react';
import '../styles/index.css';

// 照片数据
const personalPhotos = [
  {
    id: 'photo1',
    src: '/ivan-universe/src/assets/photos/个人照片1.jpg',
  },
  {
    id: 'photo2',
    src: '/ivan-universe/src/assets/photos/个人照片2.jpg',
  },

  {
    id: 'photo3',
    src: '/ivan-universe/src/assets/photos/个人照片4.jpg',
  },
  {
    id: 'photo4',
    src: '/ivan-universe/src/assets/photos/个人照片5.jpg',
  },
  {
    id: 'photo5',
    src: '/ivan-universe/src/assets/photos/个人照片6.jpg',
  },
  {
    id: 'photo6',
    src: '/ivan-universe/src/assets/photos/个人照片7.jpg',
  },
  {
    id: 'photo7',
    src: '/ivan-universe/src/assets/photos/个人照片8.jpg',
  },
  {
    id: 'photo8',
    src: '/ivan-universe/src/assets/photos/个人照片9.jpg',
  },
  {
    id: 'photo9',
    src: '/ivan-universe/src/assets/photos/个人照片10.jpg',
  },
  {
    id: 'photo10',
    src: '/ivan-universe/src/assets/photos/个人照片4.jpg',
  }
];

const PhotoModal: React.FC<{
  photo: any;
  photos: any[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}> = ({ photo, photos, onClose, onNext, onPrev }) => {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-4xl max-h-full">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white text-2xl hover:text-red-400 transition-colors"
        >
          ✕
        </button>
        
        <div className="relative">
          <img
            src={photo.src}
            alt="个人照片"
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
          
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            ◀
          </button>
          
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            ▶
          </button>
        </div>
        
        <div className="text-white text-center mt-4">
          {photos.indexOf(photo) + 1} / {photos.length}
        </div>
      </div>
    </div>
  );
};

const Photos: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

  const openModal = (photo: any) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const nextPhoto = () => {
    const currentIndex = personalPhotos.indexOf(selectedPhoto);
    const nextIndex = (currentIndex + 1) % personalPhotos.length;
    setSelectedPhoto(personalPhotos[nextIndex]);
  };

  const prevPhoto = () => {
    const currentIndex = personalPhotos.indexOf(selectedPhoto);
    const prevIndex = (currentIndex - 1 + personalPhotos.length) % personalPhotos.length;
    setSelectedPhoto(personalPhotos[prevIndex]);
  };

  return (
    <div className="min-h-screen relative bg-cover bg-center" style={{backgroundImage: 'url(/ivan-universe/src/assets/闪电壁纸.jpg)'}}>
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      {/* 动态背景元素 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-3xl top-20 right-20 animate-float"></div>
        <div className="absolute w-96 h-96 bg-green-600/10 rounded-full blur-3xl bottom-20 left-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute w-80 h-80 bg-purple-600/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
      </div>
      
      <div className="max-w-6xl mx-auto p-8 lg:p-16 relative z-10">
        <div className="mb-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gradient animate-float">个人照片</h1>
          <p className="text-xl text-gray-300 glass-effect rounded-xl p-6 inline-block animate-pulse-slow">
            精选个人生活瞬间 - 10张珍贵回忆
          </p>
        </div>
        
        {/* 照片统计 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{personalPhotos.length}</div>
            <div className="text-gray-300">精选照片</div>
            <div className="text-sm text-gray-400 mt-2">珍贵生活瞬间</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">2024</div>
            <div className="text-gray-300">拍摄年份</div>
            <div className="text-sm text-gray-400 mt-2">近期生活记录</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">PNG</div>
            <div className="text-gray-300">高清格式</div>
            <div className="text-sm text-gray-400 mt-2">保证画质清晰</div>
          </div>
        </div>
        
        {/* 照片网格 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {personalPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => openModal(photo)}
            >
              <div className="relative overflow-hidden rounded-xl border-2 border-white/10 group-hover:border-white/30 transition-all duration-300">
                <img
                  src={photo.src}
                  alt={`个人照片 ${index + 1}`}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg">
                    👁️ 查看
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 使用提示 */}
        <div className="mt-12 glass-effect rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-white mb-2">📸 使用提示</h3>
          <p className="text-gray-300 text-sm">
            点击任意照片可查看大图，支持左右切换浏览所有照片
          </p>
        </div>
      </div>
      
      {/* 照片模态框 */}
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          photos={personalPhotos}
          onClose={closeModal}
          onNext={nextPhoto}
          onPrev={prevPhoto}
        />
      )}
    </div>
  );
};

export default Photos;