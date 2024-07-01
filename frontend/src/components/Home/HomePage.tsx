import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main>
        <section className="bg-violet-600 py-16 px-4 sm:px-6 lg:px-8 dark:bg-gray-800">
          <div className="container mx-auto">
            <div className="grid gap-12 lg:grid-cols-[1fr_500px]">
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  Find Your Ideal Sublease
                </h1>
                <p className="text-lg text-violet-100 sm:text-xl md:text-2xl dark:text-gray-300">
                  Connect with the perfect short-term housing solution for international students and professionals.
                </p>
                <div className="flex flex-col gap-4">
                  <div>
                    <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                      Browse Listings
                    </Button>
                  </div>
                  <div className='flex gap-4'>
                    <Button size="lg" variant="outline" className="bg-violet-600 text-white border-white hover:bg-violet-500 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                      Register
                    </Button>
                    <Button size="lg" variant="outline" className="bg-violet-600 text-white border-white hover:bg-violet-500 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                      Login
                    </Button>
                  </div>
                </div>
              </div>
              <form className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800">
                <h2 className="text-2xl font-semibold mb-6 text-violet-800 dark:text-gray-300">Find Your Sublease</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="location" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Location
                    </label>
                    <Input id="location" type="text" placeholder="Enter a city or zip code" className="w-full" />
                  </div>
                  <div>
                    <label htmlFor="price-range" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Price Range
                    </label>
                    <Slider
                      defaultValue={[500, 2500]}
                      max={5000}
                      step={100}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="dates" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Dates
                    </label>
                    <Input id="dates" type="text" placeholder="Select move-in and move-out dates" className="w-full" />
                  </div>
                  <Button size="lg" className="w-full bg-violet-600 text-white hover:bg-violet-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                    Search
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-violet-800 dark:text-gray-300">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: '🔍', title: 'Search', description: 'Browse our curated listings to find your ideal sublease.' },
                { icon: '💬', title: 'Connect', description: 'Communicate directly with verified hosts through our platform.' },
                { icon: '🏠', title: 'Move In', description: 'Finalize your booking and enjoy your new temporary home.' },
              ].map((step, index) => (
                <div key={index} className="bg-violet-50 p-6 rounded-lg shadow-md text-center dark:bg-gray-700">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-violet-700 dark:text-gray-300">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-violet-50 dark:bg-gray-700">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-violet-800 dark:text-gray-300">Ready to Find Your Perfect Sublease?</h2>
            <Button size="lg" className="bg-violet-600 text-white hover:bg-violet-700 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500">
              Get Started Now
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-violet-800 text-white py-8 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Lease Connect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;