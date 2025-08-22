# Web Digital Twin

Sitio estático para presentar un proyecto de gemelo digital (digital twin).

## Estructura

```
web_digital_twin/
  index.html
  styles.css
  script.js
```

## Ejecutar en local (opcional)

```powershell
cd web_digital_twin
python -m http.server 8000
```
Visita `http://localhost:8000`.

---

## Publicar en GitHub Pages

Tienes dos opciones. La más simple es usar la carpeta `docs/`. La más flexible es usar un flujo de GitHub Actions para publicar directamente la carpeta `web_digital_twin/` en la rama `gh-pages`.

### Opción A) Usar carpeta docs/

1) Crea una carpeta `docs/` en la raíz del repo y copia dentro el contenido de `web_digital_twin/`:
   ```powershell
   mkdir docs
   robocopy web_digital_twin docs /E
   ```
   En macOS/Linux:
   ```bash
   mkdir -p docs
   cp -R web_digital_twin/* docs/
   ```

2) Haz commit y push a `main`:
   ```bash
   git add docs
   git commit -m "Publicar sitio en docs/ para GitHub Pages"
   git push
   ```

3) En GitHub → Settings → Pages:
   - Source: Deploy from a branch
   - Branch: `main` y carpeta `/docs`

4) La URL será `https://<tu_usuario>.github.io/<tu_repo>/`.

Notas:
- Las rutas son relativas (e.g. `styles.css`), por lo que funcionan en Pages sin cambios.
- Cuando actualices la web, vuelve a copiar a `docs/` y haz commit.

### Opción B) Usar GitHub Actions (gh-pages) desde `web_digital_twin/`

1) Habilita GitHub Pages con "GitHub Actions" como fuente (Settings → Pages → Build and deployment → Source: GitHub Actions).

2) Crea el workflow `.github/workflows/deploy.yml` con este contenido:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
  workflow_dispatch: {}

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Upload artifact (site)
        uses: actions/upload-pages-artifact@v3
        with:
          path: web_digital_twin

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3) Haz commit y push. Al finalizar, el job mostrará la URL de Pages.

Notas:
- Edita `path: web_digital_twin` si cambias la ubicación del sitio.
- Este flujo no necesita build; sirve archivos estáticos tal cual.
