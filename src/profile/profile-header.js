import ParkIcon from '../assets/park-icon';
import { BiSolidEdit } from 'react-icons/bi';

const ProfileHead = () => {
    return (
        <div className="position-relative mb-2">
            <img src="https://cdn.aarp.net/content/dam/aarp/travel/destinations/2020/09/1140-yosemite-hero.imgcache.rev.web.1044.600.jpg"
                className="w-100 h-auto" style={{ maxHeight: "150px" }} />
            <div>
                <h1 className="position-absolute bottom-0 start-0 text-white z-index-above">
                    Yosemite <ParkIcon /></h1>
            </div>
            <button className="parkour-btn orange-btn btn position-absolute top-0 end-0 z-index-above">
                <BiSolidEdit /> Edit Park
            </button>
        </div>

    )
};
export default ProfileHead;