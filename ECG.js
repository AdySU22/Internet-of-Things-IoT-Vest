import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const ECG = ({targetBpm}) => {
  const chartRef = useRef(null);

  // Initialize ECG data as an array of zeros Ubah Skala di Array
  const [ecgData, setEcgData] = useState({
    labels: Array(75).fill(0).map((_, i) => i),
    datasets: [
      {
        data: Array(75).fill(0),
        label: 'ECG Data',
        borderColor: '#7dfdfe', // Set the line color to #7dfdfe
        borderWidth: 2,
        fill: false,
        showLine: true,
        pointRadius: 0,
        pointHitRadius: 0,
        lineTension: 0.25,
      },
    ],
  });
  

  useEffect(() => {
    const beatsPerMinute = targetBpm;
    const beatsPerSecond = beatsPerMinute / 60;
    const maxBeatsPerSecond = 4;
  
    const beatInterval = 1000 / Math.min(beatsPerSecond, maxBeatsPerSecond);
  
    let beatCount = 0;
  
    // Generate a new heartbeat pattern every beat interval
    const beatIntervalId = setInterval(() => {
      if (beatCount % Math.floor(maxBeatsPerSecond / beatsPerSecond) === 0) {
        // Add beat pattern
        const heartbeatPattern = [0, 0.15, 0, 1, -0.5, 0, 0.25, 0];
  
        setEcgData((prevData) => ({
          ...prevData,
          datasets: prevData.datasets.map((dataset) => ({
            ...dataset,
            data: [...dataset.data.slice(heartbeatPattern.length), ...heartbeatPattern],
          })),
        }));
      } else {
        // Add no beat pattern
        const noBeatPattern = Array(8).fill(0);
  
        setEcgData((prevData) => ({
          ...prevData,
          datasets: prevData.datasets.map((dataset) => ({
            ...dataset,
            data: [...dataset.data.slice(noBeatPattern.length), ...noBeatPattern],
          })),
        }));
      }
  
      beatCount++;
    }, beatInterval);
  
    // Clear the beat interval when the component is unmounted or when the target BPM changes
    return () => clearInterval(beatIntervalId);
  }, [targetBpm]);
  



  useEffect(() => {
    // Initialize or update the chart
    const ctx = chartRef.current.getContext('2d');

    // Destroy the previous chart instance
    const previousChartInstance = Chart.getChart(ctx);
    if (previousChartInstance) {
      previousChartInstance.destroy();
    }

    // Make the canvas visually fill its parent container
    ctx.canvas.style.width = '100%';
    ctx.canvas.style.height = '100%';

    // Set the internal size to match
    ctx.canvas.width = ctx.canvas.offsetWidth;
    ctx.canvas.height = ctx.canvas.offsetHeight;

    // Create the chart with animation set to false
    new Chart(ctx, {
      type: 'line',
      data: ecgData,
      options: {
        plugins: {
          legend: {
            display: false, // Set display to false to hide the legend
          },
        },
        scales: {
          x: {
            display: false, // Hide x-axis labels
          },
          y: {
            display: false, // Hide y-axis labels
            beginAtZero: true,
            min: -1,
            max: 1,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: false, // Suppress the animation
      },
    });

  }, [ecgData]);

  return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <canvas ref={chartRef} style={{ width: '100%' }} />
        <div style={{ position: 'absolute', top: "-0.6vw", left: "1vw", textAlign: 'left', fontSize: '1vw', fontWeight: 'bold', padding: '10px', backgroundColor: 'rgba(211, 211, 211, 0.65)', borderRadius: '10px' }}>
          BPM: {targetBpm}
        </div>

    </div>
  );
  
};

export default ECG;
