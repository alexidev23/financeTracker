<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import { mockExpenses } from '$lib/data';
	import type { DataFinanceProps } from '$lib/types';
	import { TrendingDown, TrendingUp, Wallet } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { Chart, ArcElement, Tooltip, Legend, PieController } from 'chart.js';
	import DataLabelsPlugin from 'chartjs-plugin-datalabels';

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

	Chart.register(ArcElement, Tooltip, Legend, PieController, DataLabelsPlugin);

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

	let canvas: HTMLCanvasElement;
	const colors = ['#14b8a6', '#f43f5e', '#f97316', '#8b5cf6', '#3b82f6'];

	onMount(() => {
		const isDark = document.documentElement.classList.contains('dark');
		const total = chartData.reduce((acc, d) => acc + d.amount, 0);

		new Chart(canvas, {
			type: 'pie',
			data: {
				labels: chartData.map((d) => d.category),
				datasets: [
					{
						data: chartData.map((d) => d.amount),
						backgroundColor: ['#14b8a6', '#f43f5e', '#f97316', '#8b5cf6', '#3b82f6'],
						borderColor: isDark ? '#1f2937' : '#ffffff',
						borderWidth: 2
					}
				]
			},
			options: {
				plugins: {
					legend: { display: false },
					datalabels: {
						color: (ctx) => colors[ctx.dataIndex], // mismo color que la porción
						anchor: 'end',
						align: 'end',
						offset: 8,
						formatter: (value, ctx) => {
							const percentage = ((value / total) * 100).toFixed(0);
							const label = chartData[ctx.dataIndex].category;
							return `${label} ${percentage}%`;
						},
						font: {
							size: 12,
							weight: 'bold'
						}
					}
				},
				layout: {
					padding: 40 // espacio para que los labels no se corten
				}
			}
		});
	});
</script>

<div class="pb-30">
	<h1 class="text-3xl font-semibold">Finance Tracker</h1>
	<p class="text-muted-foreground">Track your income and expenses</p>

	<div class="item-center mb-3 flex w-full justify-center gap-4 py-10">
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
				<div
					class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary"
				>
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

	<Card.Root class="-my-4 w-full">
		<Card.Title class="px-6 font-semibold">Expenses by Category</Card.Title>
		<canvas bind:this={canvas} class="mx-auto"></canvas>
	</Card.Root>
</div>
