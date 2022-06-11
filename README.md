### **browser linux:** _run Linux in your browser_

## [LIVE DEMO](https://darin755.github.io/browser-linux/)

<img src="screenshot.png">

### About

 - Browser linux is a project to get a linux command line in the browser

 - It originally ran slitaz but it was moved to a custom buildroot config

   - See https://github.com/Darin755/browser-buildroot

 - It uses the following libraries

   - v86 [link](https://github.com/copy/v86), [LICENSE](https://github.com/Darin755/browser-linux/raw/master/lib/v86/LICENSE)

   - localforge [link](https://github.com/localForage/localForage), [LICENSE](https://github.com/Darin755/browser-linux/raw/master/lib/localForage/LICENSE)

   - xtermjs [link](https://github.com/xtermjs/xterm.js), [LICENSE](https://github.com/Darin755/browser-linux/raw/master/lib/xtermjs/LICENSE)

## How to save

 - it can take anywhere from 30-60 sec to boot depending on hardware

 - open the toolbox (the icon at the bottom) and press save now and/or enable autosave

## How to embed

 - It is actually pretty simple to do. You can use this HTML as a starting point: 
 - ```<iframe width=750px height=450px src="http://0.0.0.0:8000/?embed=true"></iframe>```
 - See [Embed.html](embed.html) if you need more help

## License

 - browser-linux itself is under GPLv2 License
 - see LICENSE
