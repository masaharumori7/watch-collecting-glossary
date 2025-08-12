import React from 'react';
import { Github } from 'lucide-react';

export default function GitHubButton() {
  return (
    <a
      href="https://github.com/masaharumori7/watch-collecting-glossary"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 backdrop-blur-sm text-white hover:text-white"
    >
      <Github className="h-5 w-5" />
      <span className="font-medium">View on GitHub</span>
    </a>
  );
}