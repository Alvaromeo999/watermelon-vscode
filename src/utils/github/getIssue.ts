import axios from "axios";
import { backendURL } from "../../constants";
import analyticsReporter from "../vscode/reporter";

export default async function getIssueComments({
  email,
  owner,
  repo,
  issueNumber,
}: {
  email: string;
  owner: string;
  repo: string;
  issueNumber: number;
}) {
  const issue = await axios
    .post(`${backendURL}/api/github/getIssue`, {
      user: email,
      repo,
      owner,
      issue_number:issueNumber
    })
    .then((res) => res.data)
    .catch((err) => {
      let reporter = analyticsReporter();
      let { message } = err;
      reporter?.sendTelemetryException(err, { error: message });
    });
    return issue;
}
