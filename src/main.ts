import { mount } from "svelte";
import Home from "./pages/home/page.svelte";

// Styles
import "./styles/normalize.css";
import "./styles/main.css";

// Icons
import "./styles/icons.css";

const app = mount(Home, {
  target: document.getElementById("app")!,
});

export default app;
