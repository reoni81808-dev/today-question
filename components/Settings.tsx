import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Moon, Sun, MessageCircle } from 'lucide-react';
import { Switch } from './ui/switch';

interface SettingsProps {
  onBack: () => void;
  darkMode: boolean;
  onDarkModeChange: (enabled: boolean) => void;
}

export function Settings({ onBack, darkMode, onDarkModeChange }: SettingsProps) {

  return (
    <>
      <div className="min-h-screen bg-background p-4 transition-theme flex flex-col">
        <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-6 pt-2 lg:mb-8 lg:pt-4">
            <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground p-4">
              <ArrowLeft className="w-8 h-8" />
            </Button>
            <h1 className="text-lg text-foreground lg:text-xl">설정</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>

          <div className="space-y-4 flex-1 overflow-y-auto">
            {/* 다크 모드 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-4 card-base">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {darkMode ? 
                      <Sun className="w-5 h-5 icon-visible" /> : 
                      <Moon className="w-5 h-5 icon-visible" />
                    }
                    <div>
                      <h3 className="text-base text-card-foreground">
                        {darkMode ? '라이트 모드' : '다크 모드'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {darkMode ? '밝은 테마로 변경' : '어두운 테마로 변경'}
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={darkMode} 
                    onCheckedChange={onDarkModeChange}
                  />
                </div>
              </Card>
            </motion.div>

            {/* 문의하기 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-4 card-base">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5 icon-visible" />
                    <div>
                      <h3 className="text-base text-card-foreground">문의하기</h3>
                      <p className="text-sm text-muted-foreground">오류 신고 및 건의사항</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://open.kakao.com/o/slsXXSMh', '_blank')}
                    className="text-xs"
                  >
                    문의하기
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}