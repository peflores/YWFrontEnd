export interface Condition {
  code: string;
  date: string;
  temp: string;
  text: string;
}

export interface Forecast {
  code: string;
  date: string;
  day: string;
  high: string;
  low: string;
  text: string;
}

export interface Guid {
  isPermaLink: string;
}

export interface Item {
  title: string;
  lat: string;
  long: string;
  link: string;
  pubDate: string;
  condition: Condition;
  forecast: Forecast[];
  description: string;
  guid: Guid;
}

export interface Units {
  distance: string;
  pressure: string;
  speed: string;
  temperature: string;
}

export interface Channel {
  item: Item;
  units: Units;
}

export interface Results {
  channel: Channel;
}

export interface Query {
  count: number;
  created: Date;
  lang: string;
  results: Results;
}

export interface YahooQuery {
  query: Query;
}
