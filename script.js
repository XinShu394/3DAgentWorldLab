/* ================================================
   3DAgentWorldLab - 交互脚本 + 数据驱动
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
        if (this.papersContainer) {
            this.loadResearch();
        }
    }

    async loadResearch() {
        const data = await loadJSON('data/papers.json');
        if (!data) {
            if (this.papersContainer) {
                this.papersContainer.innerHTML = '<div class="loading-message">加载失败，请刷新页面重试</div>';
            }
            return;
        }
        
        if (data.papers && this.papersContainer) {
            this.renderPapers(data.papers);
        }
    }

    renderPapers(papers) {
        const html = papers.map(paper => this.createPaperCard(paper)).join('');
        this.papersContainer.innerHTML = html;
    }

    createPaperCard(paper) {
        // More按钮优先链接到project_url，否则使用detail_url
        const moreUrl = paper.project_url || paper.detail_url || 'papers/paper-template.html';
        return `
            <div class="card-new" style="position: relative; padding-bottom: 60px;">
                <h3 class="card-title-new">${paper.title}</h3>
                <p class="card-subtitle-new">${paper.authors.join(', ')}</p>
                <p class="card-subtitle-new">${paper.venue} ${paper.year}</p>
                <p class="card-description-new">${paper.abstract || ''}</p>
                ${paper.pdf_url || paper.code_url ? `
                    <div style="margin-top: 16px; display: flex; gap: 12px; flex-wrap: wrap;">
                        ${paper.pdf_url ? `<a href="${paper.pdf_url}" class="btn-secondary-new" style="padding: 8px 16px; font-size: 0.875rem;" target="_blank">Paper</a>` : ''}
                        ${paper.code_url ? `<a href="${paper.code_url}" class="btn-secondary-new" style="padding: 8px 16px; font-size: 0.875rem;" target="_blank">Code</a>` : ''}
                    </div>
                ` : ''}
                <a href="${moreUrl}" class="btn-primary-new" style="position: absolute; bottom: 16px; right: 16px; padding: 8px 20px; font-size: 0.875rem;" target="_blank">More →</a>
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
// 初始化所有组件
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // 设置导航高亮
    setActiveNav();
    
    // 初始化数据加载器
    new MembersDataLoader();
    new ResearchDataLoader();
    new ActivityDataLoader();
    
    // 页面渐入动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('3DAgentWorldLab Website Initialized - 渐变流线风格 + 数据驱动架构');
});

