import React, { useRef, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const simulateECG = (bpm) => {
    const heartRateValue = Math.random() * 10 + 60; // Simulate ECG waveform, adjust as needed
    return heartRateValue;
};

const HeartRateGraph = ({ bpm }) => {
    const chartRef = useRef(null);
    const [heartBeatData, setHeartBeatData] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newHeartRateValue = simulateECG(bpm);
            setHeartBeatData(prevData => [...prevData, newHeartRateValue]);
        }, 1000); // Update every 1 second (adjust as needed)

        // Destroy the interval on component unmount
        return () => clearInterval(interval);
    }, [bpm]);

    useEffect(() => {
        // Initialize or update the chart
        const ctx = chartRef.current.getContext("2d");

        // Make the canvas visually fill its parent container
        ctx.canvas.style.width = '100%';
        ctx.canvas.style.height = '100%';

        // Set the internal size to match
        ctx.canvas.width = ctx.canvas.offsetWidth;
        ctx.canvas.height = ctx.canvas.offsetHeight;

        const data = {
            labels: Array.from({ length: heartBeatData.length }, (_, index) => `${index + 1}`),
            datasets: [
                {
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(0,128,0,1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(0,128,0,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(0,128,0,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: heartBeatData,
                },
            ],
        };

        const options = {
            plugins: {
                legend: {
                    display: false, // Set display to false to hide the legend
                },
            },
            scales: {
                x: {
                    type: "category",
                    labels: Array.from({ length: heartBeatData.length }, (_, index) => `${index + 1}`),
                    display: true,
                },
                y: {
                    beginAtZero: true,
                    max: 120,
                },
            },
        };

        new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
        });

        // Destroy the previous chart instance on component unmount
        return () => {
            const chartInstance = Chart.getChart(ctx);
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [heartBeatData]);

    return <canvas ref={chartRef} style={{ width: "100%" }} />;
};

export default HeartRateGraph;
