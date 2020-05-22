check_internet({
  offline: {
    run: function(check_funct) { 
      const b = new Box('body', {autocloser: false}).type('info').text({updateText: function(div) {
        let x = 10
        div.innerText = x
  
        let t = setInterval(()=>{
          x--
          div.innerText = x
          if(x<1){
            clearInterval(t)
            b.close()
            return check_funct(true)
          }
        },1000)
      }}) 
    },
    doAfter_offline: function(){ new Box('body').type('info').text('connected') }
  },
  with_interval: {
    interval: 1000
  }
})
