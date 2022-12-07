import React, { useContext, useState, useEffect } from "react";
import AddIcon from '../../image/add.png'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import TextField from '@mui/material/TextField';
import { AuthContext } from "../../components/context/AuthContext";
import axios from 'axios'

//tabs
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import './add.css'
import HabitFetching from "../../components/Fetching/habitFetching";
import Goal from "../../components/GoalFetching/Goal";


export function Add(props) {

    //habit popup style
    const contentStyle = {
        background: '  rgb(219, 195, 164)',
        width: 400,
        height: 240,
        position: "absolute",
        overflowY: "scroll"
    };

    //habits 
    const [habitName, setHabitName] = useState("");
    const [timesPerWeek, setTimesPerWeek] = useState("");

    //notify when something is created 
    const [created, setCreated] = useState("");

    //auth api calls 
    const { createHabit, getHabitByUser, changeGoalStatus, createGoal, resetAllHabit } = useContext(AuthContext);

    const userId = window.sessionStorage.getItem("userId");

    const handleHabitName = event => {
        setHabitName(event.target.value);
    };

    const handleHabitTimesPerWeek = event => {
        setTimesPerWeek(event.target.value);
    };

    //habit values
    const [value, setValue] = React.useState('habits');

    //change tabs
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    function habitApi() {
        if (timesPerWeek !== "" && habitName !== "" && timesPerWeek <= 7 && timesPerWeek > 0) {
            createHabit("", timesPerWeek, habitName, "false", [], userId);
            setCreated("Habit Created")
            getHabitByUser(userId);
        } else {
            setCreated("Please Fill In Both Boxes!")
        }

    }

    function close() {
        setCreated("");
    }

    //add goal step
    const inputArr = [
        {
            completed: false,
            task: ""
        }
    ];

    //goals
    const [goalName, setGoalName] = useState("");
    const [date, setDate] = useState("");
    //change tabs
    const handleDateChange = event => {
        setDate(event.target.value);
    };


    //steps array
    const [arr, setArr] = useState(inputArr);

    const addInput = () => {
        setArr(s => {
            return [
                ...s,
                {
                    completed: false,
                    task: ""
                }
            ];
        });
        console.log(arr)
    };

    const handleGoal = e => {
        e.preventDefault();

        const index = e.target.id;
        setArr(s => {
            const newArr = s.slice();
            newArr[index].task = e.target.value;

            return newArr;
        });
    };

    const handleGoalName = event => {
        setGoalName(event.target.value);
    }

    const goalApi = () => {
        console.log("Goal Name: " + goalName, " Date: " + date, " steps: " + JSON.stringify(arr))
        //const createGoal = (completionDate, userId, goalName, steps, isCompleted) => {
        createGoal(date, userId, goalName, arr, "false");
    }

    const resetHabits = () => {
        resetAllHabit(userId);
        window.location.reload();
    }

    const removePopup = () => {
        window.location.reload();
    }




    return (
        <>
            <div id="addTxt"><h1>Track Habits & Goals,</h1></div>
            <div id="addScreenBg" >
                <TabContext value={value}  >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} >
                            <Tab label="Habits" value="habits" />
                            <Tab label="Goals" value="goals" />
                        </TabList>
                    </Box>
                    <TabPanel value="habits" variant={"scrollable"}>
                        <HabitFetching />
                        <div class="dropdown">
                            <img src={AddIcon} alt="home" id="addImgBtn" />
                            <div class="dropdown-content">
                                <Popup
                                    trigger={<div id="addHabitTxt">Habit</div>}
                                    onClose={close}
                                    position="left center"
                                    offsetX={-450}
                                    offsetY={20}
                                    {...{ contentStyle }}
                                >
                                    <TextField label="Habit Name"
                                        variant="outlined" type="text"
                                        sx={{ m: 0, width: '30ch', height: '10ch', marginLeft: '16%', marginTop: '5%' }}
                                        onChange={handleHabitName}
                                    />
                                    <TextField label="Times Per Week"
                                        variant="outlined" type="number"
                                        sx={{ m: 0, width: '30ch', height: '10ch', marginLeft: '16%', marginTop: '-2%' }}
                                        onChange={handleHabitTimesPerWeek}
                                    />
                                    <center><div id="habitCreated">{created}</div></center>
                                    <center> <div id="createHabitBtn" onClick={habitApi}>Create Habit</div></center>
                                </Popup>
                                <Popup
                                    trigger={<div id="resetHabit" open={false}>Reset All Habits </div>}
                                    onClose={close}
                                    position="left center"
                                    offsetX={-450}
                                    offsetY={0}
                                    {...{ contentStyle }}
                                >
                                    <center><span id="question">Are you sure you want to reset all Habits?</span></center>
                                    <div id="yesBtn" onClick={resetHabits}>Yes</div>
                                    <div id="noBtn" onClick={removePopup}>No</div>
                                </Popup>

                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="goals">
                        <Goal />
                        <div class="dropdown">
                            <img src={AddIcon} alt="home" id="addImgBtn" />
                            <div class="dropdown-content">
                                <Popup
                                    trigger={<div id="addGoalTxt">Goal</div>}
                                    position="left center"
                                    offsetX={-450}
                                    offsetY={20}
                                    {...{ contentStyle }}
                                >
                                    <TextField label="Goal Name"
                                        variant="outlined" type="text"
                                        sx={{ m: 0, width: '30ch', height: '10ch', marginLeft: '16%', marginTop: '5%' }}
                                        onChange={handleGoalName}
                                    />
                                    <TextField label="YYYY-MM-DD"
                                        variant="outlined" type="text"
                                        sx={{ m: 0, width: '30ch', height: '10ch', marginLeft: '16%' }}
                                        onChange={handleDateChange}
                                    />


                                    {arr.map((item, i) => {
                                        return (
                                            <TextField label="Step"
                                                variant="outlined"
                                                sx={{ m: 0, width: '30ch', height: '10ch', marginLeft: '16%', marginTop: '-2%' }}
                                                onChange={handleGoal}
                                                task={item.task}
                                                id={i}
                                            />
                                        );
                                    })}

                                    <div id="addGoalStep" onClick={addInput}>+</div>
                                    <center><div id="habitCreated">{created}</div></center>
                                    <center> <div id="createHabitBtn" onClick={goalApi}>Create Goal</div></center>
                                </Popup>
                            </div>
                        </div>
                    </TabPanel>
                </TabContext>
            </div>
        </>

    );
}