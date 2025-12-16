# 📦 Xpress Shipping API Integration

Integración completa de la API de envíos de Skydropx en el sistema Xpress Cont.

## 📁 Archivos Agregados

```
xpress_cont/
├── config/
│   └── xpress-shipping-api.js         # Configuración de la API
├── services/
│   └── xpress-shipping-service.js     # Servicio principal
├── docs/
│   └── XPRESS_SHIPPING_API_GUIDE.md   # Guía completa de uso
├── ejemplo_shipping_api.html          # Ejemplo interactivo
└── SHIPPING_API_README.md             # Este archivo
```

## 🚀 Inicio Rápido

### 1. Configurar Credenciales

Edita `config/xpress-shipping-api.js` y reemplaza:

```javascript
OAUTH_CREDENTIALS: {
  CLIENT_ID: 'TU_CLIENT_ID_AQUI',         // ← Reemplazar
  CLIENT_SECRET: 'TU_CLIENT_SECRET_AQUI',  // ← Reemplazar
  ...
}
```

### 2. Incluir en tu HTML

```html
<script src="config/xpress-shipping-api.js"></script>
<script src="services/xpress-shipping-service.js"></script>
```

### 3. Usar el Servicio

```javascript
// Inicializar
const shippingService = new XpressShippingService();
await shippingService.initialize();

// Crear cotización
const quotation = await shippingService.createQuotation({
  origin: { /* datos origen */ },
  destination: { /* datos destino */ },
  packages: [ /* paquetes */ ]
});

// Crear envío
const shipment = await shippingService.createShipment({
  quotation_id: quotation.id,
  rate_id: selectedRate.id,
  carrier_name: 'fedex'
});
```

## 📚 Documentación

Para documentación completa, consulta:

- **Guía de uso:** [`docs/XPRESS_SHIPPING_API_GUIDE.md`](docs/XPRESS_SHIPPING_API_GUIDE.md)
- **Ejemplo interactivo:** Abre `ejemplo_shipping_api.html` en tu navegador

## 🔑 Características

✅ **Autenticación OAuth automática**
- Obtención y renovación automática de tokens
- Almacenamiento seguro en localStorage
- Manejo de expiración y refresh

✅ **Gestión de Cotizaciones**
- Crear cotizaciones con múltiples carriers
- Espera automática de completación
- Análisis de rates disponibles

✅ **Creación de Envíos**
- Generación de guías de envío
- Obtención de etiquetas de envío
- Soporte para múltiples carriers (FedEx, Estafeta, DHL, etc.)

✅ **Flujo Completo Integrado**
- Método combinado: cotización + envío en un solo paso
- Selección automática o manual de rates
- Manejo de errores robusto

✅ **Retry Logic**
- Reintentos automáticos en caso de falla
- Timeout configurable
- Logging detallado

## 🎯 Guía para Crear un Envío

### Paso 1: Cotizar

```javascript
const quotation = await shippingService.createQuotation(data);
```

### Paso 2: Consultar Rates

```javascript
const completed = await shippingService.waitForQuotationCompletion(quotation.id);
console.log('Rates disponibles:', completed.rates);
```

### Paso 3: Seleccionar Rate

```javascript
const cheapest = completed.rates.reduce((p, c) =>
  c.total_pricing < p.total_pricing ? c : p
);
```

### Paso 4: Crear Envío

```javascript
const shipment = await shippingService.createShipment({
  quotation_id: completed.id,
  rate_id: cheapest.id,
  carrier_name: cheapest.carrier
});

console.log('Guía:', shipment.tracking_number);
```

## ⚙️ Configuración Avanzada

### Modificar Timeouts

En `config/xpress-shipping-api.js`:

```javascript
REQUEST_CONFIG: {
  TIMEOUT: 30000,        // 30 segundos
  RETRY_ATTEMPTS: 3,     // 3 intentos
  RETRY_DELAY: 1000      // 1 segundo entre intentos
}
```

### Renovación de Tokens

```javascript
TOKEN_CONFIG: {
  STORAGE_KEY: 'xpress_shipping_token',
  EXPIRY_KEY: 'xpress_shipping_token_expiry',
  REFRESH_MARGIN: 300    // Renovar 5 min antes de expirar
}
```

## 🔗 Integración con xpress_cont.html

Para integrar con el formulario principal:

```javascript
// En el componente React
const handleCrearEnvioAPI = async () => {
  const result = await shippingService.createQuotationAndShipment(
    convertFormDataToQuotation(formData),
    selectCheapestRate,
    {
      carrier_name: formData.paqueteria,
      consignment_note: 'CNT001',
      package_type: 'PKG001'
    }
  );

  // Actualizar formulario con número de guía
  setFormData({
    ...formData,
    numeroGuia: result.shipment.tracking_number
  });

  // Abrir etiqueta
  window.open(result.shipment.label_url, '_blank');
};
```

## 🧪 Pruebas

Abre `ejemplo_shipping_api.html` en tu navegador para:

- ✅ Probar autenticación
- ✅ Crear cotizaciones de prueba
- ✅ Ejecutar flujo completo
- ✅ Ver logs en tiempo real

## ⚠️ Notas Importantes

1. **Validez de Rates:** Los rates son válidos por **24 horas**
2. **Completación Progresiva:** Las cotizaciones se completan de forma asíncrona
3. **Credenciales:** Nunca subas credenciales reales al repositorio
4. **Ambiente de Pruebas:** Usa credenciales de sandbox para desarrollo

## 📞 Soporte

- **Documentación oficial Skydropx:** https://app.skydropx.com/api/v1/docs
- **Panel de Skydropx:** https://app.skydropx.com

## 🔄 Endpoints Disponibles

### OAuth
- `POST /api/v1/oauth/token` - Obtener token de acceso
- `POST /api/v1/oauth/revoke` - Revocar un token
- `POST /api/v1/oauth/introspect` - Obtener detalles del token

### Envíos
- `POST /api/v1/quotations` - Crear cotización
- `GET /api/v1/quotations/:id` - Consultar cotización
- `POST /api/v1/shipments` - Crear envío

## 📊 Estructura de Datos

### Cotización (Quotation)

```javascript
{
  id: "qtn_xxx",
  is_completed: boolean,
  rates: [
    {
      id: "rate_xxx",
      carrier: "fedex",
      service_level_name: "FedEx Express",
      total_pricing: 250.00,
      days: 2
    }
  ]
}
```

### Envío (Shipment)

```javascript
{
  id: "ship_xxx",
  tracking_number: "123456789",
  label_url: "https://...",
  carrier: "fedex",
  status: "created"
}
```

## 🛠️ Métodos del Servicio

| Método | Descripción |
|--------|-------------|
| `initialize()` | Inicializar servicio y obtener token |
| `authenticate()` | Obtener nuevo token de acceso |
| `revokeToken()` | Revocar token actual |
| `introspectToken()` | Inspeccionar token actual |
| `createQuotation(data)` | Crear cotización |
| `getQuotation(id)` | Consultar cotización |
| `waitForQuotationCompletion(id)` | Esperar que cotización se complete |
| `createShipment(data)` | Crear envío |
| `createQuotationAndShipment(...)` | Flujo completo |
| `getStatus()` | Obtener estado del servicio |

## 📝 Licencia

Este código es parte del sistema Xpress Cont.

---

**Última actualización:** Diciembre 2025
**Versión:** 1.0.0
