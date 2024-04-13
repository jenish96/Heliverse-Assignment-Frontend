import { useEffect, useState } from "react"

function Team() {
    const [teams, setTeams] = useState()
    const [members, setMembers] = useState()

    async function getTeams() {
        let team = await fetch(`https://heliverse-assignment-backend-bice.vercel.app/api/team/all`);
        team = await team.json();
        setTeams(team.team);
        setMembers(team.team[0])
    }
    useEffect(() => {
        getTeams()
    }, [])

    return (
        <>
            <div class="grid grid-cols-4 gap-4">
                <div>
                    <aside class="flex pt-16">
                        <div class="h-screen  py-8 overflow-y-auto bg-white border-l border-r sm:w-64 w-60 dark:bg-gray-900 dark:border-gray-700">
                            <h2 class="px-5 text-lg font-medium text-gray-800 dark:text-white">Accounts</h2>

                            <div class="mt-8 space-y-4">
                                {
                                    teams?.map((team, index) =>
                                        <button key={index} onClick={() => setMembers(team)} class={`flex items-center w-full px-5 py-2 transition-colors duration-200 dark:hover:bg-gray-800 gap-x-2 ${members._id == team._id ? "bg-gray-100" : "hover:bg-gray-100"} focus:outline-none`}>
                                            <div class="text-left text-justify rtl:text-right">
                                                <h1 class="text-sm font-medium p-2 text-gray-700 capitalize dark:text-white">{team.name}</h1>
                                                <div class="flex -space-x-4 rtl:space-x-reverse">
                                                    {team.members?.map((member, index) =>
                                                        < img key={index} class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={member.avatar} alt="" />
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </aside>
                </div>
                <div class="col-span-3 pr-16 mt-24">
                    <div class="flex flex-col overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Domain
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Available
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (!members) ?
                                        <tr> <td class="px-6 py-4">
                                            No Member Found!
                                        </td> </tr> :
                                        members.members.map((user, index) =>
                                            <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                    <img class="w-10 h-10 rounded-full" src={user.avatar} alt="Jese image" />
                                                    <div class="ps-3">
                                                        <div class="text-base font-semibold">{user.first_name}&nbsp;{user.last_name}</div>                                                    
                                                    </div>
                                                </th>
                                                <td class="px-6 py-4">
                                                    {user.domain}
                                                </td>
                                                <td class="px-6 py-4">
                                                    <div class="flex items-center">
                                                        <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> {user.available ? "Available" : "Unavailable"}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Team