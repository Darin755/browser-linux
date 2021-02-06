
window.onload = function()
{
    var emulator = window.emulator = new V86Starter({
    	  wasm_path: "v86/v86.wasm",
        memory_size: 512 * 1024 * 1024,
        vga_memory_size: 32 * 1024 * 1024,
        network_relay_url: "wss://relay.widgetry.org/",
        screen_container: document.getElementById("screen_container"),
        serial_container: document.getElementById("term"),
        bios: {
            url: "bios/seabios.bin",
        },
        vga_bios: {
            url: "bios/vgabios.bin",
        },
        cdrom: {
            url: "slitaz/slitaz-rolling.iso",
        },
        autostart: true,
        preserve_mac_from_state_image: true
    });
    
   document.getElementById("toolbox_div").style.display = "none"; 
    
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
      a.download = "v86state.bin";
      a.href = window.URL.createObjectURL(new Blob([new_state]));
      a.dataset.downloadurl = "application/octet-stream:" + a.download + ":" + a.href;
      a.click();
	});
}


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
    };
    
function startStop() {
  if (emulator.is_running() == true) {
    emulator.stop();
    document.getElementById("pause_button").innerHTML = "start";
  } else {
    emulator.run();
    document.getElementById("pause_button").innerHTML = "stop";
  }
}
var state;
function save() {
	emulator.save_state(function(error, new_state){
		if(error){
			throw error;
		}
		state = new_state;
	});
	document.getElementById("save_time").innerHTML = getTimestamp();
}

function restore() {

	emulator.restore_state(state);
}

function getTimestamp() {
var d = new Date();
return "saved at: "+d.getHours()+":"+d.getMinutes()+" "+(d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear();
}
