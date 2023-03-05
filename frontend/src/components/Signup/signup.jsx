import React,{useState} from 'react'
import axios from 'axios'
import './signup.css'
import { useContext } from 'react'
import Mycontext from '../../context/Mycontext'
import { useNavigate,Link } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Signup =()=>
{
    const navigate= useNavigate()
    const {setUser,setToken} = useContext(Mycontext)
    const [nom,changeNom]= useState('')
    const [Niveau, setNiveau] = useState("L1")
    const [pseudo,changePseudo]= useState('') 
    const [matricule,changeMatr]= useState('')
    const [Mail,changeMail]= useState('')
    const [passWord,changepassWord]= useState('')

     const handleNom= e =>
    {
        changeNom(e.target.value)
    }
    
     const handlePseudo= e =>
    {
        changePseudo(e.target.value)
    }
   
     const handleMatricule= e =>
    {
        changeMatr(e.target.value)
    }
     const handleMail= e =>
    {
        changeMail(e.target.value)
    }
     const handlepassWord= e =>
    {
        changepassWord(e.target.value)
    }

    const changeNiveau = (e)=>{
        setNiveau(e.target.value)
    }

    const handleCreateAccount=(e)=>{
       e.preventDefault()
       axios
       .post('http://localhost:3001/api/signup',{nomComplet: nom,pseudo: pseudo,matricule: matricule,email: Mail,password: passWord,niveau: Niveau})
       .then(res=>{
           toast.success("Bieuvenue Chez ENI-Sharing")
           console.log(res)
           sessionStorage.setItem("user", JSON.stringify(res.data.newEtudiant))
           sessionStorage.setItem("token", JSON.stringify(res.data.authToken))
           setUser(res.data.newEtudiant)
           setToken(res.data.authToken)
           navigate('/Home')
          
       })
       .catch(err=>{
        //    toast.error("veiller vérifier  les données remplies") 
           console.log(err)
          
       })
    }
    return(
    <div className="signUp">
        <div className="SignIn-parent">
         <div className="SingnIn-mess">
            <div className="SignIn-welcome">
                <p>Bienvenu sur ENI_Sharing</p>
            </div>
         </div>
        <div className="signIn-form1">
            <h1>Création d'un compte</h1>
            <form onSubmit={handleCreateAccount}  className="signIn-form">
                <div className="Sing">
                    <label htmlFor="nom">Nom et Prénom</label>
                    <input id="nom" type="text" value={nom} onChange={handleNom} className="sign-input"/>
                </div>
                <div className="Sing">
                    <label htmlFor="pseudo">Pseudo</label>
                    <input id="pseudo" type="text" value={pseudo} onChange={handlePseudo} className="sign-input"/>
                </div>
                <div className="Sing">
                    <label htmlFor="matricule">Matricule</label>
                    <input id="matricule" type="text" value={matricule} onChange={handleMatricule} className="sign-input"/>
                </div>
                <div className="Sing">
                    <label htmlFor="E-mail">E-mail</label>
                    <input id="E-mail" type="mail" value={Mail} onChange={handleMail} className="sign-input"/>
                </div>
                <div className="Sing">
                    <label htmlFor="pass-word">Mot de passe</label>
                    <input id="pass-word" type="password" value={passWord} onChange={handlepassWord} className="sign-input"/>
                </div>
                <div className="Sing">
                    <label htmlFor="Niveau">Niveau</label>
                    <select className="sign-input" value={Niveau} onChange={changeNiveau}>
                        <option value="L1">L1</option>
                        <option value="L2">L2</option>
                        <option value="L3">L3</option>
                        <option value="M1">M1</option>
                        <option value="M2">M2</option>
                    </select>
                </div>
                
                <button type="submit" className="signIn-butn">Créer</button>
                <div className="linkCreatCount">
                        <p style={{color: "black"}}>J'ai dejà un compte? <Link to="/login" style={{color:"#0969da"}}>Se connecter.</Link> </p>
                </div>
            </form>
            <ToastContainer positon={"top-left"} autoclose={3000}/>
        </div>
    </div>
</div>
    )
}
export default Signup
