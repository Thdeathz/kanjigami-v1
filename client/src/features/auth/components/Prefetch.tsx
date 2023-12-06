import React from 'react'
import { Outlet } from 'react-router-dom'
import { useEffectOnce } from 'usehooks-ts'

import store from '~/app/store'
import { onlineBattleStatus } from '~/config/status'
import { battleService } from '~/features/battle/store/battleService'

function Prefetch() {
  useEffectOnce(() => {
    store.dispatch(
      battleService.util.prefetch(
        'getBattles',
        {
          status: onlineBattleStatus.ONGOING,
          page: store.getState().battle.onGoingCurrentPage
        },
        { force: true }
      )
    )

    store.dispatch(
      battleService.util.prefetch(
        'getBattles',
        {
          status: onlineBattleStatus.UPCOMING,
          page: store.getState().battle.upComingCurrentPage
        },
        { force: true }
      )
    )

    store.dispatch(
      battleService.util.prefetch(
        'getBattles',
        {
          status: onlineBattleStatus.FINISHED,
          page: store.getState().battle.finishedCurrentPage
        },
        { force: true }
      )
    )
  })

  return <Outlet />
}

export default Prefetch
