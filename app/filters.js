'use strict';

klikin.filter('capitalize', [function() {
  return function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
}]);


klikin.filter('prettyurl', function() {
  return function(url) {

      /* Elimino caracteres no deseados, solo acepta alphnumérico y espacio */
      var prettyUrl = url.replace(/[^A-ZÑÁÉÍÓÚa-zñáéíóú'!¡¿?()/&%$€@º*+.:;0-9 ]/g,'');

  
      /* Reemplazo si hay varios espacios por error en redacción con uno solo */
      prettyUrl = prettyUrl.replace(/\s{2,}/g,' ');
  
      /* Cambio el espacio por un guión */
      prettyUrl = prettyUrl.replace(/\s/g, "-");
  
      return prettyUrl.toLowerCase();
  }
});



