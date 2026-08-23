import { MapPin } from "lucide-react";
import { MapView } from "@/components/Map";

export const seoulDiningDistricts = [
  { name: "Jongno & Euljiro", position: { lat: 37.5708, lng: 126.9992 }, tip: "Gwangjang Market, Hanok cafés, and Hipjiro alleyway espresso bars." },
  { name: "Hongdae & Sinchon", position: { lat: 37.5563, lng: 126.9236 }, tip: "Student BBQ, street snacks, character cafés, and high-energy nightlife." },
  { name: "Myeongdong", position: { lat: 37.5636, lng: 126.9854 }, tip: "Classic noodle houses, tourist-market dining, and dessert parlors." },
  { name: "Gangnam & Cheongdam", position: { lat: 37.5242, lng: 127.0473 }, tip: "Hanwoo, modern Korean fine dining, luxury cafés, and VIP nightlife." },
  { name: "Seongsu-dong", position: { lat: 37.5445, lng: 127.0557 }, tip: "Warehouse roasteries, flagship bakeries, and pop-up concept spaces." },
  { name: "Itaewon", position: { lat: 37.5345, lng: 126.9947 }, tip: "International bars, rooftop lounges, global late-night bites, and techno." },
] as const;

/** Maps the dining and café districts with marker-click info windows and a readable fallback legend. */
export default function SeoulDistrictDiningMap() {
  const onMapReady = (map: google.maps.Map) => {
    const infoWindow = new google.maps.InfoWindow();
    seoulDiningDistricts.forEach((district) => {
      const marker = new google.maps.marker.AdvancedMarkerElement({ map, position: district.position, title: district.name });
      marker.addListener("click", () => {
        infoWindow.setContent(`<div style="max-width:220px;padding:6px 3px"><strong style="color:#0D1B2A">${district.name}</strong><p style="margin:6px 0 0;color:#475569;line-height:1.45">${district.tip}</p></div>`);
        infoWindow.open({ map, anchor: marker });
      });
    });
  };

  return (
    <section className="mt-14" aria-labelledby="district-map-title"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Interactive district map</p><h2 id="district-map-title" className="mt-3 font-playfair text-3xl font-bold text-[#0D1B2A]">See where each food-and-café district sits</h2><p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">Tap a map marker for a quick district cue, then use the guide&apos;s pricing tables to match the location to your budget.</p><div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"><MapView initialCenter={{ lat: 37.5485, lng: 126.9926 }} initialZoom={12} onMapReady={onMapReady} className="h-[430px]" /><div className="border-t border-slate-200 bg-[#fbfdff] p-5"><p className="text-sm font-semibold text-[#0D1B2A]">District tooltip legend</p><div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{seoulDiningDistricts.map((district) => <div key={district.name} className="rounded-xl border border-blue-100 bg-white p-3"><p className="flex items-center gap-1.5 font-semibold text-[#0D1B2A]"><MapPin className="h-4 w-4 text-[#0077B6]" />{district.name}</p><p className="mt-1 text-sm leading-relaxed text-slate-600">{district.tip}</p></div>)}</div></div></div></section>
  );
}
