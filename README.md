# Inthegame React Native example

This repository is an example of how to integrate Inthegame in a React Native TV project. It includes wrappers for our native SDKs.

## Instalation

The project requires the `react-native-tvOS` package to support tvOS devices and `react-native-keyevent` to handle key events in android (required if using the predictions feature). Please add these packages if missing:
```
"react-native": "npm:react-native-tvos@0.68.2-2",
"react-native-keyevent": "^0.2.8",
```

Next, add the `ITGOverlay.js` file to your react-native project.

After that you'll need to configure the native modules in each platform.


