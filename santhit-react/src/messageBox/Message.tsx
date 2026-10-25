
type ConfirmModalProps = {
    show: boolean;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    confirmColor?: string;
    onConfirm: () => void;
    onCancel: () => void;
};
export default function ConfirmModal({
    show,
    title = "Are you sure?",
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    confirmColor = "btn-primary",
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    if (!show) return null;
    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 1055,
            }}
        >
            <div
                className="bg-white rounded-4 shadow p-4"
                style={{ width: "400px", maxWidth: "90%" }}
            >
                <h5 className="fw-bold mb-3">
                    {title}
                </h5>

                <p className="text-secondary mb-4">
                    {message}
                </p>

                <div className="d-flex justify-content-end gap-2">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        className={`btn ${confirmColor}`}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
