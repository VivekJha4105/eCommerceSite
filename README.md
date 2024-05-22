# Basic Purpose:
- Wanted to make an backend project for an eCommerce website.
- It would have been along the line of all the things I learned previously.
- Also wanted to add some things from my end and experiment.

# Structure:
- It would be built on NodeJs, utilizing Mongo Database, passsport-jwt and json web tokens for authentication and authorization along other modules.
- Have prepared data already and will use Mongoose ODM.

-- Routes:
 - Auth Route will have have authorization and authentication vai:
     - Register
     - Login
     - Logout
     - Password Reset
 - User Route will have:
     - User Profile of logged in user
     - Edit Profile of logged in user
       # Will have ADMIN Rotues as Well:
       - Can fetch data of all users
       - Can veiw single user Profile as well.
 - Product Route will have:
     - To fetch all products
     - can fetch single product using the Product ID.
     - Logged In User can leave a review about a single product.
   # Will have ADMIN Routes as Well:
     - ADMIN authorization User can add and delete products from the product list data to be fetched by logged in users.
 - Order Route will have:
     - To create new Order
     - To get all the orders of the logged in User.
     - To get a single order of the logged in User.
     # Will have ADMIN Routes as Well:
      - Updating the order status as requested by the rightly authorized user.
      - Deleting the order from the order list post its completion.
      - To access all the orders from the database.
        
# Authorization and Authentication:
  - passport-jwt for Authentication along with json web tokens.
  - Once the token expires, user is supposed to ask for refresh token which is issued by ADMIN authorization.


  - All ADMIN routes are protected as well as the register and login routes. Order routes are also protected.
