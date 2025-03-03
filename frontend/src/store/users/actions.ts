import { toast } from "react-toastify";
import { userAction } from ".";
import { AppDispatch } from "..";
import { User } from "../../util/types";
import { loginServiceUser, updateUser } from "./services";

export const loginUserAction = (data: User) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userAction.setIsLoading(true));
      const res = await loginServiceUser(data);

      if (res?.status === 200) {
        dispatch(userAction.setData(res.data));
        dispatch(userAction.setIsLoading(false));
        toast.success("Login Successfully");
        return { type: true };
        
      }
      dispatch(userAction.setIsLoading(false));
    } catch (err) {
      console.error(err);
      dispatch(userAction.setIsLoading(false));
    }
  };
}; 

export const updateUserAction = (data:any,id:string,token?:string,) =>{
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(userAction.setIsLoading(true));
      const res = await updateUser(data,id,token);

      if (res?.status === 200) {
        dispatch(userAction.setUpdatedUser(res.data));
        dispatch(userAction.setIsLoading(false));
        toast.success("Profile updated Successfully");
        return { type: true };
        
      }
      dispatch(userAction.setIsLoading(false));
    } catch (err) {
      console.error(err);
      dispatch(userAction.setIsLoading(false));
    }
  };
}