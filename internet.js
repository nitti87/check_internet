const check_internet = ({ offline: { run, doAfter_offline, count: { steps, doAfter_count } }, interval }) => {
 let [timer, hasChecked_offline, counted] = [undefined, false, 0]

 const doA_check = () => {
  if (!navigator.onLine) { // offline
   hasChecked_offline = true
   clearInterval(timer)
   counted++
   if (counted === steps) {
    doAfter_count(eval(counted - 1))
    counted = 0
   } else { run(startInterval) }
  } else { // online
   hasChecked_offline ? doAfter_offline() : undefined
   hasChecked_offline = false 
   typeof steps === 'number' ? counted = 0 : undefined   
  }
 }

 function startInterval() { return !interval ? doA_check : timer = setInterval(doA_check, interval) }
 return startInterval()
}
