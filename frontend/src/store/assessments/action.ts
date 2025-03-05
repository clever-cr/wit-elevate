// import { AppDispatch } from "..";
// import { assessmentAction } from "./index";
// import {
//   getAssessmentServices,
//   getSelectedAssessmentServices,
//   submitAssessment,
// } from "./service";

// export const getAssessmentsAction = () => {
//   return async (dispatch: AppDispatch) => {
//     try {
//       dispatch(assessmentAction.setIsLoading(true));
//       const res = await getAssessmentServices();

//       if (res?.status === 200) {
//         dispatch(assessmentAction.setAllAssessment(res.data));
//         dispatch(assessmentAction.setIsLoading(false));
//         return { type: true };
//       }
//       dispatch(assessmentAction.setIsLoading(false));
//     } catch (err) {
//       console.error(err);
//       dispatch(assessmentAction.setIsLoading(false));
//     }
//   };
// };
// export const getSelectedAssessmentAction = (id: string) => {
//   return async (dispatch: AppDispatch) => {
//     try {
//       dispatch(assessmentAction.setIsLoading(true));
//       const res = await getSelectedAssessmentServices(id);

//       if (res?.status === 200) {
//         dispatch(assessmentAction.setSelcectedAssessment(res.data));
//         dispatch(assessmentAction.setIsLoading(false));
//         return { type: true };
//       }
//       dispatch(assessmentAction.setIsLoading(false));
//     } catch (err) {
//       console.error(err);
//       dispatch(assessmentAction.setIsLoading(false));
//     }
//   };
// };
// export const submitAssessmentAction = (query: string, data?: any) => {
//   return async (dispatch: AppDispatch) => {
//     try {
//       dispatch(assessmentAction.setIsLoading(true));
//       const res = await submitAssessment(query, data);
//       console.log("ress*****", res);
//       if (res?.status === 200) {
//         dispatch(assessmentAction.setSubmitedAnswer(res.data));
//         dispatch(assessmentAction.setIsLoading(false));
//         return { type: true };
//       }
//       dispatch(assessmentAction.setIsLoading(false));
//     } catch (err) {
//       console.error(err);
//       dispatch(assessmentAction.setIsLoading(false));
//     }
//   };
// };

import { AppDispatch } from "..";
import { assessmentAction } from "./index";
import {
  getAssessmentServices,
  getSelectedAssessmentServices,
  submitAssessment,
  getStudentAssessmentsServices,
} from "./service";

export const getAssessmentsAction = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(assessmentAction.setIsLoading(true));
      const res = await getAssessmentServices();

      if (res?.status === 200) {
        dispatch(assessmentAction.setAllAssessment(res.data));
        dispatch(assessmentAction.setIsLoading(false));
        return { type: true, data: res.data };
      }
      dispatch(assessmentAction.setIsLoading(false));
      return { type: false };
    } catch (err) {
      console.error(err);
      dispatch(assessmentAction.setIsLoading(false));
      return { type: false };
    }
  };
};
export const getSelectedAssessmentAction = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(assessmentAction.setIsLoading(true));
      const res = await getSelectedAssessmentServices(id);
      console.log("Selected assessment service response:", res);

      if (res?.status === 200) {
        dispatch(assessmentAction.setSelcectedAssessment(res.data));
        dispatch(assessmentAction.setIsLoading(false));
        return { type: true, data: res.data };
      }
      dispatch(assessmentAction.setIsLoading(false));
      return { type: false, error: res?.error || "Failed to fetch assessment" };
    } catch (err) {
      console.error("Error fetching selected assessment:", err);
      dispatch(assessmentAction.setIsLoading(false));
      return { type: false, error: err?.response?.data?.error || "Failed to fetch assessment" };
    }
  };
};
export const submitAssessmentAction = (assessmentId: string, data: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(assessmentAction.setIsLoading(true));
      const res = await submitAssessment(assessmentId, data);
      console.log("Submit response:", res);
      
      if (res?.status === 200) {
        dispatch(assessmentAction.setSubmitedAnswer(res.data));
        dispatch(assessmentAction.setIsLoading(false));
        return { type: true };
      }
      dispatch(assessmentAction.setIsLoading(false));
      return { type: false };
    } catch (err) {
      console.error("Error submitting assessment:", err);
      dispatch(assessmentAction.setIsLoading(false));
      return { type: false, error: err?.response?.data?.error };
    }
  };
};
export const getStudentAssessmentsAction = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(assessmentAction.setIsLoading(true));
      const res = await getStudentAssessmentsServices();

      if (res?.status === 200) {
        dispatch(assessmentAction.setIsLoading(false));
        return { type: true, data: res.data };
      }
      dispatch(assessmentAction.setIsLoading(false));
    } catch (err) {
      console.error(err);
      dispatch(assessmentAction.setIsLoading(false));
    }
  };
};