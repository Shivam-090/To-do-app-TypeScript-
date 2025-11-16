import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword";
import Todos from "./pages/todos";
import { useAuth } from "./hooks/useAuth";

function App(){
    const token = useAuth((s) => s.token);

return (
    <div className="min-h-screen p-6 bg-linear-to-br from-teal-400 via-cyan-500 to-blue-600">

    <BrowserRouter>
    <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        <Route path="/todos" element={token ? <Todos /> : <Navigate to="/signin" />} />

        <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
    </BrowserRouter>
        </div>
)
}

export default App;