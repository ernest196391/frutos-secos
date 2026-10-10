"""Apply visually reviewed provisional images, keeping prices and source photos."""
import json
import sys
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
catalog_file = root / 'lib/catalog.js'
products = json.loads(catalog_file.read_text().split('export const products=', 1)[1].strip().rstrip(';'))
batch = json.loads(Path(sys.argv[1]).read_text())
audit = root / 'docs/image-audit-2026-10-10'
completed = json.loads((audit / 'completed.json').read_text())
summary = json.loads((audit / 'summary.json').read_text())
taxonomy_file = root / 'lib/catalog-taxonomy.json'
taxonomy = json.loads(taxonomy_file.read_text())
by_key = {p['sharedProductId']: p for p in products}
for item in batch:
    p = by_key[item['key']]
    previous = p['img']
    target = '/products/generated/' + item['key'] + '-20261010.webp'
    Image.open(item['path']).convert('RGB').resize((1024, 1024), Image.Resampling.LANCZOS).save(root / 'public' / target.lstrip('/'), 'WEBP', quality=90)
    if item.get('name') and item['name'] != p['n']:
        summary['nameCorrections'].append({'key': item['key'], 'before': p['n'], 'after': item['name'], 'priceCUP': p['p'], 'evidence': item.get('evidence', p['sourceImage'])})
        p['n'] = item['name']
    if item.get('description'):
        p['d'] = item['description']
    if item.get('subcategory'):
        taxonomy[item['key']] = item['subcategory']
    p.update(img=target, imageKind='generated', provisional=True, imageReviewStatus='visual-reviewed-provisional', imageAuditBatch=item.get('batch', '2026-10-10'))
    completed = [x for x in completed if x['sharedProductId'] != item['key']]
    completed.append({'sharedProductId': item['key'], 'name': p['n'], 'sourceImage': p['sourceImage'], 'previousImage': previous, 'newImage': target, 'priceCUP': p['p'], 'review': 'Brand and variant visually reviewed; provisional reconstruction; original retained.', 'prompt': item.get('prompt', 'Individual white-background product image.')})
output = '// Catálogo de tienda. Precios pendientes requieren consulta.\nexport const products=' + json.dumps(products, ensure_ascii=False, indent=2) + ';\n'
catalog_file.write_text(output)
(root / 'supabase/functions/colo-orders/catalog.js').write_text(output)
taxonomy_file.write_text(json.dumps(taxonomy, ensure_ascii=False, indent=2) + '\n')
queue = [p for p in products if p.get('imageKind') == 'store-photo']
summary.update(newIndividualImages=len(completed), individualImagesNow=len(products)-len(queue), remainingStorePhotos=len(queue))
for filename, data in [('completed.json', completed), ('queue.json', queue), ('summary.json', summary)]:
    (audit / filename).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'applied': len(batch), 'completed': len(completed), 'remaining': len(queue)}))
