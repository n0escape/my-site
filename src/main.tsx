import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Suspense } from "react";

createRoot(document.getElementById("root")!).render(
	<Suspense fallback={<div>Loading...</div>}>
		<App />
	</Suspense>
);
