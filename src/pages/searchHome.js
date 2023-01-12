import React from "react";
import { ShowOnLogout } from "../components/hiddenLinks/hiddenLinks";
import Navbar from "./Navbar";
import { Loggedin } from "../App";
import HomePage from "./homePage";
import { useCallback } from "react";
import { useState, useEffect } from "react";

export default function SearchHome() {
  const [quote, setQuote] = useState("");

  const array = [
    "“If you deliberately plan on being less than you are capable of being,\b then I warn you that you’ll be unhappy for the rest of your life.” –Abraham Maslow",
    "“We shouldn’t teach great books; we should teach a love of reading.\b  Knowing the contents of a few works of literature is a trivial achievement. Being inclined to go on reading is a great achievement.” –B.F. Skinner",
  ];
  const shuffle = useCallback(() => {
    const shuffleArr = Math.floor(Math.random() * array.length);
    setQuote(array[shuffleArr]);
  });

  useEffect(() => {
    const intervalID = setInterval(shuffle, 2000);
    return () => clearInterval(intervalID);
  }, [shuffle]);

  return (
    <>
      {!Loggedin ? (
        <>
          <div className="m-8">
            <div className=" bg-bgImg bg-no-repeat bg-contain bg-center max-w-screen h-screen">
              <Navbar />

              <ShowOnLogout>
                <div className="flex items-center justify-center">
                  <div className=" w-[40%]   h-screen">
                    <h1 className="mt-[10%] text-4xl font-extrabold text-center tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                      Know How <br />
                      To Get Over Things
                    </h1>
                    <div className="font-inter text-center text-darkGray mt-[20px] ">
                      <h4 className="">{quote}</h4>

                      <form className=" mt-[20px] ">
                        <div className="relative ">
                          <button className=" inset-y-0 left-0  pointer-events-none ">
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute flex items-center ml-[12px] bottom-[13px]"
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
                          </button>
                          <input
                            type="search"
                            id="default-search"
                            className=" inline-block w-[60%] items-center p-4 pl-10 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search Mockups, Logos..."
                            required
                          />
                          <button
                            type="submit"
                            className="text-black absolute  w-18 text-center right-[35%] bg-lightGreen  top-[10px] mr-[10px]  font-medium rounded-lg text-[12px] h-[35px] p-2 "
                          >
                            Search
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </ShowOnLogout>
            </div>
          </div>
        </>
      ) : (
        <HomePage />
      )}
    </>
  );
}
