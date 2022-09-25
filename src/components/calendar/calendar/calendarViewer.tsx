import './calendarViewer.css';
import { Event } from "../../../types/Event";
import { IDENTIFIERS_BY_TYPES } from "../../../utils/moduleIdentifiers";
import {useState} from "react";

export default function CalendarViewer({monthsDuration, calendar, showDayDetails}: any) {
	const [doneEvents, setDoneEvents]: [string[] | null, any] = useState(JSON.parse(localStorage.getItem("own-events") ?? "[]"));
	const dayWithEvents = {
		backgroundColor: "rgba(0, 0, 0, 0.07)",
		borderRadius: "50%"
	};

	function getCalendar(startDate: Date, monthsDuration: number): any[] {
		const startMonth: number = startDate.getMonth();
		const startYear: number = startDate.getFullYear();

		let generatedCalendar = [];
		for (let i = 0; i < monthsDuration; i++) {
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

			console.log(doneEvents)
			const currEvents: Event[] | undefined = getEvents(currDate);
			// @ts-ignore
			const finishedDay = currEvents?.length > 0
				// @ts-ignore
				? currEvents?.every((event: Event) => {
					// @ts-ignore
					return doneEvents?.filter((uid: string) => {
						return uid === event.uid.value;
					}).length > 0;
				})
				: false;

			generatedDays.push(
				<li key={i}
					style={Object.assign(
						i === 1 ? firstDayStyle : {},
						currEvents?.length ? dayWithEvents : {},
					)}
					className={`day ${getTypeClasses(currEvents)} ${finishedDay ? "finishedDay" : ""}`}
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
					getCalendar(new Date(2022, 8, 1), monthsDuration).map((month: any, index: number) => {
						return <div className={"month"} key={index}>
							<p className={"month-name"}>{month.monthName} {month.firstMonthDay.getFullYear()}</p>
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