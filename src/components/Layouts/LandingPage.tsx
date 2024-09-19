import PwaDownloadModal from 'components/PwaDownload/PwaDownloadModal'
import { UnauthenticatedWrapper } from './AuthWrapper'
import { MaintenanceWrapper } from './MaintenanceWrapper'

const LandingPageLayout = ({ children }) => {
  return (
    <MaintenanceWrapper>
      <UnauthenticatedWrapper>
        {children}
        <PwaDownloadModal />
      </UnauthenticatedWrapper>
    </MaintenanceWrapper>
  )
}

export default LandingPageLayout
