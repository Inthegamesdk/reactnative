# itg-react-native

# IOS, tvOS currently is not working

ITGOverlay for react-native

## Installation

```sh
npm install itg-react-native react-native-keyevent react-native-video react-native-vector-icons

```

## Usage

```js
import { ITGVideoOverlay } from 'itg-react-native';

// ...

<ITGVideoOverlay
    style={styles.container}
    source={
        {
        uri: "https://media.inthegame.io/uploads/dev/testing/videos/DolbyAtmosdemos4kHDR(GoodfortestingTVormobileHDRSupporteddevices).mp4"
        }
    } 
    accountId={"<your account id>"}
    channelSlug={"<channel slug>"}
    environment={"<enviroment>"}/>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
