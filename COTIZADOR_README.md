# 📦 Cotizador de Envíos Xpress

Aplicación web standalone para cotizar envíos con múltiples paqueterías usando la API de Skydropx.

## 🌟 Características

✅ **Interfaz Moderna y Responsive**
- Diseño profesional con Tailwind CSS
- Funciona en computadora, tablet y móvil
- Iconos FontAwesome

✅ **Cotización en Tiempo Real**
- Integración directa con API de Skydropx
- Comparación de múltiples paqueterías (FedEx, Estafeta, DHL, UPS, Redpack, PaquetExpress)
- Resultados en segundos

✅ **Funciones Avanzadas**
- Ordenar por precio, tiempo de entrega o paquetería
- Selección de carriers específicos
- Protección de paquete opcional
- Valor declarado

✅ **Seguridad**
- Autenticación OAuth 2.0 automática
- Credenciales almacenadas en localStorage del navegador
- Renovación automática de tokens

## 🚀 Inicio Rápido

### Opción 1: Abrir Localmente

1. Descarga `cotizador.html`
2. Abre el archivo en tu navegador
3. Ingresa tus credenciales de Skydropx
4. ¡Comienza a cotizar!

### Opción 2: Desplegar en Línea

Consulta la [Guía de Despliegue](DEPLOY_GUIDE.md) para opciones detalladas.

**Método rápido:**
```bash
# Opción A: GitHub Pages (ya configurado)
https://eddcool34.github.io/xpress_cont/cotizador.html

# Opción B: Netlify Drop
# Ve a https://app.netlify.com/drop y arrastra cotizador.html
```

## 📋 Requisitos

### API de Skydropx

1. Cuenta en Skydropx: https://app.skydropx.com
2. Client ID y Client Secret (Configuración → API)

### Navegador

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎯 Cómo Usar

### 1. Configurar Credenciales (Primera Vez)

Al abrir el cotizador por primera vez:

1. Verás un mensaje amarillo solicitando credenciales
2. Ingresa tu **Client ID** de Skydropx
3. Ingresa tu **Client Secret** de Skydropx
4. Haz clic en **"Guardar y Activar"**

Las credenciales se guardarán en tu navegador y no necesitarás ingresarlas nuevamente.

### 2. Crear Cotización

**Dirección de Origen:**
- Código Postal (ejemplo: 01000)
- Estado (ejemplo: CDMX)
- Ciudad (ejemplo: Ciudad de México)
- Colonia (ejemplo: Centro)

**Dirección de Destino:**
- Código Postal (ejemplo: 44100)
- Estado (ejemplo: Jalisco)
- Ciudad (ejemplo: Guadalajara)
- Colonia (opcional)

**Dimensiones del Paquete:**
- Largo en cm (ejemplo: 20)
- Ancho en cm (ejemplo: 15)
- Alto en cm (ejemplo: 10)
- Peso en kg (ejemplo: 1.5)
- Valor declarado (opcional)
- Protección (checkbox opcional)

**Paqueterías:**
- Marca las paqueterías con las que quieres cotizar
- O deja todo desmarcado para cotizar con todas las disponibles

### 3. Ver Resultados

Los resultados muestran:
- **Paquetería:** Nombre y logo
- **Servicio:** Tipo de servicio (Express, Standard, etc.)
- **Precio:** Costo total en pesos mexicanos
- **Tiempo:** Días estimados de entrega
- **Extras:** Tarifa de gestión, zona, si es asegurable, si tiene recolección

### 4. Ordenar Resultados

Usa los botones superiores para ordenar por:
- 💰 **Precio:** Del más barato al más caro
- ⏰ **Tiempo:** Del más rápido al más lento
- 🚚 **Paquetería:** Orden alfabético

## 🔧 Configuración Avanzada

### Agregar Más Paqueterías

Edita el HTML en la sección de checkboxes:

```html
<label class="flex items-center space-x-2 cursor-pointer">
    <input type="checkbox" name="carrier" value="nueva_paqueteria" class="w-4 h-4 text-blue-600">
    <span class="text-sm">Nueva Paquetería</span>
</label>
```

### Cambiar País

Por defecto está configurado para México (`MX`). Para cambiar:

```javascript
// En la línea ~550 del archivo
address_from: {
    country_code: 'US',  // Cambiar a US, CA, etc.
    ...
}
```

### Personalizar Colores

Busca las clases de Tailwind CSS:

```html
<!-- Cambiar azul por rojo -->
bg-blue-600    →  bg-red-600
text-blue-600  →  text-red-600
```

## 📊 Estructura de Datos

### Request a Skydropx

```json
{
  "quotation": {
    "address_from": {
      "country_code": "MX",
      "postal_code": "01000",
      "area_level1": "CDMX",
      "area_level2": "Ciudad de México",
      "area_level3": "Centro"
    },
    "address_to": {
      "country_code": "MX",
      "postal_code": "44100",
      "area_level1": "Jalisco",
      "area_level2": "Guadalajara",
      "area_level3": "Juárez"
    },
    "parcels": [
      {
        "length": 20,
        "width": 15,
        "height": 10,
        "weight": 1.5,
        "package_protected": false,
        "declared_value": 100
      }
    ],
    "requested_carriers": ["fedex", "estafeta", "dhl"]
  }
}
```

