import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../services/userSlice";
import UpdateUser from "./UpdateUser";

function UserCard(props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const users = setUser(useSelector((state) => state.users));
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [editUser, setEditUser] = useState({})

  const toggleDropdown = (index) => {
    setIsDropdownOpen(index === isDropdownOpen ? -1 : index);
  };

  useEffect(() => {
    getUsers();
  }, [props.page]);

  async function getUsers() {
    let users = await fetch(
      `https://heliverse-assignment-backend-bice.vercel.app/api/users/?page=${props.page}&perPage=20`
    );
    users = await users.json();
    dispatch(setUser(users))
  }
  const handleCancel = () => {
    setShow(false);
  };

  const handleDelete = async (user) => {
    setIsDropdownOpen(false)
    await fetch(`https://heliverse-assignment-backend-bice.vercel.app/api/users/${user.id}`, { method: 'DELETE' })
    getUsers()
  }

  const handleEdit = async (user) => {
    setIsDropdownOpen(false)
    setEditUser(user)
    setShow(true)
  }

  return (
    <>
      {show && < UpdateUser className="mt-10" show={show} onCancel={handleCancel} user={editUser} />}
      {
        (users.payload.users) ? users.payload.users.map((item, index) => (
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
            <div className="flex justify-end px-4 pt-4">
              <button
                id={`dropdownButton${index}`}
                className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                type="button"
                onClick={() => toggleDropdown(index)}
              >
                <span className="sr-only">Open dropdown</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 3"
                >
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
              </button>
              <div
                className={`${isDropdownOpen === index ? "block" : "hidden"
                  } z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-1/3 dark:bg-gray-700 absolute right-0 mt-10`}
                aria-labelledby={`dropdownButton${index}`}
              >
                <ul className="py-2">
                  <li>
                    <button
                      id={`edit${index}`}
                      onClick={() => handleEdit(item)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Edit
                    </button>
                  </li>
                  <li>
                    <button id={`delete${index}`}
                      onClick={() => handleDelete(item)}
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={item.avatar}
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {item.first_name}&nbsp;{item.last_name}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {item.domain}
              </span>
              <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 mt-2 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                {item.available ? "Available" : "Unavailable"}
              </span>
              {/* <div className="flex mt-4 md:mt-6">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add friend
              </a>
              <a
                href="#"
                className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Message
              </a>
            </div> */}
            </div>
          </div>
        ))
          :
          <h4 className="text-center p-5 text-lg font-bold text-gray-600">No Such Record Found</h4>
      }
    </>
  );
}

export default UserCard;
