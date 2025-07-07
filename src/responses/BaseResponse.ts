class BaseResponse {
  timeStamp: string;
  statusCode: number;
  httpStatus: string;
  message: string;
  data: any;

  constructor(sc : number, hs: string, msg: string, dta: any){
    this.timeStamp = new Date().toLocaleString();
    this.statusCode = sc;
    this.httpStatus = hs;
    this.message = msg;
    this.data = dta;
  }
}

export default BaseResponse;