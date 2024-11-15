import Button from "@/components/Ui/Button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="flex-1 mb-8 lg:mb-0 lg:mr-12 text-center lg:text-left">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
              Welcome to the Crowdfunding Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover and support innovative projects. Contribute funds to exciting new ideas and help bring them to life. Your support makes all the difference!
            </p>
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col justify-center lg:justify-start">
            {/* Added margin-top to position the button lower */}
            <div className="mt-8 lg:mt-12 flex justify-center lg:justify-start">
              <Link href="/projects">
                <Button color="bg-blue-700" text="Explore Projects" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
