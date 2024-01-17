import { Inter } from 'next/font/google'
import type { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext } from 'next'
import { ImagesList, ImagesListProps, Photo } from '@/components/ImagesList'
import { getMarsRoverImages } from '@/services/nasaApi'
import Filters from '@/components/Filters'
import 'react-loading-skeleton/dist/skeleton.css'
const inter = Inter({ subsets: ['latin'] })


export const getServerSideProps = (async (context: GetServerSidePropsContext) => {
  const response = await getMarsRoverImages(Number(context.query.sol) || 1, Number(context.query.page) || 1)

  const photos: ImagesListProps = await response
  return {
    props: { photos }
  }
})

export default function Home({
  photos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className='flex h-screen justify-center'>
      <div className='flex flex-col w-10/12 justify-center items-center '>
        <Filters ></Filters>
        <ImagesList photos={photos.photos}></ImagesList>
      </div>

    </div>
  )
}

