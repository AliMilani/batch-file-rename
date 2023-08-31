const fs = require("node:fs/promises");
const input = require("input");

const main = async () => {
    const findStr = await input.text("Enter the string you want to find: ");
    const replaceStr = await input.text("Enter the string you want to replace: ");
    const dist =
        (await input.text("Enter the dist folder name (default: dist): ")) || "dist";

    console.time("done: ");
    const allFiles = await fs.readdir("./", {});
    allFiles.forEach(async (fileName) => {
        if (fileName.includes(findStr)) {
            console.log(
                `found: "${fileName} => ${dist}/${fileName.replace(
                    findStr,
                    replaceStr
                )}"`
            );
            const newFileName = fileName.replace(findStr, replaceStr);
            await fs.cp(fileName, `./${dist}/${newFileName}`, {
                recursive: true,
            });
        }
    });
    console.timeEnd("done: ");
};

main().catch((err) => {
    console.log(err);
    process.exit(1);
});
