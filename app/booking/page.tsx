"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle, MapPin, Phone, Stethoscope, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

const initialDoctors = [
  {
    id: 1,
    name: "Dr. Leyla Məmmədova",
    specialty: "Small Animals",
    contactNumber: "+994 50 123 45 67",
    location: "Baku, Nasimi District",
    availableSlots: ["09:00", "11:00", "14:30", "16:00"],
  },
  {
    id: 2,
    name: "Dr. Rəşad Əliyev",
    specialty: "Exotic Animals",
    contactNumber: "+994 51 234 56 78",
    location: "Baku, Yasamal District",
    availableSlots: ["10:00", "13:00", "15:30"],
  },
  {
    id: 3,
    name: "Dr. Günel Həsənova",
    specialty: "Small Animals",
    contactNumber: "+994 55 345 67 89",
    location: "Baku, Narimanov District",
    availableSlots: ["08:30", "10:30", "14:00", "17:00"],
  },
  {
    id: 4,
    name: "Dr. Elçin Quliyev",
    specialty: "Large Animals",
    contactNumber: "+994 70 456 78 90",
    location: "Ganja",
    availableSlots: ["09:30", "12:00", "15:00"],
  },
  {
    id: 5,
    name: "Dr. Səbinə İbrahimova",
    specialty: "Exotic Animals",
    contactNumber: "+994 77 567 89 01",
    location: "Sumgayit",
    availableSlots: ["11:00", "13:30", "16:30"],
  },
  {
    id: 6,
    name: "Dr. Kamran Mustafayev",
    specialty: "Small Animals",
    contactNumber: "+994 50 678 90 12",
    location: "Baku, Khatai District",
    availableSlots: ["08:00", "10:00", "14:30", "16:00"],
  },
  {
    id: 7,
    name: "Dr. Farhad Pashayev",
    specialty: "Small Animals",
    contactNumber: "050 772 21 07",
    location: "Baku, Nizami District",
    availableSlots: ["09:00", "11:30", "14:00", "16:30"],
  },
  {
    id: 8,
    name: "Dr. Amin Tanriverdiyev",
    specialty: "Large Animals",
    contactNumber: "050 316 92 58",
    location: "Baku, Sabunchu District",
    availableSlots: ["08:30", "10:30", "13:00", "15:30"],
  },
]

export default function BookingPage() {
  const [doctors, setDoctors] = useState(initialDoctors)
  const [bookings, setBookings] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [petName, setPetName] = useState("")
  const [ownerPhone, setOwnerPhone] = useState("")
  const [selectedSlot, setSelectedSlot] = useState("")
  const [message, setMessage] = useState(null)

  const openBookingModal = (doctor) => {
    setSelectedDoctor(doctor)
    setIsModalOpen(true)
    setPetName("")
    setOwnerPhone("")
    setSelectedSlot("")
    setMessage(null)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedDoctor(null)
    setPetName("")
    setOwnerPhone("")
    setSelectedSlot("")
  }

  const handleBooking = async () => {
    // Validation
    if (!petName.trim()) {
      setMessage({ type: "error", text: "Please enter your pet's name" })
      return
    }
    if (!ownerPhone.trim()) {
      setMessage({ type: "error", text: "Please enter your phone number" })
      return
    }
    if (!selectedSlot) {
      setMessage({ type: "error", text: "Please select a time slot" })
      return
    }

    // Create booking
    const newBooking = {
      id: Date.now(),
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      petName,
      ownerPhone,
      slot: selectedSlot,
      bookedAt: new Date().toISOString(),
    }

    // Update bookings
    setBookings([...bookings, newBooking])

    // Remove slot from doctor's available slots
    setDoctors(
      doctors.map((doc) => {
        if (doc.id === selectedDoctor.id) {
          return {
            ...doc,
            availableSlots: doc.availableSlots.filter((slot) => slot !== selectedSlot),
          }
        }
        return doc
      }),
    )

    // Send email notification
    try {
      await fetch("/api/send-booking-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorName: selectedDoctor.name,
          doctorSpecialty: selectedDoctor.specialty,
          doctorLocation: selectedDoctor.location,
          doctorContact: selectedDoctor.contactNumber,
          petName,
          ownerPhone,
          slot: selectedSlot,
          bookedAt: new Date().toLocaleString(),
        }),
      })
    } catch (error) {
      console.error("Failed to send email:", error)
      // Continue with booking even if email fails
    }

    // Show success message
    setMessage({
      type: "success",
      text: `Appointment successfully booked! ${selectedDoctor.name}, at ${selectedSlot}`,
    })

    // Close modal after 2 seconds
    setTimeout(() => {
      closeModal()
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Book Appointment</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Schedule an appointment with our experienced veterinarians
            </p>
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Stethoscope className="h-5 w-5 text-emerald-600" />
                  {doctor.name}
                </CardTitle>
                <CardDescription className="text-base font-medium text-emerald-600">{doctor.specialty}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{doctor.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{doctor.contactNumber}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4 mt-0.5" />
                    <div>
                      <span className="font-medium">Available slots:</span>
                      <div className="mt-1">
                        {doctor.availableSlots.length > 0 ? (
                          <span className="text-green-600 font-medium">
                            {doctor.availableSlots.length} slots available
                          </span>
                        ) : (
                          <span className="text-red-600 font-medium">No slots available</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => openBookingModal(doctor)}
                  disabled={doctor.availableSlots.length === 0}
                  className="w-full"
                >
                  {doctor.availableSlots.length > 0 ? "Book Appointment" : "Fully Booked"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl">Book Appointment</DialogTitle>
            </DialogHeader>
            {selectedDoctor && (
              <div className="space-y-6 py-4">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">{selectedDoctor.name}</p>
                  <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
                  <p className="text-sm text-gray-600">{selectedDoctor.location}</p>
                </div>

                {message && (
                  <Alert
                    variant={message.type === "error" ? "destructive" : "default"}
                    className={message.type === "success" ? "bg-green-50 border-green-200" : ""}
                  >
                    {message.type === "success" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                    <AlertDescription className={message.type === "success" ? "text-green-800" : ""}>
                      {message.text}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="petName">Pet Name</Label>
                    <Input
                      id="petName"
                      placeholder="Enter your pet's name"
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ownerPhone">Your Phone Number</Label>
                    <Input
                      id="ownerPhone"
                      type="tel"
                      placeholder="+994 XX XXX XX XX"
                      value={ownerPhone}
                      onChange={(e) => setOwnerPhone(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Select Time</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedDoctor.availableSlots.map((slot) => (
                        <Button
                          key={slot}
                          variant={selectedSlot === slot ? "default" : "outline"}
                          onClick={() => setSelectedSlot(slot)}
                          className="w-full"
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={closeModal} className="flex-1 bg-transparent">
                    Cancel
                  </Button>
                  <Button onClick={handleBooking} className="flex-1">
                    Confirm
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
