import { fontSize } from "@mui/system";
import React from "react";
import { Route, Routes, Link } from 'react-router-dom';
import logo from '../../image/logo.png'
import './navbar.css'


export default function navbar() {
    return (
        <nav id="navWrapper">
            <ul >
                <div id="listWrapper">
                    <li id="fontSize">

                        <Link to="/" id="linkStyle">
                            <div id="logo">
                                FruitFul
                            </div>
                            <img src={logo} alt="logo" id="logoPos" />
                        </Link>
                    </li>

                    <Link to="/signup" id="linkStyle" >
                        <div id="buttonStyle">
                            Sign Up
                        </div>
                    </Link>
                    <Link to="/login" id="linkStyle">
                        <div id="buttonStyle">
                            Login
                        </div>
                    </Link>
                </div>
            </ul>
        </nav>
    )
}





