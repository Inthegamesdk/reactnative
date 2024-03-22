import  { useEffect} from 'react';


const ITGVWebOverlay = () => {
  useEffect(() => {
    let head = document.getElementsByTagName('head')[0];
    let link = document.createElement('link');
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://html52.inthegame.io/dev}/main.js`;
    script.defer = true;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.media = 'screen,print';
    link.href = `https://html52.inthegame.io/dev/main.css`;
    head?.appendChild(script);
    head?.appendChild(link);
    script.onload = function () {
      if (typeof window !== 'undefined') {
        const exampleConfig = {
          videoPlayerId: 'VideoPlayerId',
          channelSlug: 'rn-demo',
          accountId: '62a73d850bcf95e08a025f82',
        };
       (window as any).inthegame?.init(exampleConfig);
      }
    };
  }, []);
}


export default ITGVWebOverlay;
