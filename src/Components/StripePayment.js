import '../App.css';
import StripeCheckout from 'react-stripe-checkout';
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useParams } from "react-router-dom";

const MySwal = withReactContent(Swal);
function StripePayment() {

   const params = useParams();
   const cartTotal=params.cartTotal; 

 const publishableKey =
 'pk_test_51L2hU0Ie3Yop76mLEPJV6jf1O9cXG8vuab4yznyi6o4bZ1AJCMWJcGzLssUj5qNz0HDvWucy1hTmF3DZScHo5Ffm00sBCbmTSE';
 const [product, setProduct] = useState({
 name: 'articles',
 price: cartTotal,
 });
 const priceForStripe = product.price * 100;
 const handleSuccess = () => {
 MySwal.fire({
 icon: 'success',
 title: 'Payment was successful',
 time: 4000,
 });
 };
 const handleFailure = () => {
 MySwal.fire({
 icon: 'error',
 title: 'Payment was not successful',
 time: 4000,
 });
 };
 const payNow = async token => {
    try {
    const response = await axios({
    url: 'http://localhost:3001/api/payment',
    method: 'post',
    data: {
    amount: product.price * 100,
    token,
    },
    });
    if (response.status === 200) {
    handleSuccess();
    }
    } catch (error) {
    handleFailure();
    console.log(error);
    }
    };
 return (
 <div className="container">
 <h2>paiement en ligne </h2>
 <p>
 <span>Produit: </span>
 {product.name}
 </p>
 <p>
 <span>Prix: </span>${product.price}
 </p>
 <StripeCheckout
 stripeKey={publishableKey}
 label="Pay Now"
 name="Pay With Credit Card"
 billingAddress
 shippingAddress
 amount={priceForStripe}
 description={`Your total is $${product.price}`}
 token={payNow}
 />
 </div>
 );
}
export default StripePayment; 