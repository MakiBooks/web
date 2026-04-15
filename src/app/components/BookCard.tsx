import { MapPin, User, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';

interface BookCardProps {
  title: string;
  author: string;
  genre: string;
  location: string;
  releaseDate: string;
  image: string;
  status: 'disponible' | 'viajando' | 'leído';
}

export function BookCard({ title, author, genre, location, releaseDate, status }: BookCardProps) {
  const statusColors = {
    disponible: 'bg-green-100 text-green-800',
    viajando: 'bg-blue-100 text-blue-800',
    leído: 'bg-gray-100 text-gray-800',
  };

  const statusText = {
    disponible: 'Disponible',
    viajando: 'Viajando',
    leído: 'Leído',
  };

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 flex-1">{title}</h3>
          <Badge className={`${statusColors[status]} flex-shrink-0`}>
            {statusText[status]}
          </Badge>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <span>{author}</span>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">{genre}</Badge>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>Liberado {releaseDate}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
