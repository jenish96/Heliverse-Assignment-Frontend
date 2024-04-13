
function Header() {
    return (
        <nav id="header" class="w-full z-30 py-1 fixed  bg-white shadow-lg border-b border-purple-400">
            <div class="w-full flex items-center justify-between mt-0 px-6 py-2">
                <label for="menu-toggle" class="cursor-pointer md:hidden block">
                    <svg class="fill-current text-blue-600" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <title>menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                    </svg>
                </label>
                <input class="hidden" type="checkbox" id="menu-toggle" />

                <div className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1" id="menu">
                    <nav>
                        <ul class="md:flex items-center justify-between text-base text-blue-600 pt-4 md:pt-0">
                            <li><a class="inline-block no-underline hover:text-black font-medium text-lg py-2 px-8 lg:-ml-2" href="/">Users</a></li>
                            <li><a class="inline-block no-underline hover:text-black font-medium text-lg py-2 px-8 lg:-ml-2" href="/team">Teams</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </nav>
    )
}

export default Header