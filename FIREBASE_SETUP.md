# Firebase Authentication Setup Instructions

## Step 1: Install Firebase Package

Run the following command in your terminal:

```bash
npm install firebase
```

## Step 2: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project

## Step 3: Enable Google Authentication

1. In the Firebase Console, go to **Authentication** > **Sign-in method**
2. Click on **Google** provider
3. Toggle the **Enable** switch
4. Add your support email
5. Click **Save**

## Step 4: Register Your Web App

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click the **Web** icon (`</>`)
4. Register your app with a nickname (e.g., "SHVYRA Jewelry Store")
5. Copy the Firebase configuration object

## Step 5: Update Firebase Configuration

Open `src/config/firebase.js` and replace the placeholder values with your actual Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDcPJiYaQyKiv6GZceCTLk8jTiXpMNOUyI",                    // Replace with your API key
  authDomain: "shvyra-f6640.firebaseapp.com",
  projectId: "shvyra-f6640",
  storageBucket: "shvyra-f6640.firebasestorage.app",
  messagingSenderId: "1021508293676",
  appId: "1:1021508293676:web:793874b629900cbddcad89",
  measurementId: "G-LQ0XXJPVNZ"
}
```

## Step 6: Configure Authorized Domains

1. In Firebase Console, go to **Authentication** > **Settings** > **Authorized domains**
2. Add your domains:
   - `localhost` (for development)
   - Your production domain (when deployed)

## Step 7: Test the Authentication

1. Run your development server: `npm run dev`
2. Click on the user icon in the header
3. Click "Continue with Google"
4. Sign in with your Google account
5. You should see your profile picture and name in the header

## Features Implemented

✅ **Google Sign-In** - One-click authentication with Google
✅ **Persistent Login** - Users stay logged in even after closing the browser
✅ **User Profile Display** - Shows user's photo and name when logged in
✅ **Logout Functionality** - Clean sign-out process
✅ **Protected State** - Authentication state managed globally

## Security Notes

- Never commit your Firebase credentials to version control
- Consider using environment variables for production
- The current setup uses `browserLocalPersistence` which keeps users logged in across browser sessions
- Firebase automatically handles token refresh and security

## Troubleshooting

**Issue: "Firebase: Error (auth/unauthorized-domain)"**
- Solution: Add your domain to Authorized domains in Firebase Console

**Issue: Login popup blocked**
- Solution: Allow popups for your site in browser settings

**Issue: User not persisting after refresh**
- Solution: This is already handled with `browserLocalPersistence` in the config

## Next Steps (Optional Enhancements)

- Add email/password authentication
- Implement password reset functionality
- Add user profile page
- Store user preferences in Firestore
- Add order history tracking
