# Auction Web

This is the **FRONT END** portion of a web auction application for an antique items seller. The application allows users to bid on antique items displayed in the site and admin users to set up items for auction.

> You can get the **SERVER** portion of the web application from [https://github.com/redbayoub/auction-server.git](https://github.com/redbayoub/auction-server.git).

---

## Installation
For detailed explanation on how things work, check out the [Nuxt documentation](https://nuxtjs.org).


Clone the repository

    git clone https://github.com/redbayoub/auction-web.git

Switch to the repo folder

    cd auction-web


Install all the dependencies using composer

    npm install

Copy the example env file and make the required configuration changes in the `.env` file.  See [Environment variables](#environment-variables).

    cp .env.example .env

Serve with hot reload 

    npm install

You can now open the web application at [http://localhost:3000](http://localhost:3000).

    
Build for production and launch server

    npm run build
    npm install

## Authentication

> If the authentication part of the server is done, you can use the following credentials to login

Regular User Credentials

-   Username: user1
-   Password: user2

Admin User Credentials

-   Username: admin1
-   Password: admin2

## Environment variables

Copy the example env file and make the required configuration changes in the .env file

    cp .env.example .env

Environment variables can be set in `.env` file

    SERVER_URL=http://localhost:8000

-   SERVER_URL variable refers to the url of the server application

