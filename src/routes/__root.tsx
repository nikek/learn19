import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import './__root.css'

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="main-nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/useTransition/pendingButton">Pending Button</Link>
        <Link to="/useOptimistic/calculation">Calculation</Link>
        <Link to="/useOptimistic/addToList">Add to List</Link>
        <Link to="/useActionState/counter">Counter</Link>
        <Link to="/useActionState/formState">Form State</Link>
        <Link to="/useDeferredValue/filterList">Filter List</Link>
        <Link to="/useDeferredValue/heavyComputation">Heavy Computation</Link>
        <Link to="/useDeferredValue/asyncFilter">Async Filter</Link>
      </nav>
      <hr />
      <Outlet />
    </>
  ),
})
