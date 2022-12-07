import React, { useRef, useEffect, useContext } from "react";

//ui design imports 
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Tilt from 'react-parallax-tilt';

//style
import './login.css'
import loginImg from '../../image/login.png'


//components
import { AuthContext } from "../../components/context/AuthContext";



export function Login() {

    const { login, userInfo } = useContext(AuthContext);



    const [values, setValues] = React.useState({
        email: '',
        password: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };


    function signIn() {
        login(values.email, values.password);
        console.log("values: " + values.email, values.password);


    }

    const ref = useRef(null);

    useEffect(() => {
        const el = document.getElementById('loginBtn');
        el.style.cursor = 'pointer';
        el.onclick = function () {
            signIn();
        }
    });


    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                caretColor: "transparent",

                '& > :not(style)': {
                    m: 1,
                    width: 1000,
                    height: 500,
                    marginLeft: 20,
                    background: "radial-gradient(circle, rgba(63,251,246,1) 0%, rgba(251,128,153,1) 100%);"
                },
            }}
        >
            <Paper elevation={20}  >
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 400,
                            height: 400,
                            marginLeft: 5,
                            marginTop: 6,
                            background: "#0000"
                        },
                    }}
                >


                    <Paper elevation={10}>
                        <div id="loginTxt">Login</div>
                        <Tilt scale='1.05' tiltEnable={false} >
                            <TextField label="Email" variant="outlined" onChange={handleChange('email')} sx={{ m: 0, width: '40ch', marginLeft: '5%', marginTop: '7%' }} />
                        </Tilt>

                        <Tilt scale='1.05' tiltEnable={false} >

                            <TextField label="Password" variant="outlined" type="password" onChange={handleChange('password')} sx={{ m: 0, width: '40ch', marginLeft: '5%', marginTop: '10%' }} />
                        </Tilt>

                        <Tilt scale='1.05' tiltEnable={false} onclick={signIn} >

                            <div id="loginBtn">
                                Login
                            </div>
                        </Tilt>

                    </Paper>
                    <img src={loginImg} alt="data" id="loginImg" />

                </Box>

            </Paper >

        </Box >
    )
}