"use client";
import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter()
  const {data:session } :any  = useSession()

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e :any) => {
    e.preventDefault();
  
    try{
      const response = await fetch("/api/prompt/new", {
        method:'POST',
        body:JSON.stringify({
          prompt:post.prompt,
          userId:session?.user?.id || "" ,
          tag:post.tag
        })
      })

      if(response.ok) {
        router.push("/")
      }
    }catch(e) {
      console.log("Error while creating prompt")
    }finally{
      setSubmitting(false)
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
