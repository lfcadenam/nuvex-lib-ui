export interface TopbarTab {
  id: string;
  label: string;
  badge?: number | string;
  active?: boolean;
}

export interface UserProfile {
  name: string;
  role?: string;
  avatarText?: string;
  avatarUrl?: string;
}

export type UserMenuOption = 'perfil' | 'facturas' | 'clave' | 'logout';
