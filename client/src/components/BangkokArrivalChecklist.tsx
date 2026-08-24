import { CalendarPlus, CheckCircle2, Download, Link2, Mail, PlaneLanding } from "lucide-react";
import { useMemo, useState } from "react";

const arrivalSteps = [
  "Save your hotel address and district in Thai and English.",
  "Confirm your BKK or DMK arrival terminal and transfer pickup point.",
  "Keep a cash or card backup for airport rail, taxi surcharge, tolls, or luggage fees.",
  "Screenshot your airport transfer booking or live ride-hailing confirmation.",
  "Message your hotel if you expect a late arrival or need luggage storage.",
  "Keep your passport, arrival documents, and hotel confirmation accessible.",
  "On arrival, verify the vehicle and fare details before leaving the airport.",
];

export default function BangkokArrivalChecklist() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkInTime, setCheckInTime] = useState("15:00");
  const [shareStatus, setShareStatus] = useState("");
  const checklistText = useMemo(() => [
    "Bangkok Arrival-Day Checklist — The Stay & Wander",
    "https://thestayandwander.com/blog/bangkok-hotel-price-index-2026",
    "",
    ...arrivalSteps.map((step, index) => `${completed.includes(index) ? "[x]" : "[ ]"} ${step}`),
  ].join("\n"), [completed]);

  const downloadChecklist = () => {
    const blob = new Blob([checklistText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "bangkok-arrival-day-checklist.txt";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  const emailChecklist = () => {
    const subject = "Bangkok Arrival-Day Checklist — The Stay & Wander";
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(checklistText)}`;
  };

  const buildShareUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("arrivalChecklist", completed.slice().sort((a, b) => a - b).join(","));
    return url.toString();
  };

  const shareChecklistLink = async () => {
    const shareUrl = buildShareUrl();
    try {
      if (navigator.share) {
        await navigator.share({ title: "Bangkok Arrival-Day Checklist", text: "Coordinate our Bangkok airport transfer and hotel check-in plan.", url: shareUrl });
        setShareStatus("Share link opened.");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setShareStatus("Checklist link copied.");
      } else {
        setShareStatus(shareUrl);
      }
    } catch {
      setShareStatus("Sharing was cancelled. You can copy the checklist link instead.");
    }
  };

  const downloadCalendarReminder = (kind: "pickup" | "checkin") => {
    const date = kind === "pickup" ? pickupDate : checkInDate;
    const time = kind === "pickup" ? pickupTime : checkInTime;
    if (!date) { setShareStatus(`Choose a ${kind === "pickup" ? "pickup" : "hotel check-in"} date first.`); return; }
    const start = new Date(`${date}T${time}:00`);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const stamp = (value: Date) => value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const title = kind === "pickup" ? "Bangkok airport pickup" : "Bangkok hotel check-in";
    const description = kind === "pickup" ? "Confirm transfer vehicle, luggage, and airport pickup point." : "Confirm hotel address, reservation, and arrival details.";
    const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//The Stay & Wander//Bangkok Arrival Planner//EN\r\nBEGIN:VEVENT\r\nUID:${kind}-${start.getTime()}@thestayandwander.com\r\nDTSTAMP:${stamp(new Date())}\r\nDTSTART:${stamp(start)}\r\nDTEND:${stamp(end)}\r\nSUMMARY:${title}\r\nDESCRIPTION:${description}\r\nBEGIN:VALARM\r\nTRIGGER:-PT2H\r\nACTION:DISPLAY\r\nDESCRIPTION:${title}\r\nEND:VALARM\r\nEND:VEVENT\r\nEND:VCALENDAR`;
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `bangkok-${kind}-reminder.ics`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="mt-12 rounded-3xl border border-[#cfe4ee] bg-[#eef8fb] p-6 md:p-8" aria-labelledby="bangkok-arrival-checklist-heading">
      <div className="flex gap-3"><div className="rounded-full bg-white p-3 text-[#0077B6]"><PlaneLanding className="h-5 w-5" aria-hidden="true" /></div><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Arrival planning</p><h2 id="bangkok-arrival-checklist-heading" className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Downloadable Bangkok arrival-day checklist</h2><p className="mt-3 max-w-3xl leading-relaxed text-slate-700">Tick off your transfer and check-in steps, then download the current list for offline reference on arrival day.</p></div></div>
      <div className="mt-6 grid gap-3">{arrivalSteps.map((step, index) => { const isDone = completed.includes(index); return <label key={step} className="flex cursor-pointer items-start gap-3 rounded-xl border border-white bg-white p-4 text-sm leading-relaxed text-slate-700"><input type="checkbox" checked={isDone} onChange={() => setCompleted((current) => isDone ? current.filter((item) => item !== index) : [...current, index])} className="mt-0.5 h-4 w-4 accent-[#0077B6]" /><span className={isDone ? "text-slate-400 line-through" : ""}>{step}</span></label>; })}</div>
      <div className="mt-6 flex flex-wrap gap-3"><button type="button" onClick={downloadChecklist} className="inline-flex items-center gap-2 rounded-full bg-[#0077B6] px-5 py-3 text-sm font-semibold text-white hover:bg-[#005c91]"><Download className="h-4 w-4" aria-hidden="true" />Download Arrival-Day Checklist</button><button type="button" onClick={emailChecklist} className="inline-flex items-center gap-2 rounded-full border border-[#0077B6] bg-white px-5 py-3 text-sm font-semibold text-[#0077B6] hover:bg-[#e5f4fb]"><Mail className="h-4 w-4" aria-hidden="true" />Email Checklist to My Group</button><button type="button" onClick={shareChecklistLink} className="inline-flex items-center gap-2 rounded-full border border-[#0077B6] bg-white px-5 py-3 text-sm font-semibold text-[#0077B6] hover:bg-[#e5f4fb]"><Link2 className="h-4 w-4" aria-hidden="true" />Share Checklist Link</button></div>
      <div className="mt-7 rounded-2xl border border-white bg-white p-5"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0077B6]">Calendar reminders</p><h3 className="mt-2 font-playfair text-xl font-bold text-[#0D1B2A]">Add pickup and check-in to your calendar</h3><div className="mt-4 grid gap-4 md:grid-cols-2"><div className="rounded-xl bg-[#eef8fb] p-4"><p className="font-semibold text-[#0D1B2A]">Airport pickup</p><div className="mt-3 grid grid-cols-2 gap-3"><label className="text-sm text-slate-700">Date<input type="date" value={pickupDate} onChange={(event) => setPickupDate(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label><label className="text-sm text-slate-700">Time<input type="time" value={pickupTime} onChange={(event) => setPickupTime(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label></div><button type="button" onClick={() => downloadCalendarReminder("pickup")} className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0077B6] px-4 py-2 text-sm font-semibold text-white"><CalendarPlus className="h-4 w-4" aria-hidden="true" />Add Pickup Reminder</button></div><div className="rounded-xl bg-[#eef8fb] p-4"><p className="font-semibold text-[#0D1B2A]">Hotel check-in</p><div className="mt-3 grid grid-cols-2 gap-3"><label className="text-sm text-slate-700">Date<input type="date" value={checkInDate} onChange={(event) => setCheckInDate(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label><label className="text-sm text-slate-700">Time<input type="time" value={checkInTime} onChange={(event) => setCheckInTime(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label></div><button type="button" onClick={() => downloadCalendarReminder("checkin")} className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0077B6] px-4 py-2 text-sm font-semibold text-white"><CalendarPlus className="h-4 w-4" aria-hidden="true" />Add Check-in Reminder</button></div></div></div>
      {shareStatus && <p className="mt-4 text-sm text-slate-700">{shareStatus}</p>}<p className="mt-4 inline-flex items-center gap-2 text-sm text-slate-600"><CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />Your selections stay in this browser until you refresh or leave the page.</p>
    </section>
  );
}
