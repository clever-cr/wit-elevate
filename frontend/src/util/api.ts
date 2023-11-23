import axios from "axios";
import data from "../components/data/festivals";
import { formData } from "./types";
export async function allEvents(limit?: number) {
  const url = `${import.meta.env.VITE_URL}/allevents?limit=${limit}`;
  console.log("url", url);

  try {
    const data = await axios.get(url);
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
    console.log("first data");
    await axios.post(url, formdata).then((data) => {
      localStorage.setItem("token", data.data.token);
    });
  } catch (error) {
    console.log("....erorr");
    console.log(error);
  }
}
