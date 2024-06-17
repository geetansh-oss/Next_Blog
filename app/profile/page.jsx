"use client"

import React from 'react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@/components/Profile';


const MyProfile = () => {

  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
      console.log(data);
    }
    fetchPosts();

  }, [session?.user.id]);

  // console.log(posts);

  const handleDelete = async (post) => {
    const hasConfiremed = confirm("Are you sure you want to delete this prompt ?");

    if (hasConfiremed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        });

        const filterPosts = Posts.filter((p) => p._id !== post._id);
        setPosts(filterPosts);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  return (
    <Profile
      name="My"
      desc=" Welcome to your personal profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile;
