import React, { useEffect, useState } from 'react';

interface MileageData {
  week_prog: number;
  next_week_goal: number;
  miles_left: number;
  days_zero_last_3: number;
  days_zero_last_14: number;
  total_distance_by_week_plot: string;
  moving_time_by_day_plot: string;
}

function MileageReport() {
  const [data, setData] = useState<MileageData>({
    week_prog: 0,
    next_week_goal: 0,
    miles_left: 0,
    days_zero_last_3: 0,
    days_zero_last_14: 0,
    total_distance_by_week_plot: 'null',
    moving_time_by_day_plot: 'null',
  });
  const [oldData, setOldData] = useState<MileageData>({
    week_prog: 0,
    next_week_goal: 0,
    miles_left: 0,
    days_zero_last_3: 0,
    days_zero_last_14: 0,
    total_distance_by_week_plot: 'null',
    moving_time_by_day_plot: 'null',
  });
  const [random, setRandom] = useState(false)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/mileage-report`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch data');
      })
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

   const updateData = () => {
    setOldData(data)
    let week_prog_temp = Math.floor(Math.random() * 50) + 1
    let next_week_goal_temp = week_prog_temp + Math.floor(Math.random() * 20)
    let miles_left_temp = next_week_goal_temp - week_prog_temp
    let days_zero_last_3_temp = Math.floor(Math.random() * 3)
    let days_zero_last_14_temp = Math.floor(Math.random() * 7) + days_zero_last_3_temp
    const randomData = {
      week_prog: week_prog_temp,
      next_week_goal: next_week_goal_temp,
      miles_left: miles_left_temp,
      days_zero_last_3: days_zero_last_3_temp,
      days_zero_last_14: days_zero_last_14_temp,
      total_distance_by_week_plot: data.total_distance_by_week_plot,
      moving_time_by_day_plot:  data.moving_time_by_day_plot,
    };
    setData(randomData)
    setRandom(true);
  };

   const returnData = () => {
    setData(oldData)
    setRandom(false);
  };

  if (!data) {
    return <p>Loading...</p>;
  }
  const { week_prog, next_week_goal, miles_left, days_zero_last_3, days_zero_last_14 } = data;

  return (
    <div>
      <h2>Mileage Update</h2>      
      {week_prog < next_week_goal - 5 ? (
        <p>
          Well done on achieving <span>{week_prog}</span> miles this week, keep striving and don't give up! You're
          making impressive progress towards your goal of <span>{next_week_goal}</span> miles by the end of the week.
          Only <span>{miles_left}</span> miles to go!
        </p>
      ) : week_prog >= next_week_goal - 5 && week_prog < next_week_goal ? (
        <p>
          Excellent effort on covering <span>{week_prog}</span> miles this week, you're nearing your goal of{' '}
          <span>{next_week_goal}</span> miles. Maintain the momentum and you'll reach your goal in just{' '}
          <span>{miles_left}</span> more miles!
        </p>
      ) : (
        <p>
          Great job on covering <span>{week_prog}</span> miles this week! You've exceeded your goal of{' '}
          <span>{next_week_goal}</span> miles, way to go! Remember to take a rest day or two for recovery and injury
          prevention, and resume training soon to keep working towards your objectives.
        </p>
      )}
            {random ? <h4 onClick={returnData}>(Reload Personal Data)</h4> : <h4 onClick={updateData}>(Randomize Data)</h4> }
      <img
        src={`${process.env.REACT_APP_BACKEND_URL}/images/${data.total_distance_by_week_plot}`}
        alt="Total Distance by Week"
      />
      <p>
        Keep in mind, it's crucial to gradually increase your mileage each week by no more than 10% for injury
        prevention and safe endurance building. Let's keep working towards that finish line together!
      </p>
      <img
        src={`${process.env.REACT_APP_BACKEND_URL}/images/${data.moving_time_by_day_plot}`}
        alt="Moving Time by Day"
      />
      {days_zero_last_3 >= 2 ? (
        <p>
          You've taken {days_zero_last_3} rest day(s) in the last 3 days. While rest is essential, remember to stay
          focused on your goals and maintain consistent running habits.
        </p>
      ) : days_zero_last_14 < 2 ? (
        <p>
          Nice work on providing your body with adequate rest. You've taken {days_zero_last_14} rest day(s) in the last 14 days. It's important to balance training and rest to avoid overtraining and injuries. Keep listening to your body and adjusting your schedule as needed.
        </p>
      ) : (
        <p>
          Good balance between training and rest days! You've taken {days_zero_last_14} rest day(s) in the last 14 days. Maintaining this consistency will help you achieve your goals while minimizing the risk of injury.
        </p>
      )}
    </div>
  );
};

export default MileageReport;