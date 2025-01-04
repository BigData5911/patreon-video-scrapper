import PatreonDownloader from 'patreon-dl';

export async function  downloadFromPatreon (url: string, outputDir: string) {

    const downloader = await PatreonDownloader.getInstance(url, {
        "outDir": "patreolPosts",
        "cookie": process.env.PATREOL_COOKIE,
        "pathToYouTubeCredentials": 'yt-credentials.json',
        "include": {"contentMedia": ["video"]}
    });
    
    await downloader.start();
}