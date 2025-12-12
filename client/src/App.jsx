import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Team from './components/Team'
import Dashboard from './components/Dashboard'
import MemberDetails from './components/MemberDetails'
const App = () => {
  const appRouter = createBrowserRouter([
    {
      path : "/",
      element : <Dashboard/>
    },
    {
      path : "/team",
      element : <Team/>
    },
    {
      path : "/team/:id",
      element : <MemberDetails/>
    }
  ])
  return (
    <RouterProvider router={appRouter} />
  )
}

export default App