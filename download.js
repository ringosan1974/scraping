import client from 'cheerio-httpcli';
import fs from 'fs';
import dotenv from 'dotenv'

//.envからサイトのurlと取得するhtml要素を読み取る
dotenv.config();
const url = process.env.URL;
const html_elem = process.env.HTMLELEM;

client.download
.on('ready',(stream) => {
  //ファイル名を0~99999までの乱数にする
  const write = fs.createWriteStream(`./image/` + Math.floor(Math.random() * 99999)  + '.' + stream.url.href.split('.').at(-1));
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

client.download.parallel = 1;

// スクレイピング開始
client.fetch(url,(err, $, res, body) => {
  $(html_elem).download();
  console.log('OK!');
});
