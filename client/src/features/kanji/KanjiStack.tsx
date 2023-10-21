import React from 'react'
import { useDocumentTitle } from 'usehooks-ts'

import { DefaultLayout } from '~/components'

const KanjiStack = () => {
  useDocumentTitle('Kanji Stack | 漢字ガミ')

  return (
    <DefaultLayout>
      <>{console.log('==> re-render')}</>
      <div>Kanji Stack Page</div>
    </DefaultLayout>
  )
}

export default KanjiStack
