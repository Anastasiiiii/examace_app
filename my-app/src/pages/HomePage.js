import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const HomePage = () => {
    const location=useLocation()
    
    return (
        <div className="homepage">
            <h1>Hello {location.state.id} and welcome to home</h1>
        </div>
    )
}

export default HomePage;