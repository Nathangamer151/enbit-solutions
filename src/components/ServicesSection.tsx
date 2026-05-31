import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Brain, Zap, BarChart3, Bot, Target, Shield, ArrowRight } from "lucide-react";
import { solutions } from "@/data/solutions";

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

const iconMap = {
  brain: Brain,
  zap: Zap,
  chart: BarChart3,
  bot: Bot,
  target: Target,
  shield: Shield,
};

const MotionLink = motion(Link);

export function ServicesSection() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="container px-4 md:px-6"
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-3">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            >
              AI Solutions for Every Need
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mx-auto max-w-[900px] text-muted-foreground md:text-xl"
            >
              Comprehensive AI consulting services to drive innovation and growth
            </motion.p>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {solutions.map((service, index) => {
            const Icon = iconMap[service.icon];

            return (
            <MotionLink
              key={index}
              to={`/solutions/${service.slug}`}
              variants={itemFadeIn}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="service-card group relative flex flex-col justify-between rounded-2xl p-8 min-h-[280px] transition-all hover:shadow-xl"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <Icon className={index % 2 === 0 ? "h-8 w-8 text-primary" : "h-8 w-8 text-accent"} />
                </div>
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="text-service-muted leading-relaxed">{service.description}</p>
              </div>
              <div className="flex items-center justify-between mt-6 pt-4">
                <span className="text-sm font-medium hover:text-primary transition-colors">
                  Learn more about {service.title}
                </span>
                <motion.div 
                  whileHover={{ x: 5 }} 
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="group-hover:text-primary transition-colors"
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </div>
            </MotionLink>
          )})}
        </motion.div>
      </motion.div>
    </section>
  );
}
