import os
import re


def rename_images():
    current_dir = os.getcwd()
    image_extensions = ('.jpg', '.jpeg', '.png', '.bmp', '.gif')
    image_files = [f for f in os.listdir(current_dir) if f.lower().endswith(image_extensions)]

    def extract_number(name):
        match = re.search(r'\d+', name)
        return int(match.group()) if match else float('inf')

    image_files.sort(key = extract_number)

    for i, filename in enumerate(image_files, start = 1):
        file_extension = os.path.splitext(filename)[1]
        new_name = os.path.join(current_dir, f'{i}{file_extension}')
        old_name = os.path.join(current_dir, filename)
        try:
            os.rename(old_name, new_name)
            print(f'已将 {old_name} 重命名为 {new_name}')
        except Exception as e:
            print(f'重命名 {old_name} 时出错: {e}')


if __name__ == "__main__":
    rename_images()
