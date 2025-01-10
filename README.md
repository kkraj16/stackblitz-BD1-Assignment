# BD-1 Assignment 
API Endpoints

Calculate Cart Total: When a user adds a new item to the cart, the frontend makes a GET request to /cart-total with the price of the new item and the current cart total to update the total price.

Apply Membership Discount: If the user is a member, the frontend makes a GET request to /membership-discount to apply any applicable discounts to the cart total.

CalculateTax: For the total cart amount, the frontend makes a GET request to /calculate-tax to apply 5% tax rate on the total cart amount.

Estimate Delivery Time: The user can see the estimated delivery time by making a GET request to /estimate-delivery with the chosen shipping method and delivery distance.

Calculate Shipping Cost: The shipping cost based on the weight of the items and the delivery distance is calculated by making a GET request to /shipping-cost.

Calculate Loyalty Points: To calculate the loyalty points, front end is making a GET request to /loyalty-points to add 2 points per $1