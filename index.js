// index.js
const { aggregateData } = require('./findr');

async function main() {
  const keyword = process.argv[2];

  if (!keyword) {
    console.error('Please provide a keyword to search for.');
    process.exit(1);
  }

  try {
    const data = await aggregateData(keyword);

    console.log(`\n--- Reddit Posts about "${keyword}" ---\n`);
    data.reddit.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`);
      console.log(`   Link: https://reddit.com${post.permalink}\n`);
    });

    console.log(`\n--- Tweets about "${keyword}" ---\n`);
    data.twitter.forEach((tweet, index) => {
      console.log(`${index + 1}. ${tweet.text}`);
      console.log(`   Tweet ID: ${tweet.id}\n`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
