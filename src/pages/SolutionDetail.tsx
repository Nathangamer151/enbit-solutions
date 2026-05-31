import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BarChart3, Bot, Brain, CheckCircle2, Shield, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CALENDLY_URL, getSolution, solutions } from "@/data/solutions";

const iconMap = {
  brain: Brain,
  zap: Zap,
  chart: BarChart3,
  bot: Bot,
  target: Target,
  shield: Shield,
};

export default function SolutionDetail() {
  const { slug } = useParams();
  const solution = getSolution(slug);

  if (!solution) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-20 md:px-6">
          <Link to="/#services" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to services
          </Link>
          <div className="mt-12 max-w-2xl">
            <h1 className="text-4xl font-bold">Solution not found</h1>
            <p className="mt-4 text-muted-foreground">That service page does not exist yet.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = iconMap[solution.icon];
  const related = solutions.filter((item) => item.slug !== solution.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b py-16 md:py-24">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="container relative px-4 md:px-6">
            <Link to="/#services" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to services
            </Link>
            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
              <div className="max-w-3xl space-y-6">
                <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
                  {solution.eyebrow}
                </div>
                <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{solution.title}</h1>
                <p className="text-lg leading-8 text-muted-foreground md:text-xl">{solution.summary}</p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" className="rounded-full" asChild>
                    <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
                      Schedule Consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full" asChild>
                    <Link to="/#contact">Ask a Question</Link>
                  </Button>
                </div>
              </div>
              <div className="rounded-2xl border bg-card p-8 shadow-lg">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl gradient-bg">
                  <Icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold">Best fit</h2>
                <p className="mt-4 leading-7 text-muted-foreground">{solution.bestFor}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container grid gap-8 px-4 py-16 md:px-6 lg:grid-cols-3">
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-xl font-bold">What You Get</h2>
            <div className="mt-6 space-y-4">
              {solution.outcomes.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-xl font-bold">Helps With</h2>
            <div className="mt-6 space-y-4">
              {solution.helpsWith.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-xl font-bold">How It Works</h2>
            <div className="mt-6 space-y-4">
              {solution.process.map((item, index) => (
                <div key={item} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y bg-muted/30 py-16">
          <div className="container px-4 text-center md:px-6">
            <h2 className="text-3xl font-bold tracking-tight">Ready to see what this could look like for your business?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Book a 30-minute consultation and we will map the most practical next step for your workflow.
            </p>
            <Button size="lg" className="mt-8 rounded-full" asChild>
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer">Book on Calendly</a>
            </Button>
          </div>
        </section>

        <section className="container px-4 py-16 md:px-6">
          <h2 className="text-2xl font-bold">Explore More Solutions</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                to={`/solutions/${item.slug}`}
                className="rounded-2xl border bg-card p-5 transition-colors hover:border-primary/50"
              >
                <p className="font-semibold">{item.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
