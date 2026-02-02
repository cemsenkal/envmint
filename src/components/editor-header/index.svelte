<script lang="ts">
    import { onDestroy } from "svelte";
    import { editorStore } from "../../lib/stores/editor/index.svelte";
    import type { EditorStoreType } from "../../types";
    import JSZip from "jszip";

    let isCopied = $state(false);
    let editorData: EditorStoreType;
    const unsubscribe = editorStore.subscribe((data) => (editorData = data));
    onDestroy(unsubscribe);

    $effect(() => {
        if (!isCopied) return;

        const timeout = setTimeout(() => {
            isCopied = false;
        }, 2000);

        return () => {
            clearTimeout(timeout);
        };
    });

    const resetEditor = () => {
        if (editorData.length <= 1) return;

        editorStore.update(() => {
            return [
                {
                    type: "line",
                    id: self.crypto.randomUUID(),
                    key: "",
                    value: "",
                },
            ];
        });
    };

    const copySecret = async () => {
        const bytes = new Uint8Array(32);
        crypto.getRandomValues(bytes);

        const hex = [...bytes]
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");

        const clipboardItem = new ClipboardItem({
            ["text/plain"]: hex,
        });
        await navigator.clipboard.write([clipboardItem]);
        isCopied = true;
    };

    const downloadEnv = async () => {
        if (editorData.length <= 1) return;

        const isDownloadable =
            editorData.filter((data) => {
                if (data.type === "comment") {
                    if (data.value.length <= 3) return data;
                } else {
                    if (data.key.length <= 3 || data.value.length <= 3)
                        return data;
                }
            }).length !== 0
                ? true
                : false;

        if (isDownloadable) return;

        const secretList = editorData.map((data) => {
            if (data.type === "line") {
                return `${data.key}=${data.value}`;
            } else {
                return `\n# ${data.value}`;
            }
        });

        const exampleList = editorData.map((data) => {
            if (data.type === "line") {
                return `${data.key}=YOUR_DATA`;
            } else {
                return `\n# ${data.value}`;
            }
        });

        const zip = new JSZip();
        zip.file(".env", secretList.join("\n"));
        zip.file(".env.example", exampleList.join("\n"));
        zip.file(".env.production", secretList.join("\n"));
        const zipFile = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(zipFile);

        const temporaryTag = document.createElement("a");
        temporaryTag.href = url;
        temporaryTag.download = "env-files.zip";
        document.body.appendChild(temporaryTag);
        temporaryTag.click();

        document.body.removeChild(temporaryTag);
        URL.revokeObjectURL(url);
    };
</script>

<div class="editor-header">
    <button
        class="refresh-button"
        aria-label="reset editor"
        onclick={resetEditor}
        ><span
            class="ph--arrow-counter-clockwise"
            style="width: 100%; height: 100%;"
        ></span></button
    >

    <div>
        <button onclick={copySecret}
            >{isCopied ? "Copied!" : "Copy secret"}</button
        >
        <button onclick={downloadEnv}>Download</button>
    </div>
</div>

<style>
    .editor-header {
        width: 100%;
        height: 2.5rem;
        background-color: var(--surface-panel);
        border: 1px solid var(--border-primary);
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
