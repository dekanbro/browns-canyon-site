"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, AlertTriangle, Send, ChevronRight, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import type { Rapid, ConditionUpdate } from "@/lib/types"
import { generateRapidGoogleEarthUrl } from "@/lib/google-earth"

interface RapidDrawerProps {
  rapid: Rapid | null
  isOpen: boolean
  onClose: () => void
}

export default function RapidDrawer({ rapid, isOpen, onClose }: RapidDrawerProps) {
  const [name, setName] = useState("")
  const [updateMessage, setUpdateMessage] = useState("")
  const [updates, setUpdates] = useState<ConditionUpdate[]>([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Fetch condition updates when a rapid is selected
  useEffect(() => {
    if (rapid && isOpen) {
      setLoading(true)

      // Fetch the rapid details including updates
      fetch(`/api/rapids/${rapid.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch rapid details")
          }
          return response.json()
        })
        .then((data) => {
          if (data.updates) {
            setUpdates(data.updates)
          } else {
            setUpdates([])
          }
        })
        .catch((error) => {
          console.error("Error fetching rapid details:", error)
          setUpdates([])
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [rapid, isOpen])

  const handleSubmitUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !updateMessage.trim() || !rapid) return

    const newUpdate: ConditionUpdate = {
      id: Date.now(),
      name: name.trim(),
      date: new Date().toISOString().split("T")[0],
      message: updateMessage.trim(),
    }

    setSubmitting(true)

    try {
      // Submit the update to the API
      const response = await fetch(`/api/rapids/${rapid.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUpdate),
      })

      if (!response.ok) {
        throw new Error("Failed to submit update")
      }

      // Add the new update to the list
      setUpdates([newUpdate, ...updates])
      setUpdateMessage("")
    } catch (error) {
      console.error("Error submitting update:", error)
      alert("Failed to submit update. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen || !rapid) return null

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full md:w-[450px] bg-white shadow-xl transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center">
            <h2 className="font-playfair text-2xl font-bold">{rapid.name}</h2>
            <div
              className={`
                ml-3 px-3 py-1 rounded-full text-white font-bold text-sm
                ${
                  rapid.class.includes("IV")
                    ? "bg-[#ad2e24]"
                    : rapid.class.includes("III")
                      ? "bg-[#8b5e3c]"
                      : "bg-[#4c837b]"
                }
              `}
            >
              Class {rapid.class}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close panel"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6">
          <p className="font-source-serif text-lg mb-4">{rapid.description}</p>

          <div className="bg-[#f4e9d4] p-4 rounded-lg mb-6 flex items-start">
            <AlertTriangle className="text-[#ad2e24] mr-3 mt-1 flex-shrink-0" size={20} />
            <p className="font-source-serif italic">{rapid.notes}</p>
          </div>

          {rapid.videoUrl && (
            <div className="mb-6">
              <h3 className="font-playfair text-xl font-bold mb-3">Rapid Preview</h3>
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                <iframe
                  className="absolute top-0 left-0 w-full h-full border-0"
                  src={rapid.videoUrl}
                  title={`${rapid.name} video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-playfair text-xl font-bold">Current Conditions</h3>
              <div className="text-sm text-gray-500">
                {updates.length} {updates.length === 1 ? "update" : "updates"}
              </div>
            </div>

            {loading ? (
              <div className="text-center py-4">
                <div className="w-8 h-8 border-4 border-[#8b5e3c] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-gray-500">Loading updates...</p>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmitUpdate} className="mb-4">
                  <div className="mb-3">
                    <Input
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white border-gray-200"
                      disabled={submitting}
                    />
                  </div>
                  <div className="flex">
                    <Textarea
                      placeholder="Share current conditions, tips, or warnings..."
                      value={updateMessage}
                      onChange={(e) => setUpdateMessage(e.target.value)}
                      className="flex-grow mr-2 bg-white border-gray-200"
                      disabled={submitting}
                    />
                    <Button type="submit" className="bg-[#8b5e3c] hover:bg-[#7a4e2c] text-white" disabled={submitting}>
                      {submitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Send size={18} />
                      )}
                    </Button>
                  </div>
                </form>

                <div className="space-y-3">
                  {updates.length > 0 ? (
                    updates.map((update) => (
                      <div key={update.id} className="bg-gray-50 p-3 rounded-lg shadow-sm">
                        <div className="flex justify-between mb-1">
                          <span className="font-bold">{update.name}</span>
                          <span className="text-sm text-gray-600">{update.date}</span>
                        </div>
                        <p>{update.message}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500 italic">
                      No condition updates yet. Be the first to share!
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <a
            href={generateRapidGoogleEarthUrl(rapid)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#8b5e3c] hover:bg-[#7a4e2c] text-white py-2 px-4 rounded flex justify-between items-center"
          >
            <span className="flex items-center">
              <Globe size={18} className="mr-2" />
              View in Google Earth
            </span>
            <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}
