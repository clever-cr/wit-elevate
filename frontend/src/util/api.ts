import axios from "axios";
import data from "../components/data/festivals";
import { formData } from "./types";

const token = localStorage.getItem("token");

export async function allEvents(limit?: number) {
  const url = `${import.meta.env.VITE_URL}/allevents?limit=${limit}`;
  try {
    const data = await axios.get(url);
    return data.data;
  } catch (error) {
    console.log("something wrong ...");
  }
}

export async function allBlogs(limit?: number) {
  const url = `${import.meta.env.VITE_URL}/allblogs?limit=${limit}`;
  try {
    const data = await axios.get(url);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function blog(id: any) {
  const url = `${import.meta.env.VITE_URL}/oneBlog/${id}`;
  try {
    const data = await axios.get(url);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
export async function postComment(blogId: any, formData: any) {
  const url = `${import.meta.env.VITE_URL}/postComment/${blogId}`;
  try {
    const data = await axios.post(url, formData, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
export async function comment(blogId: any) {
  const url = `${import.meta.env.VITE_URL}/comments/${blogId}`;
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
    console.log(error);
  }
}

export async function signUp(formdata: formData) {
  const url = `${import.meta.env.VITE_URL}/signUp`;
  try {
    const data = await axios.post(url, formdata);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
