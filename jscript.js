const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/donationsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const donationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    donationType: { type: String, enum: ['Clothes', 'Food', 'Daily Needs'], required: true },
});

const Donation = mongoose.model('Donation', donationSchema);

// API Endpoints

// Get all donations
app.get('/donations', async (req, res) => {
    try {
        const donations = await Donation.find();
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving donations', error });
    }
});

// Add a new donation
app.post('/donations', async (req, res) => {
    const { name, phone, address, donationType } = req.body;

    const newDonation = new Donation({
        name,
        phone,
        address,
        donationType,
    });

    try {
        await newDonation.save();
        res.status(201).json({ message: 'Donation added successfully', donation: newDonation });
    } catch (error) {
        res.status(400).json({ message: 'Error adding donation', error });
    }
});

// Delete a donation
app.delete('/donations/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Donation.findByIdAndDelete(id);
        res.status(200).json({ message: 'Donation deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting donation', error });
    }
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
