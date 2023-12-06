import { Routes, Route } from 'react-router-dom'

import { ROLES } from './config/roles'
import CreateKanjiStack from './features/admin/CreateKanjiStack'
import CreateOnlineEvent from './features/admin/CreateOnlineEvent'
import KanjiStackList from './features/admin/KanjiStackList'
import OnlineEventList from './features/admin/OnlineEventList'
import UserList from './features/admin/UserList'
import LoggedIn from './features/auth/components/LoggedIn'
import PersistLogin from './features/auth/components/PersistLogin'
import Prefetch from './features/auth/components/Prefetch'
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
import MultipleChoice from './features/kanji/MultipleChoice'
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
        <Route element={<Prefetch />}>
          {/* PUBLIC ROUTES */}
          <Route element={<LoggedIn />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyOTP />} />
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="/battles" element={<OnlineBattles />} />
          <Route path="/kanji" element={<KanjiStack />} />
          <Route path="/kanji/:id" element={<StackDetail />} />
          <Route path="/battle/:id" element={<BattleDetail />} />
          <Route path="/leaderboard" element={<Leaderboards />} />

          {/* PRIVATE ROUTES */}
          <Route element={<RequireAuth allowedRoles={[ROLES.USER]} />}>
            <Route path="/player/:username" element={<Profile />} />
            <Route path="/me" element={<UserStats />} />
            <Route path="/settings" element={<ProfileSetting />} />
            <Route path="/play/:stackId/blind-flip-card" element={<FlipBlindCard />} />
            <Route path="/play/:stackId/kanji-shooter" element={<KanjiShooter />} />
            <Route path="/play/:stackId/multiple-choice" element={<MultipleChoice />} />
          </Route>
        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="/admin/kanjis">
            <Route index element={<KanjiStackList />} />
            <Route path="create" element={<CreateKanjiStack />} />
          </Route>
          <Route path="/admin/events">
            <Route index element={<OnlineEventList />} />
            <Route path="create" element={<CreateOnlineEvent />} />
          </Route>
          <Route path="/admin/users">
            <Route index element={<UserList />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
