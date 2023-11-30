import { Table} from "antd";
import { useState, useEffect } from "react";
import { allBlogs } from "../util/api";
import { columns } from "../util/columns";

const ListBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    allBlogs(0).then((data) => {
      setBlogs(data);
    });
  }, []);
  const Data = blogs.map((blog) => {
    return blog;
  });
  return (
    <>
      <Table columns={columns} dataSource={Data} pagination={false} />
    </>
  );
};
export default ListBlogs;
