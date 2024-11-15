import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { createPost } from "../api/postService";
import { useNavigate } from "react-router-dom";
import { LuTrash } from "react-icons/lu";

const CreatePost = () => {
  const [postType, setPostType] = useState("text");
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    media: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const navigate = useNavigate();

  const validateData = () => {
    let isValid = true;
    const { title } = postData;

    if (!title.trim().length || title.trim().length >= 300) {
      setErrors((curr) => {
        return { ...curr, title: true };
      });
      isValid = false;
    }

    return isValid;
  };

  // Function to handle tab change
  const handleTabChange = (value) => {
    setPostType(value);
  };

  // Function to handle input change
  const handleInputChange = ({ name, value }) => {
    if (!name) return;

    setPostData((curr) => {
      return { ...curr, [name]: value };
    });
  };

  // Function to handle file upload
  const handleFileChange = (e) => {
    setPostData({
      ...postData,
      media: e.target.files[0],
    });
  };

  // validate on blur
  const handleOnBlur = ({ name }) => {
    const isValidData = validateData();
    if (isValidData) {
      setErrors({});
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  };

  // Function to create new post
  const handleCreatePost = async () => {
    const isValidData = validateData();
    if (!isValidData) return;

    setLoading(true)
    const { title, description, media } = postData;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (media) {
      formData.append("media", media);
    }

    const response = await createPost(formData);
    if (response.isSuccess) {
      navigate("/");
    }
  };

  // Remove uploaded media
  const handleRemoveMedia = () => {
    setPostData((curr) => {
      return { ...curr, media: null };
    });
  };

  return (
    <div className="desktop:w-[65%] w-full p-7 desktop:border-l-[1px] desktop:min-h-[100vh] flex flex-col gap-y-5 ">
      <p className="text-2xl font-semibold">Create Post</p>
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-row gap-x-3">
          {Tabs.map((tab) => (
            <button
              disabled={tab.disabled}
              onClick={() => handleTabChange(tab.value)}
              className={`${
                postType === tab.value ? "border-b-2 border-sky-500" : ""
              } p-2 hover:bg-bgSecondary disabled:text-textSecondary text-nowrap`}
              key={tab.value}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-y-1">
          <input
            type="text"
            name="title"
            onBlur={({ target }) => handleOnBlur(target)}
            placeholder="Title"
            value={postData.title}
            onChange={({ target }) => handleInputChange(target)}
            className={`${
              errors.title ? "border-btnPrimary focus:border-btnPrimary" : ""
            } bg-transparent w-full border-[1px] border-textSecondary p-3 text-lg rounded-xl`}
          />
          {errors.title && (
            <p className="text-sm ml-2 flex flex-row gap-x-1 items-center">
              <span className="text-btnPrimary text-lg">
                <MdErrorOutline />{" "}
              </span>{" "}
              Please fill out this field.
            </p>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          {postType === "text" && (
            <textarea
              name="description"
              value={postData.description}
              onChange={({ target }) => handleInputChange(target)}
              placeholder="Description"
              className="bg-transparent w-full border-[1px] border-textSecondary p-3 text-lg rounded-xl"
            />
          )}
          {postType === "multimedia" &&
            (postData.media ? (
              <div className="relative">
                {/* Check if media is an image or other type */}
                {postData.media.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(postData.media)}
                    alt="Uploaded preview"
                    className="w-full max-w-xs rounded-lg"
                  />
                ) : (
                  <video
                    controls
                    src={URL.createObjectURL(postData.media)}
                    className="w-full max-w-xs rounded-lg"
                  />
                )}
                {/* Delete button */}
                <button
                  onClick={handleRemoveMedia}
                  className="absolute top-2 right-2 text-red-500"
                >
                  <LuTrash size={24} />
                </button>
              </div>
            ) : (
              <div className="min-h-[120px] border-[1px] border-dashed rounded-xl gap-x-2 w-full flex justify-center items-center">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  name="media"
                  id="fileInput"
                />
                <p>Drag and Drop or upload media</p>
                <label
                  htmlFor="fileInput"
                  className="text-xl p-2 bg-bgSecondary rounded-full cursor-pointer"
                >
                  <IoCloudUploadOutline />
                </label>
              </div>
            ))}
          <div className="flex flex-row justify-end gap-x-2">
            <button
              disabled={true}
              className="disabled:bg-bgSecondary py-2 px-3 rounded-full "
            >
              Save Draft
            </button>
            <button
              disabled={disableBtn || loading}
              onClick={() => handleCreatePost()}
              className="disabled:bg-bgSecondary bg-btnPrimary hover:bg-btnSecondary py-2 px-3 rounded-full "
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
        <img
          id="selected-image"
          className="mt-3"
          alt=""
          style={{ maxWidth: "100%" }}
        />
      </div>
    </div>
  );
};

const Tabs = [
  {
    name: "Text",
    value: "text",
  },
  {
    name: "Images & Video",
    value: "multimedia",
  },
  {
    name: "Link",
    value: "link",
    disabled: true,
  },
  {
    name: "Poll",
    value: "poll",
    disabled: true,
  },
];

export default CreatePost;
