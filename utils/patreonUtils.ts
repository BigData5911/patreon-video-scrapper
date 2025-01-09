import PatreonDownloader from 'patreon-dl';
import { ConsoleLogger, Post, Campaign, Product } from 'patreon-dl';
import { PATREON_COOKIE } from '../config'
import { patreonApi } from './patreonApiUtils';


export async function  downloadFromPatreon (url: string, outputDir: string) {
    const myLogger = new ConsoleLogger({
        "logLevel": "info"
    });
    const downloader = await PatreonDownloader.getInstance(url, {
        "logger": myLogger,
        "outDir": outputDir,
        "cookie": PATREON_COOKIE,
        "pathToYouTubeCredentials": 'yt-credentials.json',
        "include": {"contentMedia": ["video", "image"]}
    });
    
    await downloader.start();
}


export const getPosts = async (url: string): Promise<Post[]> => {
    const posts: Post[] = [];
    // Create an instance of the downloader
    const downloader = await PatreonDownloader.getInstance(url, {
        logger: new ConsoleLogger({ logLevel: 'info' }),
        cookie: process.env.PATREOL_COOKIE, // Use the environment variable for the cookie
        include: { contentMedia: ["video"] }, // Specify media types if needed
        dryRun: true, // Set to true to simulate the download without actually downloading
    });

    // https://github.com/patrickkfkan/patreon-dl/blob/master/docs/Library.md#events
    downloader.on('targetBegin', ({target} : {target: Post | Campaign | Product}) => {
        // Check if the target is a post, we need to download video from posts
        if (target.type === 'post') {
            posts.push(target);
        }
    })

    downloader.on('end', ({aborted, error, message}: { aborted: true; error?: undefined; message: string; } | { aborted: false; error?: any; message: string; }) => {
        const errorMessage = `Error occurred: ${aborted}: ${error}: ${message}`;
        console.warn(errorMessage);
    })

    // Start the downloader
    await downloader.start();

    return posts;
};

export const getPostMetadata = async (id: string): Promise<object> => {
    try {
        // Make a GET request to the Patreon API to fetch the post metadata with cookie
        const response = await patreonApi.get(`https://www.patreon.com/api/posts/${id}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching post metadata:', error);
        throw error;
    }
}