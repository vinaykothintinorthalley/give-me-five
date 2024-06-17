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

 // JavaScript to handle the copy functionality
 document.getElementById('copyButton').addEventListener('click', function() {
  // Create a temporary textarea element
  var tempInput = document.createElement('textarea');
  tempInput.value = document.getElementById('textToCopy').innerText;
  document.body.appendChild(tempInput);

  // Select the text field
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  document.execCommand('copy');

  // Remove the temporary textarea
  document.body.removeChild(tempInput);

  // Optional: Alert the copied text
  //alert('Copied the text: ' + tempInput.value);
});

// JavaScript to handle LinkedIn share functionality
document.getElementById('linkedinShareButton').addEventListener('click', function(event) {
  event.preventDefault();
  
  const urlToShare = encodeURIComponent(window.location.href);
  
  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${urlToShare}`;
  
  window.open(shareUrl, 'linkedinShareWindow', 'height=450,width=550,top=' + (screen.height / 2 - 225) + ',left=' + (screen.width / 2 - 275) + ',toolbar=0,location=0,menubar=0,directories=0,scrollbars=0');
});

// JavaScript to handle the Facebook share functionality
document.getElementById('fbshareButton').addEventListener('click', function() {
  // Use the Facebook share dialog to share the current page
  FB.ui({
      method: 'share',
      href: window.location.href
  }, function(response){});
});