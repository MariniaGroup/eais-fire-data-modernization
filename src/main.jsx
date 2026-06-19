import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileText,
  Flame,
  Gauge,
  Mail,
  Map,
  Phone,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import './styles.css';
import logo from './assets/elevate-logo-rectangle.png';
import flyer from './assets/fire-public-safety-flyer.png';

const initialForm = {
  firstName: '',
  lastName: '',
  title: '',
  agency: '',
  city: '',
  state: '',
  email: '',
  phone: '',
  system: '',
  interest: '',
  challenge: '',
  consent: false,
};

function App() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const submitLead = async (event) => {
    event.preventDefault();
    setStatus('submitting');
    setError('');

    const payload = {
      ...formData,
      campaign: 'fire-data-modernization',
      source: 'fire.elevate-aisolutions.com',
      submittedAt: new Date().toISOString(),
    };

    const endpoint = import.meta.env.VITE_LEAD_ENDPOINT;

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Lead endpoint returned ${response.status}`);
        }
      } else {
        const existing = JSON.parse(localStorage.getItem('eais_fire_leads') || '[]');
        localStorage.setItem('eais_fire_leads', JSON.stringify([...existing, payload]));
        console.info('No VITE_LEAD_ENDPOINT configured. Lead saved to browser localStorage for testing:', payload);
      }

      setStatus('success');
      setFormData(initialForm);
    } catch (submitError) {
      console.error(submitError);
      setStatus('error');
      setError('The form could not be submitted. Please try again or contact Elevate AI Solutions directly through the website.');
    }
  };

  return (
    <div className="site-shell">
      <header className="hero" id="top">
        <nav className="nav container">
          <a className="brand" href="#top" aria-label="Elevate AI Solutions Home">
            <img src={logo} alt="Elevate AI Solutions logo" />
          </a>
          <div className="nav-links">
            <a href="#challenges">Challenges</a>
            <a href="#services">Services</a>
            <a href="#lead-form">Request Info</a>
          </div>
        </nav>

        <div className="container hero-grid">
          <section className="hero-copy">
            <p className="eyebrow"><Flame size={16} /> Fire Department Data Modernization</p>
            <h1>Turn Fire Incident Reporting Data Into Operational Intelligence</h1>
            <p className="hero-text">
              Elevate AI Solutions helps fire departments, fire districts, and public safety leaders improve reporting workflows, strengthen data quality, and turn incident reporting data into clearer dashboards, grant-ready evidence, and smarter operational insight.
            </p>
            <div className="hero-actions">
              <a className="primary-link" href="#lead-form">Request Information</a>
              <a className="secondary-link" href="#services">See How We Help</a>
            </div>
            <div className="trust-row" aria-label="Core capabilities">
              <span><CheckCircle2 size={16} /> NERIS Readiness</span>
              <span><CheckCircle2 size={16} /> Data Quality</span>
              <span><CheckCircle2 size={16} /> Dashboards</span>
              <span><CheckCircle2 size={16} /> Grant Support</span>
            </div>
          </section>

          <aside className="hero-card" aria-label="Fire operations analytics dashboard preview">
            <div className="dashboard-topline">
              <span>Operations Overview</span>
              <span className="live-dot">Data Ready</span>
            </div>
            <div className="metric-grid">
              <Metric icon={<Activity />} label="Total Incidents" value="1,248" trend="12% YoY" />
              <Metric icon={<Flame />} label="Fire Incidents" value="827" trend="8% YoY" />
              <Metric icon={<Gauge />} label="Avg Response" value="6:42" trend="↓ 7%" />
              <Metric icon={<ShieldCheck />} label="Data Quality" value="92%" trend="Target" />
            </div>
            <div className="chart-card">
              <div className="chart-heading">Incident Trends</div>
              <div className="bars" aria-hidden="true">
                <span style={{ height: '42%' }}></span>
                <span style={{ height: '55%' }}></span>
                <span style={{ height: '49%' }}></span>
                <span style={{ height: '68%' }}></span>
                <span style={{ height: '74%' }}></span>
                <span style={{ height: '86%' }}></span>
              </div>
            </div>
            <div className="map-strip">
              <Map size={18} /> Station workload, call volume, response trends, and grant-ready evidence in one decision-support view.
            </div>
          </aside>
        </div>
      </header>

      <main>
        <section className="section intro-band">
          <div className="container split-grid">
            <div>
              <p className="eyebrow"><Sparkles size={16} /> Built for Small and Mid-Sized Departments</p>
              <h2>Better data visibility without replacing your current platform.</h2>
              <p>
                Many departments already use systems such as ESO, First Due, ImageTrend, or state/national reporting tools. Our role is not to replace those systems. We help your agency get more value from the reporting workflows, data, and operational records you already have.
              </p>
            </div>
            <img className="flyer-preview" src={flyer} alt="Elevate AI Solutions public safety data modernization flyer" />
          </div>
        </section>

        <section className="section" id="challenges">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow"><Database size={16} /> Common Fire Data Challenges</p>
              <h2>Departments collect valuable data, but it is not always decision-ready.</h2>
              <p>
                The issue is rarely “no data.” The real challenge is turning incident records, narratives, response information, and reporting workflows into reliable insight for leadership, grants, staffing, and community impact.
              </p>
            </div>

            <div className="card-grid three-col">
              <FeatureCard title="Reporting Burden" icon={<ClipboardCheck />} text="Crews and officers complete detailed reports under time pressure, often across inconsistent processes or manual workarounds." />
              <FeatureCard title="Data Quality Gaps" icon={<Database />} text="Missing fields, inconsistent narratives, and duplicate or hard-to-search records can weaken reporting confidence." />
              <FeatureCard title="Limited Dashboards" icon={<BarChart3 />} text="Leadership may not have clear views of call volume, station workload, response trends, or incident patterns." />
              <FeatureCard title="NERIS Readiness Pressure" icon={<ShieldCheck />} text="Departments may need help reviewing workflows and preparing staff for evolving reporting expectations." />
              <FeatureCard title="Grant & Budget Needs" icon={<FileText />} text="Clean operational data can strengthen equipment, staffing, prevention, and technology funding requests." />
              <FeatureCard title="Public Records Friction" icon={<Workflow />} text="Records retrieval, review, redaction coordination, and internal reporting may still rely on slow manual steps." />
            </div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading center">
              <p className="eyebrow"><BarChart3 size={16} /> What We Offer</p>
              <h2>Practical modernization support for fire operations data.</h2>
            </div>
            <div className="service-grid">
              <Service title="NERIS Readiness Assessment" text="Review reporting workflows, field completeness, and transition readiness for the new reporting environment." />
              <Service title="Incident Reporting Workflow Review" text="Map how reports are created, reviewed, corrected, approved, stored, and used for leadership decisions." />
              <Service title="Fire Operations Dashboard Planning" text="Plan dashboards for response trends, station workload, call types, data quality, and executive reporting." />
              <Service title="Data Quality Review" text="Identify missing, inconsistent, duplicated, or hard-to-use records that reduce analytic value." />
              <Service title="Grant-Ready Data Storytelling" text="Turn operational metrics into clear evidence for grants, budget requests, staffing analysis, and equipment needs." />
              <Service title="90-Day Modernization Roadmap" text="Create a practical action plan for improving reporting, dashboards, data workflows, and cloud readiness." />
            </div>
          </div>
        </section>

        <section className="section process-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow"><Workflow size={16} /> How It Starts</p>
              <h2>Submit your information. We review it. Then we follow up directly.</h2>
            </div>
            <div className="steps">
              <Step number="01" title="Share the challenge" text="Tell us what your department is dealing with: reporting, NERIS readiness, dashboards, grants, or data quality." />
              <Step number="02" title="We evaluate fit" text="We review the submission and identify whether a readiness assessment, dashboard plan, or workflow review makes sense." />
              <Step number="03" title="We contact you" text="Instead of asking you to book immediately, we follow up with the right information and next-step options." />
            </div>
          </div>
        </section>

        <section className="section lead-section" id="lead-form">
          <div className="container lead-grid">
            <div className="lead-copy">
              <p className="eyebrow"><Mail size={16} /> Request Fire Data Modernization Information</p>
              <h2>Tell us where your reporting or data process needs improvement.</h2>
              <p>
                This form is for fire chiefs, command staff, city managers, public safety administrators, records leaders, and grant or operations teams who want better visibility into incident reporting data.
              </p>
              <div className="contact-mini">
                <div><Phone size={18} /> Elevate AI Solutions will follow up directly.</div>
                <div><Mail size={18} /> Use a work email when possible.</div>
              </div>
            </div>

            <form className="lead-form" onSubmit={submitLead}>
              <div className="form-row">
                <Field name="firstName" placeholder="First name" value={formData.firstName} onChange={handleChange} required />
                <Field name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <Field name="title" placeholder="Job title" value={formData.title} onChange={handleChange} />
                <Field name="agency" placeholder="Department / agency" value={formData.agency} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <Field name="city" placeholder="City" value={formData.city} onChange={handleChange} />
                <Field name="state" placeholder="State" value={formData.state} onChange={handleChange} />
              </div>
              <div className="form-row">
                <Field type="email" name="email" placeholder="Work email" value={formData.email} onChange={handleChange} required />
                <Field name="phone" placeholder="Phone number" value={formData.phone} onChange={handleChange} />
              </div>
              <Field name="system" placeholder="Current RMS/reporting system, if known" value={formData.system} onChange={handleChange} />
              <select name="interest" value={formData.interest} onChange={handleChange} required>
                <option value="">Primary area of interest</option>
                <option>NERIS readiness</option>
                <option>Incident reporting workflow review</option>
                <option>Dashboard and analytics planning</option>
                <option>Data quality review</option>
                <option>Grant-support analytics</option>
                <option>Public records workflow improvement</option>
                <option>Not sure yet</option>
              </select>
              <textarea name="challenge" value={formData.challenge} onChange={handleChange} placeholder="What is the biggest reporting, workflow, or data challenge right now?" rows="5" />
              <label className="consent">
                <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} required />
                <span>I agree to be contacted by Elevate AI Solutions about public safety data modernization services.</span>
              </label>
              <button className="submit-button" disabled={status === 'submitting'} type="submit">
                {status === 'submitting' ? 'Submitting...' : 'Submit Information'}
              </button>
              {status === 'success' && <p className="success-message">Thank you. Your information has been submitted.</p>}
              {status === 'error' && <p className="error-message">{error}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <img src={logo} alt="Elevate AI Solutions logo" />
            <p>Public Safety Data Modernization | Fire Campaign</p>
          </div>
          <div>
            <strong>Elevate AI Solutions</strong>
            <p>Public Safety Data Modernization Team</p>
            <p>Elevate-AISolutions.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Metric({ icon, label, value, trend }) {
  return (
    <div className="metric-card">
      <div className="metric-icon">{icon}</div>
      <strong>{value}</strong>
      <span>{label}</span>
      <small>{trend}</small>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <article className="feature-card">
      <div className="icon-badge">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function Service({ title, text }) {
  return (
    <article className="service-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function Step({ number, title, text }) {
  return (
    <article className="step-card">
      <span>{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function Field({ type = 'text', name, placeholder, value, onChange, required = false }) {
  return <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} required={required} />;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
