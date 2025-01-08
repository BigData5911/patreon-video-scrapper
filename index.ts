import { saveJsonToFile } from './utils/fileUtils';
import { downloadFromPatreon, getPosts } from './utils/patreonUtils';

const postUrl = 'https://www.patreon.com/c/kobeon/posts';

// Download the post from patreon
// downloadFromPatreon(postUrl, process.env.PATREON_OUTPUT_DIR || "patreonPosts");

// fetching posts from patreon and save it to json file
getPosts(postUrl).then(posts => {
    // save posts to a json file
    saveJsonToFile(posts, 'posts.json');
}).catch(console.error);
