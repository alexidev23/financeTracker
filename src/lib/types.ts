// src/lib/types.ts

import type { Component } from 'svelte';
import type { LucideProps } from '@lucide/svelte';

// Dashboard cards
export interface DataFinanceProps {
	label: string;
	cash: number;
	icon: Component<LucideProps>;
}

// Categorías
export type ExpenseCategory =
	| 'food'
	| 'transport'
	| 'utilities'
	| 'leisure'
	| 'health'
	| 'education'
	| 'other';

export type IncomeCategory = 'salary' | 'freelance' | 'investment' | 'other';

// Gasto
export interface Expense {
	id: string;
	name: string;
	amount: number;
	category: ExpenseCategory;
	date: string; // ISO format: "2025-05-11"
}

// Ingreso
export interface Income {
	id: string;
	name: string;
	amount: number;
	category: IncomeCategory;
	date: string;
}
