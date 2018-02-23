import PN from 'react-native-push-notification';

const getId = () => Math.floor(Math.random() * 26) + String(Date.now()).substring(8);

// clear previous notification
export const clearPushNotifications = () => {
  PN.cancelAllLocalNotifications();
};

export const setPushNotification = (message, silentMode = false) => {
  // set new
  PN.localNotification({
    id: getId(),
    largeIcon: 'ic_launcher',
    smallIcon: 'ic_launcher',
    title: 'Break Time App',
    message,
    vibrate: silentMode,
    vibration: 1000,
    playSound: !silentMode,
    soundName: 'default',
  });

  return true;
};

export const setSchedulePushNotification = (date, message, silentMode = false) => {
  // set new
  PN.localNotificationSchedule({
    id: getId(),
    largeIcon: 'ic_launcher',
    smallIcon: 'ic_launcher',
    title: 'Break Time App',
    message,
    vibrate: silentMode,
    vibration: 1000,
    playSound: !silentMode,
    soundName: 'default',
    date,
  });

  return true;
};
