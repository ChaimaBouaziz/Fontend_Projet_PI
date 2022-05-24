import React, { useState, useEffect } from "react";

import { useNavigate,useParams } from "react-router-dom";

import {loadSinglearticle,updatearticle} from "../../Redux/Actions/articlesAction";
import {loadSujets} from "../../Redux/Actions/sujetsAction";
import {loadJournalistes} from "../../Redux/Actions/journalistesAction";


import {useDispatch, useSelector} from "react-redux";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

import { FilePond,registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

 const EditArticle=()=>{

   const [state, setState] = useState({ 
         titre: "", contenu:"",
        prix:"",qtestock:"",sujet:"",
        jounaliste:""
      });
 
       
    const [files, setFiles] = useState("")     
   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const params = useParams();
    const _id=params._id;  

    useEffect(() => {
        dispatch(loadSinglearticle(_id));
        dispatch(loadSujets());
        dispatch(loadJournalistes());
        setFiles(""); 
    },[_id,dispatch]);
  
      const article = useSelector((state) => state.allarticles.article);
      const sujets = useSelector((state) =>state.allsujets.sujets);
      const journalistes = useSelector((state) =>state.alljournalistes.journalistes);
      
  
    useEffect(()=>{
        setState(article);
        setFiles(article.couverture)
        },[article]);

      const handleSubmit = async(event)=> {
          event.preventDefault(); 
       
          const art={
            _id:_id,  
            titre:state.titre,
            contenu:state.contenu,
            prix:state.prix,
            qtestock:state.qtestock,
            couverture : files[0].file.name,
            sujet:state.sujet,
            journaliste:state.jounaliste
            };   
            dispatch(updatearticle(art)); 
            navigate("/articles");
       }

       const handelInputChange=(e)=>{
        const {name,value}=e.target;
         setState({...state,[name]:value});
    }

    const labeljounaliste=()=>{
        if( state.jounaliste){
       if( state.jounaliste.nomJournaliste) return "journaliste : "+state.jounaliste.nomJournaliste
       }
       else return null
    }

    const labelsujet=()=>{
        if( state.sujet){
        if( state.sujet.nomsujet) return "sujet : "+state.sujet.nomsujet
      }
        else return null
     }


      return (
         
        <div className="container">
       
           <form style={{ marginLeft: 8}}>
             <div>
           <Button color="secondary" variant="contained" onClick={(event)=>handleSubmit(event)}>Modifier</Button>
            </div>
             <FormControl> 
              <TextField name="titre"
                            variant="outlined"
                            label="Titre"
                            value={state.titre}
                            onChange={handelInputChange}
                            required 
                            style={{ margin: 10}}/> 
              <TextField name="contenu"
                            variant="outlined"
                            type="String"
                            label="contenu"
                            value={state.contenu}
                            onChange={handelInputChange}
                            style={{ margin: 10}}/>
              <TextField name="prix"
                            variant="outlined"
                            type="Number"
                            label="Prix"
                            value={state.prix}
                            onChange={handelInputChange}
                            style={{ margin: 10}}/>
              <TextField name="qtestock"
                            variant="outlined"
                            type="Number"
                            label="Quantité"
                            value={state.qtestock}
                            onChange={handelInputChange}
                            style={{ margin: 10}}/>
               
               <TextField name="sujet"
                   variant="outlined"
                   select
                   label={labelsujet()}
                   value={state.sujet}
                   onChange={handelInputChange}
                   style={{ margin: 10}}>
                     
               {
               sujets ?    
               sujets.map((sjt)=>
                    <MenuItem  key={sjt._id} value={sjt._id}>{sjt.nomsujet}</MenuItem>
               )
               :null
               }
             </TextField>
             <TextField name="jounaliste"
                   variant="outlined"
                   select
                   label={labeljounaliste()}
                   value={state.jounaliste}
                   onChange={handelInputChange}
                   style={{ margin: 10}}>
                    
               {
               journalistes ?    
               journalistes.map((jl)=>
                    <MenuItem  key={jl._id} value={jl._id}>{jl.nomJournaliste}</MenuItem>
               )
               :null
               }
             </TextField> 
               </FormControl>           
                 </form>
            
               <h4>Télécharger Image</h4>
               <FormControl>   
               <div style={{width:300, height:50}}>
             <FilePond
             files={files}
             allowMultiple={false}
             onupdatefiles={setFiles}
             labelIdle='<span class="filepond--label-action">Browse One</span>'
           />
             </div>
            </FormControl>

           </div> 
      );}
export default EditArticle
