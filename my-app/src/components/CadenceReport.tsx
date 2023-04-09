import React, { useEffect, useState } from 'react';

interface CadenceData {
  average_cadence: number;
  pace_vs_cadence_r2: number;
  heartrate_vs_cadence_r2: number;
  average_heart_rate_vs_average_cadence_plot: string;
  average_pace_vs_average_cadence_plot: string;
}

function CadenceReport() {
  const [data, setData] = useState<CadenceData>({
    average_cadence: 0,
    pace_vs_cadence_r2: 0,
    heartrate_vs_cadence_r2: 0,
    average_heart_rate_vs_average_cadence_plot: 'null',
    average_pace_vs_average_cadence_plot: 'null',
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/cadence-report`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Cadence Report</h2>
      {data.average_cadence < 167 ? (
        <p>
          Your last run's average cadence was <span>{data.average_cadence}/min</span>, falling below the optimal range of 170-180. Focus on raising your cadence to enhance your running form and avoid overstriding.
        </p>
      ) : data.average_cadence >= 167 && data.average_cadence <= 182 ? (
        <p>
          Superb job on maintaining an average cadence of <span>{data.average_cadence}/min</span> on your last run! Keep up the excellent work and continue to concentrate on proper running form.
        </p>
      ) : (
        <p>
          Your last run's average cadence was <span>{data.average_cadence}/min</span>, which is above the optimal range of 170-180. Be cautious not to overstride and concentrate on proper running form to prevent injury.
        </p>
      )}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ flex: 1, marginRight: '5px' }}>
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/images/${data.average_pace_vs_average_cadence_plot}`}
            alt="Average Pace vs Cadence"
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ flex: 1, marginLeft: '5px' }}>
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/images/${data.average_heart_rate_vs_average_cadence_plot}`}
            alt="Average Heartrate vs Average Cadence"
            style={{ width: '100%' }}
          />
        </div>
      </div>
      <p>
        We've discovered a significant positive correlation (r-squared = {data.pace_vs_cadence_r2}) between cadence and speed (as pace), and no notable correlation between your average heart rate and the cadence at which you complete your runs (r-squared = {data.heartrate_vs_cadence_r2}).
      </p>
    </div>
  );
}

export default CadenceReport;