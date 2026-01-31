export interface NotificationDto {
  id: number;        // ou string si UUID
  text: string;
  time: string;      // ex: "À l'instant" ou "2025-12-13T14:10:00Z"
  read: boolean;
}
