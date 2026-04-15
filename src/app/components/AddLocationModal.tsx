import { X, MapPin, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { getCoordinatesForAddress } from "../utils/googleSheets";

interface AddLocationModalProps {
  isOpen: boolean;
  coordinates: { lat: number; lng: number } | null;
  onClose: () => void;
  onAdd: (street: string, lat: number, lng: number, imageUrl: string) => void;
}

export function AddLocationModal({ isOpen, coordinates, onClose, onAdd }: AddLocationModalProps) {
  const [street, setStreet] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [localCoords, setLocalCoords] = useState(coordinates);

  // Update local coords when prop changes
  useEffect(() => {
    if (coordinates) {
      setLocalCoords(coordinates);
    }
  }, [coordinates]);

  if (!isOpen) return null;

  const handleSearchLocation = () => {
    if (street.trim() === "") {
      alert("Por favor ingresa el nombre de la calle primero");
      return;
    }

    const coords = getCoordinatesForAddress(street.trim(), 0);
    setLocalCoords(coords);
  };

  const handleSubmit = () => {
    if (street.trim() === "") {
      alert("Por favor ingresa el nombre de la calle");
      return;
    }

    if (!localCoords) {
      alert("No se pudieron obtener las coordenadas");
      return;
    }

    const finalImageUrl = imageUrl.trim() || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop";

    onAdd(street.trim(), localCoords.lat, localCoords.lng, finalImageUrl);

    // Reset form
    setStreet("");
    setImageUrl("");
    setLocalCoords(null);
  };

  const handleClose = () => {
    setStreet("");
    setImageUrl("");
    setLocalCoords(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[1001]">
      <Card className="max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-600" />
              Nuevo punto de libro
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="street">Nombre de la calle *</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Ej: Carrer de la Sagrera, 123"
                  className="flex-1"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchLocation();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleSearchLocation}
                  title="Buscar ubicación por nombre de calle"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Escribe el nombre de la calle y pulsa <Search className="h-3 w-3 inline" /> para ubicarla automáticamente
              </p>
            </div>

            <div>
              <Label htmlFor="coordinates">Coordenadas</Label>
              <Input
                id="coordinates"
                value={localCoords ? `${localCoords.lat.toFixed(6)}, ${localCoords.lng.toFixed(6)}` : "No especificadas"}
                disabled
                className="mt-1 bg-gray-50"
              />
            </div>
            
            <div>
              <Label htmlFor="imageUrl">URL de imagen (opcional)</Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Si se deja vacío, se usará una imagen por defecto
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSubmit} className="flex-1">
                Añadir ubicación
              </Button>
              <Button onClick={handleClose} variant="outline">
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
