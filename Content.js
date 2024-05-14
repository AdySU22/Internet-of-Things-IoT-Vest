import React from "react";
import { Card } from "./Card";
import "../style/Content.css";

const Content = () => {
    const cardData = [
        { profilePict: "Image1", heartBeat: 50, bloodPressure: "120/80", temperature: "98.6°F" },
        { profilePict: "Image2", heartBeat: 70, bloodPressure: "118/78", temperature: "98.4°F" },
        { profilePict: "Image3", heartBeat: 95, bloodPressure: "122/84", temperature: "98.8°F" },
        { profilePict: "Image4", heartBeat: 45, bloodPressure: "120/82", temperature: "98.8°F" },
    ];

    return (
        <div className="Content">
            <ul className="card-list">
                {cardData.map((data, index) => (
                    <li key={index}>
                        <Card {...data} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Content;
