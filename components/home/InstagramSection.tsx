"use client";

import {
  useEffect,
  useState,
} from "react";

import { Heart } from "lucide-react";

interface Post {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
  like_count: number;
}

export default function InstagramSection() {
  const [posts, setPosts] =
    useState<Post[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const response =
        await fetch(
          "/api/instagram"
        );

      const data =
        await response.json();

      setPosts(
        data.data?.slice(
          0,
          8
        ) || []
      );
    } catch (error) {
      console.error(
        error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-24 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 bg-pink-100 px-5 py-2 rounded-full">
            <span className="text-xl">📸</span>

            <span className="font-medium">
              @Luna_Rosa_Ropa_Femenina
            </span>
          </div>

          <h2 className="text-5xl font-bold mt-6">
            Inspírate con
            nuestras clientes
          </h2>

          <p className="text-gray-500 mt-4 text-lg">
            Looks reales,
            tendencias y
            novedades
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({
              length: 8,
            }).map(
              (
                _,
                index
              ) => (
                <div
                  key={index}
                  className="
                    h-80
                    rounded-3xl
                    bg-pink-100
                    animate-pulse
                  "
                />
              )
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {posts.map(
              (post) => (
                <a
                  key={
                    post.id
                  }
                  href={
                    post.permalink
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    h-80
                    shadow-lg
                  "
                >
                  <img
                    src={
                      post.media_url
                    }
                    alt={
                      post.caption
                    }
                    className="
                      w-full
                      h-full
                      object-cover
                      transition
                      duration-700
                      group-hover:scale-110
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-black/0
                      group-hover:bg-black/50
                      transition
                      duration-500
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      opacity-0
                      group-hover:opacity-100
                      transition
                      flex
                      flex-col
                      justify-end
                      p-6
                      text-white
                    "
                  >
                    <div className="flex items-center gap-2">
                      <Heart
                        size={18}
                      />

                      {
                        post.like_count
                      }
                    </div>

                    <p className="mt-3 text-sm line-clamp-3">
                      {
                        post.caption
                      }
                    </p>
                  </div>
                </a>
              )
            )}
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href="https://instagram.com/Luna_Rosa_Ropa_Femenina"
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex
              items-center
              gap-3
              bg-pink-500
              hover:bg-pink-600
              text-white
              px-8
              py-4
              rounded-full
              font-semibold
              transition
            "
          >
            <span className="text-xl">📸</span>

            Seguir en Instagram
          </a>
        </div>
      </div>
    </section>
  );
}