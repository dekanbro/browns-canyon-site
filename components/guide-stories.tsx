"use client"

import { useState } from "react"
import { Quote, ChevronRight, ChevronLeft } from "lucide-react"
import Image from "next/image"
import { guideStories } from "@/lib/data"

export default function GuideStories() {
  const [currentStory, setCurrentStory] = useState(0)

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % guideStories.length)
  }

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + guideStories.length) % guideStories.length)
  }

  const story = guideStories[currentStory]

  return (
    <div>
      <h2 className="font-playfair text-xl font-bold mb-4">Guide Stories</h2>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-shrink-0">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#d9b382]">
              <Image src={story.image || "/placeholder.svg"} alt={story.name} fill className="object-cover" />
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={prevStory}
              className="p-2 rounded-full hover:bg-[#f4e9d4] transition-colors"
              aria-label="Previous story"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextStory}
              className="p-2 rounded-full hover:bg-[#f4e9d4] transition-colors"
              aria-label="Next story"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div>
          <div className="mb-2">
            <h4 className="font-playfair font-bold text-lg">{story.name}</h4>
            <p className="text-sm text-gray-600">{story.years}</p>
          </div>

          <div className="relative">
            <Quote className="absolute top-0 left-0 text-[#d9b382] opacity-20" size={40} />
            <p className="font-source-serif italic pl-8 pr-4 py-2">{story.quote}</p>
          </div>

          {story.rapid && (
            <div className="mt-2 text-right">
              <span className="inline-block bg-[#d9b382] bg-opacity-30 px-3 py-1 rounded-full text-sm font-bold">
                {story.rapid}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 text-center">
        <button className="text-[#8b5e3c] hover:text-[#7a4e2c] font-bold">Share Your Story</button>
      </div>
    </div>
  )
}
