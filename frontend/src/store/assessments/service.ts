// import HttpRequest from "../../util/HttpRequest.ts"
// // import { User } from "../../util/types.ts";
// import {SERVER_URL} from "../../util/constant.ts"

// interface ServiceResponse {
//   status: number;
//   data: any;
//   code?: string;
// }

// export const generateCourses = async (id:any,data?: any): Promise<ServiceResponse> => {
//   return await HttpRequest.post(`${SERVER_URL}/courses/generate/${id}`,data);
// }; 
// export const getCoursesServices = async (id:string): Promise<ServiceResponse> => {
//   return await HttpRequest.get(`${SERVER_URL}/courses/${id}`);
// }; 
// export const getAssessmentServices = async (): Promise<ServiceResponse> => {
//   return await HttpRequest.get(`${SERVER_URL}/assessments`);
// }; 
// export const getSelectedAssessmentServices = async (id:string): Promise<ServiceResponse> => {
//   return await HttpRequest.get(`${SERVER_URL}/assessments/${id}`);
// }; 
// export const submitAssessment = async (query:any,data?: any): Promise<ServiceResponse> => {
//   return await HttpRequest.post(`${SERVER_URL}/assessments/${query}/submit`,data);
// }; 
// // export const updateUser = async(data: any,id:string,token?:string): Promise<ServiceResponse>=>{
// //   return await HttpRequest.update(`${SERVER_URL}/updateProfile/${id}`,data,token)
// // }

import HttpRequest from "../../util/HttpRequest.ts"
import store from "store";
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
export const getAssessmentServices = async (): Promise<ServiceResponse> => {
  return await HttpRequest.get(`${SERVER_URL}/assessments`);
}; 
export const getSelectedAssessmentServices = async (id:string): Promise<ServiceResponse> => {
  return await HttpRequest.get(`${SERVER_URL}/assessments/${id}`);
}; 
export const submitAssessment = async (assessmentId: string, data: any): Promise<ServiceResponse> => {
  const token = store.get("authToken");
  return await HttpRequest.post(`${SERVER_URL}/assessments/submit/${assessmentId}`, data, token);
}; 
export const getStudentAssessmentsServices = async () => {
  const token = store.get("authToken");
  return await HttpRequest.get(`${SERVER_URL}/my-assessments`, token);
};
// export const updateUser = async(data: any,id:string,token?:string): Promise<ServiceResponse>=>{
//   return await HttpRequest.update(`${SERVER_URL}/updateProfile/${id}`,data,token)
// }