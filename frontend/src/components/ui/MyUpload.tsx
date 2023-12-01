import { Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dtrxnuked",
  },
});

const MyUpload = () => {
  const handleUpload = async (file: any) => {
    let formData = new FormData();

    formData.set("file", file);
    formData.set("upload_preset", "pl5hym7e");

    for (const entry of formData.entries()) {
      console.log("entriess", entry);
    }

    try {
      //   const res = await fetch(
      //     `https://api.cloudinary.com/v1_1/${
      //       cld.getConfig().cloud?.cloudName
      //     }/image/upload`,
      //     {
      //       method: "POST",
      //       body: formData,
      //     }
      //   );
      const axiosRes = await axios.post(
        `https://api.Cloudinary.com/v1_1/dtrxnuked/image/upload`,
        formData
      );

      // const data = await axiosRes.json();
      console.log(axiosRes.data.secure_url); // image url
      console.log(axiosRes.data); // image url
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Upload customRequest={handleUpload}>
      <button>Upload</button>
    </Upload>
  );
};
export default MyUpload;
