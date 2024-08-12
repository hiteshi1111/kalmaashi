export function getLineItemPrice(lineItems) {
    let totalPrice = 0;
    lineItems.forEach(item => {
        totalPrice += parseFloat(item.price) * item.quantity;
    });
    return totalPrice.toFixed(2);
}