/////////////////////////////////////////////////////////////////////////////////////////////
//////////*******************  Copyright uJL 2019.  ********************************/////////
/////////////////////////////////////////////////////////////////////////////////////////////

var config = {
    apiKey: "AIzaSyBcpJTlhT22rQPwXKq0PjA3CMxT7gutkEs",
    authDomain: "ujlbase.firebaseapp.com",
    databaseURL: "https://ujlbase.firebaseio.com",
    projectId: "ujlbase",
    storageBucket: "ujlbase.appspot.com",
    messagingSenderId: "572100351671",
    appId: "1:572100351671:web:e4ccb15f7783a565da9f32",
    measurementId: "G-XGVJBT18BD"
};
// var secret = 'fLsL824rAETWsoDveTUMn7xpyUwwBfzhJLKNuEg9';
var laUrlBase = "";

firebase.initializeApp(config);
var baseOk;
var elCliente;
var elProyecto;
var laKey = firebase.database().ref().child('posts').push().key;


var revisaConexion = function() {
    var connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", function(snap) {
        connected = false;
        $('#divBloqConexion').show();
        if (snap.val() === true) {
            connected = true;
            // console.log("connected", connected);
            $('#divBloqConexion').hide();
            return connected;
        }
    });
}


///////////////////////////////// location ///////////////////////////////////////

var laIP;
var laRegionName;
var laOrg;
var laLatitude;
var laLongitude;
var laTimezone;
var elZIP;
var elContinente;
var elPais;
var elPaisCodigo;
var laLocalidad;
var laCiudad;


// $.ajax({
//     url: 'http://ip-api.com/json',
//     success: function(data) {
//         // console.log('data', data);
//         // console.log('País', data.country);
//         // console.log('countryCode', data.countryCode);
//         // console.log('region', data.region);
//         // console.log('regionName', data.regionName);
//         // console.log('isp', data.isp);
//         // console.log('lat', data.lat);
//         // console.log('lon', data.lon);
//         // console.log('org', data.org);
//         // console.log('ip', data.query);
//         // console.log('timezone', data.timezone);
//         // console.log('zip', data.zip);

//         laIP = data.query;
//         laRegionName = data.regionName;
//         laOrg = data.org;
//         laLat = data.lat;
//         laLon = data.lon;
//         laTimezone = data.timezone;
//         elZIP = data.zip;

//         // console.log('-----------');
//     }
// });

$.ajax({
    url: 'https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=es',
    success: function(data_details) {
        // console.log('data', data_details);
        // console.log('continent', data_details.continent);
        // console.log('countryName', data_details.countryName);
        // console.log('countryCode', data_details.countryCode);
        // console.log('locality', data_details.locality);

        laLatitude = data_details.latitude;
        laLongitude = data_details.longitude;
        elContinente = data_details.continent;
        elPais = data_details.countryName;
        elPaisCodigo = data_details.countryCode;
        laLocalidad = data_details.locality;
        laCiudad = data_details.city;


        // console.log('-----------');
    }
});
///////////////////////////////// location ///////////////////////////////////////



///////////////////////////////// fechas ///////////////////////////////////////

function obtenerFecha() {
    moment.locale('es');
    var laFecha = moment().format();
    // console.log('laFecha', laFecha);

    //    var tiempo = moment().format('DDMMYYHHmmss');
    // console.log('tiempo', tiempo);

    return laFecha;
}
//obtenerFecha();

function obtenerFechaInicial() {
    moment.locale('es');
    laFechaInicial = moment().format();
    // console.log('laFechaInicial', laFechaInicial);

    return laFechaInicial;
}
//obtenerFechaInicial();

function obtenerDuracion(cualFecha) {
    moment.locale('es');
    // laFechaFinal = moment().format();
    laDuracion = moment(cualFecha).fromNow(true);
    // console.log('laDuracion', laDuracion);

    return laDuracion;
}
//obtenerDuracion();


laFecha = obtenerFecha();
laFechaInicial = obtenerFechaInicial();
laFechaFinal = moment().format('LL');
//
// console.log('laFecha', laFecha);
// console.log('laFechaInicial', laFechaInicial);
// console.log('laFechaFinal', laFechaFinal);


function obtenerFechaFormateada() {
    var laFechaFormateada = moment().locale('es').format('DD-MM-YYYY');
    // console.log('laFechaFormateada', laFechaFormateada);

    return laFechaFormateada;
};

function obtenerFechaFormateadaEsp(cualFecha) {
    var laFechaFormateadaEsp = moment(cualFecha).format('DD-MM-YYYY');
    // console.log('laFechaFormateadaEsp', cualFecha);

    return laFechaFormateadaEsp;
};



///////////////////////////////// fechas ///////////////////////////////////////


function login() {

    if (revisaConexion) {
        firebase.auth().signInAnonymously().then(function(result) {
            InitiateSpeedDetection();
        });
    }

    // firebase.auth().signInWithEmailAndPassword(eml, psw).then(function(result) {
    //     // //console.log("login");
    //     // //console.log(result);
    //     var user = firebase.auth().currentUser;
    //     if (user != null) {
    //         // registraIniciado();
    //         InitiateSpeedDetection();
    //     }
    // });

}


