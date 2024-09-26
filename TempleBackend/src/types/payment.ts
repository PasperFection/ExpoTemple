export interface Payment {
  id?: number; // Maak id optioneel voor creatie
  userId: number;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt?: Date; // Maak createdAt optioneel
  updatedAt?: Date; // Maak updatedAt optioneel
}

export interface OfflinePayment {
  amount: number;
  date: string;
}