// twitter.js
require('dotenv').config();
const axios = require('axios');

const twitterBearerToken = process.env.TWITTER_BEARER_TOKEN;

async function fetchTwitterData(query) {
  const response = await axios.get(
    'https://api.twitter.com/2/tweets/search/recent',
    {
      params: {
        query: query,
        max_results: 10,
      },
      headers: {
        Authorization: `Bearer ${twitterBearerToken}`,
      },
    }
  );

  return response.data.data;
}

module.exports = { fetchTwitterData };
