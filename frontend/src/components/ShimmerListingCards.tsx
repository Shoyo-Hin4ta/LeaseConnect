import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ShimmerListingCards = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array(count).fill(0).map((_, index) => (
        <Card key={index} className="overflow-hidden transition-shadow duration-300 hover:shadow-xl animate-pulse">
          <CardHeader className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
              </div>
              <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full aspect-[4/3] bg-gray-200"></div>
          </CardContent>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
              </div>
              <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
            </div>
            <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
            <div className="flex justify-end space-x-2">
              <div className="h-9 w-20 bg-gray-200 rounded"></div>
              <div className="h-9 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ShimmerListingCards;