"use client"

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'
import React from 'react'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post.id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {

  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const handleSearchChange = (e) => { }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);
  console.log(posts);
  return (
    <section className='flex flex-col'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder="Search for tag or username"
          value={searchText}
          onChange={handleSearchChange}
          className='mt-5 search_input peer'
          required
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={() => { }}
      />
    </section>
  )
}

export default Feed