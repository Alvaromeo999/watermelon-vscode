while (!$) {
  console.log("no $");
}
import setReceivedError from "./utils/setReceivedError.js";
import setLoading from "./utils/setLoading.js";
import removeLoading from "./utils/removeLoading.js";
import clampCodeBlocks from "./utils/clampCodeBlocks.js";
import addPRsToDoc from "./utils/addPRsToDoc.js";

const vscode = acquireVsCodeApi();

const link = document.getElementsByClassName("create-docs");
const button = document.getElementsByClassName("run-watermelon");

let errorTimeout;
function sendMessage(message) {
  vscode.postMessage(message);
}
Sentry.init({
  dsn: "https://48cab31c3ca44781a5be625ec226b48a@o1207913.ingest.sentry.io/6341224",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
link[0].addEventListener("click", (event) => {
  sendMessage({ command: "create-docs" });
});
button[0].addEventListener("click", (event) => {
  sendMessage({ command: "run" });
});

$(document).ready(function () {


  window.addEventListener("message", (event) => {
    const message = event.data; // The JSON data our extension sent
    switch (message.command) {
      case "prs":
        removeLoading(errorTimeout);
        addPRsToDoc(message.data, event.data.explanation);
        hljs.highlightAll();
        clampCodeBlocks();
        break;
      case "loading":
        setLoading(errorTimeout);
        break;
      case "error":
        setReceivedError(message.error.errorText, errorTimeout);
        break;
      case "author":
        authorName = message.author;
        break;
    }
  });
});
