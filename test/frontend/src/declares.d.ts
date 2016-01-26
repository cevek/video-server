declare var YTReady:Promise<{}>;
declare var io:(url:string)=>Socket;

interface Socket {
    emit: (m:string, data:any, callback:(...args:any[])=>void)=>void;
    on: (m:string, data:any)=>void;
}
