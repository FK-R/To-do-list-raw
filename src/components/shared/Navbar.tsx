import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <>
      <nav>
        <div className="mb-2 flex justify-center gap-5 border-b p-4 font-bold text-zinc-600">
          <Link to="/todo"> Todo</Link>
          <Link to="/product"> Product</Link>
        </div>
      </nav>
    </>
  )
}
