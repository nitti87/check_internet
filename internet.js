const check_internet = ({ offline: { run, doAfter_offline }, interval }) => {
 let timer
 let hasChecked_offline = false

 const doA_check = () => {
  if (!navigator.onLine) {
   hasChecked_offline = true
   clearInterval(timer)
   run instanceof Function ? run(startInterval)) : undefined
  } else if (hasChecked_offline && doAfter_offline instanceof Function) {
   hasChecked_offline = false
   doAfter_offline ()
  }
 }

 function startInterval() { return !interval ? doA_check : timer = setInterval(doA_check, interval) }
 return startInterval()
}
