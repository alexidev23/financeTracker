<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/sidebar.svelte';
	import Bottombar from '$lib/components/bottombar.svelte';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher />
<div class="flex h-screen overflow-hidden">
	<div class="hidden md:flex">
		<Sidebar />
	</div>

	<div class="flex flex-1 flex-col overflow-hidden">
		<Header />
		<main class="flex-1 overflow-auto p-6 pb-20 md:pb-6">
			{@render children()}
		</main>
	</div>

	<div class="md:hidden">
		<Bottombar />
	</div>
</div>
