import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css"
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({setOpen, hotelId}) => {

    // const [Hoteldata, setHotelData] = useState([])
    const [selectedRooms, setSelectedRooms] = useState([]);
    // useEffect(() => {
        const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
        // setHotelData(data);
    // }, []);
    console.log(data);
    const {dates} = useContext(SearchContext);

    const getDatesInRange = (startDate, endDate) => {
        console.log(startDate);
        console.log(endDate);
        console.log("===========================");
        const start = new Date(startDate);
        const end = new Date(endDate);
        const date = new Date(start.getTime());
        const dates = [];
        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }
        return dates;
    };

    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            allDates.includes(new Date(date).getTime())
        );
        return !isFound;
    };

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const roomId = e.target.value;
        if (checked) {
            setSelectedRooms([...selectedRooms, roomId]);
        } else {
            setSelectedRooms(selectedRooms.filter(room => room !== roomId));
        }
    }

    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            await Promise.all(selectedRooms.map(async (roomId) => {
                const res = await axios.put(`/rooms/availability/${roomId}`, { dates: allDates });
                return res.data;
            }));
            setOpen(false)
            navigate("/")
        } catch (error) { }
    }

    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark}
                    className="rclose"
                    onClick={() => setOpen(false)}
                />
                <span>Select Your rooms</span>
                {
                    loading? <div>Loading ...</div> :
                    data?.map(room => (
                        <div className="rItem" key={room.id}>
                            <div className="rItemImg">  
                                <img src={room.image} alt="room" />
                            </div>
                            <div className="rItemInfo">
                                <div className="rTitle">
                                    <span>{room.name}</span>
                                    <span>{room.price}</span>
                                </div>
                                <div className="rDesc">
                                    <span>{room.description}</span>
                                </div>
                                <div className="rMax">
                                    <span>Max People: <b>{room.maxPeople}</b></span>
                                </div>
                            </div>
                            <div className="rSelectRooms">
                                {room.roomNumbers.map(roomNumber => (
                                    <div className="room" key={roomNumber}>
                                        <label htmlFor="room">Room {roomNumber.number}</label>
                                        <input 
                                            type="checkbox" 
                                            id="room" 
                                            value={roomNumber._id} 
                                            onChange={handleSelect} 
                                            disabled={!isAvailable(roomNumber)}
                                            />
                                    </div>
                                ))}
                            </div>
                            <button className="rButton" onClick={handleClick}>Reserve Now!</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}


export default Reserve;
