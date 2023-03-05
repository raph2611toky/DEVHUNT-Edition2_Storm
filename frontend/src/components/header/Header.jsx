import React,{useState,useEffect} from 'react'
import face from '../../assets/faces/face10.jpg'
import logo from '../../assets/logo.svg'
import {Link, useNavigate} from 'react-router-dom'
import './header.css'
import { useContext } from 'react'
import Mycontext from '../../context/Mycontext'
import axios from 'axios'

function Header() {

   const {user} = useContext(Mycontext)
   const authToken = JSON.parse(sessionStorage.getItem('token'))
   const idEtudiant = user._id 

   console.log(idEtudiant, authToken)
   const navigate = useNavigate()

    const [showDetail, setShowDetail] = useState(false)
    const [rotate, setRotate] = useState('')
    const [detailClass,setDetailCLass] = useState('')
    const [showNotif, setshowNotif] = useState(false)

    const showDetails = (e)=>{  
        e.stopPropagation()
        setShowDetail(!showDetail)
        setshowNotif(false)
    }


    useEffect(() => {
        showDetail? (setDetailCLass('slow-down')) : setDetailCLass('')
        showDetail? setRotate('rotate') : setRotate('')
    }, [showDetail])

    const logOut = ()=>{
        axios
        .post('http://localhost:3001/api/logout',{authToken,idEtudiant})
        .then(res=>{
            navigate("/login")
        })
        .catch(err=>{
            console.log(err)
        })
    }


    return (
     <div className="header">
        <div className="header-container">
             <div className="logo">
                 <img src={logo} alt="logo"/>
             </div>
             <div className="search">
                 <input type="searh" placeholder="Rechercher ici..."/>
                 <i className="mdi mdi-magnify"></i>
             </div>
             <div className="user-container">                   
                 <div className="notification__bell">
                    <i className=" mdi mdi-bell"></i>
                    <div></div>
                 </div>
                 <div className="user-profile" onClick={showDetails}>
                     <div className="user-image">
                         <img src={face} alt="user"/>
                     </div>
                     <p>
                         <span>{user.pseudo}</span>
                         <small>{user.niveau}</small>
                     </p>
                     <i className={`mdi mdi-arrow-up-drop-circle-outline ${rotate}`}></i>

                     {
                         showDetail && (
                        <div className={`more-details ${detailClass}`}>
                            <div className="content">
                                <span><Link to="/profil"><i className="mdi mdi-account"></i> <small>Profile</small></Link></span>
                                <span><Link to="/modif"><i className="mdi mdi-grease-pencil"></i> <small>Modifier profile</small></Link></span>
                                {
                                    user.isAdmin && (<span><Link to="/Ajout"><i className="mdi mdi-account-plus"></i> <small>Ajouter un membre</small></Link></span>)
                                }
                                <span><Link><i className="mdi mdi-account-multiple"></i> <small>Club</small></Link></span>
                                <span><Link><i className="mdi mdi-comment-question-outline"></i> <small>Questions déjà posèes</small></Link></span>
                                <span><Link><i className="mdi mdi-trophy-award"></i> <small>Points</small></Link></span>
                                <span onClick={logOut}><Link><i className=" mdi mdi-logout"></i> <small>Se deconnecter</small></Link></span>
                            </div>
                        </div>
                     )
                     }
                 </div>
             </div>
        </div>
    </div>
    )
}

export default Header
