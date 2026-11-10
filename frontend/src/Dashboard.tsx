import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Database,
  MapPin,
  MapPinned,
  Radio,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const indicators = [
  {
    label: "Sample states",
    value: "12",
    note: "Illustrative coverage",
    change: "+2 this period",
    direction: "up",
  },
  {
    label: "Sample LGAs",
    value: "86",
    note: "Illustrative records",
    change: "+8 this period",
    direction: "up",
  },
  {
    label: "Population in samples",
    value: "2.4M",
    note: "Not a verified estimate",
    change: "Illustrative only",
    direction: "neutral",
  },
  {
    label: "Priority sample areas",
    value: "24",
    note: "Illustrative ranking",
    change: "Scoring not connected",
    direction: "down",
  },
];

const priorityData = [
  { name: "Sample area A", score: 84 },
  { name: "Sample area B", score: 72 },
  { name: "Sample area C", score: 67 },
  { name: "Sample area D", score: 59 },
  { name: "Sample area E", score: 48 },
];

const comparisonData = [
  { name: "Sample 01", access: 68, priority: 78 },
  { name: "Sample 02", access: 54, priority: 71 },
  { name: "Sample 03", access: 73, priority: 64 },
  { name: "Sample 04", access: 46, priority: 82 },
];

const reports = [
  { id: "DEMO-1042", category: "Unreliable electricity", location: "Sample community 01", age: "2h ago", status: "In review" },
  { id: "DEMO-1041", category: "No connection", location: "Sample community 02", age: "5h ago", status: "Received" },
  { id: "DEMO-1040", category: "Facility access", location: "Sample community 03", age: "1d ago", status: "Received" },
];

const projects = [
  { name: "Sample mini-grid initiative", location: "Sample area A · Demo", status: "Under assessment", progress: 36 },
  { name: "Sample clinic solar pilot", location: "Sample area C · Demo", status: "Under construction", progress: 72 },
  { name: "Sample school energy project", location: "Sample area D · Demo", status: "Operational", progress: 100 },
];

