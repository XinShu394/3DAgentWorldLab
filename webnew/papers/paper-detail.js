/* ================================================
   论文详情页交互脚本
   功能：图片轮播、平滑滚动、响应式导航
   ================================================ */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 初始化轮播图
    initCarousel();
    
    // 初始化平滑滚动
    initSmoothScroll();
    
    // 初始化响应式功能
    initResponsive();
});

// ===================================
// 图片轮播功能
// ===================================
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    const items = carousel.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    
    if (totalItems === 0) return;
    
    let currentIndex = 0;
    
    // 创建指示器
    createIndicators(totalItems);
    
    // 获取导航按钮
    const leftBtn = document.querySelector('.carousel-navigation.left');
    const rightBtn = document.querySelector('.carousel-navigation.right');
    
    // 显示指定索引的图片
    function showImage(index) {
        // 移除当前激活状态
        items[currentIndex].classList.remove('is-active');
        updateIndicator(currentIndex, false);
        
        // 计算新索引（循环）
        currentIndex = (index + totalItems) % totalItems;
        
        // 添加新的激活状态
        items[currentIndex].classList.add('is-active');
        updateIndicator(currentIndex, true);
    }
    
    // 显示下一张图片
    function showNextImage() {
        showImage(currentIndex + 1);
    }
    
    // 显示上一张图片
    function showPreviousImage() {
        showImage(currentIndex - 1);
    }
    
    // 跳转到指定图片
    function goToImage(index) {
        showImage(index);
    }
    
    // 绑定导航按钮事件
    if (leftBtn) {
        leftBtn.addEventListener('click', showPreviousImage);
    }
    
    if (rightBtn) {
        rightBtn.addEventListener('click', showNextImage);
    }
    
    // 键盘导航支持
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            showPreviousImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });
    
    // 触摸滑动支持（移动端）
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // 向左滑动，显示下一张
                showNextImage();
            } else {
                // 向右滑动，显示上一张
                showPreviousImage();
            }
        }
    }
    
    // 自动播放（可选，默认关闭）
    const autoPlay = false;
    const autoPlayInterval = 5000; // 5秒
    
    if (autoPlay) {
        setInterval(showNextImage, autoPlayInterval);
    }
    
    // 创建轮播指示器
    function createIndicators(count) {
        const indicatorsContainer = document.querySelector('.carousel-indicators');
        if (!indicatorsContainer) return;
        
        for (let i = 0; i < count; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (i === 0) {
                indicator.classList.add('is-active');
            }
            indicator.setAttribute('data-index', i);
            indicator.addEventListener('click', () => goToImage(i));
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // 更新指示器状态
    function updateIndicator(index, isActive) {
        const indicators = document.querySelectorAll('.carousel-indicators .indicator');
        if (indicators[index]) {
            if (isActive) {
                indicators[index].classList.add('is-active');
            } else {
                indicators[index].classList.remove('is-active');
            }
        }
    }
}

// ===================================
// 平滑滚动功能
// ===================================
function initSmoothScroll() {
    // 为所有锚点链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // 忽略空锚点或只有#的链接
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// 响应式功能
// ===================================
function initResponsive() {
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // 图片懒加载（如果需要）
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ===================================
// 复制BibTeX功能
// ===================================
function initBibTeXCopy() {
    const bibtexSection = document.querySelector('#BibTeX');
    if (!bibtexSection) return;
    
    const bibtexCode = bibtexSection.querySelector('code');
    if (!bibtexCode) return;
    
    // 创建复制按钮
    const copyButton = document.createElement('button');
    copyButton.className = 'button is-small is-info';
    copyButton.innerHTML = '<span class="icon"><i class="fas fa-copy"></i></span><span>Copy</span>';
    copyButton.style.position = 'absolute';
    copyButton.style.top = '10px';
    copyButton.style.right = '10px';
    
    // 将按钮添加到BibTeX容器
    const bibtexContainer = bibtexCode.parentElement;
    bibtexContainer.style.position = 'relative';
    bibtexContainer.appendChild(copyButton);
    
    // 复制功能
    copyButton.addEventListener('click', async () => {
        const text = bibtexCode.textContent;
        
        try {
            await navigator.clipboard.writeText(text);
            copyButton.innerHTML = '<span class="icon"><i class="fas fa-check"></i></span><span>Copied!</span>';
            copyButton.classList.remove('is-info');
            copyButton.classList.add('is-success');
            
            setTimeout(() => {
                copyButton.innerHTML = '<span class="icon"><i class="fas fa-copy"></i></span><span>Copy</span>';
                copyButton.classList.remove('is-success');
                copyButton.classList.add('is-info');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            alert('复制失败，请手动复制');
        }
    });
}

// 初始化BibTeX复制功能
document.addEventListener('DOMContentLoaded', initBibTeXCopy);

// ===================================
// 工具函数
// ===================================

// 防抖函数
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

// 节流函数
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

// 检测是否为移动设备
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 页面加载进度提示（可选）
window.addEventListener('load', () => {
    console.log('论文详情页加载完成');
});

