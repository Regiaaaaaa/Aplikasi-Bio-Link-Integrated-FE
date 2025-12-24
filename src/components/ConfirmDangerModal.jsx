import { useEffect, useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";

function ConfirmDangerModal({
  isOpen,
  onClose,
  title = "Delete",
  subtitle = "This action cannot be undone",
  warningTitle = "Warning: This will permanently delete:",
  warningItems = [],
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) setMounted(true);
    else setTimeout(() => setMounted(false), 220);
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div
      className={`danger-overlay ${isOpen ? "open" : "close"}`}
      onClick={onClose}
    >
      <div
        className={`danger-modal ${isOpen ? "open" : "close"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="danger-header">
          <div className="danger-icon">
            <AlertTriangle size={22} />
          </div>
          <div>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
        </div>

        {/* Warning Box */}
        {warningItems.length > 0 && (
          <div className="danger-warning">
            {warningTitle && <p className="warning-title">{warningTitle}</p>}

            <ul className={!warningTitle ? "no-title" : ""}>
              {warningItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Question */}
        <div className="danger-question">
          <AlertTriangle size={16} />
          <span>Are you absolutely sure you want to proceed?</span>
        </div>

        {/* Actions */}
        <div className="danger-actions">
          <button className="btn-cancel" onClick={onClose}>
            {cancelText}
          </button>
          <button
            className="btn-danger"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            <Trash2 size={16} />
            {confirmText}
          </button>
        </div>

        <p className="danger-footnote">
          By clicking "{confirmText}", you agree to permanently remove this
          data.
        </p>
      </div>

      <style jsx>{`
        .danger-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          opacity: 0;
          transition: opacity 0.22s ease;
        }

        .danger-overlay.open {
          opacity: 1;
        }

        .danger-warning ul.no-title {
          margin-top: 0;
        }

        .danger-overlay.close {
          opacity: 0;
        }

        .danger-modal {
          background: white;
          border-radius: 18px;
          width: 100%;
          max-width: 480px;
          padding: 24px;
          transform: scale(0.95) translateY(12px);
          opacity: 0;
          transition: all 0.22s ease;
        }

        .danger-modal.open {
          transform: scale(1) translateY(0);
          opacity: 1;
        }

        .danger-modal.close {
          transform: scale(0.95) translateY(12px);
          opacity: 0;
        }

        .danger-header {
          display: flex;
          gap: 14px;
          margin-bottom: 20px;
        }

        .danger-icon {
          width: 42px;
          height: 42px;
          background: #fee2e2;
          color: #dc2626;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .danger-header h2 {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .danger-header p {
          font-size: 14px;
          color: #6b7280;
        }

        .danger-warning {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 18px;
        }

        .warning-title {
          font-weight: 600;
          color: #b91c1c;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .danger-warning ul {
          list-style-type: disc;
          padding-left: 20px;
          margin: 0;
          color: #b91c1c;
          font-size: 14px;
        }

        .danger-warning li {
          margin-bottom: 6px;
        }

        .danger-question {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f9fafb;
          border-radius: 10px;
          padding: 12px;
          font-size: 14px;
          color: #374151;
          margin-bottom: 20px;
        }

        .danger-actions {
          display: flex;
          gap: 12px;
        }

        .btn-cancel {
          flex: 1;
          padding: 10px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          font-weight: 500;
        }

        .btn-danger {
          flex: 1;
          padding: 10px;
          border-radius: 12px;
          background: #dc2626;
          color: white;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-danger:hover {
          background: #b91c1c;
        }

        .danger-footnote {
          margin-top: 14px;
          font-size: 12px;
          color: #6b7280;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default ConfirmDangerModal;