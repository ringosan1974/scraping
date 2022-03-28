import client from 'cheerio-httpcli';

const url = 'https://scraping-for-beginner.herokuapp.com/image';

client.fetch(url, (error, $) => {
  if (error) {
    console.log('error');
    return;
  }
  const src = $('img').url();
  src.forEach(src_element => console.log(src_element));
});