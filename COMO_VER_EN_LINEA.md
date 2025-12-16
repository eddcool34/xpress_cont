# 🌐 CÓMO VER EL COTIZADOR EN LÍNEA

## 📱 ACCESO INMEDIATO (3 PASOS)

### Paso 1: Habilitar GitHub Pages

1. **Ve a tu repositorio en GitHub:**
   ```
   https://github.com/eddcool34/xpress_cont
   ```

2. **Haz clic en "Settings"** (Configuración) en la parte superior

3. **En el menú lateral izquierdo, busca y haz clic en "Pages"**

4. **En la sección "Source":**
   - Selecciona la rama: `claude/add-xpress-shipping-config-esqOl` o `main`
   - Deja la carpeta en: `/ (root)`
   - Haz clic en **"Save"**

5. **Espera 1-2 minutos** y refresca la página

6. **Verás un mensaje verde que dice:**
   ```
   ✅ Your site is live at https://eddcool34.github.io/xpress_cont/
   ```

### Paso 2: Acceder al Cotizador

Una vez habilitado GitHub Pages, accede a:

```
https://eddcool34.github.io/xpress_cont/cotizador.html
```

### Paso 3: Configurar Credenciales

1. Abre el cotizador en tu navegador
2. Verás un mensaje amarillo pidiendo credenciales
3. Ingresa tu **Client ID** y **Client Secret** de Skydropx
   - Obtén tus credenciales en: https://app.skydropx.com → Configuración → API
4. Haz clic en **"Guardar y Activar"**
5. ¡Listo! Ya puedes cotizar

---

## 🚀 OTRAS OPCIONES DE DESPLIEGUE

### Opción A: Netlify (MÁS RÁPIDO)

1. Ve a https://app.netlify.com/drop
2. Arrastra el archivo `cotizador.html` a la zona indicada
3. En 30 segundos tendrás una URL como: `https://tu-sitio.netlify.app`

### Opción B: Vercel

1. Ve a https://vercel.com
2. Conecta tu cuenta de GitHub
3. Importa el repositorio `xpress_cont`
4. Haz clic en "Deploy"
5. Tendrás una URL como: `https://xpress-cont.vercel.app`

---

## 📋 URLs DE ACCESO

Una vez desplegado, estas serán tus URLs:

### GitHub Pages (Recomendado)
```
https://eddcool34.github.io/xpress_cont/cotizador.html
```

### Netlify (Si usas esta opción)
```
https://tu-nombre-personalizado.netlify.app
```

### Vercel (Si usas esta opción)
```
https://xpress-cont.vercel.app
```

---

## 🔑 CREDENCIALES DE SKYDROPX

### ¿Dónde obtenerlas?

1. Accede a https://app.skydropx.com
2. Inicia sesión
3. Ve a **Configuración** (icono de engranaje)
4. Haz clic en **API**
5. Copia:
   - `Client ID`
   - `Client Secret`

### ¿Dónde ingresarlas?

1. Abre el cotizador en línea
2. En la primera visita verás un cuadro amarillo
3. Pega las credenciales
4. Haz clic en "Guardar y Activar"

**Nota:** Las credenciales se guardan en tu navegador (localStorage), no se envían a ningún servidor.

---

## 📱 COMPARTIR EL COTIZADOR

### Enviar por WhatsApp
```
Hola, puedes cotizar tus envíos aquí:
https://eddcool34.github.io/xpress_cont/cotizador.html
```

### Enviar por Email
```
Asunto: Cotizador de Envíos Xpress

Accede al cotizador en línea:
https://eddcool34.github.io/xpress_cont/cotizador.html

Instrucciones:
1. Ingresa dirección de origen y destino
2. Ingresa dimensiones y peso del paquete
3. Selecciona las paqueterías
4. Haz clic en "Cotizar Envío"

¡Compara precios y tiempos de entrega en segundos!
```

### Crear Código QR

Ve a https://www.qr-code-generator.com/ e ingresa:
```
https://eddcool34.github.io/xpress_cont/cotizador.html
```

Descarga el QR y compártelo en:
- Volantes
- Tarjetas de presentación
- Redes sociales
- WhatsApp

---

## 🎯 USO DEL COTIZADOR

### 1. Llenar el Formulario

**Origen:**
- Código Postal: `01000`
- Estado: `CDMX`
- Ciudad: `Ciudad de México`
- Colonia: `Centro`

**Destino:**
- Código Postal: `44100`
- Estado: `Jalisco`
- Ciudad: `Guadalajara`
- Colonia: `Juárez` (opcional)

**Paquete:**
- Largo: `20` cm
- Ancho: `15` cm
- Alto: `10` cm
- Peso: `1.5` kg

