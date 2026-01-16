const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const router = express.Router();

const DATA_FILE = path.join(__dirname, '../data/data.json');

// Baca data
router.get('/data', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Gagal membaca data' });
        }
        res.json(JSON.parse(data));
    });
});

// Simpan data
router.post('/data', (req, res) => {
    const newData = req.body;
    fs.writeFile(DATA_FILE, JSON.stringify(newData, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: 'Gagal menyimpan data' });
        }
        res.json({ message: 'Data berhasil disimpan!' });
    });
});

module.exports = router;
