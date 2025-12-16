# 🚀 Guía de Despliegue - Cotizador Xpress en Línea

Esta guía te muestra cómo publicar el cotizador de Xpress en línea para que pueda ser accesible desde cualquier lugar.

## 📋 Tabla de Contenidos

1. [Opción 1: GitHub Pages (GRATIS)](#opción-1-github-pages-gratis)
2. [Opción 2: Netlify (GRATIS)](#opción-2-netlify-gratis)
3. [Opción 3: Vercel (GRATIS)](#opción-3-vercel-gratis)
4. [Opción 4: Servidor Propio](#opción-4-servidor-propio)
5. [Configuración Inicial](#configuración-inicial)

---

## Opción 1: GitHub Pages (GRATIS)

### Paso 1: Subir a GitHub

Tu código ya está en GitHub, solo necesitas habilitar GitHub Pages.

### Paso 2: Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub: https://github.com/eddcool34/xpress_cont
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, haz clic en **Pages**
4. En **Source**, selecciona la rama `main` o la que quieras publicar
5. Haz clic en **Save**

### Paso 3: Acceder al Sitio

En unos minutos, tu sitio estará disponible en:
```
https://eddcool34.github.io/xpress_cont/cotizador.html
```

### Ventajas:
✅ Completamente GRATIS
✅ Fácil de configurar
✅ HTTPS incluido
✅ Actualización automática con cada push

### Desventajas:
❌ Solo para sitios públicos (tu código será visible)

---

## Opción 2: Netlify (GRATIS)

### Paso 1: Crear Cuenta en Netlify

1. Ve a https://netlify.com
2. Crea una cuenta (puedes usar tu cuenta de GitHub)

### Paso 2: Desplegar desde GitHub

1. Haz clic en **"Add new site"** → **"Import an existing project"**
2. Selecciona **GitHub**
3. Busca y selecciona tu repositorio `xpress_cont`
4. Configura:
   - **Branch to deploy:** `main` o tu branch
   - **Build command:** (déjalo vacío)
   - **Publish directory:** `.` (punto)
5. Haz clic en **Deploy site**

### Paso 3: Obtener URL

Netlify te dará una URL como:
```
https://xpress-cont-abc123.netlify.app
```

Puedes personalizar el subdominio en: **Site settings** → **Change site name**

### Paso 4: Configurar Dominio Personalizado (Opcional)

En **Domain settings** puedes agregar tu propio dominio.

### Ventajas:
✅ GRATIS con límites generosos
✅ Despliegue automático desde GitHub
✅ HTTPS automático
✅ Dominio personalizado gratis
✅ Formularios y funciones serverless (si las necesitas)

---

## Opción 3: Vercel (GRATIS)

### Paso 1: Crear Cuenta en Vercel

1. Ve a https://vercel.com
2. Crea una cuenta con GitHub

### Paso 2: Importar Proyecto

1. Haz clic en **"Add New..."** → **"Project"**
2. Selecciona tu repositorio `xpress_cont`
3. Configura:
   - **Framework Preset:** Other
   - **Root Directory:** `.`
   - **Build Command:** (déjalo vacío)
   - **Output Directory:** `.`
4. Haz clic en **Deploy**

### Paso 3: Obtener URL

Vercel te dará una URL como:
```
https://xpress-cont.vercel.app
```

### Ventajas:
✅ GRATIS
✅ Muy rápido
✅ Despliegue automático
✅ HTTPS incluido
✅ Analytics incluido

---

## Opción 4: Servidor Propio

Si tienes un servidor web (Apache, Nginx, etc.):

### Método 1: Subir por FTP

1. Descarga el archivo `cotizador.html`
2. Súbelo a tu servidor vía FTP
3. Accede desde: `https://tudominio.com/cotizador.html`

### Método 2: Clonar desde Git

```bash
# En tu servidor
cd /var/www/html
git clone https://github.com/eddcool34/xpress_cont.git
cd xpress_cont

# Configurar permisos
chmod 644 cotizador.html
```

Accede desde: `https://tudominio.com/xpress_cont/cotizador.html`

---

## 🔐 Configuración Inicial

### IMPORTANTE: Credenciales de Skydropx

Después de desplegar, la primera vez que entres al cotizador:

1. Abre el cotizador en tu navegador
2. Verás un mensaje amarillo pidiendo credenciales
3. Ingresa tu **Client ID** y **Client Secret** de Skydropx
4. Haz clic en **"Guardar y Activar"**

**Las credenciales se guardarán en el navegador local de cada usuario.**

### Obtener Credenciales de Skydropx

1. Accede a https://app.skydropx.com
2. Ve a **Configuración** → **API**
3. Copia tu `Client ID` y `Client Secret`

---

## 📱 Hacer el Cotizador Accesible

### Compartir URL

Una vez desplegado, comparte la URL con tus usuarios:

**Ejemplo con GitHub Pages:**
```
https://eddcool34.github.io/xpress_cont/cotizador.html
```

**Ejemplo con Netlify:**
```
https://xpress-cotizador.netlify.app
```

### Crear Acceso Directo en Móvil

**iOS:**
1. Abre Safari
2. Ve a la URL del cotizador
3. Toca el botón de compartir
4. Selecciona **"Agregar a pantalla de inicio"**

**Android:**
1. Abre Chrome
2. Ve a la URL del cotizador
3. Toca los 3 puntos (⋮)
4. Selecciona **"Agregar a pantalla de inicio"**

---

## 🎨 Personalización

### Cambiar el Título

Edita `cotizador.html`:

```html
<title>Tu Empresa - Cotizador de Envíos</title>
<h1 class="text-2xl font-bold text-gray-800">Tu Empresa</h1>
```

### Cambiar Colores

Busca las clases de Tailwind CSS y cámbialas:

- `bg-blue-600` → `bg-red-600` (color de botones)
- `text-blue-600` → `text-red-600` (color de textos)

---

## 🔧 Solución de Problemas

### "No configurado" en la barra superior

➡️ **Solución:** Ingresa tus credenciales de Skydropx en la sección de configuración.

### Error: "CORS policy"

➡️ **Solución:** Este error no debería ocurrir ya que Skydropx permite CORS. Si ocurre, verifica que estés usando HTTPS.

### No aparecen resultados

➡️ **Solución:**
1. Verifica que los códigos postales sean válidos
2. Asegúrate de que las direcciones estén correctas
3. Prueba con diferentes paqueterías

### El token expira muy rápido

➡️ **Solución:** El servicio renueva automáticamente el token. Si hay problemas, recarga la página.

---

## 📊 Monitoreo

### Ver Logs en el Navegador

1. Abre el cotizador
2. Presiona `F12` (o `Cmd+Option+I` en Mac)
3. Ve a la pestaña **Console**
4. Verás todos los logs de las operaciones

### Logs Importantes

```
[Skydropx] Autenticado exitosamente
[Skydropx] Cotización creada: xxx-xxx-xxx
[Skydropx] Cotización completada
```

---

## 🚀 Despliegue Rápido (Recomendado para Principiantes)

### Método más Fácil: Netlify Drop

1. Ve a https://app.netlify.com/drop
2. Arrastra el archivo `cotizador.html` a la zona de Drop
3. ¡Listo! Netlify te dará una URL inmediatamente

**Tiempo estimado:** 30 segundos

---

## 🔄 Actualizaciones

### GitHub Pages / Netlify / Vercel

Simplemente haz push a tu repositorio:

```bash
git add .
git commit -m "Actualización del cotizador"
git push
```

El sitio se actualizará automáticamente en 1-2 minutos.

### Servidor Propio

```bash
# SSH al servidor
ssh usuario@tuservidor.com

# Ir al directorio
cd /var/www/html/xpress_cont

# Actualizar
git pull
```

---

## 💡 Consejos Pro

1. **Usa HTTPS siempre:** La API de Skydropx requiere HTTPS en producción
2. **Configura un dominio personalizado:** Más profesional para tus clientes
3. **Habilita caché:** Para mejorar velocidad (automático en Netlify/Vercel)
4. **Monitorea uso:** Skydropx tiene límites en el plan gratuito
5. **Backup:** Guarda tus credenciales en un lugar seguro

---

## 📞 Soporte

Si tienes problemas con el despliegue:

1. Revisa los logs en la consola del navegador (`F12`)
2. Verifica que tus credenciales de Skydropx sean correctas
3. Asegúrate de tener conexión a internet
4. Revisa el estado de Skydropx: https://status.skydropx.com

---

## ✅ Checklist de Despliegue

- [ ] Archivo `cotizador.html` subido/desplegado
- [ ] Sitio accesible vía URL
- [ ] Credenciales de Skydropx configuradas
- [ ] Prueba de cotización exitosa
- [ ] URL compartida con usuarios
- [ ] Acceso directo creado en móvil (opcional)

---

**¡Listo!** Tu cotizador ya está en línea y accesible desde cualquier dispositivo con internet.

**URL de ejemplo:** https://eddcool34.github.io/xpress_cont/cotizador.html

---

**Última actualización:** Diciembre 2025
**Versión:** 1.0.0
