// --- 最終安定版 JavaScript コード (script.js) ---

// --- 1. グローバルなイベントリスナー (スクロール) ---
window.addEventListener('scroll', () => {
    // スクロール進捗バー機能
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    }
});


// --- 2. メイン機能の統合 (DOMContentLoaded: DOM構築完了後) ---
document.addEventListener('DOMContentLoaded', function() {
    
    // 変数定義
    const fixedCtaButton = document.querySelector('.fixed-cta-button');
    
    // 固定CTAボタンの初期状態設定
if (fixedCtaButton) {
        fixedCtaButton.classList.add('animate-init');
        fixedCtaButton.classList.add('animated');
    }
    // --- 2-1. Intersection Observer (フェードインアニメーション) ---
    const fadeInElements = document.querySelectorAll('.fade-in');
    const options = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    

    // --- 2-2. メニューカルーセル機能 (ループ対応版) ---
    const track = document.querySelector('.carousel-track');
    if (track) { 
        const items = Array.from(track.children);
        const prevButton = document.querySelector('.carousel-nav.prev-btn');
        const nextButton = document.querySelector('.carousel-nav.next-btn');
        let currentSlide = 0;
        let itemsPerView = 3; 

        const updateItemsPerView = () => {
            if (window.innerWidth <= 600) {
                itemsPerView = 1;
            } else if (window.innerWidth <= 900) {
                itemsPerView = 2;
            } else {
                itemsPerView = 3;
            }
        };

        const updateCarousel = () => {
            updateItemsPerView(); 
            if (items.length === 0) return;
            const itemWidth = items[0] ? items[0].offsetWidth : 0;
            const moveDistance = currentSlide * itemWidth;
            track.style.transform = `translateX(-${moveDistance}px)`;
        };

        // 前へボタン (ループ対応)
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

        // 次へボタン (ループ対応)
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
        window.addEventListener('resize', () => {
            currentSlide = 0; 
            updateCarousel();
        });

        updateCarousel(); 
    }


    // --- 4. トップへ戻るボタンのスムーズスクロール機能 ---
    const pageTop = document.getElementById('page-top');
    if (pageTop) {
        pageTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// --- New Village風 ローディング画面制御 (script.js) ---
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const body = document.body;
    
    if (loadingScreen) {
        // ページ全体のリソースが読み込まれた後に実行
        window.addEventListener('load', function() {
            
            // 1.5秒待機後、ローディング画面を消すクラスを付与
            setTimeout(function() {
                loadingScreen.classList.add('loaded');
                
                // bodyからローディング中のクラスを削除し、スクロールを許可
                body.classList.remove('loading');

            }, 1500); // 1500ミリ秒 (1.5秒) 後にフェードアウト開始
        });
    }
});