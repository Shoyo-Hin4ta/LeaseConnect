import React, { useEffect, useState } from 'react';
import { Button } from './button';

interface ImageContainerProps {
    height?: string;
    width?: string;
    image?: File | null;
    onRemove?: () => void;
}

const ImageContainer: React.FC<ImageContainerProps> = ({
    height = 'h-56',
    width = 'w-full',
    image = null,
    onRemove
}) => {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (image) {
            const objectUrl = URL.createObjectURL(image);
            setPreview(objectUrl);

            // Free memory when component is unmounted or when the image changes
            return () => {
                URL.revokeObjectURL(objectUrl);
                setPreview(null);
            };
        } else {
            setPreview(null);
        }
    }, [image]); // Ensure useEffect updates when image prop changes

    return (
        <div className={`relative text-center ${width} ${height} rounded-lg border-2 border-black border-dashed dark:border-white flex flex-col gap-0 justify-center items-center`}>
            {image ? (
                <>
                    <img
                        src={preview || ''}
                        alt="Selected"
                        className="h-full w-full object-cover"
                    />
                    {onRemove && (
                        <Button
                            onClick={onRemove}
                            className="absolute right-2 top-2 bg-white text-black px-2 py-1 rounded"
                        >
                            Remove
                        </Button>
                    )}
                </>
            ) : (
                <>
                    <div className="text-5xl font-thin">+</div>
                    <div>Drag and drop or click here to upload image.</div>
                </>
            )}
        </div>
    );
};

export default ImageContainer;
