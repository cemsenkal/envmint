<script lang="ts">
    const usageList = [
        {
            title: "Add underscore",
            text: "You can use the Spacebar key to quickly insert an underscore.",
            key: "Space",
        },
        {
            title: "Add variables",
            text: "After entering the values, press Enter to switch to a second input or create a new line.",
            key: "Enter",
        },
        {
            title: "Comment line",
            text: "You can toggle between commented and normal lines using the Ctrl + / key combination.",
            key: ["Ctrl", "+", "/"],
        },
    ];
</script>

<section>
    <h3>Usage</h3>

    <ul>
        {#each usageList as usage, index (index)}
            <li>
                <div>
                    <h4>{usage.title}</h4>
                    {@render keyboardKey(usage.key)}
                </div>
                <p>{usage.text}</p>
            </li>
        {/each}
    </ul>
</section>

{#snippet keyboardKey(key: string | Array<string>)}
    {#if typeof key === "object"}
        <span class="multiple-keyboard-key">
            {#each key as text, index (index)}
                <span>{text}</span>
            {/each}
        </span>
    {:else}
        <span class="keyboard-key">{key}</span>
    {/if}
{/snippet}

<style>
    section {
        width: 100%;
        background-color: var(--surface-panel);
        border: 1px solid var(--border-primary);
        border-radius: 0.8rem;
        margin-top: 1.5rem;
        overflow: hidden;

        h3 {
            width: 100%;
            padding: 0.5rem 1rem;
            border-bottom: 1px solid var(--border-primary);
            background-color: var(--surface-bg);
        }

        ul {
            display: grid;
            grid-template-columns: auto auto auto;
            align-items: center;

            li {
                height: 100%;
                padding: 1rem;
                border-left: 1px solid var(--border-primary);

                &:first-child {
                    border: none;
                }

                div {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding-bottom: 0.5rem;
                }

                p {
                    opacity: 0.8;
                    line-height: 1.4rem;
                }
            }
        }
    }

    .keyboard-key,
    .multiple-keyboard-key {
        padding: 0.1rem 0.5rem;
        font-size: 0.8rem;
        border-radius: 0.2rem;
        border: solid 1px var(--border-primary);
    }

    .multiple-keyboard-key {
        display: flex;
        align-items: center;
        gap: 0.3rem;
    }
</style>
