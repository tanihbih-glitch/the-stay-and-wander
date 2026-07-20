import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Gift, CheckCircle } from "lucide-react";

export default function NewsletterSignup() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const email = (form.querySelector('input[type="email"]') as HTMLInputElement)?.value;
    const firstName = (form.querySelector('input[type="text"]') as HTMLInputElement)?.value || '';

    if (!email) return;

    const mailchimpUrl = `https://thestayandwander.us10.list-manage.com/subscribe/post?u=48ee0dc10117e46d5a5e32365&id=4512b2fda5&EMAIL=${encodeURIComponent(email)}&FNAME=${encodeURIComponent(firstName)}&f_id=00a0e0e1f0`;

    window.open(mailchimpUrl, '_blank');

    // Show success message immediately
    setSubmitStatus('success');
    setMessage('Thank you! Your free guide is on its way. Check your inbox! 🎉');
    form.reset();

    // Reset form after 5 seconds
    setTimeout(() => {
      setSubmitStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {submitStatus !== 'success' ? (
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
                      className="w-full"
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
                      className="w-full"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 text-lg"
                >
                  <>
                    <Mail className="w-5 h-5 mr-2 inline" />
                    Send Me the Free Guide
                  </>
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
                  {message}
                </p>
                <p className="text-gray-600 mb-6">
                  Look for an email from us with your exclusive travel guide and special offers.
                </p>
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
