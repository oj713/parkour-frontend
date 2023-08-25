import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import "./create-post.css";
import {useSelector} from 'react-redux';
import {BsPencilSquare} from 'react-icons/bs';
import {MdLocationPin} from 'react-icons/md';
import {findParksHeaders} from '../services/users-services';
import {createPost} from '../services/posts-service';

const gradientBackground = (image) => {
    const background = image ? `url(${image})` : "var(--green1)"
    return {
    "background": `linear-gradient(rgba(0, 0, 0, .1), rgba(0, 0, 0, .6)),
    ${background} no-repeat center / cover`
    }
}

// a lot of this is shamelessly copy pasted from ParkourPost.js, in theory we would share
// common components but that's a task for when we have time to spare
const CreatePostComponent = ({parkInfo, onCreate}) => {
    // current location and user
    let {currentUser} = useSelector(state => state.auth)
    let isPark = currentUser.role === "park"

    // selected park information
    let [park, setPark] = useState(parkInfo)
    let [parksList, setParksList] = useState([])

    // other needed post information
    let [text, setText] = useState("")
    let [attachment, setAttachment] = useState("")
    let [location, setLocation] = useState("")

    const borderStyle = {"border": "3px var(--brown3) solid", "borderRadius": "var(--bs-border-radius"}

    const createPostHandler = () => {
        if (text && park) {
            const newPost = {
                text: text,
                attachment: attachment,
                location: location,
                parkId: park._id,
                userId: {role: currentUser.role, item: currentUser._id}
            }
            createPost(newPost).then(response => {
                onCreate(response)
                setText("")
                setAttachment("")
                setLocation("")
                setPark(parkInfo)
            }).catch(error => {
                window.alert("Error: something went wrong. Please try again or change your post.")
            })
        } else {
            window.alert("Error: posts must have text content and a specified park.")
        }
    }

    useEffect(() => {
        setPark(parkInfo)
    }, [parkInfo])

    useEffect(() => {
        if (!parkInfo) {
            findParksHeaders().then(response => {
                setParksList(response)
            })
        }
    }, [parkInfo])

    return (
        <div className = "subPane p-0 addPadding">
            {!isPark &&
                <div style = {gradientBackground(park ? park.profileImage : null)}>
                    {parkInfo ?
                        <h3 className = "white ms-1 me-1">{parkInfo.displayName} National Park</h3> :
                        <select className="white p-1 bg-transparent border-0 selectPark"
                            onChange = {(e) => {
                                setPark(parksList.find(park => park._id === e.target.value) || "")
                            }} 
                            value = {park ? park._id : ""}>
                            <option key = "" value = "">Choose Park...</option>
                            {parksList.map(park => 
                                <option key = {park._id} value={park._id}>{park.displayName}</option>)}
                        </select>
                    }
                </div>
            }
            <div className = "d-flex flex-wrap text-nowrap" style = {isPark ? gradientBackground(currentUser.profileImage) : {"paddingBottom": "0"}}>
                {isPark ?
                <div className = "white flex-grow-1 m-1">
                    <h3 className = "ms-2 me-1">{currentUser.displayName} <BsPencilSquare size = "1.3em"/></h3>
                </div> :
                <div className = "d-flex align-items-center flex-grow-1">
                    <div className = "pe-2 mb-2">
                        <img className="rounded-circle object-fit-cover" height={48} width = {48} 
                            src={currentUser.profileImage}/>
                    </div>
                    <div className = "up-2 green2">
                        <div>
                            <h3 className = "me-1">{currentUser.displayName}</h3> 
                            <BsPencilSquare size = "1.3em"/>
                        </div> 
                        <div className = "up-2">@{currentUser.username}</div>
                    </div>
                </div>}
                <div>
                    <div className = "locationPin parkour-btn orange1-bg">
                        <MdLocationPin className = "icon up-2"/>
                        <input id = "location" type = "text" 
                        value = {location} placeholder = "Add Location..." className = "bg-transparent"
                        size = "13" onChange = {(event) => setLocation(event.target.value)}/>
                    </div>
                </div>
            </div>
            <div>
                <textarea value = {text} placeholder={parkInfo ? `Post to ${parkInfo.displayName}...` : "Post something..."} className = "form-control bg-transparent green2"
                    style = {borderStyle}
                    onChange = {(event) => setText(event.target.value)}>
                </textarea>
            </div>
            <div className = "d-flex flex-wrap text-nowrap">
                <div className = "flex-grow-1">
                    <label htmlFor="attachment" className="green2 me-2">Attachment:</label>
                    <input id="attachment" type = "text" value = {attachment} placeholder = "Paste an image URL..." className = "bg-transparent green2"
                        style = {borderStyle} onChange = {(event) => setAttachment(event.target.value)} />
                </div>
                <div>
                    <button className = "btn parkour-btn green-btn"
                        onClick = {createPostHandler}>
                        Post
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreatePostComponent;