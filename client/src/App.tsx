import { Routes, Route } from 'react-router-dom'

import ConnectSocket from './components/ConnectSocket'
import { ROLES } from './config/roles'
import CreateKanjiStack from './features/admin/CreateKanjiStack'
import CreateOnlineEvent from './features/admin/CreateOnlineEvent'
import KanjiStackList from './features/admin/KanjiStackList'
import OnlineEventList from './features/admin/OnlineEventList'
import UserList from './features/admin/UserList'
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
import OnlineGame from './features/battle/OnlineGame'
import Play from './features/game/Play'
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
        <Route path="/battles" element={<OnlineBattles />} />
        <Route path="/kanji" element={<KanjiStack />} />
        <Route path="/kanji/:id" element={<StackDetail />} />
        <Route path="/leaderboard" element={<Leaderboards />} />

        {/* PRIVATE ROUTES */}
        <Route element={<RequireAuth allowedRoles={[ROLES.USER]} />}>
          <Route element={<ConnectSocket />}>
            <Route path="/battle/:id" element={<BattleDetail />} />
            <Route path="/battle/:id/:roundId" element={<OnlineGame />} />
          </Route>
          <Route path="/player/:username" element={<Profile />} />
          <Route path="/me" element={<UserStats />} />
          <Route path="/settings" element={<ProfileSetting />} />
          <Route element={<ConnectSocket />}>
            <Route path="/play/:stackId/:gameId" element={<Play />} />
          </Route>
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
    </Routes>
  )
}

export default App
