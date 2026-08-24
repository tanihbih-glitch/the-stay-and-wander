import { MapPinned } from "lucide-react";
import { MapView } from "@/components/Map";

export const bangkokDistrictMapPoints = [
  { name: "Sukhumvit (Asok / Nana)", position: { lat: 13.7375, lng: 100.5602 }, midRange: "$55–$110", average: "$83", access: "BTS/MRT hub" },
  { name: "Silom & Sathorn", position: { lat: 13.7279, lng: 100.5353 }, midRange: "$50–$95", average: "$73", access: "BTS/MRT business district" },
  { name: "Siam & Pratunam", position: { lat: 13.7463, lng: 100.5347 }, midRange: "$60–$120", average: "$90", access: "BTS shopping core" },
  { name: "Bangkok Riverside", position: { lat: 13.7272, lng: 100.5141 }, midRange: "$75–$150", average: "$113", access: "Ferry / BTS connection" },
  { name: "Khao San / Old City", position: { lat: 13.7589, lng: 100.4970 }, midRange: "$35–$70", average: "$53", access: "MRT nearby" },
] as const;

export default function BangkokDistrictHotelMap() {
  return (
    <section className="mt-14" aria-labelledby="bangkok-district-map-heading">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Transit price map</p>
      <h2 id="bangkok-district-map-heading" className="mt-3 font-playfair text-3xl font-bold text-[#0D1B2A] md:text-4xl">Where Bangkok hotel value sits around transit</h2>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">Select a marker to view the supplied mid-range benchmark, its calculated midpoint, and the transit character for each district. The visible legend keeps the guide useful if the map proxy is temporarily unavailable.</p>
      <div className="mt-7 overflow-hidden rounded-2xl border border-[#cfe4ee] bg-[#eef8fb] p-3 shadow-sm sm:p-4">
        <MapView
          initialCenter={{ lat: 13.7353, lng: 100.5298 }}
          initialZoom={12}
          className="h-[360px] rounded-xl bg-sky-100 sm:h-[430px]"
          onMapReady={(map) => {
            const infoWindow = new google.maps.InfoWindow();
            bangkokDistrictMapPoints.forEach((district) => {
              const marker = new google.maps.marker.AdvancedMarkerElement({ map, position: district.position, title: district.name });
              marker.addListener("click", () => {
                const content = document.createElement("div");
                content.className = "max-w-[230px] p-1 text-slate-800";
                content.innerHTML = `<strong style="font-size:15px">${district.name}</strong><p style="margin:6px 0 0">Mid-range: ${district.midRange} / night</p><p style="margin:4px 0 0">Approx. midpoint: <strong>${district.average}</strong> / night</p><p style="margin:4px 0 0">${district.access}</p>`;
                infoWindow.setContent(content);
                infoWindow.open({ map, anchor: marker });
              });
            });
          }}
        />
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5" aria-label="Bangkok district hotel-price legend">
          {bangkokDistrictMapPoints.map((district) => <div key={district.name} className="rounded-xl border border-white bg-white/80 p-3"><div className="flex gap-2"><MapPinned className="mt-0.5 h-4 w-4 shrink-0 text-[#0077B6]" aria-hidden="true" /><div><p className="text-sm font-semibold text-[#0D1B2A]">{district.name}</p><p className="mt-1 text-xs text-slate-600">Mid-range {district.midRange} · midpoint {district.average}</p></div></div></div>)}
        </div>
      </div>
    </section>
  );
}
