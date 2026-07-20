import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Gift, CheckCircle } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Email validation regex
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!name.trim() || !email.trim() || !validateEmail(email)) {
      return;
    }

    setIsLoading(true);

    try {
      // Redirect to Mailchimp signup page with email pre-filled
      const mailchimpUrl = `https://us10.list-manage.com/subscribe?u=48ee0dc10117e46d5a5e32365&id=894671&EMAIL=${encodeURIComponent(email)}&FNAME=${encodeURIComponent(name)}`;
      window.open(mailchimpUrl, '_blank');
      
      // Show success message
      setSubmitted(true);
      setEmail("");
      setName("");
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
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
                      onChange={(e) => setName(e.target.value)}
                      className="w-full"
                      disabled={isLoading}
                      required
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
                      className="w-full"
                      disabled={isLoading}
                      required
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
                  Thank You!
                </h3>
                <p style={{ color: "#F4A261" }} className="text-lg font-semibold mb-2">
                  Check your inbox for your free guide.
                </p>
                <p className="text-gray-600 mb-6">
                  Look for an email from us with your exclusive travel guide and special offers.
                </p>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setEmail("");
                    setName("");
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
