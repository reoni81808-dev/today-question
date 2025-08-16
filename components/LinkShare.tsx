import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Moon, Sun, MessageCircle, Share2, Copy, Check } from 'lucide-react';
import { LinkInput } from './LinkInput';

interface LinkShareProps {
  onBack: () => void;
  darkMode: boolean;
  onDarkModeChange: (enabled: boolean) => void;
}

export function LinkShare({ onBack, darkMode, onDarkModeChange }: LinkShareProps) {
  const [links, setLinks] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const handleLinksChange = (newLinks: string[]) => {
    setLinks(newLinks);
  };

  const handleShare = async () => {
    if (links.length === 0) {
      alert('공유할 링크를 먼저 첨부해주세요.');
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: '오늘의 질문 - 링크 모음',
          text: '함께 공유하고 싶은 링크들입니다.',
          url: window.location.href
        });
      } catch (error) {
        console.log('공유가 취소되었습니다.');
      }
    } else {
      // 공유 API가 지원되지 않는 경우 클립보드에 복사
      handleCopyToClipboard();
    }
  };

  const handleCopyToClipboard = async () => {
    const linkText = links.join('\n');
    try {
      await navigator.clipboard.writeText(linkText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
      alert('클립보드 복사에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 transition-theme flex flex-col">
      <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6 pt-2 lg:mb-8 lg:pt-4">
          <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground p-4">
            <ArrowLeft className="w-8 h-8" />
          </Button>
          <h1 className="text-lg text-foreground lg:text-xl">링크 공유</h1>
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

        {/* 메인 콘텐츠 */}
        <div className="flex-1 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* 설명 카드 */}
            <Card className="p-4 card-base">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Share2 className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-card-foreground mb-2">
                  링크를 공유해보세요
                </h2>
                <p className="text-sm text-muted-foreground">
                  함께 보고 싶은 링크들을 첨부하면 썸네일과 함께 미리보기가 표시됩니다.
                </p>
              </div>
            </Card>

            {/* 링크 입력 컴포넌트 */}
            <LinkInput
              onLinksChange={handleLinksChange}
              placeholder="https://example.com"
              maxLinks={10}
            />

            {/* 공유 버튼 */}
            {links.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <Card className="p-4 card-base">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium text-card-foreground">
                        링크 공유하기
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {links.length}개의 링크가 첨부되었습니다
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyToClipboard}
                        className="text-xs"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3 mr-1" />
                            복사됨
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 mr-1" />
                            복사
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={handleShare}
                        size="sm"
                        className="text-xs"
                      >
                        <Share2 className="w-3 h-3 mr-1" />
                        공유
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
