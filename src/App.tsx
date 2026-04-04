import { lazy, Suspense } from "react"
import Layout from "./components/layouts/Layout"
import { Navigate, Route, Routes } from "react-router-dom"
import PageLoader from "./components/ui/PageLoader"
import LandingPage from "./pages/landing/LandingPage"

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Subscriptions = lazy(() => import("./pages/Subscriptions"));
const Analytics = lazy(() => import("./pages/Analytics"));
const AddSubscription = lazy(() => import("./pages/AddSubscription"));

const App = () => {
  return (
    <Layout>
      <Suspense
        fallback={<PageLoader />}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/add" element={<AddSubscription />} />
          <Route path="/edit/:id" element={<AddSubscription />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App