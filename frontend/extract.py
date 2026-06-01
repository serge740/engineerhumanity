import zipfile
import xml.etree.ElementTree as ET

def extract_text_from_docx(docx_path):
    try:
        with zipfile.ZipFile(docx_path, 'r') as z:
            xml_content = z.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            # The namespace for Word XML
            ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            text = []
            for paragraph in tree.findall('.//w:p', ns):
                para_text = "".join([node.text for node in paragraph.findall('.//w:t', ns) if node.text])
                if para_text:
                    text.append(para_text)
            return "\n".join(text)
    except Exception as e:
        return str(e)

content = extract_text_from_docx(r"d:\project\JOB\engineer4Humanity\frontend\Board Member Bio.docx")
with open("extract.txt", "w", encoding="utf-8") as f:
    f.write(content)
