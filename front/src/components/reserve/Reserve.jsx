import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css"

const Reserve = ({setOpen, hotelId}) => {
    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark}
                    className="rclose"
                    onClick={() => setOpen(false)}
                />
                <span>Select Your rooms</span>
            </div>
        </div>
    );
}


export default Reserve;





