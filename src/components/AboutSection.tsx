import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function AboutSection() {
  const scrollToFounder = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('founder')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="container px-4 md:px-6"
        >
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
                About Enbit
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Leading the AI Revolution
              </h2>
              <p className="text-muted-foreground md:text-xl">
                Enbit is at the forefront of AI innovation, helping businesses of all sizes harness the transformative
                power of artificial intelligence. Our team of experts combines deep technical knowledge with business
                acumen to deliver solutions that drive real results.
              </p>
              <p className="text-muted-foreground md:text-xl">
                We believe AI should be accessible, ethical, and impactful. That's why we work closely with each
                client to understand their unique challenges and create tailored solutions that align with their
                vision and values.
              </p>
              <div className="flex justify-center">
                <Button size="lg" className="rounded-full" onClick={scrollToFounder}>
                  Learn More About Us
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="founder" className="w-full py-12 md:py-24 lg:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="container px-4 md:px-6"
        >
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
                Meet the Founder
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                About the Founder
              </h2>
              <p className="text-muted-foreground md:text-xl leading-relaxed">
                Nathan Nesbit IV is a first year college student, technologist, and builder driven by a simple belief: technology should make people's lives easier, not more complicated. Growing up around small businesses and community-driven work, Nathan saw firsthand how much time, energy, and potential gets lost to inefficient systems and outdated processes.
              </p>
              <p className="text-muted-foreground md:text-xl leading-relaxed">
                While studying computer science and working hands-on with automation and AI tools, he realized that the same technologies used by large corporations were completely out of reach for the people who needed them most.
              </p>
              <p className="text-muted-foreground md:text-xl leading-relaxed">
                Enbit was born from that gap. Nathan started Enbit to bridge the divide between powerful technology and real-world accessibility—creating systems that don't just look impressive, but actually work for real people.
              </p>
              <p className="text-muted-foreground md:text-xl leading-relaxed">
                At its core, Enbit is about empowerment: helping individuals and organizations reclaim their time, focus on what matters, and build something sustainable with confidence.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
