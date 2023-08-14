import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHome, FaCompass, FaBell, FaEnvelope, FaBookmark, FaList, FaUser, FaBars } from 'react-icons/fa';
import { AiOutlineSearch } from "react-icons/ai";
import MainResults from "./mainSearch";
import UserResults from "./userSearch"

function Search() {
    return (
        <div>
            <div class="row">
                <div class="mainPane col-8">

                    <div className="col-11 position-relative">
                        <div className="row">
                            <input placeholder="Search Parkour"
                                className="form-control rounded-pill ps-5 subPane" />
                            <AiOutlineSearch className="fs-3 col-1 position-absolute" />
                        </div>
                        <div className="row">
                        <div class="dropdown col-3">
                                <select class="form-select btn btn-success" style={{ "background-color": "darkgreen" }}>
                                    <option selected>Region</option>
                                    <option value="1">Northeast</option>
                                    <option value="2">Southeast</option>
                                    <option value="3">Midwest</option>
                                    <option value="4">Southwest</option>
                                    <option value="5">Mountain West</option>
                                    <option value="6">West Coast</option>
                                    <option value="7">Non-continental</option>
                                </select>
                            </div>
                            <div class="dropdown col-3">
                                <select class="form-select btn btn-success" style={{ "background-color": "darkgreen" }}>
                                    <option selected>State</option>
                                    <option value="1">Alabama</option>
                                    <option value="2">Alaska</option>
                                    <option value="3">Arkansas</option>
                                    <option value="4">Scroll Full List</option>
                                </select>
                            </div>
                            <div class="dropdown col-3">
                                <select class="form-select btn btn-success" style={{ "background-color": "darkgreen" }}>
                                    <option selected>Park</option>
                                    <option value="1">Acadia</option>
                                    <option value="2">Arches</option>
                                    <option value="3">Badlands</option>
                                    <option value="4">Scroll Full List</option>

                                </select>
                                </div>
      
                            <div class="dropdown col-3">
                                <select class="form-select btn btn-success" style={{"background-color":"darkgreen"}}>
                                    <option selected>Feature</option>
                                    <option value="1">Coastline</option>
                                    <option value="2">Mountain</option>
                                    <option value="3">Canyon</option>
                                    <option value="4">Lake</option>
                                </select>
                            </div>
                        </div>

                    </div>
                   <MainResults/>
                </div>
                <div class="mainPane col-3">
                    <div className="col-11 position-relative">
                        <div className="row">
                            <input placeholder="Search Users"
                                className="form-control rounded-pill ps-5 subPane" />
                            <AiOutlineSearch className="fs-3 col-3 position-absolute" />
                        </div>
                        <div class="row">
                        <div class="dropdown col-6">
                            <select class="form-select btn btn-success" style={{ "background-color": "darkgreen" }}>
                                <option selected>Role</option>
                                <option value="1">Visitor</option>
                                <option value="2">Ranger</option>
                            </select>
                        </div>

                        <div class="dropdown col-6">
                            <select class="form-select btn btn-success" style={{ "background-color": "darkgreen" }}>
                                <option selected>Park</option>
                                <option value="1">Acadia</option>
                                <option value="2">Arches</option>
                                <option value="3">Badlands</option>
                            </select>
                            </div>
                            </div>
                    </div>
                    <UserResults/>
                   
                </div>
            </div>

        </div>
    )
}

export default Search