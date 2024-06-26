$(document).ready(function() {

  //video lazy load
  // Function to check if an element is in the viewport
  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Lazy load videos when they come into view
  $(window).on('scroll resize', function() {
      $('.video-placeholder').each(function() {
      if (isInViewport(this)) {
          var videoSrc = $(this).data('src');
          $(this).html('<video autoplay loop muted playsinline><source src="' + videoSrc + '" type="video/mp4"></video>');
          $(this).removeClass('video-placeholder'); // Remove the placeholder class to prevent re-loading
      }
      });
  });

  // Trigger the scroll event to check for lazy-loaded content on page load
  $(window).trigger('scroll');


  $(".schedule-btn").on('click',function(event) {
    event.preventDefault();
    // Get the position of the target div
    var targetPosition = $('.request_demo_wrapper').offset().top - 100;
    //alert(targetPosition);
    $('html, body').animate({
      scrollTop: targetPosition
    }, 1500); 
    $('.navbar-collapse').removeClass('show');
  });

  $(".schedule-btn-link").on('click',function(event) {
    event.preventDefault();
    // Get the position of the target div
    var targetPosition = $('.request_demo_wrapper').offset().top - 100;
    //alert(targetPosition);
    $('html, body').animate({
      scrollTop: targetPosition
    }, 1500); 
  });

});


function submitForm(){
    var email = $("#subscriber_email").val().trim();
    var mailformat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
    if(email=='' || email.length==0 || !mailformat.test(email)){
      $(".subscriber-input").parent().closest('.input_field').addClass('input_error');
      $("#subscriber_error").html('email is required').css("display","block");
    } else {
          $(".subscriber-input").parent().closest('.input_field').addClass('input_success');
          $(".loader").css("display","block");
          $("#subscriber_error").html('email is required').css("display","none");
      $.ajax({
        url: 'subscriber.php',
        type: 'post',
        data: { "email": email},
        dataType  : 'json',
        success: function( data, textStatus, jQxhr ){
          $(".loader").css("display","none");
          if(data.success){
            $("#subscriber_error").css({"color":"#006400","display":"block"});
            $("#subscriber_email").val('');
          } else {
            $("#subscriber_error").css({"color":"#FF0000","display":"block"});
          }
          $("#subscriber_error").html(data.message);
          setTimeout(function(){
            $('#subscriber_error').css("display","none");
        }, 3000);

          //$('#response pre').html( JSON.stringify( data ) );
         },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
    
    }
 }