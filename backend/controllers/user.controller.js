const express = require('express')
const router = express.Router()
const UserService = require('../services/user.service')


router.post('/register', (req,res)=>{
    // const body = {email, firstName, lastName, password, passwordConfirmation, phoneNumber} = req.body
    UserService.createCustomer(req.body).then((data)=> {
        res.status(201).json(data);
    }).catch(err=>{
        console.log("err", err.errors)
        res.status(500).json({message: err.errors})
    })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    UserService.customerLogin({ email, password }).then((loginResponse) => {
        const accessToken = loginResponse.accessToken;
        const customerData = loginResponse.userData;
        const expiresAt = loginResponse.expiresAt

        // Check if access token and customer data are available
        if (!accessToken || !customerData) {
            throw new Error("Access token or customer data not found");
        }
        return { accessToken, expiresAt, customerData };
    }).then((responseData) => {
        res.status(200).json(responseData);
    }).catch((error) => {
        // console.log("error >", error)
        if (error.message === "Wrong password") {
            res.status(400).json({ message: "Incorrect password" });
        } else if (error.message === "Email does not exist") {
            res.status(400).json({ message: "Email does not exist" });
        } else {
            res.status(500).json({ message: error.message });
        }
    });
});

router.get('/token/:token', (req, res) => {
    const token = req.params.token;
    UserService.fetchDataViaToken(token)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: "Token Invalid" });
        });
});

router.put('/updateCustomer/:id', (req, res) => {
    const { first_name, last_name } = req.body;

    const body = {
        first_name,
        last_name,
    };

    const customer_id = req.params.id;

    UserService.updateCustomer(body, customer_id).then(() => {
        res.status(200).json({ message: "Account updated successfully" });
    }).catch(err => {
        res.status(500).json({ message: 'There was an error updating your account' })
    })

});

router.post('/addAddress/:id', (req, res) => {
    const customer_id = req.params.id;

    UserService.addNewAddress(req.body, customer_id).then((data) => {
        res.status(201).send(data);
    }).catch(err => {
        res.status(500).send({ message: 'There was an error adding your address' })
    })

});

router.get('/fetchAddresses/:id', (req, res) => {
    const customer_id = req.params.id;
    UserService.fetchAllAddress(customer_id)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error fetching your address" });
        });
});

router.delete('/removeAddress/:customerId/:addressId', (req, res) => {
    const customerId = req.params.customerId;
    const addressId = req.params.addressId;
    UserService.deleteAddress(customerId, addressId)
        .then((result) => {
            res.status(200).json({message:result.message});
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error deleting your address" });
        });
});


module.exports = router