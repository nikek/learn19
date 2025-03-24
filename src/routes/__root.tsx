import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import './__root.css'

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="main-nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/useTransition/pendingButton">Pending Button</Link>
      </nav>
      <hr />
      <Outlet />
    </>
  ),
})
