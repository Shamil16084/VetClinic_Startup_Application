"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, Heart, Calendar, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="h-4 w-4" />
            Best care for your pets
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">VetBooking.az</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto text-balance">
            Online veterinary appointment booking platform in Azerbaijan
          </p>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Book appointments with professional veterinarians for your beloved pets. Fast, convenient, and reliable
            service.
          </p>
          <Link href="/booking">
            <Button size="lg" className="text-lg px-8 py-6 gap-2">
              Book Appointment
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Online Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">Book appointments anytime, anywhere</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <Stethoscope className="h-6 w-6 text-emerald-600" />
              </div>
              <CardTitle className="text-lg">Professional Doctors</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">Experienced and certified veterinary specialists</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">All Animals</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">Services for small, large, and exotic animals</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Reliable Service</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">Safe and quality veterinary care</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
          <div className="max-w-3xl mx-auto space-y-4 text-gray-700 leading-relaxed">
            <p className="text-lg">
              VetBooking.az is an innovative platform created to simplify access to veterinary services in Azerbaijan.
              We serve as a bridge between pet owners and professional veterinarians.
            </p>
            <p className="text-lg">
              Through our platform, you can quickly access the best veterinary clinics and specialists located in Baku,
              Ganja, Sumgayit, and other cities. The health of your beloved friends is our priority.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Book an appointment for your pet</h2>
          <p className="text-xl mb-8 text-emerald-50">
            Get access to professional veterinary services in just a few clicks
          </p>
          <Link href="/booking">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 gap-2">
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
