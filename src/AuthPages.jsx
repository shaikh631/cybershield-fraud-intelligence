import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Check, Mail, ShieldCheck } from "lucide-react";
import { Button, Logo } from "./components/ui";
import { IntelligenceCore, ThreeScene } from "./components/IntelligenceCore";

export const DEMO_USERS = {
  "admin@cybershield.demo": {
    name: "Ayan Shaikh",
    email: "admin@cybershield.demo",
    role: "Admin",
    department: "Fraud Intelligence",
    password: "Demo@123",
  },
  "analyst@cybershield.demo": {
    name: "Sarah Khan",
    email: "analyst@cybershield.demo",
    role: "Analyst",
    department: "Transaction Risk",
    password: "Demo@123",
  },
  "investigator@cybershield.demo": {
    name: "David Anderson",
    email: "investigator@cybershield.demo",
    role: "Investigator",
    department: "Investigations",
    password: "Demo@123",
  },
};

function Field({ label, children, error }) {
  return (
    <label className="auth-field">
      {label}
      {children}
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}

export function AuthFlow({ signup = false }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "admin@cybershield.demo",
    password: "Demo@123",
    confirm: "Demo@123",
    role: "Analyst",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const update = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));
  const submit = (event) => {
    event.preventDefault();
    setError("");
    const user = DEMO_USERS[form.email.toLowerCase()];
    if (signup && form.password !== form.confirm)
      return setError("Passwords do not match.");
    if (!signup && (!user || user.password !== form.password))
      return setError("Use one of the demo accounts with password Demo@123.");
    setLoading(true);
    window.setTimeout(() => {
      const nextUser = signup
        ? {
            name: form.name || "New Analyst",
            email: form.email,
            role: form.role,
            department: form.company || "Fraud Operations",
          }
        : user;
      localStorage.setItem("cybershield_user", JSON.stringify(nextUser));
      localStorage.setItem("cybershield_pending_verification", "true");
      navigate("/verify-otp");
    }, 550);
  };
  return (
    <div className="auth">
      <div className="auth-art">
        <ThreeScene />
        <Logo />
        <div>
          <span className="eyebrow">SECURE ACCESS</span>
          <h1>Signals become intelligence here.</h1>
          <p>
            Secure access to a fraud workspace designed for high-stakes
            investigation teams.
          </p>
          <IntelligenceCore compact />
        </div>
      </div>
      <div className="auth-form">
        <Link to="/">← Back to public site</Link>
        <div className="auth-card">
          <span className="eyebrow">
            {signup ? "CREATE ACCESS" : "WELCOME BACK"}
          </span>
          <h1>{signup ? "Create your account" : "Sign in to Cybershield"}</h1>
          <p>Demo authentication · no real credentials are transmitted.</p>
          <form onSubmit={submit} noValidate>
            {signup && (
              <>
                <Field label="Full name">
                  <input
                    required
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Ayan Shaikh"
                  />
                </Field>
                <Field label="Company">
                  <input
                    required
                    value={form.company}
                    onChange={update("company")}
                    placeholder="Acme Financial"
                  />
                </Field>
              </>
            )}
            <Field label="Work email">
              <input
                required
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="you@company.com"
              />
            </Field>
            <Field label="Password">
              <input
                required
                type="password"
                value={form.password}
                onChange={update("password")}
                placeholder="Demo@123"
              />
            </Field>
            {signup && (
              <>
                <Field label="Confirm password">
                  <input
                    required
                    type="password"
                    value={form.confirm}
                    onChange={update("confirm")}
                    placeholder="Repeat password"
                  />
                </Field>
                <Field label="Workspace role">
                  <select value={form.role} onChange={update("role")}>
                    <option>Analyst</option>
                    <option>Investigator</option>
                    <option>Admin</option>
                  </select>
                </Field>
              </>
            )}
            {!signup && (
              <div className="auth-row">
                <label className="check">
                  <input type="checkbox" defaultChecked /> Remember me
                </label>
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
            )}
            {error && (
              <div className="form-error" role="alert">
                {error}
              </div>
            )}
            <Button type="submit" icon={ArrowRight}>
              {loading
                ? "Authenticating..."
                : signup
                  ? "Create account"
                  : "Sign in"}
            </Button>
          </form>
          {!signup && (
            <>
              <div className="divider">OR CONTINUE WITH</div>
              <div className="social">
                <Button type="button" variant="ghost">
                  Google
                </Button>
                <Button type="button" variant="ghost">
                  Microsoft
                </Button>
              </div>
              <p className="auth-switch">
                Don't have an account? <Link to="/signup">Create account</Link>
              </p>
            </>
          )}
          {signup && (
            <p className="auth-switch">
              Already have access? <Link to="/login">Sign in</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function ForgotPassword() {
  const { notify } = useMockNotify();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    setSent(true);
    notify("Password reset link simulated");
  };
  return (
    <div className="verify">
      <Logo />
      <div className="verify-card forgot-card">
        <Mail size={31} />
        <span className="eyebrow">ACCOUNT RECOVERY</span>
        <h1>Reset your password</h1>
        <p>
          Enter your work email and we will simulate a secure recovery link.
        </p>
        <form onSubmit={submit}>
          <Field label="Work email">
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
            />
          </Field>
          <Button type="submit" icon={sent ? Check : ArrowRight}>
            {sent ? "Recovery link sent" : "Send recovery link"}
          </Button>
        </form>
        <Link className="text-button" to="/login">
          Back to sign in
        </Link>
      </div>
    </div>
  );
}

export function Verification({ twoFactor = false }) {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [method, setMethod] = useState("Authenticator App");
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(42);
  const inputs = useRef([]);
  useEffect(() => {
    const timer = window.setInterval(
      () => setSeconds((value) => (value > 0 ? value - 1 : 0)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, []);
  const update = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...code];
    next[index] = value;
    setCode(next);
    if (value && inputs.current[index + 1]) inputs.current[index + 1].focus();
  };
  const submit = (event) => {
    event.preventDefault();
    if (code.join("") !== "123456")
      return setError("Enter the demo code 123456.");
    setError("");
    if (twoFactor) {
      localStorage.removeItem("cybershield_pending_verification");
      navigate("/dashboard");
    } else navigate("/2fa");
  };
  return (
    <div className="verify">
      <Logo />
      <div className="verify-card">
        <ShieldCheck size={31} />
        <span className="eyebrow">
          {twoFactor ? "STEP 02 OF 02" : "STEP 01 OF 02"}
        </span>
        <h1>
          {twoFactor
            ? "Additional verification required"
            : "Verify your identity"}
        </h1>
        <p>
          {twoFactor
            ? "Choose a method and complete the final demo verification."
            : "A six-digit code was sent to your work email. Use 123456 for this demo."}
        </p>
        {twoFactor && (
          <div className="auth-methods">
            {["Authenticator App", "Email OTP", "Security Key"].map((item) => (
              <button
                type="button"
                className={method === item ? "selected" : ""}
                key={item}
                onClick={() => setMethod(item)}
              >
                <ShieldCheck size={15} />
                {item}
                {method === item && <Check size={14} />}
              </button>
            ))}
          </div>
        )}
        <form onSubmit={submit}>
          <div className="otp">
            {code.map((value, index) => (
              <input
                aria-label={`Verification digit ${index + 1}`}
                key={index}
                ref={(element) => {
                  inputs.current[index] = element;
                }}
                inputMode="numeric"
                maxLength="1"
                value={value}
                onChange={(event) => update(index, event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Backspace" &&
                    !code[index] &&
                    inputs.current[index - 1]
                  )
                    inputs.current[index - 1].focus();
                }}
              />
            ))}
          </div>
          {error && (
            <div className="form-error" role="alert">
              {error}
            </div>
          )}
          <Button type="submit" icon={ArrowRight}>
            Verify and continue
          </Button>
        </form>
        <button
          type="button"
          className="text-button"
          onClick={() => setSeconds(42)}
          disabled={seconds > 0}
        >
          Resend code · 00:{String(seconds).padStart(2, "0")}
        </button>
      </div>
    </div>
  );
}

function useMockNotify() {
  return {
    notify: (message) => {
      window.dispatchEvent(
        new CustomEvent("cybershield-toast", { detail: message }),
      );
    },
  };
}
