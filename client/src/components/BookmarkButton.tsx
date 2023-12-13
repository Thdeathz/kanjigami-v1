import React from 'react'

import SVGMorph from './SvgMorph'

const shape1 = 'm0,0h53v178H0V0Z'
const shape2 = 'm91,0h53v178h-53V0Z'
const shape1_morphed = 'm70.45,134.74l-57.68,43.26V0l56.48,42.36,1.19,92.38Z'
const shape2_morphed = 'm65.52,39.56l67.58,49.44-67.58,49.44V39.56Z'

const initialPath =
  'M26 6H10V18C10 22.6863 11 28 11 28C11 28 17.5273 19.5 18 19.5C18.4727 19.5 25 28 25 28C25 28 26 22.6863 26 18V6Z'
const intermediatePath =
  'M26 6H10V18C10 22.6863 8 31 8 31C8 31 15.9746 26.5 18 23.5C20.0254 26.5 28 31 28 31C28 31 26 22.6863 26 18V6Z'
const finalPath = 'M26 6H10V18V30C10 30 17.9746 23.5 18 23.5C18.0254 23.5 26 30 26 30V18V6Z'
const default_path = 'M26 6H10V18V30C10 30 17.9746 23.5 18 23.5C18.0254 23.5 26 30 26 30V18V6Z'
const initialCornerPath = 'M10 6C10 6 14.8758 6 18 6C21.1242 6 26 6 26 6C26 6 26 6 26 6H10C10 6 10 6 10 6Z'
const intermediateCornerPath1 = 'M10 6C10 6 14.8758 6 18 6C21.1242 6 26 6 26 6C26 6 28 8.5 28 10H8C8 8.5 10 6 10 6Z'
const intermediateCornerPath2 =
  'M9.99999 6C9.99999 6 14.8758 6 18 6C21.1242 6 26 6 26 6C26 6 31 10.5 26 14H9.99999C4.99999 10.5 9.99999 6 9.99999 6Z'
const intermediateCornerPath3 =
  'M7.99998 16.5C7.99998 16.5 9.87579 22.5 18 22.5C26.1242 22.5 28 16.5 28 16.5C28 16.5 31 20 26 23.5H9.99998C4.99998 20 7.99998 16.5 7.99998 16.5Z'
const intermediateCornerPath4 =
  'M8 28C8 28 12.8758 28.5 18 25.5C23.1242 28.5 28 27.5 28 27.5C28 27.5 26 24 26 23.5H10C10 25 8 28 8 28Z'
const finalCornerPath =
  'M10 30C10 30 17.8758 23.5 18 23.5C18.1242 23.5 26 30 26 30C26 30 26 23.5 26 23H10C10 24.5 10 30 10 30Z'

function BookmarkButton() {
  const [followed, setFollowed] = React.useState(true)

  return (
    <button className="flex-center aspect-square w-[15vw]" onClick={() => setFollowed(prev => !prev)}>
      <svg className="w-full" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 178">
        <SVGMorph paths={[initialPath, intermediatePath, finalPath]} state={followed} direction={followed ? 1 : -1} />
        <SVGMorph paths={[initialPath, intermediatePath, finalPath]} state={followed} direction={followed ? 1 : -1} />
        <SVGMorph
          paths={[
            initialCornerPath,
            intermediateCornerPath1,
            intermediateCornerPath2,
            intermediateCornerPath3,
            intermediateCornerPath4,
            finalCornerPath
          ]}
          state={followed}
          direction={followed ? 1 : -1}
        />
      </svg>
    </button>
  )
}

export default BookmarkButton
