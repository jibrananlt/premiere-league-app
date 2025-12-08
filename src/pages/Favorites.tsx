import { useEffect, useState } from 'react';
import { Heart, MapPin, ArrowUpRight, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiClient } from '../api/client';
import LoadingSpinner from '../components/LoadingSpinner';
import type { Team } from '../types';

export default function Favorites() {
  const [favoriteTeams, setFavoriteTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favoriteTeams') || '[]');
      if (favorites.length === 0) {
        setLoading(false);
        return;
      }
      
      // Fetch team details for all favorite IDs
      const teamPromises = favorites.map((id: number) => 
        apiClient.get(`/teams/${id}`).catch(() => null)
      );
      
      const results = await Promise.all(teamPromises);
      const teams = results.filter(r => r !== null).map(r => r!.data);
      setFavoriteTeams(teams);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = (teamId: number) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteTeams') || '[]');
    const updated = favorites.filter((id: number) => id !== teamId);
    localStorage.setItem('favoriteTeams', JSON.stringify(updated));
    setFavoriteTeams(prev => prev.filter(team => team.id !== teamId));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pl-dark via-pl-purple to-pl-dark pt-20 md:pt-24 pb-24 md:pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-2xl backdrop-blur-sm border border-pink-500/30">
            <Heart className="w-8 h-8 text-pink-400" fill="currentColor" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white">
              Favorite <span className="text-pink-400">Teams</span>
            </h1>
            <p className="text-pl-gray mt-1">
              {favoriteTeams.length} {favoriteTeams.length === 1 ? 'club' : 'clubs'} in your collection
            </p>
          </div>
        </div>

        {/* Empty State */}
        {favoriteTeams.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="p-6 bg-gradient-to-br from-pink-500/10 to-red-500/10 rounded-3xl backdrop-blur-sm border border-pink-500/20 mb-6">
              <Heart className="w-16 h-16 text-pink-400/50" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">No Favorites Yet</h2>
            <p className="text-pl-gray mb-6 text-center max-w-md">
              Start building your collection by adding your favorite teams from the Clubs page
            </p>
            <Link
              to="/teams"
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-xl hover:scale-105 transition-transform"
            >
              Browse Teams
            </Link>
          </div>
        ) : (
          /* Teams Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteTeams.map((team) => (
              <div
                key={team.id}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-pink-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(244,114,182,0.15)] hover:scale-[1.02]"
              >
                {/* Remove Favorite Button */}
                <button
                  onClick={() => removeFavorite(team.id)}
                  className="absolute top-4 right-4 p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg backdrop-blur-sm border border-red-500/30 transition-all duration-300 z-10 group/btn"
                  title="Remove from favorites"
                >
                  <Trash2 className="w-4 h-4 text-red-400 group-hover/btn:scale-110 transition-transform" />
                </button>

                {/* Team Logo */}
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-full blur-xl"></div>
                    <div className="relative w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
                      {team.logo ? (
                        <img src={team.logo} alt={team.name} className="w-16 h-16 object-contain" />
                      ) : (
                        <span className="text-4xl font-black text-white/50">{team.name[0]}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Team Name */}
                <h3 className="text-xl font-black text-white text-center mb-3 group-hover:text-pink-400 transition-colors">
                  {team.name}
                </h3>

                {/* Team Details */}
                <div className="space-y-2 mb-4">
                  {team.coach && (
                    <div className="flex items-center gap-2 text-sm text-pl-gray">
                      <span className="w-20 font-semibold">Coach:</span>
                      <span className="text-white">{team.coach}</span>
                    </div>
                  )}
                  {team.stadium && (
                    <div className="flex items-start gap-2 text-sm text-pl-gray">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-white">{team.stadium}</span>
                    </div>
                  )}
                  {team.founded && (
                    <div className="flex items-center gap-2 text-sm text-pl-gray">
                      <span className="w-20 font-semibold">Founded:</span>
                      <span className="text-white">{team.founded}</span>
                    </div>
                  )}
                </div>

                {/* View Details Button */}
                <Link
                  to={`/teams/${team.id}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-pink-500/20 to-red-500/20 hover:from-pink-500/30 hover:to-red-500/30 text-pink-400 font-bold rounded-xl transition-all duration-300 border border-pink-500/30 group-hover:shadow-[0_0_20px_rgba(244,114,182,0.3)]"
                >
                  View Details
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                {/* Favorite Badge */}
                <div className="absolute top-4 left-4">
                  <div className="px-3 py-1 bg-pink-500/20 rounded-full backdrop-blur-sm border border-pink-500/30 flex items-center gap-1.5">
                    <Heart className="w-3 h-3 text-pink-400" fill="currentColor" />
                    <span className="text-xs font-bold text-pink-400">Favorite</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
