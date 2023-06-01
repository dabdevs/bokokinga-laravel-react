import { Link } from "react-router-dom"
import { useRef, useState } from "react"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState();

    const { setUser, setToken } = useStateContext();

    const handleSubmit = (e) => {
        e.preventDefault()
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        axiosClient.post('/login', payload)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token)
            }).catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors)
                    } else {
                        setErrors({
                            email: [response.data.message]
                        })
                    }
                }
            })
    }

    return ( 
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <h1>Login</h1> <br />
                {errors && <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>}
                <form onSubmit={handleSubmit}>
                    <input ref={emailRef} type="email" placeholder="Email"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    <button type="submit" className="btn btn-block">Login</button>
                    <p className="message">
                        Not registered? <Link to='/signup'>Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}