export default function SettingsLoading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 space-y-8">
          {/* Profile Section */}
          <section className="space-y-4 animate-pulse">
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          </section>

          {/* Account Section */}
          <section className="space-y-4 animate-pulse">
            <div className="h-6 w-28 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  <div className="h-4 w-48 bg-gray-200 rounded"></div>
                </div>
                <div className="h-9 w-48 bg-gray-200 rounded"></div>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <div className="space-y-2">
                  <div className="h-4 w-40 bg-gray-200 rounded"></div>
                  <div className="h-4 w-56 bg-gray-200 rounded"></div>
                </div>
                <div className="h-6 w-11 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </section>

          {/* Platform Section */}
          <section className="space-y-4 animate-pulse">
            <div className="h-6 w-44 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((platform) => (
                <div key={platform} className="flex justify-between items-center py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="h-6 w-6 bg-gray-200 rounded"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                      <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="h-9 w-24 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}