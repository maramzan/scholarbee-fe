'use client';
import { useEffect, useState, memo } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/system';
import { AnimatedBoxProps, LogoSliderProps } from '@/types/sliderTypes';

const SliderContainer = styled(Box)<AnimatedBoxProps>(({ $animated }) => ({
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  ...($animated && {
    overflow: 'hidden',
    WebkitMask:
      'linear-gradient(90deg, transparent, white 20%, white 80%, transparent)',
    mask: 'linear-gradient(90deg, transparent, white 20%, white 80%, transparent)'
  })
}));

const SlideTrack = styled(Box)<AnimatedBoxProps>(
  ({ $animated, $speed, $direction }) => ({
    display: 'flex',
    gap: '2rem',
    padding: '1rem',
    transform: 'translateZ(0)',
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    ...($animated && {
      width: 'max-content',
      flexWrap: 'nowrap',
      animation: `scroll ${$speed === 'fast' ? '20s' : '40s'} ${
        $direction === 'right' ? 'reverse' : 'forwards'
      } linear infinite`
    }),
    '@keyframes scroll': {
      to: {
        transform: 'translate(calc(-50% - 1rem))'
      }
    },
    '&:hover': {
      animationPlayState: 'paused'
    }
  })
);

const SlideItem = styled(Box)({
  flex: '0 0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem'
});

const LogoSlider = memo(
  ({
    partners,
    speed = 'slow',
    direction = 'left',
    className
  }: LogoSliderProps) => {
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
      const shouldAnimate = !window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (shouldAnimate) {
        setIsAnimated(true);
      }
    }, []);

    return (
      <SliderContainer
        $animated={isAnimated}
        $direction={direction}
        $speed={speed}
        className={className}
        role="region"
        aria-label="Partner logos"
      >
        <SlideTrack
          $animated={isAnimated}
          $direction={direction}
          $speed={speed}
        >
          {partners.map((partner, index) => (
            <SlideItem key={`original-${index}`}>
              <Image
                src={partner.src}
                alt={partner.alt || `Partner ${index + 1}`}
                width={220}
                height={120}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain'
                }}
                loading={index < 2 ? 'eager' : 'lazy'}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={75}
              />
            </SlideItem>
          ))}
          {partners.map((partner, index) => (
            <SlideItem key={`duplicate-${index}`} aria-hidden="true">
              <Image
                src={partner.src}
                alt={partner.alt || `Partner ${index + 1}`}
                width={220}
                height={120}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain'
                }}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={75}
              />
            </SlideItem>
          ))}
        </SlideTrack>
      </SliderContainer>
    );
  }
);

LogoSlider.displayName = 'LogoSlider';

export default LogoSlider;
