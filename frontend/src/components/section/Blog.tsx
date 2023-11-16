import { useState, useEffect } from "react";
import { allBlogs } from "../../util/api";
import { blogPorps } from "../../util/types";
import blog from "../../assets/blog.png";
import Back from "../../assets/back";
const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    allBlogs().then((data) => {
      setBlogs(data);
    });
  }, []);

  return (
    <div className="py-24 ">
      <div className="pb-10">
        <h1 className="text-5xl leading-10- font-bold text-center ">
          Read blogs from our <span className="text-primary">women </span>
        </h1>
        <h1 className="text-5xl leading-10- font-bold text-center text-primary">
          Contributors
        </h1>
      </div>

      <div className="grid grid-cols-2 px-16 gap-12 bg-white  py-28">
        {blogs?.map(({ picture, title, description }: blogPorps) => {
          return (
            <div className="flex gap-8">
              <img src={blog} alt="blg" />
              <div className="flex flex-col justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <p className="bg-lightGrey px-2 py-1">category</p>
                  <p>5 min read</p>
                </div>
                <div className="gap-4 flex flex-col">
                  <h1 className="text-2xl">{title}</h1>
                  <p className="text-base">{description}</p>
                </div>

                <div>
                  <button className="flex items-center gap-2 text-sm">
                    Read more <Back />
                  </button>{" "}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Blog;
