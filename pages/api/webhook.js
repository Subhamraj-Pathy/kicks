import { buffer } from 'micro';
import * as admin from 'firebase-admin';
const FieldValue = admin.firestore.FieldValue;


const serviceAccount = require('../../lib/firebaseAdmin.json');

const app = !admin.apps.length ? admin.initializeApp({ credential: admin.credential.cert(serviceAccount) }) : admin.app();

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const endPointSecret = process.env.STRIPE_SIGNING_KEY;

const fulFillOrder = async (session) => {
  console.log('******');
  console.log('FULFILLING ORDER FOR SESSION :::', session.id);
  console.log('******');

  let userInfo = [];
  await app.firestore().collection('users').doc(session.metadata.userId).get()
    .then(doc => { userInfo = doc.data(); })
    .catch(err => { console.log(err); });

  await app.firestore().collection('orders').doc(session.id).set({
    id: session.id,
    items: userInfo.bag,
    purchasedBy: session.metadata.userId,
    amount: session.amount_total / 100,
    timestamp: FieldValue.serverTimestamp(),
    shippingDetails: {
      paymentByEmail: session.customer_details.email,
      shippingAddress: session.shipping.address,
      shippedTo: session.shipping.name
    }
  });

  return app.firestore().collection('users').doc(session.metadata.userId).update({
    orderHistory: FieldValue.arrayUnion({ orderId: session.id, productIds: userInfo.bag.map(item => item.id) }),
    bag: []
  }).then(() => {
    console.log('******');
    console.log('ORDED FULFILLED FOR SESSION :::', session.id);
    console.log('******');
  }).catch(err => console.log(err));
};

export default async (req, res) => {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endPointSecret);
    } catch (error) {
      console.log('ERROR ::', error);
      return res.status(400).send(`Error At Payment Webhook Event Construction :: ${error.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      return fulFillOrder(session)
        .then(() => res.status(200))
        .catch(err => {
          console.log(err);
          return res.status(400).send(`Error At Fulfilling Order :: ${err.message}`)
        });
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
}