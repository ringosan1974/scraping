import client from 'cheerio-httpcli';

const url = 'https://scraping-for-beginner.herokuapp.com/image';
const param = {};

client.fetch(url, param, (err, $, res) => {
  if (err) {
    console.log('error');
    return;
  }
  const src = $('img').url();
  src.forEach(elem => console.log(elem));
});