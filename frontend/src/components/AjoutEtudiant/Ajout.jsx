import axios from 'axios'
import React,{useState} from'react'
import chapeau from'../../assets/chapeau.png'
import './Ajout.css'
import{ToastContainer,toast} from'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Ajout =()=>
{
const [nom,changeNom]= useState('')
const [matricule,changeMatr]= useState('')


const handleNom= e =>{
        changeNom(e.target.value)
    }

const handleMatricule= e =>{
        changeMatr(e.target.value)
    }

const submitFunc = (e)=>{
    e.preventDefault()
    axios.post("http://localhost:3001/api/listEtudiant",{nomComplet: nom,matricule: matricule})
    .then(res=>{
        toast.success("L'ajout est un succes")
        console.log(res)
    })
    .catch(err=>{
        toast.error("Un problème est survenu lors de l'ajout , recommancer s'il vous plait ")
        console.log(err)
    })

}
    return(
    <div className="Ajout-RAD" onSubmit={submitFunc}>
        <div className="Ajout-parent">
        <div className="Ajout-titre">
            <img src={chapeau} alt="chapeau" className="ajout-chapeau"/>
            <h1>Ajout d'un étudiant</h1>
        </div>
            <form className="Ajout-form">
                <div className="Ajout">
                        <label htmlFor="nom">Nom et Prénom </label>
                        <input id="nom" type="text" value={nom} onChange={handleNom} className="Ajout-input"/>
                </div>
                <div className="Ajout">
                        <label htmlFor="matricule">Matricule</label>
                        <input id="matricule" type="text" value={matricule} onChange={handleMatricule} className="Ajout-input"/>
                </div>
                <button type="submit" className="Ajout-btn">Ajout</button>
            </form>
            <ToastContainer position={"top-center"}/>
        </div>
    </div>)
}
export default Ajout