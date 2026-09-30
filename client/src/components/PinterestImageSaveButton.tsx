import { Pin } from "lucide-react";

interface PinterestImageSaveButtonProps {
  title: string;
  url: string;
  media: string;
  className?: string;
}

/** A visible, keyboard-accessible Pinterest save affordance for editorial images. */
export default function PinterestImageSaveButton({ title, url, media, className = "" }: PinterestImageSaveButtonProps) {
  const shareUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(media)}&description=${encodeURIComponent(title)}`;

  return (
    <a
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Save the ${title} image to Pinterest`}
      className={`group/pin absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/40 bg-[#E60023]/95 px-3 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#bd001d] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#E60023] ${className}`}
    >
      <Pin className="h-4 w-4 transition-transform duration-200 group-hover/pin:rotate-[-10deg]" aria-hidden="true" />
      <span>Save to Pinterest</span>
    </a>
  );
}
