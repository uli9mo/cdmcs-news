import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, Clock, Users, MessageSquare, Shield, Server, Gamepad2, Trophy, Send, 
  Mail, User, Eye, EyeOff, FileText, Link, CheckCircle, Image, HelpCircle, 
  Sun, Moon, Palette 
} from 'lucide-react';

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visibleComments, setVisibleComments] = useState({});
  const [verifyingComment, setVerifyingComment] = useState({});
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('cdmcs-darkMode') === 'true' || 
           window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [colorTheme, setColorTheme] = useState(() => {
    return localStorage.getItem('cdmcs-colorTheme') || 'classic';
  });

  const audioRef = useRef(null);

  // Theme gradients
  const themeGradients = {
    classic: 'from-blue-600 to-purple-600',
    bogged: 'from-red-500 via-amber-500 to-yellow-500',
    trial: 'from-purple-600 via-cyan-500 to-blue-500',
    harley: 'from-indigo-700 via-purple-800 to-black',
    diamonds: 'from-cyan-400 via-blue-500 to-teal-600',
    zombie: 'from-green-700 via-lime-600 to-yellow-500',
    nether: 'from-red-800 via-pink-700 to-purple-900',
    ocean: 'from-teal-500 via-cyan-400 to-blue-600',
    goldrush: 'from-yellow-400 via-amber-500 to-orange-600',
    sunrise: 'from-amber-400 via-orange-500 to-pink-600',
    epstein: 'from-gray-800 via-gray-600 to-teal-900',
    void: 'from-black via-gray-900 to-purple-950'
  };

  const bgGradients = {
    classic: 'from-gray-900 via-blue-900 to-purple-900',
    bogged: 'from-gray-900 via-red-900 to-amber-900',
    trial: 'from-gray-900 via-purple-900 to-cyan-900',
    harley: 'from-gray-950 via-indigo-950 to-black',
    diamonds: 'from-gray-900 via-cyan-900 to-teal-900',
    zombie: 'from-gray-900 via-green-900 to-lime-900',
    nether: 'from-gray-900 via-red-900 to-pink-900',
    ocean: 'from-gray-900 via-teal-900 to-blue-900',
    goldrush: 'from-gray-900 via-yellow-900 to-amber-900',
    sunrise: 'from-gray-900 via-amber-900 to-pink-900',
    epstein: 'from-gray-950 via-gray-800 to-teal-950',
    void: 'from-black via-gray-950 to-purple-950'
  };

  // Save preferences
  useEffect(() => {
    localStorage.setItem('cdmcs-darkMode', darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('cdmcs-colorTheme', colorTheme);
  }, [colorTheme]);

  // Initialize visible state for news items
  useEffect(() => {
    const initialVisible = {};
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].forEach(id => {
      initialVisible[id] = false;
    });
    setVisibleComments(initialVisible);
  }, []);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close easter egg on Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setShowEasterEgg(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // News items — updated with log-accurate stories
  const newsItems = [
    {
      id: 1,
      title: "Fundraiser! 💰",
      content: "We worked hard coding and building this website. Please consider donating some Robux! (Note: 6 diamonds delivered, 2 promised. Transparency matters.)",
      author: "Ibiklackeur",
      date: "Dec 14, 2025",
      time: "18:26",
      category: "charity",
      readTime: "1 min"
    },
    {
      id: 2,
      title: "New Survival World Launched!",
      content: "After weeks of planning, our new survival world for Classic Duels is live — complete with mods, features, and official website!",
      author: "Eyewatercanwaters2",
      date: "Dec 13, 2025",
      time: "13:30",
      category: "major-update",
      readTime: "1 min"
    },
    {
      id: 3,
      title: "Weekly Build Contest",
      content: "Want to join? Send screenshots of your builds in our Discord channel. Winner gets bragging rights and a featured spot in the Gallery!",
      author: "Ashborn",
      date: "Dec 13, 2025",
      time: "13:15",
      category: "contest",
      readTime: "1 min"
    },
    {
      id: 4,
      title: "Server Start-up Scheduled",
      content: "Essential mods are being added. Official launch: Dec 14, 10:50 AM. Be ready!",
      author: "Jiemos",
      date: "Dec 13, 2025",
      time: "13:09",
      category: "maintenance",
      readTime: "1 min"
    },
    {
      id: 5,
      title: "Plugin Recommendation: Tough As Nails",
      content: "This mod adds real challenge — thirst, temperature, seasonal crops. Great for hardcore players.",
      author: "Ibiklackeur",
      date: "Dec 13, 2025",
      time: "6:45",
      category: "feature",
      readTime: "30 sec"
    },
    {
      id: 6,
      title: "Holiday Event Planning",
      content: "Christmas theme park in the works! DM Jiemos if you want to help build.",
      author: "Jiemos",
      date: "Dec 1, 2025",
      time: "19:20",
      category: "event",
      readTime: "2 min"
    },
    {
      id: 7,
      title: "🚨 Bogged Incident Report",
      content: "Following 4 Bogged ambushes (log lines #384, #400–403), Ancient City is now reinforced with torches and iron golems. Ibikl granted temporary immunity.",
      author: "Jiemos",
      date: "Dec 15, 2025",
      time: "09:14",
      category: "maintenance",
      readTime: "1 min"
    },
    {
      id: 8,
      title: "🏆 Trial Chamber Discovery!",
      content: "Kira and Ibikl found the third Trial Chamber. Contents: full diamond gear, trial key, and zero Bogged. Coordinates available via DM (trust required).",
      author: "Kira",
      date: "Dec 16, 2025",
      time: "14:22",
      category: "major-update",
      readTime: "1 min"
    },
    {
      id: 9,
      title: "🤫 'Harley Leakz' Verified: Real or Prank?",
      content: "Multiple players received Discord DMs from 'Harley'. Official statement: There is no Harley. If contacted, screenshot and report to @Ibiklackeur. (We are monitoring.)",
      author: "Ibiklackeur",
      date: "Dec 17, 2025",
      time: "22:07",
      category: "event",
      readTime: "2 min"
    },
    {
      id: 10,
      title: "🛡️ Ibikl’s Bogged Survival Guide",
      content: "After 4 Bogged hits in 2 minutes, Ibikl’s top tip: 'Just don’t go in the Ancient City.' Full guide in Discord → includes armor tips, escape routes, and PTSD support.",
      author: "Ibikl",
      date: "Dec 19, 2025",
      time: "10:22",
      category: "guide",
      readTime: "1 min"
    },
    {
      id: 11,
      title: "💸 The Great Donation Scam™",
      content: "'Feel free to donate so myself and my team can code more!' → 10 hours coding → 'js send it urself' → 2 diamonds promised → 6 delivered. A cautionary tale in community trust.",
      author: "Asparagus21345",
      date: "Dec 20, 2025",
      time: "14:07",
      category: "exposed",
      readTime: "2 min"
    },
    {
      id: 12,
      title: "⚰️ Asparagus’s 18 Zombie Deaths Memorial",
      content: "In honor of the fallen: slain by Zombie (x18), fell from height (x1), drowned (x0). A candle burns at spawn. Rest in pieces.",
      author: "Kira",
      date: "Dec 21, 2025",
      time: "09:14",
      category: "memorial",
      readTime: "30 sec"
    },
    {
      id: 13,
      title: "🎮 Let’s Rebuild — Together",
      content: "Old servers had fighting, cheating, burnout. This one can be different. No griefing. No stealing. Just building, exploring, and laughing when you fall 200 blocks. Let’s try again.",
      author: "Ibiklackeur",
      date: "Dec 22, 2025",
      time: "08:00",
      category: "community",
      readTime: "1 min"
    }
  ];

  // Server stats
  const serverStats = {
    playersOnline: 3,
    totalPlayers: 12,
    uptime: "2h 14m",
    version: "1.21.10 FABRIC",
    worldSize: "4.82 GB"
  };

  // Active players with avatars
  const activePlayers = [
    { name: "Kira", status: "Online", time: "2 hour", avatar: "https://cdn.discordapp.com/avatars/1271440596195737693/2dc56e1377af394802df23561eff2e13.png" },
    { name: "Asparagus21345", status: "Idle", time: "8 hour", avatar: "https://placehold.co/32x32/6366f1/ffffff?text=A" },
    { name: "Ibikl", status: "Online", time: "4 hour", avatar: "https://pticaarchive.wordpress.com/wp-content/uploads/2012/10/naked-banana.jpg?w=620" },
    { name: "Senkaium", status: "Offline", time: "2 hours", avatar: "https://placehold.co/32x32/8b5cf6/ffffff?text=S" },
    { name: "Dristach391", status: "Offline", time: "1 hour", avatar: "https://cdn.discordapp.com/avatars/1238944179837734947/92283dd7964213b9ea0ae19679a83c60.png" },
    { name: "Jiemos", status: "Online", time: "1 hour", avatar: "https://i.natgeofe.com/k/6f2282df-1c6a-474a-9216-ed97b3dce858/Panda-Bamboo_Panda-Quiz_KIDS_1021.jpg?wp=1&w=1084.125&h=721.875" },
    { name: "", status: "", time: "", avatar: "" },
    { name: "", status: "", time: "", avatar: "" }
  ];

  const getAuthorAvatar = (authorName) => {
    const name = authorName.toLowerCase();
    switch (name) {
      case 'ibiklackeur':
      case 'ibikl':
        return 'https://pticaarchive.wordpress.com/wp-content/uploads/2012/10/naked-banana.jpg?w=620';
      case 'eyewatercanwaters2':
        return 'https://cdn.discordapp.com/avatars/1345578724732567564/e6192c86ac8410150345cb811d0ca429.png';
      case 'kira':
        return 'https://cdn.discordapp.com/avatars/1271440596195737693/2dc56e1377af394802df23561eff2e13.png';
      case 'ashborn':
        return 'https://cdn.discordapp.com/avatars/822808474072121345/51bacd23a923b3480a785113146dda26.png?size=512';
      case 'jiemos':
        return 'https://i.natgeofe.com/k/6f2282df-1c6a-474a-9216-ed97b3dce858/Panda-Bamboo_Panda-Quiz_KIDS_1021.jpg?wp=1&w=1084.125&h=721.875';
      case 'dristach391':
        return 'https://cdn.discordapp.com/avatars/1238944179837734947/92283dd7964213b9ea0ae19679a83c60.png';
      default:
        return `https://placehold.co/32x32/4f46e5/ffffff?text=${authorName.charAt(0)}`;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'major-update': return 'bg-purple-500';
      case 'contest': return 'bg-yellow-500';
      case 'maintenance': return 'bg-blue-500';
      case 'feature': return 'bg-green-500';
      case 'event': return 'bg-pink-500';
      case 'charity': return 'bg-amber-500';
      case 'guide': return 'bg-indigo-500';
      case 'exposed': return 'bg-red-500';
      case 'memorial': return 'bg-gray-500';
      case 'community': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (userEmail && userName) {
      setIsAuthenticated(true);
    }
  };

  const handleCommentSubmit = (e, newsId) => {
    e.preventDefault();
    setVerifyingComment(prev => ({ ...prev, [newsId]: true }));
    setTimeout(() => {
      setVerifyingComment(prev => ({ ...prev, [newsId]: false }));
      const commentInput = document.getElementById(`comment-input-${newsId}`);
      if (commentInput) commentInput.value = '';
    }, 2000);
  };

  const toggleComments = (newsId) => {
    setVisibleComments(prev => ({
      ...prev,
      [newsId]: !prev[newsId]
    }));
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const cycleColorTheme = () => {
    const themes = Object.keys(themeGradients);
    const currentIndex = themes.indexOf(colorTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setColorTheme(themes[nextIndex]);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${bgGradients[colorTheme]}`}>
      {/* Theme Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button 
          onClick={toggleTheme}
          className={`p-2.5 rounded-full shadow-lg flex items-center justify-center ${
            darkMode 
              ? 'bg-yellow-400 text-gray-900' 
              : 'bg-gray-800 text-yellow-300'
          }`}
          title="Toggle light/dark mode"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button 
          onClick={cycleColorTheme}
          className={`p-2.5 rounded-full shadow-lg flex items-center justify-center bg-gradient-to-r ${themeGradients[colorTheme]} text-white`}
          title={`Theme: ${colorTheme} (click to cycle)`}
        >
          <Palette className="h-5 w-5" />
        </button>
      </div>

      {/* Header */}
      <header className={`relative overflow-hidden bg-gradient-to-r ${themeGradients[colorTheme]}`}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                <Gamepad2 className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              CDMCS NEWS!
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Your daily update on what's happening in our Minecraft Server • Block by block, friend by friend
            </p>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-400" />
              <span className="text-white font-medium">{serverStats.playersOnline}/{serverStats.totalPlayers} online</span>
            </div>
            <div className="flex items-center space-x-2">
              <Server className="h-5 w-5 text-green-400" />
              <span className="text-gray-300">v{serverStats.version}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-400" />
              <span className="text-gray-300">{serverStats.uptime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-yellow-400" />
              <span className="text-gray-300">Whitelist Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-pink-400" />
              <span className="text-gray-300">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* News Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">Latest News</h2>
              <span className="px-3 py-1 bg-blue-600 text-blue-100 rounded-full text-sm font-medium">
                {newsItems.length} updates
              </span>
            </div>

            {newsItems.map((news) => (
              <article 
                key={news.id} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:border-blue-500 transition-all duration-300 hover:shadow-lg"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getCategoryColor(news.category)}`}>
                      {news.category.replace('-', ' ').toUpperCase()}
                    </span>
                    <div className="flex items-center space-x-4 text-gray-400 text-sm">
                      <span>{news.date}</span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {news.readTime}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{news.title}</h3>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {news.content}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={getAuthorAvatar(news.author)} 
                          alt={news.author} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = `https://placehold.co/32x32/4f46e5/ffffff?text=${news.author.charAt(0)}`;
                          }}
                        />
                      </div>
                      <span className="text-blue-300 font-medium">{news.author}</span>
                    </div>
                    <button 
                      onClick={() => toggleComments(news.id)}
                      className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                    >
                      {visibleComments[news.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="text-sm">
                        {visibleComments[news.id] ? 'Hide' : 'Show'} Discussion
                      </span>
                    </button>
                  </div>
                </div>

                {/* Discussion Section */}
                {visibleComments[news.id] && (
                  <div className="border-t border-gray-700 bg-gray-900/30 p-6">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-blue-400" />
                      Discussion
                    </h4>
                    
                    <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mb-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <MessageSquare className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-blue-200 text-sm">
                            <span className="font-medium">Comment Policy:</span> All comments are manually reviewed by admins for server security.
                          </p>
                          <p className="text-blue-300 text-xs mt-1">
                            ✓ Verification typically takes 1-2 minutes  
                            ✓ Approved comments appear to everyone
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Comment Form */}
                    {!isAuthenticated ? (
                      <div className="bg-gray-800 rounded-lg p-4">
                        <h5 className="font-medium text-white mb-3">Join the discussion</h5>
                        <form onSubmit={handleLogin} className="space-y-3">
                          <div className="flex space-x-3">
                            <div className="flex-1">
                              <label htmlFor="name" className="sr-only">Name</label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                  type="text"
                                  id="name"
                                  value={userName}
                                  onChange={(e) => setUserName(e.target.value)}
                                  placeholder="Your Minecraft name"
                                  className="block w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <div className="flex-1">
                              <label htmlFor="email" className="sr-only">Email</label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                  type="email"
                                  id="email"
                                  value={userEmail}
                                  onChange={(e) => setUserEmail(e.target.value)}
                                  placeholder="your@email.com"
                                  className="block w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                          >
                            <Shield className="h-4 w-4" />
                            <span>Sign In to Comment</span>
                          </button>
                        </form>
                      </div>
                    ) : (
                      <form 
                        onSubmit={(e) => handleCommentSubmit(e, news.id)} 
                        className="space-y-3"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
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
                              className="block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Signed in as {userName}</span>
                          <button
                            type="submit"
                            disabled={verifyingComment[news.id]}
                            className={`${
                              verifyingComment[news.id] 
                                ? 'bg-gray-600 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                            } text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center space-x-2`}
                          >
                            {verifyingComment[news.id] ? (
                              <>
                                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
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
                        
                        {verifyingComment[news.id] && (
                          <div className="mt-3 p-3 bg-amber-900/20 border border-amber-700 rounded-lg">
                            <div className="flex items-center text-amber-300">
                              <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                              <span className="text-sm font-medium">Verifying comment...</span>
                            </div>
                            <p className="text-amber-400 text-xs mt-1 ml-6">
                              Please wait • All comments are reviewed for anti-cheat compliance
                            </p>
                          </div>
                        )}
                      </form>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Server Logs */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-amber-400" />
                    Server Logs
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Daily logs • Updated after each session
                </p>
                
                <div className="bg-gray-900/50 rounded-lg p-4 min-h-[200px]">
                  <div className="text-amber-300 font-mono text-sm space-y-2">
                    <div className="flex items-start">
                      <Link className="h-4 w-4 text-amber-400 mt-1 mr-2 flex-shrink-0" />
                      <span>
                        <a href="https://mclo.gs/7OJvEiK" 
                           className="text-blue-300 hover:text-blue-200 hover:underline"
                           target="_blank" rel="noopener noreferrer">
                          Dec 18, 2025 Server Log
                        </a>
                      </span>
                    </div>
                    <div className="flex items-start">
                      <Link className="h-4 w-4 text-amber-400 mt-1 mr-2 flex-shrink-0" />
                      <span>
                        <a href="https://mclo.gs/wpL50I4" 
                           className="text-blue-300 hover:text-blue-200 hover:underline"
                           target="_blank" rel="noopener noreferrer">
                          Dec 15, 2025 Server Log
                        </a>
                      </span>
                    </div>
                    <div className="flex items-start">
                      <Link className="h-4 w-4 text-amber-400 mt-1 mr-2 flex-shrink-0" />
                      <span>
                        <a href="https://mclo.gs/zQjJY4i" 
                           className="text-blue-300 hover:text-blue-200 hover:underline"
                           target="_blank" rel="noopener noreferrer">
                          Dec 14, 2025 Server Log
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ — Fully Fixed */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-blue-400" />
                    FAQ
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-300 mb-2">❓ Do Jiemos and Ibiklackeur cheat?</h4>
                    <p className="text-gray-300 text-sm">
                      <span className="text-green-400 font-medium">No, we don't.</span> Server logs are posted daily for full transparency. All admin actions are visible to the community.
                      <br/><br/>
                      <span className="text-xs text-gray-500">- Jiemos & Ibiklackeur</span>
                    </p>
                  </div>
                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-300 mb-2">❓ Do you log IP addresses?</h4>
                    <p className="text-gray-300 text-sm">
                      <span className="text-green-400 font-medium">No.</span> This website has no backend to track visitor data. We respect your privacy.
                      <br/><br/>
                      <span className="text-xs text-gray-500">- Eyewatercanwaters2</span>
                    </p>
                  </div>
                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-300 mb-2">❓ Is joining free?</h4>
                    <p className="text-gray-300 text-sm">
                      <span className="text-green-400 font-medium">Yes.</span> The server is funded by Ibiklackeur. All friends (and friends of friends) are welcome.
                      <br/><br/>
                      <span className="text-xs text-gray-500">- Ibiklackeur</span>
                    </p>
                  </div>
                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-300 mb-2">❓ How to get admin/moderator access?</h4>
                    <p className="text-gray-300 text-sm">
                      <span className="text-green-400 font-medium">Admin roles aren't given out.</span> If you're helpful, respectful, and contribute positively over time, you may be considered for a special role — but never for power or influence.
                      <br/><br/>
                      <span className="text-xs text-gray-500">- Eyewatercanwaters2 & Ibiklackeur</span>
                    </p>
                  </div>
                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-300 mb-2">❓ Who owns the server?</h4>
                    <p className="text-gray-300 text-sm">
                      <span className="text-green-400 font-medium">Discord: Ibiklackeur. Minecraft server: Jiemos, Ibiklackeur & Ashborn.</span>
                      <br/><br/>
                      <span className="text-xs text-gray-500">- Ibiklackeur, Eyewatercanwaters2</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <Image className="h-5 w-5 mr-2 text-pink-400" />
                    Gallery
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Our Minecraft moments • Submit yours on Discord!
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-square rounded-lg overflow-hidden border border-gray-600">
                    <img 
                      src="https://placehold.co/300x300/4ade80/000000?text=Build" 
                      alt="Minecraft build" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden border border-gray-600">
                    <img 
                      src="https://placehold.co/300x300/8b5cf6/000000?text=Adventure" 
                      alt="Minecraft adventure" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden border border-gray-600">
                    <img 
                      src="https://placehold.co/300x300/0ea5e9/000000?text=Redstone" 
                      alt="Minecraft redstone" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden border border-gray-600">
                    <img 
                      src="https://placehold.co/300x300/f59e0b/000000?text=Fun" 
                      alt="Minecraft fun" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-700 text-center">
                  <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                    Check Discord for gallery contest • Weekly prizes!
                  </button>
                </div>
              </div>
            </div>

            {/* Active Players */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-400" />
                  Active Players
                </h3>
                <span className="text-blue-400 font-bold">{serverStats.playersOnline}</span>
              </div>
              
              <div className="space-y-3">
                {activePlayers.map((player, index) => {
                  if (!player.name) return null;
                  return (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                          {player.avatar ? (
                            <img 
                              src={player.avatar} 
                              alt={player.name} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = `https://placehold.co/32x32/4f46e5/ffffff?text=${player.name.charAt(0)}`;
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                              <span className="text-xs font-bold text-white">{player.name.charAt(0)}</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{player.name}</p>
                          <p className="text-gray-400 text-xs">{player.status}</p>
                        </div>
                      </div>
                      <span className="text-gray-400 text-xs">{player.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Server Info */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Server className="h-5 w-5 mr-2 text-green-400" />
                Server Info
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">IP Address</span>
                  <span className="text-white font-mono">cdmcs-official.aternos.me</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Port</span>
                  <span className="text-white font-mono">25565</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Version</span>
                  <span className="text-green-400">1.21.10 Fabric</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">World Size</span>
                  <span className="text-white">{serverStats.worldSize}</span>
                </div>
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Copy server address!</span>
              </button>
            </div>

            {/* Recent Achievements */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
                Recent Achievements
              </h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-yellow-900/30 rounded-lg">
                  <p className="text-yellow-200 font-medium">First to find a Trial Chamber! ✓</p>
                  <p className="text-yellow-300 text-sm">Kira</p>
                  <p className="text-gray-400 text-xs mt-1">Congrats!</p>
                </div>
                <div className="p-3 bg-green-900/30 rounded-lg">
                  <p className="text-green-200 font-medium">First to make a farm! ✓</p>
                  <p className="text-green-300 text-sm">Asparagus21345</p>
                  <p className="text-gray-400 text-xs mt-1">Congratulations!</p>
                </div>
                <div className="p-3 bg-purple-900/30 rounded-lg">
                  <p className="text-purple-200 font-medium">First to survive Bogged x4! ✓</p>
                  <p className="text-purple-300 text-sm">Ibikl</p>
                  <p className="text-gray-400 text-xs mt-1">Legend status</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Gamepad2 className="h-8 w-8 text-emerald-400" />
            </div>
            <p className="text-gray-400">
              Made with ❤️ by your friend group for the Classic Duels Minecraft Server
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Thanks to Jelly, Ashborn, and ibiklackeur for building this website.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              "Where friendships are built block by block"
            </p>
          </div>
        </div>
      </footer>

      {/* 🤫 Easter Egg Button */}
      <button
        onClick={() => {
          setShowEasterEgg(true);
          // Play secret sound if supported
          if (audioRef.current) {
            audioRef.current.play().catch(e => console.log('Audio blocked'));
          }
        }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gray-800/70 hover:bg-gray-700/80 backdrop-blur-sm rounded-full flex items-center justify-center text-purple-400 hover:text-purple-300 shadow-lg border border-purple-500/30 transition-all duration-300 hover:scale-110 z-50"
        title="Shhh... secret"
      >
        🤫
      </button>

      {/* Hidden audio element for easter egg */}
      <audio ref={audioRef} src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFeG1ramtsb3N4fH5/gH54c25qamttcHN3enx9fHp2cGxqamtsb3V5fH59eXRuaWhoaW1wdnh8fn16dG5qZ2ZnaW1ydnl8fHlxbGlnZmdqb3J3e359eHFsa2ppa25ydXp+fXpzb2tnZmdqbG90d3p7eXZwbWppaWprbnF1eHt6d3Nua2loaGpsb3F0dnd2c29samloaWprbW9xc3V1c3Bua2loaGhqbG5wdHZ2dHFvbm1tbG1vcHFyc3RzcG5sbGxsbW9xcnN0c3Jwb25tbGxtb3Bxc3Rzc3JxcG9ubm5vb3BxcnR0c3NycXBwb29vcHBxcnR0c3Rzc3JxcXBwcHBwcXJzdHR0dHR0cnJycnJycnNzdHR0dXV1dXV1dXV1dXV1dXV1dXV2dnZ2d3d3d3d3d3d3d3d3d3d3d3d3eHh4eHh4eHh4eHh4eHh4eHh4eHh4eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXp6enp6enp6enp6enp6enp6enp6enp6e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3x8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fX19fX19fX19fX19fX19fX19fX19fX1+f39/f39/f39/f39/f39/f39/f39/f3+AgICAgICAgICAgICAgICAgICAgICAgIGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4SEhISEhISEhISEhISEhISEhISEhISEhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWGhoaGhoaGhoaGhoaGhoaGhoaGhoaGh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHhoaIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiouLi4uLi4uLi4uLi4uLi4uLi4uLi4uLjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2Njo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Oj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+PkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmpqampqampqampqampqampqampqampqanJycnJycnJycnJycnJycnJycnJycnJycnp6enp6enp6enp6enp6enp6enp6enp6enp+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn6CgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJipqampqampqampqampqampqampqampqanp6enp6enp6enp6enp6enp6enp6enp6eoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKGoqKioqKioqKioqKioqKioqKioqKioqKioqajo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojp6enp6enp6enp6enp6enp6enp6enp6enp6ioqKioqKioqKioqKioqKioqKioqKioqKipqampqampqampqampqampqampqampqampqysrKysrKysrKysrKysrKysrKysrKysrK2srKywsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCxtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tba2tra2tra2tra2tra2tra2tra2tra2tre3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubq6urq6urq6urq6urq6urq6urq6urq6urq6u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7y8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL29vb29vb29vb29vb29vb29vb29vb29vb29vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6+vr6/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v8DAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDxMTExMTExMTExMTExMTExMTExMTExMTExMXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIycnJycnJycnJycnJycnJycnJycnJycnJycrKysrKysrKysrKysrKysrKysrKysrKy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2Njc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojo6Ojs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PT09PT09PT09PT09PT09PT09PT09PT09PT4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/QEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NE" />
    </div>
  );
};

export default App;
