if(!window.WebAssembly) {//if no web assembly
    alert("Your browser is not supported because it doesn't support WebAssembly");
    document.write("unsupported - no Web Assembly");
}
//start message
console.log("Welcome to Browser Linux");
//version
window.version = 1.22; //buildroot 2022.5
//parse url
var url = window.location.search.substring(1);
window.params = new URLSearchParams(url);
//iso
if(!(window.params.has("iso"))) {
	window.params.set("iso","rootfs.iso");
}
//screen
window.screen = false; //default value
if(window.params.has("screen")) {
    if(window.params.get("screen") == "true") {
        window.screen = true; //don't hide the screen after boot
    } else {
        document.getElementById("screen_container").style.display = "none";
        document.getElementById("screenButton").innerHTML = "show screen";
    }
} 
//cmd
if(window.params.has("cmd")) {
    window.cmd = window.params.get("cmd");
}
//autosave
if(window.params.has("autosave") && window.params.get("autosave") == "true") {
	console.log("enabling web storage persist");
	window.persist = true;
}
//embed 
if(window.params.has("embed") && window.params.get("embed") == "true") {
    var fluffs = document.getElementsByClassName("fluff");
    for(var i = 0;i<fluffs.length;i++) {
        fluffs[i].style.display = "none";
    }
    document.body.append(document.getElementById("save"));
    document.body.append(document.getElementById("clear_save"));
    document.body.append(document.getElementById("autosave_toggle"));
    window.persist = false;
}
//autosave restore
if(localStorage.getItem("autosave") == 'true') {
		document.getElementById("autosave_toggle").innerHTML = "disable autosave";
		window.persist = true;
}
window.boot = false; //not booted
console.log("using "+window.params.get("iso")+" as iso");
//start v86
var emulator = window.emulator = new V86Starter({
	wasm_path: "lib/v86/v86.wasm",
    memory_size: 256 * 1024 * 1024,
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
        url: window.params.get("iso")+"?version="+window.version, //async
	    async: (window.params.has("async") && (window.params.get("async") == "true")) ,
    },

    autostart: true,
    preserve_mac_from_state_image: true,
    //disable_keyboard: true
});
//configure page
   var term_div = document.getElementById("terminal");
   var waiting_text = document.getElementById("waiting_text");
//commented out because of issues with slow devices
  // setTimeout(function() {//wait for xterm
//        document.getElementById("terminal").style.display = "none";
 //  },1200);//hide screen 
  
   waiting_text.style.display = "block";
   document.getElementById("toolbox_div").style.display = "none";//hide toolbox
   var data = "";

//check for save
loadSaves();//run the function below
function loadSaves() {
    if(emulator.is_running()) {//check if it is loaded
        window.autosave_lock = false; //prevent race conditions
        localforage.getItem("snapshot-"+window.params.get("iso")).then(function(value) { 
           	if(value != null) {
			        state = value;
			        emulator.restore_state(state);
			        emulator.serial0_send("$HOME/.profile\n");//input after restore
			        document.getElementById("save_time").innerHTML = "restored from save at "+getTimestamp();
			        document.getElementById("storage_error").style.display = "none";
			        if(localStorage.getItem("noupdates") != 'true') {
			            checkForUpdates();
			        } else {
			            console.log("user opted out of rootfs updates - not checking");
			        }
            }
        }).catch(function(err) {//error
                   	console.log("error with web storage: "+err);
                   	window.persist = false;//no autosave
                   	document.getElementById("save").disabled = true;
                   	document.getElementById("autosave_toggle").disabled = true;
                   	document.getElementById("clear_save").disabled = true;
                   	document.getElementById("storage_error").style.display = "block";
 
        });
    } else {//v86 isn't ready
        setTimeout(loadSaves,1000);//check every second until ready
    }
}

//wait for boot
emulator.add_listener("serial0-output-char", function(char) {
        if(char !== "\r")
        {
            data += char;
        }

        if(data.endsWith("$ ") || data.endsWith("# "))
        {

            //time to boot
            if(window.boot == false) {
                console.log("Boot successful");//boot successful
                document.getElementById("terminal").style.display = "block";//show the terminal
                if(!window.screen) {//continue showing the screen if false
                    document.getElementById("screen_container").style.display = "none";//hide the screen
                    document.getElementById("screenButton").innerHTML = "show screen";
                }
                waiting_text.style.display = "none";
            	document.getElementById("boot_time").innerHTML = (Math.round(performance.now()/100)/10);
            	window.boot = true;
            	if(window.cmd != undefined) {//cmd
            	    emulator.serial0_send(window.cmd + "\n");
            	}
            	if(window.persist == true) {
            	   window.autosave_loop = setInterval(function() {
   	    	            startAutosave(true); //run autosave every 30 seconds
   	    	            console.log("autosaved");
   	    	        },30000);
   	            }
            }

        }
});
    
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
    var hours; 
    var ampm;
    var min;
    
    if(d.getHours() > 12) {
        hours = d.getHours() - 12;
        ampm = "pm";
    } else {
        hours = d.getHours();
        ampm = "am"
    }
    
    if(d.getMinutes() < 10) {
        min = "0" + d.getMinutes();
    } else {
        min = d.getMinutes();
    }
    
    return hours+":"+min+" "+ampm;
}


//autosave
function startAutosave(auto) {
	if(!window.autosave_lock) {
		window.autosave_lock = true;
		document.getElementById("save_time").innerHTML = "saving . . .";
		localStorage.setItem("version", window.version);
		emulator.save_state(function(error, new_state){
			if(error){
				console.log(error);
			}
		localforage.setItem("snapshot-"+window.params.get("iso"), new_state).then(function () {
			window.autosave_lock = false;
			
		});
		
		if(auto) {
			document.getElementById("save_time").innerHTML = "autosaved at "+getTimestamp();
		} else { //just a normal save
			document.getElementById("save_time").innerHTML = "saved at "+getTimestamp();
		    console.log("saved");
		}
		});
	}
}

function checkForUpdates() {//updates
console.log("checking for updates . . .");
var current_version = localStorage.getItem("version");
    if(current_version != null) {
        if(current_version < window.version) {
            console.log("newer version detected. Delete saved data to get latest");
            if(window.confirm("There is a newer version of the rootfs available. Delete all data and reload Now?") ) {
                delete_data();
            } else if (!window.confirm("Would you like to see this message again?")) {
                localStorage.setItem("noupdates",true);
                console.log("user opted out of updates");
                alert("You will no longer be receiving any rootfs updates - Delete save to opt back in");
            }
        } else {
            console.log("no updates available");
        }
    } else {
        console.log("no version number (old save?)");
        localStorage.setItem("version",window.version); //blindly set it but that the best that we can do
    }
}

//listen for postMessage
window.addEventListener("message", (event) => {
    var data = event.data;
    if(data == "toggleScreen") {
        toggleScreen();
    } else if(data == "save") {
        startAutosave();
    } else if(data == "pause") {
        emulator.stop();
    } else if(data == "play") {
        emulator.run();
    } else if(data == "togglePause") {
        if(emulator.is_running()) {
            emulator.stop();
        } else {
            emulator.run();
        }
    } else if(data.indexOf("cmd=") == 0) {
        emulator.serial0_send(data.substring(4)+'\n');
    }

});
