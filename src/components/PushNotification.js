import PN from 'react-native-push-notification';

// clear previous notification
export const clearPushNotifications = () => {
  PN.cancelAllLocalNotifications();
};

export const setPushNotification = (id, message, silentMode = false) => {
  // set new
  PN.localNotification({
    id,
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
