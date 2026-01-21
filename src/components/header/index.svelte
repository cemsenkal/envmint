<header>
    <h1>EnvMint</h1>

    <div>
        <a
            href="https://github.com/cemsenkal/envmint"
            target="_blank"
            aria-label="project repo"><span class="ph--github-logo"></span></a
        >
        <button aria-label="toggle theme">
            <span class="ph--sun"></span>
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
