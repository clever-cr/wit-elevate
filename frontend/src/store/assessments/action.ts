import { AppDispatch } from "..";
import { assessmentAction } from "./index";
import {
  getAssessmentServices,
  getSelectedAssessmentServices,
  submitAssessment,
} from "./service";

export const getAssessmentsAction = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(assessmentAction.setIsLoading(true));
      const res = await getAssessmentServices();

      if (res?.status === 200) {
        dispatch(assessmentAction.setAllAssessment(res.data));
        dispatch(assessmentAction.setIsLoading(false));
        return { type: true };
      }
      dispatch(assessmentAction.setIsLoading(false));
    } catch (err) {
      console.error(err);
      dispatch(assessmentAction.setIsLoading(false));
    }
  };
};
export const getSelectedAssessmentAction = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(assessmentAction.setIsLoading(true));
      const res = await getSelectedAssessmentServices(id);

      if (res?.status === 200) {
        dispatch(assessmentAction.setSelcectedAssessment(res.data));
        dispatch(assessmentAction.setIsLoading(false));
        return { type: true };
      }
      dispatch(assessmentAction.setIsLoading(false));
    } catch (err) {
      console.error(err);
      dispatch(assessmentAction.setIsLoading(false));
    }
  };
};
export const submitAssessmentAction = (query: string, data?: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(assessmentAction.setIsLoading(true));
      const res = await submitAssessment(query, data);
      console.log("ress*****", res);
      if (res?.status === 200) {
        dispatch(assessmentAction.setSubmitedAnswer(res.data));
        dispatch(assessmentAction.setIsLoading(false));
        return { type: true };
      }
      dispatch(assessmentAction.setIsLoading(false));
    } catch (err) {
      console.error(err);
      dispatch(assessmentAction.setIsLoading(false));
    }
  };
};
