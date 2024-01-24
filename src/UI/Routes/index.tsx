// @ts-ignore
import React from "react";
// @ts-ignore
import ReactDOM from "react-dom/client";
import {HashRouter, Route, Routes} from "react-router-dom";
// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('dka'));

const Example = React.lazy(() => import("./Component/Example"));

root.render(
    <HashRouter>
        <Routes>
            <Route path="/example" element={<Example/>} />
        </Routes>
    </HashRouter>
);