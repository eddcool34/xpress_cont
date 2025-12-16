# Guía de Uso - Xpress Shipping API

Esta guía explica cómo integrar y usar la API de envíos de Skydropx en el sistema Xpress Cont.

## 📋 Tabla de Contenidos

1. [Configuración Inicial](#configuración-inicial)
2. [Autenticación OAuth](#autenticación-oauth)
3. [Crear Cotizaciones](#crear-cotizaciones)
4. [Consultar Cotizaciones](#consultar-cotizaciones)
5. [Crear Envíos](#crear-envíos)
6. [Flujo Completo](#flujo-completo)
7. [Integración con xpress_cont.html](#integración-con-xpress_conthtml)
8. [Manejo de Errores](#manejo-de-errores)
9. [Códigos de Referencia](#códigos-de-referencia)

---

## 🔧 Configuración Inicial

### 1. Obtener Credenciales

Primero, necesitas obtener tus credenciales OAuth desde el panel de Skydropx:

1. Accede a tu cuenta en https://app.skydropx.com
2. Ve a Configuración → API
3. Copia tu `CLIENT_ID` y `CLIENT_SECRET`

### 2. Configurar las Credenciales

Edita el archivo `config/xpress-shipping-api.js` y reemplaza los valores:

```javascript
OAUTH_CREDENTIALS: {
  CLIENT_ID: 'tu_client_id_real',         // ← Reemplazar aquí
  CLIENT_SECRET: 'tu_client_secret_real',  // ← Reemplazar aquí
  GRANT_TYPE: 'client_credentials',
  SCOPE: 'read write'
}
```

### 3. Incluir los Scripts en tu HTML

Agrega estas líneas en el `<head>` de tu archivo HTML:

```html
<!-- Configuración de la API -->
<script src="config/xpress-shipping-api.js"></script>

<!-- Servicio de envíos -->
<script src="services/xpress-shipping-service.js"></script>
```

---

## 🔐 Autenticación OAuth

### Inicializar el Servicio

```javascript
// Crear instancia del servicio
const shippingService = new XpressShippingService();

// Inicializar (obtiene o renueva el token automáticamente)
await shippingService.initialize();
```

### Gestión Automática de Tokens

El servicio maneja automáticamente:
- ✅ Obtención de token al inicializar
- ✅ Almacenamiento en localStorage
- ✅ Renovación automática cuando expira
- ✅ Validación antes de cada request

### Operaciones Manuales de Token (opcional)

```javascript
// Inspeccionar token actual
const tokenInfo = await shippingService.introspectToken();
console.log(tokenInfo);

// Revocar token
await shippingService.revokeToken();

// Ver estado del servicio
const status = shippingService.getStatus();
console.log(status);
// {
//   initialized: true,
//   hasToken: true,
//   tokenExpiry: "16/12/2025, 18:30:00",
//   tokenExpiringSoon: false
// }
```

---

## 📦 Crear Cotizaciones

### Paso 1: Preparar los Datos

```javascript
const quotationData = {
  // Información del remitente
  origin: {
    name: "Juan Pérez",
    company: "Xpress Cont",
    email: "juan@xpress.com",
    phone: "5551234567",
    street: "Calle Principal",
    number: "123",
    district: "Centro",
    city: "Ciudad de México",
    state: "CDMX",
    country: "MX",
    postalCode: "01000"
  },

  // Información del destinatario
  destination: {
    name: "María González",
    company: "Empresa ABC",
    email: "maria@example.com",
    phone: "5559876543",
    street: "Avenida Reforma",
    number: "456",
    district: "Juárez",
    city: "Guadalajara",
    state: "Jalisco",
    country: "MX",
    postalCode: "44100"
  },

  // Paquetes a enviar
  packages: [
    {
      content: "Documentos importantes",
      amount: 1,
      type: "box",
      weight: 1,
      insurance: 0,
      declaredValue: 100,
      weightUnit: "KG",
      lengthUnit: "CM",
      dimensions: {
        length: 20,
        width: 15,
        height: 10
      }
    }
  ]
};
```

### Paso 2: Crear la Cotización

```javascript
try {
  const quotation = await shippingService.createQuotation(quotationData);

  console.log('Cotización creada:', quotation.id);
  console.log('Estado:', quotation.is_completed ? 'Completada' : 'En proceso');

} catch (error) {
  console.error('Error al crear cotización:', error);
}
```

---

## 🔍 Consultar Cotizaciones

### Obtener una Cotización por ID

```javascript
const quotationId = 'qtn_123456';
const quotation = await shippingService.getQuotation(quotationId);

console.log('Cotización:', quotation);
console.log('Completada:', quotation.is_completed);
console.log('Rates disponibles:', quotation.rates.length);
```

### Esperar a que se Complete

Las cotizaciones se procesan progresivamente. Usa este método para esperar:

```javascript
const completedQuotation = await shippingService.waitForQuotationCompletion(
  'qtn_123456',
  10,    // Máximo 10 intentos
  2000   // Esperar 2 segundos entre intentos
);

console.log('Cotización completada:', completedQuotation);
```

### Analizar los Rates

```javascript
if (completedQuotation.is_completed) {
  completedQuotation.rates.forEach(rate => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Carrier:', rate.carrier);
    console.log('Servicio:', rate.service_level_name);
    console.log('Precio:', rate.total_pricing);
    console.log('Días estimados:', rate.days);
    console.log('Rate ID:', rate.id);
  });
}
```

**⚠️ IMPORTANTE:** Los rates son válidos por **24 horas** desde su creación.

---

## 🚚 Crear Envíos

### Paso 1: Seleccionar un Rate

```javascript
// Opción 1: Seleccionar el más barato
const cheapestRate = completedQuotation.rates.reduce((prev, current) =>
  (current.total_pricing < prev.total_pricing) ? current : prev
);

// Opción 2: Seleccionar por carrier específico
const fedexRate = completedQuotation.rates.find(r => r.carrier === 'fedex');

// Opción 3: Seleccionar el más rápido
const fastestRate = completedQuotation.rates.reduce((prev, current) =>
  (current.days < prev.days) ? current : prev
);
```

### Paso 2: Crear el Envío

```javascript
const shipmentData = {
  quotation_id: completedQuotation.id,
  rate_id: cheapestRate.id,
  carrier_name: cheapestRate.carrier,  // 'fedex', 'estafeta', 'dhl', etc.
  consignment_note: 'CNT001',          // Código de Carta Porte (si aplica)
  package_type: 'PKG001'               // Código de tipo de paquete (si aplica)
};

try {
  const shipment = await shippingService.createShipment(shipmentData);

  console.log('✅ Envío creado exitosamente');
  console.log('ID del envío:', shipment.id);
  console.log('Número de guía:', shipment.tracking_number);
  console.log('Etiqueta (label):', shipment.label_url);

  // Guardar o mostrar la etiqueta
  window.open(shipment.label_url, '_blank');

} catch (error) {
  console.error('❌ Error al crear envío:', error);
}
```

---

## 🔄 Flujo Completo

El servicio incluye un método que combina cotización + envío en un solo paso:

```javascript
const result = await shippingService.createQuotationAndShipment(
  quotationData,

  // Función para seleccionar el rate deseado
  (rates) => {
    // Seleccionar el más barato
    return rates.reduce((prev, current) =>
      (current.total_pricing < prev.total_pricing) ? current : prev
    );
  },

  // Datos adicionales del envío
  {
    carrier_name: 'fedex',
    consignment_note: 'CNT001',
    package_type: 'PKG001'
  }
);

console.log('Cotización:', result.quotation);
console.log('Rate seleccionado:', result.selectedRate);
console.log('Envío creado:', result.shipment);
console.log('Número de guía:', result.shipment.tracking_number);
```

---

## 🔌 Integración con xpress_cont.html

### Ejemplo de Integración en el Formulario de Envíos

Agrega un botón para crear envío con la API:

```javascript
// En el componente App de React
const crearEnvioConAPI = async () => {
  try {
    // Obtener datos del formulario actual
    const quotationData = {
      origin: {
        name: formData.nombreRemitente,
        phone: formData.telefonoRemitente,
        street: formData.direccion,
        number: formData.numero,
        district: formData.colonia,
        city: formData.ciudad || 'Ciudad de México',
        state: formData.estado,
        country: formData.pais,
        postalCode: formData.codigoPostal
      },
      destination: {
        name: formData.nombreDestinatario,
        phone: formData.telefonoDestinatario,
        street: formData.direccionDestino || formData.direccion,
        // ... resto de campos
      },
      packages: [
        {
          content: formData.descripcion || 'Paquete',
          amount: 1,
          type: 'box',
          weight: formData.peso || 1,
          insurance: 0,
          declaredValue: parseFloat(formData.precio) || 100,
          weightUnit: 'KG',
          lengthUnit: 'CM',
          dimensions: {
            length: 20,
            width: 15,
            height: 10
          }
        }
      ]
    };

    // Crear cotización y envío
    const result = await shippingService.createQuotationAndShipment(
      quotationData,
      (rates) => rates[0], // Seleccionar el primer rate disponible
      {
        carrier_name: formData.paqueteria,
        consignment_note: 'CNT001',
        package_type: 'PKG001'
      }
    );

    // Actualizar el formulario con el número de guía
    setFormData({
      ...formData,
      numeroGuia: result.shipment.tracking_number
    });

    // Mostrar notificación de éxito
    setNotification({
      tipo: 'exito',
      mensaje: `Envío creado exitosamente. Guía: ${result.shipment.tracking_number}`
    });

    // Abrir etiqueta en nueva ventana
    if (result.shipment.label_url) {
      window.open(result.shipment.label_url, '_blank');
    }

  } catch (error) {
    setNotification({
      tipo: 'error',
      mensaje: `Error al crear envío: ${error.message}`
    });
  }
};
```

### Agregar Botón en el JSX

```jsx
<button
  onClick={crearEnvioConAPI}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
>
  Crear Envío con API
</button>
```

---

## ⚠️ Manejo de Errores

### Errores Comunes y Soluciones

| Error | Causa | Solución |
|-------|-------|----------|
| `Credenciales no están configuradas` | CLIENT_ID o CLIENT_SECRET no configurados | Editar `config/xpress-shipping-api.js` |
| `Credenciales inválidas` | CLIENT_ID o CLIENT_SECRET incorrectos | Verificar credenciales en Skydropx |
| `quotation_id y rate_id son requeridos` | Faltan parámetros al crear envío | Proporcionar ambos IDs |
| `Timeout esperando completar cotización` | La cotización tomó demasiado tiempo | Aumentar `maxAttempts` o verificar API |
| `No hay rates disponibles` | No hay servicios para la ruta solicitada | Verificar códigos postales y direcciones |

### Try-Catch Recomendado

```javascript
try {
  await shippingService.initialize();
  const result = await shippingService.createQuotation(data);
  // ... procesar resultado

} catch (error) {
  if (error.message.includes('Credenciales')) {
    console.error('Error de autenticación:', error);
    // Mostrar mensaje al usuario para revisar configuración
  } else if (error.message.includes('Network')) {
    console.error('Error de red:', error);
    // Reintentar o mostrar mensaje de conexión
  } else {
    console.error('Error desconocido:', error);
  }
}
```

---

## 📋 Códigos de Referencia

### Carriers Soportados

```javascript
'fedex'
'estafeta'
'dhl'
'ups'
'redpack'
'paquetexpress'
// ... consultar documentación oficial para lista completa
```

### Tipos de Servicio

```javascript
'nacional'      // Envíos dentro de México
'internacional' // Envíos fuera de México
```

### Tipos de Paquete

```javascript
'box'       // Caja
'envelope'  // Sobre
'pak'       // Paquete PAK
```

### Unidades de Peso

```javascript
'KG'  // Kilogramos
'LB'  // Libras
```

### Unidades de Longitud

```javascript
'CM'  // Centímetros
'IN'  // Pulgadas
```

---

## 🔗 Referencias

- **Documentación oficial Skydropx:** https://app.skydropx.com/api/v1/docs
- **Panel de Skydropx:** https://app.skydropx.com
- **Archivo de configuración:** `/config/xpress-shipping-api.js`
- **Archivo de servicio:** `/services/xpress-shipping-service.js`

---

## 💡 Consejos y Mejores Prácticas

1. **Siempre esperar a que la cotización se complete** antes de crear el envío
2. **Validar los rates** disponibles antes de seleccionar uno
3. **Guardar el tracking_number** en tu base de datos local
4. **Verificar que el token esté activo** antes de operaciones críticas
5. **Manejar errores apropiadamente** y mostrar mensajes al usuario
6. **Testear en ambiente de pruebas** antes de producción

---

## 📞 Soporte

Si tienes problemas con la integración:

1. Revisa los logs en la consola del navegador
2. Verifica que las credenciales estén correctamente configuradas
3. Consulta la documentación oficial de Skydropx
4. Verifica el estado del servicio con `shippingService.getStatus()`

---

**Última actualización:** Diciembre 2025
**Versión:** 1.0.0
