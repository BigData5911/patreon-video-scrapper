import { saveJsonToFile } from './utils/file';
import { downloadFromPatreon, getPosts } from './utils/patreolUtils';

const postUrl = 'https://www.patreon.com/c/kobeon/posts';

// downloadFromPatreon(postUrl, process.env.PATREON_OUTPUT_DIR || "patreonPosts");

// fetching posts from patreon and save it to json file
getPosts(postUrl).then(posts => {
    // save posts to a json file
    saveJsonToFile(posts, 'posts.json');
}).catch(console.error);
