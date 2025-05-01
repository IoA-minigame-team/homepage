document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('header');
    const navTrigger = document.querySelector('.nav-trigger');
    const scrollProgress = document.querySelector('.scroll-progress');
    
    // 前回のスクロール位置を記録
    let lastScrollTop = 0;
    
    // スクロール関連の変数
    let isScrolling = false;
    let scrollTimeout;
    
    // ハンバーガーメニューのクリックイベント
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // メニュー項目がクリックされたときにメニューを閉じる
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            // ナビゲーションを一時的に表示
            showNavigationTemporarily();
        });
    });

    // 画面外クリックでメニューを閉じる
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // ナビゲーショントリガーボタンのクリックイベント
    navTrigger.addEventListener('click', () => {
        toggleNavigation();
    });
    
    // スクロールイベントを監視
    window.addEventListener('scroll', () => {
        // スクロール進捗バーの更新
        updateScrollProgress();
        
        // スクロール方向に基づいてナビゲーションの表示/非表示を制御
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // スクロールしていることをマーク
        isScrolling = true;
        clearTimeout(scrollTimeout);
        
        // スクロール停止の検出
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 150);
        
        // スクロール方向の検出（上or下）
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 下にスクロール - ナビゲーションを隠す
            if (!header.classList.contains('nav-hidden')) {
                header.classList.add('nav-hidden');
                header.classList.remove('nav-visible');
            }
        } else if (scrollTop < lastScrollTop) {
            // 上にスクロール - ナビゲーションを表示
            if (header.classList.contains('nav-hidden')) {
                header.classList.remove('nav-hidden');
                header.classList.add('nav-visible');
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // スクロール進捗バーを更新する関数
    function updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + "%";
    }
    
    // ナビゲーションの表示/非表示を切り替える関数
    function toggleNavigation() {
        if (header.classList.contains('nav-hidden')) {
            header.classList.remove('nav-hidden');
            header.classList.add('nav-visible');
        } else {
            header.classList.add('nav-hidden');
            header.classList.remove('nav-visible');
        }
    }
    
    // ナビゲーションを一時的に表示する関数
    function showNavigationTemporarily() {
        header.classList.remove('nav-hidden');
        header.classList.add('nav-visible');
        
        // 3秒後に自動的に非表示
        setTimeout(() => {
            if (!isScrolling) {
                header.classList.add('nav-hidden');
                header.classList.remove('nav-visible');
            }
        }, 3000);
    }
    
    // ゲームカードのホバーエフェクト強化
    const gameCards = document.querySelectorAll('.game');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // カード内のタイトルにクラスを追加
            const title = card.querySelector('h3');
            if (title) {
                title.classList.add('title-glow');
            }
            // ホバー時の効果音（オプション）
            playHoverSound();
        });

        card.addEventListener('mouseleave', () => {
            const title = card.querySelector('h3');
            if (title) {
                title.classList.remove('title-glow');
            }
        });
    });

    // ページのアクセント要素を自動的にアニメーション
    animateAccentElements();

    // スクロールに応じてセクションをフェードイン
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // セクションが表示されたときにナビゲーションを一時的に表示
                showNavigationTemporarily();
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
    
    // 効果音再生関数（サイレントデフォルト）
    function playHoverSound() {
        // 効果音を再生したい場合はここに実装
        // 例: const sound = new Audio('path/to/hover-sound.mp3'); sound.volume = 0.2; sound.play();
    }
    
    // アクセント要素のアニメーション
    function animateAccentElements() {
        // ゲームタイトルのパルスエフェクト
        const gameTitle = document.querySelector('#home h2');
        if (gameTitle) {
            setInterval(() => {
                gameTitle.classList.toggle('pulse');
            }, 2000);
        }
        
        // その他のアクセント要素にもアニメーションを追加可能
    }

    // SNSシェア機能
    initShareFunctionality();
});

