import PwaDownloadModal from 'components/PwaDownload/PwaDownloadModal'
import { MaintenanceWrapper } from './MaintenanceWrapper'

const MaintenancePageLayout = ({ children }) => {
  return (
    <MaintenanceWrapper>
      <div className="min-h-screen flex justify-center items-center bg-sf-zinc-900 relative">
        <div className="absolute inset-0 max-h-screen bg-[url('/assets/images/bg.png')] bg-cover bg-center" />
        <main className="relative w-full max-w-376 px-24 py-30">{children}</main>
      </div>
      <PwaDownloadModal />
    </MaintenanceWrapper>
  )
}

export default MaintenancePageLayout
