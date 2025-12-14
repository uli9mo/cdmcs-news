import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MessageSquare, Shield, Server, Gamepad2, Trophy } from 'lucide-react';

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock news data
  const newsItems = [
    {
      id: 1,
      title: "New Survival World Launched!",
      content: "After months of planning, our new survival world 'Frontier Realms' is now live! Featuring custom biomes, hidden dungeons, and a completely revamped economy system. First 10 players to reach the End get special rewards!",
      author: "Alex",
      date: "Dec 12, 2025",
      time: "18:30",
      category: "major-update",
      readTime: "2 min"
    },
    {
      id: 2,
      title: "Weekly Build Contest Results",
      content: "Congratulations to Maya for winning this week's build contest with her incredible floating castle! The theme was 'Sky Islands' and the submissions were absolutely mind-blowing. Check out the gallery in the Discord!",
      author: "Jamie",
      date: "Dec 10, 2025",
      time: "20:15",
      category: "contest",
      readTime: "1 min"
    },
    {
      id: 3,
      title: "Server Maintenance Scheduled",
      content: "We'll be performing essential server maintenance this Tuesday at 8 PM EST. Downtime expected to be 30-45 minutes. We'll be upgrading to Minecraft 1.21.1 and optimizing performance for the holiday season!",
      author: "Taylor",
      date: "Dec 8, 2025",
      time: "14:00",
      category: "maintenance",
      readTime: "1 min"
    },
    {
      id: 4,
      title: "New Plugin: FriendCraft Economy",
      content: "Introducing our custom economy plugin! Earn coins through mining, farming, and quests. Spend them at the new marketplace in spawn town. Special thanks to Riley for coding this amazing system!",
      author: "Riley",
      date: "Dec 5, 2025",
      time: "16:45",
      category: "feature",
      readTime: "3 min"
    },
    {
      id: 5,
      title: "Holiday Event Planning",
      content: "The annual 'Winter Wonderland' event is being planned! Expect snow golems, gift exchanges, mini-games, and special holiday-themed builds. DM Morgan if you want to help organize!",
      author: "Morgan",
      date: "Dec 1, 2025",
      time: "19:20",
      category: "event",
      readTime: "2 min"
    }
  ];

  // Server stats
  const serverStats = {
    playersOnline: 8,
    totalPlayers: 15,
    uptime: "14 days, 7 hours",
    version: "1.21.1",
    worldSize: "3.2 GB"
  };

  // Active players (mock data)
  const activePlayers = [
    { name: "Alex", status: "Exploring", time: "2h 15m" },
    { name: "Jamie", status: "Building", time: "1h 42m" },
    { name: "Taylor", status: "Mining", time: "3h 08m" },
    { name: "Morgan", status: "Redstone", time: "45m" },
    { name: "Riley", status: "Admin", time: "5h 22m" },
    { name: "Casey", status: "Farming", time: "1h 10m" },
    { name: "Jordan", status: "PvP", time: "32m" },
    { name: "Sam", status: "Exploring", time: "2h 47m" }
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'major-update': return 'bg-purple-500';
      case 'contest': return 'bg-yellow-500';
      case 'maintenance': return 'bg-blue-500';
      case 'feature': return 'bg-green-500';
      case 'event': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
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
              FriendCraft News
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Your daily update on what's happening in our friend group Minecraft server
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
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{news.author[0]}</span>
                      </div>
                      <span className="text-blue-300 font-medium">{news.author}</span>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300 flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-sm">Discuss</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active Players */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-400" />
                  Active Players
                </h3>
                <span className="text-blue-400 font-bold">{activePlayers.length}</span>
              </div>
              
              <div className="space-y-3">
                {activePlayers.map((player, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{player.name[0]}</span>
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
                  <span className="text-white font-mono">friendcraft.mcserver.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Port</span>
                  <span className="text-white font-mono">25565</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Version</span>
                  <span className="text-green-400">1.21.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">World Size</span>
                  <span className="text-white">{serverStats.worldSize}</span>
                </div>
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Join Server</span>
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
                  <p className="text-yellow-200 font-medium">Alex</p>
                  <p className="text-yellow-300 text-sm">First player to reach the End</p>
                  <p className="text-gray-400 text-xs mt-1">Dec 12, 2025</p>
                </div>
                <div className="p-3 bg-green-900/30 rounded-lg">
                  <p className="text-green-200 font-medium">Taylor</p>
                  <p className="text-green-300 text-sm">Built 1000-block railroad</p>
                  <p className="text-gray-400 text-xs mt-1">Dec 10, 2025</p>
                </div>
                <div className="p-3 bg-purple-900/30 rounded-lg">
                  <p className="text-purple-200 font-medium">Morgan</p>
                  <p className="text-purple-300 text-sm">Created automated farm</p>
                  <p className="text-gray-400 text-xs mt-1">Dec 8, 2025</p>
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
              Made with ❤️ by your friend group for the FriendCraft Minecraft Server
            </p>
            <p className="text-gray-500 text-sm mt-2">
              "Where friendships are built block by block"
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

