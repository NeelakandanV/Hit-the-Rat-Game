import React, { useEffect, useRef, useState } from 'react'

function HitBox() {
    const word = "HIT"
    const GameBox = ["","","","","","","","",""]
    const[hit,setHit] = useState([...GameBox])
    const[seconds,setSeconds] = useState(60)
    const[score,setScore] = useState(0)
    const[gameStats,setGameStats] = useState(false)
    const[start,setStart] = useState("Start")
    const[hitIndex,setHitIndex] = useState(null)
    const Timer = useRef(null)
    let result=score;


    // Display HIT in the Box
    const DisplayHit = ()=>{
        const gameBoard = [...GameBox]
        const num = Math.floor(Math.random()*9)
        gameBoard[num] = word;
        setHit([...gameBoard])
        setHitIndex(num)
    }

    
    // Handle Box Clicking
    const BoxClick =(idx)=>{
        if(gameStats){
            if(idx===hitIndex) setScore((pre)=>pre + 5)
            else if(idx!==hitIndex) setScore((pre)=>pre - 2.5)
            else setScore(score)
        }
    }


    // Game Timing Logic - Start Game
    const StartGame = ()=>{
        if(!gameStats){
            setGameStats(true)
            setStart("Pause")
            setSeconds(60)

            Timer.current = setInterval(()=>{
                setSeconds((pre)=>{
                    DisplayHit();
                    //console.log(Timer.current,"Timref")
                    if(pre===0){
                        clearInterval(Timer.current)

                        const disScoreCard = document.querySelector(".ScoreCard")
                        disScoreCard.classList.add("DisplayScore")

                        ResetGame()
                        //console.log(hitIndex,hit)
                    }
                    return pre-1;
                })
            },1000)
        }
        else{
            clearInterval(Timer.current)
            setStart("Start")
            setGameStats(false)
        }
    }


    // Reset the Game
    const ResetGame =()=>{
        clearInterval(Timer.current)
        setStart("Start")
        setGameStats(false)
        setSeconds(60)
        setHitIndex(null)
        setHit([...GameBox])
    }


    // Close Score Card
    const closeScoreCard = ()=>{
        const disScoreCard = document.querySelector(".ScoreCard")
        disScoreCard.classList.remove("DisplayScore")
        setScore(0)
    }

  return (
    <div className='MainParent'>
        <div className='Title'>
            <h2>HIT THE HIT</h2>
        </div>
        <div className='DisplayZone'>
            <label>Score : {score}</label>
            <label>Time Remaining : {seconds}</label>
        </div>
        <div className='GameBox'>
            {hit.map((val,idx)=>(
                <div key={idx} className='UnitBox' onClick={()=>BoxClick(idx)}>
                    <label>{val}</label>
                </div>
            ))}
        </div>
        <div className='BtnZone'>
            <button onClick={()=>StartGame()} >{start}</button>{' '}
            <button onClick={()=>{ResetGame()}}>Reset</button>        
        </div>
        <div className='ScoreCard'>
            <p><b>Your Final Score : {result}</b></p>
            <button onClick={()=>closeScoreCard()}>Close</button>
        </div>
    </div>
  )
}

export default HitBox