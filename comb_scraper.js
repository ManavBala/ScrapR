// findr.js
const { fetchRedditData } = require('./reddit');
const { fetchTwitterData } = require('./twitter');

async function aggregateData(keyword) {
  try {
    const redditPromise = fetchRedditData('all', keyword);
    const twitterPromise = fetchTwitterData(keyword);

    const [redditData, twitterData] = await Promise.all([
      redditPromise,
      twitterPromise,
    ]);

    // Process and combine data
    const combinedData = {
      reddit: redditData,
      twitter: twitterData,
    };

    return combinedData;
  } catch (error) {
    console.error('Error aggregating data:', error.message);
    throw error;
  }
}

module.exports = { aggregateData };
