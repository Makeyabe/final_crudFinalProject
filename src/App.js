import { Routes, Route } from "react-router-dom";
import Navbar from './Navbar';
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import Users from './Users';
import UserCreate from "./UserCreate";
import UserUpdate from "./UserUpdate";

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="users" element={<Users />} />
        <Route path="register" element={<Register />} />
        <Route path="create" element={<UserCreate />}/>
        <Route path="update/:id" element={<UserUpdate />}/>
      </Routes>
    </div>
  );
}

export default App;
