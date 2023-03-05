import Profilheader from "../ProfilHeader/Prodilheader"
import './UserProfil.css'
const Profil =()=>
{



    return(
    <div className="profil-parent">
        <Profilheader/>
       <div className="profil-capicité">
            <div className="profil-atout">
                <div className="profil-statistique">
                    <h2 className="profilstat-title">Statistique </h2>
                    <table className="profil-table">
                        <thead>
                            <tr className="profilstat-titre">
                                <th><i className="mdi mdi-comment-check-outline"/>Reponse</th>
                                <th><i className="mdi mdi-comment-question-outline"/>Question</th>
                                <th><i className="mdi mdi-trophy"/>Challenge gagné</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="profilstat-contenu">
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="profil-autre">
                    <h2>Autre</h2>
                    <p>Autre information que les étudiants reçois<br/>
                    pour augmenter leurs connaissance et leurs capacité intlectuel
                    </p>
                </div>
           </div>
         <div className="profil-activity">
            <div className="profil-club">
                <h2>Club</h2>
                <p><i className="mdi mdi-star-circle"/>Cyber sécurité</p>
                <p><i className="mdi mdi-star-circle"/>Club d'Entraide de l'ENI</p>
                <p><i className="mdi mdi-star-circle"/>C3LF</p>
            </div>
            <div className="profil-activité">
                <h2>Activité</h2>
                 <ul className="profil-challenges">
                    <div>
                        <li>Challenges faits</li>
                        <ul className="profil-challenge">
                            <li><i className="mdi mdi-check-all"/>Challenge 1</li>
                            <li><i className="mdi mdi-check-all"/>Challenge 2</li>
                            <li><i className="mdi mdi-check-all"/>Challenge 3</li>
                        </ul>
                    </div>
                    <div>
                        <li> prochaine Challenges</li>
                        <ul className="profil-challenge"> 
                            <li><i className="mdi mdi-chevron-double-right"/>Challenge 4</li>
                            <li><i className="mdi mdi-chevron-double-right"/>Challenge 5</li>
                            <li><i className="mdi mdi-chevron-double-right"/>Challenge 6</li>
                        </ul>
                    </div>
                </ul>
            </div>
        </div>
       </div>
    </div>)
}
export  default Profil