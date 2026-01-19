// dashboard.js - Update untuk integrasi YouTube

document.addEventListener('DOMContentLoaded', async function() {
    console.log('📊 LinguaFlow Dashboard Initializing...');
    
    // Load YouTube thumbnails
    await loadYouTubeContent();
    
    // Existing dashboard code...
    setupDashboard();
});

async function loadYouTubeContent() {
    try {
        // Update video cards with YouTube thumbnails
        const videoCards = document.querySelectorAll('.group.relative.flex.cursor-pointer');
        
        const videoData = [
            { element: videoCards[0], id: YouTubeConfig.getVideoId('ai_development') },
            { element: videoCards[1], id: YouTubeConfig.getVideoId('business_etiquette') },
            { element: videoCards[2], id: YouTubeConfig.getVideoId('storytelling') },
            { element: videoCards[3], id: YouTubeConfig.getVideoId('cooking_terms') }
        ];
        
        for (const { element, id } of videoData) {
            if (element && id) {
                // Update thumbnail
                const thumbnail = element.querySelector('.absolute.inset-0.bg-cover');
                if (thumbnail) {
                    thumbnail.style.backgroundImage = `url('${YouTubeConfig.getThumbnailUrl(id, 'hqdefault')}')`;
                    thumbnail.setAttribute('data-video-id', id);
                }
                
                // Update click handler
                element.addEventListener('click', function(e) {
                    e.preventDefault();
                    const videoId = this.querySelector('.absolute.inset-0.bg-cover')?.getAttribute('data-video-id');
                    if (videoId) {
                        window.location.href = `learningVideo_code.html?video=${videoId}`;
                    }
                });
            }
        }
        
        console.log('✅ YouTube content loaded');
    } catch (error) {
        console.error('Error loading YouTube content:', error);
    }
}

// Setup dashboard functions
function setupDashboard() {
    // Existing dashboard setup code...
    
    // Update "Start Learning" button
    const startLearningBtn = document.querySelector('button:contains("Start Learning")');
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', function() {
            const defaultVideoId = YouTubeConfig.getVideoId('english_conversation') || 'zQe9J-7CbC4';
            window.location.href = `learningVideo_code.html?video=${defaultVideoId}`;
        });
    }
    
    // Update video recommendations
    updateVideoRecommendations();
}

async function updateVideoRecommendations() {
    try {
        const youtubeAPI = window.YouTubeAPI;
        const level = 'B2'; // Default level for dashboard
        
        // Get recommended videos
        const recommendations = await youtubeAPI.dataApi.getRecommendedVideos(level, 4);
        
        // Update recommendation section
        const recommendationContainer = document.querySelector('.grid.grid-cols-1.gap-4.sm\\:grid-cols-2');
        if (recommendationContainer && recommendations.length > 0) {
            // You can update the recommendation cards here
            console.log('Video recommendations:', recommendations);
        }
    } catch (error) {
        console.error('Error updating recommendations:', error);
    }
}