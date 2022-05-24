import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {useDispatch,useSelector} from "react-redux";
import {deletearticle} from "../../Redux/Actions/articlesAction"
import { Link, useNavigate } from 'react-router-dom'; 

const AfficheArticles=()=>{

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleDelete=(id)=>{
    if(window.confirm("sipprimer la catégorie O/N")) {
    dispatch(deletearticle(id));
    navigate("/articles");
    }
   } 
   
 const articles = useSelector((state) =>state.allarticles.articles);
 return(
 <>
 <Button variant="contained"  color="warning" size="medium">
 <Link to={"/addArticles/"}
style={{"textDecoration":"none","color":"white"}}>
 Ajout
 </Link>
 </Button>

 <Grid container spacing={2} columns={15} marginTop={10}>

 {articles.map((row) => (
 <Grid   item xs={5} key={row._id}>
 <Card  sx={{ maxWidth: 400 ,height:500 }} key={row._id}>
 <CardMedia
 component="img"
 height={230}
 image={"images/"+row.couverture}
 alt={row.titre}
 />
 <CardContent>
 <Typography gutterBottom variant="h5" component="div">
 {row.titre}  {" : "+row.sujet.nomsujet}
 </Typography>

 {row.contenu}
 <Typography variant="body2" color="text.secondary">
 {row.prix} TND
 </Typography>
 <Typography variant="body2" color="text.secondary">
 {row.jounaliste.nomJournaliste}
 </Typography>
 </CardContent>
 
 <CardActions>
 <Link to={"/editArticles/" + row._id}
style={{"textDecoration":"none","color":"white"}}> <Button variant="contained"
color="secondary" size="small">Modifier</Button></Link>
 <Button variant="contained" color="error" size="small"
onClick={()=>handleDelete(row._id)}>Supprimer</Button>
 </CardActions>

 </Card>
 </Grid>
 )
 )
 }

 </Grid>
 </>
 )
 }
export default AfficheArticles 