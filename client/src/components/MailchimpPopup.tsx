import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Mail, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface MailchimpPopupProps {
  title: string;
  description: string;
  trigger?: "exit-intent" | "delay" | "manual";
  delayMs?: number;
  onClose?: () => void;
}

export default function MailchimpPopup({
  title,
  description,
  trigger = "delay",
  delayMs = 5000,
  onClose,
}: MailchimpPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setEmail("");
      setName("");
      toast.success("Thank you for subscribing!");

      // Close popup after 3 seconds
      setTimeout(() => {
        handleClose();
      }, 3000);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to subscribe. Please try again.");
    },
  });

  // Delay trigger
  useEffect(() => {
    if (trigger === "delay") {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, delayMs);

      return () => clearTimeout(timer);
    }
  }, [trigger, delayMs]);

  // Exit intent trigger
  useEffect(() => {
    if (trigger !== "exit-intent") return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [trigger]);

  const handleClose = () => {
    setIsOpen(false);
    setEmail("");
    setName("");
    setSubmitted(false);
    onClose?.();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !name) {
      toast.error("Please fill in all fields");
      return;
    }

    subscribeMutation.mutate({ email, name });

    // Also submit to Mailchimp if available
    if (typeof window !== "undefined" && (window as any).mce_form && (window as any).mce_form.submit) {
      try {
        (window as any).mce_form.submit();
      } catch (e) {
        // Mailchimp form not available, that's okay
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto">
        {/* Close button */}
        <div className="flex justify-end p-4 border-b">
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <Mail className="w-12 h-12 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-600">{description}</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    First Name
                  </label>
                  <Input
                    type="text"
                    placeholder="John"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={subscribeMutation.isPending}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={subscribeMutation.isPending}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={subscribeMutation.isPending}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
                >
                  {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600">
                  Check your email for exclusive travel tips and offers.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
