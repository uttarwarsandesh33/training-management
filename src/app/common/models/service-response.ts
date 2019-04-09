


export interface IServiceResponse<T extends any> {
    success(data?:T );
    fail(errorService);
    systemFailure(errorService);
}