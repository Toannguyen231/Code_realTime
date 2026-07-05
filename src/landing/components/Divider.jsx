export default function Divider({ variant }) {
  return (
    <div className="wrap">
      <div className={'divider' + (variant === 'glow' ? ' divider-glow' : '')} />
    </div>
  );
}
