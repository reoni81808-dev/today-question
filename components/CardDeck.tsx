import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { questions, Question, Category } from '../types/questions';
import { Button } from './ui/button';
import { ArrowLeft, Shuffle, Moon, Sun, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
// import cardBackImage from 'figma:asset/d70764c7ea9eb68da5d72594e6f396274db8d131.png';
const cardBackImage = '/card-back.png'; // 임시 placeholder

interface CardDeckProps {
  category: Category;
  onBack: () => void;
  onQuestionDrawn?: () => void;
  darkMode: boolean;
  onDarkModeChange: (enabled: boolean) => void;
}

// 타로카드 뒷면 컴포넌트
const TarotCardBack = ({ className }: { className?: string }) => (
  <div className={`w-full h-full relative overflow-hidden ${className}`}>
    <ImageWithFallback 
      src={cardBackImage}
      alt="타로카드 뒷면"
      className="w-full h-full object-cover card-shadow"
      style={{
        borderRadius: '1rem'
      }}
    />
  </div>
);

export function CardDeck({ category, onBack, onQuestionDrawn, darkMode, onDarkModeChange }: CardDeckProps) {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);

  const categoryQuestions = questions.filter(q => q.categoryId === category.id);

  const shuffleQuestions = () => {
    setIsShuffling(true);
    const shuffled = [...categoryQuestions].sort(() => Math.random() - 0.5);
    
    setTimeout(() => {
      // 12개로 제한
      setShuffledQuestions(shuffled.slice(0, 12));
      setIsShuffling(false);
    }, 1000);
  };

  useEffect(() => {
    shuffleQuestions();
  }, [category]);

  const handleCardClick = (question: Question) => {
    if (!isShuffling) {
      setSelectedQuestion(question);
      // 질문을 뽑았을 때 카운트 증가
      if (onQuestionDrawn) {
        onQuestionDrawn();
      }
    }
  };

  const handleShuffle = () => {
    setSelectedQuestion(null);
    shuffleQuestions();
  };

  if (selectedQuestion) {
    return (
      <div className="min-h-screen bg-background p-4 flex flex-col transition-theme">
        <div className="max-w-md mx-auto lg:max-w-2xl w-full">
          <div className="flex items-center justify-between mb-6 pt-2 lg:mb-8 lg:pt-4">
            <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground p-4">
              <ArrowLeft className="w-8 h-8 icon-visible" />
            </Button>
            <div className={`px-3 py-1 rounded-button text-white text-xs lg:text-sm ${category.color}`}>
              {category.name}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => onDarkModeChange(!darkMode)}
                className="p-2"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {darkMode ? 
                  <Sun className="w-5 h-5 icon-visible" /> : 
                  <Moon className="w-5 h-5 icon-visible" />
                }
              </Button>
              <Button
                variant="ghost"
                onClick={() => window.open('https://open.kakao.com/o/slsXXSMh', '_blank')}
                className="p-2"
                style={{ color: 'var(--muted-foreground)' }}
              >
                <MessageCircle className="w-5 h-5 icon-visible" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-8 min-h-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.6 }}
            className="w-72 h-96 lg:w-80 lg:h-[28rem] relative"
          >
            <img 
              src="/card-front.png"
              alt="카드 앞면"
              className="w-full h-full object-contain"
              style={{ borderRadius: '1rem' }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 lg:p-8 m-4">
              <h3 className="text-lg text-black leading-relaxed px-2 lg:text-xl lg:px-4 font-medium">
                {selectedQuestion.text}
              </h3>
            </div>
          </motion.div>
        </div>

        <div className="text-center pb-8 lg:pb-12">
          <Button onClick={handleShuffle} className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-8 py-3 lg:px-10 lg:py-2 text-white button-base">
            <Shuffle className="w-4 h-4 mr-2 icon-visible" />
            다시 고르기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 transition-theme flex flex-col">
      <div className="max-w-md mx-auto lg:max-w-4xl flex-1 flex flex-col">
        {/* 고정된 헤더 영역 */}
        <div className="flex items-center justify-between mb-6 pt-2 lg:mb-8 lg:pt-4 flex-shrink-0">
          <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground p-4">
            <ArrowLeft className="w-8 h-8 icon-visible" />
          </Button>
          <div className={`px-3 py-1 rounded-button text-white text-xs lg:text-sm ${category.color} flex-shrink-0`}>
            {category.name}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              onClick={() => onDarkModeChange(!darkMode)}
              className="p-2"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {darkMode ? 
                <Sun className="w-5 h-5 icon-visible" /> : 
                <Moon className="w-5 h-5 icon-visible" />
              }
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.open('https://open.kakao.com/o/slsXXSMh', '_blank')}
              className="p-2"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <MessageCircle className="w-5 h-5 icon-visible" />
            </Button>
          </div>
        </div>

        {/* 고정된 제목 영역 */}
        <div className="text-center mb-6 lg:mb-8 flex-shrink-0">
          <h2 className="text-lg mb-2 text-foreground lg:text-2xl">카드를 선택해주세요</h2>
          <p className="text-muted-foreground text-sm lg:text-base">원하는 카드를 클릭하면 질문이 나타납니다</p>
        </div>

        {/* 카드 영역 - 안정적인 레이아웃 */}
        <div className="flex-1 min-h-0 relative">
          {isShuffling ? (
            <div className="absolute inset-0 text-center py-16 lg:py-20 flex flex-col items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block w-24 h-32 lg:w-28 lg:h-36 mb-4"
              >
                <TarotCardBack className="rounded-[1rem]" />
              </motion.div>
              <p className="text-muted-foreground">카드를 섞고 있습니다...</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3 pb-8 lg:grid-cols-4 lg:gap-4 h-full overflow-y-auto">
              {shuffledQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20, rotateY: 180 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotateY: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="aspect-[3/4] cursor-pointer relative"
                  onClick={() => handleCardClick(question)}
                >
                  <TarotCardBack className="rounded-[1rem]" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}