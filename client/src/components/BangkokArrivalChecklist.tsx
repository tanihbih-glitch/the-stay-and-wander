import { CalendarPlus, CheckCircle2, Clipboard, Download, Link2, Mail, PlaneLanding, Printer } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const arrivalSteps = [
  "Save your hotel address and district in Thai and English.",
  "Confirm your BKK or DMK arrival terminal and transfer pickup point.",
  "Keep a cash or card backup for airport rail, taxi surcharge, tolls, or luggage fees.",
  "Screenshot your airport transfer booking or live ride-hailing confirmation.",
  "Message your hotel if you expect a late arrival or need luggage storage.",
  "Keep your passport, arrival documents, and hotel confirmation accessible.",
  "On arrival, verify the vehicle and fare details before leaving the airport.",
];

const timeZones = [
  { value: "Asia/Bangkok", label: "Bangkok (ICT, UTC+7)" },
  { value: "Asia/Dubai", label: "Dubai (GST, UTC+4)" },
  { value: "Europe/London", label: "London (UK)" },
  { value: "America/New_York", label: "New York (US Eastern)" },
  { value: "UTC", label: "UTC" },
];

type ReminderKind = "pickup" | "checkin";

function zonedDateTime(date: string, time: string, timeZone: string) {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const asUtc = Date.UTC(year, month - 1, day, hour, minute);
  const formatter = new Intl.DateTimeFormat("en-US", { timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  const parts = Object.fromEntries(formatter.formatToParts(new Date(asUtc)).filter(({ type }) => type !== "literal").map(({ type, value }) => [type, value]));
  const zoneAsUtc = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), Number(parts.hour), Number(parts.minute));
  return new Date(asUtc - (zoneAsUtc - asUtc));
}

