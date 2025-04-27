import React from 'react'
import FloatingShape from './components/FloatingShape.jsx'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { Toaster } from 'react-hot-toast'
import {useAuthStore} from './store/authStore.js'
import {useEffect} from 'react'
import HomePage from './pages/HomePage.jsx'
import LoadingSpinner from "./components/LoadingSpinner.jsx"
import Navbar from './components/Navbar.jsx'
import AnimeContent from './pages/AnimeContent.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'



//redirect authenticated users to home page
const RedirectAuthenticatedUser = ({children}) => {

  const {isAuthenticated} = useAuthStore();
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};
// protected route that require authentication
const ProtectedRoute = ({children})=> {
  const {isAuthenticated} = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};


function App() {
  const {isCheckingAuth, checkAuth} = useAuthStore();
  const location = useLocation();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if(isCheckingAuth) return <LoadingSpinner/>
  return (
    <>
    {(location.pathname === `/` || location.pathname === `/adminDashboard` || location.pathname === `/favorites` || location.pathname === `/watchlist` || location.pathname.startsWith(`/anime/`)) && <Navbar />}
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center relative overflow-hidden">
      {(location.pathname === '/signup' || location.pathname === '/login') && 
      <>
      <FloatingShape color="bg-[#657be8]" size="w-64 h-64" top="-5%" left="10%" delay={0}/>
      <FloatingShape color="bg-[#657be0]" size="w-48 h-48" top="70%" left="80%" delay={5}/>
      <FloatingShape color="bg-blue-900" size="w-32 h-32" top="40%" left="10%" delay={2}/>
      </>
      }

      <Routes>
        <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
        <Route path="/signup" element={<RedirectAuthenticatedUser><SignUpPage/></RedirectAuthenticatedUser>}/>
        <Route path="/login" element={<RedirectAuthenticatedUser><LoginPage/></RedirectAuthenticatedUser>}/>
        <Route path="/anime/:id" element={<ProtectedRoute><AnimeContent/></ProtectedRoute>}/>
        <Route path="/adminDashboard" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>}/>
      </Routes>
    
      <Toaster />
    </div>
    </>
  )
}

export default App
