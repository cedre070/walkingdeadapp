(function(){

  "use strict";

  angular.module('appWalking', [])
          .controller('WalksCtrl', WalksCtrl);


      function WalksCtrl($scope, $http, $filter, $log){
        console.log('Scope chargée!');



        $http.get("datas/got.json").
        success(function(data, status) {
        	$scope.donnees = data;
          $log.info('Json Chargé !')
        })
        .error(function(data, status) {
        	document.getElementById("erreur").innerHTML = "Erreur lors de l'appel du json"
        });

        $scope.suppr = function(donnee){
                        console.log(donnee);
                       var position = $scope.donnees.indexOf(donnee);
                       console.log(position);
                        $scope.donnees.splice(position,1);
                       }















}//fermeture function
}());//fermeture module
