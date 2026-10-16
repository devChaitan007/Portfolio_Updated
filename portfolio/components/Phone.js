export default function Phone({ children, className = "" }) {
  return (
    <div className={`phone ${className}`}>
      <div className="screen">{children}</div>
    </div>
  );
}
