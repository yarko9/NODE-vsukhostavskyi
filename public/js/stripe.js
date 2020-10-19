/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_51HbRbsJcHVDv2N69BYpnNgDxP8azpPnZWpjecT8WOO7HUiqrjRYIM2pvV9iJKjRXIjKnnaLqqXE4TZWXhzXN7RHw00T0BdbxxS');

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/graphql',
        data: {
          query: `
              query {
                getCheckoutSession(tourId: "${tourId}")
              }
          `
        }
    });
    
    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.data.getCheckoutSession
    });
  } catch (err) {
    console.error(err);
    showAlert('error', err);
  }
};
