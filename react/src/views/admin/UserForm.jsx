import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../../axios-client"
import { useStateContext } from "../../contexts/ContextProvider"

export default function UserForm() {
    const {id} = useParams()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [errors, setErrors] = useState()
    const {setNotification} = useStateContext()
    const [user, setUser] = useState({
        id: null,
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    // If editing, fill the form with the user's data
    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/admin/users/${id}`)
            .then(({data}) => {
                setLoading(false)
                setUser(data)
            })
            .catch(() => setLoading(false))
        }, [])
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (user.id) {
            // Updating user
            axiosClient.put(`/admin/users/${user.id}`, user)
            .then(() => {
                setNotification('User updated successfuly!')
                navigate('/admin/users')
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                    console.log(response.data.errors);
                }
            })
        } else {
            // Creating user
            axiosClient.post('/admin/users', user)
                .then(() => {
                    setNotification('User created successfuly!')
                    navigate('/admin/users')
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                        console.log(response.data.errors);
                    }
                })
        }
    }

    return (
        <>
            {user.id && <h1>Update User: {user.email}</h1>}
            {!user.id && <h1>New User</h1>}

            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}

                {errors && <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>}

                {!loading &&
                    <form onSubmit={handleSubmit}>
                        <input onChange={e => setUser({ ...user, firstname: e.target.value })} value={user.firstname} placeholder="Firstname" />
                        <input onChange={e => setUser({ ...user, lastname: e.target.value })} value={user.lastname} placeholder="Lastname" />
                        <input type="email" onChange={e => setUser({ ...user, email: e.target.value })} value={user.email} placeholder="Email" />
                        <input type="password" onChange={e => setUser({ ...user, password: e.target.value })} value={user.password} placeholder="Password" />
                        <input type="password" onChange={e => setUser({ ...user, password_confirmation: e.target.value })} value={user.password_confirmation} placeholder="Password Confirmation" />
                        <button className="btn">Save</button>
                    </form>
                }
            </div>
        </>
    )
}