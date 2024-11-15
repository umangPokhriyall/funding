import Link from "next/link";
import Button from "../Ui/Button";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
    return (
        <header>
            <nav>
                <div className="flex justify-between items-center px-6 py-4 bg-gray-100">
                    {/* Left section: Logo */}
                    <div className="text-xl text-black font-bold cursor-pointer">
                        <Link href="/">
                            Logo
                        </Link>
                    </div>

                    {/* Center section: Projects and Search */}
                    <div className="flex space-x-8 items-center">
                        <Link href="/projects">
                            <span className="cursor-pointer">Projects</span>
                        </Link>
                        <div className="flex items-center bg-white rounded-full px-4 py-2">
                            <input
                                type="text"
                                placeholder="Search"
                                className="bg-white text-black placeholder-gray-400 focus:outline-none"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5 ml-2 text-gray-400"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-4.35-4.35M15 11a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Right section: Buttons */}
                    <div className="flex space-x-4">
                        {/* Create Project Button */}
                        <Link href="/create-project">
                            <Button color="bg-pink-500" text="Create a Project" />
                        </Link>

                        {/* Sign In Button */}
                        <ConnectButton />
                    </div>
                </div>
            </nav>
        </header>
    );
}