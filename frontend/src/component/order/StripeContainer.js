import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import TakeOutOrder from './TakeOutOrder';

const PUBLIC_KEY = "pk_test_51KiMjIJOPlSjJluoaUiPNuB469qVuObbz47ZtUlpkEEGTqg1ZwHwbRx5K8ot3gICoTcCVOCNHsXitibB34sx3Ohm00i5dUYwRE";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer(props) {
  return (
    <Elements stripe={stripeTestPromise}>
        <TakeOutOrder />
    </Elements>
  )
}
