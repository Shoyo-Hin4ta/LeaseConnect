const Gallery = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tighter text-gray-900 dark:text-white mb-4">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <img
            key={index}
            src="/placeholder.svg"
            width="300"
            height="200"
            alt={`Gallery image ${index}`}
            className="rounded-lg object-cover aspect-[3/2] hover:opacity-80 transition-opacity cursor-pointer"
          />
        ))}
      </div>
    </div>
  )
}

export default Gallery