import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../api/connectDB";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PostManagement = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const { data } = await instance.get("/posts");

        if (data.success) return data.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "UTC",
    });

    return formattedDate;
  };

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      const { data } = await instance.delete(`posts/delete/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return (
    <>
      <div className="d-flex justify-content-between p-4 mb-4">
        <h2>Post Management</h2>
        <button className="btn btn-secondary" onClick={() => navigate("/add")}>
          Add Post
        </button>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Content</th>
            <th>Publish At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((post, key) => (
              <tr key={post._id}>
                <td>{key + 1}</td>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>{formatDate(post.published_at)}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => navigate(`/update/${post._id}`)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      if (window.confirm("Delete?")) {
                        mutate(post._id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Please add more posts...</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default PostManagement;
