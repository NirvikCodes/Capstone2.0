import React, { useEffect } from "react";
import { Link } from 'react-router-dom';

import dataImg from '../../image/data.png'
import goals from '../../image/goals.png'
import money from '../../image/money.png'
import track from '../../image/track.png'
import logo from '../../image/logo.png'

import './style.css'
import MovingComponent from 'react-moving-text'
import Aos from "aos"
import "aos/dist/aos.css"

export function Home() {

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, [])

    const linkToMe = () => {
        window.location.href = "https://www.linkedin.com/in/nirvik-sharma-08b37020b/";
    }
    return (

        <div id="fontOne">
            <div id="mainTextPos">
                <div id="textSize">
                    <MovingComponent
                        type="fadeIn"
                        duration="3000ms"
                        delay=".1s"
                        direction="normal"
                        timing="ease"
                        iteration="1"
                        fillMode="forwards">
                        <div id="bounce">
                            FRUITFUL
                        </div>
                    </MovingComponent>
                </div>
                <div id="flex">
                    <div id="subText">
                        <MovingComponent
                            type="fadeIn"
                            duration="3000ms"
                            delay=".1s"
                            direction="normal"
                            timing="ease"
                            iteration="1"
                            fillMode="forwards">
                            A Website to make your <br />
                            <span id="gelatine">productivity</span>, habit <span id="gelatine">tracking</span>, and <span id="gelatine">scheduling</span> more <span id="gelatine">ripe</span>.
                        </MovingComponent>
                    </div>
                </div>

                <MovingComponent
                    type="fadeOut"
                    duration="2000ms"
                    delay="0s"
                    direction="normal"
                    timing="ease"
                    iteration="infinite"
                    fillMode="none">
                    <div id="scrollDown">
                        ▼
                    </div>
                </MovingComponent>


            </div>
            <img src={dataImg} alt="data" id="imageOne" data-aos="zoom-out-up" />
            <div id="subText1">
                Create and Track Habits
            </div>
            <img src={track} alt="goals" id="subImage1" data-aos="fade-right" />
            <div id="subText2">
                Keep up with Your Schedule
            </div>
            <img src={money} alt="goals" id="subImage2" data-aos="fade-right" />
            <div id="subText3">
                Set Goals and Achieve them
            </div>
            <img src={goals} alt="goals" id="subImage3" data-aos="fade-right" />
            <span id="subText4">
                <center>
                    "Action is the foundational key to all success."<br /> – Picasso
                </center>
            </span>
            {/* footer */}
            <Link to="/signup" id="linkStyle" >
                <div id="bigSignUp" data-aos="zoom-out-up">
                    Sign Up
                </div>
            </Link>
            <div id="spacing">
                <Link to="/" id="linkStyle">
                    <img src={logo} alt="logo" id="botLogo" />
                </Link>
                <div id="madeByMe" onClick={linkToMe}>
                    Made by <span id="txtColor">Nirvik Sharma </span>
                </div>
                <span id="TOS">
                    Terms of Service

                </span>
                <span id="pP">
                    Privacy Policy
                </span>
                <span id="contact">
                    Email Us
                </span>
                <span id="cc">
                    Copyright © 2022
                </span>
            </div>

        </div >
    )
}


