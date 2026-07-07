import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, Mail, Loader2, LayoutTemplate, Boxes, Database } from 'lucide-react';
import toast from 'react-hot-toast';
import { loginAdmin } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

const schema = z.object({
  adminEmail: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAdmin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const res = await loginAdmin(data);
      setAdmin(res.admin);
      toast.success(`Welcome back, ${res.admin.adminName}!`);
      navigate('/dashboard');
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Login failed. Check your credentials.';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dash-shell login">
      {/* ── Brand panel ─────────────────────────────────────── */}
      <div className="login__brand">
        <div className="login__brand-bg" />
        <div className="login__grid" />

        <div className="login__brand-content">
          <div className="login__logo">
            <div className="brand-mark"><span>S</span></div>
            <div>
              <div className="brand-name">SiteBuilder</div>
              <div className="brand-meta">Pro</div>
            </div>
          </div>
        </div>

        <div className="login__brand-content">
          <div className="login__chip"><span className="pulse" /> Secure admin access</div>
          <h1 className="login__tag">
            Build and publish sites <em>without touching a line of code.</em>
          </h1>
          <div className="login__features">
            <div className="login__feature"><LayoutTemplate size={15} /> Drag-and-drop page builder</div>
            <div className="login__feature"><Boxes size={15} /> Reusable, data-driven components</div>
            <div className="login__feature"><Database size={15} /> Your own content, your own data tables</div>
          </div>
        </div>
      </div>

      {/* ── Form panel ──────────────────────────────────────── */}
      <div className="login__form-side">
        <div className="login__form">
          <h2>Sign in</h2>
          <p className="login__form-sub">Enter your credentials to access the dashboard</p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="field">
              <label className="field__label">Email address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-subtle)' }} />
                <input
                  {...register('adminEmail')}
                  type="email"
                  autoComplete="email"
                  placeholder="admin@example.com"
                  className="input"
                  style={{ paddingLeft: 32, borderColor: errors.adminEmail ? 'var(--danger)' : undefined }}
                />
              </div>
              {errors.adminEmail && (
                <p style={{ fontSize: 11, color: 'var(--danger)', margin: '2px 0 0' }}>{errors.adminEmail.message}</p>
              )}
            </div>

            <div className="field">
              <label className="field__label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-subtle)' }} />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="input"
                  style={{ paddingLeft: 32, paddingRight: 32, borderColor: errors.password ? 'var(--danger)' : undefined }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--fg-subtle)', cursor: 'pointer', display: 'flex' }}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {errors.password && (
                <p style={{ fontSize: 11, color: 'var(--danger)', margin: '2px 0 0' }}>{errors.password.message}</p>
              )}
            </div>

            <button type="submit" disabled={isLoading} className="btn btn--primary btn--block" style={{ height: 38, marginTop: 4 }}>
              {isLoading ? (
                <><Loader2 size={14} className="animate-spin" /> Signing in…</>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--fg-subtle)', marginTop: 22 }}>
            Access restricted to authorized administrators only.
          </p>
        </div>
      </div>
    </div>
  );
}
