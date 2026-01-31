import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { setAuthToken, removeAuthToken, COOKIE_NAMES } from '../utils/cookies'

interface Admin {
  id: string;
  full_name: string;
  email_address: string;
  user_type: string;
  profile_visibility: boolean;
  is_verified: boolean;
  daily_nudge: boolean;
  special_occassion_reminders: boolean;
  silent_mode: boolean;
  language: string;
  createdAt: string;
  updatedAt: string;
}

interface adminState {
  admin: Admin | null
  isAuthenticated: boolean
  login: (data: { user: Admin; token: string }) => void
  logout: () => void
}

export const useAdminStore = create<adminState>()(
  persist(
    (set) => ({
      admin: null,
      isAuthenticated: false,
      login: ({ user, token }: { user: Admin; token: string }) => {
        setAuthToken(token, COOKIE_NAMES.ACCESS_TOKEN);
        set({ admin: user, isAuthenticated: true });
      },
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
