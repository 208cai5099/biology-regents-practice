import json
from pathlib import Path

filepath = Path(__file__).resolve()
json_filenames = [file.name for file in filepath.parent.iterdir() if file.is_file() and file.name.endswith(".json")]

combined_json = {}
for filename in json_filenames:
    with open(filename, "r") as file:
        exam_json = json.load(file)
        exam_name = filename.replace("_transcript.json", "")
        combined_json[exam_name] = exam_json

output_filename = "./all_exam_transcript.json"
with open(output_filename, "w") as file:
    json.dump(combined_json, file, indent=4)