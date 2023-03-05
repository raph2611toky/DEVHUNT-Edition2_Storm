import face1 from'../../assets/faces/face6.jpg'
import './Profilheader.css'
import { Link } from 'react-router-dom'
const Profilheader=()=>
{
    const user = JSON.parse(sessionStorage.getItem('user'))

    return(
    <div className="Profil-header">
        <img src={face1} alt="face13" className="Profilheader-face1"/>
        <div className="Profil-presentation">  
        <h1>{user.pseudo}</h1>
            <div className="profil-info">
                <div>
                    <p>Matricule</p>
                    <p>{user.matricule}</p>
                </div>
                <div>
                    <p>E-mail</p>
                    <p>{user.email}</p>
                </div>
                <div>
                    <p>Niveau</p>
                    <p>{user.niveau}</p>
                </div>
            </div>
        </div>
    <div className="prodilheader-deco">
        <div className="profilheader-icon">
            <i className="mdi mdi-star-outline"/>
            <i className="mdi mdi-star-outline"/>
            <i className="mdi mdi-star-outline"/>
            <i className="mdi mdi-star-outline"/>
            <i className="mdi mdi-star-outline"/>
       </div>
       <Link to="/modif"><button className="profilheader-btn">Modificaton des données</button></Link>
    </div>
    </div>)
} 
export default Profilheader