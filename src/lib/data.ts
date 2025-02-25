import { GameData } from "@/types/GameData";
import { SocialData } from "@/types/SocialData";


export const games: GameData[] = [
  { 
    image: "/images/toh_banner.webp", 
    title: "Tower of Hell", 
    status: "Working", 
    statusColor: "green", 
    url: "https://www.roblox.com/games/1962086868",
    features: [
      "Auto Farm",
      "Bypass Anti-Cheat",
      "Disable Modifiers",
      "Godmode",
      "& Much more!"
    ],
    isPremium: false,
    hasPremiumFeatures: false,
  },
  { 
    image: "/images/doors_banner.webp", 
    title: "Doors", 
    status: "Working", 
    statusColor: "green", 
    url: "https://www.roblox.com/games/6516141723",
    features: [
      "Entity ESP",
      "Item ESP",
      "Auto Complete",
      "Walking Speed Modifier",
      "Entity Spawner",
      "Entity Notifier",
      "& Much more!"
    ],
    isPremium: true,
    hasPremiumFeatures: true,
  },
  { 
    image: "/images/mm2_banner.webp", 
    title: "Murder Mystery 2", 
    status: "Unreleased", 
    statusColor: "blue", 
    url: "https://www.roblox.com/games/142823291",
    features: [
      "Role ESP",
      "Kill All",
      "Auto Unboxing",
      "Become Sheriff",
      "Coin Farm (Includes Events)",
      "& Much more!"
    ],
    isPremium: false,
    hasPremiumFeatures: true,
  },
  { 
    image: "/images/sp_banner.webp", 
    title: "Sound Space", 
    status: "Working", 
    statusColor: "green", 
    url: "https://www.roblox.com/games/2677609345",
    features: [
      "Auto Play",
      "Anti Spectate",
      "Block Score",
      "Change Background",
      "& More!"
    ],
    isPremium: false,
    hasPremiumFeatures: false,
  },
];

export const socials: SocialData[] = [
  {
    title: "Scriptblox ❤️",
    description: "Browse & Follow our Script Blox Account.",
    icon: "Globe",
    link: "https://scriptblox.com/u/starry",
    glowColor: "rgba(139, 92, 246, 0.15)"
  },
  {
    title: "GitHub 📜",
    description: "View and star the open sourced portions of Starry",
    icon: "Github",
    link: "https://github.com/starry-proj",
    glowColor: "rgba(255, 255, 255, 0.1)"
  },
  {
    title: "Rscripts ⚡",
    description: "Browse and follow our official Rscripts account",
    icon: "Globe",
    link: "https://rscripts.net/@starry",
    glowColor: "rgba(59, 130, 246, 0.15)" 
  },
  {
    title: "Discord",
    description: "Join our community for sneak peaks, script updates, upcoming features, and more",
    icon: "FaDiscord",
    link: "https://luau.tech/d?server=luau",
    glowColor: "rgba(88, 101, 242, 0.15)"
  }
];