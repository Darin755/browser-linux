window.onload = function()
{
    var emulator = window.emulator = new V86Starter({
    	wasm_path: "lib/v86/v86.wasm",
        memory_size: 512 * 1024 * 1024,
        vga_memory_size: 32 * 1024 * 1024,
        network_relay_url: "wss://relay.widgetry.org/",
        //screen_container: document.getElementById("screen_container"),
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
     	  url: "rootfs.iso",
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
   
    emulator.add_listener("serial0-output-char", function(char)
    {
        if(char !== "\r")
        {
            data += char;
        }

        if(data.endsWith("$ "))
        {
            console.log("Boot successful");
            term_div.style.display = "block";
   	    waiting_text.style.display = "none";
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
    document.getElementById("pause_button").innerHTML = "start";
    document.getElementById("save_time").innerHTML = "paused at "+getTimestamp();
  } else {
    emulator.run();
    document.getElementById("pause_button").innerHTML = "stop";
    document.getElementById("save_time").innerHTML = "resumed at "+getTimestamp();
  }
}

function saveRestore() {
	if(document.getElementById("save_restore").innerHTML == "restore") {
		restore();
		document.getElementById("save_restore").innerHTML = "save";
	} else {
		save();
		document.getElementById("save_restore").innerHTML = "restore";
	}
}

var state;
function save() {
	emulator.save_state(function(error, new_state){
		if(error){
			Console.log(error);
		}
		state = new_state;
		document.getElementById("save_time").innerHTML = "temporary saved at "+getTimestamp();
	});

}

function restore() {
	emulator.restore_state(state);
	document.getElementById("save_time").innerHTML = "restored from temporary save at "+getTimestamp();
}

function getTimestamp() {
var d = new Date();
return d.getHours()+":"+d.getMinutes()+" "+(d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear();
}

function fullscreen() {
	document.getElementById("screen_container").requestFullscreen();
}
