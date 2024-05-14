import React from "react";
import "../style/Card.css";
import HeartRateGraph from "./HeartRateGraph";
import ECG from "./ECG";

export const Card = ({ profilePict, heartBeat, bloodPressure, temperature }) => {
    return (
        <div className="card">
            <div className="profile-pict">{profilePict}</div>
            <div className="heart-beat"><ECG targetBpm={heartBeat}/></div>
            <div className="blood-pressure">{bloodPressure}</div>
            <div className="temperature">{temperature}</div>
        </div>
    );
};
