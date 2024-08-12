const express = require('express');
const router = express.Router();
const NewsletterService = require('../services/newsletter.service');

router.post('/subscribe', async function (req, res) {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        
        const result = await NewsletterService.subscribeToNewsletter(email);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;
