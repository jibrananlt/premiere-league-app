import { useEffect, useState } from 'react';
import { Plus, MapPin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiClient } from '../api/client';
import LoadingSpinner from '../components/LoadingSpinner'; // Import
import type { Team } from '../types';

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true); // Tambah state loading

  useEffect(() => {
    apiClient.get('/teams')
      .then(res => setTeams(res.data))
      .finally(() => setTimeout(() => setLoading(false), 500)); // Tambah delay halus
  }, []);

  if (loading) return <LoadingSpinner />; // Render Spinner

  return (
    <div className="min-h-screen bg-pl-dark pt-24 md:pt-32 pb-28 md:pb-24 px-4 md:px-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#2c0030] to-pl-dark">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-10 pb-6 md:pb-8 border-b border-white/5 gap-4">
           <div>
             <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2">
               Clubs
             </h1>
             <p className="text-pl-gray font-medium text-sm md:text-base max-w-md">
               Directory of all {teams.length} competing clubs in the 2025/26 season.
             </p>
           </div>
           <button className="group bg-white text-pl-primary px-5 py-2.5 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider flex items-center gap-2 hover:bg-pl-cyan transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
             <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300"/> Add New Club
           </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {teams.map((team) => (
            <Link to={`/teams/${team.id}`} key={team.id} className="group relative bg-[#240026] p-1 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-gradient-to-b from-pl-cyan to-pl-pink rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-[#2c0030] h-full p-4 md:p-5 rounded-[calc(1rem-1px)] overflow-hidden flex flex-col items-center border border-white/5">
                
                {team.logo && (
                  <img src={team.logo} className="absolute -right-6 -bottom-6 w-32 h-32 object-contain opacity-5 grayscale group-hover:grayscale-0 group-hover:opacity-10 transition-all duration-500 rotate-12"/>
                )}

                <div className="w-20 h-20 md:w-24 md:h-24 p-3 bg-white rounded-full flex items-center justify-center shadow-xl mb-4 group-hover:scale-110 transition-transform duration-500 relative z-10">
                   {team.logo ? <img src={team.logo} className="w-full h-full object-contain drop-shadow-md"/> : <div className="w-full h-full bg-gray-100 rounded-full"/>}
                </div>
                
                <h2 className="text-lg md:text-xl font-black text-white text-center mb-1 tracking-tight relative z-10 leading-tight">{team.name}</h2>
                
                <div className="flex items-center gap-1 text-pl-gray text-[9px] md:text-[10px] font-bold uppercase tracking-wider mb-6 bg-black/20 px-2.5 py-1 rounded-full border border-white/5 relative z-10 max-w-full">
                  <MapPin size={10} className="text-pl-pink flex-shrink-0"/> 
                  <span className="truncate">{team.stadium || 'N/A'}</span>
                </div>
                
                <div className="w-full flex items-center justify-between mt-auto pt-4 border-t border-white/5 relative z-10">
                   <div className="text-left overflow-hidden">
                     <span className="block text-[9px] text-pl-gray/60 font-bold uppercase tracking-wider mb-0.5">Manager</span>
                     <span className="font-bold text-white text-xs md:text-sm truncate block">{team.coach}</span>
                   </div>
                   <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-pl-cyan group-hover:text-pl-primary transition-colors duration-300 flex-shrink-0">
                     <ArrowUpRight size={16} />
                   </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}