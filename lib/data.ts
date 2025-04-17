import type { Rapid, ConditionUpdate, GuideStory, Event, Product } from "./types"

// Sample data for the rapids, ordered north to south
export const rapids: Rapid[] = [
  {
    id: "canyon-doors",
    name: "Canyon Doors",
    class: "II+",
    position: { x: 75, y: 10 },
    description: "The entrance to Brown's Canyon, offering a gentle introduction to what lies ahead.",
    notes: "Wide and forgiving, a good warm-up rapid for beginners.",
  },
  {
    id: "zoom-flume",
    name: "Zoom Flume",
    class: "III+",
    position: { x: 76, y: 15 },
    description: "One of the most exciting rapids in the canyon with a fast-moving flume.",
    notes: "Enter left, move right to avoid the hole at the bottom.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "squeeze-play",
    name: "Squeeze Play",
    class: "III",
    position: { x: 73, y: 20 },
    description: "A narrow channel that forces rafts to navigate between large boulders.",
    notes: "Stay centered to avoid getting pinned on either side.",
  },
  {
    id: "big-drop",
    name: "Big Drop",
    class: "III",
    position: { x: 71, y: 25 },
    description: "Features a significant vertical drop followed by turbulent water.",
    notes: "Hit it straight and prepare for the splash!",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "staircase",
    name: "Staircase",
    class: "III",
    position: { x: 72, y: 30 },
    description: "A series of ledges creating a staircase effect.",
    notes: "Run center, be prepared for multiple drops in succession.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "hemroid-rock",
    name: "Hemroid Rock",
    class: "II+",
    position: { x: 60, y: 35 },
    description: "Named for the uncomfortable experience if you hit the center rock wrong.",
    notes: "Stay river left to avoid the aptly named rock in the center.",
  },
  {
    id: "widow-maker",
    name: "Widow Maker",
    class: "III+",
    position: { x: 59, y: 40 },
    description: "A challenging rapid with a significant drop and dangerous hydraulics.",
    notes: "Scout from river right if water levels are high. Avoid the center hole at all costs.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "raft-ripper",
    name: "Raft Ripper",
    class: "III",
    position: { x: 58, y: 45 },
    description: "Known for sharp rocks that can damage equipment if not navigated properly.",
    notes: "Technical rapid requiring precise maneuvering. Watch for exposed rocks at lower flows.",
  },
  {
    id: "last-chance",
    name: "Last Chance",
    class: "II+",
    position: { x: 55, y: 50 },
    description: "The final significant rapid in the upper section of the canyon.",
    notes: "A straightforward run with a few obstacles to navigate around.",
  },
  {
    id: "salida-suckhole",
    name: "Salida Suckhole",
    class: "IV",
    position: { x: 48, y: 55 },
    description: "One of the most difficult rapids in Brown's Canyon with a powerful hydraulic.",
    notes: "Stay right to avoid the large hole in the center. Can be portaged at high water.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "twin-falls",
    name: "Twin Falls",
    class: "III",
    position: { x: 48, y: 60 },
    description: "Features two distinct drops in quick succession.",
    notes: "Run the first drop slightly left, then move right for the second.",
  },
  {
    id: "pinball",
    name: "Pinball",
    class: "III",
    position: { x: 45, y: 65 },
    description: "A technical rapid with multiple rocks to navigate, like a pinball machine.",
    notes: "Stay center-right to avoid the large boulder on river left.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "stone-bridge",
    name: "Stone Bridge",
    class: "II+",
    position: { x: 40, y: 70 },
    description: "Named for the historic stone bridge visible from the rapid.",
    notes: "A straightforward rapid with a beautiful view of the bridge.",
  },
  {
    id: "big-bend",
    name: "Big Bend",
    class: "II",
    position: { x: 40, y: 75 },
    description: "A sweeping turn in the river with gentle waves.",
    notes: "Easy rapid, but watch for the strong current pushing toward the outer bank.",
  },
  {
    id: "drift-inn",
    name: "Drift Inn",
    class: "II+",
    position: { x: 47, y: 80 },
    description: "A popular stopping point with a calm eddy on river right.",
    notes: "Good place to regroup before the final stretch.",
  },
  {
    id: "sqaw-creek",
    name: "Sqaw Creek",
    class: "II",
    position: { x: 40, y: 85 },
    description: "The final rapid before reaching the take-out point.",
    notes: "Gentle waves and a good cool-down after the more challenging sections upstream.",
  },
]

// Sample condition updates
export const conditionUpdates: Record<string, ConditionUpdate[]> = {
  "canyon-doors": [
    { id: 1, name: "Lisa M.", date: "2023-06-18", message: "Perfect beginner conditions today. Water is clear." },
  ],
  "zoom-flume": [
    {
      id: 1,
      name: "Jason K.",
      date: "2023-06-12",
      message: "The hole at the bottom is particularly sticky right now.",
    },
    {
      id: 2,
      name: "Emma T.",
      date: "2023-06-16",
      message: "Ran it at 1100 CFS today. The left entrance is getting washed out.",
    },
  ],
  "big-drop": [
    { id: 1, name: "Carlos R.", date: "2023-06-14", message: "Big waves today! Hit it straight and you'll be fine." },
  ],
  "widow-maker": [
    {
      id: 1,
      name: "Tanya S.",
      date: "2023-06-15",
      message: "Scouted from right. The center hole is looking nasty at current levels.",
    },
  ],
  "salida-suckhole": [
    { id: 1, name: "Alex M.", date: "2023-06-14", message: "Ran it today at 1200 CFS. The right line is clean." },
    { id: 2, name: "Chris B.", date: "2023-06-08", message: "Scouted from river right. Center hole is munchy!" },
  ],
  pinball: [
    { id: 1, name: "Mike R.", date: "2023-06-15", message: "Water level is perfect today. The main channel is clear." },
    { id: 2, name: "Sarah T.", date: "2023-06-10", message: "Watch out for a new strainer on river right." },
  ],
}

