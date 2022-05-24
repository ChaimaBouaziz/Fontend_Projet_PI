import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import {addarticle} from "../../Redux/Actions/articlesAction";
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

 const AjoutArticle=()=>{

    const [titre, setTitre] = useState("");
    const [contenu, setContenu] = useState("");
    const [prix, setPrix] = useState("");
    const [qtestock, setQtestock] = useState("");
    const [sujet, setSujet] = useState("");
    const [jounaliste, setJounaliste] = useState("");
    const [files, setFiles] = useState("")   
   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadSujets());
        dispatch(loadJournalistes());
        
    },[dispatch]);

      const sujets = useSelector((state) =>state.allsujets.sujets);
      const jounalistes = useSelector((state) =>state.alljournalistes.journalistes);
      
  
      const handleSubmit = async(event)=> {
          event.preventDefault(); 
          const art={
            titre:titre,
            contenu:contenu,
            prix:prix,
            qtestock:qtestock,
            couverture : files[0].file.name,
            sujet:sujet,
            jounaliste:jounaliste,
            
            };   
            dispatch(addarticle(art)); 
            navigate("/articles");
       }
        return (
         
        <div className="container">
       
           <form style={{ marginLeft: 8}}>
             <div>
           <Button variant="contained" onClick={(event)=>handleSubmit(event)}>Ajout</Button>
            </div>
             <FormControl> 
        
              <TextField
                            variant="outlined"
                            label="Titre"
                            value={titre}
                            onChange={e => setTitre(e.target.value)}
                            required /> 
              <TextField
                            variant="outlined"
                            type="String"
                            label="contenu"
                            value={contenu}
                            onChange={e => setContenu(e.target.value)}
                            /> 
              <TextField
                            variant="outlined"
                            type="Number"
                            label="Prix"
                            value={prix}
                            onChange={e => setPrix(e.target.value)}
                             /> 
              <TextField
                            variant="outlined"
                            type="Number"
                            label="Quantité"
                            value={qtestock}
                            onChange={e => setQtestock(e.target.value)}
                            />
                <TextField
                   variant="outlined"
                   select
                   label="Sujet"
                   value={sujet}
                   helperText="Sélectionner un sujet"
                   onChange={e => setSujet(e.target.value)}
                    >
               {
               sujets ?    
               sujets.map((sjt)=>
                    <MenuItem  key={sjt._id} value={sjt._id}>{sjt.nomsujet}</MenuItem>
               )
               :null
               }
             </TextField>
             <TextField
                   variant="outlined"
                   select
                   label="Journalistes"
                   value={jounaliste}
                   helperText="Sélectionner un journaliste"
                   onChange={e => setJounaliste(e.target.value)}
                    >
               {
               jounalistes ?    
               jounalistes.map((jn)=>
                    <MenuItem  key={jn._id} value={jn._id}>{jn.nomJournaliste}</MenuItem>
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
export default AjoutArticle

