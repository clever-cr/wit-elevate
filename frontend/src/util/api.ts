import axios from "axios";

export async function allEvents() {
  const url = "http://localhost:3000/allevents";
  try {
    const data = await axios.get(url);
    return data.data;
  } catch (error) {
    console.log("something wrong ...");
  }
}

export async function allBlogs() {
  const url = "http://localhost:3000/allBlogs";
  try {
    console.log("url", url);
    const data = await axios.get(url);
    console.log("blogs", data);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
