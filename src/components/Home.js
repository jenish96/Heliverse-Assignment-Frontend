import { useState } from "react";
import Filter from "./Filter";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";
import { setUser } from "../services/userSlice";
import { useDispatch, useSelector } from "react-redux";
import NewUser from "./NewUser";
import UpdateUser from "./UpdateUser";

function Home() {
  const users = setUser(useSelector((state) => state.users));
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const handleCancel = () => {
    setShow(false);
    console.log("false---")
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleSearch(name) {
    // if (name.trim() === "") {
    //   navigate("/");
    // }
    let result = await fetch(`https://heliverse-assignment-backend-bice.vercel.app/api/users/search/${name}`);
    result = await result.json();
    dispatch(setUser(result));
  }
  const handlePagination = (btn) => {
    if (btn === "prev") {
      setPage((prevPage) => Math.max(prevPage - 1, 1));
    } else if (btn === "next") {
      setPage((prevPage) => Math.min(prevPage + 1, users.payload.totalPages));
    }
  };

  return (
    <>
      <NewUser show={show} onCancel={handleCancel} />
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        class="fixed top-20 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <Filter />
      </aside>

      <div className="pl-80 pt-24 flex">
        <button data-modal-target="crud-modal" onClick={() => setShow(true)} data-modal-toggle="crud-modal" class="block mr-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
          + New User
        </button>
        <button data-modal-target="crud-modal" onClick="" data-modal-toggle="crud-modal" class="block text-white mr-96 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
          + Team
        </button>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search"
            onChange={(e) => handleSearch(e.target.value)} id="search-navbar" class="block w-80 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Users, Name..." />
        </div>
      </div>
      <div class="p-4 sm:ml-64 py-5">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div class="grid grid-cols-4 gap-4 mb-4">
            <UserCard page={page} />
          </div>
          <div class="flex flex-col items-end mr-5">
            <div class="text-sm text-gray-700 inline-flex mt-2 xs:mt-0  dark:text-gray-400">
              <span class="text-justify mt-2">
                Showing <span class="font-semibold text-gray-900 dark:text-white">{(users.payload.page - 1) * 20 + 1}</span> to <span class="font-semibold text-gray-900 dark:text-white">{users.payload.page * 20}</span> of <span class="font-semibold text-gray-900 dark:text-white">{users.payload.totalUsers}</span> Entries
              </span>
              <button onClick={() => handlePagination("prev")} class="ml-5 flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Prev
              </button>
              <button onClick={() => handlePagination("next")} class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Next
              </button>
            </div>
          </div>
        </div>

      </div >
    </>
  );
}

export default Home;
