import {useState} from 'react'
import { Calendar } from "../../types/Calendar";
// @ts-ignore Because it does not use Typescript
import calendarParser from 'cal-parser';
import CalendarViewer from './calendar/calendarViewer';
import CalendarDetails from "./calendarDetails/calendarDetails";

import {TYPES_OF_WORKS} from "../../utils/moduleIdentifiers";

import "./calendarGenerator.css"

export default function CalendarGenerator() {
	const [eventsToDetail, setEventsToDetail]: [Event[], any] = useState([]);
	const [dayToDetail, setDayToDetail]: [Date, any]  = useState(new Date());
	const [isDetailsOpen, setIsDetailsOpen]: [boolean, any] = useState(false);
	const [monthsDuration, setMonthsDuration]: [number, any] = useState(9);

	let [calendarView, setCalendarView]: [Calendar | undefined, any] = useState({
		calendarData: {
			 method: "",
			 prodid: "",
			 version: ""
		},
		events: [],
		getEventsBetweenDates: () => {},
		getEventsOnDate: () => {}
	});

	function showDayDetails(events: Event[], day: Date) {
		if (events.length > 0) {
			setDayToDetail(day)
			setEventsToDetail(events)
			setIsDetailsOpen(true);
		}
	}

	function handleBackgroundClick() {
		setIsDetailsOpen(false);
	}

	async function readFile(fileInput: HTMLInputElement) {
		if (!fileInput.files || fileInput.files.length < 0) {
			return;
		}
		const file = fileInput.files[0];
		const fileTextStream = await file.text();
		const parsed: Calendar = calendarParser.parseString(fileTextStream);
		parsed.events.forEach((e, index) => {
			let types: number[] = [];
			const typeNames: [string, string][] = Object.entries(TYPES_OF_WORKS);
			typeNames.forEach( (entry) => {
				if (e.summary.value.toLowerCase().includes(entry[1].toLowerCase())) {
					types.push(parseInt(entry[0]))
				}
			})
			e.types = types;
		})
		setCalendarView(parsed);

		// Update calendar in LocalStorage.
		localStorage.setItem("calendar-events", JSON.stringify(parsed.events));

		// Personal data about events
		if (localStorage.getItem("own-events") === undefined || localStorage.getItem("own-events") === null) {
			localStorage.setItem("own-events", JSON.stringify([]));
		}
	}

	function handleMonthsDurationChange(event: any) {
		console.log(event)
		if (event.key === "Enter") {
			setMonthsDuration(event.target.value)
		}
	}

	return <>
		<h3>Calendar</h3>
		<input type="file" onChange={ async(e) =>
		{
			await readFile(e.target)
		}}/>
		<input type="text" onKeyDown={handleMonthsDurationChange}/>
		<CalendarViewer monthsDuration={monthsDuration} calendar={calendarView} showDayDetails={showDayDetails} />

		<div
			style={isDetailsOpen ? {display: "block"} : {display: "none"}}
			className={"background"}
			onClick={handleBackgroundClick} />
		<CalendarDetails isVisible={isDetailsOpen} events={eventsToDetail} day={dayToDetail} />

	</>

}