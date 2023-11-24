import axios from "axios";
import data from "../components/data/festivals";
import { formData } from "./types";
export async function allEvents(limit?: number) {
  const url = `${import.meta.env.VITE_URL}/allevents?limit=${limit}`;
  console.log("url", url);

  try {
    const data = await axios.get(url);
    console.log("data", data);
    return data.data;
  } catch (error) {
    console.log("something wrong ...");
  }
}

export async function allBlogs(limit?: number) {
  const url = `${import.meta.env.VITE_URL}/allblogs?limit=${limit}`;
  console.log("blogs", url);
  try {
    const data = await axios.get(url);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function logIn(formdata: formData) {
  const url = `${import.meta.env.VITE_URL}/signIn`;
  try {
    const data = await axios.post(url, formdata);
    return data.data;
  } catch (error) {
    console.log("....erorr");
    console.log(error);
  }
}

export async function signUp(formdata: formData) {
  const url = `${import.meta.env.VITE_URL}/signUp`;
  try {
    const data = await axios.post(url, formdata);
    console.log("dataaaa=====", data);
    return data.data;
  } catch (error) {
    console.log("..failed to login");
    console.log(error);
  }
}
