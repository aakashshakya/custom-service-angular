var myapp = angular.module("appModule", ['ui.router'])

myapp.factory("FormService", function(){
    return service = {
        getFormData: function (pathById) {
            var testForm = document.getElementById(pathById);
            var formData = new FormData(testForm);
            return formData;
        },
        createFormObject: function(keys, values){
            var object = {};
            for(var key of keys){
                for(var value of values){
                    if(value != "on") {
                        object[key] = value;
                        break;
                    }else{
                        continue;
                    }
                }
            }
            return object;
        }
    }
});

myapp.config(function($stateProvider) {
    $stateProvider
        .state("add",{
        url:"/add",
        templateUrl:"Template/form.html",
        controller:"addController"
    })
})
.controller('addController',['FormService','$scope', '$http', function(FormService, $scope, $http){
        $scope.student = {};
        $scope.add = function() {
        var formData = FormService.getFormData("student-form");

        var student = FormService.createFormObject(formData.keys(), formData.values());
        $http({
            method: "POST",
            url: "http://localhost:8080/formdata",
            data: student
        }).then(function success(response){
            console.log(response)
        });
    }

    $scope.resetForm = function(studentForm){
        $scope.student = {};
        studentForm.$setPristine();
        studentForm.$setUntouched();
    }

}]);