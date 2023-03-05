import React,{useState,useContext} from "react";
import axios from "axios";
import './Reponse.css'
import img from '../../assets/faces/america.jpg'
import img1 from '../../assets/faces/face29.jfif'
import Mycontext from "../../context/Mycontext";



const Reponse = ({setShowQuestion,setanswerQuestion,question}) => {

    const [file,setfile] = useState('')
    const [detail,setdetail] = useState('')
    const idQuestion = question._id
    const {user} = useContext(Mycontext)
    const idResponse = user._id 

    console.log(idQuestion)
    console.log(idResponse)

    const handleFile = (e)=>{
        setfile(e.target.files[0])
    }

    const handleDetail = (e)=>{
        setdetail(e.target.value)
    }

    const handleQuestion = (e)=>{
        e.preventDefault()

        setShowQuestion(true)
        setanswerQuestion(false)
        const data = new FormData()
        data.append('idQuestion',idQuestion)
        data.append('idResponse',idResponse)
        data.append('description',detail)
        data.append('image',file)

        axios
        .post('http://localhost:3001/api/reponseQuestion',data)
        .then(res=> {
            console.log(res)
            window.location.reload()
        })
        .catch(err=>{
            console.log(err)
        })

    }


    return(
        <div className="AllReponse">
            <div className="Question">
                <div className="myQuestion">
                    <div className="profile">
                        <img src={img1} alt="img1" />
                        <span>
                            <h1>{question.user.pseudo}</h1>
                            <p>{question.user.niveau}</p>
                        </span>
                    </div>
                    <h3>Quéstion poser:</h3>
                    <div className="title">
                    <h1>{question.title}</h1>
                    </div>
                    
                    <div className="description">
                        <p>
                            {question.contenu.description}
                        </p>
                    </div>

                    <div className="file">
                       { <img src={`http://localhost:3001/images/${question.contenu.fichiers[0]}`} alt="img" />}
                    </div>
                </div>
                

                <div className="AllAnswer">
                    <h3>{question.reponse.length} Réponses:</h3>
                    {
                        question.reponse.map((data,index)=>{
                            return(
                                <div key={index}>
                                    <div className="description">
                                        <p>
                                            {data.description}
                                        </p>
                                    </div>

                                    <div className="file">
                                        <img src={`http://localhost:3001/images/${data.fichiers}`} alt="img" />
                                    </div>
                                    <div className="profile">
                                        <img src={img1} alt="img1" />
                                        <span>
                                            <h1>{data.userSender.pseudo}</h1>
                                            <p>{data.userSender.niveau}</p>
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                
            </div>

            <div className="Reponse">
                <h3>Votre Réponse:</h3>
            <form onSubmit={handleQuestion}>
                

                <div className="contentFile">
                    
                    <label htmlFor="image">images</label><br />
                    <div className="contentAll">
                        <span>
                                <i className="fas fa-camera"></i>
                                <p>choisir une fichier</p>
                            </span>
                        <div className="right">
                            <button>Fichier</button>
                            <input type="file" accept="image/*,png,jpeg,jpg"  onChange={handleFile} />
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
    )
}

export default Reponse;