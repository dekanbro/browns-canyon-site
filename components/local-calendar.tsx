"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, X, Calendar, Info } from "lucide-react"
import type { Event } from "@/lib/types"
import { Button } from "@/components/ui/button"

export default function LocalCalendar() {
  const [events, setEvents] = useState<Event[]>([])
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/events")
        if (!response.ok) {
          throw new Error("Failed to fetch events")
        }
        const data = await response.json()
        setEvents(data)
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const goToFIBArk = () => {
    // Go to June 2025
    setCurrentMonth(5) // June (0-indexed)
    setCurrentYear(2025)
  }

  // Filter events for the current month
  const currentEvents = events.filter((event) => {
    const eventDate = new Date(event.date)
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-playfair text-xl font-bold">Local Events</h2>

        <Button
          variant="outline"
          size="sm"
          onClick={goToFIBArk}
          className="text-[#8b5e3c] hover:text-[#7a4e2c] border-[#d9b382] hover:bg-[#f4e9d4]"
        >
          <Calendar size={14} className="mr-1" />
          FIBArk 2025
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <CalendarIcon className="mr-2" size={20} />
          <span className="font-bold">
            {monthNames[currentMonth]} {currentYear}
          </span>
        </div>
        <div className="flex items-center">
          <button onClick={prevMonth} className="p-1 hover:bg-[#f4e9d4] rounded-full" aria-label="Previous month">
            <ChevronLeft size={18} />
          </button>
          <button onClick={nextMonth} className="p-1 hover:bg-[#f4e9d4] rounded-full" aria-label="Next month">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-4 border-[#8b5e3c] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-500">Loading events...</p>
        </div>
      ) : currentEvents.length > 0 ? (
        <div className="space-y-3">
          {currentEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white p-3 rounded-lg shadow-sm cursor-pointer hover:bg-[#f4e9d4] transition-colors"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="flex justify-between">
                <h4 className="font-bold">{event.title}</h4>
                <span className="text-sm text-gray-600">
                  {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
              <p className="text-sm">
                {event.time} • {event.location}
              </p>
              {event.title === "FIBArk Festival" && (
                <div className="mt-1 flex items-center text-xs text-[#ad2e24] font-bold">
                  <Info size={12} className="mr-1" />
                  Major river festival!
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <p className="text-gray-500 italic">No events scheduled for this month.</p>
          <button
            className="mt-2 text-[#8b5e3c] hover:text-[#7a4e2c] font-bold flex items-center justify-center mx-auto"
            onClick={goToFIBArk}
          >
            <Calendar size={16} className="mr-1" />
            Check FIBArk 2025
          </button>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSelectedEvent(null)}></div>

          <div className="relative bg-[#fdfaf6] w-full max-w-md rounded-lg shadow-xl p-6">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-[#3a2f1b] hover:text-[#8b5e3c]"
              aria-label="Close details"
            >
              <X size={24} />
            </button>

            <h3 className="font-playfair text-2xl font-bold mb-2">{selectedEvent.title}</h3>

            <div className="mb-4">
              <div className="flex items-center mb-1">
                <CalendarIcon className="text-[#8b5e3c] mr-2" size={16} />
                <span>
                  {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center mb-1">
                <Clock className="text-[#8b5e3c] mr-2" size={16} />
                <span>{selectedEvent.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="text-[#8b5e3c] mr-2" size={16} />
                <span>{selectedEvent.location}</span>
              </div>
            </div>

            <p className="font-source-serif mb-4">{selectedEvent.description}</p>

            {selectedEvent.title === "FIBArk Festival" && (
              <div className="bg-[#f4e9d4] p-3 rounded-lg mb-4">
                <p className="text-sm italic">
                  FIBArk (First in Boating on the Arkansas) has been running since 1949 and is America's oldest
                  whitewater festival. Don't miss this iconic celebration of river culture!
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-[#8b5e3c] text-[#8b5e3c] rounded-lg hover:bg-[#8b5e3c] hover:text-white transition-colors"
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </button>
              <button className="px-4 py-2 bg-[#8b5e3c] text-white rounded-lg hover:bg-[#7a4e2c] transition-colors">
                Add to Calendar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
