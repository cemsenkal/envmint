<script lang="ts">
    import { onDestroy, tick } from "svelte";
    import { editorStore } from "../../lib/stores/editor/index.svelte";
    import type { EditorStoreType } from "../../types";
    import EditorHeader from "../editor-header/index.svelte";

    const isFirefox = navigator.userAgent.includes("Firefox");

    let editorData: Array<EditorStoreType>;
    const unsubscribe = editorStore.subscribe((data) => (editorData = data));
    onDestroy(unsubscribe);

    let lineContainer: HTMLUListElement;
    let activeLine: HTMLLIElement;
    let activeLineId: number;

    const selectActiveLine = (event: FocusEvent, lineData: EditorStoreType) => {
        const focusedInput = event.target as HTMLInputElement;
        activeLine = focusedInput.closest("li") as HTMLLIElement;
        activeLineId = editorData.findIndex((data) => data.id === lineData.id);
    };

    const functionRouter = (event: KeyboardEvent) => {
        const activeInput = event.target as HTMLInputElement;
        const keyInput = activeLine.querySelector(
            "[data-input-type='key']",
        ) as HTMLInputElement;
        const valueInput = activeLine.querySelector(
            "[data-input-type='value']",
        ) as HTMLInputElement;

        changeFocus(event, keyInput, valueInput, activeInput);
        createNewLine(event, keyInput, valueInput);
        removeLine(event, keyInput);
    };

    const changeFocus = (
        event: KeyboardEvent,
        keyInput: HTMLInputElement,
        valueInput: HTMLInputElement,
        activeInput: HTMLInputElement,
    ) => {
        if (keyInput.value.length > 3 && event.key === "Enter") {
            valueInput.focus();
        } else if (
            valueInput.value.length <= 0 &&
            event.key === "Backspace" &&
            activeInput === valueInput
        ) {
            event.preventDefault();
            keyInput.focus();
        }
    };

    const createNewLine = async (
        event: KeyboardEvent,
        keyInput: HTMLInputElement,
        valueInput: HTMLInputElement,
    ) => {
        if (
            keyInput.value.length > 3 &&
            valueInput.value.length > 3 &&
            event.key === "Enter" &&
            editorData.length < 50
        ) {
            activeLineId += 1;

            editorStore.update((data) => {
                return [
                    ...data.slice(0, activeLineId),
                    {
                        id: self.crypto.randomUUID(),
                        key: "",
                        value: "",
                    },
                    ...data.slice(activeLineId),
                ];
            });

            await tick();

            const newLine = lineContainer.children[
                activeLineId
            ] as HTMLLIElement;
            const newKeyInput = newLine.querySelector(
                "[data-input-type='key']",
            ) as HTMLInputElement;
            newKeyInput.focus();
        }
    };

    const removeLine = async (
        event: KeyboardEvent,
        keyInput: HTMLInputElement,
    ) => {
        if (
            keyInput.value.length <= 0 &&
            event.key === "Backspace" &&
            editorData.length > 1
        ) {
            editorStore.update((data) => {
                return [
                    ...data.slice(0, activeLineId),
                    ...data.slice(activeLineId + 1),
                ];
            });

            activeLineId -= 1;

            if (editorData.length >= 1 && activeLineId < 0) {
                activeLineId += 1;
            }

            await tick();

            event.preventDefault();

            const activeLine = lineContainer.children[
                activeLineId
            ] as HTMLLIElement;
            const newValueInput = activeLine.querySelector(
                "[data-input-type='value']",
            ) as HTMLInputElement;
            newValueInput.focus();
        }
    };
</script>

<section>
    <EditorHeader />

    <div class="editor">
        <ul bind:this={lineContainer}>
            {#each editorData as lineData, index (lineData.id)}
                <li>
                    <span class="line-number">{index + 1}</span>
                    <div>
                        <input
                            type="text"
                            placeholder="KEY"
                            data-input-type="key"
                            style={isFirefox
                                ? `font-family: mono; width: ${lineData.key.length < 56 ? `${lineData.key.length + 1.5}ch` : "100%"};`
                                : "field-sizing: content;"}
                            onfocus={(event) =>
                                selectActiveLine(event, lineData)}
                            onkeydown={functionRouter}
                            oninput={(event) => {
                                const input = event.target as HTMLInputElement;
                                input.value = input.value.replace(" ", "_");
                                input.value = input.value.toUpperCase();

                                lineData.key = input.value;
                            }}
                        />
                        <span>=</span>
                        <input
                            type="text"
                            placeholder="VALUE"
                            bind:value={lineData.value}
                            data-input-type="value"
                            style={isFirefox
                                ? `font-family: mono; width: ${lineData.value.length < 56 ? `${lineData.value.length + 1.5}ch` : "100%"};`
                                : "field-sizing: content;"}
                            onfocus={(event) =>
                                selectActiveLine(event, lineData)}
                            onkeydown={functionRouter}
                        />
                    </div>
                </li>
            {/each}
        </ul>
    </div>
</section>

<pre>
    {JSON.stringify(editorData, null, 2)}
</pre>

<style>
    .editor {
        width: 100%;
        height: 30rem;
        background-color: var(--editor-bg);
        border-bottom-left-radius: 0.8rem;
        border-bottom-right-radius: 0.8rem;
        border: 1px solid var(--editor-border);

        &:before {
            content: " ";
            position: absolute;
            display: inline-block;
            width: 3.5rem;
            height: 29.9rem;
            background-color: var(--editor-line-number-bg);
            border-bottom-left-radius: 0.8rem;
        }

        ul {
            width: 100%;
            height: 100%;
            overflow: auto;
            display: flex;
            flex-direction: column;
            gap: 1rem;

            li {
                display: flex;
                align-items: center;
                gap: 0.7rem;

                &:first-child {
                    margin-top: 0.5rem;
                }

                &:last-child {
                    margin-bottom: 0.5rem;
                }

                div {
                    width: calc(100% - 4.7rem);
                    display: flex;
                    gap: 0.5rem;

                    input {
                        outline: none;
                        border: none;
                        color: var(--app-text-color);
                        font-weight: 500;
                        background-color: var(--editor-input-bg);
                        padding: 0.4rem;
                        border-radius: 0.5rem;
                    }

                    span {
                        font-weight: 600;
                        font-size: 2rem;
                    }
                }
            }
        }
    }

    .line-number {
        position: relative;
        display: inline-block;
        text-align: center;
        width: 3.5rem;
        font-size: 1.2rem;
        font-weight: 500;
    }

    [data-input-type="key"] {
        min-width: 4rem;
        max-width: 27.7rem;
        color: var(--editor-key-input-text-color) !important;
    }

    [data-input-type="value"] {
        min-width: 6rem;
        max-width: 27.7rem;
    }
</style>
