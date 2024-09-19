import PwaDownloadModal from 'components/PwaDownload/PwaDownloadModal'
import { UnauthenticatedWrapper } from './AuthWrapper'
import { MaintenanceWrapper } from './MaintenanceWrapper'

const AuthPageLayout = ({ children }) => {
  return (
    <MaintenanceWrapper>
      <UnauthenticatedWrapper>
        <div className="min-h-screen flex justify-center items-center bg-sf-zinc-900 relative">
          <div className="absolute inset-0 max-h-screen bg-[url('/assets/images/bg.png')] bg-cover bg-center" />
          <main className="relative w-full max-w-376 px-24 py-30">{children}</main>
        </div>
        <PwaDownloadModal />
      </UnauthenticatedWrapper>
    </MaintenanceWrapper>
  )
}

export default AuthPageLayout
