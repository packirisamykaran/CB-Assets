import json
import os

METADATA_FOLDER = "/Users/jon/Documents/school/projects/nfts/CB-Assets/Final3/output_metadata"
BASE_URI = "https://storage.googleapis.com/4c5e1f6d-931e-4ac5-88a9-5701c37b06ed-cb-final/output_img/"

for file in os.listdir(METADATA_FOLDER):
    if file.endswith(".json"):
        tokenId = file.split(".")[0]
        with open(os.path.join(METADATA_FOLDER, file), "r") as f:
          data = json.load(f)

        data["image"] = BASE_URI + tokenId + ".png"
        with open(os.path.join(METADATA_FOLDER, file), "w") as f:
          json.dump(data, f)