import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import faviconIcon from "/favicon.png";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
          scrollY > 50 ? "shadow-md" : ""
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="h-10 w-10 rounded-2xl overflow-hidden"
              >
                <img src={faviconIcon} alt="Enbit AI Consulting logo" className="h-full w-full object-cover" />
              </motion.div>
              <span className="font-bold text-xl">Enbit</span>
            </a>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="/#services" className="text-sm font-medium transition-colors hover:text-primary">
              Services
            </a>
            <a href="/#solutions" className="text-sm font-medium transition-colors hover:text-primary">
              Solutions
            </a>
            <a href="/#about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </a>
            <a href="/#contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </a>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
          <button className="flex md:hidden" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background md:hidden"
          >
            <div className="container flex h-16 items-center justify-between">
              <div className="flex items-center gap-3">
                <a href="/" className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-2xl overflow-hidden">
                    <img src={faviconIcon} alt="Enbit AI Consulting logo" className="h-full w-full object-cover" />
                  </div>
                  <span className="font-bold text-xl">Enbit</span>
                </a>
              </div>
              <button onClick={toggleMenu}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <motion.nav
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="container grid gap-3 pb-8 pt-6"
            >
              {["Services", "Solutions", "About", "Contact"].map((item, index) => (
                <motion.div key={index} variants={itemFadeIn}>
                  <a
                    href={`/#${item.toLowerCase()}`}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-lg font-medium hover:bg-accent/10"
                    onClick={toggleMenu}
                  >
                    {item}
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </motion.div>
              ))}
              <motion.div variants={itemFadeIn} className="flex flex-col gap-3 pt-4">
                <Button
                  variant="ghost"
                  className="w-full rounded-full justify-start"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  {theme === 'dark' ? (
                    <><Sun className="mr-2 h-4 w-4" /> Light Mode</>
                  ) : (
                    <><Moon className="mr-2 h-4 w-4" /> Dark Mode</>
                  )}
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
