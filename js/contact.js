
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

  $("#subscriptionForm").validate({
    rules: {
        subscriber_organization: {
            required: !0,
            minlength: 2
        },
        address: {
            required: !0,
            minlength: 2
        },
        telephone_number: {
          required: !0,
          minlength: 10
        },
        administrator_details: {
          required: !0,
          minlength: 2
        },
        admin_email: {
            required: !0,
            email: !0
        },
        admin_phone: {
          required: !0,
          minlength: 10
        },
        no_of_participants: {
          required: !0,
          minlength: 1
        },
        implementation_package: {
          required: true
        }
    },
    messages: {
        subscriber_organization: {
            required: "Please enter subscriber organization",
            minlength: "your name must consist of at least 2 characters"
        },
        address: {
            required: "Please enter address",
            minlength: "your name must consist of at least 2 characters"
        },
        telephone_number: {
          required: "Please enter telephone number",
          minlength: "your name must consist of at least 10 characters"
       },
        administrator_details: {
            required: "Please enter administrator details",
            minlength: "your name must consist of at least 2 characters"
        },
        admin_email: {
            required: "Please enter your admin email"
        },
        admin_phone: {
          required: "Please enter admin phone",
          minlength: "your name must consist of at least 10 characters"
        },
        no_of_participants: {
          required: "Please enter no of participants",
          minlength: "your name must consist of at least 2 characters"
        },
        implementation_package: {
          required: "Please select an option"
        }
    },
    submitHandler: function (r) {
        $.ajax({
            type: "POST",
            url: "subscription.php",
            data: $('#subscriptionForm').serialize(),  
            beforeSend: function() {
              $('.submit_arrow_right').css("visibility","hidden");
              $('.submit_loader').css("display","inline");
            },
            success: function (r) {
                $('.submit_arrow_right').css("visibility","visible");
                $('.submit_loader').css("display","none");
                $("#success").fadeIn(), $("#subscriptionForm")[0].reset()
            },
            error: function () {
                $('.submit_arrow_right').css("visibility","visible");
                $('.submit_loader').css("display","none");
                $("#subscriptionForm").fadeTo("slow", .15, function () {
                    $("#error").fadeIn()
                })
            }
        })
    }
})
  
});