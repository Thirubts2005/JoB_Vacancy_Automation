import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import JobDetails from './pages/JobDetails';
import { Sparkles } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="min-h-screen relative text-slate-900 bg-slate-50 overflow-hidden flex flex-col font-sans">
        
        {/* Background Gradients & Premium Effects */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-indigo-100/50 via-slate-50 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-[30%] left-[-10%] w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none" />

        {/* Floating navbar */}
        <nav className="relative z-50 w-full border-b border-slate-200/50 bg-white/70 backdrop-blur-2xl shadow-sm">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all duration-300 group-hover:shadow-indigo-500/40">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="text-slate-800">AutoJob</span><span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">AI</span>
              </h1>
            </div>
            <div className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 Backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-slate-700 tracking-wide">Live Feed processing via Telegram bot</span>
            </div>
          </div>
        </nav>

        <main className="relative z-10 container mx-auto px-4 sm:px-6 pt-12 pb-24 flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
