import React, { MouseEvent } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
interface Photo {
    id: number;
    img_src: string;
}

interface ModalProps {
    onClose: () => void;
    photos: Photo[];
    index: number;
}

const Modal: React.FC<ModalProps> = ({ onClose, photos, index }) => {

    const handleCloseClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onClose();
    };

    return (
        <div className="modal-overlay z-10">
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="modal-header">
                        <a href="#" onClick={handleCloseClick}>
                            x
                        </a>
                    </div>
                    <div className="modal-body">
                        <Carousel
                            dynamicHeight={true}
                            selectedItem={index}
                            showArrows={true}
                            showIndicators={false}
                        >
                            {photos.map((photo) => (
                                <img
                                    key={photo.id}
                                    src={photo.img_src}
                                    className="rounded-md"
                                    alt={`Image ${photo.id}`}
                                    width={800}
                                    height={800}
                                />
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
