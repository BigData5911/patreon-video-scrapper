import { saveJsonToFile } from './utils/fileUtils';
import { downloadFromPatreon, getPosts } from './utils/patreonUtils';


const postUrl = 'https://www.patreon.com/c/kobeon/posts';

// Get posts from patreon and save it to json file withou downlading
getPosts(postUrl).then(posts => {
    // save posts to a json file
    saveJsonToFile(posts, 'posts.json');
}).catch(console.error);

// Download the post from patreon
downloadFromPatreon(postUrl, "post-002");
