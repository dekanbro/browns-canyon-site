"use client"

import type React from "react"

import { useState } from "react"
import { X, AlertTriangle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

interface Rapid {
  id: string
  name: string
  class: string
  description: string
  notes: string
  videoUrl?: string
}

interface RapidDetailPanelProps {
  rapid: Rapid | null
  isOpen: boolean
  onClose: () => void
}

interface ConditionUpdate {
  id: number
  name: string
  date: string
  message: string
}

// Sample condition updates
const sampleUpdates: Record<string, ConditionUpdate[]> = {
  pinball: [
    { id: 1, name: "Mike R.", date: "2023-06-15", message: "Water level is perfect today. The main channel is clear." },
    { id: 2, name: "Sarah T.", date: "2023-06-10", message: "Watch out for a new strainer on river right." },
  ],
  "zoom-flume": [
    {
      id: 1,
      name: "Jason K.",
      date: "2023-06-12",
      message: "The hole at the bottom is particularly sticky right now.",
    },
  ],
  "seidels-suckhole": [
    { id: 1, name: "Alex M.", date: "2023-06-14", message: "Ran it today at 1200 CFS. The right line is clean." },
    { id: 2, name: "Chris B.", date: "2023-06-08", message: "Scouted from river right. Center hole is munchy!" },
  ],
}

export default function RapidDetailPanel({ rapid, isOpen, onClose }: RapidDetailPanelProps) {
  const [name, setName] = useState("")
  const [updateMessage, setUpdateMessage] = useState("")
  const [updates, setUpdates] = useState<ConditionUpdate[]>([])

  // Load updates when a rapid is selected
  useState(() => {
    if (rapid && rapid.id in sampleUpdates) {
      setUpdates(sampleUpdates[rapid.id])
    } else {
      setUpdates([])
    }
  })

  const handleSubmitUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !updateMessage.trim() || !rapid) return

    const newUpdate: ConditionUpdate = {
      id: Date.now(),
      name: name.trim(),
      date: new Date().toISOString().split("T")[0],
      message: updateMessage.trim(),
    }

    setUpdates([newUpdate, ...updates])
    setUpdateMessage("")
  }

  if (!isOpen || !rapid) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      <div className="relative bg-[#fdfaf6] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#3a2f1b] hover:text-[#8b5e3c] transition-colors"
          aria-label="Close panel"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <div className="flex items-center mb-4">
            <h2 className="font-playfair text-3xl font-bold">{rapid.name}</h2>
            <div
              className={`
              ml-3 px-3 py-1 rounded-full text-white font-bold text-sm
              ${rapid.class.includes("IV") ? "bg-[#ad2e24]" : "bg-[#8b5e3c]"}
            `}
            >
              Class {rapid.class}
            </div>
          </div>

          <p className="font-source-serif text-lg mb-4">{rapid.description}</p>

          <div className="bg-[#d9b382] bg-opacity-20 p-4 rounded-lg mb-6 flex items-start">
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
            <h3 className="font-playfair text-xl font-bold mb-3">Current Conditions</h3>

            <form onSubmit={handleSubmitUpdate} className="mb-4">
              <div className="mb-3">
                <Input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white border-[#d9b382]"
                />
              </div>
              <div className="flex">
                <Textarea
                  placeholder="Share current conditions, tips, or warnings..."
                  value={updateMessage}
                  onChange={(e) => setUpdateMessage(e.target.value)}
                  className="flex-grow mr-2 bg-white border-[#d9b382]"
                />
                <Button type="submit" className="bg-[#8b5e3c] hover:bg-[#7a4e2c] text-white">
                  <Send size={18} />
                </Button>
              </div>
            </form>

            <div className="space-y-3">
              {updates.length > 0 ? (
                updates.map((update) => (
                  <div key={update.id} className="bg-white p-3 rounded-lg shadow-sm">
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
          </div>
        </div>
      </div>
    </div>
  )
}
