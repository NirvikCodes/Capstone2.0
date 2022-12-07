import React, { useContext, useRef, useEffect } from "react";

//ui design imports 
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Tilt from 'react-parallax-tilt';

//style
import signupImg from '../../image/signup.png'
import './signup.css'

//components
import { AuthContext } from "../../components/context/AuthContext";


export function Signup() {

    const thankYouMessage = ""
    const [error, setError] = React.useState("");
    const [confirmation, setConfirmation] = React.useState(thankYouMessage);
    const { register } = useContext(AuthContext);

    const [values, setValues] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        cPassword: '',
        firstTime: true,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const ref = useRef(null);

    let email = values.email;
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const match = email.match(regex);


    useEffect(() => {
        const el = document.getElementById('createAccountBtn');
        el.style.cursor = 'pointer';
        el.onclick = function () {
            createAccount();
        }
    });

    function createAccount() {
        if (values.password === "" || values.cPassword === "" || values.firstName === "" || values.lastName === "" || values.email === "") {
            setError("All fields are required")
        }
        else if (match === null) {
            setError("Your Email is Invalid")
        }
        else if (values.password !== values.cPassword) {
            setError("Password mismatch")
        } else {
            setConfirmation("Thank You For Signing Up!");
            //make a account 
            register(values.firstName, values.lastName, values.email, values.password, values.firstTime);
            //send email to confirm account
        }
    }


    return (

        <>


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
                        background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
                    },
                }}
            >
                <Paper elevation={20}  >
                    <img src={signupImg} alt="Sign up" id="signUpImage" />

                    <Tilt scale='1.05' tiltEnable={false} >
                        <TextField label="First Name" variant="outlined" id="fnamePos" onChange={handleChange('firstName')} sx={{ m: 0, width: '25ch', marginLeft: '50%', marginTop: '-34%' }} />
                    </Tilt>
                    <Tilt scale='1.05' tiltEnable={false} >

                        <TextField label="Last Name" variant="outlined" onChange={handleChange('lastName')} sx={{ m: 0, width: '25ch', marginLeft: '75%', marginTop: '-36%' }} />
                    </Tilt>

                    <Tilt scale='1.05' tiltEnable={false} >

                        <TextField label="Email" variant="outlined" onChange={handleChange('email')} sx={{ m: 0, width: '54ch', marginLeft: '50%', marginTop: '-30%' }} />
                    </Tilt>

                    <Tilt scale='1.05' tiltEnable={false} >

                        <TextField label="Password" variant="outlined" type="password" onChange={handleChange('password')} sx={{ m: 0, width: '54ch', marginLeft: '50%', marginTop: '-24%' }} />
                    </Tilt>

                    <Tilt scale='1.05' tiltEnable={false} >

                        <TextField label="Confirm Password" variant="outlined" type="password" onChange={handleChange('cPassword')} sx={{ m: 0, width: '54ch', marginLeft: '50%', marginTop: '-18%' }} />
                    </Tilt>
                    <Tilt scale='1.05' tiltEnable={false} >

                        <div ref={ref} id="createAccountBtn">
                            Create Account
                        </div>
                    </Tilt>
                    <div id="passwordMissMatchError">
                        {error}
                        <div id="thankyou">
                            {confirmation}
                        </div>
                    </div>
                </Paper>
            </Box>


        </>
    )

}