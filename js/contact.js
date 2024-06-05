
function validateEmail(e) {
  var r = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return r.test(e)
}
$(document).ready(function () {
  $("#contactForm").validate({
      rules: {
          first_name: {
              required: !0,
              minlength: 2
          },
          last_name: {
              required: !0,
              minlength: 2
          },
          business_name: {
            required: !0,
            minlength: 2
          },
          email: {
              required: !0,
              email: !0
          },
          phone: {
            required: !0,
            minlength: 10
          }
      },
      messages: {
          first_name: {
              required: "Please enter first name",
              minlength: "your name must consist of at least 2 characters"
          },
          last_name: {
              required: "Please enter last name",
              minlength: "your name must consist of at least 2 characters"
          },
          business_name: {
            required: "Please enter business name",
            minlength: "your name must consist of at least 2 characters"
         },
          phone: {
              required: "Please enter phone number",
              minlength: "your name must consist of at least 10 characters"
          },
          email: {
              required: "Please enter your email id"
          }
      },
      submitHandler: function (r) {
          $.ajax({
              type: "POST",
              url: "contact.php",
              data: $('#contactForm').serialize(),  
              beforeSend: function() {
                $('.submit_arrow_right').css("visibility","hidden");
                $('.submit_loader').css("display","inline");
              },
              success: function (r) {
                  $('.submit_arrow_right').css("visibility","visible");
                  $('.submit_loader').css("display","none");
                  $("#success").fadeIn(), $("#contactForm")[0].reset()
              },
              error: function () {
                  $('.submit_arrow_right').css("visibility","visible");
                  $('.submit_loader').css("display","none");
                  $("#contactForm").fadeTo("slow", .15, function () {
                      $("#error").fadeIn()
                  })
              }
          })
      }
  })

  $('.form_field input[type="checkbox"]').change(function() {
    var checkboxId = $(this).attr('id');
    var labelForCheckbox = $('label[for="' + checkboxId + '"]');
    
    if ($(this).is(':checked')) {
      labelForCheckbox.addClass('checked');
    } else {
      labelForCheckbox.removeClass('checked');
    }
  });
  
});