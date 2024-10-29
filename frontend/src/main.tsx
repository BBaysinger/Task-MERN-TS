import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./app/store";
import "./index.scss";
import App from "./App";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
} else {
  console.error("Could not find element with ID 'root'");
}
