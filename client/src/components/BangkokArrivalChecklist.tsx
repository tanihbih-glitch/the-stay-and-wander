import { CalendarPlus, CheckCircle2, Clipboard, Download, Link2, Mail, PlaneLanding } from "lucide-react";
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

type ReminderKind = "pickup" | "checkin";

export default function BangkokArrivalChecklist() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkInTime, setCheckInTime] = useState("15:00");
  const [tripTitle, setTripTitle] = useState("");
  const [attendeeEmails, setAttendeeEmails] = useState("");
  const [shareStatus, setShareStatus] = useState("");
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const checklistText = useMemo(() => [
    "Bangkok Arrival-Day Checklist — The Stay & Wander",
    "https://thestayandwander.com/blog/bangkok-hotel-price-index-2026",
    "",
    ...arrivalSteps.map((step, index) => `${completed.includes(index) ? "[x]" : "[ ]"} ${step}`),
  ].join("\n"), [completed]);

  const cleanAttendees = attendeeEmails.split(/[;,\s]+/).map((email) => email.trim()).filter(Boolean).join(",");

  const reminderDetails = (kind: ReminderKind) => {
    const date = kind === "pickup" ? pickupDate : checkInDate;
    const time = kind === "pickup" ? pickupTime : checkInTime;
    if (!date) return null;
    const start = new Date(`${date}T${time}:00`);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const baseTitle = kind === "pickup" ? "Bangkok airport pickup" : "Bangkok hotel check-in";
    const title = tripTitle.trim() ? `${tripTitle.trim()} — ${baseTitle}` : baseTitle;
    const description = kind === "pickup" ? "Confirm transfer vehicle, luggage, and airport pickup point." : "Confirm hotel address, reservation, and arrival details.";
    return { start, end, title, description };
  };

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

  const downloadCalendarReminder = (kind: ReminderKind) => {
    const event = reminderDetails(kind);
    if (!event) { setShareStatus(`Choose a ${kind === "pickup" ? "pickup" : "hotel check-in"} date first.`); return; }
    const stamp = (value: Date) => value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const attendeeLine = cleanAttendees ? `\r\nATTENDEE:${cleanAttendees}` : "";
    const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//The Stay & Wander//Bangkok Arrival Planner//EN\r\nBEGIN:VEVENT\r\nUID:${kind}-${event.start.getTime()}@thestayandwander.com\r\nDTSTAMP:${stamp(new Date())}\r\nDTSTART:${stamp(event.start)}\r\nDTEND:${stamp(event.end)}\r\nSUMMARY:${event.title}\r\nDESCRIPTION:${event.description}${attendeeLine}\r\nBEGIN:VALARM\r\nTRIGGER:-PT2H\r\nACTION:DISPLAY\r\nDESCRIPTION:${event.title}\r\nEND:VALARM\r\nEND:VEVENT\r\nEND:VCALENDAR`;
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

  const calendarStamp = (value: Date) => `${value.getFullYear()}${String(value.getMonth() + 1).padStart(2, "0")}${String(value.getDate()).padStart(2, "0")}T${String(value.getHours()).padStart(2, "0")}${String(value.getMinutes()).padStart(2, "0")}00`;

  const googleCalendarUrl = (kind: ReminderKind) => {
    const event = reminderDetails(kind);
    if (!event) return "";
    const attendeeParam = cleanAttendees ? `&add=${encodeURIComponent(cleanAttendees)}` : "";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${calendarStamp(event.start)}/${calendarStamp(event.end)}&details=${encodeURIComponent(event.description)}${attendeeParam}`;
  };

  const outlookCalendarUrl = (kind: ReminderKind) => {
    const event = reminderDetails(kind);
    if (!event) return "";
    const attendeeParam = cleanAttendees ? `&to=${encodeURIComponent(cleanAttendees)}` : "";
    return `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.title)}&startdt=${encodeURIComponent(event.start.toISOString())}&enddt=${encodeURIComponent(event.end.toISOString())}&body=${encodeURIComponent(event.description)}${attendeeParam}`;
  };

  const copyEventDetails = async (kind: ReminderKind) => {
    const event = reminderDetails(kind);
    if (!event) { setShareStatus(`Choose a ${kind === "pickup" ? "pickup" : "hotel check-in"} date first.`); return; }
    const message = `${event.title}\n${event.start.toLocaleString()} – ${event.end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}\n${event.description}${cleanAttendees ? `\nAttendees: ${cleanAttendees}` : ""}`;
    try {
      await navigator.clipboard.writeText(message);
      setShareStatus("Event details copied for your group chat.");
    } catch {
      setShareStatus(message);
    }
  };

  const checkInCountdown = useMemo(() => {
    if (!checkInDate) return "Choose a check-in date to start your trip countdown.";
    const target = new Date(`${checkInDate}T${checkInTime}:00`).getTime();
    const difference = target - now;
    if (difference <= 0) return "Your selected hotel check-in time has arrived or passed.";
    const days = Math.floor(difference / 86_400_000);
    const hours = Math.floor((difference % 86_400_000) / 3_600_000);
    const minutes = Math.floor((difference % 3_600_000) / 60_000);
    return `${days}d ${hours}h ${minutes}m until hotel check-in.`;
  }, [checkInDate, checkInTime, now]);

  const CalendarActions = ({ kind }: { kind: ReminderKind }) => {
    const googleUrl = googleCalendarUrl(kind);
    const outlookUrl = outlookCalendarUrl(kind);
    return <div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => downloadCalendarReminder(kind)} className="inline-flex items-center gap-2 rounded-full bg-[#0077B6] px-4 py-2 text-sm font-semibold text-white"><CalendarPlus className="h-4 w-4" aria-hidden="true" />Download Reminder</button><button type="button" onClick={() => copyEventDetails(kind)} className="inline-flex items-center gap-2 rounded-full border border-[#0077B6] bg-white px-4 py-2 text-sm font-semibold text-[#0077B6]"><Clipboard className="h-4 w-4" aria-hidden="true" />Copy Event Details</button>{googleUrl ? <a href={googleUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#0077B6] bg-white px-4 py-2 text-sm font-semibold text-[#0077B6]">Open Google Calendar</a> : <span className="self-center text-xs text-slate-500">Choose a date to enable calendar links.</span>}{outlookUrl && <a href={outlookUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#0077B6] bg-white px-4 py-2 text-sm font-semibold text-[#0077B6]">Open Outlook Calendar</a>}</div>;
  };

  return (
    <section className="mt-12 rounded-3xl border border-[#cfe4ee] bg-[#eef8fb] p-6 md:p-8" aria-labelledby="bangkok-arrival-checklist-heading">
      <div className="flex gap-3"><div className="rounded-full bg-white p-3 text-[#0077B6]"><PlaneLanding className="h-5 w-5" aria-hidden="true" /></div><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0077B6]">Arrival planning</p><h2 id="bangkok-arrival-checklist-heading" className="mt-2 font-playfair text-3xl font-bold text-[#0D1B2A]">Downloadable Bangkok arrival-day checklist</h2><p className="mt-3 max-w-3xl leading-relaxed text-slate-700">Tick off your transfer and check-in steps, then download or share the current list for arrival day.</p></div></div>
      <div className="mt-6 rounded-2xl bg-[#0D1B2A] p-5 text-white" aria-live="polite"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9ed1e7]">Your trip countdown</p><p className="mt-2 font-playfair text-2xl font-bold">{checkInCountdown}</p></div>
      <div className="mt-6 grid gap-3">{arrivalSteps.map((step, index) => { const isDone = completed.includes(index); return <label key={step} className="flex cursor-pointer items-start gap-3 rounded-xl border border-white bg-white p-4 text-sm leading-relaxed text-slate-700"><input type="checkbox" checked={isDone} onChange={() => setCompleted((current) => isDone ? current.filter((item) => item !== index) : [...current, index])} className="mt-0.5 h-4 w-4 accent-[#0077B6]" /><span className={isDone ? "text-slate-400 line-through" : ""}>{step}</span></label>; })}</div>
      <div className="mt-6 flex flex-wrap gap-3"><button type="button" onClick={downloadChecklist} className="inline-flex items-center gap-2 rounded-full bg-[#0077B6] px-5 py-3 text-sm font-semibold text-white hover:bg-[#005c91]"><Download className="h-4 w-4" aria-hidden="true" />Download Arrival-Day Checklist</button><button type="button" onClick={emailChecklist} className="inline-flex items-center gap-2 rounded-full border border-[#0077B6] bg-white px-5 py-3 text-sm font-semibold text-[#0077B6] hover:bg-[#e5f4fb]"><Mail className="h-4 w-4" aria-hidden="true" />Email Checklist to My Group</button><button type="button" onClick={shareChecklistLink} className="inline-flex items-center gap-2 rounded-full border border-[#0077B6] bg-white px-5 py-3 text-sm font-semibold text-[#0077B6] hover:bg-[#e5f4fb]"><Link2 className="h-4 w-4" aria-hidden="true" />Share Checklist Link</button></div>
      <div className="mt-7 rounded-2xl border border-white bg-white p-5"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0077B6]">Calendar reminders</p><h3 className="mt-2 font-playfair text-xl font-bold text-[#0D1B2A]">Add pickup and check-in to your calendar</h3><label className="mt-4 block max-w-xl text-sm font-semibold text-[#0D1B2A]">Optional trip title<input type="text" value={tripTitle} onChange={(event) => setTripTitle(event.target.value)} placeholder="e.g. Tanih’s Bangkok getaway" className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal text-slate-800" /></label><label className="mt-4 block max-w-xl text-sm font-semibold text-[#0D1B2A]">Attendee emails (optional)<input type="text" value={attendeeEmails} onChange={(event) => setAttendeeEmails(event.target.value)} placeholder="friend@example.com, travelgroup@example.com" className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal text-slate-800" /></label><p className="mt-2 text-xs text-slate-500">Trip titles appear in every reminder. Attendee addresses are passed to supported calendar invitation fields; send the invitation from your calendar provider.</p><div className="mt-4 grid gap-4 md:grid-cols-2"><div className="rounded-xl bg-[#eef8fb] p-4"><p className="font-semibold text-[#0D1B2A]">Airport pickup</p><div className="mt-3 grid grid-cols-2 gap-3"><label className="text-sm text-slate-700">Date<input type="date" value={pickupDate} onChange={(event) => setPickupDate(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label><label className="text-sm text-slate-700">Time<input type="time" value={pickupTime} onChange={(event) => setPickupTime(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label></div><CalendarActions kind="pickup" /></div><div className="rounded-xl bg-[#eef8fb] p-4"><p className="font-semibold text-[#0D1B2A]">Hotel check-in</p><div className="mt-3 grid grid-cols-2 gap-3"><label className="text-sm text-slate-700">Date<input type="date" value={checkInDate} onChange={(event) => setCheckInDate(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label><label className="text-sm text-slate-700">Time<input type="time" value={checkInTime} onChange={(event) => setCheckInTime(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label></div><CalendarActions kind="checkin" /></div></div></div>
      {shareStatus && <p className="mt-4 text-sm text-slate-700">{shareStatus}</p>}<p className="mt-4 inline-flex items-center gap-2 text-sm text-slate-600"><CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />Your selections stay in this browser until you refresh or leave the page.</p>
    </section>
  );
}
