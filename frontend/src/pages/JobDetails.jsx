import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Briefcase, MapPin, Users, Calendar, Bot, ChevronRight, Sparkles } from 'lucide-react';

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/jobs/${id}`)
      .then(res => res.json())
      .then(data => {
        setJob(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 p-16 bg-white border border-slate-200 rounded-[2rem] shadow-xl w-full max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-6 border border-rose-200">
          <ArrowLeft className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Vacancy Not Found</h2>
        <p className="text-slate-600 mb-10 text-center text-lg">We couldn't locate this specific job. It may have been removed or the ID is incorrect.</p>
        <Link to="/" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const DetailCard = ({ icon: Icon, title, value, wrapperClass, iconClass }) => (
    <div className={`p-6 rounded-[1.5rem] flex flex-col justify-center border transition-all duration-300 hover:scale-[1.02] cursor-default bg-slate-50 hover:bg-white border-slate-200 shadow-sm ${wrapperClass || 'hover:border-slate-300'}`}>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border transition-transform shadow-sm ${iconClass}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2">{title}</p>
        <p className="text-slate-900 font-bold text-xl leading-tight">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto w-full relative pb-10">
      <div className="mb-6 flex items-center text-sm font-medium text-slate-600">
        <Link to="/" className="hover:text-slate-900 transition-colors flex items-center px-3 py-1.5 rounded-lg hover:bg-slate-200">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back directly
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden relative">
        {/* Glow effect specific to this card */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-100/50 to-pink-100/50 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        
        {/* Header Section */}
        <div className="relative p-10 md:p-14 border-b border-slate-100 z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-200 mb-8">
            <Sparkles className="w-4 h-4 text-indigo-500 mr-2" />
            <span className="uppercase tracking-widest text-xs font-bold text-indigo-700">Parsed Company: {job.company}</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-8 leading-[1.1] tracking-tight">
            {job.role}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
            <div className="flex items-center text-rose-700 bg-rose-50 py-3 px-6 rounded-[1rem] border border-rose-200">
              <MapPin className="w-5 h-5 mr-3 text-rose-500" />
              {job.location}
            </div>
            <div className="flex items-center text-amber-700 bg-amber-50 py-3 px-6 rounded-[1rem] border border-amber-200">
              <Calendar className="w-5 h-5 mr-3 text-amber-500" />
              Closing: {job.last_date}
            </div>
          </div>
        </div>
        
        {/* Body Section */}
        <div className="relative p-10 md:p-14 z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <DetailCard 
              icon={BookOpen} 
              title="Qualification" 
              value={job.qualification} 
              wrapperClass="hover:border-blue-300 hover:shadow-md"
              iconClass="bg-blue-50 border-blue-200 text-blue-500"
            />
            <DetailCard 
              icon={Briefcase} 
              title="Experience" 
              value={job.experience} 
              wrapperClass="hover:border-emerald-300 hover:shadow-md"
              iconClass="bg-emerald-50 border-emerald-200 text-emerald-500"
            />
            <DetailCard 
              icon={Users} 
              title="Vacancies" 
              value={job.vacancies} 
              wrapperClass="hover:border-purple-300 hover:shadow-md"
              iconClass="bg-purple-50 border-purple-200 text-purple-500"
            />
          </div>

          <div className="mt-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mr-4 shadow-sm">
                <Bot className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-wide">Extracted Raw Text</h3>
            </div>
            
            <div className="relative group">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="bg-slate-50 p-8 rounded-r-3xl rounded-br-3xl ml-3 border top-0 border-slate-200 border-l-0">
                <p className="text-slate-700 text-lg leading-relaxed font-light italic">
                  "{job.raw_text}"
                </p>
              </div>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
