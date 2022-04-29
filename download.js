import client from 'cheerio-httpcli';
import fs from 'fs';

const url = 'please write url';
const html_elem = 'please write element';

client.download
.on('ready',(stream) => {
  const write = fs.createWriteStream(`./image/` + Math.floor(Math.random() * 99999)  + stream.url.href.slice(-4));
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
  console.log('OK!');
});
