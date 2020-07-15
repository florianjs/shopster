![Shopster Admin Demo](ShopsterAdmin.gif)

# Shopster V1.0.0

Shopster let you create your own product affiliate website like https://www.thisiswhyimbroke.com/

Stack used : NodeJS / Express / MongoDB / EJS

# ENDPOINTS

| ENDPOINT             | METHOD | DATAS                                                                                          | DESCRIPTION                          |
| -------------------- | ------ | ---------------------------------------------------------------------------------------------- | ------------------------------------ |
| /                    | GET    |                                                                                                | Display all products avalaible       |
| /install/            | GET    |                                                                                                | Temporary route to create a new user |
| /install/            | POST   | email, password(hashed)                                                                        | Create a new user                    |
| /users/login/        | GET    |                                                                                                |                                      |
| /users/login/        | POST   | email, password(hashed)                                                                        |                                      |
| /products/add/       | GET    |                                                                                                |                                      |
| /products/add/       | POST   | product_name, product_price, product_url, product_img, product_category, available             |                                      |
| /products/edit/      | GET    |                                                                                                | Display all products                 |
| /products/:id        | GET    |                                                                                                |                                      |
| /products/:id        | POST   | product_id, product_name, product_price, product_url, product_img, product_category, available |                                      |
| /products/delete/:id | POST   | product_id                                                                                     |                                      |

# How To

## 1 - Connect to your Mongo database

Change the name of **.env** copy file to **.env** and enter your database credentials and your secret phrase for the session.

example :

```
DB_PASSWORD=YourDbPassword
DB_USERNAME=YourDbUsername
DB_NAME=YourDbName
DB_URL=YourDbURL
SESSION_SECRET=SuperLongSecretForSession
```

If you don't know how to create a Mongo database, you can use Atlas. Check this tutorial for more details https://www.youtube.com/watch?v=KKyag6t98g8

## 2 - Create a new User

In your terminal, run

```bash
npm i
npm start
```

Go to http://localhost:3000/install and create a new user

Once done, comment or delete the lines 33 and 34 into the file server.js

```js
// app.get("/install", UserController.registerPage);
// app.post("/install", UserController.register);
```

## 3 - Deploy to Glitch (or your own Server)

Change the default Port in line 41 of server.js. If you are using Glitch, change it to **process.env.PORT**

```js
// Original
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
```

```js
// Modified
app.listen(process.env.PORT, () => {
  console.log("Server listening on port 3000");
});
```

in your package.json file,
Change "start": **"nodemon server.js"** with **"start": "node server.js"**
