import { Dimensions } from 'react-native';
import moment from 'moment';

export const isInt = value => Number.isInteger(value);

/**
 * Check if input value can be integer
 * @param {string} value
 * @returns {bool} true/false
 */
export const isStringInt = value => value.length && value.search(/\D/g) === -1 && Number.isInteger(+value);

/**
 * Orientation detection, based on dimensions of screen
 * @returns true, if it's portrait orientation of device
 */
export const isPortrait = () => {
  const { width, height } = Dimensions.get('window');
  return width < height;
};

export const getSecondsFromMinutes = minutes => minutes * 60;

export const getDuration = (period, format = 's') => moment.duration(period, format);

export const getTime = (period, format = 's') => moment.utc(getDuration(period, format).asMilliseconds());

export const getDiffNow = (momentDate, format = 'seconds') => momentDate.diff(moment(), format);
