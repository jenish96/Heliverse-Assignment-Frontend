import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { setUser } from "../services/userSlice";

function NewUser(props) {
    const [isClose, setClose] = useState(true)
    let userId = setUser(useSelector((state) => state.users));
    userId = (userId.payload.totalUsers) + 100
    const [user, setUserData] = useState()
    const handleClose = () => {
        props.onCancel()
    }
    useEffect(() => {
        setClose(props.show)
    }, [handleClose])
    
    const handleSubmit = async () => {
        setUserData({ ...user, id: userId })
        let result = await fetch('https://heliverse-assignment-backend-bice.vercel.app/api/users/new', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        props.onCancel()
    }

    return (
        <div id="crud-modal" tabindex="-1" aria-hidden="true" className={`${isClose ? "block" : "hidden"
            } overflow-y-auto flex mt-6 mb-10 float-end items-center justify-center overflow-x-hidden fixed top-4 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            <div class="relative p-4 max-w-screen-md w-full max-w-md max-h-full">
                <div class="relative bg-slate-100 rounded-lg shadow dark:bg-gray-700">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            Create New User
                        </h3>
                        <button type="button" onClick={() => handleClose()} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form class="p-4 md:p-5">
                        <div class="grid gap-4 mb-4 grid-cols-2">

                            <div class="col-span-2 sm:col-span-1">
                                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                <input type="text" name="first_name" onChange={(e) => setUserData({ ...user, first_name: e.target.value })} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type First Name" required="" />
                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                <input type="text" name="last_name" onChange={(e) => setUserData({ ...user, last_name: e.target.value })} id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Last Name" required="" />
                            </div>
                            <div class="col-span-2">
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" onChange={(e) => setUserData({ ...user, email: e.target.value })} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Email" required="" />
                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                <select id="gender" onChange={(e) => setUserData({ ...user, gender: e.target.value })} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Agender">Agender</option>
                                    <option value="Bigender">Bigender</option>
                                    <option value="Genderfluid">Genderfluid</option>
                                    <option value="Genderqueer">Genderqueer</option>
                                    <option value="Non-binary">Non-binary</option>
                                    <option value="Polygender">Polygender</option>
                                </select>
                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="domain" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Domain</label>
                                <select id="domain" onChange={(e) => setUserData({ ...user, domain: e.target.value })} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Select Domain</option>
                                    <option value="Business Development">Business Development</option>
                                    <option value="Finance">Finance</option>
                                    <option value="IT">IT</option>
                                    <option value="Management">Management</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Sales">Sales</option>
                                    <option value="UI Designing">UI Designing</option>
                                </select>
                            </div>
                            <div class="col-span-2">
                                <label for="avatar" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar</label>
                                <input type="text" name="avatar" onChange={(e) => setUserData({ ...user, avatar: e.target.value })} id="avatar" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Avatar Link" required="" />
                            </div>
                            <div class="col-span-2 flex ">
                                <label for="available" class="block mt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white">Available</label>
                                <br />
                                <div className="flex ml-5 mt-2 mb-5 p-2 ps-4 border border-gray-200 rounded dark:border-gray-700">
                                    <div class="flex items-center me-4">
                                        <input id="available" type="radio" onChange={(e) => setUserData({ ...user, available: e.target.value })} value="true" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="available" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Available</label>
                                    </div>
                                    <div class="flex items-center me-4">
                                        <input id="available" type="radio" onChange={(e) => setUserData({ ...user, available: e.target.value })} value="false" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="available" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Unavailable</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" onClick={handleSubmit} class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            Add new User
                        </button>
                    </form>
                </div>
            </div >
        </div >

    )
}

export default NewUser