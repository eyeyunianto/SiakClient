function majax(get,send,bs){
  return $.ajax({
     type: 'GET',
     cache:true,
     url: App.base_url+get,
     beforeSend:function(){bs},
     data: send,
     timeout:20000,
     dataType:"json"
  });  
}
function majax_empty(get,send){
  return $.ajax({
    type: 'GET',
    url: get,
    cache:true,
    data: send,
    timeout:20000,
    dataType:"json"
  });  
}

function majax_post(get,send,bs){
  return $.ajax({
    type: 'POST',
    url: App.base_url+get,
    cache:true,
    beforeSend:function(){bs},
    data: send,
    timeout:20000,
    crossDomain:true,
    dataType:"json"
  });  
}
function majax_put(get,send,bs){
  return $.ajax({
    type: 'PUT',
    url: App.base_url+get,
    cache:true,
    beforeSend:function(){bs},
    data: send,
    timeout:20000,
    crossDomain:true,
    dataType:"json"
  });  
}
function majax_delete(get,send,bs){
  return $.ajax({
    type: 'DELETE',
    url: App.base_url+get,
    cache:true,
    beforeSend:function(){bs},
    data: send,
    timeout:20000,
    crossDomain:true,
    dataType:"json"
  });  
}
function validate(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}