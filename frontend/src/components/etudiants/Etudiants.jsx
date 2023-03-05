import axios from 'axios'
import React, { useEffect, useState } from 'react'
import face from '../../assets/faces/face1.jpg'
import './etudidiants.css' 

function Etudiants() {

    const [etudiants,setEtudiants] = useState([])

    useEffect(()=>{
        axios
        .get("http://localhost:3001/api/getAllEtudiant")
        .then((res)=>{
            setEtudiants(res.data)
        })
    },[])
    return (
        <div className="listEtudiants">
             <h2>Tout les etudiants de l'ENI</h2>
             <div className="list__etudiants-container">
                   {
                    etudiants.map( (etudiant, index)=>{
                    return(
                    <div className="etudiant">
                        <div className="etudiant__image">
                            <img src={face} alt=""/>
                        </div>
                        <div className="etudiant__info">
                            <span>{etudiant.pseudo}</span>
                            <span>{etudiant.niveau}</span>
                            <small>{etudiant.email}</small>
                        </div>
                    </div>
                    )})}
                   
             </div>
        </div>
    )
}

export default Etudiants
