"use client"

import React from 'react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/profile';

const Profile = () => {
  return (
    <div>
      profile page
    </div>
  )
}

export default Profile
