import HttpRequest from "../../util/HttpRequest.ts"
// import { User } from "../../util/types.ts";
import {SERVER_URL} from "../../util/constant.ts"

interface ServiceResponse {
  status: number;
  data: any;
  code?: string;
}

export const generateCourses = async (id:any,data?: any): Promise<ServiceResponse> => {
  return await HttpRequest.post(`${SERVER_URL}/courses/generate/${id}`,data);
}; 
export const getCoursesServices = async (id:string): Promise<ServiceResponse> => {
  return await HttpRequest.get(`${SERVER_URL}/courses/${id}`);
}; 

// export const updateUser = async(data: any,id:string,token?:string): Promise<ServiceResponse>=>{
//   return await HttpRequest.update(`${SERVER_URL}/updateProfile/${id}`,data,token)
// }