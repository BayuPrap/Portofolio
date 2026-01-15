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

// --- Send Email ---
router.post('/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Konfigurasi transporter (Gmail)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: ' @gmail.com', // Ganti dengan email Anda
            pass:  // Ganti dengan App Password Gmail
        }
    });

    // Opsi email
    let mailOptions = {
        from: `"Portfolio Contact" < @gmail.com>`, // HARUS email Anda
        to: ' ',                       // Anda sebagai penerima
        replyTo: email, // ← Penting! Ini supaya "Balas" otomatis ke pengunjung
        subject: ` ${subject}`,
        text: `Pesan dari: ${name} (${email})\n\n"${message}"`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Pesan Anda telah terkirim! Terima kasih.' });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: 'Gagal mengirim email. Silakan coba lagi.' });
    }
});

module.exports = router;
