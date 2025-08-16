import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { X, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LinkMetadata {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName?: string;
}

interface LinkPreviewProps {
  url: string;
  onRemove?: () => void;
  className?: string;
}

export function LinkPreview({ url, onRemove, className = '' }: LinkPreviewProps) {
  const [metadata, setMetadata] = useState<LinkMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true);
        setError(false);
        
        // CORS 우회를 위한 프록시 서비스 사용 (예: allorigins.win)
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        const data = await response.json();
        
        if (data.contents) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data.contents, 'text/html');
          
          const title = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
                       doc.querySelector('title')?.textContent ||
                       '제목 없음';
          
          const description = doc.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
                            doc.querySelector('meta[name="description"]')?.getAttribute('content') ||
                            '설명 없음';
          
          const image = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ||
                       doc.querySelector('meta[property="twitter:image"]')?.getAttribute('content') ||
                       '/iphoneimage.png'; // 기본 썸네일로 iPhone 이미지 사용
          
          const siteName = doc.querySelector('meta[property="og:site_name"]')?.getAttribute('content');
          
          setMetadata({
            title,
            description,
            image,
            url,
            siteName
          });
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('링크 메타데이터 가져오기 실패:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchMetadata();
    }
  }, [url]);

  const handleOpenLink = () => {
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${className}`}
      >
        <Card className="p-4 card-base">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-muted rounded-lg animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse"></div>
              <div className="h-3 bg-muted rounded animate-pulse w-3/4"></div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  if (error || !metadata) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${className}`}
      >
        <Card className="p-4 card-base border-dashed border-2 border-muted">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <ExternalLink className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">링크 미리보기를 불러올 수 없습니다</p>
                <p className="text-xs text-muted-foreground truncate max-w-48">{url}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenLink}
                className="text-xs"
              >
                열기
              </Button>
              {onRemove && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRemove}
                  className="text-xs p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`${className}`}
    >
      <Card className="overflow-hidden card-base">
        <div className="flex">
          {/* 썸네일 이미지 */}
          <div className="w-24 h-24 flex-shrink-0">
            {metadata.image ? (
              <img
                src={metadata.image}
                alt={metadata.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`w-full h-full bg-muted flex items-center justify-center ${metadata.image ? 'hidden' : ''}`}>
              <ImageIcon className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
          
          {/* 콘텐츠 */}
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-card-foreground line-clamp-2 mb-1">
                  {metadata.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {metadata.description}
                </p>
                <div className="flex items-center space-x-2">
                  {metadata.siteName && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {metadata.siteName}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground truncate">
                    {new URL(url).hostname}
                  </span>
                </div>
              </div>
              
              {/* 액션 버튼들 */}
              <div className="flex items-center space-x-1 ml-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleOpenLink}
                  className="text-xs h-8 px-2"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  열기
                </Button>
                {onRemove && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onRemove}
                    className="text-xs h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
