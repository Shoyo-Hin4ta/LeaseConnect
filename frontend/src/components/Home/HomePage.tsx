import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { DualRangeSlider } from '../ui/dual-range-slider';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import DateRangeFilter from '../FilterElements/DateRangeFilter/DateRangeFilter';
import { DateRange } from '../ui/date-range-picker';

const HomePage = () => {
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 500, max: 2500 });
  const [pricePeriod, setPricePeriod] = useState<'per_day' | 'per_week' | 'per_month'>('per_day');
  const [dateRange, setDateRange] = useState<DateRange>({ from: new Date(), to: new Date() });
  const [showPriceOptions, setShowPriceOptions] = useState(false);

  const sliderRanges = {
    per_day: { min: 10, max: 1000, step: 10 },
    per_week: { min: 50, max: 5000, step: 50 },
    per_month: { min: 200, max: 20000, step: 100 },
  };

  useEffect(() => {
    const range = sliderRanges[pricePeriod];
    setPriceRange({ min: range.min, max: range.max });
  }, [pricePeriod]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchData = { location, priceRange, pricePeriod, dateRange };
    console.log('Search data:', searchData);
  };

  const handlePriceRangeChange = (newValues: number[]) => {
    setPriceRange({ min: newValues[0], max: newValues[1] });
  };

  const handlePricePeriodChange = (value: 'per_day' | 'per_week' | 'per_month') => {
    setPricePeriod(value);
    const range = sliderRanges[value];
    setPriceRange({ min: range.min, max: range.max });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main>
        <section className="bg-violet-600 py-16 px-4 sm:px-6 lg:px-8 dark:bg-gray-800">
          <motion.div 
            className="container mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="grid gap-12 lg:grid-cols-[1fr_500px]">
              <motion.div className="space-y-6" variants={itemVariants}>
                <motion.h1 
                  className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl"
                  variants={itemVariants}
                >
                  Find Your Ideal Sublease
                </motion.h1>
                <motion.p 
                  className="text-lg text-violet-100 sm:text-xl md:text-2xl dark:text-gray-300"
                  variants={itemVariants}
                >
                  Connect with the perfect short-term housing solution for international students and professionals.
                </motion.p>
                <motion.div className="flex flex-col gap-4" variants={itemVariants}>
                  {/* <div>
                    <Link to="/browse">
                      <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">  
                        Browse Listings 
                      </Button>
                    </Link>
                  </div> */}
                  <div className='flex gap-4'>
                    <Link to="/register">
                      <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                            Register
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="lg" variant="outline" className="bg-violet-600 text-white border-white hover:bg-violet-500 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                        Login
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
              <motion.form 
                onSubmit={handleSearch} 
                className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800"
                variants={itemVariants}
              >
                <h2 className="text-2xl font-semibold mb-6 text-violet-800 dark:text-gray-300">Find Your Sublease</h2>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="location" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Location
                    </label>
                    <Input 
                      id="location" 
                      type="text" 
                      placeholder="Enter a city or zip code" 
                      className="w-full"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-violet-800 dark:text-violet-200">Price Range</h3>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {pricePeriod === 'per_day' ? '/ day' : pricePeriod === 'per_week' ? '/ week' : '/ month'}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="p-0"
                          onClick={() => setShowPriceOptions(!showPriceOptions)}
                        >
                          <ChevronRight className={`h-5 w-5 transition-transform ${showPriceOptions ? 'rotate-90' : ''}`} />
                        </Button>
                      </div>
                    </div>
                    <div className="w-full pl-4 pr-4">
                      <DualRangeSlider
                        label={(value) => <span className="text-sm">${value}</span>}
                        value={[priceRange.min, priceRange.max]}
                        onValueChange={handlePriceRangeChange}
                        className="pt-4 w-full text-violet-800 dark:text-violet-200"
                        min={sliderRanges[pricePeriod].min}
                        max={sliderRanges[pricePeriod].max}
                        step={sliderRanges[pricePeriod].step}
                      />
                    </div>
                    <div className={`transition-all duration-300 ${showPriceOptions ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                      <RadioGroup
                        value={pricePeriod}
                        onValueChange={handlePricePeriodChange}
                        className="flex justify-between"
                      >
                        {['per_day', 'per_week', 'per_month'].map((period) => (
                          <div key={period} className="flex items-center space-x-2">
                            <RadioGroupItem value={period} id={period} />
                            <Label htmlFor={period} className="text-sm text-gray-600 dark:text-gray-400">
                              {period.replace('_', ' ')}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <DateRangeFilter
                    onChange={setDateRange}
                    value={dateRange}
                  />
                  <Button 
                    type="submit"
                    size="lg" 
                    className="w-full bg-violet-600 text-white hover:bg-violet-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    Search
                  </Button>
                </div>
              </motion.form>
            </div>
          </motion.div>
        </section>

        <motion.section 
          className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-violet-800 dark:text-gray-300">How It Works</h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                { icon: '🔍', title: 'Search', description: 'Browse our curated listings to find your ideal sublease.' },
                { icon: '💬', title: 'Connect', description: 'Communicate directly with verified hosts through our platform.' },
                { icon: '🏠', title: 'Move In', description: 'Finalize your booking and enjoy your new temporary home.' },
              ].map((step, index) => (
                <motion.div 
                  key={index} 
                  className="bg-violet-50 p-6 rounded-lg shadow-md text-center dark:bg-gray-700"
                  variants={itemVariants}
                >
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-violet-700 dark:text-gray-300">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          className="py-16 px-4 sm:px-6 lg:px-8 bg-violet-50 dark:bg-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="container mx-auto text-center">
            <motion.h2 
              className="text-3xl font-bold mb-8 text-violet-800 dark:text-gray-300"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Ready to Find Your Perfect Sublease?
            </motion.h2>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            >
              <Link to="/browse">
                <Button size="lg" className="bg-violet-600 text-white hover:bg-violet-700 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500">
                  Get Started Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>
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