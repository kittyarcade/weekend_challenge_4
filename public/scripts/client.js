$(document).ready(function(){
  console.log('meow');

//button to add new task and then run newTask function
$('#addTask').on('click', function(){
  console.log('clicked');
  newTask();
  $('#task').val(''); //empties input field after click
});

//newTask function creates object
var newTask = function(){
  objectToSend = {
    task: $('#task').val()
  };
  $.ajax({
    type:'POST',
    url:'/addTask',
    data: objectToSend,
    success: function(response){
      console.log('Posted: ', response);
    }
  });
};


// });

}); //end document ready
