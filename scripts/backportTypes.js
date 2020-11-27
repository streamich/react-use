const fs = require("fs");
const path = require("path");
const glob = require("glob");
const mkdirp = require("mkdirp");

const VERSION_DIRNAME = "ts4.1";
const DEST_DIRS = "esm|lib";

glob(`./+(${DEST_DIRS})/**/*.d.ts`, (err, files) => {
  if (err) {
    throw err;
  }
  Promise.all(files.map(filePath => copyFile(filePath, path.resolve(VERSION_DIRNAME, filePath)))).then(result => {
    console.log(`Successfuly copied ${result.length} files to ${VERSION_DIRNAME}.`);

    console.log("Patching original useGeolocation.d.ts files.");
    glob(`./+(${DEST_DIRS})/useGeolocation.d.ts`, (err, files) => {
      if (err) {
        throw err;
      }
      return Promise.all(
        files.map(
          filePath =>
            new Promise((resolve, reject) => {
              fs.readFile(filePath, (err, content) => {
                if (err) {
                  reject(err);
                } else {
                  const contentString = `${content}`;
                  console.log(`Patching ${filePath} to be compatible with TypeScript < 4.0`);

                  const newContent = contentString.replace("GeolocationPositionError", "PositionError");

                  fs.writeFile(filePath, newContent, err => {
                    if (err) {
                      reject(err);
                    } else {
                      console.log(`Sucessfully patched ${filePath}`);
                      resolve(filePath);
                    }
                  });
                }
              });
            })
        )
      );
    });
  });
});

/**
 * Safely copies a file from filePath to dest.
 */

async function copyFile(filePath, dest) {
  await mkdirp(path.dirname(dest));
  return new Promise((resolve, reject) =>
    fs.copyFile(filePath, dest, err => {
      if (err) {
        reject(err);
      } else {
        resolve(dest);
      }
    })
  );
}
