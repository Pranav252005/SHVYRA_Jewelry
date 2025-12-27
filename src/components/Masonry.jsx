import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

import './Masonry.css';

const useMedia = (queries, values, defaultValue) => {
    const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;

    const [value, setValue] = useState(get);

    useEffect(() => {
        const handler = () => setValue(get);
        queries.forEach(q => matchMedia(q).addEventListener('change', handler));
        return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queries]);

    return value;
};

const useMeasure = () => {
    const ref = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (!ref.current) return;
        const ro = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setSize({ width, height });
        });
        ro.observe(ref.current);
        return () => ro.disconnect();
    }, []);

    return [ref, size];
};

const preloadImages = async urls => {
    await Promise.all(
        urls.map(
            src =>
                new Promise(resolve => {
                    const img = new Image();
                    img.src = src;
                    img.onload = img.onerror = () => resolve();
                })
        )
    );
};

const Masonry = ({
    items,
    ease = 'power3.out',
    duration = 0.6,
    stagger = 0.05,
    animateFrom = 'bottom',
    scaleOnHover = true,
    hoverScale = 0.95,
    blurToFocus = true,
    colorShiftOnHover = false
}) => {
    const columns = useMedia(
        ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
        [5, 4, 3, 2],
        1
    );

    const [containerRef, { width }] = useMeasure();
    const [imagesReady, setImagesReady] = useState(false);

    const getInitialPosition = item => {
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (!containerRect) return { x: item.x, y: item.y };

        let direction = animateFrom;

        if (animateFrom === 'random') {
            const directions = ['top', 'bottom', 'left', 'right'];
            direction = directions[Math.floor(Math.random() * directions.length)];
        }

        switch (direction) {
            case 'top':
                return { x: item.x, y: -200 };
            case 'bottom':
                return { x: item.x, y: window.innerHeight + 200 };
            case 'left':
                return { x: -200, y: item.y };
            case 'right':
                return { x: window.innerWidth + 200, y: item.y };
            case 'center':
                return {
                    x: containerRect.width / 2 - item.w / 2,
                    y: containerRect.height / 2 - item.h / 2
                };
            default:
                return { x: item.x, y: item.y + 100 };
        }
    };

    useEffect(() => {
        const imgUrls = items.filter(i => i.img).map(i => i.img);
        if (imgUrls.length > 0) {
            preloadImages(imgUrls).then(() => setImagesReady(true));
        } else {
            setImagesReady(true);
        }
    }, [items]);

    const grid = useMemo(() => {
        if (!width) return [];

        const colHeights = new Array(columns).fill(0);
        const columnWidth = width / columns;

        // Responsive height scaling based on column count
        const heightScale = columns <= 2 ? 0.4 : columns <= 3 ? 0.45 : 0.5;

        return items.map(child => {
            const col = colHeights.indexOf(Math.min(...colHeights));
            const x = columnWidth * col;
            const height = child.height * heightScale;
            const y = colHeights[col];

            colHeights[col] += height;

            return { ...child, x, y, w: columnWidth, h: height };
        });
    }, [columns, items, width]);

    const hasMounted = useRef(false);

    useLayoutEffect(() => {
        if (!imagesReady) return;

        grid.forEach((item, index) => {
            const selector = `[data-key="${item.id}"]`;
            const animationProps = {
                x: item.x,
                y: item.y,
                width: item.w,
                height: item.h
            };

            if (!hasMounted.current) {
                const initialPos = getInitialPosition(item, index);
                const initialState = {
                    opacity: 0,
                    x: initialPos.x,
                    y: initialPos.y,
                    width: item.w,
                    height: item.h,
                    ...(blurToFocus && { filter: 'blur(10px)' })
                };

                gsap.fromTo(selector, initialState, {
                    opacity: 1,
                    ...animationProps,
                    ...(blurToFocus && { filter: 'blur(0px)' }),
                    duration: 0.8,
                    ease: 'power3.out',
                    delay: index * stagger
                });
            } else {
                gsap.to(selector, {
                    ...animationProps,
                    duration: duration,
                    ease: ease,
                    overwrite: 'auto'
                });
            }
        });

        hasMounted.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

    const handleMouseEnter = (e, item) => {
        const element = e.currentTarget;
        const selector = `[data-key="${item.id}"]`;

        if (scaleOnHover) {
            gsap.to(selector, {
                scale: hoverScale,
                duration: 0.3,
                ease: 'power2.out'
            });
        }

        if (colorShiftOnHover) {
            const overlay = element.querySelector('.color-overlay');
            if (overlay) {
                gsap.to(overlay, {
                    opacity: 0.3,
                    duration: 0.3
                });
            }
        }
    };

    const handleMouseLeave = (e, item) => {
        const element = e.currentTarget;
        const selector = `[data-key="${item.id}"]`;

        if (scaleOnHover) {
            gsap.to(selector, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        }

        if (colorShiftOnHover) {
            const overlay = element.querySelector('.color-overlay');
            if (overlay) {
                gsap.to(overlay, {
                    opacity: 0,
                    duration: 0.3
                });
            }
        }
    };

    return (
        <div ref={containerRef} className="masonry-list">
            {grid.map(item => {
                return (
                    <div
                        key={item.id}
                        data-key={item.id}
                        className="masonry-item-wrapper"
                        onClick={() => window.open(item.url, '_blank', 'noopener')}
                        onMouseEnter={e => handleMouseEnter(e, item)}
                        onMouseLeave={e => handleMouseLeave(e, item)}
                    >
                        <div
                            className="masonry-item-img"
                            style={{
                                backgroundImage: item.img ? `url(${item.img})` : 'none',
                                backgroundColor: item.img ? 'transparent' : '#E6B445'
                            }}
                        >
                            {/* Instagram Reel UI Overlay */}
                            {item.isReel && (
                                <>
                                    {/* Reels Icon - Top Right */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '12px',
                                            right: '12px',
                                            zIndex: 10,
                                        }}
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="white"
                                            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}
                                        >
                                            <path d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1z" />
                                            <path d="M9.5 7.5v9l7-4.5z" />
                                        </svg>
                                    </div>

                                    {/* Bottom Gradient Overlay */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            height: '50%',
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
                                            borderRadius: '0 0 10px 10px',
                                            pointerEvents: 'none',
                                        }}
                                    />

                                    {/* Views Count - Bottom Left */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: '12px',
                                            left: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            zIndex: 10,
                                        }}
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="white"
                                        >
                                            <path d="M9.5 7.5v9l7-4.5z" />
                                        </svg>
                                        <span
                                            style={{
                                                color: 'white',
                                                fontSize: '13px',
                                                fontWeight: '600',
                                                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                                            }}
                                        >
                                            {item.views}
                                        </span>
                                    </div>
                                </>
                            )}

                            {colorShiftOnHover && (
                                <div
                                    className="color-overlay"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(45deg, rgba(230,180,69,0.4), rgba(212,165,116,0.4))',
                                        opacity: 0,
                                        pointerEvents: 'none',
                                        borderRadius: '10px'
                                    }}
                                />
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Masonry;
