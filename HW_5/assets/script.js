  
$(document).ready(function() {

    //Updates the current date to the id currentDay----------------------------------------    
    var date = moment().format("dddd, MMMM Do YYYY");
    $("#currentDay").text(date); 
    
    //Current, start and end time variables------------------------------------------------
    var currentTime = moment().format("HH");
    //-------------------------------------------------------------------------------------
    
    var dayHrs = 18;
    
    for( var i = 9; i < dayHrs; i++){ 
        var timeBlock = $("<div class='time-block row'>");
        var hour = $("<div class='hour col-1 col-xs-2'>");
        var task = $("<textarea class='description col-10 col-xs-10'>");
        task.attr("data-task", i);
        var save = $("<button class='saveBtn col-1 col-xs-12'>").append("<i class='fas fa-save'>");
        $(".container").append(timeBlock);
        timeBlock.append(hour, task, save);
        hour.append(i + ":00");
    
    //Time of day conditions for what class is added to each time block
        if(currentTime > i){
          timeBlock.addClass("past");
          }
          else if(currentTime == i){
          timeBlock.addClass("present");
          }
          else if(currentTime < i){
          timeBlock.addClass("future");
          }
          else if(currentTime >= 19){
          timeBlock.addClass("past");
          }
    
    //Get local storage--------------------------------------------------------------------
          var tasknum = "tasks" + i;
          var tasklist = localStorage.getItem(tasknum);
          task.val(tasklist);  
    }
    
    //Save text input on click to local storage--------------------------------------------
          $(".saveBtn").on("click", function(){
            var task = $(this).prev();
            var tasks = task.val();
            var tasknum = "tasks" + task.attr("data-task");
            localStorage.setItem(tasknum, tasks);
            let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

          })
    })
    