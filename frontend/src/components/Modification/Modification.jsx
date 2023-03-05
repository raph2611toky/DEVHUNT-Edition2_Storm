import React,{useState} from 'react'
import'./Modification.css'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Link} from'react-router-dom'
const Modification=()=>
{
    const [Niveau, setNiveau] = useState("L1")
    const [pseudo,changePseudo]= useState('') 
    const [Mail,changeMail]= useState('')
    const [passWord,changepassWord]= useState('')

    const handlePseudo= e =>
        {
            changePseudo(e.target.value)
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
   const  Notif =()=>
    {
        toast.success("Bravo félicitation");
    }
    return(
    <div className="Modif-parent">
       <h1>Modification</h1>
       <div className="Modif-RAD">
         <div className="modif-form">
                <form className="form-modif">
                    <div className="modif">
                        <label htmlFor="pseudo">Pseudo</label>
                        <input id="pseudo" type="text" value={pseudo} onChange={handlePseudo} className="modif-input"/>
                    </div>
                    <div className="modif">
                        <label htmlFor="E-mail">E-mail</label>
                        <input id="E-mail" type="mail" value={Mail} onChange={handleMail} className="modif-input"/>
                    </div>
                    <div className="modif">
                        <label htmlFor="pass-word">Mot de passe</label>
                        <input id="pass-word" type="password" value={passWord} onChange={handlepassWord} className="modif-input"/>
                    </div>
                    <div className="modif">
                        <label htmlFor="Niveau">Niveau</label>
                        <select className="modif-input" value={Niveau} onChange={changeNiveau}>
                            <option value="L1">L1</option>
                            <option value="L2">L2</option>
                            <option value="L3">L3</option>
                            <option value="M1">M1</option>
                            <option value="M2">M2</option>
                        </select>
                    </div>
                  <div className="modif-btn"> 
                    <button className="modifBtn1" onClick={Notif} > Modification</button>
                    <Link to="/Home"><button className="modifBtn2" onClick={Notif}> Annuler</button></Link>
                 </div>
                </form>
                <ToastContainer position={"top-right"} 
                autoClose={2000}/>
         </div>
       </div>
    </div>)
}
export default Modification