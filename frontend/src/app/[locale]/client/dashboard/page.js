'use client';

import RidePanelRetractil from '@/components/views/Client/RidePanelRetractil';
import Sidebar from '@/components/views/Client/SideBar';
import Topbar from '@/components/views/Client/TopBar';

export default function ClienteDashboard() {
  return (
    <div className="w-full h-full relative">
      <Sidebar />
      <div className="ml-64">
        <Topbar />
      </div>
      <div className="absolute inset-0 bg-slate-200" />


      <RidePanelRetractil />
    </div>
  );
}
