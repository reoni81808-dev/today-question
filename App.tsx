import { useState, useEffect } from 'react';
import { CategorySelector } from './components/CategorySelector';
import { CardDeck } from './components/CardDeck';
import { Category } from './types/questions';

type AppState = 'categories' | 'cards';

export default function App() {
  const [currentView, setCurrentView] = useState<AppState>('categories');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setCurrentView('cards');
  };

  const handleQuestionDrawn = () => {
    // 질문 뽑기 제한 없음
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setCurrentView('categories');
  };

  if (currentView === 'cards' && selectedCategory) {
    return (
      <CardDeck 
        category={selectedCategory} 
        onBack={handleBackToCategories}
        onQuestionDrawn={handleQuestionDrawn}
        darkMode={darkMode}
        onDarkModeChange={setDarkMode}
      />
    );
  }

  return (
    <CategorySelector 
      onSelectCategory={handleSelectCategory}
      darkMode={darkMode}
      onDarkModeChange={setDarkMode}
    />
  );
}