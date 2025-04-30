export interface DppEventDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  data: Object;
  createdByUserId?: string;
  isSystemEvent?: boolean;
}
