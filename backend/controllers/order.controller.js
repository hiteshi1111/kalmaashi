const express = require('express');
const router = express.Router();

const OrderService = require('../services/order.service');
const PaymentService = require('../services/payment.service')

router.get('/:customerId', async function (req,res){
    try {
        const data = await OrderService.getOrderDetails(req.params.customerId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error: "Something went wrong"});
    }
})

router.post('/draft/:customerId', async function (req,res){
    const customerId = req.params.customerId;
    const {lineItems,discount, customerDetail, shippingAddress} = req.body;
    try {
        const orderResponse = await OrderService.draftOrder(lineItems, discount, customerId, shippingAddress);
        const paymentResponse = await PaymentService.createPayment(orderResponse.draft_order.total_price, customerDetail);
        const responseData = {
            draftOrderId: orderResponse.draft_order.id,
            paymentToken: paymentResponse.data
        }
        res.status(200).send(responseData)
    } catch (error) {
        console.log("error >>>", error)
        res.status(500).send(error);
    }
})

router.get('/complete/:draftId', async function (req,res){
    try {
        const data = await OrderService.completeOrder(req.params.draftId)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error: "Something went wrong"})
    }
})

module.exports = router;