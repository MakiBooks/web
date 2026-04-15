import { useState, useEffect } from 'react';
import { BookCard } from './BookCard';
import { fetchGoogleSheetsData } from '../utils/googleSheets';
import { RefreshCw, ChevronUp } from 'lucide-react';

const BOOKS_PER_PAGE = 6;

export function BooksGrid() {
  const [books, setBooks] = useState<Array<{
    title: string;
    author: string;
    genre: string;
    location: string;
    releaseDate: string;
    image: string;
    status: 'disponible' | 'viajando' | 'leído';
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(BOOKS_PER_PAGE);

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true);
      try {
        const data = await fetchGoogleSheetsData();

        // Transformar los datos de BookLocation al formato de BookCard
        const transformedBooks = data
          .filter(location => location.bookTitle && location.bookTitle.trim() !== '')
          .map(location => ({
            title: location.bookTitle || 'Libro sin título',
            author: 'Autor desconocido', // No está en la spreadsheet
            genre: 'Literatura', // No está en la spreadsheet
            location: location.street,
            releaseDate: 'Recientemente', // No está en la spreadsheet
            image: location.imageUrl,
            status: location.hasBook ? 'disponible' as const : 'leído' as const,
          }));

        setBooks(transformedBooks);
      } catch (error) {
        console.error('Error cargando libros:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  const loadMore = () => {
    setVisibleCount(prev => prev + BOOKS_PER_PAGE);
  };

  const loadLess = () => {
    setVisibleCount(prev => Math.max(BOOKS_PER_PAGE, prev - BOOKS_PER_PAGE));
  };

  const visibleBooks = books.slice(0, visibleCount);
  const hasMore = visibleCount < books.length;
  const canShowLess = visibleCount > BOOKS_PER_PAGE;

  return (
    <section id="libros" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Libros Disponibles</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre libros liberados por nuestra comunidad, listos para comenzar su próxima aventura.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600">No hay libros disponibles en este momento.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleBooks.map((book, index) => (
                <BookCard key={index} {...book} />
              ))}
            </div>

            {(hasMore || canShowLess) && (
              <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
                {canShowLess && (
                  <button
                    onClick={loadLess}
                    className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                  >
                    <ChevronUp className="h-5 w-5" />
                    Cargar menos libros
                  </button>
                )}

                {hasMore && (
                  <button
                    onClick={loadMore}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                  >
                    <RefreshCw className="h-5 w-5" />
                    Cargar más libros
                  </button>
                )}
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
