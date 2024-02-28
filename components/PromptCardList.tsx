import React from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }: any) => {
  console.log("Data in prompt cardList => ", data);
  return (
    <div className="mt-16 prompt_layout">
      {data &&
        data.map((post: any) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
    </div>
  );
};

export default PromptCardList;
