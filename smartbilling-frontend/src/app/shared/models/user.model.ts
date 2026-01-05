export interface User {
  username?: string;
  roles?: string[];
  sub?: string; // Ajouté pour compatibilité JWT (subject)
}
