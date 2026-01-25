<script lang="ts">
    import type { ButtonType } from "../../types";

    let { children, variant = "base", ...props }: ButtonType = $props();
</script>

<button {...props} class={[variant, props.class ? props.class : undefined]}>
    {#if children}
        {@render children()}
    {:else}
        Button
    {/if}
</button>

<style>
    button {
        font-weight: 500;
        padding: 0.4rem 0.5rem;
        border-radius: 0.4rem;
        cursor: pointer;
        transition: 150ms scale;
        color: #d0d0d0;

        &:active {
            scale: 96%;
        }

        &.base {
            background-color: var(--base-button-bg);
            color: var(--base-button-text);
        }

        &.success {
            background-color: darkgreen;
        }

        &.danger {
            background-color: darkred;
        }

        &.warning {
            background-color: darkgoldenrod;
        }
    }
</style>
