const fs = require("fs");
const path = require("path");

const FOLDER = "./assets";

let allfiles = fs.readdirSync(FOLDER);

let count = 1;

for (let file = 1; file <= allfiles.length / 2; file++) {
  let metafile = path.resolve(`./assets/${file - 1}.json`);
  let metades = path.resolve(`./meta/${file}.json`);
  // console.log(metades);
  fs.rename(metafile, metades, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("File Renamed.");
  });

  let imgfile = path.resolve(`./assets/${file - 1}.png`);
  let imgdes = path.resolve(`./img/${file}.png`);
  // console.log(metades);
  fs.rename(imgfile, imgdes, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("File Renamed.");
  });
}

// for (let aI in genderfiles) {
//     let raceFiles = fs.readdirSync(FOLDER + "/" + genderfiles[aI]);
//     // console.log(raceFiles);
//     for (let rcI in raceFiles) {
//         const metafilePath = `${FOLDER}/${genderfiles[aI]}/${raceFiles[rcI]}/metadata`;
//         // console.log(jfilePath);
//         const jfiles = fs.readdirSync(
//             `${FOLDER}/${genderfiles[aI]}/${raceFiles[rcI]}/metadata`
//         );

//         for (let metaIndex in jfiles) {
//             let fileidex = +metaIndex + 1;

//             const imgpath = path.resolve(
//                 `${FOLDER}/${genderfiles[aI]}/${raceFiles[rcI]}/images`,
//                 `${fileidex}.png`
//             );

//             const imgdespath = path.resolve(`./b`, `${count}.png`);

//             const jsonPath = path.resolve(metafilePath, `${fileidex}.json`);

//             const jsondespath = path.resolve("./b", `${count}.json`);
//             const metadataFile = fs.readFileSync(jsonPath);
//             let jsonfile = JSON.parse(metadataFile);
//             jsonfile.name = `CB GEN Z #${count}`;
//             jsonfile.description = `Cryptobengz GEN Z is the Grand Collection by Team Cryptobengz and the final edition to this local brand. Our collection includes utility-enabled collectibles that depict a variety of local Singaporean culture-inspired traits as seen through the team's eyes. Members of the Cryptobengz Genesis, Cryptokakis and Cryptobengz GEN Z will have access to exclusive airdrops, merchandise drops, merchant partnerships, and community events.

//             Our foundation is built on community and utility. Each Cryptobengz NFT unlocks access to the Cryptobengz Business-Utility Eco-system.

//             A home to call your own. Where you can relive your Ahbeng lifestyle through us again and again.

//             Stay Real, Stay Huat

//             For more information, visit Cryptobengz.xyz`;
//             jsonfile.collection = {
//                 name: "CryptoBengz",
//                 family: "GEN Z",
//             };

//             count++;
//             let data = JSON.stringify(jsonfile);
//             fs.writeFileSync(jsondespath, data);
//             // console.log(files[index])

//             console.log(data);

//             fs.rename(imgpath, imgdespath, function (err) {
//                 if (err) {
//                     console.log(err);
//                 }
//                 console.log("File Renamed.");
//             });
//         }
//     }
// }

// for (let index in files) {
//     const artistMetaDataFolderPath = `${FOLDER}/${files[index]}/metadata`;
//     const artistImageFolderPath = `${FOLDER}/${files[index]}/images`;

//     const artistMetaDataFolder = fs.readdirSync(artistMetaDataFolderPath);

//     for (let metaIndex in artistMetaDataFolder) {
//         // const jsonPath = artistMetaDataFolderPath+"/"+metaIndex+".json";
//         const jsonPath = path.resolve(
//             artistMetaDataFolderPath,
//             `${metaIndex}.json`
//         );
//         const jsondespath = path.resolve("../asset", `${count}.json`);

//         const imgPath = path.resolve(artistImageFolderPath, `${metaIndex}.png`);
//         const imgdespath = path.resolve("../asset", `${count}.png`);

//         const metadataFile = fs.readFileSync(jsonPath);
//         let jsonfile = JSON.parse(metadataFile);
//         let namearray = jsonfile.image.split(".");
//         namearray[0] = count;
//         let name = namearray.join(".");

//         // console.log(imgPath);
//         // console.log(jsonfile.properties.files[0].uri)
//         jsonfile.properties.files[0].uri = `${count}.png`;

//         jsonfile.image = name;

//         // console.log(jsonfile.image)
//         let data = JSON.stringify(jsonfile);
//         fs.writeFileSync(jsondespath, data);
//         // console.log(files[index])

//         console.log(data);

//         fs.rename(imgPath, imgdespath, function (err) {
//             if (err) {
//                 console.log(err);
//             }
//             console.log("File Renamed.");
//         });

//         count++;
//     }
// }

// let jsons = files.filter((e) => e.endsWith(".json"));
// for (let json of jsons) {
//   let jsonPath = `${FOLDER}/${json}`;
//   let metadata = JSON.parse(fs.readFileSync(jsonPath));

//   delete metadata.creators;
//   delete metadata.collection;
//   delete metadata.seller_fee_basis_points;
//   metadata.properties = {
//     files: [
//       {
//         uri: json.replace(".json", ".png"),
//         type: "image/png",
//       },
//     ],
//     category: "image",
//   };
//   metadata.external_url =
//     "https://sentosa.com.sg/discovery-neverending-nft-license-agreement";

//   fs.writeFileSync(jsonPath, JSON.stringify(metadata, null, 4));
// }