export default function BangkokArrivalChecklist() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkInTime, setCheckInTime] = useState("15:00");
  const [tripTitle, setTripTitle] = useState("");
  const [attendeeEmails, setAttendeeEmails] = useState("");
  const [timeZone, setTimeZone] = useState("Asia/Bangkok");
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [shareStatus, setShareStatus] = useState("");
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const saved = window.localStorage.getItem("tsw-bangkok-hotel-confirmation");
    if (saved) setConfirmationNumber(saved);
    const interval = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (confirmationNumber.trim()) window.localStorage.setItem("tsw-bangkok-hotel-confirmation", confirmationNumber.trim());
    else window.localStorage.removeItem("tsw-bangkok-hotel-confirmation");
  }, [confirmationNumber]);

  const cleanAttendees = attendeeEmails.split(/[;,\s]+/).map((email) => email.trim()).filter(Boolean).join(",");
  const checklistText = useMemo(() => ["Bangkok Arrival-Day Checklist — The Stay & Wander", "https://thestayandwander.com/blog/bangkok-hotel-price-index-2026", "", ...arrivalSteps.map((step, index) => `${completed.includes(index) ? "[x]" : "[ ]"} ${step}`)].join("\n"), [completed]);

  const reminderDetails = (kind: ReminderKind) => {
    const date = kind === "pickup" ? pickupDate : checkInDate;
    const time = kind === "pickup" ? pickupTime : checkInTime;
    if (!date) return null;
    const start = zonedDateTime(date, time, timeZone);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const baseTitle = kind === "pickup" ? "Bangkok airport pickup" : "Bangkok hotel check-in";
    const title = tripTitle.trim() ? `${tripTitle.trim()} — ${baseTitle}` : baseTitle;
    const description = kind === "pickup" ? "Confirm transfer vehicle, luggage, and airport pickup point." : `Confirm hotel address, reservation, and arrival details.${confirmationNumber.trim() ? ` Confirmation: ${confirmationNumber.trim()}.` : ""}`;
    return { start, end, title, description };
  };

  const downloadText = (content: string, filename: string, type = "text/plain;charset=utf-8") => {
    const blob = new Blob([content], { type }); const url = URL.createObjectURL(blob); const anchor = document.createElement("a");
    anchor.href = url; anchor.download = filename; document.body.appendChild(anchor); anchor.click(); anchor.remove(); URL.revokeObjectURL(url);
  };

  const shareChecklistLink = async () => {
    const url = new URL(window.location.href); url.searchParams.set("arrivalChecklist", completed.slice().sort((a, b) => a - b).join(","));
    try { if (navigator.share) { await navigator.share({ title: "Bangkok Arrival-Day Checklist", text: "Coordinate our Bangkok airport transfer and hotel check-in plan.", url: url.toString() }); setShareStatus("Share link opened."); } else if (navigator.clipboard) { await navigator.clipboard.writeText(url.toString()); setShareStatus("Checklist link copied."); } else setShareStatus(url.toString()); } catch { setShareStatus("Sharing was cancelled. You can copy the checklist link instead."); }
  };

  const calendarStamp = (value: Date) => `${value.getFullYear()}${String(value.getMonth() + 1).padStart(2, "0")}${String(value.getDate()).padStart(2, "0")}T${String(value.getHours()).padStart(2, "0")}${String(value.getMinutes()).padStart(2, "0")}00`;
  const downloadCalendarReminder = (kind: ReminderKind) => {
    const event = reminderDetails(kind); if (!event) { setShareStatus(`Choose a ${kind === "pickup" ? "pickup" : "hotel check-in"} date first.`); return; }
    const stamp = (value: Date) => value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const attendeeLine = cleanAttendees ? `\r\nATTENDEE:${cleanAttendees}` : "";
    const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//The Stay & Wander//Bangkok Arrival Planner//EN\r\nX-WR-TIMEZONE:${timeZone}\r\nBEGIN:VEVENT\r\nUID:${kind}-${event.start.getTime()}@thestayandwander.com\r\nDTSTAMP:${stamp(new Date())}\r\nDTSTART:${stamp(event.start)}\r\nDTEND:${stamp(event.end)}\r\nSUMMARY:${event.title}\r\nDESCRIPTION:${event.description}${attendeeLine}\r\nBEGIN:VALARM\r\nTRIGGER:-PT2H\r\nACTION:DISPLAY\r\nDESCRIPTION:${event.title}\r\nEND:VALARM\r\nEND:VEVENT\r\nEND:VCALENDAR`;
    downloadText(ics, `bangkok-${kind}-reminder.ics`, "text/calendar;charset=utf-8");
  };
  const googleCalendarUrl = (kind: ReminderKind) => { const event = reminderDetails(kind); if (!event) return ""; return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${calendarStamp(event.start)}/${calendarStamp(event.end)}&details=${encodeURIComponent(event.description)}&ctz=${encodeURIComponent(timeZone)}${cleanAttendees ? `&add=${encodeURIComponent(cleanAttendees)}` : ""}`; };
  const outlookCalendarUrl = (kind: ReminderKind) => { const event = reminderDetails(kind); if (!event) return ""; return `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.title)}&startdt=${encodeURIComponent(event.start.toISOString())}&enddt=${encodeURIComponent(event.end.toISOString())}&body=${encodeURIComponent(event.description)}&timezone=${encodeURIComponent(timeZone)}${cleanAttendees ? `&to=${encodeURIComponent(cleanAttendees)}` : ""}`; };
  const copyEventDetails = async (kind: ReminderKind) => { const event = reminderDetails(kind); if (!event) { setShareStatus(`Choose a ${kind === "pickup" ? "pickup" : "hotel check-in"} date first.`); return; } const message = `${event.title}\n${event.start.toLocaleString([], { timeZone })} – ${event.end.toLocaleTimeString([], { timeZone, hour: "2-digit", minute: "2-digit" })}\n${event.description}${cleanAttendees ? `\nAttendees: ${cleanAttendees}` : ""}`; try { await navigator.clipboard.writeText(message); setShareStatus("Event details copied for your group chat."); } catch { setShareStatus(message); } };

  const checkInCountdown = useMemo(() => { if (!checkInDate) return "Choose a check-in date to start your trip countdown."; const difference = zonedDateTime(checkInDate, checkInTime, timeZone).getTime() - now; if (difference <= 0) return "Your selected hotel check-in time has arrived or passed."; return `${Math.floor(difference / 86_400_000)}d ${Math.floor((difference % 86_400_000) / 3_600_000)}h ${Math.floor((difference % 3_600_000) / 60_000)}m until hotel check-in.`; }, [checkInDate, checkInTime, timeZone, now]);
  const printArrivalCard = () => window.print();

  const CalendarActions = ({ kind }: { kind: ReminderKind }) => { const googleUrl = googleCalendarUrl(kind); const outlookUrl = outlookCalendarUrl(kind); return <div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => downloadCalendarReminder(kind)} className="rounded-full bg-[#0077B6] px-4 py-2 text-sm font-semibold text-white"><CalendarPlus className="mr-2 inline h-4 w-4" />Download Reminder</button><button type="button" onClick={() => copyEventDetails(kind)} className="rounded-full border border-[#0077B6] bg-white px-4 py-2 text-sm font-semibold text-[#0077B6]"><Clipboard className="mr-2 inline h-4 w-4" />Copy Event Details</button>{googleUrl && <a href={googleUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#0077B6] bg-white px-4 py-2 text-sm font-semibold text-[#0077B6]">Open Google Calendar</a>}{outlookUrl && <a href={outlookUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#0077B6] bg-white px-4 py-2 text-sm font-semibold text-[#0077B6]">Open Outlook Calendar</a>}</div>; };

  return <section className="bangkok-arrival-section mt-12 rounded-3xl border border-[#cfe4ee] bg-[#eef8fb] p-6 md:p-8" aria-labelledby="bangkok-arrival-checklist-heading">
    <style>{`@media print { body * { visibility:hidden !important; } #bangkok-arrival-card, #bangkok-arrival-card * { visibility:visible !important; } #bangkok-arrival-card { position:absolute; inset:0; width:100%; padding:24px; color:#0D1B2A; } }`}</style>
    <div className="flex gap-3"><div className="rounded-full bg-white p-3 text-[#0077B6]"><PlaneLanding className="h-5 w-5" /></div><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Arrival planning</p><h2 id="bangkok-arrival-checklist-heading" className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Downloadable Bangkok arrival-day checklist</h2><p className="mt-3 max-w-3xl text-slate-700">Tick off your transfer and check-in steps, then download, print, or share the current plan.</p></div></div>
    <div className="mt-6 rounded-2xl bg-[#0D1B2A] p-5 text-white" aria-live="polite"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9ed1e7]">Your trip countdown</p><p className="mt-2 font-playfair text-2xl font-bold">{checkInCountdown}</p></div>
    <div className="mt-6 grid gap-3">{arrivalSteps.map((step, index) => { const done = completed.includes(index); return <label key={step} className="flex items-start gap-3 rounded-xl border border-white bg-white p-4 text-sm text-slate-700"><input type="checkbox" checked={done} onChange={() => setCompleted((items) => done ? items.filter((item) => item !== index) : [...items, index])} className="mt-0.5 h-4 w-4 accent-[#0077B6]" /><span className={done ? "text-slate-400 line-through" : ""}>{step}</span></label>; })}</div>
    <div className="mt-6 flex flex-wrap gap-3"><button type="button" onClick={() => downloadText(checklistText, "bangkok-arrival-day-checklist.txt")} className="rounded-full bg-[#0077B6] px-5 py-3 text-sm font-semibold text-white"><Download className="mr-2 inline h-4 w-4" />Download Checklist</button><button type="button" onClick={() => { window.location.href = `mailto:?subject=${encodeURIComponent("Bangkok Arrival-Day Checklist — The Stay & Wander")}&body=${encodeURIComponent(checklistText)}`; }} className="rounded-full border border-[#0077B6] bg-white px-5 py-3 text-sm font-semibold text-[#0077B6]"><Mail className="mr-2 inline h-4 w-4" />Email My Group</button><button type="button" onClick={shareChecklistLink} className="rounded-full border border-[#0077B6] bg-white px-5 py-3 text-sm font-semibold text-[#0077B6]"><Link2 className="mr-2 inline h-4 w-4" />Share Checklist Link</button><button type="button" onClick={printArrivalCard} className="rounded-full border border-[#0077B6] bg-white px-5 py-3 text-sm font-semibold text-[#0077B6]"><Printer className="mr-2 inline h-4 w-4" />Print Arrival Card</button></div>
    <div className="mt-7 rounded-2xl border border-white bg-white p-5"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0077B6]">Calendar reminders</p><h3 className="mt-2 font-playfair text-xl font-bold text-[#0D1B2A]">Add pickup and check-in to your calendar</h3><div className="mt-4 grid gap-4 md:grid-cols-2"><label className="text-sm font-semibold text-[#0D1B2A]">Reminder time zone<select value={timeZone} onChange={(event) => setTimeZone(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal">{timeZones.map((zone) => <option key={zone.value} value={zone.value}>{zone.label}</option>)}</select></label><label className="text-sm font-semibold text-[#0D1B2A]">Optional trip title<input value={tripTitle} onChange={(event) => setTripTitle(event.target.value)} placeholder="e.g. Bangkok getaway" className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" /></label><label className="text-sm font-semibold text-[#0D1B2A]">Attendee emails (optional)<input value={attendeeEmails} onChange={(event) => setAttendeeEmails(event.target.value)} placeholder="friend@example.com, group@example.com" className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" /></label><label className="text-sm font-semibold text-[#0D1B2A]">Hotel confirmation number (browser only)<input value={confirmationNumber} onChange={(event) => setConfirmationNumber(event.target.value)} placeholder="Enter confirmation number" className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal" /></label></div><p className="mt-2 text-xs text-slate-500">Confirmation details stay only in this browser. Calendar invitations are created in your chosen calendar provider.</p><div className="mt-4 grid gap-4 md:grid-cols-2"><div className="rounded-xl bg-[#eef8fb] p-4"><p className="font-semibold text-[#0D1B2A]">Airport pickup</p><div className="mt-3 grid grid-cols-2 gap-3"><label className="text-sm">Date<input type="date" value={pickupDate} onChange={(event) => setPickupDate(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label><label className="text-sm">Time<input type="time" value={pickupTime} onChange={(event) => setPickupTime(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label></div><CalendarActions kind="pickup" /></div><div className="rounded-xl bg-[#eef8fb] p-4"><p className="font-semibold text-[#0D1B2A]">Hotel check-in</p><div className="mt-3 grid grid-cols-2 gap-3"><label className="text-sm">Date<input type="date" value={checkInDate} onChange={(event) => setCheckInDate(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label><label className="text-sm">Time<input type="time" value={checkInTime} onChange={(event) => setCheckInTime(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label></div><CalendarActions kind="checkin" /></div></div></div>
    <aside id="bangkok-arrival-card" className="mt-7 rounded-2xl border-2 border-dashed border-[#0077B6] bg-white p-5"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0077B6]">Compact arrival card</p><h3 className="mt-2 font-playfair text-2xl font-bold text-[#0D1B2A]">{tripTitle.trim() || "Bangkok arrival plan"}</h3><dl className="mt-4 grid gap-3 text-sm md:grid-cols-2"><div><dt className="font-semibold text-[#0D1B2A]">Airport pickup</dt><dd>{pickupDate || "Date not set"} · {pickupTime} · {timeZone}</dd></div><div><dt className="font-semibold text-[#0D1B2A]">Hotel check-in</dt><dd>{checkInDate || "Date not set"} · {checkInTime} · {timeZone}</dd></div><div><dt className="font-semibold text-[#0D1B2A]">Hotel confirmation</dt><dd>{confirmationNumber.trim() || "Not saved"}</dd></div><div><dt className="font-semibold text-[#0D1B2A]">Group</dt><dd>{cleanAttendees || "No attendee emails added"}</dd></div></dl></aside>
    {shareStatus && <p className="mt-4 text-sm text-slate-700">{shareStatus}</p>}<p className="mt-4 inline-flex items-center gap-2 text-sm text-slate-600"><CheckCircle2 className="h-4 w-4 text-emerald-600" />Your checklist selections remain in this browser until you leave or refresh the page.</p>
  </section>;
}
