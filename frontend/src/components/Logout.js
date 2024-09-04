import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    let navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('authToken'); 
        navigate('/login');
    });
}
