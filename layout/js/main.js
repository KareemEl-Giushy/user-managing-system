$(document).ready(function () {
    var forms  = document.querySelectorAll("div.wrapper");
    console.log();
    /* Forms Buttons */
    $("#register-btn").on('click', function () {
        // console.log($("div.row.wrapper")[0]);
        forms[0].style.display = "none";
        forms[1].style.display = "flex";
        forms[2].style.display = "none";
    });
    $("#registerback, #resetback").click(function () {
        // console.log($("div.row.wrapper")[0]);
        // console.log('hello this is Back Button');
        forms[2].style.display = "none";
        forms[1].style.display = "none";
        forms[0].style.display = "flex";
    });
    $("#forget-pass").on('click', function () {
        // console.log($("div.row.wrapper")[0]);
        forms[0].style.display = "none";
        forms[1].style.display = "none";
        forms[2].style.display = "flex";
    });

    
    /* ====== Register Form ====== */
    /*  form = $('#register-form'),
        firstName = $('#register-form #first-name'),
        lastName = $('#register-form #last-name'),
        email = $('#register-form #remail'),
        password = $('#register-form #rpassword'),
        password = $('#register-form #re-password');*/
    
     // Form Validation
    function formValidationText(selector) {
            if(!selector.value == "" || !selector.value == null) {
                 // valid
                selector.value = selector.value.trim();
                if(selector.checkValidity()) {
                    //valid
                    // console.log(selector.value);
                    selector.classList.add('is-valid');
                    selector.classList.remove('is-invalid');
                    return true;
                }else {
                    selector.classList.add('is-invalid');
                    selector.classList.remove('is-valid');
                }
            
            }else {
                selector.classList.add('is-invalid');
                selector.classList.remove('is-valid');
            }

    }
    function formValidationPass(selector) {
        if(!selector.value == "" || !selector.value == null) {
            //valid
            if(selector.value.length >= 7){
                // valid
                if(selector.checkValidity()) {
                    //valid
                    selector.classList.add('is-valid');
                    selector.classList.remove('is-invalid');
                    return true;
                }else {
                    // bad input
                    selector.classList.add('is-invalid');
                    selector.classList.remove('is-valid');
                }
            }else {
                // bad input
                selector.classList.add('is-invalid');
                selector.classList.remove('is-valid');
            }
        }else {
            // bad input
            selector.classList.add('is-invalid');
            selector.classList.remove('is-valid');


         }
    }
    function repassf(selector) {
        if(selector.value == $('#rpassword').val() && selector.value != ""){
            // valid
            selector.classList.add('is-valid');
            selector.classList.remove('is-invalid');
            return true;
        }else {
            // bad input
            selector.classList.add('is-invalid');
            selector.classList.remove('is-valid');
            return false;
        }
    }

    $('#first-name, #last-name, #remail').keyup(function () {
        formValidationText(this);
    });
   
    $('#rpassword').keyup(function () {
        formValidationPass(this);
     });
    $('#re-password').keyup(function () {
        repassf(this);
     });

    $('#register-form input[type="submit"]').click(function (e) {
        e.preventDefault();
        var isfirst = formValidationText(document.getElementById('first-name'));
        var islast = formValidationText(document.getElementById('last-name'));
        var isemail = formValidationText(document.getElementById('remail'));
        var pass = formValidationPass(document.getElementById('rpassword'));
        var repass = repassf(document.getElementById('re-password'));
        if(isfirst == true && islast == true && isemail == true && pass == true && repass == true) {
            $("#f-msg").css('display', "none");
            console.log('clicked');
            $.ajax({
                method: 'POST',
                url: "core/objects/index.object.php",
                async: true,
                data: {
                    'first-name': $("#first-name").val(),
                    'last-name': $("#last-name").val(),
                    'email': $("#remail").val(),
                    'password': $("#rpassword").val(),
                    're-password': $("#re-password").val(),
                    "action": "register",
                },
                success: function (rt, rs, xhr) {
                   console.log(rt);
                   
                   if(rt == "") {
                        $("#s-msg").css('display', 'block');
                        forms[2].style.display = "none";
                        forms[1].style.display = "none";
                        forms[0].style.display = "flex";
                        
                        // another way:-
                        // window.location = 'index.html';
                    }else {
                        $('#msg-box').append(rt);
                    }
                },
                error: function(xhr, rs, rt){
                    console.log(rs);
                },
            });
        }else {
         
            $("#f-msg").css('display', "block");
        }
    });
   /* ====== Login Form ====== */
    /*
    var loginForm = $("#login-form"),
        lEmail = $("#email"),
        lPass = $("#password"); */
        $("#email").on('keyup', function() {
            formValidationText(this);
        });
        $("#password").keyup(function() {
            formValidationText(this);
        });
        $("#login-form input[type='submit']").click(function (e) {
            e.preventDefault();
            var email = formValidationText(document.getElementById("email")); 
            var pass = formValidationText(document.getElementById("password"));
            if(email == true && pass == true) {
                $("#f-msg-login").css("display", "none");
                $.ajax({
                    method: "POST",
                    url: "core/objects/index.object.php",
                    async: true,
                    data: $("#login-form").serialize() + "&action=login",
                    /*data: {
                        email: $("#email").val(),
                        password: $("#password").val(),
                        action: "login",
                    },*/
                    success: function (rt, rs, xhr) {
                        console.log(rs);
                        console.log(rt);
                        if(rt == "") {
                            window.location = 'home.php';
                        }else {
                            $("#msg-box-login").append(rt);
                            $('#password').val('');
                        }
                    },
                    error: function (xhr, rs, rt) {
                      console.log(rs);  
                    },
                });
            }else {
                $("#f-msg-login").css("display", "block");
            }
        });
     /* ====== ResetPassword Form ====== */
        /* var rpform = $('#reset-form'),
               rpemail = $('#cemail'); */
        
        $('#cemail').keyup(function () {
            formValidationText(this);
        });
        
        $("#reset-form button[type='submit']").click(function (e) {
            e.preventDefault();
            var email = formValidationText(document.getElementById('cemail'));
            if(email) {
                $("#reset-form button[type='submit']").attr('disabled', 'disabled').empty().append('<i class="fas fa-spinner fa-spin"></i>' + ' Please Wait ...');
            
                $.ajax({
                    method: 'POST',
                    url: 'core/objects/index.object.php',
                    async: true,
                    data: $("#reset-form").serialize() + '&action=resetpass',
                    success: function (rt, rs, xhr) {
                        console.log(rs);
                        console.log(rt);

                        $('#msg-box-r').append(rt);
                        $('#cemail').val('');
                        $("#reset-form button[type='submit']").removeAttr('disabled').empty().append('Send Email');
                    },
                    error: function (xhr, rs, rt) {
                        // console.log(rt);
                        // console.log(rs);
                        // console.log(xhr);
                    }
                });
            }
            
        });
    // End Document Ready
});