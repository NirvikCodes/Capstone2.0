import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Route, Routes } from 'react-router-dom';
//screens
import { Home } from "../pages/home/home";
import { Signup } from '../pages/signup/signup';
import { Login } from '../pages/login/login';
import { Dashboard } from "../pages/dashboard/dashboard";
import { Calendar } from "../pages/calendar/calendar";
import { Add } from "../pages/add/add";
import { Finances } from "../pages/finances/finances";
//navbas 
import Navbar from './navbar/navbar';
import HomeNavBar from "./HomeNav/homeNavBar";

const Navigation = () => {


    const { userInfo } = useContext(AuthContext);

    return (
        <>
            {userInfo.token || sessionStorage.getItem("userToken") ? (
                <>
                    <HomeNavBar />
                    <Routes>
                        <Route path='/login' element={<Dashboard />} />
                        <Route path='/calendar' element={<Calendar />} />
                        <Route path='/add' element={<Add />} />
                        <Route path='/finances' element={<Finances />} />
                    </Routes>
                </>

            ) :
                <>
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/login' element={<Login />} />
                    </Routes>

                </>

            }
        </>
    )


}

export default Navigation;