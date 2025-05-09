import { GameData } from "@/types/GameData";
import { SocialData } from "@/types/SocialData";


export const games: GameData[] = [
  { 
    image: "/images/deathballbanner.webp", 
    title: "Death Ball", 
    status: "Unreleased", 
    statusColor: "blue", 
    url: "https://www.roblox.com/games/15002061926",
    features: [
      "Auto Parry",
      "Bypass Anti-Cheat",
      "Custom Dash Cooldown",
      "Custom Dash Power",
    ],
    isPremium: true,
    hasPremiumFeatures: false,
  }
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