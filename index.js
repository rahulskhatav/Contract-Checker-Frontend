const { syncBuiltinESMExports } = require("module");

const exec = require("child_process").exec;
// import exec from "child_process";

let form = document.forms.namedItem("file-submit");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let file = e.target.uploadFile.files[0];

  let file_path = file.path;
  // replace spaces in the file paths with escape characters
  file_path = file_path.replaceAll(" ", "\\ ");

  // TODO: replace command to execute the smart contract cleaner
  // ./Ballot.sol -> {file_path}
  let command = `timeout 3600 solc ${file_path} --model-checker-engine bmc --model-checker-targets`;
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.log(`error: ${err.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }

    document.getElementById("output").innerHTML = stdout;
  });
});
