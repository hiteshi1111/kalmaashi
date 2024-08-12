const express = require('express')
const router = express.Router()

const ContactService = require('../services/contact.services')
router.post('/submit', async function (req,res){
    try {
        await ContactService.contactFormSubmission(req.body)
        res.status(200).json({message:"Email sent successfully"})
    } catch (error) {
        res.status(500).json({error: "Something went wrong"})
    }
})

module.exports = router;

