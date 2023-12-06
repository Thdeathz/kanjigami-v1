import React from 'react'
import { RiSwordFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

import Button from '~/components/Button'
import Loading from '~/components/Loading'
import Section from '~/components/Section'
import { onlineBattleStatus } from '~/config/status'
import BattleInfo from '~/features/battle/components/BattleInfo'
import { useGetBattlesQuery } from '~/features/battle/store/battleService'

function LastestBattleSection() {
  const navigate = useNavigate()
  const { data: battle, isLoading } = useGetBattlesQuery({
    status: onlineBattleStatus.FINISHED,
    page: 1
  })

  if (isLoading)
    return (
      <Section
        title="Latest battle"
        description="Compete with players around the world"
        icon={<RiSwordFill />}
        viewButton={<Button onClick={() => navigate('/battles')}>View all battles</Button>}
      >
        <div className="py-12">
          <Loading className="text-3xl" />
        </div>
      </Section>
    )

  if (!battle) return <></>

  return (
    <Section
      title="Latest battle"
      description="Compete with players around the world"
      icon={<RiSwordFill />}
      viewButton={<Button onClick={() => navigate('/battles')}>View all battles</Button>}
    >
      <BattleInfo status={battle.data[0].status} battle={battle.data[0]} />
    </Section>
  )
}

export default LastestBattleSection
