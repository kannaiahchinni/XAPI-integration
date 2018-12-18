(function () {

   function XAPI() {
       this.lrs;
       this.config= {
           'username':'',
           'password':'',
           'endpoint':'',
           allowFail:false
       };
       this.errorMessage;
   }

   XAPI.prototype.initialize = function(configObj) {
       var status = false;
       this.config = Object.assign(this.config, configObj);
       try {
           this.lrs = new TinCan.LRS(this.config);
;           status = true;
       } catch (e) {
            status = false;
            this.errorMessage = 'Failed to Setup LRS object '+ e;
       }
       return status;
   }

   XAPI.prototype.prepareStatement = function(actor) {
       var statement = {};
       statement.actor = actor;
       statement.verb = { 'id': 'http://adlnet.gov/expapi/verbs/experienced', 'display': { 'und': 'experienced'}};
       statement.object = { 'id': 'http://adlnet.gov/expapi/verbs/experienced', 'objectType':'Activity'};
       statement.target = { 'id': 'https://experienceapi.com/activities/sending-my-first-statement'};
       console.log(statement);
       return new TinCan.Statement(statement);
   }

   XAPI.prototype.saveStatement = function(statement) {  // async call
       var message;
        try {
            this.lrs.saveStatement(
                statement,
                {
                    callback:function(err,xhr) {
                        if(err !== null) {
                            if(xhr !== null ) {
                                message = 'Failed to save the statement:  '+ xhr.responseText +" ( "+ xhr.status + ")" ;
                                console.log(message);
                                return message;
                            }
                            message = 'failed to save the statement: '+ err;
                            console.log(message);
                            return message;
                        }
                        message = 'Statement Saved ';
                        console.log(message);
                        return message;
                    }
                }
                )
        }catch (e) {
            console.error(" Failed to save statement "+ e);
        }
   }

   window.XAPI = XAPI;

})();