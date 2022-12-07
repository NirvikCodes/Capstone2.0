import React, { useContext, useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { AuthContext } from "../../components/context/AuthContext";
import './dashboard.css'
import { CircularProgressBar } from "@tomik23/react-circular-progress-bar";
import CalendarI from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import MiniGoal from "../../components/DashboardViews/GoalView/miniGoal";
import axios from 'axios'


export function Dashboard() {

    let numCompletedPerWeek = 0;
    let numCompletePerDay = 0;
    const firstName = window.sessionStorage.getItem("userName");
    const [items, setItems] = useState([]);
    const [posts, setPosts] = useState([]);
    const userId = window.sessionStorage.getItem("userId");

    let newDate = new Date()
    let date = newDate.getDay();

    useEffect(() => {
        axios.get(`http://localhost:8081/habit/user/${window.sessionStorage.getItem("userId")}`).then(res => {

            setPosts(res.data);
        })
            .catch(err => {
                console.log(err);
            }
            )
    },)



    const weekNum = (posts) => {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].iscompleted === true) {
                numCompletedPerWeek++;
            }
        }
        return Math.trunc(numCompletedPerWeek / posts.length * 100);
    }

    const dayNum = (posts) => {
        for (let i = 0; i < posts.length; i++) {
            switch (date) {
                case 0:
                    if (posts[i].daysperweek.includes("sun")) {
                        numCompletePerDay++;
                    }
                    break;
                case 1:
                    if (posts[i].daysperweek.includes("mon")) {
                        numCompletePerDay++;
                    }
                    break;
                case 2:
                    if (posts[i].daysperweek.includes("tue")) {
                        numCompletePerDay++;
                    }
                    break;
                case 3:
                    if (posts[i].daysperweek.includes("wed")) {
                        numCompletePerDay++;
                    }
                    break;
                case 4:
                    if (posts[i].daysperweek.includes("thu")) {
                        numCompletePerDay++;
                    }
                    break;
                case 5:
                    if (posts[i].daysperweek.includes("fri")) {
                        numCompletePerDay++;
                    }
                    break;
                case 6:
                    if (posts[i].daysperweek.includes("sat")) {
                        numCompletePerDay++;
                    }

                    break;

                default:
                    return 0;
                // code block
            }
        }
        return Math.trunc(numCompletePerDay / posts.length * 100);
    }

    // useEffect(() => {
    //     const items = JSON.parse(sessionStorage.getItem('tasks'));
    //     const userId = window.sessionStorage.getItem("userId");
    //     if (items) {
    //         setItems(items.data);
    //     } else if (items === null) {

    //     }
    // }, []);
    useEffect(() => {
        axios.get(`http://localhost:9091/task/user/${userId}`)
            .then(res => {
                const items = JSON.parse(JSON.stringify(res));
                if (items) {
                    console.log("item data: " + JSON.stringify(items.data))
                    setItems((items.data));
                } else if (items === null) {
                }
            }).catch(err => {
                console.log(err);
            })
    })



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

    //habit tracker progress circle week 
    const week = {
        percent: weekNum(posts), // is require
        colorCircle: "grey",
        fontColor: "black",
        fontSize: "1.6rem",
        fontWeight: 400,
        size: 120,
        strokeBottom: 5,
        speed: 60,
        cut: 0,
        rotation: -90,
        opacity: 10,
        unit: "%",
        textPosition: "0.35em",
        animationOff: false,
        inverse: false,
        round: true,
        number: true,
        linearGradient: ["green", "blue"],
    };
    //habit tracker progress circle day 
    const today = {
        percent: dayNum(posts), // is require
        colorCircle: "grey",
        fontColor: "black",
        fontSize: "1.6rem",
        fontWeight: 400,
        size: 120,
        strokeBottom: 5,
        speed: 60,
        cut: 0,
        rotation: -90,
        opacity: 10,
        unit: "%",
        textPosition: "0.35em",
        animationOff: false,
        inverse: false,
        round: true,
        number: true,
        linearGradient: ["green", "blue"],
    };

    return (
        <>

            <div id="dashBoardTxt">
                <h1>Dashboard,</h1>
            </div>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {

                        width: 1100,
                        height: 550,
                        marginLeft: 20,
                        background: "rgb(230, 225, 224);",
                        marginTop: 0
                    },
                }}
            >


                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {

                            width: 300,
                            height: 75,
                            marginLeft: '5%',
                            marginTop: '3%',
                            background: "rgb(242, 236, 234);"
                        },
                    }}>

                    <Paper elevation={20}>
                        <div id="WelcomeBackTxt">
                            Welcome Back, <span id="gradientTxt">{firstName}</span>
                        </div>
                        <div id="subTxt">
                            Lets Have A Good Day 😊
                        </div>
                    </Paper>

                    <Paper elevation={20} id="HabitCard">
                        <center> <CircularProgressBar {...week} /></center>

                        <center><div id="HabitCardTxt">Habits Completed This Week</div></center>
                    </Paper>
                    <Paper elevation={20} id="HabitCard">
                        <center> <CircularProgressBar {...today} /></center>

                        <center><div id="HabitCardTxt">Habits Completed Today</div></center>
                    </Paper>
                    <Paper elevation={20} id="CalendarCard">
                        <center><div id="CalendarTxt">Lets Take A Quick Look at Your Goals</div></center>
                        <MiniGoal />
                    </Paper>

                    <Paper elevation={20} id="calendarCard">
                        <CalendarI
                            height="800px"
                            view="day"
                            events={items}
                        />
                    </Paper>
                </Box>
            </Box>
        </>
    )
}