import { Outlet } from "react-router-dom"
import Navbar from "./components/shared/Navbar"
import Footer from "./components/shared/Footer"
import { Toaster } from "./components/ui/toast"

function Layout() {
  return (
    <div>
      <main>
        <Navbar />
        <Outlet />
        <Toaster />
        <Footer />
      </main>
    </div>
  )
}
export default Layout
