import Link from 'next/link';

const Header = () => {
  return (
    <header className="border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="font-bold text-2xl text-blue-600">
            Cheddar
          </Link>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
          <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
          <Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center space-x-4">
          <Link 
            href="/auth/signin" 
            className="text-gray-600 hover:text-gray-900"
          >
            Sign in
          </Link>
          <Link 
            href="/auth/signup"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;