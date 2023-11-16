import { Routes, Route } from 'react-router-dom'

import { ROLES } from './config/roles'
import LoggedIn from './features/auth/components/LoggedIn'
import PersistLogin from './features/auth/components/PersistLogin'
import RequireAuth from './features/auth/components/RequireAuth'
import ForgotPassword from './features/auth/ForgotPassword'
import Login from './features/auth/Login'
import ResetPassword from './features/auth/ResetPassword'
import Signup from './features/auth/Signup'
import VerifyOTP from './features/auth/VerifyOTP'
import BattleDetail from './features/battle/BattleDetail'
import OnlineBattles from './features/battle/OnlineBattles'
import FlipBlindCard from './features/kanji/FlipBlindCard'
import KanjiShooter from './features/kanji/KanjiShooter'
import KanjiStack from './features/kanji/KanjiStack'
import StackDetail from './features/kanji/StackDetail'
import Home from './features/user/Home'
import Leaderboards from './features/user/Leaderboards'
import Profile from './features/user/Profile'
import ProfileSetting from './features/user/ProfileSetting'
import UserStats from './features/user/UserStats'

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

        <Route path="/" element={<Home />} />
        <Route path="/kanji" element={<KanjiStack />} />
        <Route path="/kanji/:id" element={<StackDetail />} />
        <Route path="/battles" element={<OnlineBattles />} />
        <Route path="/battle/:id" element={<BattleDetail />} />
        <Route path="/leaderboard" element={<Leaderboards />} />

        {/* PRIVATE ROUTES */}
        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
          <Route path="/player/:username" element={<Profile />} />
          <Route path="/me" element={<UserStats />} />
          <Route path="/settings" element={<ProfileSetting />} />
          <Route path="/play/:stackId/blind-card" element={<FlipBlindCard />} />
          <Route path="/play/:stackId/kanji-shooter" element={<KanjiShooter />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
