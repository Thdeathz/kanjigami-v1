import React from 'react'
import { BsSearchHeartFill } from 'react-icons/bs'

import FilterBox from '~/components/Filter/FilterBox'
import IconWrapper from '~/components/IconWrapper'

const SearchKanji = () => {
  return (
    <FilterBox>
      <div className="group flex min-w-[20vw] items-center justify-start gap-2 rounded bg-gradient-to-tr from-filter-start-light to-filter-end-light px-2 dark:from-filter-start-dark dark:to-filter-end-dark">
        <IconWrapper
          icon={<BsSearchHeartFill />}
          className="text-lg opacity-60 transition-opacity group-focus:opacity-100"
        />

        <input className="bg-transparent w-full py-2" placeholder="Enter stack name..." />
      </div>
    </FilterBox>
  )
}

export default SearchKanji
