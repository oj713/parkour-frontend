import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginThunk } from "../services/auth-thunks";
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = async () => {
        try {
            await dispatch(loginThunk({ username, password }))
            navigate("/profile");
        } catch (e) {
            alert(e);
        }
    };
    return (
        <div className = "row">
            <div className="mainPane green2 col">
                <h1>Login</h1>
                <div className="mt-2">
                    <label>Username</label>
                    <input className="form-control" type="text" value={username} placeholder = "hikerAlice"
                        onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div className="mt-2">
                    <label>Password</label>
                    <input className="form-control" type="password" value={password} placeholder = "123"
                        onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button className="btn btn-primary parkour-btn orange-btn mt-2 ms-0"
                    onClick={handleLogin}>
                    <p className = "p-0 m-0 h6 fw-bold">Login</p>
                </button>
            </div>
            <div className = "d-none d-sm-block col-1 col-lg-3"></div>
        </div>
    );

}
export default Login;