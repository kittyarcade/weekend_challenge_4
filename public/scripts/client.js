$(document).ready(function(){
  console.log('meow');


//button to add new task and then run newTask function
$('#addTask').on('click', function(){
  console.log('clicked');
  newTask();
  $('#task').val(''); //empties input field after click
});

$(document).on('click', '.remove', removeTask);

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
        outputText += '<p>' + response[i].task + '</p><p><button class="complete" data="' + response[i].id + '">Completed?</button><button class="remove" data="' + response[i].id + '">Remove</button></p>';
      }
      $('#theTasks').html(outputText);
    }
  }); //end GET ajax call
} // end getTasks function

function removeTask(){
  var deleteItem = {
    id: $(this).attr('data')
  };
  console.log(deleteItem);
  $.ajax ({
    type: 'DELETE',
    url: 'remove',
    data: deleteItem,
    success: function(response){
      console.log('from delete');
    },
    error: function(){
      console.log('error with ajax');
    }
  });//end ajax call
}//end removeTask function

}); //end document ready
