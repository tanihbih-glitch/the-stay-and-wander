import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Gift, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      setSubmitted(true);
      setDownloadUrl(data.downloadUrl);
      setEmail("");
      setName("");
      toast.success("Welcome! Check your email for the travel checklist.");

      // Auto-download the PDF
      if (data.downloadUrl) {
        const link = document.createElement("a");
        link.href = data.downloadUrl;
        link.download = "travel-checklist.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to subscribe. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !name) {
      toast.error("Please fill in all fields");
      return;
    }

    subscribeMutation.mutate({ email, name });
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
                  Get Your Free Travel Checklist
                </h2>
                <p className="text-lg text-gray-600">
                  Subscribe to our newsletter and receive a comprehensive packing
                  checklist + exclusive travel tips delivered to your inbox.
                </p>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Free PDF</p>
                    <p className="text-sm text-gray-600">Complete travel checklist</p>
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
                      className="w-full"
                      disabled={subscribeMutation.isPending}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={subscribeMutation.isPending}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg"
                >
                  {subscribeMutation.isPending ? (
                    "Subscribing..."
                  ) : (
                    <>
                      <Mail className="w-5 h-5 mr-2 inline" />
                      Get My Free Checklist
                    </>
                  )}
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
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Thank You for Subscribing!
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Your travel checklist PDF is ready to download. Check your email
                  for the link and start preparing for your next adventure!
                </p>

                {downloadUrl && (
                  <Button
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = downloadUrl;
                      link.download = "travel-checklist.pdf";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8"
                  >
                    <Gift className="w-5 h-5 mr-2 inline" />
                    Download PDF Now
                  </Button>
                )}

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setEmail("");
                    setName("");
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
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
