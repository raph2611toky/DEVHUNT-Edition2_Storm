import React from 'react'
import face from '../../assets/faces/face12.jpg'
import './question.css'
import axios from 'axios'

function Question(props) {


    const {data,setanswerQuestion,setShowQuestion,setaskQuestion,setquestion} = props

    const handleAnswer = ()=>{
        setanswerQuestion(true)
        setShowQuestion(false)
        setaskQuestion(false)

        axios
        .patch(`http://localhost:3001/api/vueQuestion/${data._id}`)
        .then(res=>{console.log(res)})
        .catch(err=>{console.log(err)})

        setquestion(data)
    }


    return (
          <div className="questionContainer">
               <div className="question">
                    <div className="question__user-image">
                        <img src={face} alt="user"/>
                    </div>
                    <div className="question__container">
                        <div className="question__user-info">
                            <div className="user__info">
                                <span id="user__name">{data.user.pseudo}</span>
                                <small className="user__level">L2</small>
                                <span className="question__date"><small>Poser le: </small>{data.createdAt}</span>
                            </div>
                            <div className="user__question">
                                <h3>{data.title}</h3>
                            </div>
                        </div>
                        <div className="question__container-content">
                            <p>{data.contenu.description}</p>
                        </div>
                        <div className="question__answers">
                            <div className="questions__answers-views">
                                <span onClick={handleAnswer}><i className="mdi mdi-message-reply"></i> <small>{data.reponse.length} réponses</small></span>
                                <span><i className="mdi mdi-eye"></i> <small>{data.vue} vues</small></span>
                            </div>
                            <button onClick={handleAnswer}>Répondre</button>
                        </div>
                    </div>
                </div>
          </div>
    )
}

export default Question
