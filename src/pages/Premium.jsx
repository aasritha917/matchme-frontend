"use client"

import { useState } from "react"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"
import { Heart, ArrowLeft, Crown, Check, Star, Zap, Eye, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"

const Premium = () => {
  const [selectedPlan, setSelectedPlan] = useState("monthly")

  const plans = {
    monthly: {
      price: 29,
      period: "month",
      savings: null,
    },
    quarterly: {
      price: 69,
      period: "3 months",
      savings: "Save 20%",
    },
    yearly: {
      price: 199,
      period: "year",
      savings: "Save 43%",
    },
  }

  const features = [
    {
      icon: Heart,
      title: "Unlimited Matches",
      description: "Connect with as many people as you want",
      free: "5 per day",
      premium: "Unlimited",
    },
    {
      icon: MessageCircle,
      title: "Unlimited Messages",
      description: "Chat without restrictions",
      free: "Limited",
      premium: "Unlimited",
    },
    {
      icon: Eye,
      title: "See Who Viewed You",
      description: "Know who's interested in your profile",
      free: false,
      premium: true,
    },
    {
      icon: Star,
      title: "Priority Matching",
      description: "Get shown to more people",
      free: false,
      premium: true,
    },
    {
      icon: Zap,
      title: "Advanced Filters",
      description: "Filter by education, lifestyle, and more",
      free: "Basic",
      premium: "Advanced",
    },
    {
      icon: Crown,
      title: "Premium Badge",
      description: "Stand out with a premium badge",
      free: false,
      premium: true,
    },
  ]

  const handleUpgrade = () => {
    console.log("Upgrading to premium:", selectedPlan)
    // Here you would integrate with payment processing
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Crown className="h-6 w-6 text-yellow-500" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Premium</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full mb-4">
            <Crown className="h-5 w-5" />
            <span className="font-semibold">Upgrade to Premium</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Find Love Faster with Premium</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get unlimited matches, advanced features, and priority support to find your perfect match.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(plans).map(([key, plan]) => (
              <Card
                key={key}
                className={`p-6 cursor-pointer transition-all ${
                  selectedPlan === key
                    ? "border-pink-500 ring-2 ring-pink-200 dark:ring-pink-800"
                    : "hover:border-pink-300"
                }`}
                onClick={() => setSelectedPlan(key)}
              >
                {plan.savings && <Badge className="bg-green-500 text-white mb-4">{plan.savings}</Badge>}
                <div className="text-center">
                  <h3 className="text-lg font-semibold capitalize mb-2">{key}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-gray-500">/{plan.period}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {key === "monthly" && "$29 per month"}
                    {key === "quarterly" && "$23 per month"}
                    {key === "yearly" && "$16.58 per month"}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Comparison */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Premium vs Free</h2>
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
              {/* Header */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 font-semibold">Features</div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 font-semibold text-center">Free</div>
              <div className="p-4 bg-pink-50 dark:bg-pink-900/20 font-semibold text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Crown className="h-4 w-4 text-yellow-500" />
                  <span>Premium</span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800"></div>

              {/* Features */}
              {features.map((feature, index) => (
                <div key={index} className="contents">
                  <div className="p-4 border-t flex items-center space-x-3">
                    <feature.icon className="h-5 w-5 text-pink-500" />
                    <div>
                      <p className="font-medium">{feature.title}</p>
                      <p className="text-sm text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                  <div className="p-4 border-t text-center">
                    {typeof feature.free === "boolean" ? (
                      feature.free ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-gray-400">—</span>
                      )
                    ) : (
                      <span className="text-sm">{feature.free}</span>
                    )}
                  </div>
                  <div className="p-4 border-t bg-pink-50 dark:bg-pink-900/20 text-center">
                    {typeof feature.premium === "boolean" ? (
                      feature.premium ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-gray-400">—</span>
                      )
                    ) : (
                      <span className="text-sm font-medium">{feature.premium}</span>
                    )}
                  </div>
                  <div className="p-4 border-t"></div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-md mx-auto p-8 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
            <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Ready to upgrade?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join thousands of premium members finding love faster.
            </p>
            <Button
              onClick={handleUpgrade}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
              size="lg"
            >
              Upgrade to Premium - ${plans[selectedPlan].price}
            </Button>
            <p className="text-xs text-gray-500 mt-4">Cancel anytime. No hidden fees. 30-day money-back guarantee.</p>
          </Card>
        </div>

        {/* Success Stories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Premium Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah & Mike",
                story: "Found each other within 2 weeks of upgrading to premium!",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "Emily & James",
                story: "Premium filters helped us find our perfect match based on shared values.",
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                name: "Lisa & David",
                story: "The unlimited messaging feature let us really get to know each other.",
                image: "/placeholder.svg?height=200&width=200",
              },
            ].map((story, index) => (
              <Card key={index} className="p-6 text-center">
                <img
                  src={story.image || "/placeholder.svg"}
                  alt={story.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold mb-2">{story.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm italic">"{story.story}"</p>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                question: "Can I cancel my premium subscription anytime?",
                answer:
                  "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have premium access until the end of your billing period.",
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and Apple Pay for your convenience.",
              },
              {
                question: "Is there a free trial available?",
                answer:
                  "We offer a 7-day free trial for new premium subscribers so you can experience all the benefits risk-free.",
              },
              {
                question: "Will my matches see that I'm a premium member?",
                answer:
                  "Yes, premium members get a special badge on their profile that shows they're serious about finding love.",
              },
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Premium
