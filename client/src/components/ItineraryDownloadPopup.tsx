import { useState } from "react";
import { X, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ItineraryDownloadPopupProps {
  isOpen: boolean;
  onClose: () => void;
  itineraryTitle: string;
}

export default function ItineraryDownloadPopup({
  isOpen,
  onClose,
  itineraryTitle,
}: ItineraryDownloadPopupProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Email validation regex
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate inputs
    if (!name.trim()) {
      setError("Please enter your first name");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Submit to Mailchimp using the global script
      const win = window as any;

      if (win.mce_form && typeof win.mce_form.submit === "function") {
        // Set the form fields
        const emailInput = document.querySelector(
          'input[name="EMAIL"]'
        ) as HTMLInputElement;
        const nameInput = document.querySelector(
          'input[name="FNAME"]'
        ) as HTMLInputElement;

        if (emailInput) emailInput.value = email;
        if (nameInput) nameInput.value = name;

        // Submit the form
        win.mce_form.submit();

        // Show success message
        setSubmitted(true);

        // Close popup after 3 seconds
        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setEmail("");
          setName("");
          setError(null);
        }, 3000);
      } else {
        // Fallback: Direct API call
        const response = await fetch(
          "https://chimpstatic.com/mcjs-connected/js/users/48ee0dc10117e46d5a5e32365/420603a8e8e11623f80d61e27.js",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email_address: email,
              status: "subscribed",
              merge_fields: {
                FNAME: name,
              },
            }),
          }
        );

        if (response.ok) {
          setSubmitted(true);

          // Close popup after 3 seconds
          setTimeout(() => {
            onClose();
            setSubmitted(false);
            setEmail("");
            setName("");
            setError(null);
          }, 3000);
        } else {
          setError("Failed to submit. Please try again.");
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Submission error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(26, 26, 26, 0.7)",
      }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        <div className="p-8">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="mb-6">
                <h2
                  className="text-2xl md:text-3xl font-bold mb-2"
                  style={{ color: "#0077B6" }}
                >
                  Get Your Free Itinerary PDF
                </h2>
                <p className="text-gray-600">
                  Enter your email and we'll send it straight to your inbox
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 font-medium text-sm">{error}</p>
                </div>
              )}

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
                    onChange={(e) => {
                      setName(e.target.value);
                      setError(null);
                    }}
                    className="w-full"
                    disabled={isLoading}
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
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    className="w-full"
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-white font-semibold py-3 text-lg"
                  style={{
                    backgroundColor: "#F4A261",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = "#E89250";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = "#F4A261";
                  }}
                >
                  {isLoading ? "Sending..." : "Send My Itinerary"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </form>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="text-center py-6">
                <div className="flex justify-center mb-4">
                  <CheckCircle
                    className="w-16 h-16"
                    style={{ color: "#F4A261" }}
                  />
                </div>
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ color: "#0077B6" }}
                >
                  Success!
                </h3>
                <p style={{ color: "#F4A261" }} className="text-lg font-semibold">
                  Check your inbox — your itinerary is on its way!
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
