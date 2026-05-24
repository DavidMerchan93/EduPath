export default function CategoryChip({ icon, name }) {
  return (
    <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white hover:border-brand-orange hover:text-brand-orange text-sm font-medium text-gray-700 transition-colors whitespace-nowrap">
      <span>{icon}</span>
      <span>{name}</span>
    </button>
  )
}
