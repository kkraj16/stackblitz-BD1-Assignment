let express = require('express');
let cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

// Global serverside value
let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2; //2

// cart-total end point
app.get('/cart-total', (req, res) => {
  // Retrieve query parameters
  const newItemPrice = parseFloat(req.query.newItemPrice);
  const cartTotal = parseFloat(req.query.cartTotal);

  // Validate inputs
  if (isNaN(newItemPrice) || isNaN(cartTotal)) {
    return res
      .status(400)
      .send(
        'Invalid input. Please provide valid numbers for newItemPrice and cartTotal.'
      );
  }

  // Calculate the total cart price
  const totalCartValue = cartTotal + newItemPrice;

  // Return the result
  res.send(totalCartValue.toString());
});

// Endpoint to calculate membership discount
app.get('/membership-discount', (req, res) => {
  // Retrieve query parameters
  const cartTotal = parseFloat(req.query.cartTotal);
  const isMember = req.query.isMember === 'true'; // Convert to boolean

  // Validate inputs
  if (isNaN(cartTotal)) {
    return res
      .status(400)
      .send('Invalid input. Please provide a valid number for cartTotal.');
  }

  // Apply discount logic
  let finalPrice = cartTotal;
  if (isMember) {
    finalPrice = cartTotal - (cartTotal * discountPercentage) / 100;
  }

  // Return the result
  res.send(finalPrice.toString());
});

// Endpoint to calculate-tax
app.get('/calculate-tax', (req, res) => {
  // Retrive query parameter
  const cartTotal = parseFloat(req.query.cartTotal);
  // Validate inputs
  if (isNaN(cartTotal)) {
    return res
      .status(400)
      .send('Invalid input. Please provide a valid number for cartTotal.');
  }
  // Apply tax logic
  let finalTax = 0;
  finalTax = (cartTotal * taxRate) / 100;
  // Return Tax amount
  res.send(finalTax.toString());
});

// Endpoint to estimate delivery time
app.get('/estimate-delivery', (req, res) => {
  // Retrieve query parameters
  const shippingMethod = req.query.shippingMethod;
  const distance = parseFloat(req.query.distance);

  // Validate inputs
  if (!shippingMethod || isNaN(distance)) {
    return res
      .status(400)
      .send(
        'Invalid input. Please provide a valid shippingMethod and numeric distance.'
      );
  }

  // Calculate delivery days based on shipping method
  let deliveryDays;

  if (shippingMethod.toLowerCase() === 'standard') {
    deliveryDays = Math.ceil(distance / 50); // Standard: 1 day per 50 kms
  } else if (shippingMethod.toLowerCase() === 'express') {
    deliveryDays = Math.ceil(distance / 100); // Express: 1 day per 100 kms
  } else {
    return res
      .status(400)
      .send('Invalid shipping method. Please use "standard" or "express".');
  }

  // Return the result as a string
  res.send(`${deliveryDays}`);
});

// Endpoint to calculate shipping cost
app.get('/shipping-cost', (req, res) => {
  // Retrieve query parameters
  const weight = parseFloat(req.query.weight);
  const distance = parseFloat(req.query.distance);

  // Validate inputs
  if (isNaN(weight) || isNaN(distance)) {
    return res
      .status(400)
      .send(
        'Invalid input. Please provide valid numbers for weight and distance.'
      );
  }

  // Calculate shipping cost
  const shippingCost = weight * distance * 0.1;

  // Return the result as a string
  res.send(shippingCost.toString());
});

// Endpoint Calculate Loyalty Points
app.get('/loyalty-points', (req, res) => {
  const purchaseAmount = parseFloat(req.query.purchaseAmount);

  if (isNaN(purchaseAmount)) {
    return res
      .status(400)
      .send('Invalid input. Please provide a valid number for purchaseAmount.');
  }

  const loyaltyPoints = purchaseAmount * 2;
  res.send(loyaltyPoints.toString());
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
