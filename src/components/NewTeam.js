import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../services/userSlice";
import { useNavigate } from "react-router";

function NewTeam(props) {
    const usersData = setUser(useSelector((state) => state.users));
    const [page, setPage] = useState(1);
    const [team, setTeam] = useState([]);
    const [error, setError] = useState(false);
    const [name, setName] = useState("");
    const [members, setMembers] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, [page]);

    async function getUsers() {
        let users = await fetch(
            `https://heliverse-assignment-backend-bice.vercel.app/api/users/?page=${page}&perPage=20`
        );
        users = await users.json();
        dispatch(setUser(users))
    }

    const handlePagination = (btn) => {
        if (btn === "prev") {
            setPage((prevPage) => Math.max(prevPage - 1, 1));
        } else if (btn === "next") {
            setPage((prevPage) => Math.min(prevPage + 1, usersData.payload.totalPages));
        }
    };

    const handleSelectUser = (isChecked, user) => {
        if (isChecked && !members.some((teamUser) => teamUser.domain === user.domain)) {
            setMembers([...members, user]);
        } else {
            setTeam(members.filter((teamUser) => teamUser !== user));
        }
    };

    const handleSubmit = async () => {
        if (!error) {
            let teamData = {
                name, members: members.map((member) => member._id)
            }
            let result = await fetch('https://heliverse-assignment-backend-bice.vercel.app/api/team', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(teamData)
            })
            props.onCancel()
            navigate('/team')
        }
    }

    useEffect(() => {
        (name == "") ? setError(true) : setError(false)
        setTeam({ name, members })
    }, [name, members])

    const [isClose, setClose] = useState(true)
    const handleClose = () => {
        props.onCancel()
    }
    useEffect(() => {
        if (!props.show) {
            setTeam([]);
        }
        setClose(props.show)
    }, [handleClose])
    return (
        <div id="static-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" className={`${isClose ? "block" : "hidden"} p-16 pl-80 items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Create Team
                        </h3>
                        <button type="button" onClick={() => handleClose()} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
                        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                            <div className="relative">
                                <div class="w-full">
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Team Name</label>
                                    <input type="text" name="name" onChange={(e) => setName(e.target.value)} id="name" class="bg-gray-50 border ml-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Team Name" required="" />
                                    {error && <span className="p-2 pl-7 text-sm text-red-600">Please Enter Team Name</span>}
                                </div>
                            </div>
                        </div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="p-4">
                                        <div className="flex items-center">
                                            <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label for="checkbox-all-search" className="sr-only">checkbox</label>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Domain
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    {/* <th scope="col" className="px-6 py-3">
                                            Action
                                        </th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    usersData.payload.users?.map((user, index) =>
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="w-4 p-4">
                                                <div id={user.id} className="flex items-center">
                                                    <input id={`checkbox-table-search-${index}`} onChange={(e) => handleSelectUser(e.target.checked, user)} type="checkbox"
                                                        checked={members.some((teamUser) => teamUser.id === user.id)}
                                                        disabled={
                                                            (!user.available || members.some((teamUser) => teamUser.domain === user.domain)) ?
                                                                (members.some((teamUser) => teamUser.id === user.id)) ? false : true
                                                                : false
                                                        }
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                                </div>
                                            </td>
                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                <img className="w-10 h-10 rounded-full" src={user.avatar} alt="Jese image" />
                                                <div className="ps-3">
                                                    <div className="text-base font-semibold">{user.first_name}&nbsp;{user.last_name}</div>
                                                    <div className="font-normal text-gray-500">{user.email}</div>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">
                                                {user.domain}
                                            </td>
                                            <td className="px-6 py-4">
                                                {
                                                    user.available ?
                                                        <div className="flex items-center">
                                                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Available
                                                        </div>
                                                        :
                                                        <div className="flex items-center">
                                                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Unavailable
                                                        </div>
                                                }
                                            </td>
                                            {/* <td className="px-6 py-4">
                                                    <a href="#" type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                                                </td> */}
                                        </tr>
                                    )
                                }
                                <tr className="grid-column: auto;">
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <button type="button" onClick={handleSubmit} className="text-white bg-blue-700 mt-3 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><div class="flex flex-col items-end mr-5">
                                        <div class="text-sm text-gray-700 inline-flex mt-2 xs:mt-0  dark:text-gray-400">
                                            <span class="text-justify mt-2">
                                                Showing <span class="font-semibold text-gray-900 dark:text-white">{(usersData.payload.page - 1) * 20 + 1}</span> to <span class="font-semibold text-gray-900 dark:text-white">{usersData.payload.page * 20}</span> of <span class="font-semibold text-gray-900 dark:text-white">{usersData.payload.totalUsers}</span> Entries
                                            </span>
                                            <button onClick={() => handlePagination("prev")} class="ml-5 flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                Prev
                                            </button>
                                            <button onClick={() => handlePagination("next")} class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                Next
                                            </button>
                                        </div>
                                    </div></td>
                                </tr>
                            </tbody>
                        </table>
                        <div id="editUserModal" tabindex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                            <div className="relative w-full max-w-2xl max-h-full">
                                <form className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    {/* <!-- Modal header --> */}
                                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Edit user
                                        </h3>
                                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    {/* <!-- Modal body --> */}
                                    <div className="p-6 space-y-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label for="first-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                                <input type="text" name="first-name" id="first-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bonnie" required="" />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label for="last-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                                <input type="text" name="last-name" id="last-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Green" required="" />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                                <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@company.com" required="" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Modal footer --> */}
                                    <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save all</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NewTeam