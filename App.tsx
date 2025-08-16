import { useState, useEffect } from 'react';
import { CategorySelector } from './components/CategorySelector';
import { CardDeck } from './components/CardDeck';
import { PremiumModal } from './components/PremiumModal';
import { Category } from './types/questions';

type AppState = 'categories' | 'cards';

// 일일 질문 사용량 관리
const getDailyQuestionCount = (): number => {
  const today = new Date().toDateString();
  const stored = localStorage.getItem('dailyQuestions');
  if (stored) {
    const data = JSON.parse(stored);
    if (data.date === today) {
      return data.count;
    }
  }
  return 0;
};

const incrementDailyQuestionCount = (): number => {
  const today = new Date().toDateString();
  const currentCount = getDailyQuestionCount();
  const newCount = currentCount + 1;
  localStorage.setItem('dailyQuestions', JSON.stringify({
    date: today,
    count: newCount
  }));
  return newCount;
};

const isPremiumUser = (): boolean => {
  return localStorage.getItem('isPremium') === 'true';
};

export default function App() {
  const [currentView, setCurrentView] = useState<AppState>('categories');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [dailyQuestionCount, setDailyQuestionCount] = useState(0); // 리셋
  const [isPremium, setIsPremium] = useState(isPremiumUser());

  // 일회성 리셋 - localStorage에서 오늘 날짜의 카운트를 0으로 초기화
  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem('dailyQuestions', JSON.stringify({
      date: today,
      count: 0
    }));
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSelectCategory = (category: Category) => {
    // 프리미엄 사용자가 아니고 일일 제한에 도달한 경우
    if (!isPremium && dailyQuestionCount >= 10) {
      setShowPremiumModal(true);
      return;
    }

    setSelectedCategory(category);
    setCurrentView('cards');
  };

  const handleQuestionDrawn = () => {
    if (!isPremium) {
      const newCount = incrementDailyQuestionCount();
      setDailyQuestionCount(newCount);
    }
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setCurrentView('categories');
  };



  const handlePremiumUpgrade = () => {
    localStorage.setItem('isPremium', 'true');
    setIsPremium(true);
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
    <>
      <CategorySelector 
        onSelectCategory={handleSelectCategory}
        isPremium={isPremium}
        darkMode={darkMode}
        onDarkModeChange={setDarkMode}
      />
      
      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onUpgrade={handlePremiumUpgrade}
      />
    </>
  );
}