// SNSシェア機能の初期化
function initShareFunctionality() {
    const shareTextarea = document.getElementById('share-text');
    const charCount = document.getElementById('char-count');
    const gameSelect = document.getElementById('game-select');
    const twitterBtn = document.getElementById('twitter-share');
    const facebookBtn = document.getElementById('facebook-share');
    const lineBtn = document.getElementById('line-share');
    const redditBtn = document.getElementById('reddit-share');

    // 要素が存在する場合のみ処理を実行
    if (!shareTextarea || !charCount) return;

    // テキストエリアの入力イベント
    shareTextarea.addEventListener('input', () => {
        const textLength = shareTextarea.value.length;
        charCount.textContent = textLength;
        
        // 残り文字数に応じてスタイル変更
        if (textLength > 240) {
            charCount.style.color = '#ff3d00';
        } else if (textLength > 200) {
            charCount.style.color = '#ffa000';
        } else {
            charCount.style.color = '#aaa';
        }
    });

    // SNSボタンのクリックイベント
    if (twitterBtn) {
        twitterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            shareOnTwitter();
        });
    }

    if (facebookBtn) {
        facebookBtn.addEventListener('click', (e) => {
            e.preventDefault();
            shareOnFacebook();
        });
    }

    if (lineBtn) {
        lineBtn.addEventListener('click', (e) => {
            e.preventDefault();
            shareOnLine();
        });
    }

    if (redditBtn) {
        redditBtn.addEventListener('click', (e) => {
            e.preventDefault();
            shareOnReddit();
        });
    }

    // Twitterシェア
    function shareOnTwitter() {
        const text = shareTextarea.value;
        const game = gameSelect.value;
        const websiteUrl = window.location.origin + window.location.pathname;
        const shareText = `${text} #${game.replace(/\s+/g, '')} #IoAミニゲーム`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(websiteUrl)}`;
        window.open(twitterUrl, '_blank', 'width=600,height=400');
    }

    // Facebookシェア
    function shareOnFacebook() {
        const websiteUrl = window.location.origin + window.location.pathname;
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}`;
        window.open(facebookUrl, '_blank', 'width=600,height=400');
    }

    // LINEシェア
    function shareOnLine() {
        const text = shareTextarea.value;
        const game = gameSelect.value;
        const websiteUrl = window.location.origin + window.location.pathname;
        const shareText = `${text} #${game.replace(/\s+/g, '')}`;
        const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(websiteUrl)}&text=${encodeURIComponent(shareText)}`;
        window.open(lineUrl, '_blank', 'width=600,height=500');
    }

    // Redditシェア
    function shareOnReddit() {
        const text = shareTextarea.value;
        const game = gameSelect.value;
        const websiteUrl = window.location.origin + window.location.pathname;
        const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(websiteUrl)}&title=${encodeURIComponent(`${game} - ${text}`)}`;
        window.open(redditUrl, '_blank', 'width=600,height=500');
    }

    // シェアボタンのホバーエフェクト
    const snsButtons = document.querySelectorAll('.sns-button');
    snsButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('hover-active');
            // ホバー時の効果音（オプション）
            playButtonHoverSound();
        });

        button.addEventListener('mouseleave', () => {
            button.classList.remove('hover-active');
        });
    });

    // ボタンホバー時の効果音再生関数
    function playButtonHoverSound() {
        // 効果音を再生したい場合はここに実装
        // 例: const sound = new Audio('path/to/button-hover.mp3'); sound.volume = 0.1; sound.play();
    }

    // アニメーション効果
    const shareForm = document.querySelector('.share-form');
    if (shareForm) {
        shareForm.classList.add('fade-in-section');
        setTimeout(() => {
            shareForm.classList.add('visible');
        }, 500);
    }
}

// ページが完全に読み込まれたときのスタイル調整
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // 初期状態でナビゲーションを一時的に表示
    setTimeout(() => {
        const header = document.querySelector('header');
        header.classList.remove('nav-hidden');
        header.classList.add('nav-visible');
        
        // 3秒後に非表示
        setTimeout(() => {
            header.classList.add('nav-hidden');
            header.classList.remove('nav-visible');
        }, 3000);
    }, 1000);
});