<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import { mockExpenses } from '$lib/data';
	import type { DataFinanceProps } from '$lib/types';
	import { TrendingDown, TrendingUp, Wallet } from '@lucide/svelte';
	import { PieChart } from 'layerchart';

	const dataFinance: DataFinanceProps[] = [
		{
			label: 'Total Income',
			cash: 6200,
			icon: TrendingUp
		},
		{
			label: 'Total Expenses',
			cash: 1975,
			icon: TrendingDown
		}
	];
	const ingresos = dataFinance
		.filter((m) => m.label === 'Total Income')
		.reduce((acc, m) => acc + m.cash, 0);

	const gastos = dataFinance
		.filter((m) => m.label === 'Total Expenses')
		.reduce((acc, m) => acc + m.cash, 0);

	const balance = ingresos - gastos;

	const formatter = new Intl.NumberFormat('es-AR', {
		style: 'currency',
		currency: 'ARS'
	});

	const chartData = mockExpenses.reduce(
		(acc, expense) => {
			const existing = acc.find((item) => item.category === expense.category);
			if (existing) {
				existing.amount += expense.amount;
			} else {
				acc.push({ category: expense.category, amount: expense.amount });
			}
			return acc;
		},
		[] as { category: string; amount: number }[]
	);
</script>

<h1>Finance Tracker</h1>
<h3>Track your income and expenses</h3>

<div class="item-center flex w-full justify-center gap-4 py-10">
	{#each dataFinance as { label, cash, icon: Icon }}
		<Card.Root class="-my-4 w-full max-w-sm">
			<Card.Header class="flex items-center justify-between">
				<Card.Title>{label}</Card.Title>
				<div
					class={`flex h-9 w-9 items-center justify-center rounded-full ${label == 'Total Income' ? 'bg-primary/20 text-primary' : 'bg-destructive/20 text-destructive'}`}
				>
					<Icon size={18} />
				</div>
			</Card.Header>
			<Card.Content>
				<Card.Description
					class={`text-2xl ${label == 'Total Income' ? 'text-primary' : 'text-destructive'}`}
					>{formatter.format(cash)}</Card.Description
				>
			</Card.Content>
		</Card.Root>
	{/each}
	<Card.Root class="-my-4 w-full max-w-sm">
		<Card.Header class="flex items-center justify-between">
			<Card.Title>Balance</Card.Title>
			<div class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary">
				<Wallet size={18} />
			</div>
		</Card.Header>
		<Card.Content>
			<Card.Description
				class={` text-2xl ${
					balance > 0 ? 'text-primary' : balance < 0 ? 'text-destructive' : 'text-gray-500'
				}`}>{formatter.format(balance)}</Card.Description
			>
		</Card.Content>
	</Card.Root>
</div>

<div class="border border-chart-1 px-2.5 py-2.5">
	{#if chartData && chartData.length > 0}
		<PieChart data={chartData} key="categoria" value="monto" />
	{/if}
</div>
