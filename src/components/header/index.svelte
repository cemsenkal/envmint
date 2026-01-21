<script lang="ts">
    import { themeState, toggleTheme } from "../../lib/theme/index.svelte";
    import type { ThemeType } from "../../types";

    let theme: ThemeType;

    themeState.subscribe((data) => {
        theme = data;
    });
</script>

<header>
    <h1>EnvMint</h1>

    <div>
        <a
            href="https://github.com/cemsenkal/envmint"
            target="_blank"
            aria-label="project repo"
        >
            <span class="ph--github-logo"></span>
        </a>
        <button aria-label="toggle theme" onclick={toggleTheme}>
            {#if theme === "dark"}
                <span class="ph--sun"></span>
            {:else}
                <span class="ph--moon-stars"></span>
            {/if}
        </button>
    </div>
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        div {
            display: flex;
            align-items: center;
            gap: 1rem;

            a,
            button {
                width: fit-content;
                height: fit-content;
                cursor: pointer;

                span {
                    width: 1.5rem;
                    height: 1.5rem;
                }
            }
        }
    }
</style>
