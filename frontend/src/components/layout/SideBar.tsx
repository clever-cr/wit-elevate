import { Link } from "react-router-dom";
import Arrow from "../../assets/Arrow";
import { useState } from "react";
import { SiBloglovin } from "react-icons/si";
import { MdEmojiEvents } from "react-icons/md";
import { LuDot } from "react-icons/lu";
const datas = [
  {
    title: "Blogs",
    icon: <SiBloglovin />,
    lists: [
      {
        link: "CreateBlog",
        path: "createBlog",
      },
      {
        link: "ListBlogs",
        path: "ListBlogs",
      },
    ],
  },
  {
    title: "Events",
    icon: <MdEmojiEvents />,
    lists: [
      {
        link: "CreateEvents",
        path: "createEvents",
      },
      {
        link: "ListEvents",
        path: "listEvents",
      },
    ],
  },
];

const SideBar = () => {
  const [isClicked, setIsClicked] = useState<number>();

  const handleClick = (id: number) => {
    setIsClicked(id == isClicked ? -1 : id);
  };
  return (
    <div className="p-2 w-52 ">
      <div className=" ">
        <Link
          to="/"
          className="text-black text-lg text-center-  leading-10 font-extrabold"
        >
          WIT <span className="text-secondary">Elevate</span>
        </Link>
      </div>

      <div className="flex  flex-col gap-2 pt-12">
        {datas.map(({ title, lists, icon }, index: number) => {
          return (
            <>
              <div
                onClick={() => {
                  handleClick(index);
                }}
                className="flex items-center justify-between hover:bg-gray-200 px-5 py-3 rounded-md"
              >
                <div className="flex items-center  gap-3">
                  <>{icon}</>
                  <h1>{title}</h1>
                </div>

                <Arrow />
              </div>
              {isClicked == index && (
                <div className="bg-orange-200- flex flex-col ">
                  {lists.map(({ link, path }) => {
                    return (
                      <div className="flex items-center gap-5 text-[#88939F] group">
                        <LuDot className="group-hover:text-secondary w-5 h-5 " />
                        <Link to={path} className="">
                          {link}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};
export default SideBar;
