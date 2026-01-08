import { Navigate } from 'react-router-dom'
import { useAdminStore } from '../store/adminStore'

interface PublicRouteProps {
  children: React.ReactNode
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated } = useAdminStore()

  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>
}

export default PublicRoute
