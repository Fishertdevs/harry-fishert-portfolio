import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/language-context";
import { PortfolioProvider } from "@/lib/portfolio-context";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AboutPage from "@/pages/about";
import SkillsPage from "@/pages/skills";
import ExperiencePage from "@/pages/experience";
import ContactPage from "@/pages/contact";
import EducationPage from "@/pages/education";
import CookiesPage from "@/pages/cookies";
import PrivacyPage from "@/pages/privacy";
import TermsPage from "@/pages/terms";
import AdminLoginPage from "@/pages/admin-login";
import AdminDashboardPage from "@/pages/admin-dashboard";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutPage} />
      <Route path="/skills" component={SkillsPage} />
      <Route path="/experience" component={ExperiencePage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/education" component={EducationPage} />
      <Route path="/cookies" component={CookiesPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/admin/login" component={AdminLoginPage} />
      <Route path="/admin/dashboard" component={AdminDashboardPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
          <LanguageProvider>
            <PortfolioProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <Router />
              </WouterRouter>
              <Toaster />
            </PortfolioProvider>
          </LanguageProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
