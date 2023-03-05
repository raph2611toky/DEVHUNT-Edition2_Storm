import {useEffect, useState} from 'react'
import './club.css'
import face from '../../assets/faces/face11.jpg'
import AjoutClub from './AjoutClub'
import axios from 'axios'


const Club = ()=>{

    const [ajoutClub,setAjoutClub] = useState(false)
    const [club,setClub] = useState([])

    const newClub = ()=>{
        setAjoutClub(true)
    }

    useEffect(()=>{
       
        axios
        .get("http://localhost:3001/api/getAllClub")
        .then(res=>{
            console.log(res)
            setClub(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

   return(
       <>

{     ajoutClub?  <AjoutClub setAjoutClub={setAjoutClub}/> :

       <div className="clubs">
           <div className="clubs__container">
               <div className="clubs__container-header">
                   <h3>Clubs</h3>
                   <span>Integrere des clubs pour plus de partages !</span>
                   <div className="search">
                       <div>
                        <i className="mdi mdi-magnify"></i>
                        <input type="text" placeholder="Rechercher un club"/>
                       </div>
                       <button>Recherche</button>
                   </div>
               </div>
               <button className="add" onClick={newClub}>Ajouter un club</button>
           </div>
           <div className="clubs__body">
               <h3>Les Clubs </h3>
               {
               club.map((data,index)=>{
                return(
                    <div className="club">
                            <div className="club__photo">
                                <img src={face} alt="club"/>
                            </div>
                            <div className="club__info">
                                <h3>{data.nom}</h3>
                                <p>{data.description}</p>
                                <span>ceer le : <strong>{data.createdAt}</strong></span>
                            </div>
                        </div>
                )
               })
               }

           </div>
       </div>}

       </>
   )
}

export default Club