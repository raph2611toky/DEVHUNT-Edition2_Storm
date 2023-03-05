import React from "react";
import './sideRight.css'
import { ListEtudiant } from "../listEtudiant/listEtudiant";
import { ListClub } from "../ListeClub/ListeClub";

const SideRight = ({setaskQuestion,setShowQuestion,setanswerQuestion}) =>{

    const handleQuestion= ()=>{
        setaskQuestion(true)
        setanswerQuestion(false)
        setShowQuestion(false)
    }

    return(
        <div className="sideRight">
            <div className="postQuestion">
                <button onClick={handleQuestion}>Poser votre Question</button>
            </div>
            <ListClub/>
            <ListEtudiant/>
        </div>
    )
}

export default SideRight;