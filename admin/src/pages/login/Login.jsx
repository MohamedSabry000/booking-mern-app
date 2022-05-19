import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
import './login.scss';

const Login = () => {

    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    });

    const {user, loading, error, dispatch} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => {
            return {
                ...prev,
                [e.target.id]: e.target.value
            }
        });
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_Start' });

        try {
            const response = await axios.post("/auth/login", credentials)
            if(response.data.isAdmin) {
              console.log(response.data.isAdmin)
                dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.details });
                navigate("/")
            } else {
              dispatch({ type: 'LOGIN_FAILURE', payload: {message: "You are not allowed"} });
            }
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
        }
    };

    console.log(user);

    return (
        <div className='login'>
            <div className="lContainer">
                <input type="text" placeholder='username' id='username' onChange={handleChange} className="lInput" />
                <input type="password" placeholder='password' id='password' onChange={handleChange} className="lInput" />
                <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
                {error && <p className="lError">{error.message}</p>}
            </div>
        </div>
    );
}

export default Login;
