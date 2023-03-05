import React from 'react'
import { Link } from 'react-router-dom'
import './usernotfound.css'

function Usernotfound() {
    return (
        <div className="user__not-found">
            <div>
                <span>Ouppssss! :!</span>
                <h1>Veiller creer un compte si vous en avez pas!</h1>
                <h3><Link to='/login'>Se conecter</Link> <Link to="/signup">Creer un compte</Link></h3>
            </div>
        </div>
    )
}

export default Usernotfound
