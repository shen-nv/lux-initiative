function searchFile() {
  const inputRaw = document.getElementById("fileInput").value.trim();
  const input = inputRaw.toUpperCase();

  const fileMap = {
    "HL-0134-A": "logs/HL-0134-A.html",
    "HL-0882-F": "logs/HL-0882-F.html",
    "HL-0927-X": "logs/HL-0927-X.html",
    "HL-0934-E": "logs/HL-0934-E.html",
    "HL-0971-V": "logs/HL-0971-V.html",
    "HL-1088-S": "logs/HL-1088-S.html",
    "HL-1187-K": "logs/HL-1187-K.html",
    "WSY": "profiles/profile_wsy.html",
    "FRANCESCO": "profiles/profile_francesco.html",
    "LJY": "profiles/profile_ljy.html",
    "MMY": "profiles/profile_mmy.html",
    "WAL": "profiles/profile_wal.html"
  };

  const targetPath = fileMap[input];
  if (!targetPath) {
    // 跳转到 html 文件夹下的 404.html
    const htmlFolderName = "html";

    const currentPath = window.location.pathname;
    const parts = currentPath.split("/");
    const htmlIndex = parts.indexOf(htmlFolderName);

    if (htmlIndex === -1) {
      return;
    }

    const basePath = parts.slice(0, htmlIndex + 1).join("/") + "/";
    const to404 = basePath + "404.html";

    const relative404 = computeRelativePath(currentPath, to404);
    redirectTo(relative404);
    return;
  }

  const htmlFolderName = "html"; // 请根据实际情况修改

  const currentPath = window.location.pathname;
  const parts = currentPath.split("/");
  const htmlIndex = parts.indexOf(htmlFolderName);

  if (htmlIndex === -1) {
    return;
  }

  const basePath = parts.slice(0, htmlIndex + 1).join("/") + "/";
  const toPath = basePath + targetPath;

  const relativePath = computeRelativePath(currentPath, toPath);

  redirectTo(relativePath);
}

function computeRelativePath(fromPath, toPath) {
  const fromDirs = fromPath.split("/").slice(0, -1);
  const toDirs = toPath.split("/");

  let i = 0;
  while (i < fromDirs.length && i < toDirs.length && fromDirs[i] === toDirs[i]) {
    i++;
  }

  const upLevels = fromDirs.length - i;

  const relativeParts = [];
  for (let j = 0; j < upLevels; j++) {
    relativeParts.push("..");
  }

  relativeParts.push(...toDirs.slice(i));

  return relativeParts.join("/");
}

function redirectTo(path) {
  window.location.href = path;
}
