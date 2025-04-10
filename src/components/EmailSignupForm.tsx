import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Checkbox } from "@/components/ui/checkbox";

// --- Constants ---
const SUCCESS_MESSAGE = "Thanks for signing up! We'll be in touch soon.";
const ERROR_MESSAGE_INVALID_EMAIL = "Please enter a valid email address";
const ERROR_MESSAGE_CONSENT = "Please accept our privacy policy to sign up";
const ERROR_MESSAGE_SUBMISSION = "Failed to sign up. Please try again later.";
const EMAIL_REGEX = /^\S+@\S+\.\S+$/; // Basic email format regex
const SUBMITTING_TEXT = "Submitting...";
const SUBMIT_TEXT = "Sign Up";

/**
 * Renders an enhanced email signup form with name field and consent checkbox.
 * Handles basic client-side validation and submission to Supabase.
 */
export const EmailSignupForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [hasConsent, setHasConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email format
    if (!email.trim() || !EMAIL_REGEX.test(email)) {
      toast.error(ERROR_MESSAGE_INVALID_EMAIL);
      return;
    }

    // Validate consent
    if (!hasConsent) {
      toast.error(ERROR_MESSAGE_CONSENT);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Attempting to insert subscriber:', { email, name, hasConsent });
      
      const { data, error } = await supabase
        .from('email_subscribers')
        .upsert([{ 
          email,
          name: name.trim() || null,
          has_consent: hasConsent,
          subscribed_at: new Date().toISOString(),
          source: 'website_signup_form'
        }], {
          onConflict: 'email',
          ignoreDuplicates: false // Update existing records
        })
        .select();

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      setEmail("");
      setName("");
      setHasConsent(false);
      toast.success(SUCCESS_MESSAGE);
    } catch (error) {
      console.error('Error submitting email:', error);
      toast.error(ERROR_MESSAGE_SUBMISSION);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="space-y-3">
        <div>
          <Label htmlFor="name-signup" className="text-sm mb-1 block">
            Name (optional)
          </Label>
          <Input
            id="name-signup"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-md bg-muted/30 border-muted placeholder:text-muted-foreground/70"
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <Label htmlFor="email-signup" className="text-sm mb-1 block">
            Email Address
          </Label>
          <Input
            id="email-signup"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md bg-muted/30 border-muted placeholder:text-muted-foreground/70"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div className="flex items-start gap-2 mt-2">
          <Checkbox 
            id="consent" 
            checked={hasConsent}
            onCheckedChange={(checked) => setHasConsent(checked === true)}
            disabled={isSubmitting}
            className="mt-1"
          />
          <Label 
            htmlFor="consent" 
            className="text-xs text-muted-foreground leading-tight cursor-pointer"
          >
            I agree to receive emails from DreamLab about projects, opportunities, and news. You can unsubscribe at any time. See our <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a> for more information.
          </Label>
        </div>
      </div>
      
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/80 text-white font-medium"
      >
        {isSubmitting ? SUBMITTING_TEXT : SUBMIT_TEXT}
      </Button>
      
      <p className="text-xs text-muted-foreground text-center">
        Stay updated on our projects & opportunities
      </p>
    </form>
  );
};
