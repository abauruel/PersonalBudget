/* eslint-disable @next/next/no-html-link-for-pages */
import Include from "src/components/include";

import { getCategories } from "src/lib/categories";
import { useUser, getSession, getAccessToken } from "@auth0/nextjs-auth0";
import Router from "next/router";
import axios from "axios";

import { useEffect } from "react";

export default function Home() {
  const { user, isLoading, error } = useUser();

  async function addUser() {
    const userRegistered = await axios.post("/api/user", { user });
    Router.push("/main", {});
  }

  useEffect(() => {
    if (user) {
      addUser();
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div className="bg-zinc-900 h-screen">
      <a href="/api/auth/login">Login</a>
    </div>
  );
}
