$(document).ready(function(){
    $(".headerContent .signUp").click(function(){
        $("#signUpForm").toggle();
        $(".popup-overlay").css("display",'block');
    });
    $(".headerContent .signUp").click(function(){
        $("#popupOverlay").fadeIn();
        $("#signUpForm").fadeIn();
    });

    $("#popupOverlay").click(function(){
        $("#popupOverlay").fadeOut(); 
        $("#signUpForm").fadeOut(); 
    });
    $("#signUpForm #signUp").click(function(){
        var mDiv = $("#signUpForm");
        var firstName = mDiv.find("input[name='firstName']").val();
        var lastName = mDiv.find("input[name='lastName']").val();
        var email = mDiv.find("input[name='email']").val();
        var password = mDiv.find("input[name='password']").val();
        var confirmPassword = mDiv.find("input[name='confirmPassword']").val();
        var formData = { 
            action:"signUp",
            firstName :firstName,
            lastName :lastName,
            email :email,
            password :password
        }
        $.ajax({
            url: "/newWebsiteProject/process.php", // Backend PHP file
            type: "POST",
            data: formData,
            success: function (response) {
                console.log("✅ AJAX Success:", response);
                Swal.fire({
                    title: "Success!",
                    text: "Account Created",
                    icon: "success"
                  });
                console.log("Response:", response);// Debug respons
            },
            error: function (xhr) {
                console.log("Error: ", xhr.responseText); // Debug error response
            }
        });
    });
});