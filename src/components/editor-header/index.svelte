<script lang="ts">
    import Button from "../button/index.svelte";
</script>

<div class="editor-header">
    <Button variant="base"></Button>
    <Button variant="danger"></Button>
    <Button variant="success"></Button>
    <Button variant="warning"></Button>
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
    }
</style>
