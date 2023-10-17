import { Routes, Route } from 'react-router-dom'

import { ROLES } from './config/roles'
import Login from './features/auth/Login'
import Signup from './features/auth/Signup'
import PersistLogin from './features/auth/components/PersistLogin'
import RequireAuth from './features/auth/components/RequireAuth'
import LoggedIn from './features/auth/components/LoggedIn'
import ResetPassword from './features/auth/ResetPassword'
import ForgotPassword from './features/auth/ForgotPassword'
import VerifyOTP from './features/auth/VerifyOTP'
import Home from './features/user/Home'
import Profile from './features/user/Profile'
import UserStats from './features/user/UserStats'
import ProfileSetting from './features/user/ProfileSetting'
import Leaderboards from './features/user/Leaderboards'
import OnlineBattles from './features/battle/OnlineBattles'
import KanjiStack from './features/kanji/KanjiStack'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PersistLogin />}>
        {/* PUBLIC ROUTES */}
        <Route element={<LoggedIn />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyOTP />} />
        </Route>

        {/* <Route element={<PersistLogin />}> */}
        <Route path="/" element={<Home />} />
        <Route path="/kanji" element={<KanjiStack />} />
        <Route path="/battles" element={<OnlineBattles />} />
        <Route path="/leaderboard" element={<Leaderboards />} />

        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
          <Route path="/player/:username" element={<Profile />} />
          <Route path="/me" element={<UserStats />} />
          <Route path="/settings" element={<ProfileSetting />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
