// =====================
// MOCK DATA — RPG Nexus
// =====================

const SESSIONS = [
  {
    id: 1,
    title: "A Maldição de Strahd",
    system: "D&D 5e",
    description: "Aventureiros corajosos são chamados para enfrentar o vampiro Strahd von Zarovich nas terras sombrias de Barovia. Um módulo de terror gótico épico.",
    emoji: "🧛",
    bannerGradient: "linear-gradient(135deg, #1a0a0a, #2d0d1a)",
    tags: ["Terror", "Exploração", "Roleplay"],
    mode: "Online",
    frequency: "Semanal",
    slots: 5,
    filled: 3,
    dm: { name: "Alric Valdris", initials: "AV", color: "#7b5ea7" },
    featured: true,
    xp: "Intermediário"
  },
  {
    id: 2,
    title: "Pathfinder: Wrath of the Righteous",
    system: "Pathfinder",
    description: "Campanha épica contra demônios. Os heróis devem fechar o Wound, uma ferida no coração do mundo que corrompe tudo ao redor.",
    emoji: "🔥",
    bannerGradient: "linear-gradient(135deg, #1a0d00, #2a1500)",
    tags: ["Épico", "Combate", "Estratégia"],
    mode: "Online",
    frequency: "Quinzenal",
    slots: 4,
    filled: 2,
    dm: { name: "Lyra Moonweave", initials: "LM", color: "#4a90d9" },
    featured: true,
    xp: "Avançado"
  },
  {
    id: 3,
    title: "Tormenta: A Queda dos Deuses",
    system: "Tormenta 20",
    description: "No mundo de Arton, a Tormenta avança e os deuses silenciam. Uma campanha de alta fantasia com muito drama e ação.",
    emoji: "⛈️",
    bannerGradient: "linear-gradient(135deg, #080d1a, #0d1a2a)",
    tags: ["Alta Fantasia", "Drama", "Ação"],
    mode: "Presencial",
    frequency: "Semanal",
    slots: 6,
    filled: 4,
    dm: { name: "Drak Ferreiro", initials: "DF", color: "#c0392b" },
    featured: false,
    xp: "Iniciante"
  },
  {
    id: 4,
    title: "Máscaras na Escuridão",
    system: "Vampiro",
    description: "São Paulo, noite eterna. Uma guerra de clãs está prestes a estourar nas sombras da metrópole. Você escolhe um lado — ou sobrevive no meio.",
    emoji: "🌃",
    bannerGradient: "linear-gradient(135deg, #0a000f, #1a0a20)",
    tags: ["Político", "Intriga", "Urbano"],
    mode: "Online",
    frequency: "Quinzenal",
    slots: 4,
    filled: 1,
    dm: { name: "Serafina Black", initials: "SB", color: "#2ecc71" },
    featured: false,
    xp: "Intermediário"
  },
  {
    id: 5,
    title: "One-Shot: Ruínas de Mezeria",
    system: "D&D 5e",
    description: "Uma aventura de uma sessão para heróis de nível 5. Explore as ruínas de uma cidade abandonada há séculos. Perfeito para iniciantes!",
    emoji: "🏛️",
    bannerGradient: "linear-gradient(135deg, #0d1a0a, #1a2a0d)",
    tags: ["One-Shot", "Exploração", "Iniciante"],
    mode: "Online",
    frequency: "One-shot",
    slots: 5,
    filled: 3,
    dm: { name: "Miko Tanaka", initials: "MT", color: "#c9a84c" },
    featured: false,
    xp: "Iniciante"
  },
  {
    id: 6,
    title: "Cthulhu: O Chamado de Dunwich",
    system: "Call of Cthulhu",
    description: "Anos 1920. Investigadores são enviados à pequena cidade de Dunwich, onde eventos sobrenaturais perturbam a paz e a sanidade dos moradores.",
    emoji: "🐙",
    bannerGradient: "linear-gradient(135deg, #050a0f, #0a1520)",
    tags: ["Horror", "Investigação", "1920s"],
    mode: "Online",
    frequency: "Mensal",
    slots: 4,
    filled: 4,
    dm: { name: "Edgar Poe Jr.", initials: "EP", color: "#888" },
    featured: false,
    xp: "Avançado"
  }
];

const PLAYERS = [
  {
    id: 1,
    name: "Zara Nightmoon",
    class: "Jogadora • D&D / PF",
    initials: "ZN",
    avatarColor: "linear-gradient(135deg, #7b5ea7, #4a90d9)",
    tags: ["D&D 5e", "Roleplay", "SP"],
    statusColor: "#2ecc71",
    online: true
  },
  {
    id: 2,
    name: "Korvath Ironfist",
    class: "Player & DM • Tormenta",
    initials: "KI",
    avatarColor: "linear-gradient(135deg, #c0392b, #8e1a10)",
    tags: ["Tormenta 20", "Combate"],
    statusColor: "#2ecc71",
    online: true
  },
  {
    id: 3,
    name: "Elara Whisper",
    class: "Veterana • CoC / Vampiro",
    initials: "EW",
    avatarColor: "linear-gradient(135deg, #1a1a2e, #4a3f7f)",
    tags: ["Vampiro", "Investigação"],
    statusColor: "#f39c12",
    online: false
  },
  {
    id: 4,
    name: "Brum Steelback",
    class: "Iniciante • Buscando mesa",
    initials: "BS",
    avatarColor: "linear-gradient(135deg, #c9a84c, #8a5d00)",
    tags: ["D&D 5e", "Exploração"],
    statusColor: "#2ecc71",
    online: true
  },
  {
    id: 5,
    name: "Vex Silverthorn",
    class: "DM Experiente",
    initials: "VS",
    avatarColor: "linear-gradient(135deg, #0d8a5f, #065e3f)",
    tags: ["D&D 5e", "PF 2e", "RJ"],
    statusColor: "#888",
    online: false
  }
];
