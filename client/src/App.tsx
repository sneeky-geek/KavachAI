import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Student from "@/pages/Student";
import Teacher from "@/pages/Teacher";
import Contact from "@/pages/Contact";
import Quiz from "@/components/quiz/Quiz"

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/student" component={Student} />
      <Route path="/teacher" component={Teacher} />
      <Route path="/contact" component={Contact} />
      <Route path="/quiz" component={Quiz}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;