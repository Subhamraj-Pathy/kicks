module.exports = {
  env: {
    FIREBASE_CONFIG: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID
    },
    STRIPE_PUBLIC: process.env.STRIPE_PUBLIC_KEY,
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  }
}