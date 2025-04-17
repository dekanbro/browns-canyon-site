import type { Rapid } from "./types"

// Function to generate a Google Earth Web URL for a specific rapid
export function generateRapidGoogleEarthUrl(rapid: Rapid): string {
  if (!rapid.coordinates) {
    // Fallback to a general Brown's Canyon view if coordinates aren't available
    return "https://earth.google.com/web/@38.6815,-106.058,2300a,13267d,35y,0h,0t,0r"
  }

  // Create a URL that centers on the rapid's coordinates
  // Format: @latitude,longitude,altitude,distance,tilt,heading,terrain
  const { latitude, longitude } = rapid.coordinates

  // Parameters for a good viewing angle
  const altitude = "2300a" // altitude in meters with 'a' suffix
  const distance = "500d" // distance in meters with 'd' suffix
  const tilt = "65y" // tilt angle with 'y' suffix (65 degrees looks down at the river)
  const heading = "0h" // heading with 'h' suffix (0 = north)
  const terrain = "1t" // terrain enabled with 't' suffix
  const rotation = "0r" // rotation with 'r' suffix

  // Construct the URL
  return `https://earth.google.com/web/@${latitude},${longitude},${altitude},${distance},${tilt},${heading},${terrain},${rotation}/data=KAI`
}

// Function to generate a Google Earth Web URL with all rapids as waypoints
export function generateAllRapidsGoogleEarthUrl(rapids: Rapid[]): string {
  // Filter out rapids without coordinates
  const rapidsWithCoordinates = rapids.filter((rapid) => rapid.coordinates)

  if (rapidsWithCoordinates.length === 0) {
    return "https://earth.google.com/web/@38.6815,-106.058,2300a,13267d,35y,0h,0t,0r"
  }

  // Start with the KML header
  let kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Brown's Canyon Rapids</name>
    <description>Rapids on the Arkansas River through Brown's Canyon</description>
    <Style id="classIIIcon">
      <IconStyle>
        <color>ff7b834c</color>
        <scale>1.0</scale>
        <Icon><href>https://maps.google.com/mapfiles/kml/paddle/grn-circle.png</href></Icon>
      </IconStyle>
    </Style>
    <Style id="classIIIIcon">
      <IconStyle>
        <color>ff3c5e8b</color>
        <scale>1.0</scale>
        <Icon><href>https://maps.google.com/mapfiles/kml/paddle/blu-circle.png</href></Icon>
      </IconStyle>
    </Style>
    <Style id="classIVIcon">
      <IconStyle>
        <color>ff242ead</color>
        <scale>1.0</scale>
        <Icon><href>https://maps.google.com/mapfiles/kml/paddle/red-circle.png</href></Icon>
      </IconStyle>
    </Style>`

  // Add each rapid as a placemark
  rapidsWithCoordinates.forEach((rapid) => {
    // Determine the style based on rapid class
    let styleUrl = "#classIIIcon"
    if (rapid.class.includes("IV")) {
      styleUrl = "#classIVIcon"
    } else if (rapid.class.includes("III")) {
      styleUrl = "#classIIIIcon"
    }

    const { latitude, longitude } = rapid.coordinates!

    kml += `
    <Placemark>
      <name>${rapid.name} (Class ${rapid.class})</name>
      <description>${rapid.description}</description>
      <styleUrl>${styleUrl}</styleUrl>
      <Point>
        <coordinates>${longitude},${latitude},0</coordinates>
      </Point>
    </Placemark>`
  })

  // Close the KML document
  kml += `
  </Document>
</kml>`

  // Base Google Earth URL - center on the first rapid
  const firstRapid = rapidsWithCoordinates[0]
  const baseUrl = `https://earth.google.com/web/@${firstRapid.coordinates!.latitude},${firstRapid.coordinates!.longitude},2300a,13267d,35y,0h,1t,0r`

  // Encode the KML data for the URL
  const encodedKml = encodeURIComponent(kml)

  // Return the complete URL
  return `${baseUrl}/data=KAI?kml=${encodedKml}`
}
