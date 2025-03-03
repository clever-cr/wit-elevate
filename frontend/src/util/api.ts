import axios from "axios";
import { formData } from "./types";

const token = localStorage.getItem("token");

export async function allEvents(limit?: number) {
  const url = `${import.meta.env.VITE_URL_SERVER_URL}/allevents?limit=${limit}`;
  try {
    const data = await axios.get(url);
    return data.data;
  } catch (error) {
    console.log("something wrong ...");
  }
}

export async function event(id: any) {
  const url = `${import.meta.env.VITE_URL}/event/${id}`;
  try {
    const data = await axios.get(url);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
export async function createEvent(eventData: any) {
  const url = `${import.meta.env.VITE_URL}/postEvent`;
  try {
    const data = await axios.post(url, eventData, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log("can't post");
  }
}
export async function editEvent(eventData: any, id: any) {
  const url = `${import.meta.env.VITE_URL_SERVER_URL}/updateEvent/${id}`;
  try {
    const data = await axios.patch(url, eventData, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log("can't edit");
  }
}

export async function createBlog(blogData: any) {
  const url = `${import.meta.env.VITE_URL}/postBlog`;
  try {
    const data = await axios.post(url, blogData, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log("can't post");
  }
}

export async function deleteEvent(id: any) {
  const url = `${import.meta.env.VITE_URL}/deleteEvent/${id}`;
  try {
    const data = await axios.delete(url, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log("can't delete");
  }
}

export async function allBlogs(limit?: number, userId?: string) {
  const url = `${import.meta.env.VITE_URL}/allblogs?limit=${limit}&${
    userId && "user=" + userId
  }`;
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

export async function editBlog(blogData: any, id: any) {
  const url = `${import.meta.env.VITE_URL}/updateBlog/${id}`;
  try {
    const data = await axios.patch(url, blogData, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log("can't edit");
  }
}

export async function deleteBlog(id: any) {
  const url = `${import.meta.env.VITE_URL}/deleteBlog/${id}`;
  try {
    const data = await axios.delete(url, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log("can't delete");
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
