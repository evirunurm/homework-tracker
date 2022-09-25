import {useState} from "react";
import "./calendarDetails.css";
import {Event} from "../../../types/Event";
import {WEEKDAYS} from "../../../utils/weekdays";
import {IDENTIFIERS_BY_TYPES} from "../../../utils/moduleIdentifiers";

export default function CalendarDetails({events, day, isVisible} : any) {
	const [doneEvents, setDoneEvents]: [string[] | null, any] = useState(JSON.parse(localStorage.getItem("own-events") ?? "[]"));

	function isDone(uid: string) {
		return doneEvents?.includes(uid);
	}

	function updateState(event: any) {
		let toSave: string[] | null = doneEvents;
		if (toSave?.includes(event.target.id)) {
			toSave = toSave?.filter(uid => uid !== event.target.id);
			setDoneEvents(toSave);
		} else {
			// @ts-ignore
			toSave = [...toSave, event.target.id];
			// Correct syntax
			// setDoneEvents(
			// 	(previous: any) => ([
			// 		...previous,
			// 		event.target.id
			// 	])
			// );
			setDoneEvents(toSave);
		}
		localStorage.setItem("own-events", JSON.stringify(toSave));
	}

	return <div className={"calendar-details-container"}
				style={isVisible ? {display: "block"} : {display: "none"}}
	>
		<p className={"date"}>{`${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}, ${WEEKDAYS[day.getUTCDay()]}`}</p>
		<ul>
			{
			events.map((event: Event, index: number) => {
				return <li className={"event-item"} key={index}>
					<input checked={isDone(event.uid.value)} onChange={updateState} id={event.uid.value} type="checkbox"/>
					<div className={"event-items-types"}>
						{event.types.map((type, index) => {
							// @ts-ignore
							return <div key={index} className={`${IDENTIFIERS_BY_TYPES[type]} type`} />
						})}
					</div>

					<label htmlFor={event.uid.value}>{event.summary.value}</label>
				</li>
			})
		}
		</ul>

	</div>
}