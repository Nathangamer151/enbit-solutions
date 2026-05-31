import { motion } from "framer-motion";
import { useState } from "react";
import type { FormEvent, MouseEvent } from "react";
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const scrollToTop = (e: MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterStatus("loading");
    setNewsletterMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Newsletter signup failed.");
      }

      setNewsletterStatus("success");
      setNewsletterMessage("Thanks. You're on the list.");
      setNewsletterEmail("");
    } catch (error) {
      try {
        const fallbackResponse = await fetch("https://formsubmit.co/ajax/enbit.solutions@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: newsletterEmail,
            _subject: "New Enbit newsletter signup",
            message: `New newsletter signup: ${newsletterEmail}`,
          }),
        });

        if (!fallbackResponse.ok) throw error;

        setNewsletterStatus("success");
        setNewsletterMessage("Thanks. You're on the list.");
        setNewsletterEmail("");
      } catch {
        const message =
          error instanceof Error && !error.message.includes("Failed to fetch")
            ? error.message
            : "Signup needs the live email service. It will work after deployment is configured.";
        setNewsletterStatus("error");
        setNewsletterMessage(message);
      }
    }
  };

  return (
    <footer className="w-full border-t bg-muted/30">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="container grid gap-8 px-4 py-10 md:px-6 lg:grid-cols-3"
      >
        <div className="space-y-4">
          <a href="/" className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-2xl gradient-bg flex items-center justify-center">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">Enbit</span>
          </a>
          <p className="text-sm text-muted-foreground">
            Transforming businesses through innovative AI solutions and expert consulting services.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Quick Links</h3>
          <nav className="flex flex-col space-y-2 text-sm">
            <a href="/#services" className="text-muted-foreground hover:text-foreground">Services</a>
            <a href="/#solutions" className="text-muted-foreground hover:text-foreground">Solutions</a>
            <a href="/#about" className="text-muted-foreground hover:text-foreground">About Us</a>
            <a href="/#contact" className="text-muted-foreground hover:text-foreground">Contact</a>
          </nav>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Newsletter</h3>
          <p className="text-sm text-muted-foreground">Stay updated with the latest AI trends and insights.</p>
          <form className="flex space-x-2" onSubmit={handleNewsletterSubmit}>
            <Input
              type="email"
              placeholder="Your email"
              className="rounded-full"
              value={newsletterEmail}
              onChange={(event) => setNewsletterEmail(event.target.value)}
              required
            />
            <Button type="submit" className="rounded-full" disabled={newsletterStatus === "loading"}>
              {newsletterStatus === "loading" ? "Sending" : "Subscribe"}
            </Button>
          </form>
          {newsletterMessage && (
            <p className={newsletterStatus === "success" ? "text-sm text-primary" : "text-sm text-destructive"}>
              {newsletterMessage}
            </p>
          )}
        </div>
      </motion.div>

      <div className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Enbit. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" onClick={scrollToTop} className="hover:text-foreground">Privacy Policy</a>
            <a href="#" onClick={scrollToTop} className="hover:text-foreground">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
