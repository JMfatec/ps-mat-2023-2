export default class HttpError extends Error{

    constructor(status, message){
        super(message)
        this.name = 'httpError'
        this.status = Number(status)
    }
}