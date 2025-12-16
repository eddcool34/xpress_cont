/**
 * Servicio de Xpress Shipping API
 *
 * Este servicio maneja todas las operaciones relacionadas con la API de envíos:
 * - Autenticación OAuth
 * - Gestión de tokens
 * - Cotizaciones
 * - Creación de envíos
 *
 * Uso:
 *   const shippingService = new XpressShippingService();
 *   await shippingService.initialize();
 *   const quotation = await shippingService.createQuotation(data);
 */

class XpressShippingService {
  constructor(config = null) {
    // Usar configuración proporcionada o la global
    this.config = config || (typeof XPRESS_SHIPPING_CONFIG !== 'undefined' ? XPRESS_SHIPPING_CONFIG : null);

    if (!this.config) {
      throw new Error('Configuración no disponible. Asegúrate de cargar config/xpress-shipping-api.js');
    }

    this.accessToken = null;
    this.tokenExpiry = null;
    this.isInitialized = false;
  }

  /**
   * Inicializar el servicio
   * Intenta cargar token existente o obtiene uno nuevo
   */
  async initialize() {
    try {
      // Validar configuración
      if (typeof XpressShippingConfigUtils !== 'undefined') {
        XpressShippingConfigUtils.validateConfig();
      }

      // Intentar cargar token existente
      const loaded = this.loadTokenFromStorage();

      if (!loaded || this.isTokenExpiringSoon()) {
        // Si no hay token o está por expirar, obtener uno nuevo
        await this.authenticate();
      }

      this.isInitialized = true;
      console.log('[XpressShipping] Servicio inicializado correctamente');
      return true;
    } catch (error) {
      console.error('[XpressShipping] Error al inicializar:', error);
      throw error;
    }
  }

  /**
   * ========================================
   * GESTIÓN DE TOKENS
   * ========================================
   */

  /**
   * Cargar token desde localStorage
   * @returns {boolean} true si se cargó correctamente
   */
  loadTokenFromStorage() {
    try {
      const token = localStorage.getItem(this.config.TOKEN_CONFIG.STORAGE_KEY);
      const expiry = localStorage.getItem(this.config.TOKEN_CONFIG.EXPIRY_KEY);

      if (token && expiry) {
        this.accessToken = token;
        this.tokenExpiry = parseInt(expiry, 10);

        // Verificar si el token sigue siendo válido
        if (Date.now() < this.tokenExpiry) {
          console.log('[XpressShipping] Token cargado desde localStorage');
          return true;
        } else {
          console.log('[XpressShipping] Token expirado');
          this.clearToken();
        }
      }
      return false;
    } catch (error) {
      console.error('[XpressShipping] Error al cargar token:', error);
      return false;
    }
  }

  /**
   * Guardar token en localStorage
   * @param {string} token - Token de acceso
   * @param {number} expiresIn - Tiempo de expiración en segundos
   */
  saveTokenToStorage(token, expiresIn) {
    try {
      this.accessToken = token;
      // Calcular timestamp de expiración (actual + expiresIn en milisegundos)
      this.tokenExpiry = Date.now() + (expiresIn * 1000);

      localStorage.setItem(this.config.TOKEN_CONFIG.STORAGE_KEY, token);
      localStorage.setItem(this.config.TOKEN_CONFIG.EXPIRY_KEY, this.tokenExpiry.toString());

      console.log('[XpressShipping] Token guardado. Expira en:', new Date(this.tokenExpiry).toLocaleString());
    } catch (error) {
      console.error('[XpressShipping] Error al guardar token:', error);
    }
  }

  /**
   * Limpiar token almacenado
   */
  clearToken() {
    this.accessToken = null;
    this.tokenExpiry = null;
    localStorage.removeItem(this.config.TOKEN_CONFIG.STORAGE_KEY);
    localStorage.removeItem(this.config.TOKEN_CONFIG.EXPIRY_KEY);
  }

  /**
   * Verificar si el token está por expirar
   * @returns {boolean} true si expira pronto
   */
  isTokenExpiringSoon() {
    if (!this.tokenExpiry) return true;

    const marginMs = this.config.TOKEN_CONFIG.REFRESH_MARGIN * 1000;
    return Date.now() >= (this.tokenExpiry - marginMs);
  }

