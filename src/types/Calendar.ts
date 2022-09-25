import { Event } from "./Event";

export type Calendar = {
  calendarData: CalendarData;
  events: Event[];
  getEventsBetweenDates: Function;
  getEventsOnDate: Function;
};

export type CalendarProp = {
  calendar: {
    calendarData: CalendarData;
    events: Event[];
    getEventsBetweenDates: Function;
    getEventsOnDate: Function;
  }
};

type CalendarData = {
  method: string;
  prodid: string;
  version: string;
};


