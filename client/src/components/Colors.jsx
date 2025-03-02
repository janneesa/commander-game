export default function Colors({ colors = [] }) {
  return (
    <div className="flex space-x-1">
      {colors.map((color) => (
        <img
          key={color}
          src={`/assets/${color}.svg`}
          alt={`${color} mana`}
          className="w-6 h-6"
        />
      ))}
    </div>
  );
}
