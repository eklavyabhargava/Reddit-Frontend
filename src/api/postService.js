import axiosInstance from "./axiosInstance";

// Function to get all posts
export const fetchPosts = async (pageNo) => {
  try {
    const response = await axiosInstance.get(`/post/get-posts?page=${pageNo}`);
    return response.data;
  } catch (error) {
    return { isSuccess: false, errMsg: "Something went wrong!" };
  }
};

// Function to handle vote
export const handleVote = async (postId, voteType) => {
  try {
    const response = await axiosInstance.post("/post/handle-vote", {
      postId,
      voteType,
    });
    return response.data;
  } catch (error) {
    return { isSuccess: false, errMsg: "Something went wrong!" };
  }
};

// Function to create a new post
export const createPost = async (postData) => {
  try {
    const response = await axiosInstance.post("/post/create-post", postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return { isSuccess: false, errMsg: "Something went wrong!" };
  }
};
