const axios = require("axios");

let service = {};

service.getOrderDetails = getOrderDetails;
service.draftOrder = draftOrder;
service.completeOrder = completeOrder;

function getOrderDetails(customerId) {
    const options = {
        method: 'GET',
        url: `https://${process.env.SHOPIFY_SHOP_URL}/admin/api/2024-01/customers/` + customerId + "/orders.json",
        headers: {
            'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
            'Content-Type': 'application/json'
        }
    };
    return axios.request(options).then((response) => {
        return response.data;
    }).catch((error) => {
        throw error;
    });
}

async function draftOrder(lineItems, discount, customerId, shippingAddress) {
    try {
        customerId = Number(customerId);
        let lineItem = lineItems.map(item => {
            const variantIdNumeric = item.variant.id.match(/\d+$/)[0];
            const price = item.variant.price.amount;  
            return {
                variant_id: variantIdNumeric,
                quantity: item.quantity,
                price: price
            };
        });
        const orderObject = {
            draft_order: {
                line_items: lineItem,
                applied_discount: discount,
                customer: {
                    id: customerId
                },
                shipping_address: shippingAddress, 
                use_customer_default_address: false,
                financial_status: 'pending'
            }
        };
        const options = {
            method: 'POST',
            url: `https://${process.env.SHOPIFY_SHOP_URL}/admin/api/2024-01/draft_orders.json`,
            headers: {
                'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(orderObject) // Use 'data' instead of 'body' for axios
        };

        const response = await axios.request(options);
        return response.data; 
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        throw error;
    }
}

async function completeOrder(draftId) {
   try {
       const options = {
            method : "PUT",
            url: `https://${process.env.SHOPIFY_SHOP_URL}/admin/api/2024-01/draft_orders/${draftId}/complete.json`,
            headers: {
                'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
                'Content-Type': 'application/json'
            },
        }
       const response = await axios.request(options);
       return response.data; 
   } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        throw error;
   }
}

module.exports = service;