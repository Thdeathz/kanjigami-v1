import { Select } from 'antd'
import type { SelectProps } from 'antd/es/select'
import React, { useState } from 'react'
import { useDebounce } from 'usehooks-ts'

import Loading from '~/components/Loading'

import { useSearchStacksQuery } from '../../store/adminService'

type PropsType<ValueType = ISearchStackResult> = Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'>

function StackSearch({ ...props }: PropsType) {
  const [searchValue, setSearchValue] = useState<string>('')
  const debounceSearch = useDebounce<string>(searchValue, 800)
  const { data: stacks, isLoading, isFetching } = useSearchStacksQuery(debounceSearch)

  const handleSearch = (value: string) => {
    if (value.trim().length === 0) return

    setSearchValue(value)
  }

  return (
    <Select
      popupClassName="bg-divider-light dark:bg-divider-dark text-text-light dark:text-text-dark"
      showSearch
      filterOption={false}
      onSearch={handleSearch}
      notFoundContent={
        isLoading || isFetching ? (
          <Loading className="text-lg" />
        ) : (
          <p className="px-6 text-center font-medium opacity-50">No stack found</p>
        )
      }
      {...props}
      options={stacks?.map(stack => ({ value: JSON.stringify(stack), label: stack.name }))}
    />
  )
}

export default StackSearch
