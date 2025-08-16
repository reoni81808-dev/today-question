// React import는 tsx에서는 jsx-runtime으로 인해 필요없음
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { X, Crown, Calendar, Heart } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export function PremiumModal({ isOpen, onClose, onUpgrade }: PremiumModalProps) {
  const handleUpgrade = () => {
    // 실제 앱에서는 결제 시스템 연동
    console.log('프리미엄 업그레이드 시도');
    onUpgrade();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="w-full max-w-sm card-base p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Crown className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-xl text-card-foreground">프리미엄</h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* 고양이 캐릭터 */}
              <div className="text-center mb-6">
                <div className="text-6xl mb-3">😿</div>
                <h3 className="text-lg mb-2 text-card-foreground">오늘의 질문을 모두 사용했어요!</h3>
                <p className="text-sm text-subtitle">
                  무료 사용자는 하루에 5개의 질문만 뽑을 수 있어요
                </p>
              </div>

              {/* 통계 */}
              <div className="rounded-xl p-4 mb-6 bg-secondary">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-subtitle">오늘 사용한 질문</span>
                  <span className="text-card-foreground">5/5</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div className="bg-red-400 h-2 rounded-full w-full"></div>
                </div>
              </div>

              {/* 프리미엄 혜택 */}
              <div className="space-y-3 mb-6">
                <h4 className="text-base text-card-foreground mb-3">프리미엄 혜택</h4>
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-pink-500" />
                  <span className="text-sm text-subtitle">무제한 질문 뽑기</span>
                </div>
                <div className="flex items-center gap-3">
                  <Crown className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-subtitle">특별한 고양이 캐릭터</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-subtitle">질문 히스토리 저장</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleUpgrade}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-3 text-base button-base"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  프리미엄 업그레이드 - ₩2,900/월
                </Button>

                <Button
                  onClick={onClose}
                  variant="outline"
                  className="w-full py-3 text-base button-base"
                >
                  내일까지 기다릴게요
                </Button>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-subtitle text-center">
                  자정이 되면 무료 질문이 다시 5개 충전됩니다 ⏰
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}