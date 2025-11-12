// ==========================================
// Main JavaScript for 焼き鳥おでん坊っちゃん
// エフェクト削除版（安定版）
// ==========================================
// ==========================================
// 1. Loading Screen Management - 新アニメーション
// ==========================================
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const body = document.body;
    const fixedCtaButton = document.querySelector('.fixed-cta-button');
    const catchphrase1 = document.querySelector('.catchphrase-1');
    const catchphrase2 = document.querySelector('.catchphrase-2');
    const finalLogo = document.querySelector('.final-logo');
    
    console.log('Page loaded, starting new loading animation');
    
    // タイムライン
    // 0秒：暖簾が上に巻き上がる
    setTimeout(function() {
        if (loadingScreen) {
            loadingScreen.classList.add('curtain-open');
            console.log('Curtain rolling up');
        }
    }, 100);
    
    // 1.5秒：「今日も安心して美味い」表示
    setTimeout(function() {
        if (catchphrase1) {
            catchphrase1.classList.add('show');
            console.log('Catchphrase 1 shown');
        }
    }, 1500);
    
    // 3秒：「今日も安心して美味い」フェードアウト
    setTimeout(function() {
        if (catchphrase1) {
            catchphrase1.classList.remove('show');
            catchphrase1.classList.add('hide');
            console.log('Catchphrase 1 hidden');
        }
    }, 3000);
    
    // 3.5秒：「縁起のいい一杯を」表示
    setTimeout(function() {
        if (catchphrase2) {
            catchphrase2.classList.add('show');
            console.log('Catchphrase 2 shown');
        }
    }, 3500);
    
// 5秒：「縁起のいい一杯を」フェードアウト
setTimeout(function() {
    if (catchphrase2) {
        catchphrase2.classList.remove('show');
        catchphrase2.classList.add('hide');
        console.log('Catchphrase 2 hidden');
    }
}, 5000);

// 5.3秒：キャッチコピーコンテナを完全に非表示
setTimeout(function() {
    const catchphraseContainer = document.querySelector('.catchphrase-container');
    if (catchphraseContainer) {
        catchphraseContainer.style.display = 'none';
        console.log('Catchphrase container hidden');
    }
}, 5300);

// 5.5秒：ロゴ表示
setTimeout(function() {
    const finalLogo = document.querySelector('.final-logo');
    if (finalLogo) {
        finalLogo.classList.add('show');
        finalLogo.style.zIndex = '100000';
        console.log('Logo shown');
    }
}, 5500);


    // 7秒：ローディング画面全体をフェードアウト
    setTimeout(function() {
        if (loadingScreen) {
            loadingScreen.classList.add('loaded');
            console.log('Loading screen fading out');
            
            // 1秒後に完全に非表示
            setTimeout(function() {
                loadingScreen.style.display = 'none';
                console.log('Loading screen removed from view');
            }, 1000);
        }
        
        // スクロール位置を最上部にリセット
        window.scrollTo(0, 0);
        
        // bodyのスクロールを有効化
        body.style.overflowY = 'auto';
        body.style.overflowX = 'hidden';
        
        console.log('Body scroll enabled');
        
        // 固定CTAボタンを表示
        setTimeout(function() {
            if (fixedCtaButton) {
                fixedCtaButton.classList.add('visible');
                console.log('CTA button visible');
            }
        }, 800);
    }, 7000);
    
    // パフォーマンス計測
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`%cPage Load Time: ${pageLoadTime}ms`, 'color: #4CAF50; font-weight: bold;');
    }
});

