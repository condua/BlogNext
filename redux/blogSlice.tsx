// src/redux/blogSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/blogs`;

// 📌 Async Thunks

export const fetchBlogs = createAsyncThunk("blogs/fetchAll", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const fetchBlogById = createAsyncThunk(
  "blogs/fetchById",
  async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
);

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (blogData: any, thunkAPI) => {
    try {
      const res = await axios.post(API_URL, blogData);
      return res.data;
    } catch (err: any) {
      console.error("❌ Error:", err.response?.data || err.message);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, blogData }: { id: string; blogData: any }, thunkAPI) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, blogData);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

// 🧠 Slice

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [] as any[],
    blog: null as any,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    clearBlog: (state) => {
      state.blog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Lỗi khi tải blogs.";
      })

      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Không tìm thấy blog.";
      })

      .addCase(createBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.blogs.findIndex(
          (b) => b._id === action.payload._id
        );
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter((b) => b._id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Không thể xoá blog.";
      });
  },
});

export const { clearBlog } = blogSlice.actions;

export default blogSlice.reducer;
