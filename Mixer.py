import os
import json
import logging
import shutil
import random
import settings

# create logger
logger = logging.getLogger('CB_mixer')
logger.setLevel(logging.DEBUG)

# create console handler and set level to debug
ch = logging.StreamHandler()
ch.setLevel(logging.ERROR)

# create formatter
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# add formatter to ch
ch.setFormatter(formatter)

# add ch to logger
logger.addHandler(ch)


class Token:
    def __init__(self, image_path: str, json_path: str):
        self.current_image_path = image_path
        self.current_json_path = json_path
        self.current_metadata = self._get_current_metadata()
        self.current_token_id = self._get_token_id()
        self.new_image_path = ""
        self.new_json_path = ""
        self.new_token_id = None


    def verify_token_id(self):
        """
        handles normal verification, if exception thrown handle legendary verification
        Verify 4 things in a token id:
        1. image_file name
        2. json file name
        3. metadata name attr #id if not legendary
        4. metadata image attr
        """
        try:
          assert os.path.basename(self.new_image_path).split(".")[0] == os.path.basename(self.new_json_path).split(".")[0]

          with open(self.new_json_path, 'r') as f:
              metadata = json.load(f)
              assert os.path.basename(self.new_image_path).split(".")[0] == metadata["name"].split("#")[1]
              assert metadata["image"] == Mixer.IMAGE_BASE_URI + f"{self.new_token_id}.png"
              assert self.new_token_id == int(os.path.basename(self.new_image_path).split(".")[0])
              return True

        except AssertionError as e:
            logger.error(f"Error: {e}, token id mismatch")
            return False

        except Exception as e:
            logger.info(f"Legendary token found: {self.new_image_path}, Error: {e}")
            return self._verify_legendary_token_id()

    def _verify_legendary_token_id(self):
        """
        verify 3 things in a legendary token id:
        1. image_file name
        2. json file name
        3. metadata image attr
        """
        try:
            assert os.path.basename(self.new_image_path).split(".")[0] == os.path.basename(self.new_json_path).split(".")[0]

            with open(self.new_json_path, 'r') as f:
                metadata = json.load(f)
                assert metadata["image"] == Mixer.IMAGE_BASE_URI + f"{self.new_token_id}.png"
                assert self.new_token_id == int(os.path.basename(self.new_image_path).split(".")[0])

                return True

        except AssertionError as e:
            logger.error(f"Error: {e}, token id mismatch")
            return False

        except Exception as e:
            logger.error(f"Error: {e}")
            return False



    def _get_current_metadata(self):
        with open(self.current_json_path, 'r') as f:
            return json.load(f)

    def _get_token_id(self):
        try:
            # validate that the image filename token id, json filename token id, and metadata token id are the same
            image_filename_token_id = int(os.path.basename(self.current_image_path).split(".")[0]) # throws value error if legendary
            metadata_token_id = int(self.current_metadata.get("name").split("#")[1]) # throws index error if legendary
            json_filename_token_id = int(os.path.basename(self.current_json_path).split(".")[0]) # throws value error if legendary

            assert image_filename_token_id == json_filename_token_id == metadata_token_id

            return image_filename_token_id

        except AssertionError as e:
            logger.error(f"Error: {e}, token id mismatch")
            return

        except Exception as e:
            logger.info(f"Legendary token found: {self.current_image_path}, Error: {e}")
            return None


    def set_new_token_id(self, new_token_id):
        """
        when called by main program, this method should update all the metadata and image files with the new token id
        including the json file name, the image file name, metadata name attr, metadata image attr
        """
        self.new_token_id = new_token_id

        # copy image file from src to dest
        new_image_path = os.path.join(Mixer.OUTPUT_IMAGE_PATH, f"{new_token_id}.png")
        self.new_image_path = new_image_path
        shutil.copy(self.current_image_path, new_image_path)

        # copy json file from src to dest
        new_json_path = os.path.join(Mixer.OUTPUT_JSON_PATH, f"{new_token_id}.json")
        self.new_json_path = new_json_path
        shutil.copy(self.current_json_path, new_json_path)

        # extract old name and image values from old json
        with open(self.current_json_path, 'r') as f:
            metadata = json.load(f)
            token_name = metadata["name"]
            token_image = metadata["image"]

        # handle token name change and token image change
        try:
            # cause an error if the token is a legendary
            token_name.split("#")[1]

            token_name = token_name.split("#")[0] + f"#{new_token_id}"
            token_image = Mixer.IMAGE_BASE_URI + str(new_token_id) + ".png"

            with open(self.new_json_path, 'w+') as f:
                metadata["name"] = token_name
                metadata["image"] = token_image
                json.dump(metadata, f)

        except Exception as e:
            """For legendary only te image file name should have id.png and metadata should have extra key value pair of id"""
            logger.info(f"Error: {e}, handle legendary token id change")
            self._handle_legendary_token_id_change()
            return


    def _handle_legendary_token_id_change(self):
        """
        For legendary only the image file name and json filename should have id.png / id.json and metadata should have extra key value pair of id.
        The image attr should point to id.png uri
        """
        os.replace(self.new_image_path, os.path.join(Mixer.OUTPUT_IMAGE_PATH, f"{self.new_token_id}.png"))
        with open(self.new_json_path, 'r+') as f:
            metadata = json.load(f)
            metadata["id"] = self.new_token_id
            metadata["image"] = Mixer.IMAGE_BASE_URI + f"{self.new_token_id}.png"

        with open(self.new_json_path, 'w+') as f:
            json.dump(metadata, f)





class Mixer:

    """CONFIGS"""
    IMAGE_PATH = settings.IMAGE_PATH
    JSON_PATH = settings.JSON_PATH
    OUTPUT_IMAGE_PATH = settings.OUTPUT_IMAGE_PATH
    OUTPUT_JSON_PATH = settings.OUTPUT_JSON_PATH
    IMAGE_BASE_URI = settings.IMAGE_BASE_URI

    def __init__(self, num_of_tokens=3888):
        self.random_token_ids = self._get_random_token_ids(num_of_tokens)


    def _get_random_token_ids(self, num_of_tokens):
        x = [i for i in range(1, num_of_tokens + 1)]
        random.shuffle(x)

        return x

    def load(self, path: str):
        with open(path, "r+") as f:
            data = json.load(f)
            self.data = data
        return data

    def save(self, data: dict, path: str):
        with open(path, "w+") as f:
            json.dump(data, f)

    def mix(self):
        image_files = os.listdir(Mixer.IMAGE_PATH)

        for file in image_files:
            image_path = os.path.join(Mixer.IMAGE_PATH, file)
            json_path = os.path.join(Mixer.JSON_PATH, file.split(".")[0] + ".json")

            token = Token(image_path, json_path)
            token.set_new_token_id(self.random_token_ids.pop())

            if token.verify_token_id():
                logger.info(f"Token id verified: {token.new_token_id}")
            else:
                logger.error(f"Token id mismatch: {token.new_token_id}")

mixer = Mixer(num_of_tokens=settings.NUM_OF_TOKENS)
mixer.mix()


