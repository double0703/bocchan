// ==========================================
// 1. Loading Screen Management - 1文字ずつフェードイン版（完全版）
// ==========================================
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const body = document.body;
    const fixedCtaButton = document.querySelector('.fixed-cta-button');
    const catchphrase1 = document.querySelector('.catchphrase-1');
    const catchphrase2 = document.querySelector('.catchphrase-2');
    const finalLogo = document.querySelector('.final-logo');
    
    console.log('Page loaded, starting new loading animation');
    
    // テキストを1文字ずつspanで囲む（フォント明示版）
    function wrapChars(element, text) {
        const h2 = element.querySelector('h2');
        h2.innerHTML = '';
        
        const chars = Array.from(text);
        
        console.log('=== wrapChars デバッグ ===');
        console.log('テキスト:', text);
        console.log('文字数:', chars.length);
        
        chars.forEach((char, index) => {
            // 改行文字の場合は<br>を挿入
            if (char === '\n') {
                const br = document.createElement('br');
                h2.appendChild(br);
                console.log(`文字 ${index}: "改行"`);
            } else {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.opacity = '0';
                span.style.display = 'inline-block';
                span.style.transform = 'translateY(20px)';
                
                // ★フォールバックを優先
                span.style.fontFamily = "'TamanegiKaisho', 'Yuji Boku', serif";
                span.style.fontWeight = 'normal';
                
                h2.appendChild(span);
                
                console.log(`文字 ${index}: "${char}"`);
            }
        });
        
        console.log('生成されたspan数:', chars.length);
        console.log('========================');
    }

    // 1文字ずつフェードイン
    function fadeInChars(element, delay = 50, callback) {
        element.style.opacity = '1';
        element.style.visibility = 'visible';
        
        const spans = element.querySelectorAll('h2 span');
        let completed = 0;
        
        spans.forEach((span, index) => {
            setTimeout(() => {
                span.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
                
                completed++;
                if (completed === spans.length && callback) {
                    callback();
                }
            }, index * delay);
        });
    }
    
    // 1文字ずつフェードアウト（下方向）
    function fadeOutChars(element, delay = 40, callback) {
        const spans = element.querySelectorAll('h2 span');
        let completed = 0;
        
        spans.forEach((span, index) => {
            setTimeout(() => {
                span.style.transition = 'opacity 0.3s ease, transform 0.5s ease';
                span.style.opacity = '0';
                span.style.transform = 'translateY(50px)';
                
                completed++;
                if (completed === spans.length) {
                    element.style.opacity = '0';
                    element.style.visibility = 'hidden';
                    if (callback) {
                        callback();
                    }
                }
            }, index * delay);
        });
    }
    
    // タイムライン
    // 0秒：暖簾が上に巻き上がる
    setTimeout(function() {
        if (loadingScreen) {
            loadingScreen.classList.add('curtain-open');
            console.log('Curtain rolling up');
        }
    }, 100);
    
    // 1.4秒：「今日も安心して美味い」準備
    setTimeout(function() {
        if (catchphrase1) {
            wrapChars(catchphrase1, '焼き鳥99円！\nおでん199円！');
        }
    }, 1400);
    
    // 1.5秒：「焼き鳥99円！おでん199円！」フェードイン開始
    setTimeout(function() {
        if (catchphrase1) {
            fadeInChars(catchphrase1, 60);
            console.log('Catchphrase 1 fading in');
        }
    }, 1500);
    
    // 3.5秒：「焼き鳥99円！おでん199円！」フェードアウト
    setTimeout(function() {
        if (catchphrase1) {
            fadeOutChars(catchphrase1, 50);
            console.log('Catchphrase 1 fading out');
        }
    }, 3500);
    
    // 4.4秒：「枝豆食べ放題！安心の均一価格！」準備
    setTimeout(function() {
        if (catchphrase2) {
            wrapChars(catchphrase2, '枝豆食べ放題！\n安心の均一価格！');
        }
    }, 4400);

    // 4.5秒：「枝豆食べ放題！安心の均一価格！」フェードイン開始
    setTimeout(function() {
        if (catchphrase2) {
            fadeInChars(catchphrase2, 70);
            console.log('Catchphrase 2 fading in');
        }
    }, 4500);

    // 6.2秒：「特別で最高な時間を！」フェードアウト
    setTimeout(function() {
        if (catchphrase2) {
            fadeOutChars(catchphrase2, 60);
            console.log('Catchphrase 2 fading out');
        }
    }, 6200);
    
    // 7秒：キャッチコピーコンテナを完全に非表示
    setTimeout(function() {
        const catchphraseContainer = document.querySelector('.catchphrase-container');
        if (catchphraseContainer) {
            catchphraseContainer.style.display = 'none';
            console.log('Catchphrase container hidden');
        }
    }, 7000);
    
    // 7.2秒：ロゴ表示
    setTimeout(function() {
        if (finalLogo) {
            finalLogo.classList.add('show');
            finalLogo.style.zIndex = '100000';
            console.log('Logo shown');
        }
    }, 7200);
    
    // 8.5秒：ローディング画面全体をフェードアウト
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
    }, 8500);
    
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
    // 2-3. カルーセル機能（横スクロール）
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
    // 2-7. シンプルなカードホバーエフェクト
    // ==========================================
    // CSSのみでホバー効果を実装（グワングワンしない）

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
// 3. カルーセルスライダー（自動切り替え＋スワイプ対応）
// ==========================================
let currentCarouselIndex = 0;
const totalSlides = 3;
let autoSlideInterval;
let touchStartX = 0;
let touchEndX = 0;

