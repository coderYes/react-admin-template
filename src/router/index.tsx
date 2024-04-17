import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import baseRouter from './baseRouter'
function GetRoutes() {
  //   useEffect(() => {}, [baseRouter])
  return <RouterProvider router={baseRouter} />
}

export default GetRoutes
