import React, { ChangeEvent, useRef, useState } from "react";

import { Editor } from "@tinymce/tinymce-react";
import Input from "../components/ui/Input";
import { GoPlus } from "react-icons/go";
import { formData } from "../util/types";
import { createBlog } from "../util/api";
const CreateBlog = ({ placeholder }: any) => {
  const [content, setContent] = useState<formData>({
    picture: "http://localhost:5173/src/assets/hero.png",
  });

  const handleChange = (e: any) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("contentt", content);
    createBlog(content).then((data) => {
      setContent(data);
    });
    console.log("content", content);
  };
  const editorRef = useRef<any>(null);
  return (
    <div className="py-12 px-12">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <label>Title</label>
            <Input
              name="title"
              value={content?.title}
              className="bg-white border"
              onChange={handleChange}
            />
          </div>
          <div>
            <button className="bg-[#FBFBFB] flex flex-col items-center p-5 text-[#9D9D9D] border border-[#9D9D9D] ">
              <GoPlus />
              <h1>Add Image</h1>
            </button>
          </div>
        </div>

        <div>
          <Editor
            onChange={handleChange}
            // apiKey="your-api-key"
            onInit={(evt, editor) => (editorRef.current = editor)}
            onEditorChange={() =>
              setContent({
                ...content,
                description: editorRef?.current?.getContent(),
              })
            }
            value={placeholder}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],

              toolbar:
                "undo redo aligncenter alignjustify alignleft alignnone alignright| anchor | blockquote blocks | backcolor | bold | copy | cut | fontfamily fontsize forecolor h1 h2 h3 h4 h5 h6 hr indent | italic | language | lineheight | newdocument | outdent | paste pastetext | print | redo | remove removeformat | selectall | strikethrough | styles | subscript superscript underline | undo | visualaid | a11ycheck advtablerownumbering typopgraphy anchor restoredraft casechange charmap checklist code codesample addcomment showcomments ltr rtl editimage fliph flipv imageoptions rotateleft rotateright emoticons export footnotes footnotesupdate formatpainter fullscreen help image insertdatetime link openlink unlink bullist numlist media mergetags mergetags_list nonbreaking pagebreak pageembed permanentpen preview quickimage quicklink quicktable cancel save searchreplace spellcheckdialog spellchecker | table tablecellprops tablecopyrow tablecutrow tabledelete tabledeletecol tabledeleterow tableinsertdialog tableinsertcolafter tableinsertcolbefore tableinsertrowafter tableinsertrowbefore tablemergecells tablepasterowafter tablepasterowbefore tableprops tablerowprops tablesplitcells tableclass tablecellclass tablecellvalign tablecellborderwidth tablecellborderstyle tablecaption tablecellbackgroundcolor tablecellbordercolor tablerowheader tablecolheader | tableofcontents tableofcontentsupdate | template typography | insertfile | visualblocks visualchars | wordcount",
            }}
          />
        </div>
        <div className="pt-2- flex justify-start">
          <button
            type="submit"
            onClick={handleSubmit}
            className="border-secondary  border px-4  text-secondary py-2 hover:bg-primary hover:text-white hover:border-none"
          >
            Create Blog
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateBlog;
