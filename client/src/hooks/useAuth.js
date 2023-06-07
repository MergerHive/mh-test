import { useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { selectCurrentToken } from '../features/login/authSlice'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false
    let status = "Employee"
    let isLogIn = false

    if (token) {
        const decoded = jwtDecode(token)
        const { email, roles, firstName, lastName, contactNumber, userID } = decoded.UserInfo
        isManager = roles.includes('Manager')
        isAdmin = roles.includes('Admin')
        if (email && (roles.includes('User') || roles.includes('Employee') || roles.includes('Manager') || roles.includes('Admin'))) isLogIn = true
        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"

        return { email, roles, status, isManager, isAdmin, isLogIn, firstName, contactNumber, lastName, userID }
    }

    return { email: '', roles: [], isManager, isAdmin, status, isLogIn, firstName: '', lastName: '', userID: '', contactNumber: '' }
}
export default useAuth