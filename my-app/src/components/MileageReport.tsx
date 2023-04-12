import React, { useEffect, useState } from 'react'

interface MileageData {
	week_prog: number
	next_week_goal: number
	miles_left: number
	days_zero_last_3: number
	days_zero_last_14: number
	total_distance_by_week_plot: string
	moving_time_by_day_plot: string
	days_left: number
	avg_miles_left: number
	longest_run_last_week: number
	goal_long_run: number
	longest_run_since_monday: number
	long_run_improved: boolean
	miles_left_minus_long_run_goal: number
	days_left_minus_long_run: number
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
		// 'days_left': days_left,
		// 'avg_miles_left': avg_miles_left.round(2),
		// 'longest_run_last_week': longest_run_last_week.round(2),
		// 'goal_long_run': goal_long_run.round(2),
		// 'longest_run_since_monday': longest_run_since_monday.round(2),
		// 'long_run_improved': long_run_improved,
		// 'miles_left_minus_long_run_goal': miles_left_minus_long_run_goal.round(2),
		// 'days_left_minus_long_run': days_left_minus_long_run
		days_left: 0,
		avg_miles_left: 0,
		longest_run_last_week: 0,
		goal_long_run: 0,
		longest_run_since_monday: 0,
		long_run_improved: false,
		miles_left_minus_long_run_goal: 0,
		days_left_minus_long_run: 0,
	})
	const [oldData, setOldData] = useState<MileageData>({
		week_prog: 0,
		next_week_goal: 0,
		miles_left: 0,
		days_zero_last_3: 0,
		days_zero_last_14: 0,
		total_distance_by_week_plot: 'null',
		moving_time_by_day_plot: 'null',
		days_left: 0,
		avg_miles_left: 0,
		longest_run_last_week: 0,
		goal_long_run: 0,
		longest_run_since_monday: 0,
		long_run_improved: false,
		miles_left_minus_long_run_goal: 0,
		days_left_minus_long_run: 0,
	})
	const [random, setRandom] = useState(false)

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/mileage-report`)
			.then((response) => {
				if (response.ok) {
					return response.json()
				}
				throw new Error('Failed to fetch data')
			})
			.then((data) => setData(data))
			.catch((error) => console.error('Error fetching data:', error))
	}, [])

	const updateData = () => {
		setOldData(data)
		let week_prog_temp = Math.floor(Math.random() * 50) + 1
		let next_week_goal_temp = week_prog_temp + Math.floor(Math.random() * 20)
		let miles_left_temp = next_week_goal_temp - week_prog_temp
		let days_zero_last_3_temp = Math.floor(Math.random() * 3)
		let days_zero_last_14_temp =
			Math.floor(Math.random() * 7) + days_zero_last_3_temp
		const randomData = {
			week_prog: week_prog_temp,
			next_week_goal: next_week_goal_temp,
			miles_left: miles_left_temp,
			days_zero_last_3: days_zero_last_3_temp,
			days_zero_last_14: days_zero_last_14_temp,
			total_distance_by_week_plot: data.total_distance_by_week_plot,
			moving_time_by_day_plot: data.moving_time_by_day_plot,
			days_left: data.days_left,
			avg_miles_left: data.avg_miles_left,
			longest_run_last_week: data.longest_run_last_week,
			goal_long_run: data.goal_long_run,
			longest_run_since_monday: data.longest_run_since_monday,
			long_run_improved: data.long_run_improved,
			miles_left_minus_long_run_goal: data.miles_left_minus_long_run_goal,
			days_left_minus_long_run: data.days_left_minus_long_run,
		}
		setData(randomData)
		setRandom(true)
	}

	const returnData = () => {
		setData(oldData)
		setRandom(false)
	}

	if (!data) {
		return <p>Loading...</p>
	}
	const {
		week_prog,
		next_week_goal,
		miles_left,
		days_zero_last_3,
		days_zero_last_14,
		total_distance_by_week_plot,
		moving_time_by_day_plot,
		days_left,
		avg_miles_left,
		longest_run_last_week,
		goal_long_run,
		longest_run_since_monday,
		long_run_improved,
		miles_left_minus_long_run_goal,
		days_left_minus_long_run,
	} = data

	return (
		<div>
			<h2>Mileage Update</h2>
			{week_prog < next_week_goal ? (
    <h3>
        Only <span className='highlight'>{(miles_left).toFixed(1)} miles </span>to go!
    </h3>
) : (
    <>
        <h3>
            Well done! You ran{' '}
            <span className='highlight'>{week_prog.toFixed(1)} miles</span> for the
            week.
        </h3>
        
            
    </>
)}
<div>
    <img
        src={`${process.env.REACT_APP_BACKEND_URL}/images/${data.total_distance_by_week_plot}`}
        alt='Total Distance by Week'
    />
    <p className="img-text">
                Keep in mind, it's crucial to gradually increase your mileage each week
                by no more than 10% for injury prevention and safe endurance building.
            </p>
    
</div>
 {week_prog < next_week_goal ? (<h3>
            You have <span className='highlight'>{days_left} days left </span>to
            reach your goal.
        </h3>) : ''}
{week_prog === 0 ? (
            <p>
                It's a new week! Get started on your training and aim to run{' '}
                <span className='highlight little-span'>{next_week_goal.toFixed(1)} miles</span>.
            </p>
        ) : week_prog < next_week_goal - 5 ? (
    <>
        <p>
            Well done logging{' '}
            <span className='highlight little-span'>{week_prog.toFixed(1)} miles</span>{' '}
            so far. You're making solid progress towards your goal of{' '}
            <span className='highlight little-span'>
                {next_week_goal.toFixed(1)} miles
            </span>{' '}
            by the end of the week, keep going!
        </p>
    </>
) : week_prog >= next_week_goal - 5 && week_prog < next_week_goal ? (
    <>
        <h3>
            You have <span className='highlight'>{days_left} days left </span>to
            reach your goal.
        </h3>
        <p>
            Excellent effort on covering{' '}
            <span className='highlight little-span'>{week_prog.toFixed(1)} miles</span> so
            far this week, you're nearing your goal of{' '}
            <span className='highlight little-span'>
                {next_week_goal.toFixed(1)} miles
            </span>{' '}
            . Maintain the momentum and you'll reach your goal in just{' '}
            <span className='highlight'>{miles_left.toFixed(1)} more miles!</span>
        </p>
    </>
) : (
    <p>
        Great job on covering{' '}
        <span className='highlight'>{week_prog.toFixed(1)} miles</span> this week! You've
        exceeded your goal of{' '}
        <span className='highlight little-span'>{next_week_goal.toFixed(1)} miles</span>{' '}
        , way to go! Remember to take a rest day or two for recovery and
        injury prevention, and resume training soon to keep working towards
        your objectives.
    </p>
)}

			{longest_run_since_monday > longest_run_last_week ? (
				<p>
					Congratulations on improving your longest run to{' '}
					<span className='highlight little-span'>
						{longest_run_since_monday.toFixed(1)} miles
					</span>
					, which is longer than last week's longest run of{' '}
					<span className='highlight little-span'>{longest_run_last_week.toFixed(1)}</span>{' '}
					miles! You have{' '}
					<span className='highlight little-span'>{miles_left.toFixed(1)}</span> miles left
					to go.
				</p>
			) : (
				<div>
					{
  longest_run_since_monday < 0.9 * longest_run_last_week ? (
    <div>
      {goal_long_run > next_week_goal - week_prog ? (
        <p>
          Since your long run goal of <span className="highlight little-span">{goal_long_run.toFixed(1)} miles</span> would put you over your weekly mileage goal, consider skipping it and focus on rest instead. You can plan on running an average of <span className = "highlight little-span">{(miles_left / days_left).toFixed(1)} miles </span> per day in that case, just make sure to plan a long run in the coming weeks!
        </p>
      ) : <p>
        Consider working in a long run of <span className="highlight little-span">{goal_long_run.toFixed(1)} miles</span> this week if you're feeling healthy. Remember, you'd also have to run{' '}
        <span className="highlight little-span">{(miles_left - goal_long_run).toFixed(1)}{' '}more miles</span> in the remaining {days_left_minus_long_run} day(s): about <span className="highlight little-span">{(miles_left_minus_long_run_goal / (days_left_minus_long_run)).toFixed(1)} miles</span> per day. 
      </p>}
    </div>
  ) : longest_run_since_monday >= 0.9 * longest_run_last_week && longest_run_since_monday <= 1.1 * longest_run_last_week ? (
    <div>
      <p>
        Congratulations on completing your long run for the week! Your longest run this week is within 10% of the longest run last week. You have{' '}
        <span className="highlight little-span">{miles_left.toFixed(1)}</span> miles left to run on average to reach your goal, which is{' '}
        <span className="highlight little-span">{(miles_left / days_left).toFixed(1)} miles</span> per day.
      </p>
    </div>
  ) : (
    <div>
      <p>
        Congratulations on getting your long run in, but be cautious not to overtrain. Your long run was over 10% longer than the longest run last week. Try to stay within 10% of the most recent long run you've done.
      </p>
    </div>
  )
}

				</div>
			)}

			{random ? (
				<h4 className='little-span' onClick={returnData}>
					(Reload Personal Data)
				</h4>
			) : (
				<h4 className='little-span' onClick={updateData}>
					(Randomize Data)
				</h4>
			)}
			<img
				src={`${process.env.REACT_APP_BACKEND_URL}/images/${data.moving_time_by_day_plot}`}
				alt='Moving Time by Day'
			/>
			{days_zero_last_3 >= 2 ? (
				<p>
					You've taken <span className='highlight'>{days_zero_last_3}</span>{' '}
					rest day(s) in the last 3 days. While rest is essential, remember to
					stay focused on your goals and maintain consistent running habits.
				</p>
			) : days_zero_last_14 < 2 ? (
				<p>
					Nice work on providing your body with adequate rest. You've taken{' '}
					<span className='highlight'>{days_zero_last_14}</span> rest day(s) in
					the last 14 days. It's important to balance training and rest to avoid
					overtraining and injuries. Keep listening to your body and adjusting
					your schedule as needed.
				</p>
			) : (
				<p>
					Good balance between training and rest days! You've taken{' '}
					<span className='highlight'>{days_zero_last_14}</span> rest day(s) in
					the last 14 days. Maintaining this consistency will help you achieve
					your goals while minimizing the risk of injury.
				</p>
			)}
		</div>
	)
}

export default MileageReport
