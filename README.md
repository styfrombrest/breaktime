# BreakTime app

## Description

### Applikacja BreakTime

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

## DEV

`ANDROID_EMULATOR_USE_SYSTEM_LIBS=1 primusrun ./studio.sh`

`./emulator -list-avds`

`lsof -i :8081`

`kill -9 PID`
