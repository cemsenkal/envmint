<script lang="ts">
    let innerHeight: number;
</script>

<svelte:window bind:innerHeight />

<footer style={`margin-top: ${innerHeight}px;`}>
    <div class="footer-container">
        <div>
            <h4 translate="no">EnvMint</h4>
            <hr />
            <a href="https://github.com/cemsenkal" target="_blank"
                >Other projects</a
            >
        </div>
        <a
            href="https://github.com/cemsenkal/envmint"
            target="_blank"
            aria-label="project repo"
            class="repo-link"
        >
            <span class="ph--github-logo"></span>
        </a>
        <span class="copyright" translate="no"
            >{new Date().getFullYear()} EnvMint</span
        >
    </div>
</footer>

<style>
    footer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        border-top: 1px solid var(--border-primary);
        background-color: var(--surface-bg);
    }

    .footer-container {
        position: relative;
        width: var(--app-container);
        margin-left: auto;
        margin-right: auto;
        padding: 0.5rem 0rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        div {
            display: flex;
            align-items: center;
            gap: 0.5rem;

            hr {
                color: var(--border-primary);
                height: 1rem;
            }

            a {
                font-size: 0.7rem;
            }

            h4 {
                cursor: default;
            }
        }
    }

    .repo-link {
        width: fit-content;
        height: fit-content;

        span {
            width: 1.5rem;
            height: 1.5rem;
        }
    }

    .copyright {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0.5;
        font-size: 0.8rem;
    }
</style>
