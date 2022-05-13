import React from "react";
import history from "../history";
const Popoup = ({title, background = 'light'}) => {
    const text = background === 'dark' ? 'light' : 'dark';
    const button = background === 'dark' ? 'secondary' : 'dark';
    return (
        <div className={`card border border-2 border-secondary p-2 m-3 mx-auto bg-${background}`} style={{ width: '27rem'}}>
            <div className={`card-body text-center text-${text}`}>
                <h1>{title}</h1>
                <button onClick={()=>history.push('/')} className={`btn btn-${button}`}>OK</button>
            </div>
        </div>
    );
};

export default Popoup;