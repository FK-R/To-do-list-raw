import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <>
      <div>
        <footer className="rounded-base border-default m-4 border text-zinc-700 shadow-xs">
          <div className="mx-auto w-full p-4">
            <div className="text-center text-sm">
              © 2023{" "}
              <Link to="/" className="hover:underline">
                Flowbite™
              </Link>
              . All Rights Reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
