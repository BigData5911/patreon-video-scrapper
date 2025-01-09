import PatreonDownloader from 'patreon-dl';
import { ConsoleLogger, Post, Campaign, Product } from 'patreon-dl';
import { PATREON_COOKIE } from '../config'

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

export async function getPatreonPostUrls(url: string) {
    const downloader = await PatreonDownloader.getInstance(url, {
        outDir: 'patreonPosts', // Specify the output directory
        cookie: PATREON_COOKIE, // Use the environment variable for the cookie
        include: { contentMedia: ["video", "image"] } // Include media types if needed
    });
    
    // const posts = await downloader.start(); // Fetch posts
    // const postUrls = posts.map(post => post.url); // Extract URLs from posts

    // console.log(postUrls); // Print the URLs
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