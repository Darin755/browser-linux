window.onload = function()
{
    //parse url
    url = window.location.search.substring(1);
    var params = new URLSearchParams(url);
    //iso
    if(!(params.has("iso"))) {
    	params.set("iso","rootfs.iso");
    }
    //screen
    if(params.has("screen") && (params.get("screen") == "true")) {
        document.getElementById("screen_container").style.display = "block";
        document.getElementById("screenButton").innerHTML = "hide screen";
    }
console.log(params.iso);
    var emulator = window.emulator = new V86Starter({
    	wasm_path: "lib/v86/v86.wasm",
        memory_size: 512 * 1024 * 1024,
        vga_memory_size: 16 * 1024 * 1024,
        network_relay_url: "wss://relay.widgetry.org/",
        screen_container: document.getElementById("screen_container"),
	serial_container_xtermjs: document.getElementById("terminal"),
        bios: {
            url: "lib/bios/seabios.bin",
        },
        vga_bios: {
            url: "lib/bios/vgabios.bin",
        },
        filesystem:{
          basefs: "contents.json",
          baseurl: "flat/",
        },
     	cdrom: {
     	  url: params.get("iso"),
     	},

        autostart: true,
        preserve_mac_from_state_image: true,
        disable_keyboard: true
    });

   document.getElementById("toolbox_div").style.display = "none";
   //wait for boot
   var term_div = document.getElementById("terminal");
   var waiting_text = document.getElementById("waiting_text");
   
   //term_div.style.display = "none";
   waiting_text.style.display = "block";
   var data = "";
   
   //check if previous instance
   window.persist = false; //persist is off until browser support is verified
   window.autosave_lock = false; //prevent race conditions
   localforage.getItem("snapshot-"+params.get("iso")).then(function(value) {
   	//disabled becuase of bugs
   	//console.log("enabling web storage persist");
   	//window.persist = true;
   	if(value != null) {
			state = value;
			emulator.restore_state(state);
			emulator.serial0_send("$HOME/.profile\n");//input after restore
			document.getElementById("save_time").innerHTML = "restored from save at "+getTimestamp();
   	}
   }).catch(function(err) {
   	console.log("error with web storage: "+err);
   	window.persist = false;
   	document.getElementById("save").disabled = true;
   	document.getElementById("autosave_toggle").disabled = true;
   	document.getElementById("clear_save").disabled = true;
   });

emulator.add_listener("serial0-output-char", function(char)
    {
        if(char !== "\r")
        {
            data += char;
        }

        if(data.endsWith("$ "))
        {
            console.log("Boot successful");
           // term_div.style.display = "block";
   	    waiting_text.style.display = "none";
   	    if(window.persist == true) {
   	    	startAutosave(true); //start autosave
   	    }
        }
    });
document.getElementById("restore_file").onchange = function()
    {
        if(this.files.length)
        {
            var filereader = new FileReader();
            emulator.stop();

            filereader.onload = function(e)
            {
                emulator.restore_state(e.target.result);
                emulator.run();
            };

            filereader.readAsArrayBuffer(this.files[0]);

            this.value = "";
        }

        this.blur();
        document.getElementById("save_time").innerHTML = "restored at "+getTimestamp();
        //a helpful hint
        document.getElementById("waiting_text").innerHTML = "Press enter to resume . . .";
        waiting_text.style.display = "block";
    };

}


function toggleToolbox() {
  var t = document.getElementById("toolbox_div");
  if (t.style.display === "none") {
    t.style.display = "block";
    document.getElementById("toggle").innerHTML = "hide toolbox";
  } else {
    t.style.display = "none";
    document.getElementById("toggle").innerHTML = "show toolbox"
  }
}

function toggleScreen() {
  var t = document.getElementById("screen_container");
  if (t.style.display === "none") {
    t.style.display = "block";
    document.getElementById("screenButton").innerHTML = "hide screen";
  } else {
    t.style.display = "none";
    document.getElementById("screenButton").innerHTML = "show screen"
  }
}


function saveToFile() {
	emulator.save_state(function(error, new_state) {
   	if(error) {
      	throw error;
      }

      var a = document.createElement("a");
      a.download = "browser-linux.bin";
      a.href = window.URL.createObjectURL(new Blob([new_state]));
      a.dataset.downloadurl = "application/octet-stream:" + a.download + ":" + a.href;
      a.click();
      document.getElementById("save_time").innerHTML = "state saved at "+getTimestamp();
	});
}




function startStop() {
  if (emulator.is_running() == true) {
    emulator.stop();
    document.getElementById("pause_button").innerHTML = "unpause";
    document.getElementById("save_time").innerHTML = "paused at "+getTimestamp();
  } else {
    emulator.run();
    document.getElementById("pause_button").innerHTML = "pause";
    document.getElementById("save_time").innerHTML = "resumed at "+getTimestamp();
  }
}

function saveRestore() {
	if(document.getElementById("save_restore").innerHTML == "restore to previous point") {
		restore();
		document.getElementById("save_restore").innerHTML = "save current point";
	} else {
		save();
		document.getElementById("save_restore").innerHTML = "restore to previous point";
	}
}

var state;
function save() {
	emulator.save_state(function(error, new_state){
		if(error){
			console.log(error);
		}
		state = new_state;
		document.getElementById("save_time").innerHTML = "saved to temporary at "+getTimestamp();
	});

}

function restore() {
	emulator.restore_state(state); 
	document.getElementById("save_time").innerHTML = "restored from temporary at "+getTimestamp();
}

function getTimestamp() {
var d = new Date();
return d.getHours()+":"+d.getMinutes()+" "+(d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear();
}

function fullscreen() {
	document.getElementById("screen_container").requestFullscreen();
}

//autosave
function startAutosave(auto) {
	if(!window.autosave_lock) {
		window.autosave_lock = true;
		emulator.save_state(function(error, new_state){
			if(error){
				console.log(error);
			}
		localforage.setItem("snapshot-"+params.get("iso"), new_state).then(function () {
			window.autosave_lock = false;
			console.log("saved");
		});
		
		if(auto) {
			document.getElementById("save_time").innerHTML = "autosaved at "+getTimestamp();
		} else {
			document.getElementById("save_time").innerHTML = "saved at "+getTimestamp();
		}
		});
	}
}


function delete_data() {
	if(window.confirm("You are about to delete saved data. Are you sure you want to continue? THIS CAN NOT BE UNDONE!!!")){
		window.autosave_lock = true;
		localforage.setItem("snapshot-"+params.get("iso"), null).then(function () {
			console.log("deleted");
			window.location.reload();//reload the page
		});
	}
}

function toggle_autosave() {
	var b = document.getElementById("autosave_toggle")
	if(b.innerHTML == "disable autosave") {
		b.innerHTML = "enable autosave";
		window.persist = false;
	} else {
		b.innerHTML = "disable autosave";
		window.persist = true;
	}
}

