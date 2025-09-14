from PIL import Image
import os
import re

def resize_images():
    current_dir = os.getcwd()
    image_extensions = ('.jpg', '.jpeg', '.png', '.bmp', '.gif')
    image_files = [f for f in os.listdir(current_dir) if f.lower().endswith(image_extensions)]

    def extract_number(name):
        match = re.search(r'\d+', name)
        return int(match.group()) if match else float('inf')

    image_files.sort(key=extract_number)

    target_width = 800

    for filename in image_files:
        try:
            # 打开图片
            img_path = os.path.join(current_dir, filename)
            with Image.open(img_path) as img:
                # 计算新尺寸，保持等比
                original_width, original_height = img.size
                ratio = target_width / original_width
                new_height = int(original_height * ratio)

                # 调整尺寸
                resized_img = img.resize((target_width, new_height), Image.Resampling.LANCZOS)

                # 保存图片（覆盖原图或保存为新文件）
                resized_img.save(img_path)
                print(f'已调整 {filename} 尺寸: {original_width}x{original_height} -> {target_width}x{new_height}')

        except Exception as e:
            print(f'处理 {filename} 时出错: {e}')

if __name__ == "__main__":
    resize_images()
