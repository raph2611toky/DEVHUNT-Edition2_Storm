import React from 'react'
import face from '../../assets/faces/face12.jpg'
import axios from 'axios'
import './Challenge.css'

function CourClub(props) {




    return (
        <div className="challenge">
            
            <div className="head">
                <h3>Les Challenges</h3>
                <button>Postuler un cour</button>
            </div>


            <div className="questionContainer">
            
               <div className="question">
                    <div className="question__user-image">
                        <img src={face} alt="user"/>
                    </div>
                    <div className="question__container">
                        <div className="question__user-info">
                            <div className="user__info">
                                <span id="user__name">navas</span>
                                <small className="user__level">L2</small>
                                <span className="question__date"><small>Poser le: </small>05/12/2023</span>
                            </div>
                            <div className="user__question">
                                <h3>Lorem ipsum, dolor sit amet consectetur adipisicing elit. At, sit.</h3>
                            </div>
                        </div>
                        <div className="question__container-content">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptatem at non! Hic,
                                dolor blanditiis explicabo possimus quod et, rem omnis culpa porro quibusdam vero sequi animi eius. Ex, unde?</p>
                        </div>
                        <div className="question__answers">
                            <div className="questions__answers-views">
                                <span><i className="mdi mdi-message-reply"></i> <small>5 réponses</small></span>
                                <span><i className="mdi mdi-eye"></i> <small>54 vues</small></span>
                            </div>
                            <button>Participer</button>
                        </div>
                    </div>
                </div>
          </div>
        </div>
          
    )
}

export default CourClub