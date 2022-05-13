import React, {useState} from "react";

import EditData from "./EditData";
import EditPassword from "./EditPassword";
const UserSettings = () => {

    
    const [activeSettings, setActiveSettings] = useState(1) // 1 - Dane  2 -

    const renderSettings = () => {
        if (activeSettings === 1)return <EditData/>;
        return <EditPassword/>;
    }

    return (
        <>
            <div className="btn-group w-75" role="group" aria-label="Basic outlined example">
                <button type="button" onClick={() => setActiveSettings(1)} className={`btn ${activeSettings === 1 ? 'btn-dark' : 'btn-outline-dark'} `}>Zmień Dane</button>
                <button type="button" onClick={() => setActiveSettings(2)}className={`btn ${activeSettings === 2 ? 'btn-dark' : 'btn-outline-dark'} `}>Zmień Hasło</button>
            </div>
            {renderSettings()}
        </>
    );
};

export default UserSettings;