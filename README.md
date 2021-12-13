# food-order-system-api-with-node.js-and-mongoDB

# Introduction
order system api using Node js, Express js, and Mongoose.
The system relies on restaurants to create products and customers with a admin to manage customer technical problems
and delete and modify data for both restaurants and customers

# Technology
* Node.js
* MongoDB 
* Express 
* joi
* jsonwebtoken
* multer
* stripe

# Features

Customer can do the following:
* Create an account, login or logout.
* update or delete only own account.
* Display the product.
* sersh in product.
* Add products to the shopping cart.
* Delete or update products from the shopping cart.
* Display the shopping cart.
* To checkout, a user must be logged in
* creat or cancel order their own.

Restaurants can do the following:
* Create an account, login or logout.
* update or delete only own account.
* add or update their own product.
* Display the order their own.
* Cancel their orders.


Admins can do the following:

* Login or logout.
* View all the information stored in the database.
* They can view/add/edit/delete orders, customer,restaurants products and categories.
* The cart model cannot be modified by an admin because a cart is either modified by the logged in user before the purchase or deleted after the purchase.




