import client from 'cheerio-httpcli';
import fs from 'fs';

client.download
.on('ready',(stream) => {
  const write = fs.createWriteStream('.\\image\\image.png');
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
client.fetch('https://scraping-for-beginner.herokuapp.com/image',(err, $, res, body) => {
  $('img.materialbox.responsive-img.card').download();
  console.log('OK!');
});