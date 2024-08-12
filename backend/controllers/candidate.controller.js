const express = require('express');
const CandidateService = require('../services/candidate.services');

const router = express.Router();

// router.post('/register', async (req, res) => {
//     try {
//         const candidate = await CandidateService.registerCandidate(req.body);
//         res.status(201).send(candidate);
//     } catch (err) {
//         console.log("Something went wrong", err)
//         res.status(500).send(err.message);
//     }
// });

router.post('/draft', async (req, res) => {
    try {
        const candidate = await CandidateService.draftCandidate(req.body);
        res.status(201).send(candidate);
    } catch (err) {
        console.log("Something went wrong", err)
        res.status(500).send(err.error);
    }
});

module.exports = router;

