Diving into the  API

first user will comeon our application , first of all he will signup

and as soon as he signup he will autheticate(login)

Group multiple routes under respective routers

authRouter
1) post/signup
2) post/login
3) post/logout


profileRouter
4) get/profile/view
5) patch/profile/edit
6) patch/profile/password


connectionRequestsRouter
7) post/request/send/interested/:userId
8) post/request/review/ignored/:userId
9) post/request/review/accepted/:requestId
10) post/request/review/rejected/:requestId

userRouter
11) get/user/connections
12) get/requests/received
13) get/user/feed - gets you the profiles of other user on platform


mongoose.connect() connects NodeJS application with MongoDB Atlas(Database) using connection string
mongoose.schema() defines the structure of document in a collection.
mongoose.model() creates a collection using Schema
model is used to create a document using new model()
app.use(express.json()) is a middleware that converts JSON string into a JavaScript object, and we can access it using req.body.

Write down all the pacakages which are required why?

1. express : to build server,craete API and run javascript on the server app.use(express.json())
2. nodemon :
3. mongoose :
4. validator:to validate the user details
5. bcrypt:to hash the password
6. jwt
7. cookie-parser: app.use(cookieParser())

**Questions related to brcypt**

1. what is brcypt?
   Ans) brypt is a npm library used to hash the password securely and compare the password.
   command : npm install bcrypt
   import it in the app using : const brcypt = require('bcrypt');

2. why do you hash a password?
   Ans) we don't store the real password in the database.Storing plain password is risky.we hash a password to keep them safe.

3. How do you hash the password?
   Ans) we hash the password using brcypt library i.e brcypt.hash(userpassword,salt)
   we pass a userpassword and number of salt rounds , we usually give 10 salt rounds which will keep good balance between
   security and performance.

4. what happens if we give more than 10 salt rounds or less than 10 rounds?
   Ans) More salt rounds = stronger password,more secure but slower hashing = affects performance
   less salt rounds = faster hashing but weaker password , less secure and risky.
   10 salt rounds = good balance between security and performance.

5. what is hashing and meaning of salt rounds?
   Ans) Hashing a password means converting a plain password to string of fixed length using hashing algorithm (brcypt library)
   salt rounds: number of times hashing is applied.

6. How does the server authenticate or authorize a user? (username/password → token/session)
   Ans) When a user logs in with username and password:
   We use bcrypt.compare(userPassword, hashFromDB) to hash the entered password and compare it with the hashed password in the database.
   a) Returns true → passwords match → user is authenticated.
   b) Returns false → wrong password → access denied.

   If authenticated, the server creates a token (like JWT) and sends it to the client.
   The browser saves the token in cookies.
   On every request, the browser automatically sends the cookies to the server.Now server will read the token from cookies to verify the authenticate user and allow access to protected resources.



Add the express.json middleware to your app
Make your signup API dynamic to receive data from the end user (Postman/client/browser/whoever is hitting API)
user.findOne with duplicate emails id , which object returned
API - get user by email
feed API - get all the users from the database
API - get user by ID ( Model.findById())
create a delete user API
API - update the user with ID
update the user with emailid
Explore the mongoose documentation for model methods
what are options in a Model.findOneAndUpdate method

Validations in our Database

Explore schematype options from the documentation
add , required , unique , lowercase , min , minLength , trim
add default
create a custom validate function for gender
Improve the DB schema - PUT all apppropriate validate on each field in schema
add timestamps to the userSchema
Add API level validation on patch request and signup post API
data sanitizing -- Add API validation for each field

API level validations , schema level validation
Install validator npm install validator
Explore validator library function and use validator function for password ,email,photoURL
NEVER TRUST req.body
https://www.npmjs.com/package/validator npm install validator

https://www.npmjs.com/package/bcrypt : this package gives us functions to hash the password and validate the password
when we do bcrypt.hash => its creates a hash using a salt , plain password and how many number of rounds salt should be applied to create the password
The more number of salt round , the tougher the password to decrypt

validate data in Signup API
Install bcrypt package using npm install bcrypt
Create passwordHash using bcrypt and save the user with encrypted password
create login API
compare passwords and throw errors if email or password is invalid

Authentication , JWT and cookies

Make the API call(connection request is sent to the server) , get the data back from the server(means connection request is sucessful) connection is closed.

Everytime when request came in , user needs to validate whether the request is coming from authorized source or not.

JWT : JSON Web Token

1. Initially user didn't have JWT
2. when user loggedin server creates a token and attach it into a cookie and sent back .Now Cookie will be stored by the browser.Any request which is coming up next , cookie will be sent along to the server and server will validate the cookie and do anything whatever we want in my application.

3. if cookies expires so when we make an API call to the same website so server will not validate the expire cookies and
   you will be redirecting back to the login page

https://expressjs.com/en/api.html#res.cookie : npm i cookie-parser

https://www.jwt.io/

https://www.npmjs.com/package/jsonwebtoken : npm i jsonwebtoken

-Install cookie-parser
send a dummy cookie to user
create get/profile API and check if you get the cookie back
install josnwebtoken
In login API , after email and password validation , create JWT token and send it back to user inside cookies
-read the cookies inside your profile and find the logged in user

write userAuth middleware
Add userAuth middleware in profile API and sent a new connection request
set the expiry of JWT and cookies to 7 days

https://mongoosejs.com/docs/

u showed us dream but it doesn't work the way you say
i love these nitty gritty things

it will never get a chance to execute

The main job of server is to respond back to the user.



 // Object.keys(req.body).forEach(key=>loggedInUser[key]=req.body[key]);



 Lecture on dotenv files

 How to keep our credentials safe

 we will install a dotenv package : npm install dotenv

 Now we will create a .env file inside root
 and keep our credentials there and that is called envronmet variables
and we can access these variables using process.env




13.232.104.30

----------------------------------------

1)login
ssh -i "Dev Connect-secret.pem" ubuntu@ec2-13-232-31-95.ap-south-1.compute.amazonaws.com

2)go to project
cd Dev-Connect-frontend

3)Install the dependencies
npm install
npm run build


sudo apt update
sudo systemctl start nginx
sudo systemctl enable nginx
sudo cp -r dist/* /var/www/html/
sudo systemctl start nginx

------------------------------------------------------

backend

