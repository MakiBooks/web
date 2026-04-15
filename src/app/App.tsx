import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { InteractiveMap } from './components/InteractiveMap';
import { BooksGrid } from './components/BooksGrid';
import { Feedback } from './components/Feedback';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <InteractiveMap />
        <BooksGrid />
        <Feedback />
      </main>
      <Footer />
    </div>
  );
}