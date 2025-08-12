import React from 'react';
import { Watch } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import GitHubButton from './GitHubButton';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 dark:from-gray-900 dark:to-gray-800 text-white shadow-xl">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-start mb-4">
          <GitHubButton />
          <ThemeToggle />
        </div>
        <div className="flex items-center justify-center space-x-3">
          <Watch className="h-8 w-8 text-amber-400" />
          <h1 className="text-3xl md:text-4xl font-bold">Watch Collecting Glossary</h1>
        </div>
        <p className="text-center mt-4 text-blue-100 dark:text-gray-300 text-lg">
          Your comprehensive guide to watch collecting terminology, brands, and components
        </p>
      </div>
    </header>
  );
}