import React from 'react';

interface AlphabetNavProps {
  onLetterClick: (letter: string) => void;
  activeLetter: string | null;
}

export default function AlphabetNav({ onLetterClick, activeLetter }: AlphabetNavProps) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="flex flex-wrap justify-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner">
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => onLetterClick(letter)}
          className={`w-8 h-8 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-110 ${
            activeLetter === letter
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm'
          }`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}