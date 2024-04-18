import { Sidebar } from '@/component/Admin/Sidebar/Sidebar';
import React from 'react'
import { Outlet } from "react-router-dom";
function Admin() {
  return (
    <div className="grid grid-cols-5 gap-4">
    <Sidebar/>
    <div className="col-start-2 col-end-6">
      <Outlet />
    </div>
  </div>
  )
}

export default Admin