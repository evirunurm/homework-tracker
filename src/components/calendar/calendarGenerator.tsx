import {useState} from 'react'
import { Calendar } from "../../types/Calendar";
// @ts-ignore Because it does not use Typescript
import calendarParser from 'cal-parser';
import CalendarViewer from './calendar/calendarViewer';
import CalendarDetails from "./calendarDetails/calendarDetails";

export default function CalendarGenerator() {
	const [eventsToDetail, setEventsToDetail]: [Event[], any] = useState([]);
	const [dayToDetail, setDayToDetail]: [Date, any]  = useState(new Date());
	const [isDetailsOpen, setIsDetailsOpen]: [boolean, any] = useState(false);

	const TYPES_OF_WORKS = {
		0: "aprendizaje",
		1: "evaluaci",
		2: "valoraci",
		3: "completado"
	}

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
		console.log(events)
		setEventsToDetail(events)
		setIsDetailsOpen(true);
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
		setCalendarView(parsed)
	}

	return <>
		<h3>Calendar</h3>
		<input type="file" onChange={ async(e) =>
		{
			await readFile(e.target)
		}}/>
		<CalendarViewer calendar={calendarView} showDayDetails={showDayDetails} />
		<CalendarDetails isVisible={isDetailsOpen} events={eventsToDetail} day={dayToDetail} />
	</>

}