import { useEffect, useState } from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiClient } from '../api/client';
import type { Team } from '../types';

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    apiClient.get('/teams').then(res => setTeams(res.data));
  }, []);

  return (
    // Padding bawah pb-28 untuk mobile, pb-24 untuk desktop
    <div className="min-h-screen bg-pl-dark pt-24 md:pt-32 pb-28 md:pb-24 px-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#2c0030] to-pl-dark">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 pb-8 border-b border-white/5 gap-6">
           <div>
             <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-3">
               Clubs
             </h1>
             <p className="text-pl-gray font-medium text-base md:text-lg max-w-md">
               Directory of all {teams.length} competing clubs in the 2025/26 season.
             </p>
           </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teams.map((team) => (
            <Link to={`/teams/${team.id}`} key={team.id} className="group relative bg-[#240026] p-1 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              {/* Border Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-pl-cyan to-pl-pink rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-[#2c0030] h-full p-6 rounded-[1.3rem] overflow-hidden flex flex-col items-center">
                {/* Background Logo Faded */}
                {team.logo && (
                  <img src={team.logo} className="absolute -right-10 -bottom-10 w-48 h-48 object-contain opacity-5 grayscale group-hover:grayscale-0 group-hover:opacity-10 transition-all duration-500 rotate-12"/>
                )}

                <div className="w-32 h-32 p-4 bg-white rounded-full flex items-center justify-center shadow-2xl mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10">
                   {team.logo ? <img src={team.logo} className="w-full h-full object-contain drop-shadow-md"/> : <div className="w-full h-full bg-gray-100 rounded-full"/>}
                </div>
                
                <h2 className="text-2xl font-black text-white text-center mb-2 tracking-tight relative z-10">{team.name}</h2>
                
                <div className="flex items-center gap-1.5 text-pl-gray text-[11px] font-bold uppercase tracking-wider mb-8 bg-black/20 px-3 py-1.5 rounded-full border border-white/5 relative z-10">
                  <MapPin size={10} className="text-pl-pink"/> {team.stadium || 'Stadium N/A'}
                </div>
                
                <div className="w-full flex items-center justify-between mt-auto pt-6 border-t border-white/5 relative z-10">
                   <div className="text-left">
                     <span className="block text-[10px] text-pl-gray/60 font-bold uppercase tracking-wider mb-0.5">Manager</span>
                     <span className="font-bold text-white text-sm truncate max-w-[120px] block">{team.coach}</span>
                   </div>
                   <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-pl-cyan group-hover:text-pl-primary transition-colors duration-300">
                     <ArrowUpRight size={20} />
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