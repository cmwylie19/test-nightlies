const fs = require("fs");

const updateJSONFile = (filePath, updater) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(data);

    updater(json);

    fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n", "utf-8");
    console.log(`Updated ${filePath}`);
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error);
    process.exit(1);
  }
};

const updatePackageJSON = (version) => {
  updateJSONFile("./package.json", (json) => {
    json.version = version;
  });
};

const updatePackageLockJSON = (version) => {
  updateJSONFile("./package-lock.json", (json) => {
    json.version = version;
    if (json.packages && json.packages[""]) {
      json.packages[""].version = version;
    }
  });
};

const main = () => {
  const [, , version] = process.argv;

  if (!version) {
    console.error("Usage: node set-version.js <new-version>");
    process.exit(1);
  }

  console.log(`Updating version to ${version}...`);

  updatePackageJSON(version);
  updatePackageLockJSON(version);

  console.log("Version update complete!");
};

main();
