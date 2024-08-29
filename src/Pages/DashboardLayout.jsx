import React from 'react';
import Dashboard from  "./Dashboard"; // Ensure correct import path
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
  return (
    <Dashboard>
      <Outlet /> {/* Renders the child route components */}
    </Dashboard>
  );
}

export default DashboardLayout;
