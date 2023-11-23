import axios from "axios";

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
