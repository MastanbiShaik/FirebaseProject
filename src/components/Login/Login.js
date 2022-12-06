import React, { useState } from "react";
import { useCookies } from 'react-cookie';
import './Login.css'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [name, setName] = useState('');
    const [pwd, setPwd] = useState('');
    const [cookies, setCookie] = useCookies(['user']);

    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handle = () => {
        setCookie('Name', name, { path: '/' });
        setCookie('Password', pwd, { path: '/' });
    };

    const loginHandler = async(e) => {
        e.preventDefault()
        const details = {
            username: name,
            password: pwd
        }
        let status = await props.oncheckValidUserOrNot(details)
        if(status === true){
            //console.log(status)
            navigate('/Expenses/Expenses')
        }
        else {
            setError('Invalid Credentials')
        }
    }

    const registerHandler = () => {
        navigate('/Login/Registration')
    }


    return (
        <div className="LoginPage">
            <>
            {
                error &&
                    <div className="error">{error}</div>
            }
            </>
           
            <div>
                <p>UserName:</p>
                <input
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <p>Password:</p>
                <input
                type="password"
                placeholder="name"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                />
            </div>
        
        
        <div>
           <button style={{margin: "10px"}} onClick={(e) => loginHandler(e)}>Login</button>

           <button onClick={registerHandler}>New User Register</button>
        </div>
     </div>
    )
}

export default Login