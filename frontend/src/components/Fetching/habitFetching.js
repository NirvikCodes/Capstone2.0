import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import './habitfetching.css'


function HabitFetching() {

    const [posts, setPosts] = useState([]);
    const { updateDaysPerWeek, removeDaysPerWeek, deleteHabit, completeHabitStatus } = useContext(AuthContext);

    //dynamically render check boxes 
    useEffect(() => {
        axios.get(`http://localhost:8081/habit/user/${window.sessionStorage.getItem("userId")}`).then(res => {
            setPosts(res.data);
        })
            .catch(err => {
                console.log(err);
            }
            )
    },)

    function checkElement(checkElem, habit) {
        if (habit.daysperweek.includes(checkElem)) {
            return true;
        } else {
            return false;
        }

    }

    const handleChange = (event, habit, day) => {
        if (event.target.checked) {
            updateDaysPerWeek(habit.habitId, day)
        } else {
            removeDaysPerWeek(habit.habitId, day)
        }
    };

    const deleteHabitButton = (event, habit) => {
        if (event.target.onclick) {
            deleteHabit(habit.habitId);

        }
    }

    function colorT(habit) {
        if (habit.daysperweek.length >= habit.timesperweek) {
            completeHabitStatus(habit.habitId, true)
            return 'rgb(71, 156, 63  )';

        } else {
            completeHabitStatus(habit.habitId, false)
            return '#333333'
        }
    }



    return (
        <div id="habitList">
            {
                posts.map(post =>
                    <div id="habitBox" style={{ border: `3px solid ${colorT(post)}` }} key={post.habitId} >
                        <div id="habitNameFetching">
                            <center>{post.name}</center>
                        </div>
                        <label >
                            <div id="inlineDisplay">
                                <div id="weekTxt">
                                    Sun
                                </div>
                                <input type="checkbox" defaultChecked={checkElement("sun", post)} onChange={event => handleChange(event, post, "sun")} ></input>
                            </div>
                            <div id="inlineDisplay">
                                <div id="weekTxt">
                                    Mon
                                </div>
                                <input type="checkbox" defaultChecked={checkElement("mon", post)} onChange={event => handleChange(event, post, "mon")} ></input>
                            </div>
                            <div id="inlineDisplay">
                                <div id="weekTxt">
                                    Tue
                                </div>
                                <input type="checkbox" defaultChecked={checkElement("tue", post)} onChange={event => handleChange(event, post, "tue")} ></input>
                            </div>
                            <div id="inlineDisplay">
                                <div id="weekTxt">
                                    Wed
                                </div>
                                <input type="checkbox" defaultChecked={checkElement("wed", post)} onChange={event => handleChange(event, post, "wed")}></input>
                            </div >
                            <div id="inlineDisplay">
                                <div id="weekTxt">
                                    Thu
                                </div>
                                <input type="checkbox" defaultChecked={checkElement("thu", post)} onChange={event => handleChange(event, post, "thu")}></input>
                            </div>
                            <div id="inlineDisplay">
                                <div id="weekTxt">
                                    Fri
                                </div>
                                <input type="checkbox" defaultChecked={checkElement("fri", post)} onChange={event => handleChange(event, post, "fri")}></input>
                            </div>
                            <div id="inlineDisplay">
                                <div id="weekTxt">
                                    Sat
                                </div>
                                <input type="checkbox" defaultChecked={checkElement("sat", post)} onChange={event => handleChange(event, post, "sat")} ></input>
                            </div>
                        </label>
                        <div id="timesPerWeek">
                            <span id="bolderTxt">{post.timesperweek}</span> times per week <div id="close" onClick={event => deleteHabitButton(event, post)} >ˣ</div>
                        </div>
                    </div >
                )
            }
        </div >
    )
}

export default HabitFetching