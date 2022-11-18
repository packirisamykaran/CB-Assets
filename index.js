const fs = require("fs");
const path = require("path");
const FOLDER = "Assets/img";

let files = fs.readdirSync(FOLDER);

let count = 1;

for (let file in files) {
    let filename = files[file].split(".")[0];

    let jsonfile = JSON.parse(
        fs.readFileSync(`Assets/metadata/${filename}.json`)
    );
    jsonfile.name = "CB GEN Z #" + count;
    jsonfile.description =
        "Cryptobengz GEN Z is the Grand Collection by Team Cryptobengz and the final edition of this local brand. Our collection includes utility-enabled collectibles that depict a variety of local Singaporean culture-inspired traits as seen through the team's eyes. Members of the Cryptobengz Genesis, Cryptobengz GEN Z and Cryptokakis will have access to exclusive airdrops, merchandise drops, merchant partnerships, and community events.  Our foundation is built on comm qunity and utility. Each Cryptobengz NFT unlocks access to the Cryptobengz Business-Utility Eco-system.    A home to call your own. Where you can relive your Ahbeng lifestyle through us again and again. Stay Real, Stay Huat    For more information, visit Cryptobengz.xyz";
    jsonfile["external_url"] = "https://cryptobengz.xyz/";
    jsonfile.image = `https://ipfs.io/ipfs/bafybeidzakk2ilebrll5ducp46chark7jpqyngwx7n45xght5a7kquekki/${count}.png`;
    // console.log(jsonfile);

    delete jsonfile.creators;
    delete jsonfile.collection;
    delete jsonfile.symbol;
    delete jsonfile.seller_fee_basis_points;

    console.log(jsonfile);

    fs.writeFile(
        "./Final2/metadata/" + count + ".json",
        JSON.stringify(jsonfile),
        function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }
    );

    const imagepath = "Assets/img/" + filename + ".png";
    const imgdespath = "Final2/img/" + count + ".png";

    fs.copyFile(imagepath, imgdespath, (error) => {
        if (error) {
            throw error;
        } else {
            console.log("File has been moved to another folder.");
        }
    });

    count++;
}

// for (let a in files) {
//     let imgfilepath = FOLDER + "/" + files[a] + "/images";
//     let metafilepath = FOLDER + "/" + files[a] + "/metadata";

//     let imagefiles = fs.readdirSync(imgfilepath);

//     for (let file in imagefiles) {
//         let filename = imagefiles[file];
//         let fileindex = filename.split(".")[0];

//         let imgpath = imgfilepath + "/" + fileindex + ".png";
//         let jsonpath = metafilepath + "/" + fileindex + ".json";

//         const imgdespath = path.resolve("./Assets", `${count}.png`);

//         fs.rename(imgpath, imgdespath, function (err) {
//             if (err) {
//                 console.log(err);
//             }
//             console.log("image Renamed." + count);
//         });
//         const jsondesPath = path.resolve("./Assets", `${count}.json`);

//         fs.rename(jsonpath, jsondesPath, function (err) {
//             if (err) {
//                 console.log(err);
//             }
//             console.log("json Renamed." + count);
//         });

//         count++;
//     }
// }

// console.log(raceFiles);
// for (let rcI in raceFiles) {
//     const metafilePath = `${FOLDER}/${genderfiles[aI]}/${raceFiles[rcI]}/metadata`;
//     // console.log(jfilePath);
//     const jfiles = fs.readdirSync(
//         `${FOLDER}/${genderfiles[aI]}/${raceFiles[rcI]}/metadata`
//     );

//     for (let metaIndex in jfiles) {
//         let fileidex = +metaIndex + 1;

//         const imgpath = path.resolve(
//             `${FOLDER}/${genderfiles[aI]}/${raceFiles[rcI]}/images`,
//             `${fileidex}.png`
//         );

//         const imgdespath = path.resolve(`./b`, `${count}.png`);

//         const jsonPath = path.resolve(metafilePath, `${fileidex}.json`);

//         const jsondespath = path.resolve("./b", `${count}.json`);
//         const metadataFile = fs.readFileSync(jsonPath);
//         let jsonfile = JSON.parse(metadataFile);
//         jsonfile.name = `CB GEN Z #${count}`;
//         jsonfile.description = `Cryptobengz GEN Z is the Grand Collection by Team Cryptobengz and the final edition to this local brand. Our collection includes utility-enabled collectibles that depict a variety of local Singaporean culture-inspired traits as seen through the team's eyes. Members of the Cryptobengz Genesis, Cryptokakis and Cryptobengz GEN Z will have access to exclusive airdrops, merchandise drops, merchant partnerships, and community events.

//         Our foundation is built on community and utility. Each Cryptobengz NFT unlocks access to the Cryptobengz Business-Utility Eco-system.

//         A home to call your own. Where you can relive your Ahbeng lifestyle through us again and again.

//         Stay Real, Stay Huat

//         For more information, visit Cryptobengz.xyz`;
//         jsonfile.collection = {
//             name: "CryptoBengz",
//             family: "GEN Z",
//         };

//         count++;
//         let data = JSON.stringify(jsonfile);
//         fs.writeFileSync(jsondespath, data);
//         // console.log(files[index])

//         console.log(data);

//         fs.rename(imgpath, imgdespath, function (err) {
//             if (err) {
//                 console.log(err);
//             }
//             console.log("File Renamed.");
//         });
//     }
// }
