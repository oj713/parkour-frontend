import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registerThunk } from "../services/auth-thunks";
import {findUserByUsername} from "../services/users-services";
function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [role, setRole] = useState("");
    const [parkUsername, setParkUsername] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleRegister = async () => {
        let newUser = {username, password, displayName, role};
        if (role === "rangers") {
            let dbPark = null
            try {
                dbPark = await findUserByUsername(parkUsername)
                if (dbPark.role === "parks") {
                    newUser = {...newUser, parkId: dbPark._id}
                }
            } catch (e) {
                alert("Error: Invalid park username")
                setParkUsername("")
                return
            }
        }
        if (Object.values(newUser).includes("")) {
            alert("Error: Incomplete or invalid fields")
            return
        }
        try {
            await dispatch(registerThunk(newUser));
            navigate("/profile");
        } catch (e) {
            alert(e);
        }
    };
    return (
        <div className="row">
            <div className="mainPane green2 col">
                <h1>Register</h1>
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
                        <input class="form-check-input" type="radio" name="role" id="hiker" value="hikers" checked={role === "hikers"} onChange={event => setRole(event.target.value)}/>
                            <label class="form-check-label" for="hiker">
                                Hiker
                            </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="role" id="ranger" value="rangers" checked={role === "rangers"} onChange={event => setRole(event.target.value)} />
                            <label class="form-check-label" for="ranger">
                                Ranger
                            </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="role" id="park" value="parks" checked={role === "parks"} onChange={event => setRole(event.target.value)} />
                            <label class="form-check-label" for="park">
                                Park
                            </label>
                    </div>
                </div>
                {role === "rangers" && 
                <div className ="mt-2">
                    <label>Home Park Username</label>
                    <input className="form-control" type="text" value={parkUsername} 
                    onChange={(event) => setParkUsername(event.target.value)}/>
                </div>
                }
                <button className="btn btn-primary parkour-btn orange-btn ms-0 mt-2"
                    onClick={handleRegister}>
                    <p className = "p-0 m-0 h6 fw-bold">Register</p>
                </button>
            </div>
            <div className = "d-none d-sm-block col-1 col-lg-3"></div>
        </div>
    );

}
export default Register;