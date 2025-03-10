import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import { formData } from "../util/types";
import { blog, createBlog, editBlog } from "../util/api";
import { toast } from "react-toastify";

const CreateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [content, setContent] = useState<formData>({});

  useEffect(() => {
    if (id) {
      blog(id).then((data) => {
        setContent(data);
      });
    }
  }, [id]);

  const handleChange = (e: any) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();

    createBlog(content).then((data) => {
      toast.success("Blog created successfully");
      setContent(data);
      navigate("/dashboard/blog/list");
    });
  };
  const handleEdit = (e: any) => {
    e.preventDefault();
    editBlog(content, id).then(() => {
      navigate("/dashboard/blog/list");
    });
  };
  console.log("editor", content);

  const editorRef = useRef<any>(null);
  return (
    <div className="py-12 px-12">
      <form
        className="flex flex-col gap-8"
        onSubmit={id ? handleEdit : handleSubmit}
      >
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
            <div className="flex flex-col">
              <label>Picture</label>
              <Input
                name="picture"
                value={content?.picture}
                className="bg-white border"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div>
          {/* <Editor
            value={content?.description}
            onChange={handleChange}
            onInit={(_evt, editor) => (editorRef.current = editor)}
            onEditorChange={() =>
              setContent({
                ...content,
                description: editorRef?.current?.getContent(),
              })
            }
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
          /> */}
          <Input
            name="description"
            value={content?.description}
            className="bg-white border h-52"
            onChange={handleChange}
          />
        </div>
        <div className="pt-2- flex justify-start">
          <button
            type="submit"
            onClick={id ? handleEdit : handleSubmit}
            className="border-secondary  border px-4  text-secondary py-2 hover:bg-primary hover:text-white hover:border-none"
          >
            {id ? "Edit Blog" : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateBlog;