// ==========================================
// 2. DOM Content Loaded - Main Functionality
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('DOM Content Loaded');
    
    // ==========================================
    // 2-1. Intersection Observer (Fade-in Animation)
    // ==========================================
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    // ==========================================
    // 2-2. パララックス効果
    // ==========================================
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    function handleParallax() {
        parallaxSections.forEach(section => {
            const scrolled = window.pageYOffset;
            const parallaxBg = section.querySelector('.parallax-bg');
            
            if (parallaxBg) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                // セクションが画面内にある場合のみパララックス適用
                if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
                    const yPos = (scrolled - sectionTop) * 0.5;
                    parallaxBg.style.transform = `translateY(${yPos}px)`;
                }
            }
        });
    }

    // スクロール時にパララックス効果を適用（スロットル処理）
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    // 初期実行
    handleParallax();

    // ==========================================
    // 2-3. カルーセル機能
    // ==========================================
    const track = document.querySelector('.carousel-track');
    
    if (track) {
        const items = Array.from(track.children);
        const prevButton = document.querySelector('.prev-btn');
        const nextButton = document.querySelector('.next-btn');
        let currentSlide = 0;
        let itemsPerView = 3;

        // 画面幅に応じて表示アイテム数を更新
        const updateItemsPerView = () => {
            if (window.innerWidth <= 768) {
                itemsPerView = 1;
            } else if (window.innerWidth <= 1024) {
                itemsPerView = 2;
            } else {
                itemsPerView = 3;
            }
        };

        // カルーセルの位置を更新
        const updateCarousel = () => {
            updateItemsPerView();
            if (items.length === 0) return;
            
            const itemWidth = items[0].offsetWidth + 20; // gap込みの幅
            const moveDistance = currentSlide * itemWidth;
            track.style.transform = `translateX(-${moveDistance}px)`;
        };

        // 前へボタン（ループ対応）
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                const maxSlide = items.length - itemsPerView;
                if (currentSlide === 0) {
                    currentSlide = maxSlide;
                } else {
                    currentSlide--;
                }
                updateCarousel();
            });
        }

        // 次へボタン（ループ対応）
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                const maxSlide = items.length - itemsPerView;
                if (currentSlide >= maxSlide) {
                    currentSlide = 0;
                } else {
                    currentSlide++;
                }
                updateCarousel();
            });
        }

        // リサイズ時の処理
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                currentSlide = 0;
                updateCarousel();
            }, 250);
        });

        // 初期化
        updateCarousel();
    }

    // ==========================================
    // 2-4. スムーズスクロール
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // #のみ、または空のhrefの場合はデフォルト動作
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerOffset = 60; // ヘッダーの高さ分オフセット
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==========================================
    // 2-5. ヘッダースクロールエフェクト
    // ==========================================
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // スクロールが50px以上の場合のみ処理
            if (scrollTop > 50) {
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // 下スクロール時は影を濃くする
                    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
                } else {
                    // 上スクロール時は通常の影
                    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
                }
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            }
            
            lastScrollTop = scrollTop;
        }, 10);
    });

    // ==========================================
    // 2-6. 画像遅延読み込みフォールバック
    // ==========================================
    if ('loading' in HTMLImageElement.prototype) {
        // ネイティブのlazy-loadingをサポート
        console.log('Native lazy-loading supported');
    } else {
        // IntersectionObserverを使った代替実装
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // 画像を読み込み
                    img.removeAttribute('loading');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ==========================================
    // 2-7. 3Dカードエフェクトの強化
    // ==========================================
    const card3DElements = document.querySelectorAll('.card-3d');
    
    card3DElements.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transition = 'transform 0.1s ease';
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `
                translateY(-10px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale(1.02)
            `;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.4s ease';
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // ==========================================
    // 2-8. パフォーマンス最適化
    // ==========================================
    // Passive Event Listenersでスクロールパフォーマンスを改善
    const passiveSupported = (() => {
        let passive = false;
        try {
            const options = {
                get passive() {
                    passive = true;
                    return false;
                }
            };
            window.addEventListener('test', null, options);
            window.removeEventListener('test', null, options);
        } catch (err) {
            passive = false;
        }
        return passive;
    })();

    // タッチイベントにpassiveオプションを使用
    if (passiveSupported) {
        document.addEventListener('touchstart', () => {}, { passive: true });
        document.addEventListener('touchmove', () => {}, { passive: true });
    }

    // ==========================================
    // 2-9. 提灯の揺れをスクロールに連動
    // ==========================================
    const lanterns = document.querySelectorAll('.lantern');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        lanterns.forEach((lantern, index) => {
            const speed = 0.1 + (index * 0.05);
            const rotation = Math.sin(scrolled * speed) * 5;
            lantern.style.transform = `rotate(${rotation}deg)`;
        });
    }, { passive: true });

    // ==========================================
    // 2-10. カウントアップアニメーション
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2秒かけてカウントアップ
        const increment = target / (duration / 16); // 60fps想定
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    };

    // Intersection Observerでスクロール時にカウントアップ開始
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach((stat, index) => {
                    setTimeout(() => {
                        animateCounter(stat);
                    }, index * 200); // 各数字を0.2秒ずつずらして開始
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // ==========================================
    // 2-11. Googleマップのレスポンシブ対応
    // ==========================================
    const adjustMapHeight = () => {
        const maps = document.querySelectorAll('.store-map iframe');
        maps.forEach(map => {
            if (window.innerWidth <= 480) {
                map.style.height = '150px';
            } else if (window.innerWidth <= 768) {
                map.style.height = '180px';
            } else {
                map.style.height = '200px';
            }
        });
    };

    // 初期実行
    adjustMapHeight();

    // ウィンドウリサイズ時に調整
    window.addEventListener('resize', debounce(adjustMapHeight, 250));

    // ==========================================
    // 2-12. コンソールウェルカムメッセージ
    // ==========================================
    console.log('%c焼き鳥 おでん 坊っちゃん', 'font-size: 24px; color: #C31A21; font-weight: bold;');
    console.log('%cWebsite loaded successfully! 🍢🎉', 'font-size: 14px; color: #333;');
    console.log('%c和風エフェクト満載のサイトをお楽しみください！', 'font-size: 12px; color: #666;');
});

// ==========================================
// 3. エラーハンドリング
// ==========================================
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// ==========================================
// 4. ユーティリティ関数
// ==========================================

/**
 * デバウンス関数 - イベントの発火頻度を制限
 * @param {Function} func - 実行する関数
 * @param {number} wait - 待機時間（ミリ秒）
 * @returns {Function}
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * スロットル関数 - イベントの実行頻度を制限
 * @param {Function} func - 実行する関数
 * @param {number} limit - 制限時間（ミリ秒）
 * @returns {Function}
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * ビューポート内にあるかチェック
 * @param {HTMLElement} element - チェックする要素
 * @returns {boolean}
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}