import { useEffect, useState } from "react";
import type { BookLocation } from "../data/streetData";

type Props = {
  location: BookLocation | null;
  onClose: () => void;
};

export function LocationModal({ location, onClose }: Props) {
  const safeLocation = location ?? {
    id: 0,
    street: "",
    lat: 0,
    lng: 0,
    hasBook: false,
    bookTitle: "",
    bookCode: "",
    bookSummary: "",
    imageUrl: ""
  };

  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [summary, setSummary] = useState("");
  const [hasBook, setHasBook] = useState(false);

  useEffect(() => {
    setTitle(safeLocation.bookTitle || "");
    setCode(safeLocation.bookCode || "");
    setSummary(safeLocation.bookSummary || "");
    setHasBook(safeLocation.hasBook || false);
  }, [safeLocation]);

  if (!location) {
    return <div className="hidden">No modal</div>; // 🔑 evita error Figma
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-2">{safeLocation.street}</h2>

        <p className="mb-2">
          📚 {hasBook ? "Hi ha llibre disponible" : "No hi ha llibre"}
        </p>

        <p className="mb-2">
          <strong>Títol:</strong> {title || "—"}
        </p>

        <p className="mb-2">
          <strong>Codi:</strong> {code || "—"}
        </p>

        <p className="mb-4">
          <strong>Resum:</strong> {summary || "—"}
        </p>

        {safeLocation.imageUrl && (
          <img
            src={safeLocation.imageUrl}
            alt="Llibre"
            className="w-full h-40 object-cover rounded mb-4"
          />
        )}

        <button
          onClick={onClose}
          className="w-full bg-red-600 text-white py-2 rounded"
        >
          Tancar
        </button>
      </div>
    </div>
  );
}