  /**
   * ========================================
   * AUTENTICACIÓN OAUTH
   * ========================================
   */

  /**
   * Obtener token de acceso
   * POST /api/v1/oauth/token
   */
  async authenticate() {
    try {
      console.log('[XpressShipping] Autenticando...');

      const url = this.getFullUrl(this.config.OAUTH_ENDPOINTS.TOKEN);
      const body = {
        grant_type: this.config.OAUTH_CREDENTIALS.GRANT_TYPE,
        client_id: this.config.OAUTH_CREDENTIALS.CLIENT_ID,
        client_secret: this.config.OAUTH_CREDENTIALS.CLIENT_SECRET,
        scope: this.config.OAUTH_CREDENTIALS.SCOPE
      };

      const response = await this.makeRequest(url, {
        method: 'POST',
        headers: this.config.DEFAULT_HEADERS,
        body: JSON.stringify(body)
      }, false); // false = no usar token de autorización aún

      if (response.access_token) {
        this.saveTokenToStorage(response.access_token, response.expires_in);
        console.log('[XpressShipping] Autenticación exitosa');
        return response;
      } else {
        throw new Error('Respuesta de autenticación inválida');
      }
    } catch (error) {
      console.error('[XpressShipping] Error de autenticación:', error);
      throw new Error(`Autenticación fallida: ${error.message}`);
    }
  }

  /**
   * Revocar token actual
   * POST /api/v1/oauth/revoke
   */
  async revokeToken() {
    try {
      if (!this.accessToken) {
        console.warn('[XpressShipping] No hay token para revocar');
        return;
      }

      const url = this.getFullUrl(this.config.OAUTH_ENDPOINTS.REVOKE);
      const body = {
        client_id: this.config.OAUTH_CREDENTIALS.CLIENT_ID,
        client_secret: this.config.OAUTH_CREDENTIALS.CLIENT_SECRET,
        token: this.accessToken,
        token_type_hint: 'access_token'
      };

      await this.makeRequest(url, {
        method: 'POST',
        headers: this.config.DEFAULT_HEADERS,
        body: JSON.stringify(body)
      }, false);

      this.clearToken();
      console.log('[XpressShipping] Token revocado exitosamente');
    } catch (error) {
      console.error('[XpressShipping] Error al revocar token:', error);
      throw error;
    }
  }

  /**
   * Obtener detalles del token actual
   * POST /api/v1/oauth/introspect
   */
  async introspectToken() {
    try {
      if (!this.accessToken) {
        throw new Error('No hay token disponible para inspeccionar');
      }

      const url = this.getFullUrl(this.config.OAUTH_ENDPOINTS.INTROSPECT);
      const body = {
        client_id: this.config.OAUTH_CREDENTIALS.CLIENT_ID,
        client_secret: this.config.OAUTH_CREDENTIALS.CLIENT_SECRET,
        token: this.accessToken,
        token_type_hint: 'access_token'
      };

      const response = await this.makeRequest(url, {
        method: 'POST',
        headers: this.config.DEFAULT_HEADERS,
        body: JSON.stringify(body)
      }, false);

      return response;
    } catch (error) {
      console.error('[XpressShipping] Error al inspeccionar token:', error);
      throw error;
    }
  }

  /**
   * ========================================
   * COTIZACIONES
   * ========================================
   */

