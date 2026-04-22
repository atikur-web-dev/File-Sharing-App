import { ApiSuccess } from "./apiSuccess.ts";

// Create Response
export class CreateResponse<T> extends ApiSuccess<T> {
  constructor(data?: T, message: string = "Resource created Successfully") {
    super(201, true, message, data);
  }
}

// Ok Response 
export class OkResponse<T> extends ApiSuccess<T> {
  constructor(data?: T, message: string = "Ok") {
    super(201, true, message, data);
  }
}