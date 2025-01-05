export default function CalendarLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6 animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded"></div>
        <div className="flex items-center space-x-4">
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 animate-pulse">
          <div className="flex justify-between items-center">
            <div className="h-8 w-36 bg-gray-200 rounded"></div>
            <div className="h-8 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {[...Array(7)].map((_, i) => (
            <div key={`header-${i}`} className="bg-gray-50 py-2">
              <div className="h-4 mx-2 bg-gray-200 rounded"></div>
            </div>
          ))}
          {[...Array(35)].map((_, i) => (
            <div key={`cell-${i}`} className="aspect-square bg-white p-2">
              <div className="h-4 w-4 mb-2 bg-gray-200 rounded"></div>
              <div className="h-3 w-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}