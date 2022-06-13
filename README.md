### **browser linux:** _run Linux in your browser_

## [LIVE DEMO](https://darin755.github.io/browser-linux/)

<img src="docs/images/screenshot.png">

*star it if you like it*

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
 - See [saving.md](docs/saving.md)

## How to embed

 - It is actually pretty simple to do.
 - See [Embed.md](docs/embed.md)
 
## Documentation
 - How to save: [saving.md](docs.saving.md)
 - How to use the toolbox: [toolbox.md](docs/toolbox.md)
 - url parameters: [parameters.md](docs/parameters.md)
 - internet: [internet.md](docs/internet.md)
 - updates: [updates.md](docs/updates.md)
 - How to embed: [embed.md](docs/embed.md)

## Limitations
 - It is a bit slow
   - It is fine for running simple programs but as soon as you try to run anything that requires cpu it will slow down immensely because the cpu is emulated by v86
 - No Package Manager
   - Their is no package manager because a package manager would require a stable internet connection. see [internet.md](docs/internet.md)
 - No Man pages
   - Man pages are to large and are not included. 

## Contributing
 - Feel free to open a issue, pull request or discussion

## License

 - Browser linux itself is under GPLv2 License
 - see LICENSE
