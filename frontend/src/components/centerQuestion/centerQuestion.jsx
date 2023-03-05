import React, { useContext, useState } from "react";
import InputQuestion from "../inputQuestion/inputeQuestion";
import Reponse from "../Reponse/Reponse";
import Question from "../question/Question";
import Challenge from "../challenge/Challenge";
import Mycontext from "../../context/Mycontext";

const CenterQuestion = (props)=>{
    const [viewQuestions,setViewQuestions] = useState(true)
    const [viewChalleng,setViewChallenge] = useState(false)
    const [viewCourses,setViewCourses] = useState(false)

    const handleViewQuestion = ()=>{
        setViewQuestions(true)
        setViewChallenge(false)
        setViewCourses(false)
    }

    const handleViewChallenge = ()=>{
        setViewQuestions(false)
        setViewChallenge(true)
        setViewCourses(false)
    }

    const handleViewCours = ()=>{
        setViewQuestions(false)
        setViewChallenge(false)
        setViewCourses(true)
    }

    const {setanswerQuestion,setaskQuestion,setShowQuestion,questions,askQuestion,setQuestions,answerQuestion,showQuestions,question,setquestion,challenges}=props;
    return(
        <>
                    {
                showQuestions? (
                        <>
                            <div className='center__top'>
                                <span className="active" onClick={handleViewQuestion}>Questions</span>
                                <span onClick={handleViewChallenge}>Tout les challenge</span>
                                <span onClick={handleViewCours}>Visiter les cours</span>
                            </div>
                            {
                           viewQuestions?
                             questions.map((data,index)=>{
                                    return(
                                        <React.Fragment key={index}>
                                                 <Question 
                                                 data={data} 
                                                  setanswerQuestion={setanswerQuestion}
                                                  setaskQuestion={setaskQuestion} 
                                                  setShowQuestion={setShowQuestion}
                                                  setquestion={setquestion}
                                                 />
                                        </React.Fragment>
                                    )
                                }) : null
                            }
                            {
                                viewChalleng ?
                                 
                                        <React.Fragment >
                                                 <Challenge 
                                                  setanswerQuestion={setanswerQuestion}
                                                  setaskQuestion={setaskQuestion} 
                                                  setShowQuestion={setShowQuestion}
                                                  setquestion={setquestion}
                                                 />
                                        </React.Fragment>
                                    : null
                            }

                          {
                                viewCourses ?
                                 challenges.map((data,index)=>{
                                    return(
                                        <React.Fragment key={index}>
                                                 <Challenge 
                                                 data={data} 
                                                  setanswerQuestion={setanswerQuestion}
                                                  setaskQuestion={setaskQuestion} 
                                                  setShowQuestion={setShowQuestion}
                                                  setquestion={setquestion}
                                                 />
                                        </React.Fragment>
                                    )
                                }) : null
                            }

                         </>
                    ) : null
                }

                {
                askQuestion? <InputQuestion
                setanswerQuestion={setanswerQuestion}
                setaskQuestion={setaskQuestion} 
                setShowQuestion={setShowQuestion}/>: null
               }

                {
                answerQuestion?
                 <Reponse
                setanswerQuestion={setanswerQuestion}
                setaskQuestion={setaskQuestion} 
                setShowQuestion={setShowQuestion}
                question={question}
                />: null
                
               }

        </>
    )
}

export default CenterQuestion;