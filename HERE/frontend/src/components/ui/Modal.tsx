import { X } from 'lucide-react';
import type { ReactNode } from 'react';

interface ModalProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  /** Wider dialog — use for forms with several fields (e.g. add-row forms). */
  wide?: boolean;
}

// Shared modal shell used across the admin chrome (Site Workspace, Component
// data grid, etc.) — centered overlay dialog per the dash-shell design system.
export function Modal({ title, subtitle, onClose, children, wide }: ModalProps) {
  return (
    <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={wide ? 'modal modal--wide' : 'modal'}>
        <div className="modal__head">
          <div>
            <div className="modal__title">{title}</div>
            {subtitle && <div className="modal__sub">{subtitle}</div>}
          </div>
          <button onClick={onClose} className="icon-btn">
            <X size={15} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
