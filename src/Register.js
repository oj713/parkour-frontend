import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registerThunk } from "./services/auth-thunks";
function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLasttName] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleRegister = async () => {
        try {
            const newUser = { username, password, firstName, lastName, role };
            await dispatch(registerThunk(newUser));
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
                <label>First Name</label>
                <input className="form-control" type="text" value={firstName}
                    onChange={(event) => setFirstName(event.target.value)} />
            </div>
            <div className="mt-2">
                <label>Last Name</label>
                <input className="form-control" type="text" value={lastName}
                    onChange={(event) => setLasttName(event.target.value)} />
            </div>
            <div className="mt-2">
                <label>Role</label>
                <div className="form-check">
                    <input class="form-check-input" type="radio" name="role" id="hiker" value="hiker" onChange={event => setRole(event.target.value)}/>
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
            </div>
            <button className="btn btn-primary mt-2"
                onClick={handleRegister}>
                Register
            </button>
        </div>
    );

}
export default Register;