function updateCarouselDisplay() {
    const slides = document.querySelectorAll('.carousel-slide-new');
    const dots = document.querySelectorAll('.carousel-dot-new');
    
    if (!slides.length || !dots.length) return;
    
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev', 'next', 'hidden');
        
        if (index === currentCarouselIndex) {
            slide.classList.add('active');
        } else if (index === (currentCarouselIndex - 1 + totalSlides) % totalSlides) {
            slide.classList.add('prev');
        } else if (index === (currentCarouselIndex + 1) % totalSlides) {
            slide.classList.add('next');
        } else {
            slide.classList.add('hidden');
        }
    });
    
    dots.forEach((dot, index) => {
        if (index === currentCarouselIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function goToSlide(index) {
    currentCarouselIndex = index;
    updateCarouselDisplay();
    resetAutoSlide();
}

function nextSlide() {
    currentCarouselIndex = (currentCarouselIndex + 1) % totalSlides;
    updateCarouselDisplay();
}

function prevSlide() {
    currentCarouselIndex = (currentCarouselIndex - 1 + totalSlides) % totalSlides;
    updateCarouselDisplay();
}

// 自動スライド
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000); // 5秒ごと
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// タッチスワイプ対応
function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // 左スワイプ → 次へ
            nextSlide();
        } else {
            // 右スワイプ → 前へ
            prevSlide();
        }
    }
}

// カルーセル初期化
document.addEventListener('DOMContentLoaded', function() {
    updateCarouselDisplay();
    
    // ドットクリックイベント
    const dots = document.querySelectorAll('.carousel-dot-new');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // スライドクリックイベント
    const slides = document.querySelectorAll('.carousel-slide-new');
    slides.forEach((slide, index) => {
        slide.addEventListener('click', (e) => {
            if (slide.classList.contains('active')) {
                return;
            }
            e.preventDefault();
            goToSlide(index);
        });
    });
    
    // タッチイベント
    const carouselWrapper = document.querySelector('.carousel-wrapper-new');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
        carouselWrapper.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    
    // 自動スライド開始
    startAutoSlide();
    
    // マウスオーバーで自動スライド停止
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', stopAutoSlide);
        carouselWrapper.addEventListener('mouseleave', startAutoSlide);
    }
});

// ==========================================
// 4. ハンバーガーメニュー
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu');
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
    
    if (hamburgerMenu && mobileMenuOverlay) {
        // ハンバーガーメニューのトグル
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            
            // スクロール制御
            if (mobileMenuOverlay.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // メニュー項目クリック時にメニューを閉じる
        mobileMenuItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // オーバーレイクリックでメニューを閉じる
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                hamburgerMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// ==========================================
// 5. スクロールアニメーション（Intersection Observer）
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target); // 一度表示したら監視解除
            }
        });
    }, observerOptions);
    
    scrollRevealElements.forEach(element => {
        revealObserver.observe(element);
    });
});

// ==========================================
// 6. エラーハンドリング
// ==========================================
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// ==========================================
// 7. ユーティリティ関数
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