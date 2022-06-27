const fs = require("fs");
const path = require("path");
const os = require("os");
const { question } = require("readline-sync");

function* readdir(d) {
  for (const dirent of fs.readdirSync(d, { withFileTypes: true })) {
    if (["layout.json", "manifest.json"].includes(dirent.name)) {
      continue;
    }
    const resolved = path.join(d, dirent.name);
    if (dirent.isDirectory()) {
      yield* readdir(resolved);
    } else {
      yield resolved;
    }
  }
}

const MS_FILETIME_EPOCH = 116444736000000000n;
const panel = path.resolve(__dirname, "../navigraph-ingamepanels-demo");

const contentEntries = [];
let totalPackageSize = 0;

for (const filename of readdir(panel)) {
  const stat = fs.statSync(filename, { bigint: true });
  if (!path.relative(panel, filename).startsWith("Build")) {
    contentEntries.push({
      path:
        String(os.platform) === "win32"
          ? path.relative(panel, filename).toString().replace(/\\/g, "/")
          : path.relative(panel, filename),
      size: Number(stat.size),
      date: Number(stat.mtimeNs / 100n + MS_FILETIME_EPOCH),
    });
    totalPackageSize += Number(stat.size);
  }
}

let version = "";

while (!version) {
  const inputVersion = question("Please specify package version ( x.x.x ): ");

  if (inputVersion.match(/^\d\.\d\.\d$/g)) {
    version = inputVersion;
  } else {
    console.error("Invalid version number. Please use the correct format.");
  }
}

fs.writeFileSync(
  path.join(panel, "layout.json"),
  JSON.stringify(
    {
      content: contentEntries,
    },
    null,
    2
  )
);

fs.writeFileSync(
  path.join(panel, "manifest.json"),
  JSON.stringify(
    {
      ...require("../manifest-base.json"),
      title: "Navigraph Demo Panel " + version,
      package_version: version,
      total_package_size: totalPackageSize.toString().padStart(20, "0"),
    },
    null,
    2
  )
);
