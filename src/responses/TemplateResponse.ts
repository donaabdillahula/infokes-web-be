import HttpStatus from "../const/conres";
import BaseResponse from "./BaseResponse";

export const RESP = {
  OK: (data: any) => {
    return new BaseResponse(
      HttpStatus.OK.code,
      HttpStatus.OK.status,
      "SUCCESS",
      data
    );
  },
  BAD_REQUEST: (errMessage: string, data: any) => {
    return new BaseResponse(
      HttpStatus.BAD_REQUEST.code,
      HttpStatus.BAD_REQUEST.status,
      errMessage,
      data
    );
  },
  NOT_FOUND: (errMessage: string, data: any) => {
    return new BaseResponse(
      HttpStatus.NOT_FOUND.code,
      HttpStatus.NOT_FOUND.status,
      errMessage,
      data
    );
  },
  INTERNAL_SERVER_ERROR: (errMessage: string, data: any) => {
    return new BaseResponse(
      HttpStatus.INTERNAL_SERVER_ERROR.code,
      HttpStatus.INTERNAL_SERVER_ERROR.status,
      errMessage,
      data
    );
  },
};
