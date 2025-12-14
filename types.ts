// Tá no Schema
export interface Product {
  id?: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  benefits: string[];
}

// Tá no Schema
export interface CartItem extends Product {
  quantity: number;
}

// Vou mexer dps já que é sobre pagamento
export interface Message {
  role: "user" | "model";
  text: string;
  timestamp: Date;
  isError?: boolean;
}

// Vou mexer dps já que é sobre pagamento
export enum CheckoutStatus {
  IDLE = "IDLE",
  GENERATING_PIX = "GENERATING_PIX",
  WAITING_PAYMENT = "WAITING_PAYMENT",
  SUCCESS = "SUCCESS",
}

// Tá no Schema
export interface UserInfo {
  name: string;
  email: string;
  cpf: string;
  phone?: string;
}

// Vou mexer dps já que é sobre pagamento
export interface PixData {
  qrCodeBase64: string; // Typically a data URL for the image
  copyPasteKey: string;
  expiresAt: Date;
}
