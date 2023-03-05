import React,{useState} from "react";
import { useContext,useEffect } from "react";
import Header from '../header/Header'
import './home.css'
import SideLeft from "../sideLeft/sideLeft";
import SideRight from '../sideRight/sideRight'
import Mycontext from '../../context/Mycontext'
import Usernotfound from '../usernotfound/Usernotfound'
import CenterQuestion from "../centerQuestion/centerQuestion";
import Etudiants from '../etudiants/Etudiants'
import Club from "../club/Club"
import axios from "axios";



const Home = () =>{

    const [askQuestion, setaskQuestion] = useState(false)
    const [showQuestions, setShowQuestion] = useState(true)
    const [answerQuestion, setanswerQuestion] = useState(false)
    const [questions, setQuestions] = useState([])
    const [question, setquestion] = useState(null)

    const [viewHome,setViewHome] = useState(true)
    const [viewQuestion, setviewQuestion] = useState(false)
    const [viewEtudiant, setviewEtudiant] = useState(false)
    const [viewClubs,setViewClubs] = useState(false)

    const [challenges,setChallenges] = useState([])

    const {token} = useContext(Mycontext)


    useEffect(() => {
        axios
        .get("http://localhost:3001/api/getAllQuestion")
        .then(res=>{
            setQuestions(res.data)
        })
        .catch(err=>{
            console.log(err)
        })

    }, [])


    useEffect(() => {
        axios
        .get("http://localhost:3001/api/getAllChallenge")
        .then(res=>{
            setChallenges(res.data)
        })
        .catch(err=>{
            console.log(err)
        })

    }, [])

    if(!token) return <Usernotfound/>
    return(
        <>

          
                   <Header/>
            
                    <div className="home container">
                        <div className="left">
                            <SideLeft
                            setViewHome={setViewHome}
                            setviewQuestion={setviewQuestion}
                            setviewEtudiant={setviewEtudiant}
                            setViewClubs={setViewClubs}
                            />
                        </div>

                        
                        <div className="center">
                            {
                                viewHome? (
                                    <CenterQuestion 
                            setanswerQuestion={setanswerQuestion}
                            setaskQuestion={setaskQuestion} 
                            setShowQuestion={setShowQuestion}
                            questions={questions}
                            question={question}
                            askQuestion={askQuestion}
                            setQuestions={setQuestions}
                            answerQuestion={answerQuestion}
                            showQuestions={showQuestions}
                            setquestion={setquestion} 
                            challenges={challenges}
                            />
                                ) : null
                            }

                            {
                                viewQuestion? (
                                    <CenterQuestion 
                            setanswerQuestion={setanswerQuestion}
                            setaskQuestion={setaskQuestion} 
                            setShowQuestion={setShowQuestion}
                            questions={questions}
                            question={question}
                            askQuestion={askQuestion}
                            setQuestions={setQuestions}
                            answerQuestion={answerQuestion}
                            showQuestions={showQuestions}
                            setquestion={setquestion} />
                                ) : null
                            }

                             {
                                 viewEtudiant? (<Etudiants/>) : null
                             }

                             {
                                 viewClubs? (<Club/>) : null
                             }



                        </div>
                        <div className="right">
                            <SideRight 
                            setaskQuestion={setaskQuestion}
                            setShowQuestion={setShowQuestion} 
                            setanswerQuestion={setanswerQuestion}
                          />
                        </div>           
                   



                    </div>
    

                    

        </>
    )
}
export default Home;