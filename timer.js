$(document).ready(function(){
  var slide_time = 1200; // The time it takes to complete an entire transition
  var change_point = slide_time / 2; // Calculates when the slide should change
  var right_arrow = $('.easytransitions_navigation__right'); // Element that trigger move right
  var left_arrow = $('.easytransitions_navigation__left'); // Element that trigger move left
  var slide_amount = $('.easytransitions section').length; // How many slides
  var current_slide = 1; // Starting slide
  var on = 1;

  var nextImage = function(){
    if(on == 1){
      on = 0;
      if(current_slide < slide_amount){
        current_slide++;
        var active_slide = $('.active_slide').next()
        set_transition(active_slide);
        setTimeout(function(){
          $('.active_slide').hide().removeClass('active_slide').next().addClass('active_slide').show();
        },change_point);
        setTimeout(function(){
          on = 1;
        },slide_time);
      } else {
        // End
        // prevImage()
      }
    }
  };

  var prevImage = function(){
    if(on == 1){
      on = 0;
      if(current_slide > 1){
        current_slide--;
        var active_slide = $('.active_slide').prev()
        set_transition(active_slide);
        setTimeout(function(){
          $('.active_slide').hide().removeClass('active_slide').prev().addClass('active_slide').show();
        },change_point);
        setTimeout(function(){
          on = 1;
        },slide_time);
      } else {
        // Start
        // nextImage();
      }
    }
  };
  right_arrow.click(function(){
    nextImage();
  });

  left_arrow.click(function(){
    prevImage();
  });

  // Set transition type

  function set_transition(tran){
    var transition_type = tran.data('transition')
    $('.easytransitions_transition div').each(function(){
      $(this).removeClass(this.className.split(' ').pop());

      setTimeout(function(){
        $('.easytransitions_transition div').addClass(transition_type)
      },100)

    })
  }

  var callbacks = {
    stop: function(){
      setTimeout(function(){
        $('.timerContainer').addClass('animated hinge');

        $('.timerContainer').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $('.timerContainer').hide();
            $('.easytransitions').show();
            $('.easytransitions').addClass('animated rollIn');
        });
      }, 1500);

      var action = setInterval(function(){
        nextImage();
      }, 5000);
    }
  }

  var newYear = new Date(2017, 0, 1, 0, 0, 0);



  var clock_options = {
    autoStart: true,
    callbacks: callbacks,
    countdown: true,
    clockFace: 'DailyCounter',
  }

  var clock = $('.clock').FlipClock(newYear, clock_options);

  $('.resetTime').click(function(event){
    event.preventDefault();
    var minsToAdd = Number($('.timer').val()) * 1000;
    var plusMins = new Date((new Date()).getTime() + new Date(minsToAdd).getTime());
    clock = $('.clock').FlipClock(plusMins, clock_options);
  });

});