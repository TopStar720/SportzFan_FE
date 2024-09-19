import AuthPageLayout from 'components/Layouts/AuthPage'
import Login from 'views/Auth/Login'

const LoginPage = () => {
  return <Login />
}

LoginPage.title = 'Login'
LoginPage.Layout = AuthPageLayout

export default LoginPage
