import React, { createContext, useState } from "react";
import axios from "axios";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [userData, setUserData] = useState({});
    const [habitData, setHabitData] = useState({});
    const [habits, setHabits] = useState([]);
    const [task, setUserTask] = useState([]);
    const [goals, setGoals] = useState([]);

    //user api ----------------------------------------------------------------------------------------------------------------------------

    const register = (firstname, lastname, email, password, firsttime) => {

        axios.post(`http://localhost:8080/create`, {
            firstname,
            lastname,
            email,
            password,
            firsttime
        })
            .then(res => {
                let userInfo = res.data;
                setUserInfo(userInfo);
            })
            .catch(e => {
                console.log("Register Error: " + e);
            })
    };

    const login = (email, password) => {

        axios.post(`http://localhost:8080/login`, {
            email,
            password
        })
            .then(res => {
                let userInfo = res.data;
                console.log("Logged In")
                window.sessionStorage.setItem("userEmail", email);
                window.sessionStorage.setItem("userToken", userInfo.token);
                setUserInfo(userInfo);
                //getUserByEmail(email);
            })
            .catch(e => {
                console.log("Login Error: " + e)
            })
        getUserByEmail(email);

    }

    const getUserByEmail = (email) => {
        axios.get(`http://localhost:8080/${email}`, {

        }).then(res => {
            let userInfo = res.data;
            setUserData(userInfo);
            window.sessionStorage.setItem("userId", userInfo.userid);
            window.sessionStorage.setItem("userName", userInfo.firstname);

        }).catch(error => {
            console.log(error)
        })
    }

    //Habit api ---------------------------------------------------------------------------------------------------------------------------

    const createHabit = (habitId, timesperweek, name, iscompleted, daysperweek, userid) => {
        axios.post('http://localhost:8081/habit/create', {
            habitId,
            timesperweek,
            name,
            iscompleted,
            daysperweek,
            userid
        }).then(res => {
            let habitInfo = res.data;
            setHabitData(habitInfo);

        }).catch(e => {
            console.log("Register Error: " + e);
        })
    }

    const getHabitByUser = (userId) => {
        axios.get(`http://localhost:8081/habit/user/${userId}`, {

        }).then(res => {
            let habits = res.data;
            setHabits(habits);
            console.log("Habits: " + habits)
        })
    }

    const updateDaysPerWeek = (habitId, dayPerWeek) => {
        axios.post(`http://localhost:8081/habit/${habitId}/daysPerWeek?dayPerWeek=${dayPerWeek}`, {
            dayPerWeek
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    const removeDaysPerWeek = (habitId, day) => {
        axios.post(`http://localhost:8081/habit/${habitId}/removeDay?removeDay=${day}`, {
            day
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    const deleteHabit = (habitId) => {
        axios.delete(`http://localhost:8081/habit/delete/${habitId}`)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
    }

    const completeHabitStatus = (habitId, isCompleted) => {
        axios.post(`http://localhost:8081/habit/user/habit/${habitId}?isCompleted=${isCompleted}`)
            .then(
        ).catch(err => {
            console.log(err)
        })
    }

    const resetAllHabit = (userId) => {
        axios.post(`http://localhost:8081/habit/${userId}/reset`)
            .then(

        ).catch(err => {
            console.log(err);
        })
    }

    //task-calendar api -----------------------------------------------------------------------------------------------------------------------------

    const getTaskByUser = (userId) => {
        axios.get(`http://localhost:9091/task/user/${userId}`)
            .then(res => {
                console.log(res);
                setUserTask(res);
                sessionStorage.setItem("tasks", JSON.stringify(res));
                setUserTask(res);

            }).catch(err => {
                console.log(err);
            })
    }

    const createTask = (title, completed, start, end, userId) => {
        axios.post('http://localhost:9091/task/create', {
            title,
            completed,
            start,
            end,
            userId
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }


    //goal api  -------------------------------------------------------------------------------------------------------------------------------------

    const getGoalByUserId = (userId) => [
        axios.post(`http://localhost:9090/goal/user/${userId}`)
            .then(res => {
                console.log(res);
                let goals = res;
                setGoals(goals);
            })
            .catch(err => {
                console.log(err);
            })
    ]

    const changeGoalStatus = (userId, status) => {
        axios.post(`http://localhost:9090/goal/update/task/${userId}?completed=${status}`)
            .then(res => {

            }).catch(err => {
                console.log(err);
            })
    }

    const createGoal = (completionDate, userId, goalName, steps, isCompleted) => {
        axios.post('http://localhost:9090/goal/create', {
            completionDate,
            steps,
            isCompleted,
            userId,
            goalName
        }).then(res => {
            console.log("Goal Created")
        }).catch(e => {
            console.log(e.log)
        })
    }

    const deleteGoal = (goalId) => {
        axios.delete(`http://localhost:9090/goal/delete/${goalId}`)
            .then(

        ).catch(err => {
            console.log(err);
        })
    }

    return (
        <AuthContext.Provider
            value={{
                userInfo,
                userData,
                habitData,
                habits,
                task,
                goals,
                register,
                login,
                getUserByEmail,
                createHabit,
                getHabitByUser,
                updateDaysPerWeek,
                removeDaysPerWeek,
                deleteHabit,
                getTaskByUser,
                createTask,
                getGoalByUserId,
                changeGoalStatus,
                createGoal,
                deleteGoal,
                completeHabitStatus,
                resetAllHabit
            }}>
            {children}
        </AuthContext.Provider>
    )

}