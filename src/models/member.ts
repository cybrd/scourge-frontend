export type Member = {
  id: string;
  discord_name: string;
  ingame_name: string;
  weapon: string;
  team: string;
};

export type MemberWithPoints = Member & {
  available_points: number;
  available_archboss_points: number;
  total_points: number;
};

export const memberWeaponList = [
  "",
  "Crossbow / Dagger",
  "Crossbow / Longbow",
  "Crossbow / Greatsword",
  "Crossbow / Staff",
  "Crossbow / Sword",
  "Crossbow / Wand",
  "Dagger / Longbow",
  "Dagger / Greatsword",
  "Dagger / Staff",
  "Dagger / Sword",
  "Dagger / Wand",
  "Longbow / Greatsword",
  "Longbow / Staff",
  "Longbow / Sword",
  "Longbow / Wand",
  "Greatsword / Staff",
  "Greatsword / Sword",
  "Greatsword / Wand",
  "Staff / Sword",
  "Staff / Wand",
  "Sword / Wand",
] as const;

export const memberTeamList = ["", "1", "2", "3"] as const;
