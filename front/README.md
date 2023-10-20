# Getting Started with Create React App

Instauje zaleznosci
### `npm install`

Generuje icony i splashscreen
### `npx capacitor-assets generate`

Development
### `ionic serve`

1
### `ionic build`
2
### `ionic capacitor add android`
3
### `ionic cap sync`
4
### `cd android && ./gradlew assembleDebug && cd ..`

1 i 2 wystarczy raz a tak naprawde juz raczej nie trzeba.
Dalej do budowania apk wystarczy 3 i 4

odpala dev na telefonie:
### `ionic cap run android --external -livereload`
