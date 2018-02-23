# BreakTime app

## Task

`"Nie wolno siedzieć długo przed komputerem, a więc trzeba zrobić przerwę."`

Stwórz aplikacje która będzie informowała użytkownika o przerwie. Aplikacja musi mieć następną funkcjonalność:

1. Użytkownik może ustawiać ile czasu pracować;
2. Użytkownik może ustawiać ile czasu odpoczywać;
   Przykład:
   praca: 55 min
   przerwa: 5 min

3. Po przerwie użytkownik może odpalić timer jeszcze raz klikając na odpowiedni przycisk;
4. Użytkownik może wybierać tryb informowania - dźwięk lub wibracja;
5. Po końcu czasu pracy albo czasu przerwy aplikacja musi informować użytkownika albo dźwiękiem albo wibracją w zależności od wyboru użytkownika (w trybie wyciszonym urządzenia - tylko wibracja)

Aplikacja musi działać jak na Androidzie tak i na iOS (nie ma wymagań odnośnie wersji systemu operacyjnego);

#### Requirements

* Android 5.0+
* Patience

#### Instructions

To start using this app choose working and relax interval then press Start button. The app uses native Android time picker, so it could look differently depending on platform version. Then you'll see running countdown and title of current period: first will be working interval, then - relax interval. When working interval is over you'll receive a push notification. App uses default system sound to notify. If silent mode switcher is active you'll receive push notification with vibration. After ending of relax interval you'll get another push notification and modal popup in the app, which allows you to repeat both intervals again. Default intervals are based on Polish labor law(_Rozporządzenie Ministra Pracy i Polityki Socjalnej z dnia 1.12.1998 r. w sprawie bezpieczeństwa i higieny pracy na stanowiskach wyposażonych w monitory ekranowe_).

Enjoy! :)

#### Known issues

* Vibration duration bug. Detected on Xiaomi RN4 Pro, MIUI 9.2, A 7.0.

* Countdown sometimes isn't displayed smoothly, because of synchronization between app timer and system time, especially after background working.

* It's impossible to switch silent mode selector after the timer has been started, because of using scheduled push notifications.

* App doesn't support iOS because of lack of devices. For iOS build some components(like `react-native-push-notification`, `react-native-background-timer`) should be configured manually.

### DEV command notes

`./emulator -list-avds`

`primusrun ./emulator -avd Nexus_HW`

#### Release build & deploy to device

`react-native run-android --variant=release`

#### version `GLIBCXX_3.4.21' not found (required by /usr/lib/primus/libGL.so.1)

`cd /Android/emulator/lib64/libstdc++/ && ln -fs /usr/lib/libstdc++.so.6 libstdc++.so.6`
