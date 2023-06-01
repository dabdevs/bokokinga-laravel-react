import {Navigate, createBrowserRouter} from 'react-router-dom';
import Login from './views/Login';
import Signup from './views/Signup';
import Categories from './views/admin/Categories';
import Products from './views/admin/Products';
import Users from './views/admin/Users';
import NotFound from './views/NotFound';
import AdminLayout from './components/AdminLayout';
import GuestLayout from './components/GuestLayout';
import Dashboard from './views/admin/Dashboard';
import UserForm from './views/admin/UserForm';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AdminLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/products',
                element: <Products />
            },
            {
                path: '/categories',
                element: <Categories />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate"/>
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate" />
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/login' />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            }
        ]
    }, 
    {
        path: '*',
        element: <NotFound />
    }
])

export default router;