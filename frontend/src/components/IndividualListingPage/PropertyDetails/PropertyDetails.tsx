import { Button } from '@/components/ui/button'
import Gallery from '../Gallery'

const PropertyDetails = () => {
  return (
    <div className="grid gap-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div>
        <h2 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-white mb-4">Property Details</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['Apartment', '3 Bedrooms', '2 Bathrooms', '1,800 sq ft', 'Built in 2018', '$400/month'].map((detail, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span>{detail}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tighter text-gray-900 dark:text-white mb-2">Sublease Period</h2>
        <div className="text-gray-600 dark:text-gray-300">
          <span>June 1, 2024 - August 31, 2024</span>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tighter text-gray-900 dark:text-white mb-2">Address Details</h2>
        <div className="space-y-1 text-gray-600 dark:text-gray-300">
          <div>123 Mountain View Road</div>
          <div>Boulder, Colorado</div>
          <div>United States - 80302</div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tighter text-gray-900 dark:text-white mb-4">Other Details</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {['Preferences', 'Utilities', 'Amenities'].map((category, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{category}</h3>
              <div className="grid grid-cols-2 gap-2">
                {['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'].map((item, itemIndex) => (
                  <span key={itemIndex} className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Gallery />      

      <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Listed By: Ritik Singh
      </div>
    </div>
  )
}

export default PropertyDetails