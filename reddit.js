// reddit.js
require('dotenv').config();
const axios = require('axios');

const redditClientId = process.env.REDDIT_CLIENT_ID;
const redditSecret = process.env.REDDIT_CLIENT_SECRET;
const userAgent = process.env.REDDIT_USER_AGENT;

async function getRedditAccessToken() {
  const response = await axios({
    method: 'post',
    url: 'https://www.reddit.com/api/v1/access_token',
    auth: {
      username: redditClientId,
      password: redditSecret,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': userAgent,
    },
    data: 'grant_type=client_credentials',
  });

  return response.data.access_token;
}

async function fetchRedditData(subreddit, query) {
  const accessToken = await getRedditAccessToken();

  const response = await axios.get(
    `https://oauth.reddit.com/r/${subreddit}/search`,
    {
      params: {
        q: query,
        limit: 10,
        sort: 'new',
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': userAgent,
      },
    }
  );

  return response.data.data.children.map((post) => post.data);
}

module.exports = { fetchRedditData };
