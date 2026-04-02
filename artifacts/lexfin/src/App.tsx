import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import CoursesPage from "@/pages/courses";
import LearningPathPage from "@/pages/learning-path";
import BlogsPage from "@/pages/blogs";
import BlogListPage from "@/pages/blog-list";
import StudyMaterialPage from "@/pages/study-material";
import RegulatoryAlertsPage from "@/pages/regulatory-alerts";
import UnitLearnPage from "@/pages/unit-learn";
import NotFound from "@/pages/not-found";
import LoginUnavailablePage from "@/pages/login-unavailable";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/courses" component={CoursesPage} />
      <Route path="/courses/:courseId" component={CoursesPage} />
      <Route path="/courses/:courseId/path" component={LearningPathPage} />
      <Route path="/blogs" component={BlogsPage} />
      <Route path="/blogs/:category" component={BlogListPage} />
      <Route path="/study-material" component={StudyMaterialPage} />
      <Route path="/regulatory-alerts" component={RegulatoryAlertsPage} />
      <Route path="/courses/:courseId/module/:moduleId/learn" component={UnitLearnPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/login-unavailable" component={LoginUnavailablePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
