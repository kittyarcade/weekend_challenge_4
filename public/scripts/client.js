$(document).ready(function(){
  console.log('meow');

var items = [];
//button to add new task and then run newTask function
$('#addTask').on('click', function(){
  console.log('clicked');
  newTask();
  $('#task').val(''); //empties input field after click
});

//remove button
$(document).on('click', '.remove', removeTask);
//task completed button
$(document).on('click', '.complete', completeTask);


//newTask function creates object
var newTask = function(){
  objectToSend = {
    task: $('#task').val(),
    completed: false
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
      $('#theTasks').html('');
      var outputText = '';
      for(var i = 0; i < response.length; i++){
      items.push(response[i]);
      if(response[i].completed === false){
        outputText += '<p>' + response[i].task + '</p><p><button class="complete" data="' + response[i].id + '">Completed?</button><button class="remove" data="' + response[i].id + '">Remove</button></p>';
      } else {
        outputText += '<p class="completed">' + response[i].task + '</p><p><button class="disabled" data="' + response[i].id + '">Done!</button><button class="remove" data="' + response[i].id + '">Remove</button></p>';
        }
      }
      $('#theTasks').html(outputText);
    }
  }); //end GET ajax call
} // end getTasks function

function removeTask(){
  if(confirm('Are you sure?')){
  var deleteItem = {
    id: $(this).attr('data')
  };
  // console.log(deleteItem);
  // console.log(objectToSend);
  $.ajax ({
    type: 'DELETE',
    url: 'remove',
    data: deleteItem,
    success: function(response){
      console.log('from delete');
    },
    error: function(response){
      console.log('error with ajax');
    }
  });//end ajax call
}
  getTasks();
}//end removeTask function

function completeTask(){
  var completedTask = {
    id: $(this).attr('data')
  };
  $.ajax({
    type: 'PUT',
    url: 'taskCompleted',
    data: completedTask,
    success: function(response){
      console.log('from task complete call');
    },
    error: function(response){
      console.log('error with task complete call');
  }
  }); //end ajax call
  getTasks();
}//end completeTask


}); //end document ready
