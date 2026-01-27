const express = require('express');
const QRCode = require('qrcode');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Раздаем статические файлы (HTML, CSS, JS) из папки public
app.use(express.static(path.join(__dirname, 'public')));

// API роут для генерации QR
app.get('/api/generate', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL не указан.' });

  try {
    const qrDataUrl = await QRCode.toDataURL(url, {
      width: 400,
      margin: 2,
      color: { dark: '#1e293b', light: '#ffffff' }
    });
    res.json({ result: qrDataUrl });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка генерации' });
  }
});

// Запуск
app.listen(PORT, () => {
  console.log(`Проект запущен! Откройте: http://localhost:${PORT}`);
});