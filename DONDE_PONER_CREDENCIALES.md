# 🔑 DÓNDE AGREGAR TUS CREDENCIALES DE SKYDROPX

## ⚠️ IMPORTANTE: NO EDITES NINGÚN ARCHIVO

Las credenciales **NO** se agregan en el código. Se ingresan **directamente en el navegador** cuando abres el cotizador.

---

## 📋 PASO A PASO

### **Paso 1: Obtén tus Credenciales de Skydropx**

1. Ve a: **https://app.skydropx.com**
2. Inicia sesión con tu cuenta
3. Haz clic en el icono de **⚙️ Configuración** (arriba a la derecha)
4. Haz clic en **"API"**
5. Verás dos campos:
   ```
   Client ID:     abc123xyz...
   Client Secret: secret456def...
   ```
6. **COPIA** ambos valores (usa el botón de copiar 📋)

---

### **Paso 2: Abre el Cotizador**

**Opción A: Localmente (en tu computadora)**
```
1. Abre el archivo: cotizador.html
2. Haz doble clic en el archivo
3. Se abrirá en tu navegador
```

**Opción B: En línea (GitHub Pages)**
```
1. Habilita GitHub Pages primero (ver COMO_VER_EN_LINEA.md)
2. Abre: https://eddcool34.github.io/xpress_cont/cotizador.html
```

---

### **Paso 3: Ingresa las Credenciales en la Pantalla**

Cuando abras el cotizador **POR PRIMERA VEZ**, verás esto:

```
┌─────────────────────────────────────────────────────────────┐
│  ⚠️ Configuración Requerida                                 │
│                                                              │
│  Para usar el cotizador, necesitas configurar tus           │
│  credenciales de Skydropx:                                  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Client ID                                            │  │
│  │ [_____________________________________________]       │  │
│  │                                                       │  │
│  │ Client Secret                                        │  │
│  │ [_____________________________________________]       │  │
│  │                                                       │  │
│  │         [ Guardar y Activar ]                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ℹ️ Las credenciales se guardarán en tu navegador          │
└─────────────────────────────────────────────────────────────┘
```

**AQUÍ ES DONDE PEGAS TUS CREDENCIALES:**

1. **Haz clic en el campo "Client ID"**
2. **Pega** el Client ID que copiaste de Skydropx
3. **Haz clic en el campo "Client Secret"**
4. **Pega** el Client Secret que copiaste de Skydropx
5. **Haz clic en el botón "Guardar y Activar"**

---

### **Paso 4: ¡Listo!**

Después de hacer clic en "Guardar y Activar":

✅ El cuadro amarillo desaparecerá
✅ Verás "✅ Conectado" en la esquina superior derecha
✅ Ya puedes usar el cotizador

**Las credenciales quedarán guardadas en tu navegador** y no tendrás que ingresarlas nuevamente.

---

## 🖼️ GUÍA VISUAL

### Vista del Cotizador SIN Credenciales:

```
┌─────────────────────────────────────────────────────────────┐
│  Xpress Cont                      ❌ No configurado         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ⚠️ CONFIGURACIÓN REQUERIDA (aparece en amarillo)          │
│                                                              │
│  [Campo para Client ID]      ← AQUÍ PEGAS EL CLIENT ID     │
│  [Campo para Client Secret]  ← AQUÍ PEGAS EL CLIENT SECRET │
│  [Botón: Guardar y Activar]                                │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  Formulario de cotización (deshabilitado)                   │
└─────────────────────────────────────────────────────────────┘
```

### Vista del Cotizador CON Credenciales:

