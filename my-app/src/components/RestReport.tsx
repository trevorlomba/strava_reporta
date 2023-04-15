import React, { useEffect, useState } from 'react'
import CachedImage from './CachedImage'

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

function RestReport() {
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
	const [daysOff, setDaysOff] = useState(0)
	const [milesGoal, setMilesGoal] = useState(data.next_week_goal)
	const [longRun, setLongRun] = useState(data.goal_long_run)
	const [fetchedMilesGoal, setFetchedMilesGoal] = useState(0)
	 const [imageUrl, setImageUrl] = useState<string>('');

	useEffect(() => {
		// Fetch the data from the API endpoint
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/mileage-report`)
		.then((response) => {
			if (response.ok) {
			return response.json()
			}
			throw new Error('Failed to fetch data')
		})
		.then((data) => {
			setData(data);
			setImageUrl(`${process.env.REACT_APP_BACKEND_URL}/images/${data.moving_time_by_day_plot}`);
		})
		.catch((error) => console.error('Error fetching data:', error))
	}, [])

	useEffect(() => {
		setMilesGoal(data.next_week_goal)
		setFetchedMilesGoal(data.next_week_goal)
		setDaysOff(0)
		setLongRun(data.goal_long_run)
	}, [data])

	const handleResetGoalMileage = (e: React.MouseEvent<HTMLSpanElement>) => {
		setMilesGoal(fetchedMilesGoal)
	}

	
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

	const [isDragging, setIsDragging] = useState(false)
	const [startX, setStartX] = useState(0)
	const [startMilesGoal, setStartMilesGoal] = useState(milesGoal)
	const [startDaysOff, setStartDaysOff] = useState(daysOff)
	const [startLongRun, setStartLongRun] = useState(longRun)
	const [stateName, setStateName] = useState('')
	const [longRunBinary, setLongRunBinary] = useState(0)

	useEffect(() => {
		if (milesGoal - week_prog <= longRun || long_run_improved === true ) {
			setLongRunBinary (0)
		}
		else {
			setLongRunBinary(1)
			if(daysOff > data.days_left-1-longRunBinary) {
				setDaysOff(data.days_left-1-longRunBinary)
			}
		}
	}, [milesGoal])

	const handleMouseDown = (
		e: React.MouseEvent<HTMLSpanElement>,
		stateName: string
	) => {
		setIsDragging(true)
		setStartX(e.clientX)
		if (stateName === 'milesGoal') {
			setStartMilesGoal(milesGoal)
		} else if (stateName === 'daysOff') {
			setDaysOff(daysOff)
		} else if (stateName === 'longRun') {
			setLongRun(longRun)
		}
		setStateName(stateName)
		e.preventDefault()
	}

	const handleMouseMove = (e: MouseEvent) => {
		if (!isDragging) return

		const deltaX = e.clientX - startX
		const pixelsPerMile = 5 // adjust this as needed

		if (stateName === 'milesGoal') {
			const milesDelta = deltaX / pixelsPerMile
		const newMilesGoal = Math.max(0, startMilesGoal + milesDelta)

		setMilesGoal(newMilesGoal)
		} else if (stateName === 'daysOff'){
		const daysDelta = deltaX / pixelsPerMile
		const newDaysOff = Math.min(Math.max(0,Math.floor(startDaysOff + daysDelta)), data.days_left-1-longRunBinary)

		setDaysOff(newDaysOff)
		} else if (stateName === 'longRun'){
		const longRunDelta = deltaX / pixelsPerMile
		const newLongRun = Math.min(Math.max(0,Math.floor(startLongRun + longRunDelta)), milesGoal)

		setLongRun(newLongRun)
		}
		
	}

	const handleMouseUp = (e: MouseEvent) => {
		setIsDragging(false)
	}

	const returnData = (e: React.MouseEvent<HTMLSpanElement>) => {
		setData(oldData)
		setRandom(false)
	}
	
	useEffect(() => {
		const handleGlobalMouseMove = (e: MouseEvent) => {
			if (isDragging) {
				handleMouseMove(e)
			}
		}

		const handleGlobalMouseUp = (e: MouseEvent) => {
			if (isDragging) {
				handleMouseUp(e)
			}
		}

		document.addEventListener('mousemove', handleGlobalMouseMove)
		document.addEventListener('mouseup', handleGlobalMouseUp)

		return () => {
			document.removeEventListener('mousemove', handleGlobalMouseMove)
			document.removeEventListener('mouseup', handleGlobalMouseUp)
		}
	}, [isDragging, handleMouseMove, handleMouseUp])


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

	const handleDaysOff = (incr: number) => {
		console.log(incr)
		console.log(daysOff)
		console.log(days_left)


		const newDaysOff = Math.min(daysOff + incr, data.days_left-1-longRunBinary)
		if (newDaysOff >= 0) {
			setDaysOff(newDaysOff)
		}
	}

	const handleMilesGoal = (incr: number) => {
		console.log(incr)
		console.log(daysOff)
		console.log(days_left)

		const newMilesGoal = Math.floor(milesGoal + incr)
		if (newMilesGoal >= 0) {
			setMilesGoal(newMilesGoal)
		}
	}

	const handleLongRun = (incr: number) => {
		console.log(incr)
		console.log(daysOff)
		console.log(days_left)

		const newLongRun = longRun + incr
		if (newLongRun >= 0) {
			setLongRun(newLongRun)
		}
	}

	const daysOffElement = () => (
		<span >
		<span className='highlight little-span grey-span'>
				{Math.min(Math.max(0,(
					(milesGoal - week_prog - longRun) /
					(days_left_minus_long_run - daysOff)
				)), milesGoal-longRun).toFixed(1)}{' '}
				miles
			{' '}
			per day with{' '}</span>
			<span className='highlight little-span' onMouseDown={(e: React.MouseEvent<HTMLSpanElement>) => handleMouseDown(e, "daysOff")}>
				<span
					className='days-off-incr-button'
					onClick={() => handleDaysOff(-1)}>
					{'<'}
				</span>{' '}<span className="draggables">
				{daysOff} days off{' '}</span>
				<span className='days-off-incr-button' onClick={() => handleDaysOff(1)}>
					{' '}
					{">"}
				</span>
			</span>
		</span>
	)
	const milesGoalElement = () => (
		<span className='highlight little-span'>
						<span
							className='highlight little-span'
							 onMouseDown={(e: React.MouseEvent<HTMLSpanElement>) => handleMouseDown(e, "milesGoal")}
  							onDoubleClick={(e: React.MouseEvent<HTMLSpanElement>) => handleResetGoalMileage(e)}
>	
							<span
								className='days-off-incr-button'
								onClick={() => handleMilesGoal(-1)}>
								{'<'}
							</span>
							<span className='draggables'>
								{' '}{milesGoal.toFixed(1)} miles{' '}
							</span> <span className="days-off-incr-button" onClick={() => handleMilesGoal(1)}>
            {'>'}
          </span>
							</span>{' '}
						</span>
	)
	const longRunElement = () => (
		<span className='highlight little-span'>
						<span
							className='highlight little-span'
							 
>	
							<span
								className='days-off-incr-button'
								onClick={() => handleLongRun(-1)}>
								{'<'}
							</span>
							<span className='draggables' onMouseDown={(e: React.MouseEvent<HTMLSpanElement>) => handleMouseDown(e, "longRun")}
  							onDoubleClick={(e: React.MouseEvent<HTMLSpanElement>) => handleResetGoalMileage(e)}>
								{' '}{longRun.toFixed(1)} miles{' '}
							</span> <span className="days-off-incr-button" onClick={() => handleLongRun(1)}>
            {'>'}
          </span>
							</span>{' '}
						</span>
	)
	

	return (
		<div>
			<h2>Rest Analysis</h2>
			{imageUrl ? <img src={imageUrl} alt="Moving Time by Day"/> : <div className="loader"></div>}
			{/* {<div className="loader"></div>} */}
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

export default RestReport
