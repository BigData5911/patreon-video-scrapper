export const getYouTubeVideoId = (url: string) => {
    // Regular expression to match YouTube video URLs
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    
    const match = url.match(regex);
    return match ? match[1] : null; // Return video ID or null if not found
}