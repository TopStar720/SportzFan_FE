import { AuthenticatedWrapper } from './AuthWrapper'
import { MaintenanceWrapper } from './MaintenanceWrapper'
import Header from './Header'

const LivePageLayout = ({ children }) => {
  return (
    <MaintenanceWrapper>
      <AuthenticatedWrapper>
        <div className="bg-sf-zinc-900">
          <div className="flex justify-center bg-gradient-to-b from-sf-rose-700/70 to-sf-zinc-1000/0">
            <div className="container">
              <Header disabled />
            </div>
          </div>
          <div className="app-container flex justify-center relative">
            <div className="absolute inset-0 max-h-screen bg-[url('/assets/images/bg.png')] bg-cover bg-center" />
            <div className="container z-10">
              <main className="xl:px-80 2xl:px-110 py-30">{children}</main>
            </div>
          </div>
        </div>
      </AuthenticatedWrapper>
    </MaintenanceWrapper>
  )
}

export default LivePageLayout
