const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

export default async (req, res) => {
  const { userId, email, items } = req.body;

  const parsedData = items.map(item => ({
    price_data: {
      currency: 'INR',
      unit_amount: item.price * 100,
      product_data: {
        name: item.name,
        images: [item.image]
      }
    },
    description: `Color: ${item.color} - Size: ${item.size}`,
    quantity: item.quantity
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_rates: ['shr_1IyIktSGaeVKHfaWN9Tjyers'],
    shipping_address_collection: {
      allowed_countries: ['IN'],
    },
    line_items: parsedData,
    mode: 'payment',
    success_url: `${process.env.HOST}/orderPlaced`,
    cancel_url: `${process.env.HOST}/bag`,
    metadata: {
      userId,
      email
    }
  });

  res.status(200).json({
    id: session.id
  })

};
