import { useState, useEffect } from "react";
import React from 'react'
import axios from 'axios'
import './miniGoal.css'

export default function MiniGoal() {

    const [goal, setGoal] = useState([]);

    let total = 0;
    const getPercent = (steps, step) => {
        for (var i = 0; i < step.length; i++) {
            if (JSON.stringify(step[i].completed).includes(true)) {
                total++;
            }
        }
        var newTotal = total;
        total = 0;
        return Math.trunc(newTotal / steps * 100)
    }


    useEffect(() => {
        axios.get(`http://localhost:9090/goal/user/${window.sessionStorage.getItem("userId")}`).then(res => {
            setGoal(res.data);
        })
            .catch(err => {
                console.log(err);
            }
            )
    },)

    return (
        <>
            {
                goal.map(goals =>
                    <div id="bar" key={goals.goalId} style={{
                        background: `linear-gradient(90deg, #57A773 ${getPercent(goals.steps.length, goals.steps)}%, #D1FAFF 0%)`
                    }}>
                        <div id="miniGoalTxt" >{goals.goalName}</div >
                        <div>{goals.steps.map(step =>
                            <form key={step.toDoId}>
                                <div id="percentTxt">{getPercent(goals.steps.length, goals.steps)}%</div>
                            </form>
                        )}</div>
                    </div>
                )
            }
        </>
    )
}
