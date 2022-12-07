import React, { useEffect, useState, useContext } from 'react'
import './Goal.css'
import Popup from 'reactjs-popup';
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';


function Goal() {

    const [goal, setGoal] = useState([]);

    const { changeGoalStatus, deleteGoal } = useContext(AuthContext);

    const deleteGoalButton = (event, id) => {
        if (event.target.onclick) {
            deleteGoal(id);
        }


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

    const popUp = (event, goals) => {
        console.log(goals.goalName);
    }

    const handleChange = (event, step) => {
        if (event.target.checked) {
            console.log('✅ Checkbox is checked');
            //updateDaysPerWeek(habit.habitId, day)
            changeGoalStatus(step.toDoId, true);
        } else {
            changeGoalStatus(step.toDoId, false)
            console.log('⛔️ Checkbox is NOT checked');
        }
    }


    return (
        <>
            {
                goal.map(goals =>
                    <div id="card" onClick={event => popUp(event, goals)} key={goals.goalId}>
                        <div id="goalTxt" >{goals.goalName}</div ><div id="goalDelete" onClick={event => deleteGoalButton(event, goals.goalId)} >ˣ</div>
                        <div>{goals.steps.map(step =>
                            <form key={step.toDoId}>
                                <label><input defaultChecked={step.completed} onChange={event => handleChange(event, step)} type="checkbox" />{step.task}</label>
                            </form>
                        )}</div>
                    </div>
                )
            }
        </>
    )
}

export default Goal