import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Axios from "../../Axios/Api";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {updatearticle} from "../../Redux/Actions/articlesAction";
import {useDispatch} from "react-redux";
import { useCart } from "react-use-cart";


function LoginClient() {
 const {
 items,
 cartTotal,
 emptyCart,
 clearCartMetadata
 } = useCart();
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const[email,setEmail]=useState('');
 const[password,setPassword]=useState('');


 const handleSubmit=async(event)=>{
 event.preventDefault();
 const objetuser = {
 email: email,
 password :password
 };
 await Axios.post("/users/loginclient/",
objetuser).then((res)=>{
 localStorage.setItem("CC_Token",
JSON.stringify(res.data.accessToken));
 localStorage.setItem("refreshToken",
JSON.stringify(res.data.refreshToken));
 localStorage.setItem("user", JSON.stringify(objetuser));
 localStorage.setItem("userId", JSON.stringify(res.data._id));

 let rep=window.confirm("Vous voulez valider  et payer la commande ?")
 if(rep){
 //update produits
 items.map((item)=>{
 const art={
 _id:item._id,
 titre: item.titre,
 contenu: item.contenu,
 prix: item.prix,
 qtestock: item.qtestock-item.quantity,
 couverture: item.couverture,
 sujet: item.sujet,
 jounaliste: item.jounaliste
 }
 dispatch(updatearticle(art));
 });

 //Ajout de commande
 let client=localStorage.getItem("userId").replace(/"([^"]+(?="))"/g,'$1')
 const objetcommande={
 total: cartTotal,
 refclient: client
 }

 Axios.post("/commandes/",objetcommande).then((res)=>{
 items.map((lig)=>{
 const ligne={
 refcommande:res.data._id,
 refarticle:lig._id,
 quantitecommandee:lig.quantity,
 totligne:lig.quantity*lig.price}

 Axios.post("/lignescommandes/",ligne).then((response)=>{
 console.log(ligne)
 }).catch((err)=>{console.log(err) })
 });
 })
 }
 //Vider le cart
 emptyCart();
 clearCartMetadata();
 
 }).catch(error => {
 console.log(error)
 });

 }
 return (
 <>
 <div>
 <Button variant="outlined" color="error" size="medium">
 <Link to={"/register"}
style={{"textDecoration":"none","color":"red"}}>
 Si vous ne disposez pas de compte veuillez vous enregistrer
 </Link>
 </Button>
 <Box sx={{ marginTop : 10, marginLeft : 40, border:"solid blue",
width:300, padding:10}}>
 <form style={{ marginLeft: 8}}>
 <div>
 <TextField
 variant="outlined"
label="Email"
onChange={(event)=>setEmail(event.target.value)}
 required />
 </div>
 <div>
 <TextField
 variant="outlined"
type="password"
label="Password"
onChange={(event)=>setPassword(event.target.value)
}
 required />
 </div>
 <div>
 <Button color="error"
variant="contained" onClick={(event)=>handleSubmit(event)}> <Link to={"/stripePayment/"+cartTotal}>valider et payer la commande </Link> </Button>
 </div>
 </form>
 </Box>
 </div>
 </>
 );
}
export default LoginClient; 
