import { Outlet, Navigate } from 'react-router-dom'

const UserProtectRoute = () => {
    const j = JSON.parse(localStorage.getItem('user'))
    return (
        j !== null ? 
        (j.admin === false ? <Outlet /> : <Navigate to='/' />) : <Navigate to='/login' />
    )
}

export default UserProtectRoute