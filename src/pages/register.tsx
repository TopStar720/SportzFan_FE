import AuthPageLayout from 'components/Layouts/AuthPage'
import Register from 'views/Auth/Register'

const RegisterPage = () => {
  return <Register />
}

RegisterPage.title = 'Register'
RegisterPage.Layout = AuthPageLayout

export default RegisterPage
