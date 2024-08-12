const express = require('express');
const router = express.Router();
const axios = require("axios");
const sha512 = require('js-sha512');
const { randomBytes } = require('crypto');

router.post('/', async function (req, res) {
  
  const { firstName, email, phone } = req.body;
  const key = process.env.EASEBUZZ_KEY;
  const salt = process.env.EASEBUZZ_SALT;
  const productinfo = 'TalentHunt-2024';
  const amount = "300";
  const udf = {
    udf1 : "",
    udf2 : "",
    udf3 : "",
    udf4 : "",
    udf5 : "",
    udf6 : "",
    udf7 : "",
    udf8 : "",
    udf9 : "",
    udf10 : "",
  }
  const transactionId = generateUniqueId();
  const hashString = key + '|' + transactionId + '|' + amount + '|' + productinfo + '|' + firstName + '|' + email + '|' + udf.udf1 + '|' + udf.udf2 + '|' + udf.udf3 + '|' + udf.udf4 + '|' + udf.udf5 + '|' + udf.udf6 + '|' + udf.udf7 + '|' + udf.udf8 + '|' + udf.udf9 + '|'+ udf.udf10 + '|' + salt;
  const hash = sha512.sha512(hashString);

  const options = {
    method: 'POST',
    url: process.env.EASEBUZZ_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      key: key,
      txnid: transactionId,
      amount: amount,
      productinfo: productinfo,
      firstname: firstName,
      phone: phone,
      email: email,
      surl: 'https://www.kalmaashi.com/',
      furl: 'https://www.kalmaashi.com/',
      hash: hash,
      udf1: udf.udf1,
      udf2: udf.udf2,
      udf3: udf.udf3,
      udf4: udf.udf4,
      udf5: udf.udf5,
      udf6: udf.udf6,
      udf7: udf.udf7,
      udf8: udf.udf8,
      udf9: udf.udf9,
      udf10: udf.udf10
    }
  };

  axios.request(options).then(function (response) {
    res.status(200).send(response.data)
  }).catch(function (error) {
    res.status(500).send(error.response)
  });
});

function generateUniqueId() {
  // Use the current timestamp for the first 5 digits
  const now = Date.now().toString().slice(-5);
  // Generate a random 5-digit number for the last 5 digits
  const random = randomBytes(2).toString('hex').slice(0, 5);
  
  return now + random;
}

module.exports = router;
