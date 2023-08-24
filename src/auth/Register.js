import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registerThunk } from "../services/auth-thunks";
function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleRegister = async () => {
        try {
            const newUser = { username, password, displayName, role };
            dispatch(registerThunk(newUser));
            navigate("/profile");
        } catch (e) {
            alert(e);
        }
    };
    return (
        <div>
            <h1>Register Screen</h1>
            <div className="mt-2">
                <label>Username</label>
                <input className="form-control" type="text" value={username}
                    onChange={(event) => setUsername(event.target.value)} />
            </div>
            <div className="mt-2">
                <label>Password</label>
                <input className="form-control" type="password" value={password}
                    onChange={(event) => setPassword(event.target.value)} />
            </div>
            <div className="mt-2">
                <label>Display Name</label>
                <input className="form-control" type="text" value={displayName}
                    onChange={(event) => setDisplayName(event.target.value)} />
            </div>
            <div className="mt-2">
                <label>Role</label>
                <div className="form-check">
                    <input class="form-check-input" type="radio" name="role" id="hiker" value="hiker" checked={role === "hiker"} onChange={event => setRole(event.target.value)}/>
                        <label class="form-check-label" for="hiker">
                            Hiker
                        </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="role" id="ranger" value="ranger" checked={role === "ranger"} onChange={event => setRole(event.target.value)} />
                        <label class="form-check-label" for="ranger">
                            Ranger
                        </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="role" id="park" value="park" checked={role === "park"} onChange={event => setRole(event.target.value)} />
                        <label class="form-check-label" for="park">
                            Park
                        </label>
                </div>
            </div>
            <button className="btn btn-primary mt-2"
                onClick={handleRegister}>
                Register
            </button>
        </div>
    );

}
export default Register;