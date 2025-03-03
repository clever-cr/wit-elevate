import HttpRequest from "../../util/HttpRequest.ts"
// import { User } from "../../util/types.ts";
import {SERVER_URL} from "../../util/constant.ts"

interface ServiceResponse {
  status: number;
  data: any;
  code?: string;
}

export const generateCourses = async (data: any): Promise<ServiceResponse> => {
  return await HttpRequest.post(`${SERVER_URL}/generateCourses`,data);
}; 

// export const updateUser = async(data: any,id:string,token?:string): Promise<ServiceResponse>=>{
//   return await HttpRequest.update(`${SERVER_URL}/updateProfile/${id}`,data,token)
// }