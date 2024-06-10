
interface ImageContainerDim{
    height? : string,
    width? : string,
    image? : File | null
}

const ImageContainer = ({height='full', width='full', image=null} : ImageContainerDim) => {
  return (
    <div className={`text-center w-${width} h-${height} rounded-lg border-2 border-black border-dashed flex flex-col gap-10 justify-center items-center`}>
        {image ? (
            
                <img
                    src={URL.createObjectURL(image)}
                    alt="Selected"
                    className="max-h-full max-w-full object-cover"
                />
            ) : (
            <>
              <div className="text-5xl font-thin">
                +
              </div>
              <div>
                  Drag and drop or click here to upload image.
              </div>
            </>)
        
        }
        
    </div>
    
  )
}

export default ImageContainer