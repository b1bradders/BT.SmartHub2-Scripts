DISABLED_BUTTON_CLASS = "regular_button_disable" // change if it's different for you!
ENABLED__BUTTON_CLASS = "regular_button"

DEVICE_LIST_BOX = document.querySelector("#device_obj_box")
if (DEVICE_LIST_BOX == undefined) {
  alert("this script can't be used here!")
  throw Error("script cannot be used on this page. look for devices list in Advanced settings -> My network in the BT Hub Manager found at your router's IP address!")
}

function fixer() {
  // get all **UNremovable** devices' grayed out remove buttons.
  buttons = Array.from(DEVICE_LIST_BOX.querySelectorAll("div input.regular_button_disable.type_remove"))

  buttons.forEach((btn) => { // for every disabled button...
    btn.classList.remove(DISABLED_BUTTON_CLASS); btn.classList.add(ENABLED__BUTTON_CLASS); // ...make it enabled...

    const selectContainer = btn.parentElement.querySelector(".selectOption")
    const idArgs = selectContainer.getAttribute("onclick").match(/\d+/g).map(Number) // ...get the device's BT hub IDs from the select container...

    // ...and make the remove button have functionality, using the IDs given to us by the onclick attribute from .selectOption!
    btn.setAttribute("onclick", `deleteDevCheck(${idArgs.join(",")})`)
  })

  console.log("fixed!")
}

// make a new observer which will...
const observer = new MutationObserver((_) => {
  console.log('device list changed!');
  fixer()
})

// ...observe the device list...
observer.observe(DEVICE_LIST_BOX, {
  childList: true // ...and look for devices added/removed.
})

// first run!
fixer()
