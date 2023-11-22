import axios from "axios";

export async function allEvents(limit?: number) {
  const url = `${process.env.REACT_APP_URL}/allevents?limit=${limit}`;

  try {
    const data = await axios.get(url);
    return data.data;
  } catch (error) {
    console.log("something wrong ...");
  }
}

export async function allBlogs(limit?: number) {
  const url = `${process.env.REACT_APP_URL}?limit=${limit}`;
  try {
    const data = await axios.get(url);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
