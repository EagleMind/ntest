

import { Suspense, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Modal from './Modal';
import Image from 'next/image'
export interface Camera {
    id: number;
    name: string;
    full_name: string;
}

export interface Rover {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
    max_sol: number;
    max_date: string;
    total_photos: number;
    cameras: Camera[];
}

export interface Photo {
    id: number;
    sol: number;
    camera: Camera;
    img_src: string;
    earth_date: string;
    rover: Rover;
}

export interface ImagesListProps {
    photos: Photo[];

}



export function ImageDisplay({ photos, thumbnail }: { photos: Photo, thumbnail: boolean }) {
    const thumbnailDimensions = 150;
    return (
        <Suspense fallback={<Skeleton></Skeleton>}>
            <div className="flex items-center p-2  justify-between cursor-pointer">
                {thumbnail ? <Image src={photos.img_src} className="rounded-md mr-3" priority width={thumbnailDimensions} height={thumbnailDimensions} alt={photos.camera.full_name} /> : <Image src={photos.img_src} className="rounded-md mr-3" alt={photos.camera.full_name} />}

                <div className='flex flex-col'>
                    <p>{`${photos.camera.full_name}`}</p>
                    <p>{`${photos.earth_date}`}</p>
                    <p>{`${photos.rover.name}`}</p>
                    <div className={`text-center w-32 rounded-lg ${photos.rover.status === "active" ? "bg-green-400" : "bg-red-400"} `}>
                        <p className='text-white'>{`${photos.rover.status}`}</p>
                    </div>

                </div>



            </div>
        </Suspense>
    );
}

export function ImagesList({ photos }: ImagesListProps) {
    const [showModal, setShowModal] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(Number);

    const count = photos.length;
    let heading
    if (count > 0) {
        const noun = count > 1 ? 'Photos' : 'Photo';
        heading = count + ' ' + noun;
    }
    const handleSelectPhoto = (showModal: boolean, selectedPhoto: number) => {
        setShowModal(showModal)
        setSelectedPhoto(selectedPhoto)
    }

    return (
        <section className="flex flex-col  h-3/4 w-1/3 rounded-lg shadow-lg  bg-white m-5">
            <h2 className="text-2xl font-bold text-gray-600 p-3 mx-4">{heading}</h2>
            {showModal &&
                <Modal photos={photos} index={selectedPhoto} onClose={() => setShowModal(false)}>
                </Modal>
            }

            <div className="overflow-y-scroll overflow-x-hidden">
                {photos.map((photo, index) => (
                    <div className='flex items-center justify-between group hover:bg-gray-100 rounded-lg m-4 p-2 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-130 duration-300' key={photo.id}>
                        <ImageDisplay thumbnail={true} photos={photo} />

                        <button data-testid="expand-button" name='modal' className="rounded-lg invisible group-hover:visible mx-3 " onClick={() => handleSelectPhoto(true, index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>





        </section >
    );
}
