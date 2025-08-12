export interface GlossaryTerm {
  term: string;
  description: string;
  category: 'brand' | 'component' | 'complication' | 'style' | 'material' | 'terminology';
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}