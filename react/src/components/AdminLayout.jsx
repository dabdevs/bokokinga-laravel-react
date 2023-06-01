import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { useEffect } from "react";
import '../admin.css'

export default function AdminLayout() {
    const {user, token, notification, setUser, setToken} = useStateContext()

    if(!token) {
        return <Navigate to='/login' />
    }

    const onLogout = (e) => {
        e.preventDefault() 
        axiosClient.post('/logout', {})
            .then(({ data }) => {
                setUser({})
                setToken(null)
            }).catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                    console.log(response.data.errors);
                }
            })
    }

    useEffect(() => {
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data)
        })
    }, [])

    return (
        <div id="defaultLayout">
            <aside>
                <Link to='/admin/products'>Productos</Link> 
                <Link to='/admin/categories'>Categories</Link> 
                <Link to='/admin/users'>Users</Link> 
            </aside>
            <div className="content">
                {notification && 
                    <div className="notification">
                        {notification}
                    </div>
                }
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.email}
                        <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}