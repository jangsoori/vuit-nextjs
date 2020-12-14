import React from "react";
import Post from "./Post";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 5,
  1300: 4,
  1100: 3,
  700: 2,
  500: 1,
};
export default function Posts({ data, isFetching, isLoading }) {
  const posts = data?.data.data.children.map((post) => {
    return (
      <Post
        key={post.data.id}
        post={post.data}
        style={{ width: "100%", display: "block" }}
      />
    );
  });

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {posts}
    </Masonry>
  );
}
