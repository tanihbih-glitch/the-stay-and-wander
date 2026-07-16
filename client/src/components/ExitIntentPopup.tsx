import { useState, useEffect } from "react";
import { X, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  // Email validation regex
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check if popup has been shown in this session
  useEffect(() => {
    const sessionKey = "exitIntentPopupShown";
    const hasBeenShown = sessionStorage.getItem(sessionKey);
    if (hasBeenShown) {
      setHasShown(true);
    }
  }, []);

  // Detect exit intent (cursor moving toward top of page)
  useEffect(() => {
    if (hasShown) return; // Don't set up listener if already shown

    // Only show on desktop (not mobile)
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Check if cursor is moving toward the top of the page (exit intent)
      if (e.clientY <= 0) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem("exitIntentPopupShown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

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

        if (emailInput) emailInput.value = email;

        // Submit the form
        win.mce_form.submit();

        // Show success message
        setSubmitted(true);

        // Close popup after 2 seconds
        setTimeout(() => {
          handleClose();
        }, 2000);
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
            }),
          }
        );

        if (response.ok) {
          setSubmitted(true);

          // Close popup after 2 seconds
          setTimeout(() => {
            handleClose();
          }, 2000);
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

  const handleClose = () => {
    setIsOpen(false);
    setEmail("");
    setError(null);
    setSubmitted(false);
  };

  const handleDismiss = () => {
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(26, 26, 26, 0.7)",
      }}
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
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
                  className="font-display text-3xl md:text-4xl font-bold mb-3"
                  style={{ color: "#0077B6" }}
                >
                  Wait — Before You Go!
                </h2>
                <p className="text-gray-600 text-lg">
                  Get our free 2026 Europe & Asia Travel Guide delivered to your inbox
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
                  {isLoading ? "Sending..." : "Yes, Send Me the Guide"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Join 25,000+ travellers. No spam ever.
                </p>

                <button
                  type="button"
                  onClick={handleDismiss}
                  className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 transition-colors"
                >
                  No thanks, I don't want the free guide
                </button>
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
                  Thank You!
                </h3>
                <p style={{ color: "#F4A261" }} className="text-lg font-semibold">
                  Check your inbox for the travel guide.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
