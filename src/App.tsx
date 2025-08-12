import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { glossaryTerms } from './data/glossaryTerms';
import SearchBar from './components/SearchBar';
import AlphabetNav from './components/AlphabetNav';
import GlossaryCard from './components/GlossaryCard';
import Header from './components/Header';

function AppContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const sectionsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(term =>
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.description.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => a.term.localeCompare(b.term));
  }, [searchTerm]);

  const termsByLetter = useMemo(() => {
    const grouped: { [key: string]: typeof glossaryTerms } = {};
    
    filteredTerms.forEach(term => {
      const firstLetter = term.term[0].toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(term);
    });
    
    return grouped;
  }, [filteredTerms]);

  const scrollToLetter = (letter: string) => {
    setActiveLetter(letter);
    const element = sectionsRef.current[letter];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLetter(entry.target.getAttribute('data-letter'));
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    );

    Object.values(sectionsRef.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [termsByLetter]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        {!searchTerm && (
          <div className="mb-8">
            <AlphabetNav onLetterClick={scrollToLetter} activeLetter={activeLetter} />
          </div>
        )}

        <div className="space-y-8">
          {Object.keys(termsByLetter)
            .sort()
            .map((letter) => (
              <section
                key={letter}
                ref={(el) => (sectionsRef.current[letter] = el)}
                data-letter={letter}
                className="scroll-mt-32"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-blue-600 dark:bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-xl font-bold">{letter}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {searchTerm ? `"${searchTerm}" results starting with ${letter}` : `Terms starting with ${letter}`}
                  </h2>
                  <div className="flex-1 ml-4 h-px bg-gray-300 dark:bg-gray-600"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {termsByLetter[letter].map((term) => (
                    <GlossaryCard
                      key={term.term}
                      term={term}
                      searchTerm={searchTerm}
                    />
                  ))}
                </div>
              </section>
            ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No results found</h3>
            <p className="text-gray-500 dark:text-gray-500">Try adjusting your search term or browse by letter.</p>
          </div>
        )}
      </div>

      <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-600">
            {glossaryTerms.length} terms • Covering brands, components, complications, and terminology
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
