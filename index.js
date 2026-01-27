const express = require('express');
const QRCode = require('qrcode');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/generate', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL не указан.' });

  try {
    const options = { width: 400, margin: 2 };

    // Генерируем оба формата параллельно
    const [png, svg] = await Promise.all([
      QRCode.toDataURL(url, options),               // PNG в формате Base64
      QRCode.toString(url, { ...options, type: 'svg' }) // SVG как XML-строка
    ]);

    res.json({ png, svg });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка генерации' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер: http://localhost:${PORT}`);
});