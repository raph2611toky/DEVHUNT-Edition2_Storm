import axios from 'axios'
import React, { useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'
import { useContext } from 'react'
import logo from '../../assets/logo.svg'
import Mycontext from '../../context/Mycontext'
import {ToastContainer,toast} from'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './login.css'

const Login = () => {
    
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {setUser,setToken} = useContext(Mycontext)


    const handleEmail = (e) =>{
        setEmail(e.target.value)
    }
    
    const handlePassword = (e) =>{
        setPassword(e.target.value)
    }

    const submitFunc = (e)=>{
        e.preventDefault()
        toast("Un instant s'il vous plait")
        axios
        .post("http://localhost:3001/api/login",{email: email,password: password})
        .then(res=>{
            toast.success("Rebienvenue à vous")
            console.log(res)
            sessionStorage.setItem("user", JSON.stringify(res.data.etudiantFound))
            sessionStorage.setItem("token", JSON.stringify(res.data.authToken))
            setUser(res.data.etudiantFound)
            setToken(res.data.authToken)
            navigate('/Home')
        })
        .catch(err=>{
            toast.error("Remplissez bien le formulaire s'il vous plait")
            console.log(err)
        })
    }

    return(
        <div className='Login'>
            <div className="CenterLogin">
                <div className="logo">
                    <img src={logo} alt="logo" />
                    <p>Connectez-vous sur logo</p>
                </div>
                <form className='formLogin' onSubmit={submitFunc}>
                    <div className="inputLogin">
                        <div className="mail">
                            <label htmlFor="email">Adresse email</label>
                            <input type="email" value={email} name="email" id="email" onChange={handleEmail} />
                        </div>
                        

                        <div className="password">
                            <div className="labelPassword">
                                <p>Mot de passe</p>
                                <a href='#' style={{color:"#0969da"}}>mot de passe oublié ?</a>
                            </div>
                            
                            <input type="password" value={password} name="password" id="password" onChange={handlePassword} />
                        </div>
                        

                        <div className="submit">
                            <button type='submit'>Se connecter</button>
                        </div>
                    </div>

                    <div className="linkCreatCount">
                        <p>Nouveau à notre site? <Link to="/signup" style={{color:"#0969da"}}>Creer un compte.</Link> </p>
                    </div>
                </form>
                <ToastContainer positon={"top-left"}/>
            </div>
        </div>
    )
}

export default Login;