from PIL import Image
import os
import re

def resize_and_convert_images():
    current_dir = os.getcwd()
    # 创建new文件夹用于存放处理后的图片
    new_dir = os.path.join(current_dir, 'new')
    if not os.path.exists(new_dir):
        os.makedirs(new_dir)

    image_extensions = ('.jpg', '.jpeg', '.png', '.bmp', '.gif', 'webp')
    image_files = [f for f in os.listdir(current_dir) if f.lower().endswith(image_extensions)]

    def extract_number(name):
        match = re.search(r'\d+', name)
        return int(match.group()) if match else float('inf')

    image_files.sort(key=extract_number)

    target_width = 800

    for i, filename in enumerate(image_files, start=1):
        try:
            # 打开图片
            img_path = os.path.join(current_dir, filename)
            with Image.open(img_path) as img:
                # 转换为RGB模式（去除透明度信息，因为webp不支持RGBA）
                if img.mode in ('RGBA', 'LA', 'P'):
                    # 创建白色背景
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    if img.mode == 'P':
                        img = img.convert('RGBA')
                    background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
                    img = background
                elif img.mode != 'RGB':
                    img = img.convert('RGB')

                # 计算新尺寸，保持等比
                original_width, original_height = img.size
                ratio = target_width / original_width
                new_height = int(original_height * ratio)

                # 调整尺寸
                resized_img = img.resize((target_width, new_height), Image.Resampling.LANCZOS)

                # 保存为webp格式到new文件夹
                new_filename = f"{i}.webp"
                new_filepath = os.path.join(new_dir, new_filename)

                # 保存为webp格式，质量90
                resized_img.save(new_filepath, 'webp', quality=90, method=6)

                print(f'已处理 {filename}: {original_width}x{original_height} -> {target_width}x{new_height} (webp)')

        except Exception as e:
            print(f'处理 {filename} 时出错: {e}')

if __name__ == "__main__":
    resize_and_convert_images()
