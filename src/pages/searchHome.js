import React from "react";
import { ShowOnLogout } from "../components/hiddenLinks/hiddenLinks";
import Navbar from "./Navbar";
import { Loggedin } from "../App";
import HomePage from "./homePage";
export default function SearchHome() {
  return (
    <>
      {!Loggedin ? (
        <>
          <div className="m-5">
            <Navbar />
            <ShowOnLogout>
              <div className="">
                <h1 className="mt-[40px] text-4xl font-extrabold text-center tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                  Know How <br />
                  To Get Over Things
                </h1>
                <div className="font-inter text-center text-darkGray ">
                  “No one has ever become poor by giving.”{" "}
                  <h6 className="text-sm">
                    ― Anne Frank, diary of Anne Frank: the play
                  </h6>
                  <form className="bg-bgImg bg-contain bg-no-repeat  h-screen m-5">
                    <div className="relative flex flex-col justify-center items-center mt-[20px]">
                      <input
                        type="search"
                        id="default-search"
                        className="block p-4 pl-10 w-[500px]   text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Mockups, Logos..."
                        required
                      />
                      <div className="flex absolute inset-y-0 left-[467px] items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          ></path>
                        </svg>
                      </div>
                      <button
                        type="submit"
                        className="text-black absolute right-[485px]  bg-lightGreen  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 "
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </ShowOnLogout>
          </div>
        </>
      ) : (
        <HomePage />
      )}
    </>
  );
}
