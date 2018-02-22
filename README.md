# BreakTime app

## Description

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

## Known issues

* Vibration duration bug. Detected on Xiaomi RN4 Pro, MIUI 9.2, A 7.0

## DEV command tips

`./emulator -list-avds`

`primusrun ./emulator -avd Nexus_HW`

`lsof -i :8081`

`kill -9 PID`

### Release build & deploy to device

`react-native run-android --variant=release`

#### version `GLIBCXX_3.4.21' not found (required by /usr/lib/primus/libGL.so.1)

`cd /Android/emulator/lib64/libstdc++/ && ln -fs /usr/lib/libstdc++.so.6 libstdc++.so.6`
