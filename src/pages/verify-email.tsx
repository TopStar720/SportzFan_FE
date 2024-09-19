import AuthPageLayout from 'components/Layouts/AuthPage'
import Verify from 'views/Auth/Verify'

const VerifyPage = () => {
  return <Verify />
}

VerifyPage.title = 'Verify Email'
VerifyPage.Layout = AuthPageLayout

export default VerifyPage
