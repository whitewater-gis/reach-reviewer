angular.module('reach-reviewer', ['esri.map'])

  .controller('AppController', function(){
    this.invalid_message = 'None yet!';
  })

  .controller('InvalidController', ['$http', function($http){

    // url
    var getIdsUrl = 'http://services.arcgis.com/2zRtyrQ6q4mGrLJK/arcgis/rest/services/reach_review/FeatureServer/5/query?' +
      'where=1%3D1' +
      '&outFields=name_river, name_section, reach_id, ' +
      '&orderByFields=name_river' +
      '&f=json' +
      '&token=';

    // reference to this to expose inside inner scope
    var invalid = this;

    // initialize empty array for the reach id's and the actual reach objects
    invalid.reaches = [];

    // make rest call to get list of invalid reach id's
    $http.get(getIdsUrl).success(function(data){

      // extract the attributes for each feature and append into list
      for (var i = 0; i < data.features.length; i++){
        invalid.reaches.push(data.features[i].attributes);
      }

    });


  }])

  .controller('MapController', function($scope, esriLoader, esriRegistry) {
      $scope.map = {
        center: {
          lng: -122.6819,
          lat: 45.5200
        },
        zoom: 13
      };
      $scope.goToBookmark = function(bookmark) {
        esriRegistry.get('myMap').then(function(map) {
          esriLoader('esri/geometry/Extent').then(function(Extent) {
            var extent = new Extent(bookmark.extent);
            map.setExtent(extent);
          });
        });
      };
    });
