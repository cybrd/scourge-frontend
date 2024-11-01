export type Member = {
  id: string;
  discord_name: string;
  ingame_name: string;
};

export type MemberWithPoints = Member & {
  available_points: number;
  available_archboss_points: number;
  total_points: number;
};
