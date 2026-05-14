// src/lib/data.ts
import type { Expense, Income } from '$lib/types';

export const mockExpenses: Expense[] = [
	{ id: '1', name: 'Supermercado', amount: 350, category: 'food', date: '2025-05-01' },
	{ id: '2', name: 'Colectivo', amount: 120, category: 'transport', date: '2025-05-02' },
	{ id: '3', name: 'Luz y gas', amount: 800, category: 'utilities', date: '2025-05-03' },
	{ id: '4', name: 'Netflix', amount: 120, category: 'leisure', date: '2025-05-04' },
	{ id: '5', name: 'Farmacia', amount: 200, category: 'health', date: '2025-05-05' }
];

export const mockIncomes: Income[] = [
	{ id: '1', name: 'Sueldo', amount: 5000, category: 'salary', date: '2025-05-01' },
	{ id: '2', name: 'Proyecto freelance', amount: 1200, category: 'freelance', date: '2025-05-10' }
];
