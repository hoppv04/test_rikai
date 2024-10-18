import { useMutation } from "@tanstack/react-query";
import instance from "../api/connectDB";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await instance.get(`posts/${id}`);
          const { title, content } = data.data;
          setFormData({ title, content });
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [id]);

  const navigate = useNavigate();

  const { mutate: addPost } = useMutation({
    mutationFn: async (post) => {
      const { data } = await instance.post("/posts/add", post);
      return data;
    },
    onSuccess: (data) => {
      setFormData({
        title: "",
        content: "",
      });
      toast.success(data.message);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const { mutate: updatePost } = useMutation({
    mutationFn: async (post) => {
      const { data } = await instance.put(`/posts/update/${id}`, post);
      return data;
    },
    onSuccess: (data) => {
      setFormData({
        title: "",
        content: "",
      });
      toast.success(data.message);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    id ? updatePost(formData) : addPost(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? "Update" : "Add"} Post</h2>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Content
        </label>
        <input
          type="text"
          className="form-control"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default PostForm;