```
┌─────────────────────────────────────────────────────────────┐
│  Xpress Cont                      ✅ Conectado              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📦 Cotizador de Envíos                                     │
│                                                              │
│  📍 Dirección de Origen                                     │
│  [Código Postal] [Estado] [Ciudad] [Colonia]               │
│                                                              │
│  📍 Dirección de Destino                                    │
│  [Código Postal] [Estado] [Ciudad] [Colonia]               │
│                                                              │
│  📦 Dimensiones del Paquete                                 │
│  [Largo] [Ancho] [Alto] [Peso]                             │
│                                                              │
│  [Botón: Cotizar Envío]                                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## ❓ PREGUNTAS FRECUENTES

### **¿Dónde quedan guardadas las credenciales?**

En el **localStorage de tu navegador**. Es como una "memoria" del navegador que solo tú puedes ver.

### **¿Son seguras?**

Sí. Las credenciales:
- ✅ Solo se guardan en TU navegador
- ✅ No se envían a ningún servidor
- ✅ Solo tú puedes verlas
- ✅ Se usan solo para autenticarte con Skydropx

### **¿Tengo que ingresarlas cada vez?**

No. Solo la primera vez. Después quedan guardadas.

### **¿Qué pasa si cambio de computadora?**

Tendrás que ingresar las credenciales nuevamente en esa computadora, porque cada navegador tiene su propia memoria local.

### **¿Qué pasa si limpio el caché del navegador?**

Se borrarán las credenciales y tendrás que ingresarlas de nuevo.

### **¿Puedo compartir el cotizador con otras personas?**

Sí, pero cada persona tendrá que:
1. Tener su propia cuenta de Skydropx
2. Ingresar sus propias credenciales

O puedes dar acceso con tus credenciales, y todos usarán tu cuenta de Skydropx.

---

## 🚨 ERRORES COMUNES

### **Error: "Credenciales inválidas"**

**Causa:** Client ID o Client Secret incorrectos

**Solución:**
1. Ve a https://app.skydropx.com → Configuración → API
2. Verifica que copiaste correctamente ambos valores
3. Asegúrate de no copiar espacios extras al inicio o final
4. Vuelve a pegar en el cotizador

### **No veo el cuadro amarillo de configuración**

**Causa:** Ya configuraste las credenciales antes

**Solución:**
1. Mira la esquina superior derecha
2. Si dice "✅ Conectado", ya está configurado
3. Si dice "❌ Error", borra el caché y recarga la página

### **¿Cómo borro las credenciales?**

**Método 1: Desde el navegador**
1. Presiona `F12` (o `Cmd+Option+I` en Mac)
2. Ve a la pestaña "Application" o "Almacenamiento"
3. Busca "Local Storage"
4. Borra las entradas que empiezan con "skydropx_"

**Método 2: Desde el cotizador**
1. Abre la consola con `F12`
2. Escribe:
   ```javascript
   localStorage.clear()
   ```
3. Recarga la página

---

## 📞 EJEMPLO COMPLETO

### **1. Obteniendo credenciales:**

```
Sitio: https://app.skydropx.com
Login: tu_email@ejemplo.com

Panel → Configuración → API

Client ID:     sk_abc123xyz789def456ghi012jkl345
Client Secret: sk_secret_mno678pqr901stu234vwx567yz890
```

### **2. Abrir cotizador:**

```
Archivo local: cotizador.html
     o
En línea: https://eddcool34.github.io/xpress_cont/cotizador.html
```

### **3. Pegar en los campos:**

```
┌──────────────────────────────────────────────────┐
│ Client ID                                        │
│ sk_abc123xyz789def456ghi012jkl345               │ ← PEGAR AQUÍ
│                                                   │
│ Client Secret                                    │
│ sk_secret_mno678pqr901stu234vwx567yz890         │ ← PEGAR AQUÍ
│                                                   │
│         [ Guardar y Activar ]                    │ ← HACER CLIC
└──────────────────────────────────────────────────┘
```

### **4. ¡Listo para usar!**

---

## 🎯 RESUMEN

### ✅ LO QUE SÍ DEBES HACER:

1. ✅ Obtener credenciales de Skydropx
2. ✅ Abrir el cotizador en tu navegador
3. ✅ Pegar las credenciales en los campos de la pantalla
4. ✅ Hacer clic en "Guardar y Activar"

### ❌ LO QUE NO DEBES HACER:

1. ❌ Editar archivos de código (HTML, JS, etc.)
2. ❌ Buscar dónde poner las credenciales en el código
3. ❌ Modificar archivos de configuración
4. ❌ Subir las credenciales a GitHub

---

## 🎉 ¡ESO ES TODO!

**Las credenciales se ingresan SOLO en la interfaz del navegador, NO en el código.**

Es tan simple como:
1. Abrir el cotizador
2. Ver el cuadro amarillo
3. Pegar Client ID y Client Secret
4. Hacer clic en "Guardar y Activar"

**¿Todavía tienes dudas? Abre el cotizador y verás el cuadro amarillo pidiéndote las credenciales. Es imposible no verlo.** 😊

---

**Última actualización:** Diciembre 2025
