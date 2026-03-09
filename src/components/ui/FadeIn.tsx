'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'none';
}

export function FadeIn({ children, delay = 0, className = '', direction = 'up' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const translateClass = direction === 'up' ? 'translate-y-5' : 'translate-y-0';

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? `opacity-100 translate-y-0` : `opacity-0 ${translateClass}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
