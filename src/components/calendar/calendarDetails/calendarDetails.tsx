import {useState} from "react";
import "./calendarDetails.css";
import {Event} from "../../../types/Event";
import {WEEKDAYS} from "../../../utils/weekdays";
import {IDENTIFIERS_BY_TYPES} from "../../../utils/moduleIdentifiers";
import {Calendar} from "../../../types/Calendar";

export default function CalendarDetails({events, day, isVisible} : any) {

	const [doneEvents, setDoneEvents]: [string[] | null, any] = useState(JSON.parse(localStorage.getItem("own-events") ?? ""));

	function isDone(uid: string) {
		return doneEvents?.includes(uid);
	}

	function updateState(event: any) {
		let clone = doneEvents?.slice();

		console.log(event.target.checked)
		if (!event.target.checked) {
			setDoneEvents(
				doneEvents?.filter(uid => uid !== event.target.id)
			)
		} else {
			setDoneEvents([
				// @ts-ignore
				...doneEvents,
				event.target.id
			]);
		}

		console.log(doneEvents)
		localStorage.setItem("own-events", JSON.stringify(doneEvents));
	}

	return <div className={"calendar-details-container"}
				style={isVisible ? {display: "block"} : {display: "none"}}
	>
		<p className={"date"}>{`${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}, ${WEEKDAYS[day.getUTCDay()]}`}</p>
		<ul>
			{
			events.map((event: Event, index: number) => {
				return <li className={"event-item"} key={index}>
					<input onChange={updateState} id={event.uid.value} type="checkbox"/>
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