import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const reFetch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    };
    
    return { data, loading, error, reFetch };
}

export default useFetch;