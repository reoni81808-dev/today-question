// React import는 tsx에서는 jsx-runtime으로 인해 필요없음
import { categories, Category } from '../types/questions';
import { Card } from './ui/card';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Settings, Crown } from 'lucide-react';
const heartIcon = '/heart-icon.png'; // 임시 placeholder
const catImage = '/cat-image.png'; // 임시 placeholder
const handIcon = '/hand-icon.png'; // 임시 placeholder
const talkIcon = '/talk-icon.png'; // 임시 placeholder
const likesIcon = '/likes-icon.png'; // 임시 placeholder
const dartIcon = '/dart-icon.png'; // 임시 placeholder


interface CategorySelectorProps {
  onSelectCategory: (category: Category) => void;
  onOpenSettings: () => void;
  isPremium: boolean;
}

export function CategorySelector({ onSelectCategory, onOpenSettings, isPremium }: CategorySelectorProps) {

  // 일반 카테고리와 면접준비 카테고리 분리
  const regularCategories = categories.filter(cat => cat.id !== 'interview');
  const interviewCategory = categories.find(cat => cat.id === 'interview');

  return (
    <div className="min-h-screen bg-background transition-theme">
      <div className="max-w-md mx-auto p-4 lg:max-w-2xl">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6 pt-4">
          <div className="flex items-center gap-2">
            <h1 className="text-lg text-foreground">오늘의 질문</h1>
            <span className="text-lg">✨</span>
          </div>
          <div className="flex items-center gap-3">
            {isPremium && (
              <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-button">
                <Crown className="w-4 h-4 text-white" />
                <span className="text-white text-sm">프리미엄</span>
              </div>
            )}
            <Button
              variant="ghost"
              onClick={onOpenSettings}
              className="p-3"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <Settings className="w-6 h-6 icon-visible" />
            </Button>
          </div>
        </div>

        {/* 메인 캐릭터 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="relative">
            {/* 고양이 캐릭터 이미지 */}
            <div className="relative inline-block mb-6">
              <img 
                src={catImage}
                alt="마법사 고양이"
                className="w-44 h-44 object-contain mx-auto drop-shadow-lg"
              />
              
              {/* 반짝이 효과 */}
              <div className="absolute top-2 right-2 opacity-80">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-yellow-400 text-xl"
                >
                  ✨
                </motion.div>
              </div>
              
              <div className="absolute bottom-4 left-2 opacity-60">
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="text-purple-400 text-lg"
                >
                  ✨
                </motion.div>
              </div>
            </div>

            {/* 개선된 말풍선 */}
            <div className="relative mx-auto max-w-xs">
                          {/* 말풍선 본체 */}
            <div className="relative p-5 rounded-xl bg-gradient-to-br from-purple-50 via-purple-100/80 to-indigo-50/90 dark:from-purple-900/30 dark:via-purple-800/40 dark:to-indigo-900/30 backdrop-blur-sm shadow-xl transition-theme border border-purple-200/50 dark:border-purple-700/50">
              
              {/* 말풍선 꼬리 */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-6 border-r-6 border-b-8 border-transparent border-b-purple-50 dark:border-b-purple-900/30"></div>
              </div>
              
              {/* 텍스트 */}
              <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed text-center">
                함께일 때 더 즐거운 질문들이에요!<br />
                <span className="text-xs text-gray-600 dark:text-gray-400 opacity-75">궁금한 카테고리에서 질문들을 뽑아보세요</span>
              </p>
            </div>
            </div>
          </div>
        </motion.div>

        {/* 카테고리 그리드 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {regularCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Card
                className="p-5 cursor-pointer hover:shadow-xl transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-light hover:scale-105 border border-gray-100 dark:border-gray-700"
                onClick={() => onSelectCategory(category)}
              >
                <div className="text-center space-y-3">
                  {/* 카테고리 아이콘 */}
                  <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center ${category.color}/20`}>
                    {category.id === 'romance' ? (
                      <img 
                        src={heartIcon} 
                        alt="연애 아이콘" 
                        className="w-12 h-12 object-contain"
                      />
                    ) : category.id === 'introduction' ? (
                      <img 
                        src={handIcon} 
                        alt="자기소개 아이콘" 
                        className="w-12 h-12 object-contain"
                      />
                    ) : category.id === 'friends' ? (
                      <img 
                        src={talkIcon} 
                        alt="친구 아이콘" 
                        className="w-12 h-12 object-contain"
                      />
                    ) : category.id === 'work' ? (
                      <img 
                        src={likesIcon} 
                        alt="취향 아이콘" 
                        className="w-12 h-12 object-contain"
                      />
                    ) : category.id === 'interview' ? (
                      <img 
                        src={dartIcon} 
                        alt="취업준비 아이콘" 
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      <span className="text-2xl">{category.icon}</span>
                    )}
                  </div>
                  
                  {/* 카테고리 이름 */}
                  <div>
                    <h3 className="text-base font-bold text-card-foreground">{category.name}</h3>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 면접준비 특별 카드 */}
        {interviewCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mb-6"
          >
            <Card
              className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:scale-[1.02] shadow-light border border-gray-100 dark:border-gray-700"
              onClick={() => onSelectCategory(interviewCategory)}
            >
              <div className="flex items-center gap-4">
                <img 
                  src={dartIcon} 
                  alt="면접준비 아이콘" 
                  className="w-12 h-12 object-contain"
                />
                <div className="flex-1">
                  <h3 className="text-base font-bold text-card-foreground">{interviewCategory.name}</h3>
                  <p className="text-sm text-muted-foreground">{interviewCategory.description}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}


      </div>
    </div>
  );
}