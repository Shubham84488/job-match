"use client";

import React, { useState,useEffect } from 'react';
import { ProfileProvider } from '@/context/ProfileContext';  
import Profiler from '@/components/Profiler';

const Profile = () => {

  return (
    <ProfileProvider>
      <Profiler/>
    </ProfileProvider>
  );
}

export default Profile;
