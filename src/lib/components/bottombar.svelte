<script lang="ts">
	import { LayoutDashboard, Wallet, TrendingDown } from '@lucide/svelte';
	import { page } from '$app/state';
	import type { Component } from 'svelte';
	import type { LucideProps } from '@lucide/svelte';

	interface NavLink {
		id: string;
		href: string;
		label: string;
		icon: Component<LucideProps>; // ← sin la basura de después
	}

	let openMenu: string | null = $state(null); // ← tipado el state

	const links: NavLink[] = [
		{ id: 'dashboard', href: '/', label: 'Dashboard', icon: LayoutDashboard },
		{ id: 'incomes', href: '/incomes', label: 'Incomes', icon: Wallet },
		{ id: 'expenses', href: '/expenses', label: 'Expenses', icon: TrendingDown }
	];

	function toggleMenu(id: string) {
		// ← tipado el parámetro
		openMenu = openMenu === id ? null : id;
	}
</script>

<nav class="fixed right-0 bottom-0 left-0 z-50 flex justify-around border-t bg-background py-2">
	{#each links as { id, href, label, icon: Icon }}
		<div class="relative flex flex-col items-center">
			<!-- Submenú -->
			{#if openMenu === id}
				<div class="absolute bottom-14 min-w-32 rounded-lg border bg-popover p-2 shadow-lg">
					<a
						{href}
						onclick={() => (openMenu = null)}
						class="block rounded-md px-3 py-2 text-sm hover:bg-accent"
					>
						{label}
					</a>
				</div>
			{/if}

			<!-- Botón -->
			<button
				onclick={() => toggleMenu(id)}
				class="flex flex-col items-center gap-1 rounded-lg p-2 transition-colors
          {page.url.pathname === href ? 'text-primary' : 'text-muted-foreground'}"
			>
				<Icon size={22} />
				<span class="text-xs">{label}</span>
			</button>
		</div>
	{/each}
</nav>
