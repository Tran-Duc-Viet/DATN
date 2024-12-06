export interface BankAccount {
  id: number; // Assuming it's a numeric identifier
  accountNumber: string;
  bankId: number; // Assuming it's a numeric identifier
  bankName: string;
  template: string;
  accountName: string;
  format?: string; // Optional property (can be undefined)
  description?: string; // Optional property (can be undefined)
}
