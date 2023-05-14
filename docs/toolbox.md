## Browser linux - The Toolbox
<img src=images/toolbox.png>

### The toolbox can be accessed by clicking the <img src="../icon/toolbox.png" width=20> icon.

#### Here's what each button does
 - Save Current Point
   - Takes a snapshot of the emulator which can be restored by clicking it again. Useful for recovering from purposefully destructive commands
 - *Fullscreen*
   - Makes it fullscreen
 - *Show Screen*
   - Shows and hides the screen.
 - *Pause*
   - Pauses the emulator. Click again to resume
 - *Save to File*
   - Downloads the state to a file. Can be useful for taking backups and moving data between devices
 - *Send Files to Emulator*
   - Used for uploading files to the emulator. See [9pfs.md](9pfs.md)
   - keep in mind that the upload path is inside the folder mount. 
 - *Restore from file*
   - used to restore state from file created by save to file
 - proxy url
   - This is the url to a custom proxy. If you want to self host a proxy for faster speeds this is how you do it. You will need docker setup and working for the project below.
     - https://github.com/benjamincburns/websockproxy (No rate limiting)
  - *Delete Saved data*
    - deletes saved data. **Be very mindful of this button. It will cause data loss.** You can backup using *save to file*.
 - *Enable Autosave* 
   - Enables autosave. See [saving.md](saving.md)
 - *save now*
   - Saves current state to browser storage which should restored on reload. Can be used to save data that autosave doesn't save.
