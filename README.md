
##  Prequisites
- [How to obtain patreon cookies](https://github.com/patrickkfkan/patreon-dl/wiki/How-to-obtain-Cookie)
- [Youtube external download provider](https://github.com/patrickkfkan/patreon-dl/blob/master/docs/Library.md#external-downloaders)

## Use case

- Download patreon posts

```javascript
// [supported url](https://github.com/patrickkfkan/patreon-dl/blob/master/README.md#url)
const postUrl = 'https://www.patreon.com/c/kobeon/posts';

// fetching posts from patreon and save it to json file
getPosts(postUrl).then(posts => {
    // save posts to a json file
    saveJsonToFile(posts, 'posts.json');
}).catch(console.error);

// Download the post from patreon
downloadFromPatreon(postUrl, "output_dir");
```

- Get patreon posts' metadata without downloading with given post ids

```javascript

import { loadJsonFile, saveJsonToFile } from './utils/fileUtils';
import { getPostMetadata } from './utils/patreonUtils';
import { sleep } from './utils/sleepUtils'

async function main() {
    try {
        const postMetadataList = [];
        const failedPostIds = [];
        
        const postIds = loadJsonFile('postIds.json');
        const totalCount = postIds.length;

        // Use Promise.allSettled to handle all requests concurrently
        const promises = postIds.map(async (postId: string, index: number) => {
            console.log(`Processing ${index + 1}/${totalCount} ${postId}...`);
            try {
                const metadata = await getPostMetadata(postId);
                // sleep 3 seconds to avoid rate limit
                await sleep(1000)
                return { postId, success: true, metadata };
            } catch (error) {
                console.error(`Failed to process ${postId}:`, error);
                return { success: false, postId };
            }
        });

        // Wait for all promises to settle
        const results = await Promise.allSettled(promises);

        // Process the results
        for (const result of results) {
            if (result.status === 'fulfilled') {
                console.log(result.value.postId)
                postMetadataList.push(result.value.metadata);
            } else {
                failedPostIds.push(result.reason.postId);
            }
        }

        // Save json file
        saveJsonToFile(postMetadataList, 'postMetadataList.json');
        saveJsonToFile(failedPostIds, 'failedPostIds.json');
    } catch (err) {
        console.error('Error:', err);
    }
}

// Execute the main function
main();

```

- Extract youtube video url from retrieved post metadata list

```javascript
// Extracting youtube video url from retrieved post metadata

const postList = loadJsonFile("postMetadataList.json")
// Assuming postList is defined and is an array of post objects
const youtubeVideoUrlList = [];
const oddPostList = [];
// Iterate over each post in the postList
for (const post of postList) {
    const attributes = post.data?.attributes; // Accessing attributes directly
    const embed = attributes?.embed; // Accessing embed directly

    // Check if the embed provider is YouTube and push the URL to the list
    if (embed?.provider === "YouTube") {
        youtubeVideoUrlList.push(embed.url); // Accessing URL directly
    } else {
        oddPostList.push(post);
    }
}

// Log the collected YouTube video URLs
console.log('YouTube Video URLs:', youtubeVideoUrlList);

// Save json file
saveJsonToFile(youtubeVideoUrlList, "embedded_youtube_video_url_list.json")
saveJsonToFile(oddPostList, "odd_post_list.json")
```