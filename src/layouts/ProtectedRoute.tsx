import { Navigate } from 'react-router-dom'
import { useAdminStore } from '../store/adminStore'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAdminStore()

  return isAuthenticated ? <>{children}</> : <Navigate to="/auth/login" replace />
}

export default ProtectedRoute
