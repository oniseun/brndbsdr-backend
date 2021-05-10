export interface AppResponse {

    success : boolean,
    message? : string,
    data: object,
    errors: Array<any>

}