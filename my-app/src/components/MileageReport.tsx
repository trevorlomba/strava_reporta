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
	most_recent_run_today: boolean
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
		most_recent_run_today: false
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
		most_recent_run_today: false,
	})
	const [random, setRandom] = useState(false)
	const [daysOff, setDaysOff] = useState(0)
	const [milesGoal, setMilesGoal] = useState(data.next_week_goal)
	const [longRun, setLongRun] = useState(data.goal_long_run)
	const [fetchedMilesGoal, setFetchedMilesGoal] = useState(0)
	const [mostRecentRunToday, setMostRecentRunToday] = useState(false)
	const [fetchedData, setFetchedData] = useState<MileageData>({
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
		most_recent_run_today: false
	})


	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/api/mileage-report`)
			.then((response) => {
				if (response.ok) {
					return response.json()
				}
				throw new Error('Failed to fetch data')
			})
			.then((data) => setData(data))
			.then(() => setFetchedData(data))
			.catch((error) => console.error('Error fetching data:', error))
	}, [])

	useEffect(() => {
		setMilesGoal(data.next_week_goal)
		setFetchedMilesGoal(data.next_week_goal)
		setDaysOff(0)
		setLongRun(data.goal_long_run)
		setMostRecentRunToday(data.most_recent_run_today)
		
		setTotalDistanceByWeekPlot(`${process.env.REACT_APP_BACKEND_URL}/images/${data.total_distance_by_week_plot}`);
		const newDaysLeft = data.days_left - (mostRecentRunToday ? 1 : 0)
		setDaysLeft(newDaysLeft)
		console.log(fetchedData)
		console.log(data.most_recent_run_today)
		console.log(data)
	}, [data])

	const handleResetGoalMileage = (e: React.MouseEvent<HTMLSpanElement>) => {
		setMilesGoal(fetchedMilesGoal)
	}

	
	const restoreData = () => {
		setMilesGoal(data.next_week_goal)
		setDaysOff(0)
		setLongRun(data.goal_long_run)
	}

	// const updateData = () => {
	// 	setOldData(data)
	// 	let week_prog_temp = Math.floor(Math.random() * 50) + 1
	// 	let next_week_goal_temp = week_prog_temp + Math.floor(Math.random() * 20)
	// 	let miles_left_temp = next_week_goal_temp - week_prog_temp
	// 	let days_zero_last_3_temp = Math.floor(Math.random() * 3)
	// 	let days_zero_last_14_temp =
	// 		Math.floor(Math.random() * 7) + days_zero_last_3_temp
	// 	const randomData = {
	// 		week_prog: week_prog_temp,
	// 		next_week_goal: next_week_goal_temp,
	// 		miles_left: miles_left_temp,
	// 		days_zero_last_3: days_zero_last_3_temp,
	// 		days_zero_last_14: days_zero_last_14_temp,
	// 		total_distance_by_week_plot: data.total_distance_by_week_plot,
	// 		moving_time_by_day_plot: data.moving_time_by_day_plot,
	// 		days_left: data.days_left,
	// 		avg_miles_left: data.avg_miles_left,
	// 		longest_run_last_week: data.longest_run_last_week,
	// 		goal_long_run: data.goal_long_run,
	// 		longest_run_since_monday: data.longest_run_since_monday,
	// 		long_run_improved: data.long_run_improved,
	// 		miles_left_minus_long_run_goal: data.miles_left_minus_long_run_goal,
	// 		days_left_minus_long_run: data.days_left_minus_long_run,
	// 	}
	// 	setData(randomData)
	// 	setRandom(true)
	// }

	const [isDragging, setIsDragging] = useState(false)
	const [startX, setStartX] = useState(0)
	const [startMilesGoal, setStartMilesGoal] = useState(milesGoal)
	const [startDaysOff, setStartDaysOff] = useState(daysOff)
	const [startLongRun, setStartLongRun] = useState(longRun)
	const [stateName, setStateName] = useState('')
	const [longRunBinary, setLongRunBinary] = useState(0)
	const [daysLeft, setDaysLeft] = useState(7)
	const [totalDistanceByWeekPlot, setTotalDistanceByWeekPlot] = useState('')

	useEffect(() => {
		if (milesGoal - week_prog <= longRun || long_run_improved === true || longRun === 0) {
			setLongRunBinary (0)
		}
		else {
			setLongRunBinary(1)
			if(daysOff > daysLeft-1-longRunBinary) {
				setDaysOff(daysLeft-1-longRunBinary)
			}
		}
	}, [milesGoal, longRun])

	

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
		const newDaysOff = Math.min(Math.max(0,Math.floor(startDaysOff + daysDelta)), daysLeft-1-longRunBinary)

		setDaysOff(newDaysOff)
		} else if (stateName === 'longRun'){
		const longRunDelta = deltaX / pixelsPerMile
		const newLongRun = Math.min(Math.max(0,(startLongRun + longRunDelta)), milesGoal)

		setLongRun(newLongRun)
		}
		
	}
	
	// useEffect(() => {
	// 	if (milesGoal - week_prog -longRun > 0 && longRunBinary === 1) {
	// 		setLongRunBinary(0) }}, [milesGoal, longRun])

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
		console.log(daysLeft)


		const newDaysOff = Math.min(daysOff + incr, daysLeft - longRunBinary)
		if (newDaysOff >= 0) {
			setDaysOff(newDaysOff)
		}
	}

	const handleMilesGoal = (incr: number) => {
		console.log(incr)
		console.log(daysOff)
		console.log(daysLeft)

		const newMilesGoal = Math.floor(milesGoal + incr)
		if (newMilesGoal >= 0) {
			setMilesGoal(newMilesGoal)
		}
	}

	const handleLongRun = (incr: number) => {
		console.log(incr)
		console.log(daysOff)
		console.log(daysLeft)

		const newLongRun = longRun + incr
		if (newLongRun >= 0) {
			setLongRun(newLongRun)
		}
	}

	const daysOffElement = () => (
		<><span>
			<span className='highlight little-span grey-span'>
				{(Math.max(0, (
					(milesGoal - week_prog - longRunBinary * longRun) /
					(daysLeft - daysOff - longRunBinary)
				))).toFixed(1)}{' '}
				miles
				{' '}
				per day with{' '}</span></span><span>
				<span className='highlight little-span'>
					<span
						className='days-off-incr-button'
						onClick={() => handleDaysOff(-1)}>
						{'<'}
					</span>{' '}<span className="draggables" onMouseDown={(e: React.MouseEvent<HTMLSpanElement>) => handleMouseDown(e, "daysOff")} onDoubleClick={() => restoreData()}>
						{daysOff} day(s) off{' '}</span>
					<span className='days-off-incr-button' onClick={() => handleDaysOff(1)}>
						{' '}
						{">"}
					</span>
				</span>
			</span></>
	)
	const daysOffElementSkipLong = () => (
		<span >
		<span className='highlight little-span grey-span'>
				{(Math.max((
					(milesGoal - week_prog) /
					(daysLeft - daysOff)
				))).toFixed(1)}{' '}
				miles
			{' '}
			per day with{' '}</span>
			<span className='highlight little-span' >
				<span
					className='days-off-incr-button'
					onClick={() => handleDaysOff(-1)}>
					{'<'}
				</span>{' '}<span className="draggables" onMouseDown={(e: React.MouseEvent<HTMLSpanElement>) => handleMouseDown(e, "daysOff")} onDoubleClick={() => restoreData()}>
				{daysOff} day(s) off{' '}</span>
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
							 
>	
							<span
								className='days-off-incr-button'
								onClick={() => handleMilesGoal(-1)}>
								{'<'}
							</span>
							<span className='draggables' onMouseDown={(e: React.MouseEvent<HTMLSpanElement>) => handleMouseDown(e, "milesGoal")}
  							onDoubleClick={() => restoreData()}>
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
  							onDoubleClick={() => restoreData()}>
								{' '}{longRun.toFixed(1)} miles{' '}
							</span> <span className="days-off-incr-button" onClick={() => handleLongRun(1)}>
            {'>'}
          </span>
							</span>{' '}
						</span>
	)
	

	return (
	<div>
		<h2>Mileage Update</h2>
		{milesGoal === 0 ? <h3>
				Off to a fresh start!
			</h3> : week_prog < milesGoal ? (
			<h3>
				Only <span className='highlight'>{(milesGoal - week_prog).toFixed(1)} miles </span>
				to go!
			</h3>
		) : (
			<>
				<h3>
					Well done! You ran{' '}
					<span className='highlight'>{week_prog.toFixed(1)} miles</span>...
				</h3>
			</>
		)}
		{totalDistanceByWeekPlot ? <div>
			<img
				src={`${process.env.REACT_APP_BACKEND_URL}/images/${data.total_distance_by_week_plot}`}
				alt='Total Distance by Week'
			/>
			<p className='img-text'>
				It's crucial to gradually increase your mileage each
				week by no more than 10% for injury prevention and safe endurance
				building.
			</p>
		</div> : <div className='loader'></div>}
		{milesGoal === 0 ? <h3>
						Set a <span className='highlight'>goal</span> below!

			</h3> : week_prog < milesGoal ? (
			<h3>
						You have <span className='highlight'>{daysLeft} days left </span>
						to reach your goal.

			</h3>
		) : (
			<h3>Time to{' '} 
			 <span className='highlight'>celebrate!</span>
			</h3>
		)}
		{milesGoal === 0 ? 
		<p>
				Let's get moving! How do you feel about a a goal of{' '}
				{milesGoalElement()} for the week?
			</p> : week_prog === 0 ? (
			<p>
				It's a new week! Time to get started on your goal of{' '}
				{milesGoalElement()}!
			</p>
		) : week_prog < milesGoal - 5 ? (
			<>
				<p>
					Well done logging{' '}
					<span className='highlight little-span grey-span'>
						{week_prog.toFixed(1)} miles
					</span>{' '}
					this week. You're making solid progress towards your goal of{' '}
					{milesGoalElement()}, keep going!
				</p>
			</>
		) : week_prog >= milesGoal - 5 && week_prog < milesGoal ? (
			<>
				<p>
					Excellent effort on covering{' '}
					<span className='highlight little-span grey-span'>
						{week_prog.toFixed(1)} miles
					</span>{' '}
					so far this week, you're nearing your goal of{' '}
					{milesGoalElement()}
					!
				</p>
			</>
		) : (
			<p>
				Great job on covering{' '}
				<span className='highlight little-span grey-span'>{week_prog.toFixed(1)} miles</span> this
				week! You've exceeded your goal of{' '}
				{milesGoalElement()}
				, way to go!
</p>
)}
		{longest_run_since_monday > longest_run_last_week ? (
			<p>
				Congratulations on improving your longest run to{' '}
				<span className='highlight little-span grey-span'>
					{longest_run_since_monday.toFixed(1)} miles
				</span>
				, which is longer than last week's longest run of{' '}
				<span className='highlight little-span grey-span'>
					{longest_run_last_week.toFixed(1)}
				</span>{' '}
				miles! You have{' '}
				<span className='highlight little-span grey-span'>
					{(milesGoal - week_prog).toFixed(1)}
				</span>{' '}
				miles left to go.
			</p>
		) : (
			<div>
				{longest_run_since_monday < 0.9 * longest_run_last_week ? (
<div>
{
  week_prog > milesGoal
    ? ''
    : longRun === 0
    ? (
        <p>
          If you skip the long run {longRunElement()}, you'll have {daysLeft} day(s) to complete the remaining <span className="">{Math.max(0, milesGoal - week_prog).toFixed(1)} miles</span>: {daysOffElement()}.
        </p>
      )
    : longRun > milesGoal - week_prog
    ? (
        Math.abs(longRun - (milesGoal - week_prog)) <= 0.1 * longRun
        ? (
            <p>
              Your long run of {longRunElement()} will put you slightly over your goal, but it's within 10% of the target. {daysLeft > 1 ? <span>Go for it, and use the remaining <span className= "">{daysLeft - 1} day(s)</span> to recover.</span>: <span>Go for it, and make sure to recover after!</span>}
            </p>
          )
        : (
            <p>
              Skip the long run of {longRunElement()} to avoid exceeding your weekly mileage. Instead, plan to use the next {daysLeft} day(s) to cover your remaining <span className=""> {Math.max(0, milesGoal - week_prog).toFixed(1)} miles:</span>{daysOffElement()}.
            </p>
          )
      )
    : (
        <p>
          Add a long run of {longRunElement()} if you're up to it. Then you'll have {daysLeft - 1} more day(s) for the last {(milesGoal - week_prog - longRun).toFixed(1)} miles: {daysOffElement()}.
        </p>
      )
}
</div>
) : longest_run_since_monday >= 0.9 * longest_run_last_week && longest_run_since_monday <= 1.1 * longest_run_last_week ? (
<div>
<p>
Great job on your long run! You have {(milesGoal - week_prog).toFixed(1)} miles left, or {daysOffElement()}.
</p>
</div>
) : (
<div>
<p>
Good job on your long run but avoid overtraining. Keep future runs within 10% of your recent long run. Finish the week with {daysOffElement()}.
</p>
</div>
)}
			</div>
		)}
	</div>
	)
}

export default MileageReport
