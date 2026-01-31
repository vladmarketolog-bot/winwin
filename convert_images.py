import os
from PIL import Image

files = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "corp1.png",
    "corp2.jpg",
    "Gemini_Generated_Image_xx1pkmxx1pkmxx1p.png"
]

def convert_to_webp(filename):
    try:
        base = os.path.splitext(filename)[0]
        output_path = base + ".webp"
        
        if not os.path.exists(filename):
            print(f"Error: {filename} not found.")
            return

        with Image.open(filename) as img:
            img.save(output_path, "WEBP", quality=85)
            print(f"Converted {filename} -> {output_path}")
    except Exception as e:
        print(f"Failed to convert {filename}: {e}")

if __name__ == "__main__":
    print("Starting conversion...")
    for f in files:
        convert_to_webp(f)
    print("Done.")
