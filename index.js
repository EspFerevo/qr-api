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


// http://localhost:3000/generate?url=https://maisteroriginal.com/en/products/thermal-insulation-materials/fiberglass-%d0%bc%d0%b0%d0%b9%d1%81%d1%82%d0%b5%d1%80-original-160/