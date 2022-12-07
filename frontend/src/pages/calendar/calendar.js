import React, { useState, useContext, useEffect, useCallback, useMemo } from "react";
import CalendarI from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { AuthContext } from "../../components/context/AuthContext";
import './calendar.css'
import Popup from 'reactjs-popup';
import DateTimePicker from 'react-datetime-picker'
import TextField from '@mui/material/TextField';
import axios from "axios";

function getTaskByUser(userId) {
    axios.get(`http://localhost:9091/task/user/${userId}`)
        .then(res => {
            sessionStorage.setItem("tasks", JSON.stringify(res));
        }).catch(err => {
            console.log(err);
        })
}

export function Calendar() {

    const [views, setViews] = useState("week");
    const [startValue, startOnChange] = useState(new Date());
    const [endValue, endOnChange] = useState(new Date());
    const contentStyle = { background: '  rgba(216, 179, 179,.7)', width: 400, height: 220 };
    const [taskName, setTaskName] = useState("");
    const { createTask } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const userId = window.sessionStorage.getItem("userId");




    let startD = new Date(startValue);
    let endD = new Date(endValue);
    let startString = `${String(startD.getFullYear()).padStart(2, '0')}` + "-" + `${String(startD.getMonth() + 1).padStart(2, '0')}` + "-" + `${String(startD.getDate()).padStart(2, '0')}` + "T" + `${String(startD.getHours()).padStart(2, '0')}` + ":" + `${String(startD.getMinutes()).padStart(2, '0')}` + ":" + `${String(startD.getSeconds()).padStart(2, '0')}`
    let endString = `${String(endD.getFullYear()).padStart(2, '0')}` + "-" + `${String(endD.getMonth() + 1).padStart(2, '0')}` + "-" + `${String(endD.getDate()).padStart(2, '0')}` + "T" + `${String(endD.getHours()).padStart(2, '0')}` + ":" + `${String(endD.getMinutes()).padStart(2, '0')}` + ":" + `${String(endD.getSeconds()).padStart(2, '0')}`

    let events = useMemo(() => [], []);
    const addEvent = useCallback(() => {
        createTask(taskName, false, startString, endString, userId);
        events.push({
            "id": userId,
            "title": taskName,
            "start": startString,
            "end": endString,
        })
    }, [createTask, endString, events, startString, taskName, userId])

    // useEffect(() => {
    //     const items = JSON.parse(sessionStorage.getItem('tasks'));
    //     const userId = window.sessionStorage.getItem("userId");
    //     if (items) {
    //         setItems(items.data);
    //         setUserId(userId);
    //         getTaskByUser(userId);
    //     } else if (items === null) {
    //     }
    // }, [addEvent]);


    useEffect(() => {
        axios.get(`http://localhost:9091/task/user/${userId}`)
            .then(res => {
                const items = JSON.parse(JSON.stringify(res));
                if (items) {
                    setItems((items.data));
                } else if (items === null) {
                }
            }).catch(err => {
                console.log(err);
            }, [addEvent])
    })


    var calendar = new CalendarI('#calendar', {
        allDayView: false,
    });


    let id = [];
    let title = [];
    let start = [];
    let end = [];

    for (let i = 0; i < items.length; i++) {
        if (items.length > 0) {
            id.push(items[i].taskId);
            title.push(items[i].title);
            start.push(items[i].start);
            end.push(items[i].end);
        }
    }

    for (let i = 0; i < items.length; i++) {
        if (items.length > 0) {
            events.push({
                "id": id[i],
                "title": title[i],
                "start": start[i],
                "end": end[i]
            })
        }
    }




    const handleTaskName = event => {
        setTaskName(event.target.value);
    };

    const changeView = (view) => {
        setViews(view)
    }



    return (
        <>
            <div id="addTxt"><h1>Calendar & Planner</h1></div>
            <div id="day" onClick={() => changeView("day")}>Day</div>
            <div id="week" onClick={() => changeView("week")}>Week</div>
            <div id="month" onClick={() => changeView("month")}>Month</div>

            <Popup trigger={<div id="add" onClick={addEvent}>Add</div>}
                position="left center" offsetX={-150} offsetY={300}

                {...{ contentStyle }}
            >
                <TextField label="Task Name"
                    variant="outlined" type="text"
                    sx={{ m: 0, width: '30ch', height: '10ch', marginLeft: '16%', marginTop: '5%' }}
                    onChange={handleTaskName}
                />
                <div>
                    <label id="taskTitleInputStart">Start:</label>
                    <div id="datePicker">
                        <DateTimePicker onChange={startOnChange} value={startValue} />
                    </div>
                </div>
                <div>
                    <label id="taskTitleInputEnd">End:</label>
                    <div id="datePicker">
                        <DateTimePicker onChange={endOnChange} value={endValue} />
                    </div>
                </div>
                <div id="submitTask" onClick={addEvent}>
                    Submit
                </div>
            </Popup>



            <div id="addScreenBg">
                <CalendarI
                    height="820px"
                    view={views}
                    calendar={calendar}
                    events={items}
                    useDetailPopup={true}
                />
            </div>
        </>
    )
}