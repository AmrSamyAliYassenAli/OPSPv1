import { v4 as uuidv4 } from 'uuid';

class ResponseBuilder{
    constructor(success,result,errorMessage){
        this.RequestID = uuidv4();
        this.success = success;
        this.data = result;
        this.message = errorMessage;
    }

    static Create(success,result,errorMessage){
        return new ResponseBuilder(success,result,errorMessage);
    }
}

module.exports = ResponseBuilder;