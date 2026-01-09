import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import './App.css';

import {
  AppLayout,
  ProtectedRoute,
  PublicRoute
} from "./layouts";
import { Toaster } from "./components/ui/sonner";

import {
  Dashboard,
  Notifications,
  Users,
  Activities,
  Nudges,
  Notes,
  Feedback,
  Issues,
  Partners,
  FAQs,
  Emails,
  Login,
} from "./pages"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={(
          <PublicRoute>
            <Login />
          </PublicRoute>
        )}
        />
        <Route path="/" element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
          <Route path="/" index element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/nudges" element={<Nudges />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/emails" element={<Emails />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
