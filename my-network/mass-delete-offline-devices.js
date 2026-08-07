// disable the popup and delete directly!
this.deleteDevCheck = ((a,b,c) => {
	this.deleteDev(a,b,c)
})

// get all removable devices' remove buttons.
buttons = Array.from(document.querySelector("#device_obj_box").querySelectorAll("div input.regular_button.type_remove"))

// pop the buttons array and remove the device returned from pop
function tryDeleteNextDeviceFromArray(code) {
	if (buttons.length < 1) { // if there are no more items left though...
		status = "unavailable" // ...report back that we are unavailable...
		clearInterval(code) // ...disable the post id checker...

		throw Error("no more devices!") // ...and throw an error!
	}

	// otherwise, set our last post id to the current one...
	lastPi = new_pi

	// and request the device be deleted (and also fetches new post id)
	buttons.pop()?.click()
}

// main script - keep it all local so that running this again won't set lastPi to 1 globally if it was already changed before
(() => {
  this.lastPi = 1
  this.status = "devices available"

  if(!window.scriptRan) {
    alert("if there is an error about something being undefined, just run the script again. press OK to continue.")
    window.scriptRan = true
  }

  setInterval((code)=>{
    // if we have a new post id, and the status is not unavailable...
    if (this.lastPi != new_pi && this.status != "unavailable") {
      console.log("attempting to send next delete!") // ...let the person know that a device is possibly going to be deleted...
      tryDeleteNextDeviceFromArray(code) // ...and then attempt to delete it.
    }
  }, 400)
})()
