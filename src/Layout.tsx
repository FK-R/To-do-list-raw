import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <div>
      <main>
        <Outlet /> {/* this is where the current page renders */}
      </main>
    </div>
  )
}
export default Layout
