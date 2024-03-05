"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import PromptCardList from "./PromptCardList";
import { ClipLoader } from "react-spinners";
import NotFound from "./NotFound";

const Feed = () => {
  const [post, setPost] = useState<any>([]);
  const [searchText, setSearchText] = useState();
  const [loading, setLoading] = useState(false);
  const handleSearchChange = (e: any) => {
    // e.preventDefuelt();
  };
  useEffect(() => {
    const fetchPosts = async () => {
      console.log("Loading ", loading);
      setLoading(true);
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPost(data);
      setLoading(false);
    };

    fetchPosts();
  }, []);
  return (
    <section className="feed">
      {/* <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or a username "
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form> */}


      {loading ? (
        <ClipLoader
          color="blue_gradient"
          loading={loading}
          size={50}
          className="mt-5"
        />
      ) : post.length == 0 ? (
        <div>
          <NotFound />
        </div>
      ) : (
        <PromptCardList data={post} handleTagClick={() => {}} />
      )}
    </section>
  );
};

export default Feed;
