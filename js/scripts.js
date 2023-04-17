$(document).ready(function() {


});


var $win = $(window);
var $stat = $('.wp');

$win.on('scroll', function() {
    var scrollTop = $win.scrollTop();

    $stat.each(function() {
        var $self = $(this);
        var prev = $self.offset();

        $self.css('opacity', '0');

        if ((scrollTop - prev.top) > -600) {
            if ($self.hasClass('wp1')) {
                $self.css('opacity', '1').addClass('animated fadeInUp');
            }
            if ($self.hasClass('wp2')) {
                $self.css('opacity', '1').addClass('animated fadeInLeft');
            }
            if ($self.hasClass('wp3')) {
                $self.css('opacity', '1').addClass('animated fadeInRight');
            }
        } else {
            // console.log('n', prev);
        }
    });

}).scroll();


function abrirLiga(cualLiga) {
    window.open(cualLiga, '_blank');
}

function mandarMail() {
    window.open('mailto:elrinconterapeutico013@gmail.com?subject=&body=');
}

function abrirWApp() {
    window.open('https://api.whatsapp.com/send?phone=%2B525538961489', '_blank');
}