const check_internet = (option = {}) => {
  let [ with_interval, timer, startOver, interval, doAfter_offline, number, count ] = [
    option.with_interval || false, 
    undefined, 
    false,
    option.with_interval ? option.with_interval.interval || 1000 : undefined,
    option.offline.doAfter_offline || null,
    option.offline.count && typeof option.offline.count.do === 'function' ? parseInt(option.offline.count.number) : undefined,
    option.offline.count && typeof option.offline.count.do === 'function' ? 0 : undefined
  ]

  const start_interval = () => {
    !with_interval ? check_funct() : (timer = setInterval(() => { check_funct() }, interval))
  }

  const check_funct = (doAfter_bool) => {
    if(navigator.onLine) {
      doAfter_bool ? (doAfter_offline(), start_interval()) : undefined

      typeof option.online.run === 'function' ? option.online.run(check_funct) : option.online.run || null
      with_interval && startOver && !doAfter_bool ? (start_interval(), startOver = false) : null
    } else {
      
      if(count === number && number !== undefined) {
        clearInterval(timer)
        return counted_error()
      } else {        
        
        typeof option.offline.run === 'function' ? option.offline.run(check_funct) : option.offline.run || null
        clearInterval(timer)
        startOver = true
        
        option.offline.count && typeof option.offline.count.do === 'function' ? count++ : null
      }
    }
  }
  
  function counted_error(){
    option.offline.count.do()
    
    let time_error = setInterval(() => {
      if(navigator.onLine) {
        doAfter_offline()
        clearInterval(time_error)
        start_interval()
      }
    }, interval || 1000)
  }

  start_interval()
}
