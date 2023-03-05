import React from 'react'
import './Landingpage.css'
import landing from '../assets/landingBG.gif'
import {Link} from 'react-router-dom'
import logo from '../assets/logo.svg'
import signin from '../assets/singin.svg'
import signup from '../assets/signup.svg'

function Landingpage() {
    return (
        <div className="landingPage">
            <div className="landingpage__container">
                <header className="landingPage__header">
                    <div className="logo">
                        <img src={logo} alt="logo"/>
                    </div>
                    <div className="action">
                        <Link to="/login">
                            <span className="login">
                            <img src={signin} alt="signin"/>
                            <p>Se connecter</p>    
                        </span></Link>
                        <Link to="/signup"><span className="sign__up">
                            <img src={signup} alt="signup"/>
                            <p>Créer un compte</p>    
                        </span></Link>
                    </div>
                </header>
                <div className="landingPage__body">
                            <div className="landingPage__body-top">
                                <div className="landingPage__body-top__left">
                                    <img src={landing} alt="langingPage"/>
                                </div>
                                <div className="landingPage__body-top__right">
                                    <h1 className="top"><span>Partager</span> <small>Vos connaissance</small></h1>
                                    <h1 className="bottom"><span>Defier</span> <small>Vos compétences</small></h1>
                                </div>
                            </div>
                            <div className="landingPage__body-bottom">
                                    <div className="landingPage__body-bottom__container">
                                        <h1>C'est un Moyen de partage et de challenge entre les etudiants </h1>
                                        <p>Il ne suffit juste pas d'aller à l'ecole pour augmanter ses connaissance, partager entre ses collegue c'est un bon moyen d'augmenter en connaissance
                                            Il ne suffit juste pas de partager, il faut aussi faire des challenges! Vive l'innovation.
                                        </p>
                                        <button>Connecter</button>
                                    </div>
                           </div>
                </div>

                <div className="footer">
                    <div className="footer__container">
                            <div className="footer__content-left">
                                <img src={logo} alt=""/>
                            </div>

                            <div className="footer__content-right">
                                <div className="action">
                                    <span className="login">
                                        <img src={signin} alt="signin"/>
                                        <p>Se connecter</p>
                                    </span>
                                    <span className="sign__up">
                                        <img src={signup} alt="signup"/>
                                        <p>Créer un compte</p>
                                    </span>
                                </div>
                            </div>
                                
                            <div className="conatct__admin">
                                    <i className='fab fa-facebook'></i>
                                    <i className='fas fa-envelope'></i>
                                    <i className='fab fa-instagram-square'></i>
                            </div>
                            
                    </div>
                    <hr/>
                    <div className='copyRight'>
                        <p>
                            @copyright by Strom 2023.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landingpage
