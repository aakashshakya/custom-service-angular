var base_url = 'http://localhost:8080/';
myapp.service('RestMethodsService', function(Restangular) {
    Restangular.setBaseUrl(base_url);

    this.createStudent = function(data) {
        var students = Restangular.all('/formdata');
        var postInfo = students.post(data);
        return postInfo;
    }
});
