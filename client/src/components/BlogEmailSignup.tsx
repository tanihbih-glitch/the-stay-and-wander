import { useState } from "react";
import { Compass, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BlogEmailSignup() {
  const [email, setEmail] = useState("");
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
        setEmail("");

        // Auto-hide success message after 3 seconds
        setTimeout(() => {
          setSubmitted(false);
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
            }),
          }
        );

        if (response.ok) {
          setSubmitted(true);
          setEmail("");

          // Auto-hide success message after 3 seconds
          setTimeout(() => {
            setSubmitted(false);
          }, 3000);
        } else {
          setError("Failed to subscribe. Please try again.");
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Subscription error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 mb-16" style={{ backgroundColor: "#F8EFE0" }}>
      <div className="container max-w-2xl mx-auto">
        <div className="rounded-2xl p-8 md:p-12">
          {!submitted ? (
            <>
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <Compass
                  className="w-12 h-12"
                  style={{ color: "#0077B6" }}
                />
              </div>

              {/* Headline */}
              <h2
                className="font-display text-3xl md:text-4xl font-bold text-center mb-3"
                style={{ color: "#0077B6" }}
              >
                Enjoyed This Guide?
              </h2>

              {/* Subheadline */}
              <p className="text-gray-700 text-center text-lg mb-8">
                Get weekly hotel deals, travel guides and destination inspiration
                straight to your inbox
              </p>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 font-medium text-sm">{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="text-white font-semibold px-8 py-3 whitespace-nowrap"
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
                    {isLoading ? "Subscribing..." : "Subscribe Free"}
                  </Button>
                </div>

                <p className="text-xs text-gray-600 text-center">
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
                  Welcome!
                </h3>
                <p style={{ color: "#F4A261" }} className="text-lg font-semibold">
                  Welcome to The Stay & Wander family!
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
