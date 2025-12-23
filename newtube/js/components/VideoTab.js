class VideoTab extends HTMLElement {
    constructor() {
        super();
        this.state = {
            videos: []
        };
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        const hasVideos = this.state.videos.length > 0;
        
        this.innerHTML = `
            <div class="content-container">
                <div class="tab-header">
                    <h2><i class="fas fa-video"></i> Видео</h2>
                    <p>Смотрите интересные видео</p>
                </div>
                
                <div class="content-grid">
                    ${hasVideos ? this.renderVideos() : this.renderEmptyState()}
                </div>
            </div>
        `;
    }

    renderVideos() {
        return this.state.videos.map(video => `
            <div class="content-card video-card" data-id="${video.id}">
                <div class="content-media video-media">
                    <i class="fas fa-play-circle"></i>
                    <span class="content-badge video-duration">${video.duration}</span>
                </div>
                <div class="content-info">
                    <h3 class="content-title video-title">${video.title}</h3>
                    <p class="content-description video-description">${video.description}</p>
                    <div class="content-meta video-meta">
                        <div class="meta-item">
                            <i class="fas fa-eye"></i>
                            <span>${video.views}</span>
                        </div>
                        <div class="meta-item">
                            <i class="far fa-calendar"></i>
                            <span>${video.date}</span>
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
                    <i class="fas fa-video-slash"></i>
                </div>
                <h3>Видео пока нет</h3>
                <p>На этой вкладке будут отображаться видео. Добавьте первое видео!</p>
            </div>
        `;
    }

    addEventListeners() {
        this.querySelectorAll('.video-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const videoId = card.dataset.id;
                this.playVideo(videoId);
            });
        });
    }

    playVideo(videoId) {
        console.log('Воспроизведение видео:', videoId);
        this.dispatchEvent(new CustomEvent('video-play', {
            detail: { videoId },
            bubbles: true
        }));
    }
}

customElements.define('video-tab', VideoTab);
export default VideoTab;