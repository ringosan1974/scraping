import client from 'cheerio-httpcli';
import fs from 'fs';
import { setTimeout } from 'timers/promise';

const url = 'https://scraping-for-beginner.herokuapp.com/image';
const html_elem = 'img.materialbox.responsive-img.card';

let counter = 0;

client.download
.on('ready',(stream) => {
  const write = fs.createWriteStream(`.\\image\\image${counter}.png`);
  counter++;
  write
    .on('finish',() => {
      console.log(stream.url.href + 'をダウンロードしました');
    })
    .on('error', console.error);
  stream
    .on('data',(chunk) => {
      write.write(chunk);
    })
    .on('end',() => {
      write.end();
    });
})
.on('error',(err) => {
  console.error(err.url + 'をダウンロードできませんでした: ' + err.message);
})
.on('end',() => {
  console.log('ダウンロードが完了しました');
});

client.download.parallel = 4;

// スクレイピング開始
client.fetch(url,(err, $, res, body) => {
  $(html_elem).download();
  await setTimeout(1000);
  console.log('OK!');
});
