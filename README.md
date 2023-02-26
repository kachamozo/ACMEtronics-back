# ACMEtronics 
## Back-End repository

This e-commerce site is built with Vite, Node.js, Express, PostgreSQL, React, Redux, Bootstrap, and Material UI. It uses Auth0 and Stripe to ensure secure purchases.

## Getting Started

To get started with the app, you can follow these steps:

Clone the repository to your local machine

1. Open the terminal and run **`npm install`** to  install the server-side dependencies
    
2. Create a **`.env`** file with the following information, make sure the **`.env`** is not inside the **`src`** folder :
    

```
STRIPE_PUBLISHABLE_KEY=pk_test_51MGiEBJf3Ra7t0LIpbXGmuheCzm64uisAtUjjerxb3LCv7AEkdcfVfUWRlVRWcScZU5oLKXKRHSP45u6LIPRS66y00oG54GCjY
STRIPE_SECRET_KEY=sk_test_51MGiEBJf3Ra7t0LIFvCJctI1zgUxX7UMhzVjshM1iGjf85KIaelmVXx7S9lOGJk8Y9FmFSFwMqvUZKTNduky8OIm00RiRnTVom
TOKEN_SECRET=secreto
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_USER=acmetronics-shop@outlook.com
EMAIL_PASS=acme123456*
DB_DEPLOY= postgres://acme_i9sg_user:SfAm59sxZJnv95D27nqB3VhOTn9P8SvH@dpg-cftbps2rrk0c835cundg-a.oregon-postgres.render.com/acme_i9sg
```


  3. Run **`npm start`** to start the server
  
  4. Go to the [Front-End repository](https://github.com/kachamozo/ACMEtronics-front)
  
  5. Clone the front-end repository
  
  6. Open the terminal and run **`npm install`** to  install the client-side dependencies
  
  7. Run **`npm run dev`** to start the client and navigate to http://127.0.0.1:5173/ on your web browser.
  
 ## Features
  
 * User authentication using Auth0.
 
 * Secure payments using Stripe.
 
 * A responsive UI built with Bootstrap and Material UI.
 
 * Product browsing, searching, and filtering.
 
 * Add products to a cart and checkout securely.
 
 * Order history and status tracking for registered users.
 
 * Admin dashboard to manage products, orders, and customers.
 

## Deployment

Visit [ACMEtronics](https://acmetronics-henryproject.vercel.app/)


