$(document).ready(function() {


    /***************** Waypoints ******************/

    $('.wp1').waypoint(function() {
        $('.wp1').addClass('animated fadeInUp');
    }, {
        offset: '75%'
    });
    $('.wp2').waypoint(function() {
        $('.wp2').addClass('animated fadeInUp');
    }, {
        offset: '75%'
    });
    $('.wp3').waypoint(function() {
        $('.wp3').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });

    /***************** Initiate Flexslider ******************/
    $('.flexslider').flexslider({
        animation: "slide"
    });

    /***************** Initiate Fancybox ******************/

    $('.single_image').fancybox({
        padding: 4,
    });

    /***************** Tooltips ******************/
    $('[data-toggle="tooltip"]').tooltip();

    /***************** Nav Transformicon ******************/

    /* When user clicks the Icon */
    $('.nav-toggle').click(function() {
        $(this).toggleClass('active');
        $('.header-nav').toggleClass('open');
        event.preventDefault();
    });
    /* When user clicks a link */
    $('.header-nav li a').click(function() {
        $('.nav-toggle').toggleClass('active');
        $('.header-nav').toggleClass('open');

    });


    /* Enviar Correo */
    function validateEmail(sEmail) {
        var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        if (filter.test(sEmail)) {
            return true;
        } else {
            return false;
        }
    }

    function validaNombre() {
        if ($('#contacto_nombre').val() != '') {
            $("#form_nombre_warning").html('');
            $('#contacto_nombre').parent().removeClass('has-error').addClass('has-success');
            return true;
        } else {
            $("#form_nombre_warning").html('Este campo es obligatorio. Por favor revisa que no esté vacío.');
            $('#contacto_nombre').parent().removeClass('has-success').addClass('has-error');
            return false;
        }
    }
    $('#contacto_nombre').keyup(function() {
        validaNombre();
    });

    function validaMail() {
        var sEmail = $('#contacto_email').val();
        if (validateEmail(sEmail)) {
            $("#form_email_warning").html('');
            $('#contacto_email').parent().removeClass('has-error').addClass('has-success');
            return true;
        } else {
            $("#form_email_warning").html('Este campo es obligatorio. Por favor revisa que no esté vacío y tenga el formato correcto.');
            $('#contacto_email').parent().removeClass('has-success').addClass('has-error');
            return false;
        }
    }
    $('#contacto_email').keyup(function() {
        validaMail();
    });

    function validaMensaje() {
        if ($('#contacto_mensaje').val() != '') {
            $("#form_mensaje_warning").html('');
            $('#contacto_mensaje').parent().removeClass('has-error').addClass('has-success');
            return true;
        } else {
            $("#form_mensaje_warning").html('Este campo es obligatorio. Por favor revisa que no esté vacío.');
            $('#contacto_mensaje').parent().removeClass('has-success').addClass('has-error');
            return false;
        }
    }
    $('#contacto_mensaje').keyup(function() {
        validaMensaje();
    });

    $('#contacto_enviar').click(function() {
        if (validaNombre() && validaMail() && validaMensaje()) {
            enviarCorreo($("#contacto_nombre").val(), $("#contacto_email").val(), $("#contacto_mensaje").val());
        }
    });


    /***************** Header BG Scroll ******************/

    function enviarCorreo(cualNombre, cualRemitente, cualMensaje) {
        console.log('cualNombre', cualNombre);
        console.log('cualRemitente', cualRemitente);
        console.log('cualMensaje', cualMensaje);

        function onSuccess() {
            console.log('correo enviado!');
            $("#contacto_nombre").val('');
            $("#contacto_email").val('');
            $("#contacto_mensaje").val('');
            // $("#form_contacto_success").html('Tu mensaje ha sido enviado. Gracias!');
            swal({
                title: "Gracias!",
                text: "En breve nos pondremos en contacto contigo.",
                icon: "success",
                button: {
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "boton",
                    closeModal: true,
                }
            });
        }

        function onError(error) {
            console.log('no se pudo enviar el correo');
        }

        $.post('js/mail.php' + '?nombre=' + cualNombre + '&remitente=' + cualRemitente + '&mensaje=' + cualMensaje,
            onSuccess
        ).fail(onError);

        return false;
    }


    $(function() {
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();

            if (scroll >= 20) {
                $('section.navigation').addClass('fixed');
                $('header').css({
                    "border-bottom": "none",
                    "padding": "20px 0"
                });
                $('header .member-actions').css({
                    "top": "26px",
                });
                $('header .navicon').css({
                    "top": "34px",
                });
            } else {
                $('section.navigation').removeClass('fixed');
                $('header').css({
                    "border-bottom": "solid 1px rgba(255, 255, 255, 0.2)",
                    "padding": "30px 0"
                });
                $('header .member-actions').css({
                    "top": "41px",
                });
                $('header .navicon').css({
                    "top": "48px",
                });
            }
        });
    });
    /***************** Smooth Scrolling ******************/

    $(function() {

        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: (target.offset().top - 50)
                    }, 1000);
                    return false;
                }
            }
        });



    });

});
