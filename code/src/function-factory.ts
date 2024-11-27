import on_work_creation from './functions/on_work_creation';
import { handler as salesSummary } from './functions/sales_summary';

export const functionFactory = {
  // Add your functions here
  on_work_creation,
  sales_summary: salesSummary,
} as const;

export type FunctionFactoryType = keyof typeof functionFactory;
