// React import는 tsx에서는 jsx-runtime으로 인해 필요없음
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { X } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const handleKakaoLogin = () => {
    // 실제 앱에서는 카카오 SDK를 사용하여 로그인 구현
    console.log('카카오 로그인 시도');
    onLogin();
    onClose();
  };

  const handleGoogleLogin = () => {
    // 실제 앱에서는 Google OAuth를 사용하여 로그인 구현
    console.log('구글 로그인 시도');
    onLogin();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="w-full max-w-sm card-base p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl text-card-foreground">로그인</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <p className="text-sm text-subtitle mb-6 text-center">
                간편하게 로그인하고 데이터를 동기화하세요
              </p>

              <div className="space-y-3">
                <Button
                  onClick={handleKakaoLogin}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 text-base button-base"
                  variant="default"
                >
                  <div className="w-5 h-5 mr-3 bg-black rounded-full flex items-center justify-center">
                    <span className="text-yellow-400 text-xs">K</span>
                  </div>
                  카카오로 로그인
                </Button>

                <Button
                  onClick={handleGoogleLogin}
                  className="w-full py-3 text-base bg-card border border-border text-card-foreground hover:bg-secondary button-base"
                  variant="outline"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  구글로 로그인
                </Button>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-xs text-subtitle text-center leading-relaxed">
                  로그인 시 이용약관 및 개인정보처리방침에 동의하게 됩니다.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}