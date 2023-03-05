import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import face from '../../assets/faces/face11.jpg'

function AjoutClub({setAjoutClub}) {

     const [searchStaf,setSearchStaf] = useState("")
     const [checkedStaf, setCheckedStaf] = useState(false)
     const [staf, setstaf] = useState([])
     const [newStaf,setNewStaf] = useState([])

     const [nomClub,setNomClub] = useState("")
    const [description,setDescription] = useState("")

     const [image,setImage] = useState("")


     const handleSearch= (e)=>{
          setSearchStaf(e.target.value)
     }

     const addDataToStaff = (param)=>{

                    const oldStaf = staf.map(data=>{
                        return data._id})
    
                    setstaf([...oldStaf, param._id])
         
     }

     const handleDescriptionClub = (e)=>{
         setDescription(e.target.value.trim())
     }
     const handleNomClub = (e)=>{
        setNomClub(e.target.value)
    }
    const handleLogoClub = (e)=>{
        setImage(e.target.files[0])
    }

     const submitFunc = (e)=>{
        e.preventDefault()

        const data = new FormData()
        data.append('nomClub',nomClub)
        data.append('description',description)
        data.append('image',image)
        data.append('membresStaff',staf)


        axios
        .post("http://localhost:3001/api/createNewClub",data)
        .then(res=>{
            console.log(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
        console.log(data)
     }
     

     const rechercheStaf = (e)=>{
        e.preventDefault()
        axios
        .get('http://localhost:3001/api/getAllEtudiant')
        .then((res)=>{
            setNewStaf(res.data.filter(data=>data.pseudo.toLowerCase() === searchStaf.toLowerCase()))
        })
        .catch(err=>{
            console.log(err)
        })
     }

     console.log(staf)

    return (
        <div className="ajoutClub">
            <div className="ajoutClub__container">
                <h2>Veillez remplir les champs suivants pour pouvoir creer un club, et assurrez-vous que votre club est dejà reconnu par les administrations!</h2>
                <form onSubmit={submitFunc}>
                    <div>
                        <label htmlFor="nom">
                            <strong>Nom du club : </strong><span>*</span>
                        </label>
                        <input type="text" placeholder="Nom du club..." id="nom" onChange={handleNomClub}/>
                    </div>
                    <div>
                        <label htmlFor="description">
                            <strong>Veillez decrire avec detail votre club, precisez ce que vous faites : </strong><span>*</span>
                        </label>
                        <textarea name="" id="description" onChange={handleDescriptionClub}></textarea>
                    </div>
                    <div>
                        <label htmlFor="staf">
                            <strong>Qui sont vos staf : </strong><span>*</span>
                        </label>
                        <div className="ajout__staf">
                            <div className="search"><input type="search" onChange={handleSearch} value={searchStaf}/><button onClick={rechercheStaf} className="recherche">Rechercher</button></div>
                            <div className="stafs">
                                {
                                    newStaf.map((data,index)=>{
                                        return(
                                            <div className="staf" key={index} onClick={()=>addDataToStaff(data)}>
                                                    <label htmlFor="newStaf">
                                                        <img src={face} alt="face"/>
                                                        <div className="info">
                                                        <span>{data.pseudo}</span>
                                                        <span>{data.niveau}</span>
                                                        </div>
                                                    </label>
                                                    <div className="check"></div>
                                                </div>
                                        )
                                    })
                                }

                                <div className="staf__container">
                                            
                                   {
                                       staf.map((data,index)=>{
                                           if(data){
                                               return (
                                                    <div className="staf" key={index}>
                                                    <label>
                                                        <img src={face} alt="face"/>
                                                        <div className="info">
                                                            <span>{data.pseudo}</span>
                                                            <span>{data.niveau}</span>
                                                        </div>
                                                    </label>
                                                </div>
                                              )
                                           }
                                       })
                                   }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="logo__container">
                        <h3>Logo du club s'il y en a : </h3>
                        <div className="logo">
                            <div><input id='club__club' type="file" accept="image/*" onChange={handleLogoClub}/><i className="mdi mdi-file-image"></i></div>
                            <label htmlFor="club__logo">Choisir une image</label>
                        </div>
                    </div>
                    <button type='submit'>Creer le club</button>
                </form>
            </div>
        </div>
    )
}

export default AjoutClub
