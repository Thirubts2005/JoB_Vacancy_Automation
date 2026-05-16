import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Users, LayoutGrid, Clock, ChevronRight, Zap } from 'lucide-react';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center flex-grow py-32">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-center max-w-4xl mb-20 animate-fade-in-up">
        <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
          Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">AI-Extracted</span> Opportunities
        </h2>
        <p className="text-lg md:text-xl text-slate-600 font-light max-w-2xl mx-auto">
          We use local Mistral AI models to automatically process raw job descriptions from Telegram into this beautiful, instantly updated live dashboard.
        </p>
      </div>

      <div className="w-full flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
        <h3 className="text-2xl font-bold text-slate-900 flex items-center">
          <Zap className="w-6 h-6 mr-3 text-indigo-500" />
          Latest Vacancies
        </h3>
        <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-bold border border-indigo-200">
          {jobs.length} Found
        </span>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(job => (
          <div 
            key={job.id} 
            className="group relative bg-white border border-slate-200 rounded-3xl p-8 transition-all duration-500 shadow-sm hover:border-indigo-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 flex flex-col h-full overflow-hidden"
          >
            {/* Top gradient highlight effect */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="mb-6 z-10">
              <span className="inline-block px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold tracking-widest uppercase text-indigo-600 mb-4">
                {job.company}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                {job.role}
              </h3>
            </div>
            
            <div className="flex-grow space-y-4 mb-8 text-slate-500 text-sm z-10">
              <div className="flex items-center group/item hover:text-slate-900 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center mr-3 border border-slate-200 group-hover/item:bg-indigo-50 group-hover/item:border-indigo-200 group-hover/item:text-indigo-600 transition-all">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-700">{job.experience}</p>
                </div>
              </div>
              
              <div className="flex items-center group/item hover:text-slate-900 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center mr-3 border border-slate-200 group-hover/item:bg-pink-50 group-hover/item:border-pink-200 group-hover/item:text-pink-600 transition-all">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-700">{job.location}</p>
                </div>
              </div>

              <div className="flex items-center group/item hover:text-slate-900 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center mr-3 border border-slate-200 group-hover/item:bg-emerald-50 group-hover/item:border-emerald-200 group-hover/item:text-emerald-600 transition-all">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-700">{job.vacancies} Openings</p>
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between z-10">
              <div className="flex items-center justify-center w-full">
                <Link 
                  to={`/jobs/${job.id}`} 
                  className="relative flex items-center justify-center w-full px-6 py-3 rounded-xl bg-slate-100 text-slate-800 font-semibold border border-slate-200 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 overflow-hidden transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center">
                    Read Details <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {jobs.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center bg-slate-50 border border-slate-300 border-dashed rounded-[2rem] py-32 px-4 backdrop-blur-sm shadow-sm">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 border border-indigo-100">
            <LayoutGrid className="w-10 h-10 text-indigo-500" />
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-3">No Jobs Processed Yet</h3>
          <p className="text-slate-500 text-center max-w-lg text-lg">
            Your database is currently empty. Fire up your Telegram bot and send a raw job description to instantly see it parsed here!
          </p>
        </div>
      )}
    </div>
  );
}
