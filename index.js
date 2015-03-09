if (Meteor.isClient) {
  // counter starts at 0
  angular.module('app',['angular-meteor']);

  angular.module('app').config(loginCloakConfig);

  loginCloakConfig.$inject = ['$provide'];

  function loginCloakConfig($provide) {
    // adapt ng-cloak to wait for auth before it does its magic
    $provide.decorator('ngCloakDirective', extendNgCloakDirective);
  }

  extendNgCloakDirective.$inject = ['$delegate', '$rootScope', '$timeout'];
  
  function extendNgCloakDirective($delegate, $rootScope, $timeout){
    var directive = $delegate[0];
      // make a copy of the old directive
    var _compile = directive.compile;
    directive.compile = function(element, attr) {
      $rootScope.currentUserPromise.then(function(){
        $timeout(function(){_compile.call(directive, element, attr);}, 2000);   // wait a couple seconds to show it's working
      });
    };
    // return the modified directive
    return $delegate;
  }
}