  /**
   * Crear una cotización
   * POST /api/v1/quotations
   *
   * @param {Object} quotationData - Datos de la cotización
   * @returns {Promise<Object>} Cotización creada con rates disponibles
   *
   * Ejemplo de quotationData:
   * {
   *   origin: {
   *     name: "Juan Pérez",
   *     company: "Xpress Cont",
   *     email: "juan@example.com",
   *     phone: "5551234567",
   *     street: "Calle Principal",
   *     number: "123",
   *     district: "Centro",
   *     city: "Ciudad de México",
   *     state: "CDMX",
   *     country: "MX",
   *     postalCode: "01000"
   *   },
   *   destination: {
   *     name: "María González",
   *     company: "Empresa ABC",
   *     email: "maria@example.com",
   *     phone: "5559876543",
   *     street: "Avenida Reforma",
   *     number: "456",
   *     district: "Juárez",
   *     city: "Guadalajara",
   *     state: "Jalisco",
   *     country: "MX",
   *     postalCode: "44100"
   *   },
   *   packages: [
   *     {
   *       content: "Documentos",
   *       amount: 1,
   *       type: "box",
   *       weight: 1,
   *       insurance: 0,
   *       declaredValue: 100,
   *       weightUnit: "KG",
   *       lengthUnit: "CM",
   *       dimensions: {
   *         length: 10,
   *         width: 10,
   *         height: 10
   *       }
   *     }
   *   ]
   * }
   */
  async createQuotation(quotationData) {
    try {
      await this.ensureValidToken();

      const url = this.getFullUrl(this.config.SHIPMENT_ENDPOINTS.QUOTATIONS);

      console.log('[XpressShipping] Creando cotización...');
      const response = await this.makeRequest(url, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(quotationData)
      });

      console.log('[XpressShipping] Cotización creada:', response.id);
      return response;
    } catch (error) {
      console.error('[XpressShipping] Error al crear cotización:', error);
      throw error;
    }
  }

  /**
   * Obtener detalles de una cotización
   * GET /api/v1/quotations/:id
   *
   * @param {string} quotationId - ID de la cotización
   * @returns {Promise<Object>} Detalles de la cotización con rates
   *
   * IMPORTANTE: Las cotizaciones se completan progresivamente.
   * Verificar el campo 'is_completed' para saber si todos los rates están listos.
   * Los rates son válidos por 24 horas desde su creación.
   */
  async getQuotation(quotationId) {
    try {
      await this.ensureValidToken();

      const url = this.getFullUrl(`${this.config.SHIPMENT_ENDPOINTS.QUOTATIONS}/${quotationId}`);

      console.log('[XpressShipping] Consultando cotización:', quotationId);
      const response = await this.makeRequest(url, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      console.log('[XpressShipping] Cotización obtenida. Completada:', response.is_completed);
      return response;
    } catch (error) {
      console.error('[XpressShipping] Error al obtener cotización:', error);
      throw error;
    }
  }

  /**
   * Esperar a que una cotización se complete
   * @param {string} quotationId - ID de la cotización
   * @param {number} maxAttempts - Máximo de intentos
   * @param {number} delayMs - Delay entre intentos en ms
   * @returns {Promise<Object>} Cotización completada
   */
  async waitForQuotationCompletion(quotationId, maxAttempts = 10, delayMs = 2000) {
    for (let i = 0; i < maxAttempts; i++) {
      const quotation = await this.getQuotation(quotationId);

      if (quotation.is_completed) {
        console.log('[XpressShipping] Cotización completada');
        return quotation;
      }

      console.log(`[XpressShipping] Cotización en proceso... Intento ${i + 1}/${maxAttempts}`);
      await this.delay(delayMs);
    }

    throw new Error('Timeout esperando completar cotización');
  }

  /**
   * ========================================
   * ENVÍOS
   * ========================================
   */

  /**
   * Crear un envío
   * POST /api/v1/shipments
   *
   * @param {Object} shipmentData - Datos del envío
   * @returns {Promise<Object>} Envío creado con guía y etiqueta
   *
   * Ejemplo de shipmentData:
   * {
   *   quotation_id: "qtn_123456",
   *   rate_id: "rate_789012",
   *   carrier_name: "fedex",
   *   consignment_note: "CNT001",  // Código de Carta Porte
   *   package_type: "PKG001"        // Código de tipo de paquete
   * }
   *
   * IMPORTANTE:
   * - quotation_id: ID de la cotización previamente creada
   * - rate_id: ID del rate seleccionado de la cotización
   * - carrier_name: Nombre exacto de la paquetería (fedex, estafeta, dhl, etc.)
   * - consignment_note: Código de Carta Porte (requerido según carrier)
   * - package_type: Código de tipo de paquete (requerido según carrier)
   */
  async createShipment(shipmentData) {
    try {
      await this.ensureValidToken();

      // Validar datos requeridos
      if (!shipmentData.quotation_id || !shipmentData.rate_id) {
        throw new Error('quotation_id y rate_id son requeridos');
      }

      const url = this.getFullUrl(this.config.SHIPMENT_ENDPOINTS.SHIPMENTS);

      console.log('[XpressShipping] Creando envío...');
      const response = await this.makeRequest(url, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(shipmentData)
      });

      console.log('[XpressShipping] Envío creado:', response.id);
      console.log('[XpressShipping] Número de guía:', response.tracking_number);
      return response;
    } catch (error) {
      console.error('[XpressShipping] Error al crear envío:', error);
      throw error;
    }
  }

  /**
   * ========================================
   * FLUJO COMPLETO: COTIZACIÓN + ENVÍO
   * ========================================
   */

  /**
   * Crear cotización, esperar completación, y crear envío en un solo flujo
   *
   * @param {Object} quotationData - Datos de la cotización
   * @param {Function} rateSelector - Función para seleccionar el rate deseado
   * @param {Object} extraShipmentData - Datos adicionales para el envío
   * @returns {Promise<Object>} Envío creado
   *
   * Ejemplo de uso:
   * const shipment = await service.createQuotationAndShipment(
   *   quotationData,
   *   (rates) => rates[0], // Seleccionar el primer rate
   *   {
   *     carrier_name: 'fedex',
   *     consignment_note: 'CNT001',
   *     package_type: 'PKG001'
   *   }
   * );
   */
  async createQuotationAndShipment(quotationData, rateSelector, extraShipmentData = {}) {
    try {
      // 1. Crear cotización
      const quotation = await this.createQuotation(quotationData);

      // 2. Esperar a que se complete
      const completedQuotation = await this.waitForQuotationCompletion(quotation.id);

      // 3. Seleccionar rate
      if (!completedQuotation.rates || completedQuotation.rates.length === 0) {
        throw new Error('No hay rates disponibles en la cotización');
      }

      const selectedRate = rateSelector(completedQuotation.rates);
      if (!selectedRate) {
        throw new Error('No se seleccionó ningún rate');
      }

      console.log('[XpressShipping] Rate seleccionado:', selectedRate.id, '-', selectedRate.carrier);

      // 4. Crear envío
      const shipmentData = {
        quotation_id: completedQuotation.id,
        rate_id: selectedRate.id,
        ...extraShipmentData
      };

      const shipment = await this.createShipment(shipmentData);

      return {
        quotation: completedQuotation,
        selectedRate,
        shipment
      };
    } catch (error) {
      console.error('[XpressShipping] Error en flujo completo:', error);
      throw error;
    }
  }

  /**
   * ========================================
   * MÉTODOS AUXILIARES
   * ========================================
   */

  /**
   * Asegurar que hay un token válido
   */
  async ensureValidToken() {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (this.isTokenExpiringSoon()) {
      console.log('[XpressShipping] Token por expirar, renovando...');
      await this.authenticate();
    }
  }

  /**
   * Obtener headers con autorización
   */
  getAuthHeaders() {
    return {
      ...this.config.DEFAULT_HEADERS,
      'Authorization': `Bearer ${this.accessToken}`
    };
  }

  /**
   * Obtener URL completa
   */
  getFullUrl(endpoint) {
    return `${this.config.BASE_URL}${endpoint}`;
  }

  /**
   * Realizar una petición HTTP con retry logic
   */
  async makeRequest(url, options, useAuth = true) {
    const maxRetries = this.config.REQUEST_CONFIG.RETRY_ATTEMPTS;
    const retryDelay = this.config.REQUEST_CONFIG.RETRY_DELAY;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.config.REQUEST_CONFIG.TIMEOUT);

        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });

        clearTimeout(timeout);

        // Parsear respuesta
        const data = await response.json();

        // Verificar errores HTTP
        if (!response.ok) {
          throw new Error(data.error_description || data.error || `HTTP ${response.status}`);
        }

        return data;
      } catch (error) {
        console.error(`[XpressShipping] Intento ${attempt}/${maxRetries} falló:`, error.message);

        if (attempt === maxRetries) {
          throw error;
        }

        // Esperar antes de reintentar
        await this.delay(retryDelay * attempt);
      }
    }
  }

  /**
   * Utilidad de delay
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Obtener información del estado del servicio
   */
  getStatus() {
    return {
      initialized: this.isInitialized,
      hasToken: !!this.accessToken,
      tokenExpiry: this.tokenExpiry ? new Date(this.tokenExpiry).toLocaleString() : null,
      tokenExpiringSoon: this.isTokenExpiringSoon()
    };
  }
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = XpressShippingService;
}
