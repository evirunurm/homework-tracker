import './calendarViewer.css';
import {Event} from "../../../types/Event";

export default function CalendarViewer({calendar, showDayDetails}: any) {
	const dayWithEvents = {backgroundColor: "darkgrey"};
	const IDENTIFIERS_BY_TYPES = {
		// Aprendizaje
		0: "aprendizaje",
		// Evaluativa
		1: "evaluativa",
		// Encuesta de valoración
		2: "valoracion",
		// Deadline
		3: "deadline"
	}

	function getCalendar(startDate: Date, monthDuration: number): any[] {
		const startMonth: number = startDate.getMonth();
		const startYear: number = startDate.getFullYear();

		let generatedCalendar = [];
		for (let i = 0; i < monthDuration; i++) {
			const firstMonthDay = new Date(startYear, startMonth + i, 1);
			const monthName = firstMonthDay.toLocaleString("en-US", {month: "long"});
			const monthDuration = new Date(firstMonthDay.getFullYear(), firstMonthDay.getMonth() + 1, 0).getDate();

			generatedCalendar.push({
				firstMonthDay,
				monthName,
				monthDuration
			});
		}

		return generatedCalendar;
	}

	function generateMonth(amountDays: number, firstMonthDate: Date) {
		const generatedDays = [];
		const firstDayStyle = {gridColumnStart: firstMonthDate.getDay()};

		for (let i = 1; i <= amountDays; i++) {
			let currDate: Date = new Date(firstMonthDate.toISOString());
			currDate.setDate(currDate.getDate() + i - 1);

			const currEvents: Event[] | undefined = getEvents(currDate);

			generatedDays.push(
				<li key={i}
					style={Object.assign(
						i === 1 ? firstDayStyle : {},
						currEvents?.length ? dayWithEvents : {}
					)}
					className={`day ${getTypeClasses(currEvents)}`}
					onClick={dateClick}
					data-date={new Date(firstMonthDate.getFullYear(), firstMonthDate.getMonth(), i).toISOString()}

				>
					{i}
					<div className={"types"}>
						{
							Object.keys(IDENTIFIERS_BY_TYPES).map((key, index) => {
								// @ts-ignore
								return <div key={index} className={`identifier div-${IDENTIFIERS_BY_TYPES[key]}`}></div>
							})
						}
					</div>

				</li>
			)
		}

		return generatedDays;
	}

	function dateClick(event: any) {
		if (calendar.events.length === 0) {
			console.log("No events available");
			return;
		}

		let date = new Date(event.target.getAttribute("data-date"))
		let events: Event[] = getEvents(date)
		showDayDetails(events, date);
	}

	function getTypeClasses(currEvents: Event[] | undefined): string {
		if (currEvents == undefined) {
			return "";
		}
		let generatedClasses: string[] = [];

		currEvents.forEach( (event: Event) => {
			event.types.forEach( (type: number) => {
				// @ts-ignore
				generatedClasses.push(IDENTIFIERS_BY_TYPES[type])
			})
		})

		return generatedClasses.join(" ");
	}

	function getEvents(date: Date) {
		return calendar.getEventsOnDate(date);
	}

	return <>
		<div className={"calendar"}>

			<div className={"months-container"}>
				{
					getCalendar(new Date(2022, 8, 1), 9).map((month: any, index: number) => {
						return <div className={"month"} key={index}>
							<p>{month.monthName}</p>
							<ul className={"month-days-container"}>
								{generateMonth(month.monthDuration, month.firstMonthDay)}
							</ul>
						</div>
					})
				}
			</div>
		</div>
	</>
}