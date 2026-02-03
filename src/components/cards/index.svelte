<script lang="ts">
    const cardData = [
        {
            title: "Env variables, no bullshit",
            text: "Generate environment variables instantly. No signup, no backend, no data stored.",
        },
        {
            title: "Your secrets stay local",
            text: "Everything runs in your browser. Nothing is sent, logged, or stored anywhere.",
        },
        {
            title: "Built for developers",
            text: "Perfect for .env files, side projects, and quick setups without overthinking.",
        },
    ];
</script>

<section>
    {#each cardData as card, index (index)}
        {@render cardSnippet(card)}
    {/each}
</section>

{#snippet cardSnippet({ title, text }: { title: string; text: string })}
    <div class="card">
        <h3>{title}</h3>
        <p>{text}</p>
    </div>
{/snippet}

<style>
    section {
        display: flex;
        justify-content: space-between;
        gap: 1rem;

        div {
            background-color: var(--surface-panel);
            border: 1px solid var(--border-primary);
            margin-top: 1.5rem;
            width: 100%;
            border-radius: 0.8rem;
            overflow: hidden;

            h3 {
                padding: 0.5rem 1rem;
                border-bottom: 1px solid var(--border-primary);
                background-color: var(--surface-bg);
            }

            p {
                opacity: 0.7;
                padding: 1rem;
                line-height: 1.4rem;
            }
        }
    }
</style>
