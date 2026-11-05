import { Outlet } from "react-router-dom"
import Navbar from "./components/shared/Navbar"

function Layout() {
  return (
    <div>
      <main>
        <Navbar />
        <Outlet /> {/* this is where the current page renders */}
      </main>
    </div>
  )
}
export default Layout
