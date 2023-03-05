import React, { useState } from 'react'
import './sideLeft.css'

const SideLeft = (props) =>{

    const { setViewHome,setviewQuestion,setviewEtudiant,setViewClubs} = props
    const menuNavigation = document.querySelectorAll('.navigationMenu')

    const addActive = (e)=>{
        menuNavigation.forEach(data=>{
            if(data.classList.contains('active')){
                data.classList.remove('active')
            }
        })

        e.target.classList.add('active')
    }

    const viewHome = ()=>{
        setViewHome(true)
        setviewEtudiant(false)
        setviewQuestion(false)
        setViewClubs(false)
    }

    const viewQuestions = ()=>{
        setViewHome(false)
        setviewEtudiant(false)
        setviewQuestion(true)
        setViewClubs(false)
    }

    const viewEtudiants = ()=>{
        setViewHome(false)
        setviewEtudiant(true)
        setviewQuestion(false)
        setViewClubs(false)
    }

    const viewClub = ()=>{
        setViewHome(false)
        setviewEtudiant(false)
        setviewQuestion(false)
        setViewClubs(true)
    }

    return(
        <div className='SideLeft'>
            <div className="contentList">
                <span className='navigationMenu active' onClick={(e)=>{viewHome();addActive(e)}}>
                    <i className='mdi mdi-home'></i>
                    <a href='#'>home</a >
                </span>
                <span className='navigationMenu' onClick={(e)=>{viewQuestions();addActive(e)}}>
                    <i className='mdi mdi-comment-question-outline'></i>
                    <a href='#'>Question</a >
                </span>
                <span className='navigationMenu' onClick={(e)=>{viewEtudiants();addActive(e)}}>
                    <i className='mdi mdi-account-box'></i>
                    <a href='#'>Etudiants</a >
                </span>
                <span className='navigationMenu' onClick={(e)=>{viewClub();addActive(e)}}>
                    <i className='mdi mdi-assistant'></i>
                    <a href='#'>Club</a >
                </span>
                
                
                
                
            </div>
                
        </div>
    )
}

export default SideLeft;