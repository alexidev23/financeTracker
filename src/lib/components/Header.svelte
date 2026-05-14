<script>
	import { toggleMode } from 'mode-watcher';
	import { Sun, Moon } from '@lucide/svelte';
</script>

<header class="flex h-14 items-center justify-between border-b bg-background px-6">
	<!-- Logo solo visible en mobile -->
	<div class="flex items-center gap-2 md:hidden">
		<span class="text-lg font-bold">FinanceTracker</span>
	</div>

	<!-- Spacer en desktop -->
	<div class="hidden md:block"></div>

	<!-- Toggle dark/light -->
	<button onclick={toggleMode} class="rounded-lg p-2 transition-colors hover:bg-accent">
		<Sun size={18} class="dark:hidden" />
		<Moon size={18} class="hidden dark:block" />
	</button>
</header>
