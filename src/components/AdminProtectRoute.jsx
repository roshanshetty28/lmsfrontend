import { Outlet, Navigate } from 'react-router-dom'

const AdminProtectRoute = () => {
    const j = JSON.parse(localStorage.getItem('user'))
    return (
        j !== null ? 
        (j.admin === true ? <Outlet /> : <Navigate to='/users' />) : <Navigate to='/login' />
    )
}

export default AdminProtectRoute