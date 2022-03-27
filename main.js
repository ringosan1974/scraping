import https from 'https';
const url = 'https://www.google.com';
 
https.get(url, res => {
  let html = '';
  res.on('data', line => html += line);
  res.on('end', () => {
    console.log(html);
  });
});