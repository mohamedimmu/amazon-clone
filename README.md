# Amazon Clone
- If you find this repository helpful or interesting, please consider giving it a star🌟. Your support is greatly appreciated.

**App UI**
![image](https://github.com/mohamedimmu/amazon-clone/assets/54463675/ad2a574a-7ed2-4c31-9ab3-5621bc0e68e7)
![image](https://github.com/mohamedimmu/amazon-clone/assets/54463675/432aedc8-2f8a-4ad0-81c7-8faa54307e1e)
![image](https://github.com/mohamedimmu/amazon-clone/assets/54463675/1235cfc1-18e5-4ae9-bf0a-571e9e57b1c0)
![image](https://github.com/mohamedimmu/amazon-clone/assets/54463675/0b65ce8c-f603-4c90-98d2-2eb051b0594c)
![image](https://github.com/mohamedimmu/amazon-clone/assets/54463675/fde37c2e-6f9d-4311-b561-ffd615c2980e)

## Build Tech Stack:

- **Webhooks**: Webhooks are a way for web applications to communicate with each other in real-time by sending HTTP requests to predefined URLs when specific events occur.

- **Tailwind CSS**: Tailwind CSS is a utility-first CSS framework that provides a set of ready-to-use utility classes for building user interfaces quickly and efficiently.

- **Next.js**: Next.js is a popular React framework that enables server-side rendering, static site generation, and other advanced features to build fast and scalable web applications.

- **Next Auth**: Next Auth is a library that provides out-of-the-box authentication for Next.js applications, supporting various authentication providers like Google, GitHub, etc.

- **Redux**: Redux is a state management library for JavaScript applications, allowing centralized storage and easy management of application state.

- **Firebase**: Firebase is a platform provided by Google that offers various backend services like authentication, real-time database, cloud functions, and more.

- **Fakestore API**: The Fakestore API is a mock API that provides dummy product data for testing and development purposes, simulating a real e-commerce API.


### What i learned from the project
## CSS ##
- grid auto flow
- inset
- space-x space-y in tailwind
- line-clamp
- truncate

## JS ##
- Intl.NumberFormat - provides a way to format numbers based on the locale (language and region) of the user.

- **git**
- git remote - v 
  - To display information about the remote repositories associated with your local repository

## Stripe Integration ##

### Frontend
1. Import `loadStripe` from `@stripe/stripe-js`.

2. Call the `loadStripe` method and pass your Stripe public key. Remember to call loadStripe outside of a component's render to avoid recreating the Stripe object on every render.

```javascript
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
```

3. When the checkout session is initiated, resolve the `stripePromise`.

```javascript
const stripe = await stripePromise;
```

4. After the promise is resolved, retrieve the session ID from your backend server. 

5. Create the user's session on Stripe using the `stripe.redirectToCheckout` method. 

```javascript
const result = await stripe.redirectToCheckout({
   sessionId: checkoutSession.data.id,
})
```


### Backend
1. Import `Stripe` from `"stripe"`.

2. Create a new Stripe session and provide your Stripe secret key.

```javascript
const stripe = new Stripe(STRIPE_SECRET_KEY);
```
3. Create a Stripe checkout session using the stripe.checkout.sessions.create method.

```javascript
const session = await stripe.checkout.sessions.create({
  // ...options
});
```

4. The options object accepts parameters such as `payment_method_types`, `shipping_options`, `shipping_address_collection`, `line_items`, `mode`, `success_url`, `cancel_url`, and `metadata`.

5. Retrieve the session.id from the session object and pass it to the frontend.

## Webhooks
- When the checkout session is completed, an event is triggered which sends a request to `api/webhooks`.

To construct a Stripe webhook event, use:
```javascript
event = stripe.webhooks.constructEvent(payload, sig, stripeSigningKey);
```
- `payload` refers to the request body
- `sig` refers to the Stripe signature from request headers

To create a Stripe signing secret:
1. Create a webhook event and specify the endpoint in the Stripe dashboard.
OR
2. Simulate locally using the Stripe CLI:
   - Download and add Stripe CLI to your environment variables.
   - Run: `stripe listen --forward-to localhost:3000/api/webhook`

3. Use `event.type` to determine if the checkout session is completed.

4. Once the checkout session is completed:
- Access the session details, including the provided metadata.
- Push the details to the database.

5. To access checkout session ordered items:
```javascript
const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 100 });
```

## Next Auth ##
1. Create an `api/auth/[...nextauth]/route.js` inside the app directory to work with NextAuth.js.

2. Import `NextAuth` from `"next-auth/next"` and initialize it with options:
   ```javascript
   import NextAuth from "next-auth/next";
   const handler= NextAuth({ options });
   ```
   - In the `options`, specify the providers for authentication and a secret key for JWT token hashing.

3. Wrap the entire app with the `SessionProvider` component from `"next-auth/react"`:
   ```javascript
   import { SessionProvider } from "next-auth/react";
   // Wrap the app
   <SessionProvider>
     {/* Your app components */}
   </SessionProvider>
   ```

4. Next.js provides a default sign-in page by default.

5. Use the `useSession()` hook to retrieve session details in client components.

6. For server components, use the `getServerSession` hook to fetch session details.

## Redux Toolkit ##

1. Configure the Redux store using configureStore(). Provide a reducer object as an argument.

2. Create a slice using createSlice(). It requires:
    - Name of the slice
    - Initial state
    - Reducers  
  - Export the actions and reducer from the slice.

3. Wrap the entire app with the Redux Provider component. Pass the store as a prop.

4. To retrieve data from the store, use the useSelector hook. Access the state through the function argument.

5. To update the store, utilize the useDispatch hook. Pass an action function from the reducer. Payload also can be included as argument.

## Firebase ##

### Frontend ###
1. Create a `firebase.js` file in the root directory.
2. Obtain the Firebase configuration from the Firebase Console.
3. Use `getApps` to retrieve a list of registered app instances in Firebase.
4. Use `getApp` to access the default app instance.
5. Initialize the Firebase app and Firestore:
   
   ```javascript
   const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
   const db = getFirestore(app);
   ```

### Backend ###
1. Generate a new private key in the service account section of the Firebase Console.
2. Download the generated file and place it in the root directory with a suitable name, such as `permissions.json`.
3. Use `apps` to retrieve a list of registered app instances in Firebase Admin.
4. Use `app` to access the default app instance.
5. Initialize the Firebase Admin SDK:

   ```javascript
   const app = !admin.apps.length
     ? admin.initializeApp({
         credential: admin.credential.cert(serviceAccount),
       })
     : admin.app();
   ```
