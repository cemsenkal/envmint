<script lang="ts">
    let isCopied = $state(false);

    $effect(() => {
        if (!isCopied) return;

        const timeout = setTimeout(() => {
            isCopied = false;
        }, 2000);

        return () => {
            clearTimeout(timeout);
        };
    });
</script>

<div class="editor-header">
    <button class="refresh-button" aria-label="reset editor"
        ><span
            class="ph--arrow-counter-clockwise"
            style="width: 100%; height: 100%;"
        ></span></button
    >

    <div>
        <button>{isCopied ? "Copied!" : "Copy secret"}</button>
        <button>Download</button>
    </div>
</div>

<style>
    .editor-header {
        width: 100%;
        height: 2.5rem;
        background-color: var(--editor-bg);
        border: 1px solid var(--editor-border);
        border-bottom: none;
        border-top-left-radius: 0.8rem;
        border-top-right-radius: 0.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0rem 0.3rem;

        div {
            display: flex;
            gap: 1rem;
            font-size: 0.8rem;

            button {
                cursor: pointer;
                font-size: 0.8rem;

                &:hover {
                    opacity: 0.8;
                }
            }
        }
    }

    .refresh-button {
        width: 3rem;
        height: 1.8rem;
        padding: 0.3rem;
        cursor: pointer;
        border-radius: 0.5rem;

        &:hover {
            background-color: #8b000042;
        }
    }
</style>