### Response de Skydropx

```json
{
  "id": "0ac5adcc-a13d-427d-81dd-9ddd70b2f660",
  "is_completed": true,
  "rates": [
    {
      "id": "rate-123",
      "provider_name": "fedex",
      "provider_display_name": "FedEx",
      "provider_service_name": "Standard Overnight",
      "total": "250.00",
      "currency_code": "MXN",
      "days": 2,
      "insurable": true,
      "pickup": true
    }
  ]
}
```

## 🐛 Solución de Problemas

### Error: "Credenciales no configuradas"

**Causa:** No has ingresado Client ID y Client Secret
**Solución:** Haz clic en el botón de configuración y guarda las credenciales

### Error: "Error de autenticación"

**Causa:** Credenciales incorrectas
**Solución:**
1. Verifica que copiaste correctamente Client ID y Client Secret
2. Ve a https://app.skydropx.com → Configuración → API
3. Regenera las credenciales si es necesario

### No aparecen resultados

**Causa:** No hay cobertura para la ruta seleccionada
**Solución:**
1. Verifica que los códigos postales sean correctos
2. Prueba con diferentes paqueterías
3. Revisa que las direcciones estén completas

### "Timeout esperando completar cotización"

**Causa:** La API está tardando mucho en responder
**Solución:**
1. Intenta nuevamente
2. Reduce el número de paqueterías a cotizar
3. Verifica tu conexión a internet

### Resultados diferentes cada vez

**Causa:** Las tarifas cambian según disponibilidad
**Solución:** Esto es normal. Los precios y tiempos pueden variar.

## 🔐 Seguridad

### Almacenamiento de Credenciales

Las credenciales se guardan en `localStorage` del navegador:
- Solo accesibles desde el mismo dominio
- No se envían a servidores externos
- Se mantienen hasta que limpies el caché del navegador

### Tokens de Acceso

- Se renuevan automáticamente cada 2 horas
- Se almacenan temporalmente en el navegador
- Se invalidan al cerrar sesión o limpiar caché

### Recomendaciones

1. **No compartas** tus credenciales de Skydropx
2. **Usa HTTPS** siempre en producción
3. **Limita el acceso** al cotizador si es para uso interno
4. **Monitorea** tu uso de API en el panel de Skydropx

## 📱 Uso en Móvil

### Agregar a Pantalla de Inicio

**iOS:**
1. Safari → Compartir → "Agregar a pantalla de inicio"
2. Se crea un icono como si fuera una app

**Android:**
1. Chrome → ⋮ → "Agregar a pantalla de inicio"
2. Se crea un acceso directo

### Optimizaciones Móviles

- Diseño responsive automático
- Campos grandes para tocar fácilmente
- Teclado numérico para números
- Scroll suave entre secciones

## 🌐 Integración con Otros Sistemas

### Usar como iframe

```html
<iframe src="https://tudominio.com/cotizador.html"
        width="100%"
        height="800px"
        frameborder="0">
</iframe>
```

### API JavaScript

Si quieres usar el servicio en otra aplicación:

```javascript
// Extraer la clase SkydropxService del HTML
const service = new SkydropxService();
await service.authenticate();

const quotation = await service.createQuotation({
  // ... datos
});
```

## 📈 Estadísticas y Monitoreo

### Ver Logs

Abre la consola del navegador (`F12` → Console):

```
[Skydropx] Autenticado exitosamente
[Skydropx] Cotización creada: abc-123
[Skydropx] Esperando completar... 1/15
[Skydropx] Cotización completada
```

### Monitorear Uso de API

Ve a tu panel de Skydropx:
- Dashboard → API Usage
- Verás número de requests
- Verás límites del plan

## 🚀 Roadmap

Próximas características planeadas:

- [ ] Histórico de cotizaciones
- [ ] Exportar a PDF
- [ ] Comparación lado a lado
- [ ] Calculadora de peso volumétrico
- [ ] Multi-paquete en una sola cotización
- [ ] Guardado de direcciones frecuentes
- [ ] Modo oscuro

## 📞 Soporte

### Documentación Oficial

- **Skydropx API:** https://app.skydropx.com/api/v1/docs
- **Panel Skydropx:** https://app.skydropx.com
- **Estado del servicio:** https://status.skydropx.com

### Contacto

Para problemas con el cotizador, revisa los logs en la consola del navegador.

Para problemas con la API de Skydropx, contacta su soporte.

## 📄 Licencia

Este cotizador es parte del sistema Xpress Cont.

---

## 🎉 ¡Listo para Usar!

Simplemente abre `cotizador.html` en tu navegador o despliega en línea usando la [Guía de Despliegue](DEPLOY_GUIDE.md).

**URL de Ejemplo:** https://eddcool34.github.io/xpress_cont/cotizador.html

---

**Versión:** 1.0.0
**Última actualización:** Diciembre 2025
**Powered by:** Skydropx API
