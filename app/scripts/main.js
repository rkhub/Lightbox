'use strict';

function lightboxLoad(){
    $.getJSON("scripts/data.json",  function (jsondata, status) {
        if(status === 'success'){
            if(jsondata) {
                var duration =  'width '+ jsondata.data.lightbox.duration/1000 +'s ease-in-out';
                var start = jsondata.data.lightbox.start;
                var finish = jsondata.data.lightbox.finish;
                $('#done').hide();
                $('#progress-modal').modal('show');
                progressBarAnimation(finish,duration);
            }
        }else{
            alert("NETWORK ERROR!, PLEASE TRY AFTER SOMETIME");
        }
    });
};

function progressBarAnimation(finishGoal, duration){
    $('.progress .progress-bar').css('background-color', '#428BCA').attr('data-transitiongoal', finishGoal ).css('transition', duration).progressbar({
        update: function(currentPercentage, $this) {
            $('#update').html('Progress ' + currentPercentage + '%');
        },
        done: function($this) {
            console.log("testing");
            $('#update').hide();
            $('#done').html('The Task is 100% completed');
            $('#done').show();
            $this.css('background-color', '#97C82F');
        }
    });
};

$('#launch').click(function() {
    $('#update').show();
    $('#done').hide();
    lightboxLoad();
});

$('#reset').click(function() {
    $('.progress .progress-bar').attr('data-transitiongoal', 0).progressbar();
});

window.addEventListener("load", lightboxLoad);
