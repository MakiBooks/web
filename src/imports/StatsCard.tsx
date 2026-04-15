import { BookOpen, MapPin, Package } from "lucide-react";
import type { BookLocation } from "../data/streetData";

interface StatsCardProps {
  locations: BookLocation[];
}

export function StatsCard({ locations }: StatsCardProps) {
  const totalLocations = locations.length;
  const withBooks = locations.filter(l => l.hasBook).length;
  const withoutBooks = totalLocations - withBooks;
  const percentage = totalLocations > 0 ? Math.round((withBooks / totalLocations) * 100) : 0;

  return (
    <div className="absolute top-6 left-6 z-[1000] hidden md:block">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-white/50 p-5 min-w-[280px] transform transition-all hover:scale-105 duration-300">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-slate-200">
          <div className="bg-gradient-to-br from-rose-500 to-purple-600 p-2.5 rounded-xl shadow-lg">
            <Package className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
              Estadístiques
            </h3>
            <p className="text-xs text-slate-500 font-medium">En temps real</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="space-y-3">
          {/* Total Locations */}
          <div className="group bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border-2 border-indigo-200 hover:border-indigo-400 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg shadow-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-600 uppercase">Ubicacions</p>
                  <p className="text-2xl font-black text-slate-900">{totalLocations}</p>
                </div>
              </div>
            </div>
          </div>

          {/* With Books */}
          <div className="group bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl border-2 border-pink-200 hover:border-pink-400 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-2 rounded-lg shadow-lg relative">
                  <BookOpen className="h-5 w-5 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-600 uppercase">Amb llibre</p>
                  <p className="text-2xl font-black text-pink-700">{withBooks}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Without Books */}
          <div className="group bg-gradient-to-r from-slate-50 to-gray-50 p-4 rounded-xl border-2 border-slate-200 hover:border-slate-400 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-slate-400 to-slate-500 p-2 rounded-lg shadow-lg">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-600 uppercase">Sense llibre</p>
                  <p className="text-2xl font-black text-slate-700">{withoutBooks}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Percentage Bar */}
          <div className="pt-3 border-t-2 border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-600 uppercase">Taxa d'ocupació</span>
              <span className="text-lg font-black text-pink-600">{percentage}%</span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 to-rose-600 rounded-full transition-all duration-1000 ease-out shadow-lg"
                style={{ width: `${percentage}%` }}
              >
                <div className="h-full w-full bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer badge */}
        <div className="mt-4 pt-4 border-t-2 border-slate-200">
          <div className="flex items-center justify-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-semibold text-slate-600">Sistema actiu</span>
          </div>
        </div>
      </div>
    </div>
  );
}
