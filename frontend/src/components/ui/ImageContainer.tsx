import React, { useEffect, useState } from 'react';
import { Button } from './button';

interface ImageContainerProps {
    image?: File | null;
    onRemove?: (event: React.MouseEvent) => void;
    width?: string;
    height?: string;
    isProfilePicture?: boolean;
  }

const ImageContainer: React.FC<ImageContainerProps> = ({
    image = null,
    onRemove,
    width = 'w-full',
    height = 'h-64',
    isProfilePicture = false
}) => {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (image) {
            const objectUrl = URL.createObjectURL(image);
            setPreview(objectUrl);

            return () => {
                URL.revokeObjectURL(objectUrl);
                setPreview(null);
            };
        } else {
            setPreview(null);
        }
    }, [image]);

    const containerClasses = isProfilePicture
        ? 'w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80 mx-auto'
        : `${width} ${height}`;

        return (
            <div className={`relative ${containerClasses} rounded-lg border-2 border-violet-300 dark:border-violet-600 border-dashed overflow-hidden group transition-all duration-300 hover:border-violet-500 dark:hover:border-violet-400`}>
              {image ? (
                <>
                  <img
                    src={preview || ''}
                    alt={isProfilePicture ? "Selected Profile Picture" : "Selected Image"}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {onRemove && (
                    <Button
                      type='button'
                      onClick={(e) => onRemove(e)}
                      className="absolute right-2 top-2 bg-white dark:bg-gray-800 text-violet-600 dark:text-violet-400 px-2 py-1 rounded shadow-md transition-opacity duration-300"
                    >
                      Remove
                    </Button>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-violet-500 dark:text-violet-400 p-4">
                    <div className="text-4xl font-thin mb-2">+</div>
                    <div className="text-center">
                        <p className="text-sm">{isProfilePicture ? "Upload Profile Picture" : "Upload Image"}</p>
                        <p className="text-xs mt-2 text-violet-500 dark:text-violet-400">Click or drag and drop</p>
                        <p className="text-xs mt-1 text-violet-400 dark:text-violet-500">JPG, PNG, WebP</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageContainer;



