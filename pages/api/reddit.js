import axios from 'axios';

export default async function handler(req, res) {
  try {
    const redditRes = await axios.get('https://www.reddit.com/user/ConnorManquen/submitted.json');
    const posts = redditRes.data.data.children
      .filter((post) => post.data.subreddit === 'watchexchange')
      .slice(0, 25)
      .map((post) => ({
        id: post.data.id,
        title: post.data.title,
        description: post.data.selftext || '',
        image: post.data.preview?.images?.[0]?.source?.url.replace('&amp;', '&') || '',
        flair: post.data.link_flair_text || 'Available',
        url: 'https://www.reddit.com' + post.data.permalink
      }));
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Reddit posts' });
  }
}
