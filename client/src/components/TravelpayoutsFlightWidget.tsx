import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plane } from "lucide-react";

export default function TravelpayoutsFlightWidget() {
  const [tripType, setTripType] = useState("roundtrip");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1");

  const handleSearch = () => {
    if (!from || !to || !departDate) {
      alert("Please fill in all required fields");
      return;
    }

    // Build Travelpayouts search URL with affiliate ID
    const affiliateId = "745048";
    const params = new URLSearchParams({
      origin: from.toUpperCase(),
      destination: to.toUpperCase(),
      depart_date: departDate,
      return_date: tripType === "roundtrip" ? returnDate : "",
      adults: passengers,
      marker: affiliateId,
    });

    // Open Travelpayouts search in new tab
    const searchUrl = `https://www.travelpayouts.com/searches?${params.toString()}`;
    window.open(searchUrl, "_blank");
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 md:p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Plane className="w-6 h-6 text-blue-600" />
        <h3 className="text-2xl font-bold text-gray-900">Find Flights</h3>
      </div>

      <div className="space-y-4">
        {/* Trip Type Selection */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="roundtrip"
              checked={tripType === "roundtrip"}
              onChange={(e) => setTripType(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium text-gray-700">Round Trip</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="oneway"
              checked={tripType === "oneway"}
              onChange={(e) => setTripType(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium text-gray-700">One Way</span>
          </label>
        </div>

        {/* Search Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* From */}
          <div>
            <label className="text-xs font-semibold text-gray-700 mb-2 block">
              From (IATA Code)
            </label>
            <Input
              placeholder="e.g., JFK"
              value={from}
              onChange={(e) => setFrom(e.target.value.toUpperCase())}
              className="uppercase"
              maxLength={3}
            />
          </div>

          {/* To */}
          <div>
            <label className="text-xs font-semibold text-gray-700 mb-2 block">
              To (IATA Code)
            </label>
            <Input
              placeholder="e.g., LHR"
              value={to}
              onChange={(e) => setTo(e.target.value.toUpperCase())}
              className="uppercase"
              maxLength={3}
            />
          </div>

          {/* Depart Date */}
          <div>
            <label className="text-xs font-semibold text-gray-700 mb-2 block">
              Depart
            </label>
            <Input
              type="date"
              value={departDate}
              onChange={(e) => setDepartDate(e.target.value)}
            />
          </div>

          {/* Return Date (conditional) */}
          {tripType === "roundtrip" && (
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-2 block">
                Return
              </label>
              <Input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>
          )}

          {/* Passengers */}
          <div>
            <label className="text-xs font-semibold text-gray-700 mb-2 block">
              Passengers
            </label>
            <select
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Passenger" : "Passengers"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-end pt-2">
          <Button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2"
          >
            Search Flights
          </Button>
        </div>

        {/* Info Text */}
        <p className="text-xs text-gray-600 text-center pt-2">
          💡 Tip: Use IATA airport codes (e.g., JFK for New York, LHR for London, CDG for Paris)
        </p>
      </div>
    </div>
  );
}
