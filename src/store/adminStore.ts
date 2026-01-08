import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { removeAuthToken, COOKIE_NAMES } from '../utils/cookies'

interface Admin {
  id: string
  email: string
  name: string
  role: "admin"
}

interface adminState {
  admin: Admin | null
  isAuthenticated: boolean
  login: (admin: Admin) => void
  logout: () => void
}

export const useAdminStore = create<adminState>()(
  persist(
    (set) => ({
      admin: null,
      isAuthenticated: false,
      login: (admin: Admin) => set({ admin, isAuthenticated: true }),
      logout: () => {
        // Clear the access token from cookies
        removeAuthToken(COOKIE_NAMES.ACCESS_TOKEN);
        // Clear the admin state
        set({ admin: null, isAuthenticated: false });
      },
    }),
    {
      name: 'loveping-admin',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
