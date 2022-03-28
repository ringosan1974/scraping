import client from 'cheerio-httpcli';

const url = 'https://scraping-for-beginner.herokuapp.com/image';

client.fetch(url, (err, $, res) => {
  if (err) {
    console.log('error');
    return;
  }
  const src = $('img').url();
  src.forEach(elem => console.log(elem));
});