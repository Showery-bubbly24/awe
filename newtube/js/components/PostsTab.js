class PostsTab extends HTMLElement {
    constructor() {
        super();
        this.state = {
            posts: []
        };
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        const hasPosts = this.state.posts.length > 0;
        
        this.innerHTML = `
            <div class="content-container">
                <div class="tab-header">
                    <h2><i class="fas fa-newspaper"></i> Посты</h2>
                    <p>Читайте интересные публикации</p>
                </div>
                
                <div class="content-grid">
                    ${hasPosts ? this.renderPosts() : this.renderEmptyState()}
                </div>
            </div>
        `;
    }

    renderPosts() {
        return this.state.posts.map(post => `
            <div class="content-card post-card" data-id="${post.id}">
                <div class="content-author">
                    <div class="author-avatar">
                        ${post.author.charAt(0).toUpperCase()}
                    </div>
                    <div class="author-info">
                        <div class="author-name">${post.author}</div>
                        <div class="author-date">${post.date}</div>
                    </div>
                </div>
                <div class="content-info">
                    <h3 class="content-title post-title">${post.title}</h3>
                    <p class="content-description post-content">${post.content}</p>
                    <div class="content-tags">
                        ${post.tags.map(tag => `<span class="content-tag post-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="content-meta post-meta">
                        <div class="meta-item">
                            <i class="far fa-comment"></i>
                            <span>${post.comments || '0'} комментариев</span>
                        </div>
                        <div class="meta-item">
                            <i class="far fa-heart"></i>
                            <span>${post.likes || '0'} лайков</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderEmptyState() {
        return `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-newspaper"></i>
                </div>
                <h3>Постов пока нет</h3>
                <p>На этой вкладке будут отображаться посты. Создайте первый пост!</p>
            </div>
        `;
    }

    addEventListeners() {
        this.querySelectorAll('.post-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const postId = card.dataset.id;
                this.openPost(postId);
            });
        });
    }

    openPost(postId) {
        console.log('Открытие поста:', postId);
        this.dispatchEvent(new CustomEvent('post-open', {
            detail: { postId },
            bubbles: true
        }));
    }
}

customElements.define('posts-tab', PostsTab);
export default PostsTab;