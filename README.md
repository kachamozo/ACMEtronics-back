# ACMEtronics

## Back-End repository

This e-commerce site is built with Vite, Node.js, Express, PostgreSQL (using Docker and Docker Compose for local database), React, Redux, Bootstrap, and Material UI. It uses Auth0 and Stripe to ensure secure purchases.

## Getting Started

To get started with the app, you can follow these steps:

1. **Install Fast Node Manager (fnm)** to manage Node.js versions:

```bash
 curl -fsSL https://fnm.vercel.app/install | bash
```

&nbsp; 2. **Install Docker and Docker Compose** to run the PostgreSQL database locally:

- Install Docker: [Docker Desktop](https://www.docker.com/products/docker-desktop/) or via your package manager.
- Install Docker Compose (usually included with Docker Desktop).
- Start the PostgreSQL container:
  ```bash
  docker-compose up -d
  ```
- To stop the container:
  ```bash
  docker-compose down
  ```

3. **Clone the repository** to your local machine:

```bash
 git clone https://github.com/kachamozo/ACMEtronics-back.git
```

4. **Open the terminal** and run the following command to install the server-side dependencies:

```bash
 npm install
```

5. **Create a `.env` file** with the following information, make sure the `.env` is not inside the `src` folder:

```
 # Aplicación (cambiar node_env a production cuando se haga el deploy y development)
 PORT=8000
 NODE_ENV=development

 # PostgreSQL local (Docker)
 DB_HOST=localhost
 DB_PORT=5432
 DB_USER=postgres
 DB_PASSWORD=postgres
 DB_NAME=acmetronics

 #PostgreSQL producción (serviceweb Neon)
 DB_DEPLOY= postgresql://neondb_owner:npg_Adg8Grso1UPc@ep-broad-queen-atn0py8v.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require

 # Stripe
 STRIPE_PUBLISHABLE_KEY=pk_test_51MGiEBJf3Ra7t0LIpbXGmuheCzm64uisAtUjjerxb3LCv7AEkdcfVfUWRlVRWcScZU5oLKXKRHSP45u6LIPRS66y00oG54GCjY
 STRIPE_SECRET_KEY=sk_test_51MGiEBJf3Ra7t0LIFvCJctI1zgUxX7UMhzVjshM1iGjf85KIaelmVXx7S9lOGJk8Y9FmFSFwMqvUZKTNduky8OIm00RiRnTVom

 # JWT
 TOKEN_SECRET=secreto

 # Email
 EMAIL_HOST=smtp-mail.outlook.com
 EMAIL_USER=acmetronics-shop@outlook.com
 EMAIL_PASS=acme123456*
```

6. **Run the server** with the following command:

```bash
 npm start
```

7. **To populate the database with products and categories**, call the following endpoint with a POST request:

```bash
 POST http://localhost:8000/product/bulk
```

&nbsp; 8. **To create users**, call the following endpoint with a GET request:

```bash
 GET http://localhost:8000/user
```

9. **Go to the [Front-End repository](https://github.com/kachamozo/ACMEtronics-front)**.
10. **Clone the front-end repository** with the following command:

```bash
  git clone https://github.com/kachamozo/ACMEtronics-front.git
```

11. **Open the terminal** and run the following command to install the client-side dependencies:

```bash
  npm install
```

12. **Run the client** with the following command and navigate to [http://127.0.0.1:5173/](http://127.0.0.1:5173/) on your web browser:

```bash
  npm run dev
```

## Features

- User authentication using Auth0.
- Secure payments using Stripe.
- A responsive UI built with Bootstrap and Material UI.
- Product browsing, searching, and filtering.
- Add products to a cart and checkout securely.
- Order history and status tracking for registered users.
- Admin dashboard to manage products, orders, and customers.

## Deployment

Visit [ACMEtronics](https://acmetronics-henryproject.vercel.app/)
