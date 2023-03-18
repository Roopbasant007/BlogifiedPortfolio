import React from "react";
import Head from "next/head";
import Image from "next/image";
import { createClient } from "next-sanity";
import PortableText from "react-portable-text";
import Script from "next/script";
import { useEffect } from "react";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import Navbar from "../components/NavBar";

const Blogs = ({ blogs }) => {
  const client = createClient({
    projectId: "hoquxqb3",
    dataset: "production",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);
  useEffect(() => {
    // console.log(builder.image(blogs[0].BlogImage));
  }, []);
  return (
    <div>
      <Navbar />
      <div className="bg-grey-200" id="blog">
        <div className="container sm:py-8 px-8">
          <h3 className="pt-4 pb-4 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
            Check out my latest posts!
          </h3>
          <div className=" grid w-full grid-cols-1 gap-6 pt-8 sm:w-3/4 lg:w-full lg:grid-cols-3 xl:gap-10 ">
            {blogs.map((item) => {
              return (
                <Link
                  key={item.slug}
                  href={"/blog/" + item.slug}
                  className="shadow"
                >
                  <div className=" border-4 border-indigo-300 rounded-2xl">
                    <div
                      style={{
                        backgroundImage: `url(${
                          builder.image(item.blogImg).width(200).url() ||
                          "/assets/img/post-01.png"
                        })`,
                      }}
                      className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72 rounded-2xl"
                    >
                      <span className="absolute inset-0 block bg-gradient-to-b from-blog-gradient-from to-blog-gradient-to bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"></span>
                      <span className="absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-white px-6 py-2 text-center font-body text-sm font-bold uppercase text-white md:text-base cursor-pointer bg-purple-700">
                        Read More
                      </span>
                    </div>
                    <div className="bg-white py-6 px-5 xl:py-8">
                      <span className="block font-body text-lg font-semibold text-black">
                        {item.title}
                      </span>
                      <span className="block pt-2 font-body text-grey-20">
                        {item.metadesc}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
export async function getServerSideProps(context) {
  const client = createClient({
    projectId: "hoquxqb3",
    dataset: "production",
    useCdn: false,
  });
  // Fetch data from external API
  const query = `*[_type == "blog"]`;
  const blogs = await client.fetch(query);
  // Pass data to the page via props
  return {
    props: {
      blogs,
    },
  };
}
