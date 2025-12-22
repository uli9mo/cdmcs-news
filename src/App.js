import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, Users, MessageSquare, Shield, Server, Gamepad2, Trophy, Send, Mail, User, Eye, EyeOff, FileText, Link, CheckCircle, Image, HelpCircle } from 'lucide-react';

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visibleComments, setVisibleComments] = useState({});
  const [verifyingComment, setVerifyingComment] = useState({});
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const serverStats = {
    playersOnline: 0,
    totalPlayers: 12,
    uptime: "0",
    version: "1.21.10 FABRIC",
    worldSize: "4.82 GB"
  };

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
      case 'exposed': return 'bg-red-500';
      case 'mystery': return 'bg-indigo-500';
      case 'updates': return 'bg-orange-500';
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

  const copyServerAddress = () => {
    navigator.clipboard.writeText('cdmcs-official.aternos.me:25565');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 text-gray-100">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-green-800/90 to-emerald-700/90 shadow-xl">
        <div className="absolute inset-0 bg-black opacity-25"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center animate-fade-in-up">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-full shadow-lg ring-1 ring-white/30 hover:ring-2 hover:ring-emerald-400/50 transition-all duration-500 hover:scale-105">
                <Gamepad2 className="h-16 w-16 text-white drop-shadow-lg" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
              CDMCS <span className="text-emerald-300">NEWS!</span>
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              Your daily important update on what's happening in our Minecraft Server...😄
            </p>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-gray-800/60 backdrop-blur-sm border-b border-gray-700/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-4">
            {[
              { icon: <Users className="h-5 w-5" />, color: "text-blue-400", label: `${serverStats.playersOnline}/${serverStats.totalPlayers} online` },
              { icon: <Server className="h-5 w-5" />, color: "text-green-400", label: `v${serverStats.version}` },
              { icon: <Clock className="h-5 w-5" />, color: "text-purple-400", label: serverStats.uptime },
              { icon: <Shield className="h-5 w-5" />, color: "text-yellow-400", label: "Whitelist Active" },
              { icon: <Calendar className="h-5 w-5" />, color: "text-pink-400", label: currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) }
            ].map((stat, i) => (
              <div 
                key={i}
                className="flex items-center space-x-2 bg-gray-800/40 p-2 rounded-lg hover:bg-gray-700/60 transition-all duration-300 group"
              >
                <span className={`${stat.color} group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </span>
                <span className="text-gray-200 font-medium group-hover:text-white transition-colors">
                  {stat.label}
                </span>
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
              <h2 className="text-3xl font-extrabold text-white flex items-center">
                <span className="relative">
                  Latest News
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60"></span>
                </span>
              </h2>
              <span className="px-4 py-2 bg-blue-600 text-blue-100 rounded-full text-sm font-semibold animate-pulse-slow">
                {newsItems.length} updates
              </span>
            </div>

            {newsItems.map((news, idx) => (
              <article 
                key={news.id} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/70 overflow-hidden 
                  hover:border-blue-500/70 transition-all duration-500 
                  hover:shadow-2xl hover:-translate-y-1 transform
                  group animate-fade-in-stagger"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold text-white ${getCategoryColor(news.category)} shadow-md`}>
                      {news.category.replace('-', ' ').toUpperCase()}
                    </span>
                    <div className="flex items-center space-x-4 text-gray-400 text-sm">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {news.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {news.readTime}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-gray-300 mb-5 leading-relaxed">
                    {news.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-blue-500/30 group-hover:ring-blue-400/50 transition-shadow">
                        <img 
                          src={getAuthorAvatar(news.author)} 
                          alt={news.author} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = `https://placehold.co/32x32/4f46e5/ffffff?text=${news.author.charAt(0)}`;
                          }}
                        />
                      </div>
                      <span className="text-blue-300 font-semibold group-hover:text-blue-200 transition-colors">{news.author}</span>
                    </div>
                    <button 
                      onClick={() => toggleComments(news.id)}
                      className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 font-medium transition-all duration-300 group-hover:scale-105"
                    >
                      {visibleComments[news.id] ? <EyeOff className="h-4 w-4 animate-pulse" /> : <Eye className="h-4 w-4" />}
                      <span>{visibleComments[news.id] ? 'Hide' : 'Show'} Discussion</span>
                    </button>
                  </div>
                </div>

                {/* Discussion Section */}
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    visibleComments[news.id] 
                      ? 'max-h-[1000px] opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="border-t border-gray-700/70 bg-gray-900/40 p-6">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-blue-400 animate-bounce-slow" />
                      Discussion
                    </h4>
                    <div className="bg-blue-900/40 border border-blue-700/70 rounded-xl p-4 mb-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <MessageSquare className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-blue-200 text-sm">
                            <span className="font-semibold">Comment Policy:</span> All comments are manually reviewed by admins for server security.
                          </p>
                          <p className="text-blue-300 text-xs mt-1">
                            ⏱️ Verification typically takes 1–2 minutes. Approved comments will appear.
                          </p>
                        </div>
                      </div>
                    </div>

                    {!isAuthenticated ? (
                      <div className="bg-gray-800/70 rounded-xl p-5 border border-gray-700/50">
                        <h5 className="font-semibold text-white mb-4">Join the discussion</h5>
                        <form onSubmit={handleLogin} className="space-y-4">
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                              <User className="h-5 w-5" />
                            </div>
                            <input
                              type="text"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                              placeholder="Your Minecraft name"
                              className="block w-full pl-11 pr-4 py-3 bg-gray-700/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 
                                focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-transparent 
                                transition-all duration-300 hover:bg-gray-700"
                              required
                            />
                          </div>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                              <Mail className="h-5 w-5" />
                            </div>
                            <input
                              type="email"
                              value={userEmail}
                              onChange={(e) => setUserEmail(e.target.value)}
                              placeholder="your@email.com"
                              className="block w-full pl-11 pr-4 py-3 bg-gray-700/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 
                                focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-transparent 
                                transition-all duration-300 hover:bg-gray-700"
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                              text-white font-bold py-3 px-4 rounded-xl 
                              transition-all duration-500 transform hover:scale-[1.02] active:scale-95 
                              shadow-lg hover:shadow-blue-500/30 relative overflow-hidden group"
                          >
                            <span className="relative z-10 flex items-center justify-center space-x-2">
                              <Shield className="h-4 w-4" />
                              <span>Sign In to Comment</span>
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity"></span>
                          </button>
                        </form>
                      </div>
                    ) : (
                      <form 
                        onSubmit={(e) => handleCommentSubmit(e, news.id)} 
                        className="space-y-4"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-green-500/30">
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
                              className="block w-full px-4 py-3 bg-gray-700/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 
                                focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-transparent 
                                resize-none transition-all duration-300 hover:bg-gray-700"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Signed in as <span className="text-green-300 font-medium">{userName}</span></span>
                          <button
                            type="submit"
                            disabled={verifyingComment[news.id]}
                            className={`${
                              verifyingComment[news.id] 
                                ? 'bg-gray-600 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                            } text-white font-bold py-2.5 px-5 rounded-lg 
                              transition-all duration-300 flex items-center space-x-2 
                              transform hover:scale-[1.02] active:scale-95 shadow-md`}
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
                          <div className="mt-4 p-4 bg-amber-900/30 border border-amber-700/70 rounded-xl animate-pulse">
                            <div className="flex items-center text-amber-300">
                              <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                              <span className="font-semibold">Verifying comment with server security system...</span>
                            </div>
                            <p className="text-amber-400 text-xs mt-1 ml-6">
                              Please wait — all comments are manually reviewed for anti-cheat compliance
                            </p>
                          </div>
                        )}
                      </form>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Server Logs */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/70 overflow-hidden hover:border-amber-500/50 transition-all duration-500 hover:shadow-xl">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-amber-400" />
                  Server Logs
                </h3>
                <p className="text-gray-400 text-sm mt-2 mb-4">
                  Daily server logs😄 (In the links below)
                </p>
                <div className="bg-gray-900/60 rounded-xl p-4 min-h-[200px]">
                  <div className="text-amber-300 font-mono text-sm space-y-3">
                    {[
                      { date: "Dec 19, 2025", url: "https://mclo.gs/P3bdC7j" },
                      { date: "Dec 18, 2025", url: "https://mclo.gs/7OJvEiK" },
                      { date: "Dec 15, 2025", url: "https://mclo.gs/wpL50I4" },
                      { date: "Dec 14, 2025", url: "https://mclo.gs/zQjJY4i" },
                      { date: "Dec 13, 2025", url: "https://example.com/logs/dec13" }
                    ].map((log, i) => (
                      <div 
                        key={i} 
                        className="flex items-start group cursor-pointer"
                        onClick={() => window.open(log.url, '_blank')}
                      >
                        <Link className="h-4 w-4 text-amber-400 mt-1 mr-2 flex-shrink-0 group-hover:text-amber-300 transition-colors" />
                        <span className="text-blue-300 group-hover:text-blue-200 hover:underline transition-colors">
                          {log.date} Server Log
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-700/50 text-gray-500 text-xs">
                    Logs updated after each server session
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/70 overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:shadow-xl">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-blue-400" />
                  FAQ
                </h3>
                <div className="space-y-4 mt-4">
                  {[
                    { q: "Do Jiemos and Ibiklackeur cheat?", a: "No, we don't. We post server logs daily for full transparency, and all admin actions are logged and visible to the community.", by: "- Jiemos & Ibiklackeur" },
                    { q: "Do you log IP addresses of website visitors?", a: "No, we don't. This website has no backend server to track or store visitor data such as IP addresses, cookies, or personal information. We respect your privacy.", by: "- Eyewatercanwaters2" },
                    { q: "Does it cost to join the server?", a: "No, it's completely free. The server is funded by Ibiklackeur, and we welcome all friends (and friends of friends) to join our community!", by: "- Ibiklackeur" },
                    { q: "How can I get admin/moderator access?", a: "I don't give out admin roles. If you're helpful, respectful, and contribute positively to the community for a long time, I may consider you for a special role — but never for power or influence.", by: "- Eyewatercanwaters2 & Ibiklackeur" },
                    { q: "Who are the server owners?", a: "For Discord, Ibiklackeur owns the server. For the Minecraft server, it’s Jiemos, Ibiklackeur & Ashborn.", by: "- Ibiklackeur, Eyewatercanwaters2" }
                  ].map((faq, i) => (
                    <div 
                      key={i}
                      className="bg-gray-700/40 p-4 rounded-xl hover:bg-gray-700/60 transition-colors group cursor-pointer"
                      onClick={() => {
                        // Optional: expand/collapse later
                      }}
                    >
                      <h4 className="font-bold text-blue-300 mb-2 group-hover:text-blue-200 transition-colors">❓ {faq.q}</h4>
                      <p className="text-gray-300 text-sm">
                        <span className="text-green-400 font-medium">✓</span> {faq.a}
                        <br/><br/>
                        <span className="text-xs text-gray-500">{faq.by}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/70 overflow-hidden hover:border-pink-500/50 transition-all duration-500 hover:shadow-xl">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Image className="h-5 w-5 mr-2 text-pink-400" />
                  Gallery
                </h3>
                <p className="text-gray-400 text-sm mb-4">Our Minecraft moments 😄</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { color: "4ade80", text: "Build" },
                    { color: "8b5cf6", text: "Adventure" },
                    { color: "0ea5e9", text: "Redstone" },
                    { color: "f59e0b", text: "Fun" }
                  ].map((img, i) => (
                    <div 
                      key={i}
                      className="aspect-square rounded-xl overflow-hidden border border-gray-600/70 
                        hover:scale-[1.03] hover:rotate-1 transition-all duration-500 cursor-pointer"
                    >
                      <img 
                        src={`https://placehold.co/300x300/${img.color}/000000?text=${img.text}`} 
                        alt={img.text} 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-700/50 text-center">
                  <button className="text-blue-400 hover:text-blue-300 font-medium flex items-center justify-center mx-auto group">
                    Check Discord for the gallery contest
                    <span className="ml-1 inline-block group-hover:translate-x-1 transition-transform">⭐</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Active Players */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/70 p-6 hover:border-blue-500/50 transition-all duration-500 hover:shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-400" />
                  Active Players
                </h3>
                <span className="text-blue-400 font-bold px-3 py-1 bg-blue-500/20 rounded-full">5</span>
              </div>
              <div className="space-y-3">
                {activePlayers.filter(p => p.name).map((player, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-3.5 bg-gray-700/40 rounded-xl 
                      hover:bg-gray-700/60 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-blue-500/20 group-hover:ring-blue-400/40 transition-shadow">
                        <img 
                          src={player.avatar} 
                          alt={player.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          onError={(e) => {
                            e.target.src = `https://placehold.co/32x32/4f46e5/ffffff?text=${player.name.charAt(0)}`;
                          }}
                        />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm group-hover:text-blue-200">{player.name}</p>
                        <p className="text-gray-400 text-xs">{player.status}</p>
                      </div>
                    </div>
                    <span className="text-gray-400 text-xs group-hover:text-gray-300">{player.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Server Info */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/70 p-6 hover:border-green-500/50 transition-all duration-500 hover:shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Server className="h-5 w-5 mr-2 text-green-400" />
                Server Info
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">IP + Port</span>
                  <span className="text-white font-mono break-all">cdmcs-official.aternos.me:25565</span>
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
              <button
                onClick={copyServerAddress}
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 
                  text-white font-bold py-3 px-4 rounded-xl 
                  transition-all duration-500 transform hover:scale-[1.02] active:scale-95 shadow-lg
                  relative overflow-hidden group"
              >
                <span className="flex items-center justify-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>{copied ? '✓ Copied!' : 'Copy server address!'}</span>
                </span>
                {copied && (
                  <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-300 animate-ping" />
                )}
              </button>
            </div>

            {/* Recent Achievements */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/70 p-6 hover:border-yellow-500/50 transition-all duration-500 hover:shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-400 animate-spin-slow" />
                Recent Achievements
              </h3>
              <div className="space-y-4">
                {[
                  { title: "First to find a Trial Chamber!😄", who: "Kira", cls: "yellow", emoji: "🏆" },
                  { title: "First to make a farm!😄", who: "Asparagus21345", cls: "green", emoji: "🌱" },
                  { title: "First to survive Bogged x4! 😅", who: "Ibikl", cls: "purple", emoji: "🛡️" }
                ].map((ach, i) => (
                  <div 
                    key={i}
                    className={`p-4 rounded-xl bg-${ach.cls}-900/30 border-l-4 border-${ach.cls}-500 
                      hover:bg-${ach.cls}-800/40 transition-colors group cursor-pointer`}
                  >
                    <p className={`text-${ach.cls}-200 font-bold`}>{ach.emoji} {ach.title}</p>
                    <p className={`text-${ach.cls}-300 text-sm`}>{ach.who}</p>
                    <p className="text-gray-400 text-xs mt-1">Legendary!</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/90 backdrop-blur-sm border-t border-gray-800/70 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center mb-4 animate-bounce-slow">
              <Gamepad2 className="h-8 w-8 text-emerald-400 drop-shadow-lg" />
            </div>
            <p className="text-gray-300">
              Made with ❤️ by your friend group for the Classic Duels Minecraft Server
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Thanks to Jelly, and Ashborn for building this website.
            </p>
            <p className="text-gray-600 text-sm mt-2 italic">
              "Where friendships are built block by block"
            </p>
          </div>
        </div>
      </footer>

      {/* Easter Egg Button */}
      <button
        onClick={() => setShowEasterEgg(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gray-800/80 hover:bg-gray-700/90 backdrop-blur-md 
          rounded-full flex items-center justify-center text-purple-400 hover:text-purple-300 
          shadow-2xl border border-purple-500/40 transition-all duration-500 
          hover:scale-110 hover:rotate-6 animate-float"
        title="Shhh... secret"
        aria-label="Open secret intel"
      >
        🤫
      </button>

      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowEasterEgg(false)}
        >
          <div 
            className="bg-gray-900/95 border border-purple-500/50 rounded-2xl max-w-md w-full p-6 text-center relative overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 animate-pulse-slow"></div>
            <button 
              onClick={() => setShowEasterEgg(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold w-8 h-8 rounded-full hover:bg-gray-800/70 transition-colors"
            >
              ×
            </button>
            <div className="mb-5">
              <img 
                src="https://media.discordapp.net/attachments/1426762383514402949/1449881569446727802/image.png?ex=6941d46f&is=694082ef&hm=bfd136abdc8c47ad55435715b5025811f742aa16583020a347ed0c4bf8ef6ce1&=&format=webp&quality=lossless&width=550&height=277" 
                alt="Bogged Attack" 
                className="mx-auto rounded-xl border border-purple-500/40 shadow-2xl max-w-full"
              />
            </div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
              🤫 CLASSIFIED SERVER INTEL
            </h3>
            <div className="space-y-4 mb-5">
              {[
                { text: `"boi what"`, author: "- ibikl, line #269", border: "border-purple-500" },
                { text: `"holy send it"`, author: "- asparagus21345, line #271", border: "border-amber-500" },
                { text: `"NIGGER LATER"`, author: "- ibikl, line #273 (pre-Bogged)", border: "border-red-500" }
              ].map((quote, i) => (
                <div 
                  key={i}
                  className={`bg-gray-800/50 p-4 rounded-xl border-l-4 ${quote.border} animate-fade-in-up`}
                  style={{ animationDelay: `${(i+1)*200}ms` }}
                >
                  <p className="text-gray-200 italic">
                    <span className="text-purple-300 font-bold">{quote.text}</span><br/>
                    <span className="text-xs text-gray-500">{quote.author}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-black/40 rounded-xl p-4 text-sm">
              <p className="text-gray-300 font-semibold">
                📊 <span className="text-red-400">Ibik's Bogged Incident:</span>
              </p>
              <ul className="text-gray-400 text-xs space-y-1 mt-2">
                <li>• Shot by Bogged: <span className="text-red-400">lines #384, #400, #401, #402</span></li>
                <li>• Final Bogged hit → <span className="text-red-400">"WTF"</span> (line #403)</li>
                <li>• Also drowned (line #463)</li>
              </ul>
            </div>
            <div className="mt-5 pt-4 border-t border-gray-800/70">
              <p className="text-xs text-gray-500 animate-pulse">
                🔒 This intel self-destructs in 5...4...3...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Custom animations via Tailwind plugin (injected globally)
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fade-in-stagger {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slide-up {
      from { opacity: 0; transform: translateY(40px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes pulse-slow {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes bounce-slow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
    .animate-fade-in-stagger { animation: fade-in-stagger 0.5s ease-out forwards; }
    .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
    .animate-fade-in { animation: fade-in 0.3s ease-in; }
    .animate-float { animation: float 3s ease-in-out infinite; }
    .animate-pulse-slow { animation: pulse-slow 2s infinite; }
    .animate-bounce-slow { animation: bounce-slow 2s infinite; }
    .animate-spin-slow { animation: spin-slow 8s linear infinite; }
  `;
  document.head.appendChild(style);
}

export default App;
