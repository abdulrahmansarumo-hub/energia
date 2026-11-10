import { lazy, Suspense, useState } from "react";
import {
  Activity,
  BarChart3,
  Database,
  FileText,
  HeartPulse,
  LayoutDashboard,
  Map,
  Menu,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
  Users,
  X,
  Zap,
} from "lucide-react";
const Dashboard = lazy(() => import("./Dashboard"));

type NavigationItem = {
  id: string;
  label: string;
  icon: typeof LayoutDashboard;
  stage: number;
};

const navigationGroups: { label: string; items: NavigationItem[] }[] = [
  {
    label: "WORKSPACE",
    items: [
      { id: "dashboard", label: "Executive overview", icon: LayoutDashboard, stage: 2 },
      { id: "map", label: "Energy intelligence map", icon: Map, stage: 4 },
      { id: "places", label: "State & LGA explorer", icon: BarChart3, stage: 4 },
      { id: "priorities", label: "Priority ranking", icon: Activity, stage: 5 },
      { id: "scoring", label: "MCDA configuration", icon: SlidersHorizontal, stage: 5 },
    ],
  },
  {
    label: "DELIVERY",
    items: [
      { id: "projects", label: "Project monitoring", icon: Sun, stage: 8 },
      { id: "reports", label: "Citizen reports", icon: HeartPulse, stage: 6 },
      { id: "impact", label: "Social impact", icon: Users, stage: 7 },
      { id: "exports", label: "Reports & exports", icon: FileText, stage: 8 },
    ],
  },
  {
    label: "ADMINISTRATION",
    items: [
      { id: "sources", label: "Data sources", icon: Database, stage: 3 },
      { id: "users", label: "User management", icon: Users, stage: 9 },
      { id: "settings", label: "Settings", icon: Settings, stage: 9 },
    ],
  },
];

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeItem = navigationGroups
    .flatMap((group) => group.items)
    .find((item) => item.id === activePage);

  function navigate(item: NavigationItem) {
    setActivePage(item.id);
    setMobileMenuOpen(false);
  }

  return (
    <div className="app-shell">
      {mobileMenuOpen && (
        <button
          aria-label="Close navigation"
          className="sidebar-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <aside className={`sidebar${mobileMenuOpen ? " sidebar-open" : ""}`}>
        <a className="sidebar-brand" href="/" aria-label="ENERGIA dashboard">
          <span className="sidebar-brand-mark" aria-hidden="true">
            <Zap size={18} fill="currentColor" />
          </span>
          <span>ENERGIA</span>
          <span className="brand-beta">BETA</span>
        </a>

        <div className="workspace-picker">
          <div className="workspace-avatar">NG</div>
          <div className="workspace-details">
            <span className="workspace-label">WORKSPACE</span>
            <span className="workspace-name">Nigeria · demo workspace</span>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {navigationGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <p className="nav-group-label">{group.label}</p>
              {group.items.map(({ id, label, icon: Icon, stage }) => (
                <button
                  aria-current={activePage === id ? "page" : undefined}
                  className={`nav-item${activePage === id ? " nav-item-active" : ""}`}
                  key={id}
                  onClick={() => navigate({ id, label, icon: Icon, stage })}
                  type="button"
                >
                  <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                  <span>{label}</span>
                  {id === "dashboard" && <span className="nav-live-dot" />}
                  {activePage === id && <span className="sr-only">Current page</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-icon">
            <ShieldCheck size={17} aria-hidden="true" />
          </div>
          <div>
            <p>Evidence first</p>
            <span>Sources and confidence matter.</span>
          </div>
        </div>
      </aside>

      <main className="main-shell">
        <header className="main-header">
          <button
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="breadcrumbs">
            <span>ENERGIA</span>
            <span className="breadcrumb-divider">/</span>
            <span className="breadcrumb-current">{activeItem?.label}</span>
          </div>
          <div className="header-account">
            <span className="connection-indicator" />
            <span className="connection-label">DEMO WORKSPACE</span>
            <span className="account-divider" />
            <div className="account-avatar" aria-hidden="true">EA</div>
            <span className="account-name">Demo user</span>
          </div>
        </header>

        {activePage === "dashboard" ? (
          <Suspense fallback={<div className="dashboard-loading" role="status">Loading dashboard…</div>}>
            <Dashboard />
          </Suspense>
        ) : activeItem ? (
          <section className="upcoming-page" aria-live="polite">
            <span className="upcoming-icon" aria-hidden="true">
              <activeItem.icon size={23} />
            </span>
            <p className="eyebrow">PLANNED FOR STAGE {activeItem.stage}</p>
            <h1>{activeItem.label}</h1>
            <p>
              This area will be added in its planned development stage. Until
              then, ENERGIA will not display unverified data or imply that an
              integration is already connected.
            </p>
            <button
              className="return-button"
              onClick={() => setActivePage("dashboard")}
              type="button"
            >
              Return to executive overview
            </button>
          </section>
        ) : null}
      </main>
    </div>
  );
}

export default App;
