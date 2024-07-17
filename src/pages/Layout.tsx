import { Link, Outlet, useLocation } from 'react-router-dom'

function LayoutComponent() {
  const location = useLocation()

  if (location.pathname === '/') {
    return (
      <>
        <header>
          <h1 className="headerTitle">HRnet</h1>
          <Link to="/employees">View Current Employees</Link>
        </header>
        <Outlet />
      </>
    )
  }

  return (
    <>
      <header>
        <h1>Current Employees</h1>
      </header>
      <Outlet />
      <footer>
        <Link to="/">Home</Link>
      </footer>
    </>
  )
}

export default LayoutComponent
