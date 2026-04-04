export const SUBS = [
  { name: "Netflix", logo: "🎬", status: "active", cost: "₹649" },
  { name: "Hotstar", logo: "⭐", status: "unused", cost: "₹299" },
  { name: "Spotify", logo: "🎵", status: "active", cost: "₹119" },
  { name: "Amazon Prime", logo: "📦", status: "expiring", cost: "₹299" },
  { name: "SonyLIV", logo: "📺", status: "unused", cost: "₹299" },
  { name: "YouTube", logo: "▶️", status: "active", cost: "₹189" },
  { name: "iCloud", logo: "☁️", status: "active", cost: "₹75" },
  { name: "Notion", logo: "📝", status: "active", cost: "₹400" },
  { name: "Zee5", logo: "📡", status: "unused", cost: "₹199" },
  { name: "Adobe CC", logo: "🎨", status: "expiring", cost: "₹1675" },
];

export const STATUS_CONFIG = {
  active: {
    wrapper:
      "bg-[rgba(26,107,74,0.06)] border-[rgba(26,107,74,0.25)] text-[#1a6b4a]",
    dot: "bg-[#1a6b4a]",
    label: "active",
  },
  unused: {
    wrapper:
      "bg-[rgba(192,57,43,0.06)] border-[rgba(192,57,43,0.25)] text-[#c0392b]",
    dot: "bg-[#c0392b]",
    label: "unused",
  },
  expiring: {
    wrapper:
      "bg-[rgba(183,112,13,0.06)] border-[rgba(183,112,13,0.25)] text-[#b7700d]",
    dot: "bg-[#b7700d]",
    label: "expiring",
  },
};
