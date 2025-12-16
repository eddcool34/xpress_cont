# 🔧 SOLUCIONAR ERROR 404 EN GITHUB PAGES

## ❌ El Problema

Cuando intentas abrir el cotizador ves:
```
404 - File not found
```

**Causa:** El archivo `cotizador.html` está en la rama `claude/add-xpress-shipping-config-esqOl` pero GitHub Pages está buscando en la rama `main`.

---

## ✅ SOLUCIÓN RÁPIDA (2 Opciones)

---

## 🎯 OPCIÓN A: Configurar GitHub Pages para Usar la Rama Correcta

### Paso 1: Ve a Configuración de GitHub Pages

1. Abre tu navegador
2. Ve a: **https://github.com/eddcool34/xpress_cont**
3. Haz clic en **"Settings"** (Configuración) arriba
4. En el menú lateral izquierdo, haz clic en **"Pages"**

### Paso 2: Cambia la Rama

En la sección **"Source"**:

```
┌─────────────────────────────────────────────────┐
│ Source                                          │
│                                                 │
│ Branch: [main ▼]  [/ (root) ▼]  [Save]        │
│         └─ AQUÍ                                 │
└─────────────────────────────────────────────────┘
```

1. Haz clic en el dropdown que dice **"main"**
2. Selecciona: **`claude/add-xpress-shipping-config-esqOl`**
3. Deja la carpeta en: **`/ (root)`**
4. Haz clic en **"Save"**

### Paso 3: Espera 1-2 Minutos

GitHub Pages se está reconstruyendo. Espera un momento.

### Paso 4: Abre el Cotizador

Ahora ve a:
```
https://eddcool34.github.io/xpress_cont/cotizador.html
```

**¡Debería funcionar!** ✅

---

## 📝 OPCIÓN B: Crear Pull Request y Mergear a Main

Esta opción mueve el cotizador a la rama `main` permanentemente.

### Paso 1: Ir a Pull Requests

1. Ve a: **https://github.com/eddcool34/xpress_cont**
2. Haz clic en **"Pull requests"** (arriba)
3. Haz clic en **"New pull request"** (botón verde)

### Paso 2: Configurar el Pull Request

En la página de comparación:

```
base: main  ←  compare: claude/add-xpress-shipping-config-esqOl
```

1. **Base branch:** Asegúrate que sea `main`
2. **Compare branch:** Selecciona `claude/add-xpress-shipping-config-esqOl`
3. Haz clic en **"Create pull request"**

### Paso 3: Crear el PR

1. **Título:** "Agregar Cotizador Web con API de Skydropx"
2. **Descripción:** (opcional) Agrega una descripción
3. Haz clic en **"Create pull request"**

### Paso 4: Mergear el PR

1. En la página del PR, baja hasta el final
2. Haz clic en **"Merge pull request"** (botón verde)
3. Haz clic en **"Confirm merge"**

### Paso 5: Configurar GitHub Pages (si no está configurado)

1. Ve a **Settings** → **Pages**
2. Selecciona:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
3. Haz clic en **"Save"**

### Paso 6: Espera y Prueba

Espera 1-2 minutos y abre:
```
https://eddcool34.github.io/xpress_cont/cotizador.html
```

**¡Debería funcionar!** ✅

---

## 🚀 OPCIÓN RECOMENDADA

**Para ti:** Usa la **Opción A** (más rápida, 2 minutos)

**Para producción:** Usa la **Opción B** (más limpio, todo en main)

---

## 📱 ACCESO DIRECTO (Copiar y Pegar)

### Opción A - Configurar Pages:
```
1. https://github.com/eddcool34/xpress_cont/settings/pages
2. Branch: claude/add-xpress-shipping-config-esqOl
3. Save
4. Esperar 1-2 minutos
5. Ir a: https://eddcool34.github.io/xpress_cont/cotizador.html
```

### Opción B - Crear PR:
```
1. https://github.com/eddcool34/xpress_cont/compare/main...claude/add-xpress-shipping-config-esqOl
2. Create pull request
3. Merge pull request
4. Confirm merge
5. Settings → Pages → Branch: main → Save
6. Ir a: https://eddcool34.github.io/xpress_cont/cotizador.html
```

---

## 🎯 GUÍA VISUAL - OPCIÓN A (RECOMENDADA)

### Pantalla 1: Settings → Pages

```
┌──────────────────────────────────────────────────┐
│ GitHub                                           │
├──────────────────────────────────────────────────┤
│ eddcool34 / xpress_cont                          │
│                                                  │
│ [Code] [Issues] [Pull requests] [Settings] ←CLIC│
│                                                  │
└──────────────────────────────────────────────────┘
```

### Pantalla 2: Menú Lateral → Pages

```
┌──────────────────────────────────────────────────┐
│ Settings                                         │
│                                                  │
│ Sidebar:                                         │
│  - General                                       │
│  - Access                                        │
│  - Code and automation                           │
│    - Actions                                     │
│    - Webhooks                                    │
│    - Environments                                │
│    - Pages                     ←── CLIC AQUÍ    │
│    - ...                                         │
└──────────────────────────────────────────────────┘
```

### Pantalla 3: Cambiar Branch

