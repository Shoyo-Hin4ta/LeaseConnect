import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <main>
        <section className="bg-indigo-600 py-20 px-4">
          <div className="container mx-auto">
            <div className="grid gap-12 md:grid-cols-[1fr_400px] lg:grid-cols-[1fr_500px]">
              <div className="space-y-8">
                <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                  Find Your Ideal Sublease
                </h1>
                <p className="text-xl text-indigo-100 md:text-2xl">
                  Connect with the perfect short-term housing solution for international students and professionals.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">
                    Browse Listings
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-indigo-500">
                    Register
                  </Button>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-indigo-500">
                    Login
                  </Button>
                </div>
              </div>
              <form className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-6 text-indigo-800">Find Your Sublease</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="location" className="block mb-1 text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <Input id="location" type="text" placeholder="Enter a city or zip code" className="w-full" />
                  </div>
                  <div>
                    <label htmlFor="price-range" className="block mb-1 text-sm font-medium text-gray-700">
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
                    <label htmlFor="dates" className="block mb-1 text-sm font-medium text-gray-700">
                      Dates
                    </label>
                    <Input id="dates" type="text" placeholder="Select move-in and move-out dates" className="w-full" />
                  </div>
                  <Button size="lg" className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
                    Search
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-indigo-800">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: '🔍', title: 'Search', description: 'Browse our curated listings to find your ideal sublease.' },
                { icon: '💬', title: 'Connect', description: 'Communicate directly with verified hosts through our platform.' },
                { icon: '🏠', title: 'Move In', description: 'Finalize your booking and enjoy your new temporary home.' },
              ].map((step, index) => (
                <div key={index} className="bg-indigo-50 p-6 rounded-lg shadow-md text-center">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-indigo-700">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-indigo-50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-indigo-800">Ready to Find Your Perfect Sublease?</h2>
            <Button size="lg" className="bg-indigo-600 text-white hover:bg-indigo-700">
              Get Started Now
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-indigo-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Lease Connect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;