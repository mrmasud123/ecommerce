import { initialCartItems, type CartItem } from "@/lib/data";

export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: CartItem[];
  address: string;
  payment: string;
  tracking?: string;
};

const statuses: OrderStatus[] = ["Delivered", "Delivered", "Shipped", "Processing", "Delivered", "Cancelled"];
const dates = [
  "Jul 21, 2026",
  "Jul 14, 2026",
  "Jul 09, 2026",
  "Jul 02, 2026",
  "Jun 24, 2026",
  "Jun 11, 2026",
];

function orderItems(seed: number): CartItem[] {
  const count = (seed % 3) + 1;
  return Array.from({ length: count }, (_, i) => initialCartItems[(seed + i) % initialCartItems.length]);
}

export const orders: Order[] = statuses.map((status, i) => {
  const items = orderItems(i);
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  return {
    id: `#SLZ-${1042 - i * 4}`,
    date: dates[i],
    status,
    total: Number(total.toFixed(2)),
    items,
    address: "House 12, Road 5, Dhanmondi, Dhaka 1209",
    payment: i % 2 === 0 ? "Visa •••• 4242" : "Cash on delivery",
    tracking: status === "Shipped" ? `TRK-${(9000 + i * 37).toString()}BD` : undefined,
  };
});