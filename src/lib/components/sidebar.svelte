<script>
	import { LayoutDashboard, Wallet, TrendingDown } from '@lucide/svelte';
	import { page } from '$app/stores';

	const links = [
		{ href: '/', label: 'Dashboard', icon: LayoutDashboard },
		{ href: '/incomes', label: 'Incomes', icon: Wallet },
		{ href: '/expenses', label: 'Expenses', icon: TrendingDown }
	];
</script>

<aside class="flex h-full w-60 flex-col gap-1 border-r bg-background p-4">
	<!-- Logo -->
	<div class="mb-8 flex items-center gap-2 px-2">
		<div class="rounded-md bg-primary p-1.5">
			<Wallet size={20} class="text-primary-foreground" />
		</div>
		<span class="text-lg font-bold">FinanceTracker</span>
	</div>

	<!-- Links -->
	{#each links as { href, label, icon: Icon }}
		<a
			{href}
			class="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors
        {$page.url.pathname === href
				? 'bg-primary text-primary-foreground'
				: 'text-muted-foreground hover:bg-accent hover:text-foreground'}"
		>
			<Icon size={18} />
			<span class="text-sm font-medium">{label}</span>
		</a>
	{/each}
</aside>
