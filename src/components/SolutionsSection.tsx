import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function SolutionsSection() {
  return (
    <section id="solutions" className="w-full py-12 md:py-24 lg:py-32">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="container px-4 md:px-6"
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary"
          >
            Our Solutions
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          >
            Tailored AI Solutions for Every Business Stage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-[900px] text-muted-foreground md:text-xl"
          >
            From quick wins to enterprise systems, we have the right solution for your needs
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Level 1 */}
          <div className="space-y-6">
            <motion.h3 variants={itemFadeIn} className="text-2xl font-bold text-center">
              Level 1: Foundation & Quick Wins
            </motion.h3>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Business Audit",
                  description: "A 'Technical X-Ray' of your business. We find where you're losing hours and identify AI opportunities.",
                },
                {
                  title: "AI Prompt Pack",
                  description: "Custom 'Cheat Sheets' for your specific niche (e.g., 'The Restaurant Manager's 50 Best Prompts').",
                },
                {
                  title: "AI Team Training",
                  description: "A 90-minute workshop for your staff on how to use ChatGPT/Claude for daily tasks.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemFadeIn}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-2xl border bg-background p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-all duration-300" />
                  <div className="relative space-y-4">
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Level 2 */}
          <div className="space-y-6">
            <motion.h3 variants={itemFadeIn} className="text-2xl font-bold text-center">
              Level 2: Targeted Solutions
            </motion.h3>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Single Automation Build",
                  description: "One specific fix (e.g., an AI that auto-replies to Google Reviews). Solve a pain point discovered in the audit.",
                },
                {
                  title: "AI Automation Bundle",
                  description: "3 integrated automations that talk to each other. A complete solution for your workflow needs.",
                },
                {
                  title: "Web & App Build",
                  description: "Custom-built sites or lightweight apps with AI features baked in. Tailored to your business.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemFadeIn}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-2xl border bg-background p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-all duration-300" />
                  <div className="relative space-y-4">
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Level 3 */}
          <div className="space-y-6">
            <motion.h3 variants={itemFadeIn} className="text-2xl font-bold text-center">
              Level 3: Full Enterprise Systems
            </motion.h3>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "AI Automation Systems",
                  description: "A full-scale infrastructure. Become your AI Department with comprehensive automation.",
                },
                {
                  title: "Custom AI Assistant",
                  description: "A dedicated 'Enbit Agent' trained on your specific business data (PDFs, menus, past emails).",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemFadeIn}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-2xl border bg-background p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-300" />
                  <div className="relative space-y-4">
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recurring Services */}
          <div className="space-y-6 mt-12">
            <motion.h3 variants={itemFadeIn} className="text-2xl font-bold text-center">
              Recurring Services
            </motion.h3>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              Keep your AI running smoothly with our ongoing support and optimization services
            </p>
            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {[
                {
                  title: "Enbit Optimization",
                  description: "We monitor the AI, fix bugs if software updates, and tweak prompts to keep them sharp.",
                },
                {
                  title: "Priority Support",
                  description: "A 'Fast Pass' for help. Great add-on for every contract to ensure you're never stuck.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemFadeIn}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-primary/5 p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/40"
                >
                  <div className="relative space-y-4">
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
