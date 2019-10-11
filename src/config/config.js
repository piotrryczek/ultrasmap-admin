export const PER_PAGE = 10;
export const PER_PAGE_MATCHES = 50;
export const MESSAGE_HIDE_DELAY = 3000;
export const DEFAULT_COORDINATES = [19.3617687, 51.8983513];
export const IMAGES_URL = `${process.env.REACT_APP_API_URL}/images`;
export const DEFAULT_LANGUAGE = 'pl';
export const LANGUAGES = [{
  code: 'pl',
  flag: 'pl.png',
  label: 'Polski',
}, {
  code: 'en',
  flag: 'en.png',
  label: 'English',
}];
export const DOWNLOAD_METHODS = ['90minut', '90minutPucharPolski'];
export const MATCH_DURATION_MINUTES = 120;
export const ATTITUDE_COLOR_UNKNOWN = {
  color: 'black',
  backgroundColor: '#c4c1bb',
};
export const SPORTS = ['football'];
export const ATTITUDE_COLORS = [{
  from: 0,
  to: 10,
  color: 'black',
  backgroundColor: '#c70000',
}, {
  from: 10,
  to: 20,
  color: 'black',
  backgroundColor: '#b51b1b',
}, {
  from: 20,
  to: 30,
  color: 'black',
  backgroundColor: '#b83c0f',
}, {
  from: 30,
  to: 40,
  color: 'black',
  backgroundColor: '#d1790d',
}, {
  from: 40,
  to: 48,
  color: 'black',
  backgroundColor: '#d19508',
}, { // Neutral
  from: 48,
  to: 52,
  color: 'black',
  backgroundColor: '#e6e6e6',
}, {
  from: 52,
  to: 60,
  color: 'black',
  backgroundColor: '#dff0b1',
}, {
  from: 60,
  to: 65,
  color: 'black',
  backgroundColor: '#bde880',
}, {
  from: 65,
  to: 80,
  color: 'black',
  backgroundColor: '#73ba43',
}, {
  from: 80,
  to: 95,
  color: 'black',
  backgroundColor: '#55a61e',
}, {
  from: 95,
  to: 100,
  color: 'black',
  backgroundColor: '#54cf00',
}];

export const IMPORTANCE_COLORS = [{
  from: 0,
  to: 1,
  color: 'black',
  backgroundColor: 'rgba(255, 0, 0, 0.1)',
}, {
  from: 1,
  to: 2,
  color: 'black',
  backgroundColor: 'rgba(255, 0, 0, 0.25)',
}, {
  from: 2,
  to: 3,
  color: 'black',
  backgroundColor: 'rgba(255, 0, 0, 0.4)',
}, {
  from: 3,
  to: 4,
  color: 'black',
  backgroundColor: 'rgba(255, 0, 0, 0.55)',
}, {
  from: 4,
  to: 5,
  color: 'black',
  backgroundColor: 'rgba(255, 0, 0, 0.7)',
}, { // Neutral
  from: 5,
  to: 6,
  color: 'black',
  backgroundColor: 'rgba(255, 0, 0, 0.75)',
}, {
  from: 6,
  to: 7,
  color: 'black',
  backgroundColor: 'rgba(255, 0, 0, 0.8)',
}, {
  from: 7,
  to: 8,
  color: 'black',
  backgroundColor: 'rgba(255, 0, 0, 0.85)',
}, {
  from: 8,
  to: 9,
  color: 'black',
  backgroundColor: 'rgba(255, 0, 0, 0.9)',
}, {
  from: 9,
  to: 10,
  color: 'black',
  backgroundColor: 'rgba(255, 0, 0, 0.95)',
}, {
  from: 10,
  to: 100,
  color: 'black',
  backgroundColor: 'rgba(255, 0, 0, 1)',
}];