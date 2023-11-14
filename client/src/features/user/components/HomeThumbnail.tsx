import { Carousel } from 'antd'
import React from 'react'

import Image from '~/components/Image'
import Section from '~/components/Section'

function HomeThumbnail() {
  return (
    <Section title="Welcome to ⚔️ 漢字ガミ" description="Let's explore this website and learn a lot of kanji">
      <div className="h-[32rem] rounded-xl border-2 border-clr-border-1-light p-4 dark:border-clr-border-1-dark">
        <Carousel className="w-carousel" effect="fade" autoplay>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/demo.jpeg?alt=media&token=f05ecb5f-45d9-4cd0-983c-49f1436f131f"
            alt="app-slide-show"
            className="h-[30rem] rounded-xl object-cover shadow-light-panel dark:shadow-dark-panel"
          />

          <Image
            src="https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/ec3874d70132bbbc558dd791f4924166.jpg?alt=media&token=fba76343-48c1-4d19-8bcd-435176dc5fbc"
            alt="app-slide-show"
            className="h-[30rem] rounded-xl object-cover shadow-light-panel dark:shadow-dark-panel"
          />

          <Image
            src="https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/005347bc119fd9ca954d3373a72fa240.jpg?alt=media&token=c32d888d-ae0a-41f7-9f81-51f52d35a97e"
            alt="app-slide-show"
            className="h-[30rem] rounded-xl object-cover shadow-light-panel dark:shadow-dark-panel"
          />

          <Image
            src="https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/c3ba2edb45f9a8b7a99c6c1d233371ea.jpg?alt=media&token=2ac6fc39-f1ab-4f79-9583-3dfaa8ab521b"
            alt="app-slide-show"
            className="h-[30rem] rounded-xl object-cover shadow-light-panel dark:shadow-dark-panel"
          />

          <Image
            src="https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/c346036ece7e875d6a92f743b06a40db.jpg?alt=media&token=953a76f9-ad24-44a4-8330-0145eafe0a2f"
            alt="app-slide-show"
            className="h-[30rem] rounded-xl object-cover shadow-light-panel dark:shadow-dark-panel"
          />
        </Carousel>
      </div>
    </Section>
  )
}

export default HomeThumbnail
