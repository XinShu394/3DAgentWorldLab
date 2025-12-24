/* ================================================
   3DAgentWorld Lab - 交互脚本 + 数据驱动
   整合版：渐变流线动画 + 数据加载
   ================================================ */

// ===================================
// 导航栏滚动效果
// ===================================

let lastScroll = 0;
const navbar = document.querySelector('.navbar-new');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ===================================
// 鼠标视差效果
// ===================================

const particles = document.querySelectorAll('.particle');
const geometricFrame = document.querySelector('.geometric-frame');

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // 粒子轻微跟随鼠标
    particles.forEach((particle, index) => {
        const speed = (index % 3 + 1) * 5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        particle.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    // 几何线框轻微跟随
    if (geometricFrame) {
        const rotateY = (mouseX - 0.5) * 20;
        const rotateX = -(mouseY - 0.5) * 20;
        geometricFrame.style.transform = 
            `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    }
});

// ===================================
// 平滑滚动锚点
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// 页面加载后启动粒子动画
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        particles.forEach(p => {
            p.classList.add('animate');
        });
    }, 500);
});

// ===================================
// 数据加载工具函数
// ===================================

async function loadJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading JSON:', error);
        return null;
    }
}

// ===================================
// 导航高亮
// ===================================

function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links-new a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===================================
// MEMBERS PAGE DATA LOADING (New Version)
// ===================================

class MembersDataLoader {
    constructor() {
        this.facultyContainer = document.getElementById('faculty-container');
        this.studentsContainer = document.getElementById('students-container');
        
        if (this.facultyContainer && this.studentsContainer) {
            this.loadMembers();
            this.initializeFilters();
        }
    }

    async loadMembers() {
        const data = await loadJSON('data/members.json');
        if (!data) {
            if (this.facultyContainer) {
                this.facultyContainer.innerHTML = '<div class="loading-message">加载失败，请刷新页面重试</div>';
            }
            if (this.studentsContainer) {
                this.studentsContainer.innerHTML = '<div class="loading-message">加载失败，请刷新页面重试</div>';
            }
            return;
        }
        this.renderMembers(data);
    }

    renderMembers(data) {
        // Render Faculty
        let facultyHtml = '';
        if (data.director) {
            facultyHtml += this.createMemberCard(data.director, 'faculty');
        }
        this.facultyContainer.innerHTML = facultyHtml;
        
        // Render All Students
        let studentsHtml = '';
        
        // PhD Students
        if (data.phd_students) {
            data.phd_students.forEach(student => {
                studentsHtml += this.createMemberCard(student, 'phd');
            });
        }
        
        // MPhil Students
        if (data.mphil_students) {
            data.mphil_students.forEach(student => {
                studentsHtml += this.createMemberCard(student, 'mphil');
            });
        }
        
        // RA Students
        if (data.ra_students) {
            data.ra_students.forEach(student => {
                studentsHtml += this.createMemberCard(student, 'ra');
            });
        }
        
        this.studentsContainer.innerHTML = studentsHtml;
    }

    createMemberCard(member, category) {
        const profileUrl = member.website || 'members/member-template.html';
        
        // 处理图片路径：如果是Faculty且有照片，确保路径正确
        let photoHtml = '';
        if (member.photo) {
            // 移除可能导致问题的 ../ 前缀（如果有的话）
            const cleanPhotoPath = member.photo.replace('../', '');
            
            photoHtml = `
                <div class="card-avatar-new">
                    <img src="${cleanPhotoPath}" 
                         alt="${member.name}" 
                         style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;"
                         onerror="this.onerror=null; this.src='images/人物.png';">
                </div>
            `;
        } else {
            photoHtml = `
                <div class="card-avatar-new">
                    <img src="images/人物.png" 
                         alt="Default Avatar" 
                         style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                </div>
            `;
        }
        
        return `
            <div class="card-new" data-category="${category}">
                ${photoHtml}
                <h3 class="card-title-new">${member.name}</h3>
                <p class="card-subtitle-new">${member.position}</p>
                <p class="card-description-new">${member.group || member.department || ''}</p>
                <p class="card-description-new">${member.research_direction || member.research_interests?.join(', ') || ''}</p>
                <a href="${profileUrl}" class="btn-secondary-new" target="_blank" style="margin-top: 16px; padding: 8px 24px; font-size: 0.875rem;">PROFILE →</a>
            </div>
        `;
    }

    initializeFilters() {
        const filterButtons = document.querySelectorAll('.student-filter-btn');
        const searchInput = document.getElementById('member-search');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(b => {
                    b.classList.remove('active');
                    b.style.color = 'var(--text-tertiary)';
                });
                
                // Add active class to clicked button
                btn.classList.add('active');
                btn.style.color = 'var(--text-primary)';
                
                // Get filter value
                const filter = btn.dataset.filter;
                
                // Filter students
                this.filterStudents(filter);
            });
        });
        
        // Initialize search functionality
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchMembers(e.target.value);
            });
        }
    }

    filterStudents(filter) {
        const studentCards = this.studentsContainer.querySelectorAll('.card-new');
        const searchInput = document.getElementById('member-search');
        const searchValue = searchInput ? searchInput.value.toLowerCase() : '';
        
        studentCards.forEach(card => {
            const category = card.dataset.category;
            const name = card.querySelector('.card-title-new')?.textContent.toLowerCase() || '';
            const position = card.querySelector('.card-subtitle-new')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.card-description-new')?.textContent.toLowerCase() || '';
            
            const matchesCategory = filter === 'all' || category === filter;
            const matchesSearch = !searchValue || 
                name.includes(searchValue) || 
                position.includes(searchValue) || 
                description.includes(searchValue);
            
            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    searchMembers(searchValue) {
        const activeFilter = document.querySelector('.student-filter-btn.active');
        const filter = activeFilter ? activeFilter.dataset.filter : 'all';
        this.filterStudents(filter);
    }
}

// ===================================
// RESEARCH PAGE DATA LOADING
// ===================================

class ResearchDataLoader {
    constructor() {
        this.papersContainer = document.getElementById('papers-container');
        this.yearFiltersContainer = document.getElementById('year-filters');
        this.searchInput = document.getElementById('paper-search');
        
        this.allPapers = [];
        this.activeYear = 'all';
        this.searchTerm = '';

        if (this.papersContainer) {
            this.loadResearch();
            this.initializeEventListeners();
        }
    }

    async loadResearch() {
        const data = await loadJSON('data/papers.json');
        if (!data || !data.papers) {
            if (this.papersContainer) {
                this.papersContainer.innerHTML = '<div class="loading-message">加载失败，请刷新页面重试</div>';
            }
            return;
        }
        
        this.allPapers = data.papers;
        this.initializeYearFilters();
        this.renderPapers(this.allPapers);
    }

    initializeYearFilters() {
        if (!this.yearFiltersContainer) return;

        // Extract unique years
        const years = [...new Set(this.allPapers.map(p => p.year).filter(y => y))].sort().reverse();
        
        // Create buttons
        years.forEach(year => {
            const btn = document.createElement('button');
            btn.className = 'year-filter-btn';
            btn.dataset.year = year;
            btn.textContent = year;
            btn.style.cssText = 'padding: 8px 16px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 6px; color: var(--text-tertiary); cursor: pointer; transition: all 0.3s ease;';
            
            this.yearFiltersContainer.appendChild(btn);
        });

        // Add click handlers
        this.yearFiltersContainer.querySelectorAll('.year-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update UI
                this.yearFiltersContainer.querySelectorAll('.year-filter-btn').forEach(b => {
                    b.classList.remove('active');
                    b.style.background = 'rgba(255, 255, 255, 0.05)';
                    b.style.color = 'var(--text-tertiary)';
                    b.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                });
                e.target.classList.add('active');
                e.target.style.background = 'rgba(99, 102, 241, 0.2)';
                e.target.style.color = 'var(--text-primary)';
                e.target.style.borderColor = 'rgba(99, 102, 241, 0.5)';

                // Update filter
                this.activeYear = e.target.dataset.year;
                this.filterPapers();
            });
        });
    }

    initializeEventListeners() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.filterPapers();
            });
        }
    }

    filterPapers() {
        const filtered = this.allPapers.filter(paper => {
            const matchYear = this.activeYear === 'all' || paper.year === this.activeYear;
            const matchSearch = !this.searchTerm || 
                paper.title.toLowerCase().includes(this.searchTerm) || 
                paper.authors.join(' ').toLowerCase().includes(this.searchTerm) ||
                (paper.venue && paper.venue.toLowerCase().includes(this.searchTerm));
            
            return matchYear && matchSearch;
        });

        this.renderPapers(filtered);
    }

    renderPapers(papers) {
        if (papers.length === 0) {
            this.papersContainer.innerHTML = '<div class="loading-message">No papers found matching your criteria.</div>';
            return;
        }
        const html = papers.map(paper => this.createPaperCard(paper)).join('');
        this.papersContainer.innerHTML = html;
    }

    createPaperCard(paper) {
        // More按钮优先链接到project_url，否则使用detail_url
        const moreUrl = paper.project_url || paper.detail_url || 'papers/paper-template.html';
        
        // Year display fix: if venue contains year, don't show year again
        let venueDisplay = paper.venue || '';
        if (paper.year && !venueDisplay.includes(paper.year)) {
            venueDisplay += ` ${paper.year}`;
        }

        // Tags HTML
        let tagsHtml = '';
        if (paper.tags && paper.tags.length > 0) {
            tagsHtml = `<div style="display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap;">
                ${paper.tags.map(tag => `<span style="font-size: 0.75rem; padding: 4px 8px; background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 4px; color: var(--accent);">${tag}</span>`).join('')}
            </div>`;
        }

        return `
            <div class="card-new" style="position: relative; padding-bottom: 20px; display: flex; flex-direction: column;">
                ${tagsHtml}
                <h3 class="card-title-new" style="font-size: 1.25rem; margin-bottom: 10px;">${paper.title}</h3>
                <p class="card-subtitle-new" style="color: var(--text-secondary); margin-bottom: 8px;">${paper.authors.join(', ')}</p>
                <p class="card-subtitle-new" style="color: var(--accent); font-weight: 600; margin-bottom: 12px;">${venueDisplay}</p>
                <p class="card-description-new" style="font-size: 0.9rem; line-height: 1.6; margin-bottom: 20px; flex-grow: 1;">${paper.abstract || ''}</p>
                
                <div style="margin-top: 16px; display: flex; gap: 12px; flex-wrap: wrap;">
                    ${paper.pdf_url ? `<a href="${paper.pdf_url}" class="btn-secondary-new" style="padding: 6px 16px; font-size: 0.85rem;" target="_blank">📄 Paper</a>` : ''}
                    ${paper.code_url ? `<a href="${paper.code_url}" class="btn-secondary-new" style="padding: 6px 16px; font-size: 0.85rem;" target="_blank">💻 Code</a>` : ''}
                    ${paper.project_url ? `<a href="${paper.project_url}" class="btn-secondary-new" style="padding: 6px 16px; font-size: 0.85rem;" target="_blank">🌐 Project</a>` : ''}
                </div>
            </div>
        `;
    }
}

// ===================================
// ACTIVITY PAGE DATA LOADING
// ===================================

class ActivityDataLoader {
    constructor() {
        this.container = document.getElementById('activities-container');
        if (this.container) {
            this.loadActivities();
        }
    }

    async loadActivities() {
        const data = await loadJSON('data/activities.json');
        if (!data) {
            this.container.innerHTML = '<div class="loading-message">加载失败，请刷新页面重试</div>';
            return;
        }
        this.renderActivities(data.activities || []);
    }

    renderActivities(activities) {
        if (activities.length === 0) {
            this.container.innerHTML = '<div class="loading-message">暂无活动信息</div>';
            return;
        }
        
        const html = activities.map(activity => this.createActivityCard(activity)).join('');
        this.container.innerHTML = html;
    }

    createActivityCard(activity) {
        return `
            <div class="card-new" style="padding-bottom: 20px;">
                ${activity.image ? `
                    <div style="margin: -32px -32px 20px -32px; height: 200px; overflow: hidden; border-radius: 20px 20px 0 0;">
                        <img src="${activity.image}" alt="${activity.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    </div>
                ` : ''}
                <div class="card-subtitle-new" style="color: var(--accent); margin-bottom: 8px;">
                    ${activity.date || ''} • ${activity.location || ''}
                </div>
                <h3 class="card-title-new" style="margin-bottom: 12px;">${activity.title}</h3>
                <p class="card-description-new" style="margin-bottom: 24px;">${activity.description || ''}</p>
                ${activity.link ? `
                    <a href="${activity.link}" class="btn-secondary-new" style="display: inline-block; padding: 8px 24px; font-size: 0.875rem;" target="_blank">
                        View Details →
                    </a>
                ` : ''}
            </div>
        `;
    }
}

// ===================================
// HOME PAGE ACTIVITIES LOADING
// ===================================

class HomeActivitiesLoader {
    constructor() {
        this.container = document.getElementById('home-activities-container');
        if (this.container) {
            // 确保显示加载状态
            this.container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-tertiary); padding: 20px;">Loading activities...</div>';
            this.loadActivities();
        } else {
            console.warn('HomeActivitiesLoader: Container not found');
        }
    }

    async loadActivities() {
        try {
            const data = await loadJSON('data/activities.json');
            
            // 检查数据有效性
            if (!data || !data.activities) {
                console.error('HomeActivitiesLoader: Invalid data format or fetch failed');
                this.container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-tertiary);">暂无活动数据</div>';
                return;
            }

            // 安全地排序（创建副本以免影响其他组件）
            const sortedActivities = [...data.activities].sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                // 处理无效日期
                if (isNaN(dateA) || isNaN(dateB)) return 0;
                return dateB - dateA;
            });

            const recentActivities = sortedActivities.slice(0, 3);
            
            this.renderActivities(recentActivities);
        } catch (error) {
            console.error('HomeActivitiesLoader Error:', error);
            this.container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-tertiary);">加载活动出错: ${error.message || '未知错误'}</div>`;
        }
    }

    renderActivities(activities) {
        if (!activities || activities.length === 0) {
            this.container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-tertiary);">暂无最近活动</div>';
            return;
        }
        
        try {
            const html = activities.map(activity => this.createHomeActivityCard(activity)).join('');
            this.container.innerHTML = html;
        } catch (renderError) {
            console.error('HomeActivitiesLoader Render Error:', renderError);
            this.container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-tertiary);">渲染活动列表出错</div>';
        }
    }

    createHomeActivityCard(activity) {
        // Optimized card for home page grid
        // 处理图片路径，确保是相对于 index.html 的正确路径
        const imagePath = activity.image || '';
        const linkPath = activity.link || '#';
        
        return `
            <div class="card-new" style="background: rgba(42, 45, 75, 0.6); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 12px; overflow: hidden; transition: all 0.3s ease; cursor: pointer; display: flex; flex-direction: column;" onclick="window.location.href='${linkPath}'">
                ${imagePath ? `
                    <div style="aspect-ratio: 16/10; overflow: hidden; position: relative;">
                         <img src="${imagePath}" alt="${activity.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\'width:100%;height:100%;background:rgba(99,102,241,0.1);display:flex;align-items:center;justify-content:center;\'>🎉</div>'">
                    </div>
                ` : `
                    <div style="aspect-ratio: 16/10; background: linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3)); display: flex; align-items: center; justify-content: center; font-size: 3rem;">
                        🎉
                    </div>
                `}
                <div style="padding: 20px; flex: 1; display: flex; flex-direction: column;">
                    <div style="font-size: 0.8rem; color: var(--accent); margin-bottom: 4px;">${activity.date}</div>
                    <h3 style="font-size: 1.125rem; font-weight: 600; color: var(--text-primary); margin-bottom: 8px;">${activity.title}</h3>
                    <p style="font-size: 0.875rem; color: var(--text-tertiary); line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${activity.description}</p>
                </div>
            </div>
        `;
    }
}

// ===================================
// 初始化所有组件
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // 设置导航高亮
    setActiveNav();
    
    // 初始化数据加载器
    new MembersDataLoader();
    new ResearchDataLoader();
    new ActivityDataLoader();
    new HomeActivitiesLoader();
    
    // 页面渐入动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('3DAgentWorld Lab Website Initialized - 渐变流线风格 + 数据驱动架构');
});
