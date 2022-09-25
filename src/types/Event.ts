export type Event = {
  // Module
  categories: {
    value: string
  };
  class: {
    value: string
  };
  description: {
    value: string
  };
  // End date
  dtend: {
    value: Date
  };
  dtstamp: {
    value: Date
  };
  // Start date
  dtstart: {
    value: Date
  };
  "last-modified": string;
  // Name
  summary: {
    value: string
  };
  uid: {
    value: string
  };
  types: number[]
};

export type EventProp = {
  events: Event[];
};

