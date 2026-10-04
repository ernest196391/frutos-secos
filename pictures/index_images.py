#!/usr/bin/env python3
"""Index source photos and suggest duplicates; never merge products automatically."""
import argparse, hashlib, json
from pathlib import Path
from PIL import Image, ImageOps

def index(directory, threshold=5):
    records=[]
    for path in sorted(Path(directory).rglob('*')):
        if not path.is_file() or path.suffix.lower() not in {'.jpg','.jpeg','.png','.webp'}: continue
        with Image.open(path) as original:
            im=ImageOps.exif_transpose(original).convert('L').resize((9,8))
            pixels=list(im.getdata()); bits=[pixels[y*9+x]>pixels[y*9+x+1] for y in range(8) for x in range(8)]
            dhash=sum(int(bit)<<i for i,bit in enumerate(bits))
            records.append({'file':str(path),'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'dhash':f'{dhash:016x}','dimensions':list(original.size)})
    suggestions=[]
    for i,a in enumerate(records):
        for b in records[i+1:]:
            distance=(int(a['dhash'],16)^int(b['dhash'],16)).bit_count()
            if a['sha256']==b['sha256'] or distance<=threshold:
                suggestions.append({'a':a['file'],'b':b['file'],'exact':a['sha256']==b['sha256'],'distance':distance,'status':'needs-review'})
    return {'images':records,'duplicateSuggestions':suggestions}

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('directory');parser.add_argument('--output',required=True);parser.add_argument('--threshold',type=int,default=5);args=parser.parse_args()
    Path(args.output).write_text(json.dumps(index(args.directory,args.threshold),ensure_ascii=False,indent=2),encoding='utf-8')
