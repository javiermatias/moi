// src/userContext.js
//import { User } from '@/app/lib/definitions';
"use client"
import { User } from 'next-auth';
import React from 'react';



const AuthContext = React.createContext<User | undefined>(undefined);

export { AuthContext };

