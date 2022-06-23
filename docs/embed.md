## Browser Linux embed quickstart:
```<iframe width=750px height=500px src="http://0.0.0.0:8000/?embed=true"></iframe>```
### This is the basic iframe to embed browser linux. The dimensions should be 750x500 for the best experience. 
### Customizing futher
- ### You can use the url parameters to add custom functionality (see [parameters.md](docs/parameters.md))
- ### You can send messages to the iframe to control it from the main page. 
  - ### Browser linux embed supports the following messages
    - #### toggleScreen
      - toggles the screen
    - #### save
      - saves current state
    - #### pause
      - pauses the emulator
    - #### play
      - unpauses the emulator
    - #### togglePause
      - toggles pause
    - #### cmd=CMD
      - runs CMD
 
- ### You can also use css to make the iframe look a little nicer. (not covered here)

## See [embed.html](../embed.html) for an example