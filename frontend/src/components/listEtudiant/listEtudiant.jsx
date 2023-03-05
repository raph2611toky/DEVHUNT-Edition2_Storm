import { useEffect,useState } from 'react'
import axios from 'axios'

import face1 from '../../assets/faces/face28.png'
import face2 from '../../assets/faces/face29.jfif'
import face3 from '../../assets/faces/face30.png'
import face4 from '../../assets/faces/face31.jpeg'
import './listEtudiant.css'


export const ListEtudiant = () => {

  //Un  sidebar pour recuperer les etudiants de l'ENI

    const [etudiants,setEtudiants] = useState([])

    useEffect(()=>{
        axios
        .get("http://localhost:3001/api/getAllEtudiant")
        .then((res)=>{
            setEtudiants(res.data)
        })
    },[])

    return(
        <div className="asideTwo">
                <h1>Liste étudiants</h1>
                {
                    etudiants.map((data,index)=>{
                        
                        return(
                            <div key={index} className="contentAll">
                                <div className="liste">
                                    <div className="img">
                                        <img src={face1} alt="face1" />
                                    </div>
                                    <div className="name">
                                        {data.pseudo}
                                    </div>
                                </div>

                                <div className="fas fa-rectangle-list" style={{color:"#0090e7"}}></div>
                            </div>
                        )
                    })
                }
                <div className="plus">
                    <p>voir plus </p>
                    <i className='fas fa-arrow-right'></i>
                </div>
            </div>
    )
}