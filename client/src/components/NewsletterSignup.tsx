import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Gift, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      
      if (win.mce_form && typeof win.mce_form.submit === 'function') {
        // Set the form fields
        const emailInput = document.querySelector('input[name="EMAIL"]') as HTMLInputElement;
        const nameInput = document.querySelector('input[name="FNAME"]') as HTMLInputElement;
        
        if (emailInput) emailInput.value = email;
        if (nameInput) nameInput.value = name;

        // Submit the form
        win.mce_form.submit();
        
        // Show success message
        setSubmitted(true);
        setEmail("");
        setName("");
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        // Fallback: Use Mailchimp API directly
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
          setEmail("");
          setName("");
          
          // Auto-hide success message after 5 seconds
          setTimeout(() => {
            setSubmitted(false);
          }, 5000);
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
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <Gift className="w-12 h-12 text-blue-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  Get Your Free Travel Guide
                </h2>
                <p className="text-lg text-gray-600">
                  Subscribe to our newsletter and receive exclusive travel tips,
                  destination guides, and special offers delivered to your inbox.
                </p>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Free Guide</p>
                    <p className="text-sm text-gray-600">Exclusive travel insights</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Weekly Tips</p>
                    <p className="text-sm text-gray-600">Destination guides & deals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Exclusive Offers</p>
                    <p className="text-sm text-gray-600">Subscriber-only discounts</p>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 text-lg"
                >
                  {isLoading ? (
                    "Sending..."
                  ) : (
                    <>
                      <Mail className="w-5 h-5 mr-2 inline" />
                      Send Me the Free Guide
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </form>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-16 h-16" style={{ color: "#F4A261" }} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Success!
                </h3>
                <p style={{ color: "#F4A261" }} className="text-lg font-semibold mb-2">
                  Your free travel guide is on its way! Check your inbox.
                </p>
                <p className="text-gray-600 mb-6">
                  Look for an email from us with your exclusive travel guide and special offers.
                </p>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setEmail("");
                    setName("");
                    setError(null);
                  }}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Subscribe another email
                </button>
              </div>
            </>
          )}
        </div>

        {/* Trust Badges */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>✓ No spam • ✓ Unsubscribe anytime • ✓ Privacy protected</p>
        </div>
      </div>
    </section>
  );
}
