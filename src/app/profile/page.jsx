"use client";

import React, { useState,useEffect } from 'react';
import { ProfileProvider } from '@/context/ProfileContext';  // Import Context
import axios from 'axios';
import {toast,Toaster} from 'react-hot-toast';
import Profiler from '@/components/Profiler';

const Profile = () => {

  return (
    <ProfileProvider>
      <Profiler/>
    </ProfileProvider>
  );
}

export default Profile;
