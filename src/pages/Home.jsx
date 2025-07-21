"use client"

import { Link } from "react-router-dom"
import { Heart, Shield, Sparkles, Users, MessageCircle, Star, LogOut } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"
import { useAuth } from "../context/AuthContext"

const Home = () => {
  const { user, logout } = useAuth()

  const handleSignOut = () => {
    logout()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">MatchMe</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Pricing
            </a>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Dashboard
                </Link>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="flex items-center space-x-2 bg-transparent"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Login
                </Link>
                <Link to="/register">
                  <Button className="bg-pink-500 hover:bg-pink-600">Get Started</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300">
            AI-Powered Matchmaking
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Find Your Perfect
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"> Match</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect with meaningful relationships through our intelligent matching system, secure communication, and
            AI-powered compatibility analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3">
                  Start Your Journey
                </Button>
              </Link>
            )}
            <a href="#features">
              <Button size="lg" variant="outline" className="px-8 py-3 bg-transparent">
                Learn More
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose MatchMe?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with human intuition to create meaningful connections.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow p-6">
              <Sparkles className="h-12 w-12 text-pink-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Matching</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our advanced algorithm analyzes compatibility based on interests, values, and communication patterns.
              </p>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow p-6">
              <Shield className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Privacy & Security</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your data is protected with end-to-end encryption and GDPR-compliant privacy controls.
              </p>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow p-6">
              <MessageCircle className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Communication</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Real-time chat with sentiment analysis to build trust and meaningful conversations.
              </p>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow p-6">
              <Users className="h-12 w-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Verified Profiles</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All profiles go through verification to ensure authenticity and build a trusted community.
              </p>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow p-6">
              <Star className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Relationship Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track your relationship progress with milestone celebrations and compatibility insights.
              </p>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow p-6">
              <Heart className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Success Stories</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Join thousands of couples who found love through our intelligent matching system.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Start free and upgrade when you're ready for premium features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Perfect for getting started</p>
              <div className="text-3xl font-bold mb-6">
                $0<span className="text-lg font-normal">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Basic profile creation
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>5 matches per day
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Limited chat messages
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Basic search filters
                </li>
              </ul>
              <Link to="/register">
                <Button className="w-full bg-transparent" variant="outline">
                  Get Started Free
                </Button>
              </Link>
            </Card>

            <Card className="border-2 border-pink-500 relative p-6">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-pink-500">Most Popular</Badge>
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Unlock all features</p>
              <div className="text-3xl font-bold mb-6">
                $29<span className="text-lg font-normal">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Unlimited matches
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Unlimited chat messages
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Advanced search filters
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  See who viewed your profile
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Priority customer support
                </li>
              </ul>
              <Link to="/register">
                <Button className="w-full bg-pink-500 hover:bg-pink-600">Upgrade to Premium</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-pink-500" />
                <span className="text-xl font-bold">MatchMe</span>
              </div>
              <p className="text-gray-400">
                Connecting hearts through intelligent matchmaking and meaningful relationships.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-white">
                    About
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/help" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-white">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/careers" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MatchMe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
