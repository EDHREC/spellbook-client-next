import Head from 'next/head'
import React from 'react'
import { useRouter } from 'next/router'

type Props = {
  children?: React.ReactNode
  title: string
  description: string
  imageUrl?: string
  imageWidth?: string
  imageHeight?: string
  useCropDimensions?: boolean
}

const SpellbookHead = ({
                      children,
                      title,
                      description,
                      imageUrl,
                      imageWidth,
                      imageHeight,
                      useCropDimensions,
                    }: Props) => {
  const router = useRouter()
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
      <meta property='og:title' content={title} />
      <meta property='og:url' content={router.asPath} />
      <meta property='og:type' content='website' />
      <meta property='og:image' content={imageUrl || '/images/link-preview.png'} />
      <meta
        property='og:image:width'
        content={imageWidth || (useCropDimensions ? '626' : '1200')}
      />
      <meta
        property='og:image:height'
        content={imageHeight || (useCropDimensions ? '457' : '628')}
      />
      <meta property='og:image:type' content='image/jpeg' />
      <meta name='twitter:card' content='summary_large_image' />
      {children}
    </Head>
  )
}

export default SpellbookHead