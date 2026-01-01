'use client';

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { motion, AnimatePresence, Transition, TransitionDefinition } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface RotatingTextProps extends Omit<React.ComponentPropsWithoutRef<'span'>, 'children'> {
  texts: string[];
  transition?: Transition;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number;
  initial?: TransitionDefinition;
  animate?: TransitionDefinition;
  exit?: TransitionDefinition;
  autoNext?: boolean;
  interval?: number;
  loop?: boolean;
  onNext?: (index: number) => void;
  splitBy?: string;
}

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>((
  {
    texts,
    transition = { type: 'spring', damping: 25, stiffness: 300 },
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    staggerDuration = 0.025,
    staggerFrom = 'first',
    initial = { y: '100%', opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: '-120%', opacity: 0 },
    autoNext = true,
    interval = 3000,
    loop = true,
    onNext,
    splitBy = 'characters',
    ...rest
  },
  ref
) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const splitText = useMemo(() => {
    const text = texts[currentTextIndex];
    if (splitBy === 'characters') return text.split('');
    if (splitBy === 'words') return text.split(' ');
    if (splitBy === 'lines') return text.split('\n');
    return [text];
  }, [texts, currentTextIndex, splitBy]);

  const handleIndexChange = useCallback((newIndex: number) => {
    setCurrentTextIndex(newIndex);
    if (onNext) onNext(newIndex);
  }, [onNext]);

  const next = useCallback(() => {
    const nextIndex = currentTextIndex + 1;
    if (nextIndex < texts.length) {
      handleIndexChange(nextIndex);
    } else if (loop) {
      handleIndexChange(0);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const previous = useCallback(() => {
    const prevIndex = currentTextIndex - 1;
    if (prevIndex >= 0) {
      handleIndexChange(prevIndex);
    } else if (loop) {
      handleIndexChange(texts.length - 1);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const jumpTo = useCallback((index: number) => {
    const validIndex = Math.max(0, Math.min(index, texts.length - 1));
    handleIndexChange(validIndex);
  }, [texts.length, handleIndexChange]);

  const reset = useCallback(() => {
    handleIndexChange(0);
  }, [handleIndexChange]);

  useImperativeHandle(ref, () => ({
    next,
    previous,
    jumpTo,
    reset,
  }), [next, previous, jumpTo, reset]);

  useEffect(() => {
    if (!autoNext) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoNext, interval, next]);

  return (
    <span
      className={cn('inline-flex flex-wrap whitespace-pre-wrap relative', mainClassName)}
      {...rest}
    >
      <span className="sr-only">{texts[currentTextIndex]}</span>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTextIndex}
          className={cn('flex flex-wrap', splitLevelClassName)}
          aria-hidden="true"
        >
          {splitText.map((char, charIndex) => (
            <motion.span
              key={`${currentTextIndex}-${charIndex}`}
              initial={initial}
              animate={animate}
              exit={exit}
              transition={{
                ...transition,
                delay: getStaggerDelay(charIndex, splitText.length, staggerDuration, staggerFrom),
              }}
              className={cn('inline-block', elementLevelClassName)}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </span>
  );
});

RotatingText.displayName = 'RotatingText';

function getStaggerDelay(index: number, total: number, duration: number, from: RotatingTextProps['staggerFrom']) {
  if (from === 'first') return index * duration;
  if (from === 'last') return (total - 1 - index) * duration;
  if (from === 'center') {
    const center = (total - 1) / 2;
    return Math.abs(index - center) * duration;
  }
  if (from === 'random') return Math.random() * total * duration;
  if (typeof from === 'number') return Math.abs(index - from) * duration;
  return index * duration;
}

export { RotatingText };
