import { Routes, Route, Router} from "react-router-dom"
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import Dashboard from "./Pages/Dashboard"
import SendMoney from "./Pages/SendMoney"
import Home from "./Pages/Home"
import ProtectedRoute from "./Components/ProtectedRoute"



function App() {

  return (
    <>
           <Routes>

            {/* Public Route */}
              
              <Route path="/" element = {<Signup/>}/>
              <Route path="/signup" element = {<Signup/> } />
              <Route path="/login" element = {<Login/>}/>
              
              {/* Protected Route */}
              <Route 
                path="/dashboard" 
                element = {
                    <ProtectedRoute>
                        <Dashboard/>
                    </ProtectedRoute>
                }/>

              <Route 
                  path="/send" 
                  element = {
                    <ProtectedRoute>
                        <SendMoney/>
                    </ProtectedRoute>
                  }/>

            </Routes>

      
    </>
  )
}

export default App
