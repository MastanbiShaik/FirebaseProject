import React, {useState} from "react";
import '../Login/Registration.css'


const Registration = (props) => {
    // States for registration
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const RegisterHandler = (e) => {
        e.preventDefault();
        const details= {
            username: username,
            password: password,
            email: email
        }
        props.onnewUserRegistrationHandler(details)

        clearHandler(e)
    }

    const clearHandler = (e) => {
        e.preventDefault();
        setUserName('')
        setPassword('')
        setEmail('')
    }
    return (
        <form onSubmit={RegisterHandler}>
            <div class="newuser_registration">
                <div>
                    <p>UserName:</p>
                    <input
                        placeholder="Enter UserName"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div>
                    <p>Password:</p>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        // onChange={(e) => setPwd(e.target.value)}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <p>Email:</p>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        // onChange={(e) => setPwd(e.target.value)}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button>Register</button>
                
            </div>
        </form>

    )
}

export default Registration