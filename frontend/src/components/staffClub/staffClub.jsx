import React,{useEffect,useState} from "react";
import './staffClub.css'
import axios from "axios";
import club from '../../assets/clubC2E.png'
import {Link} from 'react-router-dom'

const StaffClub = () =>{


    const [title,settitle] = useState('')
    const [file,setfile] = useState('')
    const [detail,setdetail] = useState('')


    const handleTilte = (e)=>{
        settitle(e.target.value)
    }

    const handleFile = (e)=>{
        setfile(e.target.files[0])
    }

    const handleDetail = (e)=>{
        setdetail(e.target.value)
    }

    const handleQuestion = (e)=>{
        e.preventDefault()
        // const data = new FormData()
        // data.append('title',title)
        // data.append('idEtudiant',id)
        // data.append('file',file)
        // data.append('description',detail)

        // axios
        // .post('http://localhost:3001/api/createQuestion',data)
        // .then(res=> {
        //     console.log(res.data)
        // })
        // .catch(err=>console.log(err))
    }

    
    return(
        <div className="contentStaff">
            <div className="nameClub">
                
                <div className="left">
                    <img src={club} alt="club" />
                    <span>
                        <h3>C2E</h3>
                        <p>Clube d'entraide eni</p>
                    </span>
                </div>

                <div className="return">
                    <Link to="/home"><button>back <i className="fas fa-arrow-right"></i></button></Link>
                </div>
            </div>
           
<div className="StaffClub">
    
            <div className="inputeQuestion">
            <form onSubmit={handleQuestion}>
                <div className="titleQuestion">
                    <div className="contentTitle">
                        <label htmlFor="titre">Titre Question <span style={{color:'red'}}>*</span> </label>
                        <p>Soyez précis et imaginez que vous posez une question à une autre personne.</p>
                    </div>
                    <div className="contentAll">
                            <i className="fas fa-pen-to-square"></i>
                            <input type="text" className="input"  name="title" id="title" placeholder="ex: How to use mongo db with node JS ?" onChange={handleTilte} value={title}/>
                        
                    </div>
                </div>

                <div className="contentFile">
                    
                    <label htmlFor="image">images</label><br />
                    <div className="contentAll">
                        <div className="right">
                            <button>
                                Fichier
                            <input type="file" accept="image/*,png,jpeg,jpg"  onChange={handleFile} />
                            </button>
                            
                        </div>
                    </div>
                </div>

                <div className="contentDetail">
                    <label htmlFor="detail">Detail <span style={{color:'red'}}>*</span></label><br />
                    <p>
                        Quels sont les détails de votre problème ?
                        Présentez le problème et <br /> développez ce que vous avez mis dans le titre. Minimum 20 caractères.
                    </p>
                    <textarea name="detail" id="detail"  rows="10" onChange={handleDetail} value={detail} ></textarea>
                </div>
                
                <button type="submit">Envoyer</button>
                
            </form>
        </div>
        </div>
        </div>
        
    )
}

export default StaffClub;