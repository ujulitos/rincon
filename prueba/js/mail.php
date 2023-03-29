<?php

$elNombre = $_GET["nombre"];
$elRemitente = $_GET["remitente"];
$elAsunto = $elNombre . " ha enviado un nuevo correo";
$elMensaje = $_GET["mensaje"];
$elDestino = "info@focuslearning.mx";

// $elMensaje = "<head>";
// $elMensaje .= "<style>html, body { font-family:Arial,sans-serif; font-size:16px; }</style>";
// $elMensaje .= "</head>";
// $elMensaje .= "<html><body>";
// $elMensaje .= $elRemitente;
// $elMensaje .= "<br><br> y <br><br>";
// $elMensaje .= $elMensajee;
// $elMensaje .= "</body></html>";


if (isset($elRemitente) && isset($elMensaje)) {

    $header = "From:".$elRemitente."\nReply-To:".$elRemitente."\n";
	$header .= "X-Mailer:PHP/".phpversion()."\n";
	$header .= "MIME-Version: 1.0\r\n";
	$header .= "Content-Type: text/html; charset=UTF-8\r\n";
	mail($elDestino, $elAsunto, $elMensaje, $header);
    // echo "el mensaje se envió a: " . $elDestino."\n";
    // echo "y el mensaje es: " . $elMensaje;
}

?>
