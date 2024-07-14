import './Button.css';

export function Button({ onClick }: { onClick: () => void }) {
  return (
    <button className="button" onClick={onClick}>
      Click
    </button>
  );
}
