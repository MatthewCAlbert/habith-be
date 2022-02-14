import express from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

type ApiResponse = {
  statusCode?: number;
  message?: string;
  data?: any;
  success?: any;
}

export const sendResponse = (res: express.Response, data: ApiResponse)=>{
    const statusCode = data?.statusCode || StatusCodes.OK;
    const message = data?.message || getReasonPhrase(statusCode);
    const success = data['success'] !== undefined ? data?.success : true;

    res.status(statusCode).json({
        success: success,
        message: message,
        data: data?.data
    })
}