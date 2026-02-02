<script lang="ts">
    import "../../styles/editor.css";
    import { onDestroy, tick } from "svelte";
    import { editorStore } from "../../lib/stores/editor/index.svelte";
    import type {
        EditorCommentType,
        EditorLineType,
        EditorStoreType,
    } from "../../types";
    import EditorHeader from "../editor-header/index.svelte";

    const minKeyLength = 3;
    const maxLines = 50;

    let editorData: EditorStoreType;
    const unsubscribe = editorStore.subscribe((data) => (editorData = data));
    onDestroy(unsubscribe);

    let lineContainer: HTMLUListElement;
    let activeLine: HTMLLIElement;
    let activeLineType: "comment" | "line";
    let activeLineId: number;

    const selectActiveLine = (
        event: FocusEvent,
        lineData: EditorLineType | EditorCommentType,
    ) => {
        const focusedInput = event.target as HTMLInputElement;
        activeLine = focusedInput.closest("li") as HTMLLIElement;
        activeLineId = editorData.findIndex((data) => data.id === lineData.id);
        activeLineType = editorData[activeLineId].type;
    };

    const isFirefox = navigator.userAgent.includes("Firefox");
    const autoWidth = (len: number) => {
        const style = isFirefox
            ? `font-family: mono; width: ${len < 56 ? `${len + 1.5}ch` : "100%"};`
            : "field-sizing: content;";
        return style;
    };

    const functionRouter = (event: KeyboardEvent) => {
        const activeInput = event.target as HTMLInputElement;
        const keyInput = activeLine.querySelector(
            "[data-input-type='key']",
        ) as HTMLInputElement;
        const valueInput = activeLine.querySelector(
            "[data-input-type='value']",
        ) as HTMLInputElement;
        const commentInput = activeLine.querySelector(
            "[data-input-type='comment']",
        ) as HTMLInputElement;

        switch (event.key) {
            case "Enter":
                changeFocus(event, keyInput, valueInput, activeInput);
                createNewLine(keyInput, valueInput, commentInput);
                break;
            case "Backspace":
                changeFocus(event, keyInput, valueInput, activeInput);
                removeLine(event, keyInput, activeInput);
                break;
            case "/":
                if (event.ctrlKey) changeLineType();
                break;
        }
    };

    const changeFocus = (
        event: KeyboardEvent,
        keyInput: HTMLInputElement,
        valueInput: HTMLInputElement,
        activeInput: HTMLInputElement,
    ) => {
        if (!keyInput && !valueInput) return;

        if (keyInput.value.length > minKeyLength && event.key === "Enter") {
            valueInput.focus();
        } else if (
            valueInput.value.length <= 0 &&
            activeInput === valueInput &&
            event.key === "Backspace"
        ) {
            event.preventDefault();
            keyInput.focus();
        }
    };

    const createNewLine = async (
        keyInput: HTMLInputElement,
        valueInput: HTMLInputElement,
        commentInput: HTMLInputElement,
    ) => {
        if (
            editorData.length < maxLines &&
            (activeLineType === "line"
                ? keyInput.value.length > minKeyLength &&
                  valueInput.value.length > minKeyLength
                : commentInput.value.length > minKeyLength)
        ) {
            activeLineId += 1;

            editorStore.update((data) => {
                return [
                    ...data.slice(0, activeLineId),
                    {
                        type: "line",
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
        activeInput: HTMLInputElement,
    ) => {
        if (editorData.length > 1 && activeInput.value.length < 1) {
            if (keyInput && keyInput.value.length > 1) return;

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
                `[data-input-type='${editorData[activeLineId].type === "comment" ? "comment" : "value"}']`,
            ) as HTMLInputElement;

            newValueInput.focus();
        }
    };

    const changeLineType = async () => {
        const updatedLine: EditorLineType | EditorCommentType =
            editorData[activeLineId].type === "comment"
                ? {
                      type: "line",
                      id: editorData[activeLineId].id,
                      key: "",
                      value: "",
                  }
                : {
                      type: "comment",
                      id: editorData[activeLineId].id,
                      value: "",
                  };
        editorStore.update((data) => {
            return [
                ...data.slice(0, activeLineId),
                updatedLine,
                ...data.slice(activeLineId + 1),
            ];
        });

        await tick();

        const activeLine = lineContainer.children[
            activeLineId
        ] as HTMLLIElement;
        const selectedInput = activeLine.querySelector(
            `[data-input-type='${updatedLine.type === "comment" ? "comment" : "key"}']`,
        ) as HTMLInputElement;
        selectedInput.focus();
    };
</script>

<section>
    <EditorHeader />

    <div class="editor">
        <ul bind:this={lineContainer}>
            {#each editorData as lineData, index (lineData.id)}
                {#if lineData.type === "line"}
                    <li>
                        <span class="line-number">{index + 1}</span>
                        <div>
                            <input
                                type="text"
                                placeholder="KEY"
                                data-input-type="key"
                                style={`${autoWidth(lineData.key.length)}`}
                                onfocus={(event) =>
                                    selectActiveLine(event, lineData)}
                                onkeydown={functionRouter}
                                oninput={(event) => {
                                    const input =
                                        event.target as HTMLInputElement;
                                    input.value = input.value.replace(" ", "_");
                                    input.value = input.value.toUpperCase();

                                    lineData.key = input.value;
                                }}
                                maxlength={200}
                            />
                            <span>=</span>
                            <input
                                type="text"
                                placeholder="VALUE"
                                bind:value={lineData.value}
                                data-input-type="value"
                                style={`${autoWidth(lineData.value.length)}`}
                                onfocus={(event) =>
                                    selectActiveLine(event, lineData)}
                                onkeydown={functionRouter}
                                maxlength={200}
                            />
                        </div>
                    </li>
                {:else}
                    <li>
                        <span class="line-number">{index + 1}</span>
                        <div>
                            <span>#</span>
                            <input
                                type="text"
                                placeholder="Comment here"
                                bind:value={lineData.value}
                                data-input-type="comment"
                                style={`${autoWidth(lineData.value.length)}`}
                                onfocus={(event) =>
                                    selectActiveLine(event, lineData)}
                                onkeydown={functionRouter}
                                maxlength={200}
                            />
                        </div>
                    </li>
                {/if}
            {/each}
        </ul>
    </div>
</section>
