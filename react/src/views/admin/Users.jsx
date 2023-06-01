import { useEffect, useState } from "react"
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext();

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = () => {
        setLoading(true)

        axiosClient.get('/users')
        .then(({data}) => {
            console.log(data)
            setUsers(data.data)
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
            console.log(err)
        })
    }

    const handleDelete = (user) => {
        if (!window.confirm('Are you sure you want to delete the user?')) {
            return
        }

        axiosClient.delete(`/users/${user.id}`)
        .then(() => {
            setNotification('User deleted successfuly!')
            getUsers()
        })
        .catch((err) => {
            setLoading(false)
            console.error(err)
        })
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Users</h1>
                <Link to='/users/new'>Add new</Link> 
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colspan="5" className="text-center">Loading...</td>
                            </tr>
                        )}
                        
                        {users?.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.created_at}</td> 
                                <td>
                                    <Link className="btn-edit" to={`/users/${user.id}`}>Edit</Link>
                                    <button onClick={(e) => handleDelete(user)} className="btn-delete" >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> 
            </div>
        </div>
    )
}