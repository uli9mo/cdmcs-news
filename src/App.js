import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MessageSquare, Shield, Server, Gamepad2, Trophy, Send, Mail, User, Eye, EyeOff, FileText, Link, CheckCircle, Image, HelpCircle } from 'lucide-react';

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visibleComments, setVisibleComments] = useState({});
  const [verifyingComment, setVerifyingComment] = useState({});
  const [showEasterEgg, setShowEasterEgg] = useState(false);

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
      if (e.key === 'Escape') setShowEasterEgg(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Mock news data — updated with Bogged/Trial Chamber/Harley Leakz
  const newsItems = [
     {
      id: 1,
      title: "Corruption...",
      content: "We found out Ibiklackeur gave himself maces diamond blocks, extended bans due to spite, wrongfully accused members of cheats, tried to ip log us with fake links. Due to Ibiklackeur's actions the server will be closed untill he apologizes or fix what he done wrong.",
      author: "Ashborn",
      date: "Dec 21, 2025",
      time: "18:26",
      category: "exposed",
      readTime: "1 min"
    },
    {
      id: 2,
      title: "Fundraiser!💰",
      content: "We worked hard coding and building this website, please consider donating me some robux!",
      author: "Ibiklackeur",
      date: "Dec 14, 2025",
      time: "18:26",
      category: "charity",
      readTime: "1 min"
    },
    {
      id: 3,
      title: "New Survival World Launched!",
      content: "After weeks of planning our new survival world for our Classic Duels's Minecraft server, we finally launched it with an official website!",
      author: "Eyewatercanwaters2",
      date: "Dec 13, 2025",
      time: "13:30",
      category: "major-update",
      readTime: "1 min"
    },
    {
      id: 4,
      title: "Weekly Build Contest",
      content: "Would anyone wan't to participate in a weekly Build Contest? If so then make sure you send beautiful screenshots of your build in our channel on Discord.",
      author: "Ashborn",
      date: "Dec 13, 2025",
      time: "13:15",
      category: "contest",
      readTime: "1 min"
    },
    {
      id: 5,
      title: "Server Start-up Scheduled.",
      content: "We'll be adding essential mods and features to our server, be sure to wait for the announcements of the release. We plan to officaly start the server on Dec 14, 10:50 AM.",
      author: "Jiemos",
      date: "Dec 13, 2025",
      time: "13:09",
      category: "maintenance",
      readTime: "1 min"
    },
    {
      id: 6,
      title: "New Plugin Recommendation: Tough As Nails.",
      content: "Adding this mod would help give a challenge to all players, including myself.",
      author: "Ibiklackeur",
      date: "Dec 13, 2025",
      time: "6:45",
      category: "feature",
      readTime: "30 sec"
    },
    {
      id: 7,
      title: "Holiday Event Planning",
      content: "A beautiful, nice, fun event for this Christmas. We plan to have a theme park built by then, DM Jiemos if you would wanna help!",
      author: "Jiemos",
      date: "Dec 1, 2025",
      time: "19:20",
      category: "event",
      readTime: "2 min"
    },
    {
      id: 8,
      title: "🚨 Bogged Incident Report",
      content: "Following multiple Bogged ambushes (see Dec 14 log, lines #384, #400–403), we've reinforced the Ancient City with torches and iron golems..",
      author: "Jiemos",
      date: "Dec 15, 2025",
      time: "09:14",
      category: "updates",
      readTime: "1 min"
    },
    {
      id: 9,
      title: "🏆 Trial Chamber Discovery!",
      content: "Kira and ibikl finally located the third Trial Chamber! they got a full set of diamond gear, a trial key, and suspiciously no Bogged. DM Jiemos for coordinates (trust).",
      author: "Ibiklackeur",
      date: "Dec 16, 2025",
      time: "14:22",
      category: "major-update",
      readTime: "1 min"
    },
    {
      id: 10,
      title: "🤫 'Who is harley leakz!",
      content: "Multiple players reported to us saying Harley Leakz has sent them random server ips, when they joined they saw a giant statue that they couldn't make out in the distance. Who is Harley Leakz??? ",
      author: "Ibiklackeur",
      date: "Dec 17, 2025",
      time: "22:07",
      category: "mystery",
      readTime: "2 min"
    }
  ];

  // Server stats
  const serverStats = {
    playersOnline: 0,
    totalPlayers: 12,
    uptime: "0",
    version: "1.21.10 FABRIC",
    worldSize: "4.82 GB"
  };

  // Active players with real avatars
  const activePlayers = [
    { name: "Kira", status: "Offline", time: "2 hour", avatar: "https://cdn.discordapp.com/avatars/1271440596195737693/2dc56e1377af394802df23561eff2e13.png" },
    { name: "Asparagus21345", status: "Offline", time: "8 hour", avatar: "https://placehold.co/32x32/6366f1/ffffff?text=A" },
    { name: "Ibikl", status: "Offline", time: "4 hour", avatar: "https://pticaarchive.wordpress.com/wp-content/uploads/2012/10/naked-banana.jpg?w=620" },
    { name: "Senkaium", status: "Offline", time: "2 hours", avatar: "https://placehold.co/32x32/8b5cf6/ffffff?text=S" },
    { name: "Dristach391", status: "Offline", time: "1 hour", avatar: "https://cdn.discordapp.com/avatars/1238944179837734947/92283dd7964213b9ea0ae19679a83c60.png" },
    { name: "", status: "", time: "", avatar: "" },
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-green-800 to-emerald-700">
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
              Your daily important update on what's happening in our Minecraft Server...😄
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
                {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
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
                            ⏱️ Verification typically takes 1-2 minutes. Approved comments will appear.
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
                              <span className="text-sm font-medium">Verifying comment with server security system...</span>
                            </div>
                            <p className="text-amber-400 text-xs mt-1 ml-6">
                              Please wait - all comments are manually reviewed for anti-cheat compliance
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
                  Daily server logs😄 (In the links below)
                </p>

                   
                
                <div className="bg-gray-900/50 rounded-lg p-4 min-h-[200px]">
                  <div className="text-amber-300 font-mono text-sm space-y-2">
                   // STARTS HERE BTW FUTURE IDIOTS 
                                <div className="flex items-start">
                      <Link className="h-4 w-4 text-amber-400 mt-1 mr-2 flex-shrink-0" />
                      <span>
                        <a href="https://mclo.gs/P3bdC7j" 
                           className="text-blue-300 hover:text-blue-200 hover:underline"
                           target="_blank" rel="noopener noreferrer">
                          Dec 19, 2025 Server Log
                        </a>
                      </span>
                    </div>
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
                    <div className="flex items-start">
                      <Link className="h-4 w-4 text-amber-400 mt-1 mr-2 flex-shrink-0" />
                      <span>
                        <a href="https://example.com/logs/dec13" 
                           className="text-blue-300 hover:text-blue-200 hover:underline"
                           target="_blank" rel="noopener noreferrer">
                          Dec 13, 2025 Server Log
                        </a>
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-700 text-gray-500 text-xs">
                    Logs updated after each server session
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section — FULLY FIXED */}
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
                      <span className="text-green-400 font-medium">No, we don't.</span> We post server logs daily for full transparency, and all admin actions are logged and visible to the community.
                      <br/><br/>
                      <span className="text-xs text-gray-500">- Jiemos & Ibiklackeur</span>
                    </p>
                  </div>
                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-300 mb-2">❓ Do you log IP addresses of website visitors?</h4>
                    <p className="text-gray-300 text-sm">
                      <span className="text-green-400 font-medium">No, we don't.</span> This website has no backend server to track or store visitor data such as IP addresses, cookies, or personal information. We respect your privacy.
                      <br/><br/>
                      <span className="text-xs text-gray-500">- Eyewatercanwaters2</span>
                    </p>
                  </div>
                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-300 mb-2">❓ Does it cost to join the server?</h4>
                    <p className="text-gray-300 text-sm">
                      <span className="text-green-400 font-medium">No, it's completely free.</span> The server is funded by Ibiklackeur, and we welcome all friends (and friends of friends) to join our community!
                      <br/><br/>
                      <span className="text-xs text-gray-500">- Ibiklackeur</span>
                    </p>
                  </div>
                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-300 mb-2">❓ How can I get admin/moderator access?</h4>
                    <p className="text-gray-300 text-sm">
                      <span className="text-green-400 font-medium">I don't give out admin roles.</span> If you're helpful, respectful, and contribute positively to the community for a long time, I may consider you for a special role — but never for power or influence.
                      <br/><br/>
                      <span className="text-xs text-gray-500">- Eyewatercanwaters2 & Ibiklackeur</span>
                    </p>
                  </div>
                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-300 mb-2">❓ Who are the server owners?</h4>
                    <p className="text-gray-300 text-sm">
                      <span className="text-green-400 font-medium">For Discord, Ibiklackeur owns the server. For the Minecraft server, it’s Jiemos, Ibiklackeur & Ashborn.</span>
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
                  Our Minecraft moments 😄
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
                    Check Discord for the gallery contest ⭐⭐⭐
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
                <span className="text-blue-400 font-bold">5</span>
              </div>
              
              <div className="space-y-3">
                {activePlayers.map((player, index) => (
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
                ))}
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
                  <p className="text-yellow-200 font-medium">First to find a Trial Chamber!😄</p>
                  <p className="text-yellow-300 text-sm">Kira</p>
                  <p className="text-gray-400 text-xs mt-1">Congrats!</p>
                </div>
                <div className="p-3 bg-green-900/30 rounded-lg">
                  <p className="text-green-200 font-medium">First to make a farm!😄</p>
                  <p className="text-green-300 text-sm">Asparagus21345</p>
                  <p className="text-gray-400 text-xs mt-1">Congratulations!</p>
                </div>
                <div className="p-3 bg-purple-900/30 rounded-lg">
                  <p className="text-purple-200 font-medium">First to survive Bogged x4! 😅</p>
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

      {/* 🔒 SECRET EASTER EGG */}
      <button
        onClick={() => setShowEasterEgg(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gray-800/70 hover:bg-gray-700/80 backdrop-blur-sm rounded-full flex items-center justify-center text-purple-400 hover:text-purple-300 shadow-lg border border-purple-500/30 transition-all duration-300 hover:scale-110 z-50"
        title="Shhh... secret"
      >
        🤫
      </button>

      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowEasterEgg(false)}
        >
          <div 
            className="bg-gray-900/95 border border-purple-500/40 rounded-2xl max-w-md w-full p-6 text-center relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <button 
              onClick={() => setShowEasterEgg(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl font-bold"
            >
              ×
            </button>
            <div className="mb-4">
              <img 
                src="https://media.discordapp.net/attachments/1426762383514402949/1449881569446727802/image.png?ex=6941d46f&is=694082ef&hm=bfd136abdc8c47ad55435715b5025811f742aa16583020a347ed0c4bf8ef6ce1&=&format=webp&quality=lossless&width=550&height=277" 
                alt="Bogged Attack" 
                className="mx-auto rounded-lg border border-purple-500/30 shadow-lg"
              />
            </div>
            <h3 className="text-xl font-bold text-purple-300 mb-3">🤫 CLASSIFIED SERVER INTEL</h3>
            <div className="space-y-3 mb-4">
              <div className="bg-purple-900/20 p-3 rounded-lg border-l-4 border-purple-500">
                <p className="text-gray-300 italic">
                  <span className="text-purple-400 font-bold">"boi what"</span><br/>
                  <span className="text-xs text-gray-500">- ibikl, line #269</span>
                </p>
              </div>
              <div className="bg-purple-900/20 p-3 rounded-lg border-l-4 border-amber-500">
                <p className="text-gray-300 italic">
                  <span className="text-amber-400 font-bold">"holy send it"</span><br/>
                  <span className="text-xs text-gray-500">- asparagus21345, line #271</span>
                </p>
              </div>
              <div className="bg-purple-900/20 p-3 rounded-lg border-l-4 border-red-500">
                <p className="text-gray-300 italic">
                  <span className="text-red-400 font-bold">"NIGGER LATER"</span><br/>
                  <span className="text-xs text-gray-500">- ibikl, line #273 (pre-Bogged)</span>
                </p>
              </div>
            </div>
            <div className="bg-black/30 rounded-lg p-3 text-sm">
              <p className="text-gray-400">
                📊 <span className="text-red-400 font-bold">Ibik's Bogged Incident:</span>
              </p>
              <ul className="text-gray-500 text-xs space-y-1 mt-1">
                <li>• Shot by Bogged: <span className="text-red-400">lines #384, #400, #401, #402</span></li>
                <li>• Final Bogged hit → "<span className="text-red-400">WTF</span>" (line #403)</li>
                <li>• Also drowned (line #463)</li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-800">
              <p className="text-xs text-gray-500">
                🔒 This intel self-destructs in 5...4...3...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
