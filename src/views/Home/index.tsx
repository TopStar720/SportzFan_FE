import { useEffect, useState } from 'react'
import ProfileDetailsSection from './components/ProfileDetailsSection'
import MatchesSection from './components/MatchesSection'
import MyActivitySection from './components/MyActivitySection'
import OffersSection from './components/OffersSection'
import PlaySection from './components/PlaySection'
import TellUsSection from './components/TellUsSection'
import { useAppDispatch, useAppSelector } from 'hooks'
import { getActivities } from 'store/activities'
import { getAssets } from 'store/assets'
import { getMatches } from 'store/matches'
import { getUserData, getTeamData } from 'store/user'
import WelcomeModal from 'views/Notification/components/WelcomeModal'
import { getCountIsntSeen } from 'apis/notification'
import { NotificationTypeEnum } from 'views/Notification/types'
import { openNotification } from 'store/notifications'

const Home = () => {
  const dispatch = useAppDispatch()
  const { data } = useAppSelector((state) => state.user)
  const [showWelcomModal, setShowWelcomeModal] = useState<boolean>(false)

  const loadUnreadNotifications = async () => {
    let unreadData = []
    unreadData = (await getCountIsntSeen()).data || []
    if (unreadData.length > 0) {
      const signupNotificaiton = unreadData.find((d) => d.type === NotificationTypeEnum.SignUp)
      if (signupNotificaiton) {
        dispatch(openNotification({ id: signupNotificaiton.id }))
        setShowWelcomeModal(true)
      }
    }
  }

  useEffect(() => {
    if (data.id !== '') {
      loadUnreadNotifications()
    }
  }, [data.id])

  useEffect(() => {
    dispatch(getUserData())
    dispatch(getTeamData())
    dispatch(getMatches())
    dispatch(getAssets())
    dispatch(getActivities())
  }, [dispatch])

  return (
    <div className="py-10">
      <div className="pt-10">
        <ProfileDetailsSection />
      </div>
      <div className="pt-40">
        <TellUsSection />
      </div>
      <div className="pt-40">
        <PlaySection />
      </div>
      <div className="pt-40">
        <MatchesSection />
      </div>
      <div className="pt-40">
        <MyActivitySection />
      </div>
      <div className="pt-40">
        <OffersSection />
      </div>
      <WelcomeModal show={showWelcomModal} onClose={() => setShowWelcomeModal(false)} />
    </div>
  )
}

export default Home