// Sample guide stories
export const guideStories: GuideStory[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    years: "15 years guiding",
    quote:
      "I've seen Zoom Flume change personalities with every water level. At 900 CFS, it's playful. At 1500, it demands respect. I once saw a full raft flip and all 6 people surfed the wave train with huge smiles!",
    rapid: "Zoom Flume",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    years: "22 years guiding",
    quote:
      "Salida Suckhole earned its name. Back in '05, I watched a kayaker get recirculated three times before flushing out. We all held our breath. When he popped up downstream with a thumbs up, the whole canyon erupted in cheers.",
    rapid: "Salida Suckhole",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Jamie Chen",
    years: "8 years guiding",
    quote:
      "My favorite memory was guiding a group through Staircase during a full moon float. The silver light on the water made it feel like we were floating through liquid mercury. The guests still email me about that magical night years later.",
    rapid: "Staircase",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Tom Wilson",
    years: "30 years guiding",
    quote:
      "Pinball has taught me more about reading water than any other rapid. In the 90s, we used to run it differently than we do now. The river changes, the rocks move, and you have to adapt. That's the beauty of Brown's Canyon.",
    rapid: "Pinball",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Elena Vasquez",
    years: "12 years guiding",
    quote:
      "Widow Maker is where guides earn their tips. I tell my clients, 'This is why you hired a professional!' The look on their faces when we clear that big hydraulic is priceless.",
    rapid: "Widow Maker",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "David Park",
    years: "18 years guiding",
    quote:
      "Canyon Doors is special to me. It's where I start every trip with the same line: 'Folks, we're about to enter Brown's Canyon. These doors have been open for millions of years, just waiting for us to pass through.'",
    rapid: "Canyon Doors",
    image: "/placeholder.svg?height=100&width=100",
  },
]

// Sample events data
export const events: Event[] = [
  {
    id: 1,
    title: "River Cleanup Day",
    date: "2023-06-24",
    time: "9:00 AM - 2:00 PM",
    location: "Ruby Mountain Campground",
    description: "Join local guides and community members for our annual river cleanup day. Lunch provided!",
  },
  {
    id: 2,
    title: "Full Moon Float",
    date: "2023-07-03",
    time: "7:30 PM - 10:30 PM",
    location: "Browns Canyon Adventure Park",
    description: "Experience the magic of Brown's Canyon under the full moon. Limited spots available.",
  },
  {
    id: 3,
    title: "Guide Stories Night",
    date: "2023-07-15",
    time: "6:00 PM - 9:00 PM",
    location: "Eddyline Brewery",
    description: "Listen to veteran guides share their wildest river tales. Food and drinks available for purchase.",
  },
  {
    id: 4,
    title: "Beginner Kayak Clinic",
    date: "2023-07-22",
    time: "10:00 AM - 3:00 PM",
    location: "Stone Bridge Put-in",
    description: "Learn the basics of kayaking from certified instructors. Equipment provided.",
  },
  {
    id: 5,
    title: "FIBArk Festival",
    date: "2025-06-12",
    time: "All Day",
    location: "Salida, Colorado",
    description:
      "America's oldest whitewater festival! FIBArk (First In Boating on the Arkansas) features professional kayak and raft competitions, live music, a parade, mountain bike races, and more. Join thousands of river enthusiasts for this iconic 4-day celebration (June 12-15, 2025) of river culture and outdoor adventure.",
  },
]

// Products data with real images
export const products: Product[] = [
  {
    id: 1,
    name: "Brown's Canyon River Map Tee",
    price: 28,
    image: "/images/browns-canyon-tshirt.png",
    description: "Soft cotton tee with a vintage-style illustration of Brown's Canyon rafting.",
    category: "apparel",
  },
  {
    id: 2,
    name: "Zoom Flume T-Shirt",
    price: 28,
    image: "/images/zoom-flume-tshirt.png",
    description: "Comfortable tee featuring the iconic Zoom Flume rapid in a classic earth-tone design.",
    category: "apparel",
  },
  {
    id: 3,
    name: "Zoom Flume Art Print",
    price: 24,
    image: "/images/zoom-flume-poster.png",
    description: 'Vintage-style 12"x18" art print of Zoom Flume rapid. Perfect for your cabin or office.',
    category: "posters",
  },
  {
    id: 4,
    name: "Salida Suckhole Art Print",
    price: 24,
    image: "/images/salida-suckhole-poster.png",
    description: 'Bold 12"x18" art print featuring the legendary Salida Suckhole in dramatic purple tones.',
    category: "posters",
  },
  {
    id: 5,
    name: "Salida Suckhole Vertical Print",
    price: 24,
    image: "/images/salida-suckhole-poster2.png",
    description: 'Alternative view of the Salida Suckhole in a vertical 12"x18" format.',
    category: "posters",
  },
  {
    id: 6,
    name: "3D Printed Canyon Model",
    price: 85,
    image: "/images/3d-print-model.png",
    description: 'Detailed 3D printed topographic model of Brown\'s Canyon. 8"x12" blue filament on wooden base.',
    category: "3d-maps",
  },
  {
    id: 7,
    name: "Arkansas River Trucker Hat",
    price: 24,
    image: "/placeholder.svg?height=200&width=200",
    description: "Mesh-back trucker hat with embroidered Arkansas River design.",
    category: "apparel",
  },
]
