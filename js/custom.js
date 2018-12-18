(function () {

    angular.module('xapi-module',[]).controller('xapiController', function($scope,$log) {

        var self = this;
        self.user = {
            'firstName':'', 'lastName':'', 'email': ''
        };
        self.actor = {
            'account': {
                'homePage': 'https://myprofile.com/',
                'name': ''
            },
            'name': '',
            'objectType': 'Agent'
        };

        self.name = 'Karunakar Medamoni';
        self.config = {
            'username': '',
            'password': '',
            'endpoint': ''
        };

        self.getConfigObject = function(username, password, endPoint) {
            var configObject = Object.assign({}, self.config);
            configObject.username = username;
            configObject.password = password;
            configObject.endpoint = endPoint;
            return configObject;
        };

        self.prepareStatement = function() {
            self.actor.name = self.user.firstName+ ' ' + self.user.lastName;
            self.actor.account.name = self.user.email;
            self.actor.homePage = self.actor.homePage+ self.user.firstName+'.'+self.user.lastName;
        }

        self.send = function(type) {
            self.prepareStatement();
           if(type === 'll') {
               self.learningLockerApi.saveStatement(self.learningLockerApi.prepareStatement(self.actor));
           }else if(type === 'sc') {
               self.scormLockerApi.saveStatement(self.scormLockerApi.prepareStatement(self.actor));
           }else {
               self.watershedApi.saveStatement(self.watershedApi.prepareStatement(self.actor));
           }
        };

        self.initalize = function() {

            self.learningLockerConfig = self.getConfigObject(
                '9ced4fd1e00882f0438b7211af81343de9bdf58b',
                'db96d405f4dc6b62c63e7a4076dbcdda9696b6b6',
                'https://saas.learninglocker.net/data/xAPI'
            );

            self.scormConfig = self.getConfigObject(
                'QtmaJ9YLpOR2odJF8Wk',
                'a-L6q-44fT-Nfp_K4JQ',
                'https://cloud.scorm.com/tc/14J462F4I9/'
            );

            self.watershedConfig = self.getConfigObject(
                'd51b99f28e690e',
                'e65f057b83e0ff',
                'https://sandbox.watershedlrs.com/api/organizations/6734/lrs/'
            );

            self.learningLockerApi = new XAPI();
            self.learningLockerApi.initialize(self.learningLockerConfig);

            self.scormLockerApi = new XAPI();
            self.scormLockerApi.initialize(self.scormConfig);

            self.watershedApi = new XAPI();
            self.watershedApi.initialize(self.watershedConfig);
        };
        self.initalize();
    })
})();