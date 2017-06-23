'use strict';

klikin.directive("ngMap", ["$timeout", function ($timeout) 
{
    return {
    	restrict: 'E',
    	link: function($scope, element, attrs) 
    	{
            var _self = this;
            

            $scope.loadGoogleMapsApi = function(){
                if(_self.loaded == undefined || !_self.loaded){
                    _self.loaded = false
                    var script = document.createElement("script");
                    script.type = "text/javascript";
                    script.onload=function(){
                        //console.log("loaded map!")
                        _self.loaded = true;
                        $scope.initMap(attrs);
                    };
                    
                    document.getElementsByTagName("head")[0].appendChild(script);
                    script.src = "https://maps.googleapis.com/maps/api/js?key="+attrs.apikey;
                }else{
                    $scope.initMap(attrs);
                }
            }

            $scope.initMap = function(config){
                // set config
                var configuration={};
                Object.keys(config).map(function(key, index) {
                    // guardo la configuración en la directiva
                    if(typeof config[key] != "object"){
                        if(key == "lat" || key == "lng"){
                          configuration[key] = parseFloat(config[key]);
                        }else{
                          configuration[key] = config[key];
                        }
                    }
                });

                _self.config = configuration;
                
                _self.mapa = new google.maps.Map(document.getElementById('mapa'), {
                    center: { lat:  _self.config.lat, lng: _self.config.lng},
                    zoom: 16
                });

                google.maps.event.addListenerOnce(_self.mapa, 'tilesloaded', function(){
                    $scope.mapLoaded();
                });
            }

            $scope.mapLoaded = function(){
                $timeout(function(){
                    document.querySelector("ng-map").classList.add("loaded")
                    $timeout(function(){
                    $scope.drawMarker();
                        //_self.mapa.panTo(_self.mapa.center);
                    },1000);
                },500)
            }

            $scope.drawMarker = function(){
              var url = './images/marker.png' ;
              var image = {
                  url:url,
                  size: new google.maps.Size(40, 40),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(40/2, 40/2)
              };

              var marker = new google.maps.Marker({
                  position: { lat: _self.mapa.center.lat(), lng: _self.mapa.center.lng() },
                  map: _self.mapa,
                  icon: image
              });
            }
            

            // carga la api
            $scope.loadGoogleMapsApi();
        }
    };
}]);




