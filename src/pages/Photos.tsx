import { useState } from 'react';
import '../styles/index.css';

// 照片数据
const personalPhotos = [
  {
    id: 'photo1',
    src: './assets/photos/095F78ADCD5310569708FA082E291F1C.png',
  },
  {
    id: 'photo2',
    src: './assets/photos/26FF7BCFA668994119DCD478587A8BFA.png',
  },
  {
    id: 'photo3',
    src: './assets/photos/41F28878875BAC7A9254DA125F7640AE.png',
  },
  {
    id: 'photo4',
    src: './assets/photos/531EA8348291D0C985654EEA74D82634.png',
  },
  {
    id: 'photo5',
    src: './assets/photos/6FF85BF4F5FD10118AC36781B84CE2BB.png',
  },
  {
    id: 'photo6',
    src: './assets/photos/95D2BADE3D7D4A8B6623756FC78B4ED6.png',
  },
  {
    id: 'photo7',
    src: './assets/photos/AB29A9BE23B5D86F8E890F5377135DE6.png',
  },
  {
    id: 'photo8',
    src: './assets/photos/AD6EF0195535693CB3BFCF4BF2A874F9.png',
  },
  {
    id: 'photo9',
    src: './assets/photos/D588ED9810ED2EF331B9BEDB5362F07E.png',
  },
  {
    id: 'photo10',
    src: './assets/photos/EEFF253F75498A1E3AC8C6C920E3118F.png',
  }
];

const PhotoModal: React.FC<{
  photo: any;
  photos: any[];
  isOpen: boolean;
  onClose: () => void;
}> = ({ photo, photos, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(
    photos.findIndex((p) => p.id === photo.id)
  );

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const currentPhoto = photos[currentIndex];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={onClose}>
      <div className="relative max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center z-10"
        >
          �?
        </button>
        
        <button 
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center z-10"
        >
          �?
        </button>
        
        <button 
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center z-10"
        >
          �?
        </button>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="flex justify-center items-center bg-black/50 min-h-[60vh]">
            <img 
              src={currentPhoto.src} 
              alt="个人照片"
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
        
        <div className="flex justify-center mt-4 gap-2">
          {photos.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-gray-500'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Photos: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPhotoModal = (photo: any) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{backgroundImage: 'url(/src/assets/闪电壁纸.jpg)'}}>
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      
      {/* 动态背景元�?*/}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl top-20 right-20 animate-float"></div>
        <div className="absolute w-96 h-96 bg-pink-600/20 rounded-full blur-3xl bottom-20 left-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute w-80 h-80 bg-blue-600/20 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
      </div>
      
      <div className="max-w-6xl mx-auto p-8 lg:p-16 relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-gradient animate-float">个人照片</h1>
          <p className="text-gray-300 text-lg glass-effect rounded-xl p-4 inline-block animate-pulse-slow">记录生活点滴，分享美好瞬�?/p>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {personalPhotos.map((photo) => (
            <div 
              key={photo.id}
              className="bg-gray-800/70 backdrop-blur border border-gray-700 hover:border-magic-purple card-hover overflow-hidden group rounded-lg cursor-pointer"
              onClick={() => openPhotoModal(photo)}
            >
              <div className="p-0">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={photo.src} 
                    alt="个人照片"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-magic-purple/80 hover:bg-magic-purple text-white rounded-full w-12 h-12 flex items-center justify-center">
                      🔍
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Photo modal */}
        {selectedPhoto && (
          <PhotoModal 
            photo={selectedPhoto}
            photos={personalPhotos}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default Photos;
