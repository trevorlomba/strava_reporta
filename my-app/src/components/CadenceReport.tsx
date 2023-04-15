import React, { useEffect, useState } from 'react';

interface CadenceData {
  average_cadence: number;
  pace_vs_cadence_r2: number;
  heartrate_vs_cadence_r2: number;
  average_heart_rate_vs_average_cadence_plot: string;
  average_pace_vs_average_cadence_plot: string;
  most_recent_cadence: number;
}

function CadenceReport() {
  const [data, setData] = useState<CadenceData>({
    average_cadence: 0,
    pace_vs_cadence_r2: 0,
    heartrate_vs_cadence_r2: 0,
    average_heart_rate_vs_average_cadence_plot: 'null',
    average_pace_vs_average_cadence_plot: 'null',
    most_recent_cadence: 0
  });

  const [oldData, setOldData] = useState<CadenceData>({
    average_cadence: 0,
    pace_vs_cadence_r2: 0,
    heartrate_vs_cadence_r2: 0,
    average_heart_rate_vs_average_cadence_plot: 'null',
    average_pace_vs_average_cadence_plot: 'null',
    most_recent_cadence: 0
  });

  const updateData = () => {
    setOldData(data)
    const randomData = {
      average_cadence: Math.floor(Math.random() * (55 + 1)) + 140,
      pace_vs_cadence_r2: data.pace_vs_cadence_r2,
      heartrate_vs_cadence_r2: data.heartrate_vs_cadence_r2,
      average_heart_rate_vs_average_cadence_plot: data.average_heart_rate_vs_average_cadence_plot,
      average_pace_vs_average_cadence_plot:  data.average_pace_vs_average_cadence_plot,
      most_recent_cadence: Math.floor(Math.random() * (55 + 1)) + 140}
    setData(randomData)
    setRandom(true);
  };

   const returnData = () => {
    setData(oldData)
    setRandom(false);
  };

  const [random, setRandom] = useState(false)
  const [averagePaceVsAverageCadencePlot, setAveragePaceVsAverageCadencePlot] = useState<string>('');
  const [averageHeartRateVsAverageCadencePlot, setAverageHeartRateVsAverageCadencePlot] = useState<string>('');



  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/cadence-report`)
     .then((response) => {
			if (response.ok) {
			return response.json()
			}
			throw new Error('Failed to fetch data')
		})
		.then((data) => {
			setData(data);
			setAveragePaceVsAverageCadencePlot(`${process.env.REACT_APP_BACKEND_URL}/images/${data.average_pace_vs_average_cadence_plot}`);
			setAverageHeartRateVsAverageCadencePlot(`${process.env.REACT_APP_BACKEND_URL}/images/${data.average_heart_rate_vs_average_cadence_plot}`);
		})
		.catch((error) => console.error('Error fetching data:', error))
	}, [])

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Cadence Analysis</h2>
      {averageHeartRateVsAverageCadencePlot && averagePaceVsAverageCadencePlot ? <><div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ flex: 1, marginRight: '5px' }}>
          <img
            src={averagePaceVsAverageCadencePlot}
            alt="Average Pace vs Cadence"
            style={{ width: '100%' }} />
        </div>
        <div style={{ flex: 1, marginLeft: '5px' }}>
          <img
            src={averageHeartRateVsAverageCadencePlot}
            alt="Average Heartrate vs Average Cadence"
            style={{ width: '100%' }} />
        </div>

      </div><p className="img-text">
          We've discovered a significant relationship (r-squared = <span className='little-span highlight'>{data.pace_vs_cadence_r2}</span>) between cadence and speed (as pace), and no notable correlation between cadence and average heart rate.
        </p></> : <div className="loader"></div>}
      
      {data.most_recent_cadence < 167 ? (
        <p>
          Your last run's average cadence was <span className="highlight">{data.most_recent_cadence}/min</span>, falling below the optimal range of 170-180. Focus on raising your cadence to enhance your running form and avoid overstriding.
        </p>
      ) : data.most_recent_cadence >= 167 && data.most_recent_cadence <= 182 ? (
        <p>
          Superb job on maintaining an average cadence of <span className="highlight">{data.most_recent_cadence}/min</span> on your last run! Keep up the excellent work and continue to concentrate on proper running form.
        </p>
      ) : (
        <p>
          Your last run's average cadence was <span className="highlight">{data.most_recent_cadence}/min</span>, which is above the optimal range of 170-180. Be cautious not to overstride and concentrate on proper running form to prevent injury.
        </p>
      )}
      {/* {random ? <h4 onClick={returnData}>(Reload Personal Data)</h4> : <h4 onClick={updateData}>(Randomize Data)</h4> } */}
    </div>
  );
}

export default CadenceReport;