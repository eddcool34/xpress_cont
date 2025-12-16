/**
 * Configuración de la API de Xpress Shipping (Skydropx)
 *
 * Este archivo contiene todas las configuraciones necesarias para
 * integrar la API de envíos en el sistema Xpress Cont.
 *
 * Documentación oficial: https://app.skydropx.com/api/v1/docs
 */

const XPRESS_SHIPPING_CONFIG = {
  /**
   * URL base de la API de Skydropx
   */
  BASE_URL: 'https://app.skydropx.com/api/v1',

  /**
   * Endpoints de OAuth
   */
  OAUTH_ENDPOINTS: {
    TOKEN: '/oauth/token',        // Obtener token de acceso
    REVOKE: '/oauth/revoke',      // Revocar un token
    INTROSPECT: '/oauth/introspect' // Obtener detalles del token
  },

  /**
   * Endpoints de operaciones de envío
   */
  SHIPMENT_ENDPOINTS: {
    QUOTATIONS: '/quotations',    // Crear y consultar cotizaciones
    SHIPMENTS: '/shipments'       // Crear envíos
  },

  /**
   * Credenciales OAuth (IMPORTANTE: Configurar con valores reales)
   *
   * SEGURIDAD: Estas credenciales deben obtenerse del panel de Skydropx
   * y NO deben compartirse públicamente. En producción, considerar usar
   * variables de entorno o un backend seguro.
   */
  OAUTH_CREDENTIALS: {
    CLIENT_ID: 'TU_CLIENT_ID_AQUI',         // Reemplazar con tu Client ID
    CLIENT_SECRET: 'TU_CLIENT_SECRET_AQUI',  // Reemplazar con tu Client Secret
    GRANT_TYPE: 'client_credentials',        // Tipo de autenticación
    SCOPE: 'read write'                      // Permisos de acceso
  },

  /**
   * Configuración de tokens
   */
  TOKEN_CONFIG: {
    STORAGE_KEY: 'xpress_shipping_token',    // Clave para localStorage
    EXPIRY_KEY: 'xpress_shipping_token_expiry', // Clave para fecha de expiración
    REFRESH_MARGIN: 300  // Renovar token 5 minutos antes de expirar (en segundos)
  },

  /**
   * Configuración de timeout para requests
   */
  REQUEST_CONFIG: {
    TIMEOUT: 30000,  // 30 segundos
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000  // 1 segundo entre intentos
  },

  /**
   * Códigos de Carta Porte y tipos de paquete
   * Estos códigos son requeridos al crear envíos
   */
  CONSIGNMENT_NOTE_CODES: {
    // Lista de códigos de Carta Porte válidos
    // Consultar documentación oficial para códigos específicos
  },

  PACKAGE_TYPES: {
    // Lista de tipos de paquete válidos
    // Consultar documentación oficial para tipos específicos
  },

  /**
   * Carriers (Paqueterías) soportados
   * Debe coincidir con los nombres esperados por la API
   */
  CARRIERS: {
    FEDEX: 'fedex',
    ESTAFETA: 'estafeta',
    DHL: 'dhl',
    // Agregar más carriers según necesidad
  },

  /**
   * Tipos de servicio
   */
  SERVICE_TYPES: {
    NACIONAL: 'nacional',
    INTERNACIONAL: 'internacional'
  },

  /**
   * Validez de cotizaciones (en horas)
   */
  QUOTATION_VALIDITY: 24,

  /**
   * Headers por defecto para requests
   */
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

/**
 * Métodos de utilidad para configuración
 */
const XpressShippingConfigUtils = {
  /**
   * Obtener URL completa de un endpoint
   * @param {string} endpoint - Endpoint relativo
   * @returns {string} URL completa
   */
  getFullUrl: function(endpoint) {
    return `${XPRESS_SHIPPING_CONFIG.BASE_URL}${endpoint}`;
  },

  /**
   * Verificar si las credenciales están configuradas
   * @returns {boolean} true si están configuradas
   */
  areCredentialsConfigured: function() {
    const { CLIENT_ID, CLIENT_SECRET } = XPRESS_SHIPPING_CONFIG.OAUTH_CREDENTIALS;
    return CLIENT_ID !== 'TU_CLIENT_ID_AQUI' &&
           CLIENT_SECRET !== 'TU_CLIENT_SECRET_AQUI';
  },

  /**
   * Validar configuración básica
   * @throws {Error} si la configuración es inválida
   */
  validateConfig: function() {
    if (!this.areCredentialsConfigured()) {
      throw new Error('Las credenciales OAuth no están configuradas. Por favor, actualiza CLIENT_ID y CLIENT_SECRET en config/xpress-shipping-api.js');
    }
  }
};

// Exportar configuración para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    XPRESS_SHIPPING_CONFIG,
    XpressShippingConfigUtils
  };
}
