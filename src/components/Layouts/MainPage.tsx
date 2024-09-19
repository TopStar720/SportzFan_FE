import { useState } from 'react'
import { AuthenticatedWrapper } from './AuthWrapper'
import { MaintenanceWrapper } from './MaintenanceWrapper'
import Header from './Header'
import Sidebar from './Sidebar'

const MainPageLayout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false)

  return (
    <MaintenanceWrapper>
      <AuthenticatedWrapper>
        <div className="bg-sf-zinc-900">
          <div className="flex justify-center bg-gradient-to-b from-sf-rose-700/70 to-sf-zinc-1000/0">
            <div className="container">
              <Header onMenuClick={() => setOpenSidebar(true)} />
            </div>
          </div>
          <div className="app-container flex justify-center relative">
            <div className="absolute inset-0 max-h-screen bg-[url('/assets/images/bg.png')] bg-cover bg-center" />
            <div className="container z-10">
              <div className="flex py-20">
                <Sidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />
                <main className="main pl-0 lg:pl-24">{children}</main>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedWrapper>
    </MaintenanceWrapper>
  )
}

export default MainPageLayout
