# Backend

You need the vas backend for the full project

To  run the backend you need to have a mongoDB instance running on your machine or mongoDBcloud.
MongoDBCloud was used for this project. Checkout https://www.mongodb.com/cloud for more info.

First create a .env file in the root of the backend folder and add the following:

ACCESS_TOKEN_SECRET= hash of your choice
REFRESH_TOKEN_SECRET= hash of your choice
DATABASE_URI= mongodb_uri
EMAIL_SERVICE= your email service check https://community.nodemailer.com/2-0-0-beta/setup-smtp/well-known-services/ for more info
SENDER_EMAIL= your email
SENDER_PASSWORD= your password

You don't need to add the email if you do not want to use the email service.

Then run the following commands:

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start