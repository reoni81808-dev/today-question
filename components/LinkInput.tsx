import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Link, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkPreview } from './LinkPreview';

interface LinkInputProps {
  onLinksChange?: (links: string[]) => void;
  className?: string;
  placeholder?: string;
  maxLinks?: number;
}

export function LinkInput({ 
  onLinksChange, 
  className = '', 
  placeholder = '링크를 입력하세요...',
  maxLinks = 5 
}: LinkInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [links, setLinks] = useState<string[]>([]);
  const [isValidUrl, setIsValidUrl] = useState(true);

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const addLink = () => {
    const trimmedUrl = inputValue.trim();
    
    if (!trimmedUrl) return;
    
    if (!validateUrl(trimmedUrl)) {
      setIsValidUrl(false);
      return;
    }

    if (links.length >= maxLinks) {
      alert(`최대 ${maxLinks}개의 링크만 첨부할 수 있습니다.`);
      return;
    }

    if (links.includes(trimmedUrl)) {
      alert('이미 첨부된 링크입니다.');
      return;
    }

    const newLinks = [...links, trimmedUrl];
    setLinks(newLinks);
    setInputValue('');
    setIsValidUrl(true);
    onLinksChange?.(newLinks);
  };

  const removeLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
    onLinksChange?.(newLinks);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addLink();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!isValidUrl && e.target.value) {
      setIsValidUrl(true);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 링크 입력 섹션 */}
      <Card className="p-4 card-base">
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <Input
              type="url"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className={`${!isValidUrl ? 'border-red-500' : ''}`}
            />
            {!isValidUrl && (
              <p className="text-xs text-red-500 mt-1">올바른 URL을 입력해주세요.</p>
            )}
          </div>
          <Button
            onClick={addLink}
            disabled={!inputValue.trim() || links.length >= maxLinks}
            size="sm"
            className="flex-shrink-0"
          >
            <Plus className="w-4 h-4 mr-1" />
            첨부
          </Button>
        </div>
        
        {/* 링크 개수 표시 */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Link className="w-3 h-3" />
            <span>첨부된 링크: {links.length}/{maxLinks}</span>
          </div>
          {links.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setLinks([]);
                onLinksChange?.([]);
              }}
              className="text-xs text-red-500 hover:text-red-600"
            >
              모두 제거
            </Button>
          )}
        </div>
      </Card>

      {/* 링크 미리보기 섹션 */}
      <AnimatePresence>
        {links.map((link, index) => (
          <motion.div
            key={`${link}-${index}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <LinkPreview
              url={link}
              onRemove={() => removeLink(index)}
              className="mb-2"
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 빈 상태 */}
      {links.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Link className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            링크를 첨부하면 썸네일과 함께 미리보기가 표시됩니다
          </p>
        </motion.div>
      )}
    </div>
  );
}