function DemoBadge() {
  return <span className="demo-badge"><span />DEMO DATA</span>;
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="chart-tooltip">
      <strong>{label}</strong>
      {payload.map((item) => (
        <span key={item.name} style={{ color: item.color }}>
          {item.name}: {item.value}
        </span>
      ))}
      <small>DEMO DATA · illustrative only</small>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="dashboard-content">
      <div className="demo-notice" role="note">
        <ShieldAlert size={18} aria-hidden="true" />
        <p>
          <strong>DEMO DATA</strong>
          <span>
            All figures and records on this screen are fictional examples for
            interface demonstration. They are not verified Nigerian statistics.
          </span>
        </p>
        <span className="demo-notice-source">No live datasets connected</span>
      </div>

      <section className="page-intro">
        <div>
          <p className="page-kicker"><Sparkles size={14} /> ENERGY ACCESS INTELLIGENCE</p>
          <h1>Executive overview</h1>
          <p className="page-subtitle">
            A sample workspace for exploring needs, opportunities, and project activity.
          </p>
        </div>
        <div className="period-chip"><Clock3 size={15} /> Sample period <span>·</span> Demo</div>
      </section>

      <section className="metric-grid" aria-label="Illustrative dashboard indicators">
        {indicators.map((item) => (
          <article className="metric-card" key={item.label}>
            <div className="metric-card-top">
              <span>{item.label}</span>
              <DemoBadge />
            </div>
            <p className="metric-value">{item.value}</p>
            <div className="metric-card-bottom">
              <span className="metric-note">{item.note}</span>
              <span className={`metric-change metric-change-${item.direction}`}>
                {item.direction === "down" ? <ArrowDownRight size={13} /> : item.direction === "up" ? <ArrowUpRight size={13} /> : null}
                {item.change}
              </span>
            </div>
          </article>
        ))}
      </section>

      <section className="chart-grid" aria-label="Illustrative analysis charts">
        <article className="panel priority-panel">
          <div className="panel-header">
            <div>
              <div className="panel-title-row"><h2>Illustrative priority ranking</h2><DemoBadge /></div>
              <p>Example scores only · not produced by a connected scoring engine</p>
            </div>
          </div>
          <div className="chart-body priority-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData} layout="vertical" margin={{ top: 5, right: 12, left: 4, bottom: 0 }}>
                <CartesianGrid horizontal={false} stroke="#edf0f3" />
                <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: "#8290a1", fontSize: 10 }} />
                <YAxis type="category" dataKey="name" width={104} tickLine={false} axisLine={false} tick={{ fill: "#5c6878", fontSize: 10 }} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "#f3f6f7" }} />
                <Bar dataKey="score" name="Example score" radius={[0, 5, 5, 0]} barSize={15}>
                  {priorityData.map((item, index) => (
                    <Cell key={item.name} fill={index === 0 ? "#148463" : "#62b99a"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-footnote"><span className="legend-dot priority-legend" />Example priority score <span className="footnote-divider" /> Scale 0–100 · illustrative</div>
        </article>

        <article className="panel comparison-panel">
          <div className="panel-header">
            <div>
              <div className="panel-title-row"><h2>Sample comparison</h2><DemoBadge /></div>
              <p>Example indicators · no source dataset connected</p>
            </div>
          </div>
          <div className="chart-body comparison-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 10, right: 3, left: -21, bottom: 0 }} barGap={5}>
                <CartesianGrid vertical={false} stroke="#edf0f3" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#8290a1", fontSize: 10 }} />
                <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: "#8290a1", fontSize: 10 }} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "#f3f6f7" }} />
                <Bar dataKey="access" name="Example access indicator" fill="#9ccbb9" radius={[4, 4, 0, 0]} barSize={13} />
                <Bar dataKey="priority" name="Example priority score" fill="#168465" radius={[4, 4, 0, 0]} barSize={13} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-footnote">
            <span className="legend-dot access-legend" />Example access
            <span className="legend-dot priority-legend legend-second" />Example priority
          </div>
        </article>
      </section>

      <section className="lower-grid" aria-label="Map, reports and sample project activity">
        <article className="panel map-panel">
          <div className="panel-header">
            <div>
              <div className="panel-title-row"><h2>Energy access map</h2><span className="panel-status">NOT CONNECTED</span></div>
              <p>Map preview requires verified boundaries and sourced indicators</p>
            </div>
            <MapPinned className="panel-header-icon" size={18} aria-hidden="true" />
          </div>
          <div className="map-placeholder">
            <div className="map-grid-pattern" />
            <div className="map-placeholder-content">
              <span className="map-placeholder-icon"><MapPin size={20} /></span>
              <strong>Verified geographic data required</strong>
              <span>No boundaries or coordinates are displayed.</span>
              <span className="map-roadmap-label"><Database size={13} /> Map integration planned for Stage 4</span>
            </div>
          </div>
          <div className="map-legend">
            <span><i className="legend-dot access-legend" />Access layer</span>
            <span><i className="legend-dot priority-legend" />Priority areas</span>
            <span className="map-legend-muted">Layers unavailable</span>
          </div>
        </article>

        <article className="panel reports-panel">
          <div className="panel-header">
            <div>
              <div className="panel-title-row"><h2>Recent citizen reports</h2><DemoBadge /></div>
              <p>Fictional examples · reports are unverified</p>
            </div>
            <Radio className="panel-header-icon" size={18} aria-hidden="true" />
          </div>
          <div className="report-list">
            {reports.map((report) => (
              <article className="report-row" key={report.id}>
                <div className="report-icon"><Radio size={15} /></div>
                <div className="report-main">
                  <div className="report-title-line">
                    <strong>{report.category}</strong>
                    <span className={`report-status ${report.status === "In review" ? "report-status-review" : ""}`}>{report.status}</span>
                  </div>
                  <span className="report-location">{report.location} · {report.id}</span>
                </div>
                <time>{report.age}</time>
              </article>
            ))}
          </div>
          <div className="panel-bottom-note"><ShieldAlert size={14} /> Demo entries only · no personal information</div>
        </article>
      </section>

      <section className="panel projects-panel">
        <div className="panel-header projects-header">
          <div>
            <div className="panel-title-row"><h2>Project activity</h2><DemoBadge /></div>
            <p>Example project records · no live monitoring data connected</p>
          </div>
          <span className="projects-header-note">SAMPLE RECORDS</span>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project-row" key={project.name}>
              <div className="project-symbol"><MapPin size={16} /></div>
              <div className="project-title">
                <strong>{project.name}</strong>
                <span>{project.location}</span>
              </div>
              <div className="project-progress">
                <div className="progress-label"><span>Illustrative progress</span><strong>{project.progress}%</strong></div>
                <div className="progress-track"><span style={{ width: `${project.progress}%` }} /></div>
              </div>
              <span className={`project-status ${project.status === "Operational" ? "project-status-live" : ""}`}>{project.status}</span>
              <ArrowRight className="project-arrow" size={16} aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <footer className="dashboard-footer">
        <span>ENERGIA <i>·</i> ENERGY ACCESS INTELLIGENCE</span>
        <span>DEMO WORKSPACE <i>·</i> NO VERIFIED DATA CONNECTED</span>
      </footer>
    </div>
  );
}

export default Dashboard;