```
┌──────────────────────────────────────────────────┐
│ GitHub Pages                                     │
│                                                  │
│ Your site is published at:                       │
│ https://eddcool34.github.io/xpress_cont/         │
│                                                  │
│ ┌──────────────────────────────────────────────┐│
│ │ Source                                       ││
│ │                                              ││
│ │ Branch:                                      ││
│ │ ┌───────────────────┐ ┌──────┐ ┌────────┐  ││
│ │ │ main          [▼] │ │ root │ │  Save  │  ││
│ │ └───────────────────┘ └──────┘ └────────┘  ││
│ │      └─ HAZ CLIC AQUÍ                       ││
│ │                                              ││
│ │ Opciones:                                    ││
│ │ • main                                       ││
│ │ • claude/add-xpress-shipping-config-esqOl   ││ ←SELECCIONA
│ │ • claude/rename-cmg-to-xpress-...           ││
│ │ • ...                                        ││
│ └──────────────────────────────────────────────┘│
│                                                  │
└──────────────────────────────────────────────────┘
```

### Pantalla 4: Guardar

```
┌──────────────────────────────────────────────────┐
│ Source                                           │
│                                                  │
│ Branch:                                          │
│ ┌───────────────────────────────────────────┐   │
│ │ claude/add-xpress-shipping-config-esqOl   │   │
│ └───────────────────────────────────────────┘   │
│                                                  │
│ ┌──────┐ ┌────────┐                            │
│ │ root │ │  Save  │  ←── HAZ CLIC AQUÍ         │
│ └──────┘ └────────┘                            │
└──────────────────────────────────────────────────┘
```

### Pantalla 5: Confirmación

```
┌──────────────────────────────────────────────────┐
│ ✅ Your site is live at:                        │
│ https://eddcool34.github.io/xpress_cont/         │
│                                                  │
│ Last deployed by eddcool34 1 minute ago          │
└──────────────────────────────────────────────────┘
```

---

## ✅ VERIFICAR QUE FUNCIONA

### Prueba 1: Ver que GitHub Pages está activo

Ve a: **https://github.com/eddcool34/xpress_cont/settings/pages**

Deberías ver:
```
✅ Your site is live at https://eddcool34.github.io/xpress_cont/
```

### Prueba 2: Abrir el cotizador

Abre en tu navegador:
```
https://eddcool34.github.io/xpress_cont/cotizador.html
```

Deberías ver el cotizador con el cuadro amarillo pidiendo credenciales.

### Prueba 3: Ver otros archivos

Prueba también:
```
https://eddcool34.github.io/xpress_cont/
https://eddcool34.github.io/xpress_cont/index.html
https://eddcool34.github.io/xpress_cont/xpress_cont.html
```

---

## ❓ SI AÚN NO FUNCIONA

### Error: "404 - File not found"

**Verifica:**
1. ¿Guardaste los cambios en Settings → Pages?
2. ¿Esperaste 1-2 minutos para que GitHub Pages se reconstruya?
3. ¿La URL es exactamente: `https://eddcool34.github.io/xpress_cont/cotizador.html`?
4. ¿La rama seleccionada es la correcta?

**Prueba:**
1. Refresca la página con `Ctrl+Shift+R` (o `Cmd+Shift+R` en Mac)
2. Prueba en navegación privada/incógnito
3. Espera 5 minutos más

### Error: "Page not found" pero el sitio existe

**Verifica:**
1. Que escribiste bien la URL (con .html al final)
2. Que la rama tiene el archivo `cotizador.html`

**Comprueba en GitHub:**
1. Ve a: https://github.com/eddcool34/xpress_cont
2. Cambia a la rama que configuraste en Pages
3. Verifica que veas el archivo `cotizador.html` en la lista

---

## 🎉 DESPUÉS DE SOLUCIONAR

Una vez que funcione, verás:

```
┌──────────────────────────────────────────────────┐
│ 🚚 Xpress Cont              ❌ No configurado   │
├──────────────────────────────────────────────────┤
│                                                  │
│ ⚠️ Configuración Requerida                      │
│                                                  │
│ Para usar el cotizador, necesitas configurar    │
│ tus credenciales de Skydropx:                   │
│                                                  │
│ Client ID: [________________]                   │
│ Client Secret: [________________]               │
│                                                  │
│        [Guardar y Activar]                      │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Esto significa que está funcionando.** Ahora sigue las instrucciones en:
- `DONDE_PONER_CREDENCIALES.md`

---

## 📞 LINKS ÚTILES

| Recurso | URL |
|---------|-----|
| Settings → Pages | https://github.com/eddcool34/xpress_cont/settings/pages |
| Crear PR | https://github.com/eddcool34/xpress_cont/compare |
| Ver archivo | https://github.com/eddcool34/xpress_cont/blob/claude/add-xpress-shipping-config-esqOl/cotizador.html |
| Skydropx | https://app.skydropx.com |

---

## 📋 RESUMEN ULTRA RÁPIDO

```
SOLUCIÓN MÁS RÁPIDA (2 MINUTOS):

1. https://github.com/eddcool34/xpress_cont/settings/pages
2. Branch: claude/add-xpress-shipping-config-esqOl
3. Click "Save"
4. Esperar 2 minutos
5. Ir a: https://eddcool34.github.io/xpress_cont/cotizador.html

¡LISTO!
```

---

**Versión:** 1.0.0
**Última actualización:** Diciembre 2025
