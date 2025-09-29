import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Clock, 
  BookOpen, 
  CheckCircle, 
  PlayCircle, 
  Award,
  TrendingUp,
  Users,
  ShieldCheck,
  Utensils,
  Eye,
  Activity,
  Play,
  Volume2,
  Maximize
} from 'lucide-react';
import { Sidebar, DashboardHeader } from './Dashboard';

const TrainingModulesPage = () => {
  const { t } = useTranslation();
  const [selectedModule, setSelectedModule] = useState(null);
  const [hoveredModule, setHoveredModule] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  // Video Modal Component
  const VideoModal = ({ isOpen, onClose, module }) => {
    if (!isOpen || !module) return null;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <div className="aspect-video bg-gray-900 relative">
            <img 
              src={module.videoThumbnail} 
              alt={module.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="bg-white/95 rounded-full p-6">
                <Play size={48} className="text-[#0f766e] ml-2" />
              </div>
            </div>
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-[#08202b] mb-2">{module.title}</h3>
            <p className="text-[#5b6770] mb-4">{module.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-[#5b6770]">
                <span>By {module.instructor}</span>
                <span>•</span>
                <span>{module.duration}</span>
                <span>•</span>
                <span>{module.lessons} lessons</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="font-semibold">{module.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleVideoClick = (module) => {
    setCurrentVideo(module);
    setIsVideoModalOpen(true);
  };

  // Video Preview Component
  const VideoPreview = ({ module, isHovered }) => {
    return (
      <div className="relative group">
        <div 
          className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4 video-thumbnail cursor-pointer"
          onClick={() => handleVideoClick(module)}
        >
          <img 
            src={module.videoThumbnail} 
            alt={`${module.title} preview`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/400x225/0f766e/ffffff?text=${encodeURIComponent(module.title)}`;
            }}
          />
          
          {/* Video Overlay */}
          <div className={`absolute inset-0 video-play-overlay flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            <div className="video-play-button bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-xl">
              <Play size={32} className="text-[#0f766e] ml-1" />
            </div>
          </div>
          
          {/* Video Controls Overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center gap-3">
              <div className="bg-black/70 backdrop-blur-sm rounded-full p-2 hover:bg-black/80 transition-colors cursor-pointer">
                <Volume2 size={14} className="text-white" />
              </div>
              <div className="bg-black/70 backdrop-blur-sm rounded-full p-2 hover:bg-black/80 transition-colors cursor-pointer">
                <Maximize size={14} className="text-white" />
              </div>
            </div>
            <div className="bg-black/80 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full font-medium">
              {module.duration}
            </div>
          </div>
          
          {/* Progress bar for in-progress videos */}
          {module.status === 'in-progress' && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
              <div 
                className="h-full bg-[#0f766e] transition-all duration-300"
                style={{ width: `${module.progress}%` }}
              ></div>
            </div>
          )}
        </div>
        
        {/* Instructor Info */}
        <div className="flex items-center justify-between text-sm text-[#5b6770] mb-3">
          <span className="font-medium">By {module.instructor}</span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500 text-base">★</span>
            <span className="font-semibold">{module.rating}</span>
            <span className="text-gray-400">({module.studentsEnrolled.toLocaleString()})</span>
          </div>
        </div>
      </div>
    );
  };

  // Training modules data
  const trainingModules = [
    {
      id: 1,
      title: "Biosecurity Fundamentals",
      description: "Learn the basic principles of farm biosecurity and disease prevention.",
      duration: "30 mins",
      lessons: 5,
      progress: 100,
      status: "completed",
      icon: <ShieldCheck size={24} />,
      color: "bg-green-500",
      progressColor: "bg-green-500",
      category: "Foundation",
      videoThumbnail: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=400&h=225&fit=crop",
      videoUrl: "https://example.com/biosecurity-fundamentals",
      instructor: "Dr. Sarah Johnson",
      rating: 4.8,
      studentsEnrolled: 1234
    },
    {
      id: 2,
      title: "Visitor Management",
      description: "Best practices for controlling farm access and managing visitors.",
      duration: "25 mins",
      lessons: 4,
      progress: 60,
      status: "in-progress",
      icon: <Users size={24} />,
      color: "bg-blue-500",
      progressColor: "bg-blue-500",
      category: "Access Control",
      videoThumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=225&fit=crop",
      videoUrl: "https://example.com/visitor-management",
      instructor: "Mark Peterson",
      rating: 4.6,
      studentsEnrolled: 892
    },
    {
      id: 3,
      title: "Feed Safety & Storage",
      description: "Proper feed handling, storage, and contamination prevention.",
      duration: "35 mins",
      lessons: 6,
      progress: 0,
      status: "not-started",
      icon: <Utensils size={24} />,
      color: "bg-gray-400",
      progressColor: "bg-gray-300",
      category: "Feed Management",
      videoThumbnail: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=225&fit=crop",
      videoUrl: "https://example.com/feed-safety",
      instructor: "Lisa Chen",
      rating: 4.7,
      studentsEnrolled: 567
    },
    {
      id: 4,
      title: "Disease Recognition",
      description: "Identifying early signs of common pig and poultry diseases.",
      duration: "45 mins",
      lessons: 8,
      progress: 20,
      status: "in-progress",
      icon: <Eye size={24} />,
      color: "bg-purple-500",
      progressColor: "bg-purple-500",
      category: "Health Monitoring",
      videoThumbnail: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400&h=225&fit=crop",
      videoUrl: "https://example.com/disease-recognition",
      instructor: "Dr. James Wilson",
      rating: 4.9,
      studentsEnrolled: 2103
    }
  ];

  const overallProgress = Math.round(
    trainingModules.reduce((acc, module) => acc + module.progress, 0) / trainingModules.length
  );

  const completedModules = trainingModules.filter(module => module.status === 'completed').length;
  const totalLessons = trainingModules.reduce((acc, module) => acc + module.lessons, 0);

  const getStatusButton = (module) => {
    switch (module.status) {
      case 'completed':
        return (
          <button 
            onClick={() => handleVideoClick(module)}
            className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition-colors"
          >
            <CheckCircle size={16} />
            Watch Again
          </button>
        );
      case 'in-progress':
        return (
          <button 
            onClick={() => handleVideoClick(module)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0f766e] hover:bg-[#0b5e53] text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
          >
            <Play size={16} />
            Continue Video
          </button>
        );
      default:
        return (
          <button 
            onClick={() => handleVideoClick(module)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0f766e] hover:bg-[#0b5e53] text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
          >
            <Play size={16} />
            Start Video
          </button>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#f6fbf9] font-sans">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f6fbf9] p-8">
          <div className="container mx-auto max-w-7xl">
            
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#0f766e] to-[#0ea5a1] text-white p-6 md:p-8 rounded-xl shadow-lg mb-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                <div className="w-full lg:w-auto mb-6 lg:mb-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                    <div className="p-3 bg-white/20 rounded-full">
                      <GraduationCap size={32} />
                    </div>
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold">{t('training_modules') || 'Training Modules'}</h1>
                      <p className="text-teal-100">{t('interactive_training') || 'Interactive biosecurity training and education'}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm">
                    <span className="font-semibold">{t('overall_progress') || 'Overall Progress'}</span>
                    <span className="text-teal-100">{overallProgress}%</span>
                    <span className="text-teal-100">{completedModules}/{trainingModules.length} completed</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-white/20 rounded-full h-3 mt-3 overflow-hidden">
                    <div 
                      className="progress-bar bg-white h-full rounded-full"
                      style={{ width: `${overallProgress}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Achievement Badge */}
                <div className="text-center lg:text-right">
                  <div className="p-4 bg-white/10 rounded-full mb-2 inline-block">
                    <Award size={40} />
                  </div>
                  <p className="text-xs text-teal-100">{t('knowledge_score') || 'Knowledge Score'}</p>
                  <p className="text-2xl font-bold">95%</p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-[#08202b]">{completedModules}</p>
                    <p className="text-[#5b6770] font-medium">Modules Completed</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-[#08202b]">{totalLessons}</p>
                    <p className="text-[#5b6770] font-medium">Total Lessons</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <BookOpen className="text-blue-600" size={24} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-[#08202b]">95%</p>
                    <p className="text-[#5b6770] font-medium">Knowledge Score</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <TrendingUp className="text-purple-600" size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Training Modules Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {trainingModules.map((module) => (
                <div 
                  key={module.id} 
                  className="training-card bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden"
                  onMouseEnter={() => setHoveredModule(module.id)}
                  onMouseLeave={() => setHoveredModule(null)}
                >
                  <div className="p-6">
                    {/* Video Preview */}
                    <VideoPreview module={module} isHovered={hoveredModule === module.id} />
                    
                    {/* Module Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4">
                      <div className="flex items-center gap-4 mb-4 sm:mb-0">
                        <div className={`p-3 ${module.color === 'bg-gray-400' ? 'bg-gray-100' : module.color.replace('bg-', 'bg-').replace('500', '100')} rounded-lg`}>
                          <div className={module.color === 'bg-gray-400' ? 'text-gray-500' : module.color.replace('bg-', 'text-').replace('500', '600')}>
                            {module.icon}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
                            {module.category}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold text-[#08202b] mt-1">{module.title}</h3>
                        </div>
                      </div>
                      
                      {module.status === 'completed' && (
                        <div className="text-green-600 self-start">
                          <CheckCircle size={24} />
                        </div>
                      )}
                    </div>

                    {/* Module Description */}
                    <p className="text-[#5b6770] mb-4 leading-relaxed">{module.description}</p>

                    {/* Module Meta Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-4 text-sm text-[#5b6770]">
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{module.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} />
                        <span>{module.lessons} lessons</span>
                      </div>
                    </div>

                    {/* Progress Section */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-[#08202b]">Progress</span>
                        <span className="text-sm font-medium text-[#5b6770]">{module.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`progress-bar ${module.progressColor} h-full rounded-full`}
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-end">
                      {getStatusButton(module)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Achievements Section */}
            <div className="bg-gradient-to-br from-teal-500 via-teal-400 to-green-300 text-[#08202b] p-6 md:p-8 rounded-2xl shadow-xl border border-teal-200/60">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="w-full lg:w-auto mb-6 lg:mb-0">
                  <h2 className="text-xl md:text-2xl font-bold mb-2 text-teal-900 drop-shadow-sm">{t('training_achievements') || 'Training Achievements'}</h2>
                  <p className="text-base mb-4 text-teal-700 font-medium">{t('keep_learning') || 'Keep learning to unlock more achievements'}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8 text-center">
                    <div>
                      <div className="text-3xl md:text-4xl font-extrabold text-teal-900 drop-shadow">{completedModules}</div>
                      <div className="text-sm text-teal-700 font-semibold">{t('modules_completed') || 'Modules Completed'}</div>
                    </div>
                    <div>
                      <div className="text-3xl md:text-4xl font-extrabold text-teal-900 drop-shadow">{totalLessons}</div>
                      <div className="text-sm text-teal-700 font-semibold">{t('total_lessons') || 'Total Lessons'}</div>
                    </div>
                    <div>
                      <div className="text-3xl md:text-4xl font-extrabold text-teal-900 drop-shadow">95%</div>
                      <div className="text-sm text-teal-700 font-semibold">{t('knowledge_score') || 'Knowledge Score'}</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center lg:text-right flex flex-col items-center lg:items-end">
                  <div className="p-6 bg-white/70 rounded-full mb-4 inline-block shadow-md border border-teal-100">
                    <Award size={48} className="text-teal-500" />
                  </div>
                  <p className="text-sm font-semibold text-teal-800">{t('achievement_badge') || 'Achievement Badge'}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Video Modal */}
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        module={currentVideo} 
      />
    </div>
  );
};

export default TrainingModulesPage;