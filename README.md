## Food Api

## Description

This repository contains the API logic for a FoodTech Application

## Deployment
A live deployment of this application can be found @ https://f-c3nm.onrender.com

## Documentation
The documentation of this application can be found @:
<li>Open Api @ https://f-c3nm.onrender.com/api/docs</li>
<li>Postman @ https://github.com/TosinJs/food-api/blob/master/Food%20API.postman_collection.json </li>

![Docs](https://user-images.githubusercontent.com/68669102/211183020-bb8f4d80-c769-4ae1-9274-cb9154ff5c27.PNG)

## Run the Application Locally

```bash
# configuration 
# Create .env file in the root folder
$ touch .env

# populate the .env file with <strong>your</strong> files
$ DB_CONNECTION_STRING = "your postgresql connection string"
$ DB_CLIENT = "pg"
$ JWT_SECRET = "your JWT secret"

# Database Migrations (The migration files are found in the database folder)
$ npm run migrate

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Application Flow
<p>The business logic of this application is in the src/domains folder. The business logic is split into two services: </p>
<li>Users</li>
<li>Brands</li>

### Users
<p>The Users service contains all the logic for registeration and authentication of users </p>
<p>A JWT is retured to the user when they signup or login. The JWT is used to access the <strong>Brands</strong> service</p>
<p><strong>Admin Credentials: { username: "password", password: "password" }</strong>
<p>Make a POST request with admin credentials @ https://f-c3nm.onrender.com/users/login to get the bearer token</p>

![login flow](https://user-images.githubusercontent.com/68669102/211182773-d4f712ac-9c4f-4520-97c1-48a918b3a7eb.PNG)

### Brands
<p>The Brands service contains all the logic for creating Brands, Addons, and Categories </p>
<p>All the endpoints in the brands service are "Admin" protected endpoints </p>
<p>The JWT is used to access the <strong>Brands</strong> service. Send this JWT with every request to a brand endpoint</p>

![Regular Flow](https://user-images.githubusercontent.com/68669102/211182762-89147782-3ca2-4696-afc0-345c0f90178e.PNG)

## Database Architecture

The database architecture can be found @ [here](https://lucid.app/lucidchart/0f7b9837-04d1-4c08-a647-aa9e68718f17/edit?viewport_loc=-465%2C371%2C2946%2C1154%2C0_0&invitationId=inv_2865823c-5632-4e8c-81df-5090b3207a12).

![Brands ERD](https://user-images.githubusercontent.com/68669102/211183602-4587a355-3647-48cf-ad7c-3d0d27d60d09.PNG)

![User ERD](https://user-images.githubusercontent.com/68669102/211183603-5b009e98-47f7-4675-8b70-dc12f967692c.PNG)


