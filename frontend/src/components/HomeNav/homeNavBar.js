import { fontSize } from "@mui/system";
import React, { useContext, useState } from "react";
import { Route, Routes, Link } from 'react-router-dom';
import './homeNav.css'
import home from '../../image/home.png'
import calendar from '../../image/calendar.png'
import add from '../../image/add.jpg'
import logout from '../../image/logout.png'
import { AuthContext } from "../context/AuthContext";

export default function HomeNavBar() {

    const { getTaskByUser, setUserTask } = useContext(AuthContext);
    const [isActive, setIsActive] = useState(true);
    const [isCalendarActive, setIsCalendarActive] = useState(false);
    const [isAddActive, setIsAddActive] = useState(false);



    const logoutUser = () => {
        window.location.reload(false);
        sessionStorage.setItem("userToken", "");
        sessionStorage.clear();
        //sessionStorage.setItem("tasks", "");
        window.location.href = "http://localhost:3000/login"
    }
    let userId = window.sessionStorage.getItem("userId");

    const showLine = event => {
        setIsActive(true);
        setIsCalendarActive(false);
        setIsAddActive(false);
    }

    const showCalLine = event => {
        setIsActive(false);
        setIsCalendarActive(true);
        setIsAddActive(false);
    }

    const showAddLine = event =>{
        setIsActive(false);
        setIsCalendarActive(false);
        setIsAddActive(true);
    }
    function Task() {
        getTaskByUser(userId);

    }


    return (
        <>
            <ul>
                <div >
                    <div id="listWrapperHome">
                        <div id="NavText">
                            <div id="bgColor"></div>

                            {/* dashboard */}
                            <span className={isActive ? 'line' : ''}></span>
                            <Link to="/login" id="dashboardButton" onClick={event => showLine(event)}>
                                <div id="dashboardImg" >
                                    <li><img src={home} alt="home" id="homeImg" /></li>
                                </div>
                            </Link>

                            {/* Calendar */}
                            <span className={isCalendarActive ? 'calLine' : ''}></span>
                            <Link to="/calendar" id="calendarBtn" onClick={event => showCalLine(event)}>
                                <div id="addCalendar" onClick={Task}>
                                    <li><img src={calendar} alt="calendar" id="calendarBtn" /></li>
                                </div>
                            </Link>

                            {/* add */}
                            <span className={isAddActive ? 'addLine' : ''}></span>
                            <Link to="/add" id="calendarBtn"  onClick={event => showAddLine(event)}>
                                <div id="addImg" >
                                    <li><img src={add} alt="add" id="addImg" /></li>
                                </div>
                            </Link>

                            <Link id="calendarBtn">
                                <div onClick={logoutUser}>
                                    <li><img src={logout} alt="logout" id="logoutBtn" /></li>
                                </div>
                            </Link>

                        </div>
                    </div>
                </div>

            </ul>
        </>
    )

}

/*
<Link to="/finances" id="calendarBtn">
    <div>
        <li><img src={saving} alt="finances" id="financesImg" /></li>
    </div>
    </Link>
*/