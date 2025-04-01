import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

// --- Constants ---
const SUCCESS_MESSAGE = "Thanks for signing up! We'll be in touch soon.";
const ERROR_MESSAGE_INVALID_EMAIL = "Please enter a valid email address";
const ERROR_MESSAGE_SUBMISSION = "Failed to sign up. Please try again later.";
const EMAIL_REGEX = /^\S+@\S+\.\S+$/; // Basic email format regex
const SUBMITTING_TEXT = "Submitting...";
const SUBMIT_TEXT = "Sign Up";

/**
 * Renders an email signup form.
 * Handles basic client-side validation and submission to Supabase.
 */
export const EmailSignupForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email format
    if (!email.trim() || !EMAIL_REGEX.test(email)) {
      toast.error(ERROR_MESSAGE_INVALID_EMAIL);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Attempting to insert email:', email);
      console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
      
      const { data, error } = await supabase
        .from('email_subscribers')
        .insert([{ email }])
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
      <div className="flex flex-col sm:flex-row gap-2">
        <Label htmlFor="email-signup" className="sr-only">
          Email Address
        </Label>
        <Input
          id="email-signup"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md bg-muted/30 border-muted placeholder:text-muted-foreground/70"
          required
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/80 text-white font-medium"
        >
          {isSubmitting ? SUBMITTING_TEXT : SUBMIT_TEXT}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground text-center sm:text-left">
        Stay updated on our projects & opportunities
      </p>
    </form>
  );
};
