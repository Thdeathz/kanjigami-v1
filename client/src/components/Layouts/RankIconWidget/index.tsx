import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useToggle } from 'usehooks-ts'

import RankIcon from '~/assets/bronze.png'
import Image from '~/components/Image'

import styles from './RankIcon.module.css'

function RankIconWidget() {
  const [showRankName, toggle, setShowRankName] = useToggle(false)

  return (
    <motion.div className="rank-widget relative top-[-2rem] h-0">
      <img className={styles.rays} />

      <Link
        to="/leaderboard"
        className={styles.widgetMain}
        onMouseOver={() => setShowRankName(true)}
        onMouseOut={() => setShowRankName(false)}
      >
        <svg
          width="103"
          height="102"
          viewBox="0 0 103 102"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute top-[-24px] z-[-1] drop-shadow-rank-icon-light dark:drop-shadow-rank-icon-dark"
        >
          <defs>
            <clipPath id="clip">
              <rect width="103" height="102" fill="white" />
            </clipPath>
            <filter
              id="filter"
              x="-60"
              y="-30"
              width="223"
              height="221.498"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_974_2969" />
            </filter>
            <linearGradient id="paint" x1="-40" y1="-31" x2="101" y2="106" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--rank-widget-clr-1)" />
              <stop offset="1" stopColor="var(--rank-widget-clr-2)" />
            </linearGradient>
          </defs>

          <g clipPath="url(#clip)">
            <g filter="url(#filter)">
              <path
                d="M0 0H103V82.7685C103 86.4326 100.511 89.6284 96.958 90.5252L55.416 101.011C52.8456 101.66 50.1544 101.66 47.584 101.011L6.042 90.5252C2.4893 89.6284 0 86.4326 0 82.7685V0Z"
                fill="url(#paint)"
              />
            </g>
          </g>
        </svg>

        <div className="absolute left-[-32px] top-[-32px] z-[-1] aspect-square h-[96px] rounded-[50%] bg-[#ffffff] opacity-50 blur-[32px] dark:bg-[#3c4750]" />
        <div className="absolute left-[-8px] top-[-8px] z-[-1] aspect-square h-[48px] rounded-[50%] bg-[#ffffff] blur-[32px] dark:bg-[#3c4750]" />

        <div className="flex-center absolute left-0 right-0 h-full">
          {showRankName ? (
            <div className="flex-center app-icon flex-col gap-1 font-medium">
              <motion.p
                animate={{ y: 0, opacity: 1 }}
                initial={{ y: -10, opacity: 0 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ delay: 0.1 }}
              >
                Kanji
              </motion.p>

              <motion.p
                animate={{ y: 0, opacity: 1 }}
                initial={{ y: -10, opacity: 0 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                Kunoichi
              </motion.p>
            </div>
          ) : (
            <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}>
              <Image src={RankIcon} className="w-[4.5rem] object-contain" />
            </motion.div>
          )}
        </div>
      </Link>

      <div className={styles.bar} />
      <div className={styles.bar} />
      <div className={styles.bar} />
      <div className={styles.bar} />
    </motion.div>
  )
}

export default RankIconWidget