function registraIniciado(speedMbps) {
    if (!speedMbps) {
        speedMbps = 'no';
    }
    // console.log('registraIniciado', speedMbps);

    var onComplete = function(error) {
        if (error) {
            console.log('Ocurrió un error en la sincronización.');
        } else {
            console.log('Sincronización realizada.');
        }
    };

    var nuevoData = {};
    var elRefIniciado = laUrlBase + '/' + elCliente + '/' + laKey;
    // console.log('elRefIniciado: ', elRefIniciado);
    if (elCliente != undefined) {
        if (revisaConexion) {

            firebase.database().ref(elRefIniciado).once('value').then(function(snapshot) {
                // console.log('snapshot.val()', snapshot.val());

                var laFecha_ini = snapshot.child('Fecha').val();
                var laFechaIni;
                // console.log('laFecha_ini', laFecha_ini);
                if (laFecha_ini != null && laFecha_ini != undefined && laFecha_ini != '') {
                    laFechaIni = laFecha_ini;
                } else {
                    laFechaIni = laFechaInicial;
                }
                // console.log('laFechaIni', laFechaIni);

                nuevoData = {
                    'Activo': true,
                    // 'Duracion': ' ',
                    // 'Fecha_fin': ' ',
                    'Fecha': laFechaIni,
                    // 'Nombre': 'Anónimo',
                    // 'laIP': laIP,
                    // 'laRegionName': laRegionName,
                    // 'laOrg': laOrg,
                    'laLatitud': laLatitude,
                    'laLongitud': laLongitude,
                    // 'laTimezone': laTimezone,
                    // 'elZIP': elZIP,
                    'elContinente': elContinente,
                    'Pais': elPais,
                    'elPaisCodigo': elPaisCodigo,
                    'laLocalidad': elPaisCodigo,
                    'laCiudad': laCiudad,
                    'Navegador': {
                        'navigator_userAgent': navigator.userAgent,
                        'browserName': browserName,
                        'fullVersion': fullVersion,
                        'navigator_product': navigator.product,
                        'navigator_language': navigator.language,
                        'navigator_onLine': navigator.onLine,
                        'navigator_platform': navigator.platform,
                        'navigator_onLine': navigator.onLine,
                        'window_screen_width': window.screen.width,
                        'window_screen_height': window.screen.height,
                        'document_documentElement_clientWidth': document.documentElement.clientWidth,
                        'document_documentElement_clientHeight': document.documentElement.clientHeight,
                        'window_screen_colorDepth': window.screen.colorDepth,
                        'document_referrer': document.referrer,
                        'document_domain': document.domain,
                        'document_URL': document.URL,
                        'velocidad_de_red': speedMbps + ' Mbps'
                    }
                }

                firebase.database().ref(elRefIniciado).update(nuevoData, onComplete);

            });
        }
    }
}


function registraDato(param, value) {
    // console.log('registraDato', param, ' y ', value);

    var paramConv = param.replace(/\./g, '_');
    // console.log('paramConv', paramConv);

    var postData = '{"' + paramConv + '":"' + value + '"}';
    var postDataConv = JSON.parse(postData);
    // console.log('postDataConv', postDataConv);


    var onComplete = function(error) {
        if (error) {
            console.log('Ocurrió un error en la sincronización.');
        } else {
            console.log('Sincronización realizada.');
        }
    }

    if (elCliente != undefined) {
        if (revisaConexion) {
            firebase.database().ref(laUrlBase + '/' + elCliente + '/' + laKey).update(
                postDataConv, onComplete);
        }
    }

}



function registraCompleto() {
    console.log('registraCompleto');

    var nuevoData = {};

    var onComplete = function(error) {
        if (error) {
            console.log('Ocurrió un error en la sincronización.');
        } else {
            console.log('Sincronización realizada.');
        }
    };

    if (elCliente != undefined) {
        if (revisaConexion) {

            var elRefRevisado = laUrlBase + '/' + elCliente + '/' + laKey;
            console.log('elRefRevisado: ', elRefRevisado);

            firebase.database().ref(elRefRevisado).once('value').then(function(snapshot) {
                console.log('snapshot.val() elRefRevisado', snapshot.val());

                var laFechaHoy = obtenerFecha();
                // console.log('laFechaHoy', laFechaHoy);
                // var laFecha_ini = snapshot.child('Fecha').val();
                // console.log('laFecha_ini', laFecha_ini);
                // var laDuracion = obtenerDuracion(laFecha_ini);
                // console.log('laDuracion', laDuracion);

                nuevoData = {
                    'Activo': false,
                    'Fecha': laFechaHoy
                }

                firebase.database().ref(elRefRevisado).update(nuevoData, onComplete);

            });
        }
    }
}


function inicia_uJLAPI() {
    login();
}


function guardaSpd(speedMbps) {
    // console.log(speedMbps, 'Mbps');
    // registraDato('Velocidad de red', '' + speedMbps + 'Mbps')
    if (elCliente != undefined) {
        registraIniciado(speedMbps);
    }
}


$(document).ready(function() {

    $.get("../manifest.json", {}, function(json) {
        // console.log(xml);
        var cliente = json.name;
        var proyecto = json.short_name;

        elCliente = cliente.replace(/[áéíóúñ@\.]/g, '_');
        elProyecto = proyecto.replace(/[áéíóúñ@\.]/g, '_');

        // console.log("-------------------- json", elCliente, ' y ', elProyecto);
    });

});



$(window).on("unload", function() {
    // console.log('unload body');

    // registraCompleto();
});