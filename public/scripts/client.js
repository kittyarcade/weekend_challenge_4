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
    task: $('#task').val(),
  };
  $.ajax({
    type:'POST',
    url:'/addTask',
    data: objectToSend,
    success: function(response){
      console.log('Posted: ', response);
      getTasks();

    }
  });//end ajax call
};

//getTasks back
function getTasks(){
  $.ajax ({
    type: 'GET',
    url: 'getTask',
    success: function(response){
      console.log('back from get', response);
      var outputText = '';
      for(var i = 0; i < response.length; i++){
        outputText += '<p>' + response[i].task + '</p><button class="deleteButton" data="' + response[i].id + '">Delete Task</button>';
      }
      $('#theTasks').html(outputText);

    }
  }); //end GET ajax call
}


}); //end document ready
