import { GameData } from "@/types/GameData";
import { SocialData } from "@/types/SocialData";


export const games: GameData[] = [
  {
    image: "/images/dr_banner.webp",
    title: "Dead Rails",
    status: "Unreleased",
    statusColor: "green",
    url: "https://www.roblox.com/games/116495829188952",
    features: [
      "Teleport to Containers 👑", "Teleport to Building", "Convert Dead to Fuel 👑", "Teleport to Train", "Ride Train 👑",
      "Honk Train Horn", "Steal Dropped Moneybags 👑", "Remove Hold Duration 👑", "Sprinting", "Enable Third Person",
      "Change Speed", "Change Jumping Power", "Reset Player Stats"
    ],
    isPremium: false,
    hasPremiumFeatures: true
  },
  { 
    image: "/images/doors_banner.webp", 
    title: "DOORS", 
    status: "Working", 
    statusColor: "green", 
    url: "https://www.roblox.com/games/6516141723",
    features: [
      "Correct Painting ESP 👑", "Highlight Doors", "Full Bright", "Key ESP", "Switch ESP",
      "Notify on Rush", "Change Walkspeed", "Toggle Speed Hacks", "Room Index", "Back to Lobby",
      "Exit Shaft", "Join Elevator", "Gamemode Selection", "Exclude Randos", "Create Lift",
      "Rush ESP", "Instant Use"
    ],
    isPremium: true,
    hasPremiumFeatures: true
  },
  { 
    image: "/images/mm2_banner.webp", 
    title: "Murder Mystery 2", 
    status: "Unreleased", 
    statusColor: "blue", 
    url: "https://www.roblox.com/games/142823291",
    features: [
      "Show Murderer", "Show Sheriff", "Map Label", "Time Remaining Label", "Grab Gun",
      "Auto Grab Gun", "Announce Roles", "Kill Everyone", "Xray Vision", "Teleport to Location",
      "Disable Bank Scanner 👑", "Murderer ESP", "Sheriff ESP", "Innocents ESP", "Dropped Gun ESP",
      "Trap ESP", "Coin & Event Coin ESP"
    ],
    isPremium: false,
    hasPremiumFeatures: true
  },
  { 
    image: "/images/toh_banner.webp", 
    title: "Tower of Hell", 
    status: "Working", 
    statusColor: "green", 
    url: "https://www.roblox.com/games/1962086868",
    features: [
      "Auto Farm", "God Mode", "Give Jumps", "Give Gears", "Walkspeed",
      "Jumping Power", "Teleport to Game Type", "Performance Stats 👑", "Show Interface", "Auto Play Stacker 👑",
      "Fling Player 👑", "Change Teleport Type", "Change Farming Type", "Change TV Icon", "Auto Promote after Win",
      "Disable Conveyors 👑", "Give Hidden Gears", "Complete Tower", "Disable Anti-Gravity Effect 👑", "Disable Fog Effect 👑",
      "Disable Speed Effect 👑", "Disable Bunnyhop Effect 👑"
    ],
    isPremium: false,
    hasPremiumFeatures: false
  },
  {
    image: "/images/bi2_banner.webp",
    title: "Break In 2",
    status: "Working",
    statusColor: "green",
    url: "https://www.roblox.com/games/13864661000",
    features: [
      "Accept Uncle Pete's Quest", "Unlock Custom NPC", "Unlock All NPCs", "Open Secret Door", "Disable Ice Slip",
      "Full Bright", "Collect Outside Foods", "Global Teleports", "Spoof Indoors 👑", "Teleport to Player",
      "Heal Player", "God Mode 👑", "Upgrade Buff of Choice", "Max Buffs", "Visually Show Speed 👑",
      "Kill Nearby Enemies 👑", "Kill Aura 👑", "Kill Bosses", "Kill Pizza Boss", "Give Best Weapon",
      "Equip Armor", "Heal Everyone 👑", "Infinite Golden Pizza", "Stack on Foods", "Spin Bad Guys 👑",
      "Kick Player 👑", "Kick Everyone 👑", "Delete Entire Map", "Delete Item", "Squash Player",
      "Badge Counter 👑", "Instantly Load", "Quickest Ride 👑", "Join Specific Bus 👑", "Leave Current Bus",
      "Swap Outfits on Role Change 👑", "Choose a Paid Role", "Choose a Free Role", "Change Animation",
      "Slip on Ice", "Give Area Item"
    ],
    isPremium: false,
    hasPremiumFeatures: false
  },
  {
    image: "/images/babft_banner.webp",
    title: "Build for Treasure [BABFT]",
    status: "Working",
    statusColor: "green",
    url: "https://www.roblox.com/games/537413528",
    features: [
      "Use Quest Unlocker 👑", "Give Save Slots 👑", "Teleport to Team Base", "Teleport to Home Island", "Bypass Island Locks",
      "Bypass Launch Restrictions", "Clear Island Parts", "Promote Starry after Cycle", "Idle Farm Gold Blocks", "Farm 1 Gold Block",
      "Idle Money Farm", "Start 1 Coin Farm", "Choose Farming Method 👑", "Change PVP Status",
      "Player Speed", "Jumping Power", "Water God Mode 👑", "Give All Tools", "Reset Player Changes"
    ],
    isPremium: false,
    hasPremiumFeatures: true
  },
  { 
    image: "/images/sp_banner.webp", 
    title: "Sound Space", 
    status: "Working", 
    statusColor: "green", 
    url: "https://www.roblox.com/games/2677609345",
    features: [
      "Auto Player 👑", "Anti Spectate 👑", "Block Score 👑", "Rejoin Server", "Auto Player Smoothing",
      "Randomize Background 👑"
    ],
    isPremium: false,
    hasPremiumFeatures: true
  },
];

export const socials: SocialData[] = [
  {
    title: "Script Blox",
    description: "View and follow Starry's official page!",
    icon: "Globe",
    link: "https://scriptblox.com/u/starry",
    glowColor: "rgba(139, 92, 246, 0.15)"
  },
  {
    title: "GitHub",
    description: "Preview, Star, and enjoy open-sourced portions of Starry's code!",
    icon: "Github",
    link: "https://github.com/starry-proj",
    glowColor: "rgba(255, 255, 255, 0.1)"
  },
  {
    title: "RScripts",
    description: "Look at, follow & browse our official page on Roblox's best exploiting site!",
    icon: "Globe",
    link: "https://rscripts.net/@starry",
    glowColor: "rgba(59, 130, 246, 0.15)" 
  },
  {
    title: "Discord",
    description: "Join and meet the community! Get the latest news, releases, Premium discounts, and more!",
    icon: "FaDiscord",
    link: "https://discord.gg/luau",
    glowColor: "rgba(88, 101, 242, 0.15)"
  }
];