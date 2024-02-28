"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import PromptCardList from "./PromptCardList";

const Feed = () => {
  const [post, setPost] = useState();
  const [searchText, setSearchText] = useState();
  const handleSearchChange = (e: any) => {
    // e.preventDefuelt();
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPost(data);
    };

    fetchPosts();
  }, []);
  console.log("Post =>", post);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or a username "
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={post} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
