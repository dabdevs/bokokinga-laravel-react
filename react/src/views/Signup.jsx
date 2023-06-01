import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmationPasswordRef = useRef();
    const [errors, setErrors] = useState(); 

    const {setUser, setToken} = useStateContext();

    const handleSubmit = (e) => {
        e.preventDefault()
        const payload = {
            firstname: firstnameRef.current.value,
            lastname: lastnameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: confirmationPasswordRef.current.value
        }

        axiosClient.post('/signup', payload)
        .then(({data}) => {
            setUser(data[0].user)
            setToken(data[0].token)
        }).catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors)
                console.log(response.data.errors);
            }
        })
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <h1>Sign up</h1> <br />
                {errors && <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>}
                <form onSubmit={handleSubmit}>
                    <input ref={firstnameRef} type="text" placeholder="Firstname" />
                    <input ref={lastnameRef} type="text" placeholder="Lastname" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <input ref={confirmationPasswordRef} type="password" placeholder="Confirm assword" />
                    <button type="submit" className="btn btn-block">Sign up</button>
                    <p className="message">
                        Already registered? <Link to='/login'>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}