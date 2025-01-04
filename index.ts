import PatreonDownloader from 'patreon-dl';
import { downloadFromPatreon } from './utils/patreolUtils';

const postUrl = 'https://www.patreon.com/c/kobeon/posts';

downloadFromPatreon(postUrl, process.env.PATREON_OUTPUT_DIR || "patreonPosts");