import {useState} from "react";
import "./calendarDetails.css";
import {Event} from "../../../types/Event";

export default function CalendarDetails({events, day, isVisible} : any) {
	// const [events, setEvents]: [Event[], any] = useState([]);

	return <div className={"calendar-details-container"}
				style={isVisible ? {display: "block"} : {display: "none"}}
	>
		<ul>
			{
			events.map((event: Event, index: number) => {
				return <li key={index}>{event.summary.value}</li>
			})
		}
		</ul>

	</div>
}