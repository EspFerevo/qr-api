const express = require('express');
const QRCode = require('qrcode');

const app = express();
const PORT = 3000;

app.get('/generate', async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send('URL не указан.');
  }

  try {
    const qr = await QRCode.toDataURL(url);
    res.send(`<img src="${qr}" />`);
  } catch (err) {
    res.status(500).send('Ошибка при создании QR-кода.');
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});


// http://localhost:3000/generate?url=
// Запуск сервера Чтобы запустить API, напишите в терминале эту команду cd qr-api , node index.js и нажмите Enter.
// Если всё верно — увидите сообщение о том, что сервер запущен. ^Сервер запущен по адресу http://localhost:3000^

