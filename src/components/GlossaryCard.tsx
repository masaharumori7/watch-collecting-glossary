import React from 'react';
import { GlossaryTerm } from '../types';

interface GlossaryCardProps {
  term: GlossaryTerm;
  searchTerm: string;
}

export default function GlossaryCard({ term, searchTerm }: GlossaryCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'brand': return 'bg-amber-100 text-amber-800';
      case 'component': return 'bg-blue-100 text-blue-800';
      case 'complication': return 'bg-purple-100 text-purple-800';
      case 'style': return 'bg-green-100 text-green-800';
      case 'material': return 'bg-gray-100 text-gray-800';
      case 'terminology': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {highlightText(term.term, searchTerm)}
        </h3>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(term.category)}`}>
          {term.category}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {highlightText(term.description, searchTerm)}
      </p>
    </div>
  );
}