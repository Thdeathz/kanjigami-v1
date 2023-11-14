import React from 'react'
import { BsFacebook, BsGithub } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'

import IconWrapper from '../IconWrapper'

function Footer() {
  return (
    <div className="flex min-h-[2.5rem] w-full items-center justify-between border-t border-clr-border-1-light bg-rgb-gray-0.75 px-5 font-bold dark:border-clr-border-1-dark dark:bg-rgb-gray-0-0.75 dark:text-white">
      <p className="text-base text-footer-light-text">© 2023満点チーム</p>
      <div className="flex items-center justify-center gap-6">
        <p className="cursor-pointer underline-offset-2 transition-all hover:underline">FAQs</p>
        <p className="cursor-pointer underline-offset-2 transition-all hover:underline">Contact</p>
        <p className="cursor-pointer underline-offset-2 transition-all hover:underline">Privacy & Terms</p>

        <IconWrapper icon={<BsGithub />} className="cursor-pointer" />
        <IconWrapper icon={<BsFacebook />} className="cursor-pointer" />
        <IconWrapper icon={<MdEmail />} className="cursor-pointer" />
      </div>
    </div>
  )
}

export default Footer
