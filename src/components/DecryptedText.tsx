'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface DecryptedTextProps extends HTMLMotionProps<'span'> {
  text: string;
  speed?: number;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  parentClassName?: string;
  animateOn?: 'view' | 'hover' | 'both';
  totalDuration?: number;
}

export default function DecryptedText({
  text,
  speed = 80,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+0123456789',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  totalDuration = 3000,
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const scrambleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const revealTimeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const availableChars = characters.split('');

  const scrambleUnrevealed = (revealed: Set<number>) => {
    return text
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' ';
        if (revealed.has(i)) return text[i];
        return availableChars[Math.floor(Math.random() * availableChars.length)];
      })
      .join('');
  };

  const startAnimation = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setRevealedIndices(new Set());

    scrambleIntervalRef.current = setInterval(() => {
      setRevealedIndices(prev => {
        setDisplayText(scrambleUnrevealed(prev));
        return prev;
      });
    }, speed);

    const textLength = text.length;
    const delayPerChar = totalDuration / textLength;

    for (let i = 0; i < textLength; i++) {
      const timeout = setTimeout(() => {
        setRevealedIndices(prev => {
          const newSet = new Set(prev);
          newSet.add(i);

          if (newSet.size === textLength) {
            if (scrambleIntervalRef.current) {
              clearInterval(scrambleIntervalRef.current);
            }
            setDisplayText(text);
            setIsAnimating(false);
          }

          return newSet;
        });
      }, delayPerChar * (i + 1));

      revealTimeoutsRef.current.push(timeout);
    }
  };

  useEffect(() => {
    const currentScrambleInterval = scrambleIntervalRef.current;
    const currentRevealTimeouts = revealTimeoutsRef.current;

    return () => {
      if (currentScrambleInterval) {
        clearInterval(currentScrambleInterval);
      }
      currentRevealTimeouts.forEach(t => clearTimeout(t));
    };
  }, []);

  useEffect(() => {
    if (animateOn !== 'view' && animateOn !== 'both') return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          startAnimation();
          setHasAnimated(true);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animateOn, hasAnimated]);

  const hoverProps =
    animateOn === 'hover' || animateOn === 'both'
      ? {
        onMouseEnter: () => {
          if (!isAnimating) {
            setHasAnimated(false);
            startAnimation();
          }
        }
      }
      : {};

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      {...hoverProps}
      {...props}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    >
      <span className="sr-only">{displayText}</span>

      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const isRevealed = revealedIndices.has(index) || !isAnimating;

          return (
            <span key={index} className={isRevealed ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}
