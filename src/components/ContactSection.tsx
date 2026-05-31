import { motion } from "framer-motion";
import type { FormEvent } from "react";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function ContactSection() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get("first-name") || "").trim();
    const lastName = String(formData.get("last-name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(`AI consultation request from ${firstName || "website visitor"}`);
    const body = encodeURIComponent(
      [
        `Name: ${[firstName, lastName].filter(Boolean).join(" ")}`,
        `Email: ${email}`,
        `Company: ${company}`,
        "",
        message,
      ].join("\n"),
    );

    window.location.href = `mailto:enbit.solutions@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="container px-4 md:px-6"
      >
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
              Get in Touch
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Let's Build the Future Together</h2>
            <p className="text-muted-foreground md:text-xl">
              Ready to transform your business with AI? Contact us today for a free consultation and discover how
              Enbit can help you achieve your goals.
            </p>
            <div className="space-y-4">
              <motion.div whileHover={{ x: 5 }} className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email Us</h3>
                  <p className="text-sm text-muted-foreground">enbit.solutions@gmail.com</p>
                </div>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Call Us</h3>
                  <p className="text-sm text-muted-foreground">904 412 0065</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border bg-background p-8 shadow-sm"
          >
            <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="first-name" className="text-sm font-medium">
                    First name
                  </label>
                  <Input id="first-name" name="first-name" placeholder="John" className="rounded-full" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="last-name" className="text-sm font-medium">
                    Last name
                  </label>
                  <Input id="last-name" name="last-name" placeholder="Doe" className="rounded-full" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" name="email" type="email" placeholder="john@example.com" className="rounded-full" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">
                  Company
                </label>
                <Input id="company" name="company" placeholder="Your Company" className="rounded-full" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea id="message" name="message" placeholder="Tell us about your project..." className="min-h-[120px] rounded-2xl" required />
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" className="w-full rounded-full">
                  Send Message
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
