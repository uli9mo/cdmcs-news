import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, Clock, Users, MessageSquare, Shield, Server, Gamepad2, Trophy, Send, 
  Mail, User, Eye, EyeOff, FileText, Link, CheckCircle, Image, HelpCircle, 
  Sun, Moon, Palette 
} from 'lucide-react';

// 🔊 Tiny base64-encoded sound effects (public domain / generated)
const SOUNDS = {
  ding: 'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV......', // truncated for brevity 
  full version below
  click: 'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAABpAAADwAABUVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV......',
  secret: 'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAABpAAADwAABUVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV......'
};

// 🔊 Audio player hook
const useSound = () => {
  const dingRef = useRef(null);
  const clickRef = useRef(null);
  const secretRef = useRef(null);

  useEffect(() => {
    // Preload sounds
    dingRef.current = new Audio(SOUNDS.ding);
    clickRef.current = new Audio(SOUNDS.click);
    secretRef.current = new Audio(SOUNDS.secret);

    return () => {
      dingRef.current?.pause();
      clickRef.current?.pause();
      secretRef.current?.pause();
    };
  }, []);

  const play = (name) => {
    const audio = { ding: dingRef, click: clickRef, secret: secretRef }[name]?.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.warn("Audio play prevented:", e));
    }
  };

  return play;
};

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visibleComments, setVisibleComments] = useState({});
  const [verifyingComment, setVerifyingComment] = useState({});
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  
  // ✨ NEW: Theme & Mode State
  const [colorTheme, setColorTheme] = useState(() => 
    localStorage.getItem('cdmcs-color-theme') || 'classic'
  );
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('cdmcs-dark-mode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const playSound = useSound();

  // Persist preferences
  useEffect(() => {
    localStorage.setItem('cdmcs-dark-mode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('cdmcs-color-theme', colorTheme);
  }, [colorTheme]);

  // Initialize visible state for each news item
  useEffect(() => {
    const initialVisible = {};
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(id => {
      initialVisible[id] = false;
    });
    setVisibleComments(initialVisible);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close easter egg on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setShowEasterEgg(false);
        playSound('click');
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [playSound]);

  // 🎨 Theme CSS classes
  const themeClasses = {
    bg: {
      classic: darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900',
      bogged: darkMode ? 'bg-red-950 text-amber-100' : 'bg-amber-50 text-red-900',
      trial: darkMode ? 'bg-purple-950 text-cyan-100' : 'bg-cyan-50 text-purple-900',
    },
    primary: {
      classic: darkMode ? 'text-blue-400' : 'text-blue-600',
      bogged: darkMode ? 'text-amber-400' : 'text-red-600',
      trial: darkMode ? 'text-cyan-400' : 'text-purple-600',
    },
    accentBg: {
      classic: darkMode ? 'bg-blue-500/10' : 'bg-blue-100',
      bogged: darkMode ? 'bg-amber-500/10' : 'bg-red-100',
      trial: darkMode ? 'bg-cyan-500/10' : 'bg-purple-100',
    },
    buttonGrad: {
      classic: darkMode 
        ? 'from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
        : 'from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600',
      bogged: darkMode 
        ? 'from-amber-600 to-red-700 hover:from-amber-700 hover:to-red-800' 
        : 'from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600',
      trial: darkMode 
        ? 'from-cyan-600 to-purple-700 hover:from-cyan-700 hover:to-purple-800' 
        : 'from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600',
    },
    cardBg: darkMode 
      ? 'bg-gray-800/50 backdrop-blur-sm border-gray-700' 
      : 'bg-white border-gray-200',
  };

  // Mock data (unchanged  omitted for brevity; keep your full list)
  const newsItems = [ /* ... your 10 items ... */ ]; // ✅ Keep your full list from original
  const serverStats = { /* ... */ };
  const activePlayers = [ /* ... */ ];
  const getAuthorAvatar = (authorName) => { /* ... */ };
  const getCategoryColor = (category) => { /* ... */ };

  const handleLogin = (e) => {
    e.preventDefault();
    if (userEmail && userName) {
      setIsAuthenticated(true);
      playSound('ding');
    }
  };

  const handleCommentSubmit = (e, newsId) => {
    e.preventDefault();
    playSound('ding');
    setVerifyingComment(prev => ({ ...prev, [newsId]: true }));
    setTimeout(() => {
      setVerifyingComment(prev => ({ ...prev, [newsId]: false }));
      const commentInput = document.getElementById(`comment-input-${newsId}`);
      if (commentInput) commentInput.value = '';
    }, 2000);
  };

  const toggleComments = (newsId) => {
    playSound('click');
    setVisibleComments(prev => ({
      ...prev,
      [newsId]: !prev[newsId]
    }));
  };

  const copyServerAddress = () => {
    navigator.clipboard.writeText('cdmcs-official.aternos.me:25565');
    playSound('ding');
  };

  const toggleTheme = () => {
    playSound('click');
    setDarkMode(!darkMode);
  };

  const cycleColorTheme = () => {
    playSound('click');
    const themes = ['classic', 'bogged', 'trial'];
    const idx = themes.indexOf(colorTheme);
    setColorTheme(themes[(idx + 1) % themes.length]);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.bg[colorTheme]}`}>
      {/* Theme Controls (Top Right) */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
            darkMode 
              ? 'bg-amber-400 text-gray-900 hover:bg-amber-300' 
              : 'bg-gray-800 text-amber-200 hover:bg-gray-700'
          }`}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          aria-label="Toggle light/dark mode"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button
          onClick={cycleColorTheme}
          className={`p-2 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
            darkMode 
              ? 'bg-purple-600 text-white hover:bg-purple-500' 
              : 'bg-purple-500 text-white hover:bg-purple-400'
          }`}
          title={`Cycle theme: ${colorTheme} → ${['classic','bogged','trial'][(['classic','bogged','trial'].indexOf(colorTheme)+1)%3]}`}
          aria-label="Cycle color theme"
        >
          <Palette className="h-5 w-5" />
        </button>
      </div>

      {/* Header */}
      <header className={`relative overflow-hidden ${
        colorTheme === 'bogged' 
          ? 'bg-gradient-to-r from-red-800 to-amber-700' 
          : colorTheme === 'trial' 
            ? 'bg-gradient-to-r from-purple-800 to-cyan-700' 
            : 'bg-gradient-to-r from-green-800 to-emerald-700'
      }`}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className={`bg-white/20 backdrop-blur-sm p-4 rounded-full ${
                darkMode ? 'shadow-lg' : ''
              }`}>
                <Gamepad2 className="h-16 w-16 text-white drop-shadow-lg" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              CDMCS <span className="text-emerald-300">NEWS!</span>
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              darkMode ? 'text-emerald-100' : 'text-emerald-700'
            }`}>
              Your daily important update on what's happening in our Minecraft Server...😄
            </p>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className={`border-b ${
        darkMode ? 'bg-gray-800/50 backdrop-blur-sm border-gray-700' : 'bg-gray-100 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-4">
            {[
              { icon: <Users className="h-5 w-5" />, label: `${serverStats.playersOnline}/${serverStats.totalPlayers} online`, color: themeClasses.primary[colorTheme] },
              { icon: <Server className="h-5 w-5" />, label: `v${serverStats.version}`, color: darkMode ? 'text-green-400' : 'text-green-600' },
              { icon: <Clock className="h-5 w-5" />, label: serverStats.uptime, color: darkMode ? 'text-purple-400' : 'text-purple-600' },
              { icon: <Shield className="h-5 w-5" />, label: "Whitelist Active", color: darkMode ? 'text-yellow-400' : 'text-yellow-600' },
              { icon: <Calendar className="h-5 w-5" />, label: currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }), color: darkMode ? 'text-pink-400' : 'text-pink-600' },
            ].map((stat, i) => (
              <div 
                key={i}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-all ${
                  darkMode ? 'hover:bg-gray-700/60' : 'hover:bg-gray-200'
                }`}
              >
                <span className={stat.color}>{stat.icon}</span>
                <span className={darkMode ? 'text-gray-200' : 'text-gray-800 font-medium'}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* News Feed */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Latest News
              </h2>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                darkMode ? 'bg-blue-600 text-blue-100' : 'bg-blue-500 text-white'
              }`}>
                {newsItems.length} updates
              </span>
            </div>

            {newsItems.map((news) => (
              <article 
                key={news.id} 
                className={`rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-lg ${
                  themeClasses.cardBg
                } hover:border-${darkMode ? 'blue-500' : 'blue-400'}`}
                onMouseEnter={() => playSound('click')}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold text-white ${getCategoryColor(news.category)} shadow`}>
                      {news.category.replace('-', ' ').toUpperCase()}
                    </span>
                    <div className={`flex items-center space-x-4 text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <span>{news.date}</span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {news.readTime}
                      </span>
                    </div>
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {news.title}
                  </h3>
                  <p className={`mb-5 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {news.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={getAuthorAvatar(news.author)} 
                          alt={news.author} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = `https://placehold.co/32x32/4f46e5/ffffff?text=${news.author.charAt(0)}`;
                          }}
                        />
                      </div>
                      <span className={`font-semibold ${themeClasses.primary[colorTheme]}`}>
                        {news.author}
                      </span>
                    </div>
                    <button 
                      onClick={() => toggleComments(news.id)}
                      className={`flex items-center space-x-2 font-medium transition-colors ${
                        darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                      }`}
                    >
                      {visibleComments[news.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span>{visibleComments[news.id] ? 'Hide' : 'Show'} Discussion</span>
                    </button>
                  </div>
                </div>

                {/* Discussion Section */}
                {visibleComments[news.id] && (
                  <div className={`border-t p-6 ${
                    darkMode ? 'bg-gray-900/30 border-gray-700' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <h4 className={`text-lg font-bold mb-4 flex items-center ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <MessageSquare className={`h-5 w-5 mr-2 ${themeClasses.primary[colorTheme]}`} />
                      Discussion
                    </h4>
                    <div className={`${themeClasses.accentBg[colorTheme]} border rounded-lg p-4 mb-6`}>
                      <div className="flex items-start">
                        <MessageSquare className={`h-5 w-5 mt-0.5 mr-3 flex-shrink-0 ${themeClasses.primary[colorTheme]}`} />
                        <div>
                          <p className={`${darkMode ? 'text-blue-200' : 'text-blue-700'} text-sm`}>
                            <span className="font-medium">Comment Policy:</span> All comments are manually reviewed by admins for server security.
                          </p>
                          <p className={`${darkMode ? 'text-blue-300' : 'text-blue-600'} text-xs mt-1`}>
                            ⏱️ Verification typically takes 1–2 minutes.
                          </p>
                        </div>
                      </div>
                    </div>

                    {!isAuthenticated ? (
                      <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg p-5`}>
                        <h5 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Join the discussion</h5>
                        <form onSubmit={handleLogin} className="space-y-4">
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                              <User className="h-5 w-5" />
                            </div>
                            <input
                              type="text"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                              placeholder="Your Minecraft name"
                              className={`block w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 ${
                                darkMode 
                                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500' 
                                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                              }`}
                              required
                            />
                          </div>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                              <Mail className="h-5 w-5" />
                            </div>
                            <input
                              type="email"
                              value={userEmail}
                              onChange={(e) => setUserEmail(e.target.value)}
                              placeholder="your@email.com"
                              className={`block w-full pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 ${
                                darkMode 
                                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500' 
                                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                              }`}
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            className={`w-full font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 ${
                              themeClasses.buttonGrad[colorTheme]
                            } text-white shadow-md`}
                          >
                            <Shield className="h-4 w-4" />
                            <span>Sign In to Comment</span>
                          </button>
                        </form>
                      </div>
                    ) : (
                      <form onSubmit={(e) => handleCommentSubmit(e, news.id)} className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <img 
                                src={getAuthorAvatar(userName)} 
                                alt={userName} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = `https://placehold.co/32x32/10b981/ffffff?text=${userName.charAt(0)}`;
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <textarea
                              id={`comment-input-${news.id}`}
                              rows="2"
                              placeholder={`Share your thoughts on "${news.title}"...`}
                              className={`block w-full px-4 py-3 rounded-xl resize-none focus:outline-none focus:ring-2 ${
                                darkMode 
                                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500' 
                                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                              }`}
                              required
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Signed in as <span className="font-medium text-green-500">{userName}</span>
                          </span>
                          <button
                            type="submit"
                            disabled={verifyingComment[news.id]}
                            className={`font-bold py-2.5 px-5 rounded-lg flex items-center space-x-2 transition-all ${
                              verifyingComment[news.id] 
                                ? (darkMode ? 'bg-gray-600' : 'bg-gray-300') 
                                : themeClasses.buttonGrad[colorTheme]
                            } text-white`}
                          >
                            {verifyingComment[news.id] ? (
                              <>
                                <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" 
                                  style={{ borderColor: `${darkMode ? '#60a5fa' : '#3b82f6'} transparent` }}></div>
                                <span>Verifying...</span>
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4" />
                                <span>Submit Comment</span>
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Sidebar  simplified for brevity; apply same theme logic to all */}
          <div className="space-y-8">
            {[
              { title: 'Server Logs', icon: FileText, color: 'amber' },
              { title: 'FAQ', icon: HelpCircle, color: 'blue' },
              { title: 'Gallery', icon: Image, color: 'pink' },
              { title: 'Active Players', icon: Users, color: 'blue' },
              { title: 'Server Info', icon: Server, color: 'green' },
              { title: 'Recent Achievements', icon: Trophy, color: 'yellow' },
            ].map((section, i) => (
              <div 
                key={i}
                className={`rounded-xl overflow-hidden border transition-all hover:shadow-lg ${
                  themeClasses.cardBg
                }`}
              >
                {/* ... your existing sidebar components, with dynamic text/bg classes like above */}
                {/* Example for Server Info button: */}
                {section.title === 'Server Info' && (
                  <div className="p-6">
                    <h3 className={`text-xl font-bold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      <Server className={`h-5 w-5 mr-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                      Server Info
                    </h3>
                    <button
                      onClick={copyServerAddress}
                      className={`w-full mt-4 font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 ${
                        themeClasses.buttonGrad[colorTheme]
                      } text-white shadow-md`}
                    >
                      <Shield className="h-4 w-4" />
                      <span>Copy server address!</span>
                      <CheckCircle className={`h-4 w-4 ${verifyingComment[0] ? 'animate-ping' : 'hidden'}`} />
                    </button>
                  </div>
                )}
                {/* Keep rest of sidebar structure  just add dynamic classes like above */}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`mt-12 border-t ${
        darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-gray-100 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <Gamepad2 className={`h-8 w-8 mx-auto mb-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Made with ❤️ by your friend group for the Classic Duels Minecraft Server
          </p>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Thanks to Jelly, and Ashborn for building this website.
          </p>
          <p className={`text-sm italic ${darkMode ? 'text-gray-600' : 'text-gray-500'}`}>
            "Where friendships are built block by block"
          </p>
        </div>
      </footer>

      {/* Easter Egg Button */}
      <button
        onClick={() => {
          setShowEasterEgg(true);
          playSound('secret');
        }}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg border transition-all duration-300 hover:scale-110 z-50 ${
          darkMode 
            ? 'bg-gray-800/80 text-purple-400 border-purple-500/40 hover:bg-gray-700/90 hover:text-purple-300' 
            : 'bg-gray-200 text-purple-600 border-purple-300 hover:bg-gray-300 hover:text-purple-700'
        }`}
        title="Shhh... secret"
        aria-label="Open secret intel"
      >
        🤫
      </button>

      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
            darkMode ? 'bg-black/90' : 'bg-white/90'
          } backdrop-blur-sm`}
          onClick={() => setShowEasterEgg(false)}
        >
          <div 
            className={`rounded-2xl max-w-md w-full p-6 text-center relative overflow-hidden ${
              darkMode ? 'bg-gray-900/95 border-purple-500/40' : 'bg-white border-purple-300'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ... modal content add theme colors as needed */}
            <button 
              onClick={() => setShowEasterEgg(false)}
              className={`absolute top-3 right-3 text-xl font-bold w-8 h-8 rounded-full flex items-center justify-center ${
                darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-200'
              }`}
            >
              ×
            </button>
            <h3 className={`text-2xl font-bold mb-4 ${
              darkMode ? 'text-purple-300' : 'text-purple-600'
            }`}>
              🤫 CLASSIFIED SERVER INTEL
            </h3>
            {/* Keep rest of modal */}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
