from PIL import Image
import os
import re

def resize_and_convert_images():
    current_dir = os.getcwd()
    # 更新支持的图片格式，包含webp
    image_extensions = ('.jpg', '.jpeg', '.png', '.webp', '.bmp', '.gif')
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
                # 检查是否已经是目标尺寸和格式
                original_width, original_height = img.size
                ratio = target_width / original_width
                new_height = int(original_height * ratio)

                # 如果已经是webp格式且宽度为800，则跳过
                if (filename.lower().endswith('.webp') and
                    original_width == target_width and
                    os.path.splitext(filename)[0].isdigit()):
                    # 如果文件名已经是数字.webp格式，则重命名序号
                    if int(os.path.splitext(filename)[0]) != i:
                        new_filename = f"{i}.webp"
                        new_filepath = os.path.join(current_dir, new_filename)
                        os.rename(img_path, new_filepath)
                        print(f'已重命名 {filename} -> {new_filename}')
                    else:
                        print(f'跳过 {filename} (已符合要求)')
                    continue

                # 转换为RGB模式（去除透明度信息，因为webp支持RGB）
                if img.mode in ('RGBA', 'LA', 'P'):
                    # 创建白色背景
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    if img.mode == 'P':
                        img = img.convert('RGBA')
                    background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
                    img = background
                elif img.mode != 'RGB':
                    img = img.convert('RGB')

                # 调整尺寸
                resized_img = img.resize((target_width, new_height), Image.Resampling.LANCZOS)

                # 保存为webp格式，覆盖原文件（重命名为.webp格式）
                name_without_ext = os.path.splitext(filename)[0]
                new_filename = f"{i}.webp" if not name_without_ext.isdigit() else f"{name_without_ext}.webp"
                new_filepath = os.path.join(current_dir, new_filename)

                # 保存为webp格式，质量90
                resized_img.save(new_filepath, 'webp', quality=90, method=6)

                print(f'已处理 {filename}: {original_width}x{original_height} -> {target_width}x{new_height} (webp)')

                # 删除原文件（除非原文件就是目标webp文件）
                if filename != new_filename:
                    os.remove(img_path)

        except Exception as e:
            print(f'处理 {filename} 时出错: {e}')

if __name__ == "__main__":
    resize_and_convert_images()