### 2. Seleccionar Paqueterías

Marca las paqueterías que desees cotizar:
- ☑️ FedEx
- ☑️ Estafeta
- ☑️ DHL
- ☐ UPS
- ☐ Redpack
- ☐ PaquetExpress

O deja todo desmarcado para cotizar con todas.

### 3. Ver Resultados

Los resultados muestran:
- 💰 Precio en pesos mexicanos
- ⏰ Días de entrega
- 🚚 Nombre de la paquetería
- 📦 Tipo de servicio
- ✅ Si es asegurable
- 🏠 Si tiene recolección

### 4. Ordenar Resultados

Haz clic en los botones para ordenar:
- **Precio:** Del más barato al más caro
- **Tiempo:** Del más rápido al más lento
- **Paquetería:** Orden alfabético

---

## 🔧 SOLUCIÓN DE PROBLEMAS

### "No configurado" en la esquina

**Solución:**
1. Haz clic en el mensaje de configuración
2. Ingresa Client ID y Client Secret de Skydropx
3. Haz clic en "Guardar y Activar"

### No aparecen resultados

**Verifica:**
- ✅ Códigos postales correctos
- ✅ Nombres de estados sin errores
- ✅ Dimensiones y peso del paquete
- ✅ Al menos una paquetería seleccionada

### Error de autenticación

**Solución:**
1. Verifica tus credenciales en https://app.skydropx.com
2. Copia nuevamente Client ID y Client Secret
3. Borra las credenciales guardadas (limpia caché del navegador)
4. Ingresa las credenciales nuevamente

### El sitio no carga (GitHub Pages)

**Verifica:**
1. Que hayas guardado los cambios en Settings → Pages
2. Espera 2-3 minutos después de habilitar
3. Prueba en navegación privada/incógnito
4. Verifica la URL: `https://eddcool34.github.io/xpress_cont/cotizador.html`

---

## 📊 MONITOREO

### Ver Actividad de la API

1. Ve a https://app.skydropx.com
2. Dashboard → API Usage
3. Verás:
   - Número de cotizaciones realizadas
   - Límite de tu plan
   - Uso del mes actual

### Ver Logs en el Navegador

1. Abre el cotizador
2. Presiona `F12` (o `Cmd+Option+I` en Mac)
3. Ve a la pestaña "Console"
4. Verás mensajes como:
   ```
   [Skydropx] Autenticado exitosamente
   [Skydropx] Cotización creada: abc-123
   [Skydropx] Cotización completada
   ```

---

## 🎨 PERSONALIZACIÓN

### Cambiar el Nombre

Edita `cotizador.html` línea 6:
```html
<title>Mi Empresa - Cotizador</title>
```

Y línea 25:
```html
<h1 class="text-2xl font-bold">Mi Empresa</h1>
```

### Cambiar Colores

Busca y reemplaza en `cotizador.html`:
- `bg-blue-600` → `bg-red-600` (botones)
- `text-blue-600` → `text-red-600` (textos)

---

## 📱 ACCESO DESDE MÓVIL

### iOS (iPhone/iPad)

1. Abre Safari
2. Ve a la URL del cotizador
3. Toca el botón de compartir (cuadro con flecha)
4. Selecciona "Agregar a pantalla de inicio"
5. Se creará un icono como una app

### Android

1. Abre Chrome
2. Ve a la URL del cotizador
3. Toca los 3 puntos (⋮) arriba a la derecha
4. Selecciona "Agregar a pantalla de inicio"
5. Se creará un acceso directo

---

## ✅ CHECKLIST FINAL

- [ ] GitHub Pages habilitado
- [ ] Cotizador accesible en línea
- [ ] Credenciales de Skydropx configuradas
- [ ] Prueba de cotización exitosa
- [ ] URL compartida con usuarios
- [ ] Código QR creado (opcional)
- [ ] Acceso directo en móvil creado (opcional)

---

## 🎉 ¡LISTO!

Tu cotizador ya está en línea y funcionando en:

```
https://eddcool34.github.io/xpress_cont/cotizador.html
```

**Compártelo con tus clientes y comienza a cotizar!** 🚀

---

## 📞 SOPORTE

**Documentación completa:**
- [Guía de Despliegue](DEPLOY_GUIDE.md)
- [Documentación del Cotizador](COTIZADOR_README.md)

**API de Skydropx:**
- Documentación: https://app.skydropx.com/api/v1/docs
- Panel: https://app.skydropx.com
- Estado: https://status.skydropx.com

---

**Versión:** 1.0.0
**Última actualización:** Diciembre 2025
