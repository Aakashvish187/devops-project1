/**
 * LACSO HUB — Global Localization Engine v3.0
 * ─────────────────────────────────────────────────────────────────────────
 * Features:
 *   • IP geolocation via ipapi.co (with ipwho.is fallback)
 *   • 195-country coverage for language & currency detection
 *   • India Rule: IN visitors always stay in English
 *   • Auto-translate for low-English countries via Google Translate
 *   • Real-time currency conversion (exchangerate-api.com + fallbacks)
 *   • 120+ currency support with correct symbols
 *   • localStorage caching (24h TTL) — no repeated API calls
 *   • Stripe-style geo popup for non-English visitors
 *   • Manual override via language + currency selectors
 * ─────────────────────────────────────────────────────────────────────────
 */

(function () {
    'use strict';

    /* ────────────────────────────────────────────────────────────────────
       COUNTRY → LANGUAGE MAP  (195 countries)
    ──────────────────────────────────────────────────────────────────── */
    const COUNTRY_LANG = {
        // English-default countries (return 'en')
        'US': 'en', 'GB': 'en', 'AU': 'en', 'NZ': 'en', 'CA': 'en',
        'IE': 'en', 'ZA': 'en', 'NG': 'en', 'GH': 'en', 'KE': 'en',
        'UG': 'en', 'TZ': 'en', 'ZW': 'en', 'ZM': 'en', 'MW': 'en',
        'SG': 'en', 'PH': 'en', 'PK': 'en', 'BD': 'en', 'LK': 'en',
        'MM': 'en', 'JM': 'en', 'TT': 'en', 'BS': 'en', 'BB': 'en',
        'BZ': 'en', 'GY': 'en', 'MT': 'en', 'CY': 'en', 'FJ': 'en',
        'PG': 'en', 'SB': 'en', 'VU': 'en', 'TO': 'en', 'WS': 'en',
        'KI': 'en', 'NR': 'en', 'TV': 'en', 'MV': 'en', 'SC': 'en',
        'MU': 'en', 'BW': 'en', 'NA': 'en', 'LS': 'en', 'SZ': 'en',
        'RW': 'en', 'BI': 'en', 'ET': 'en', 'ER': 'en', 'SS': 'en',

        // India Rule — ALWAYS English regardless of detection
        'IN': 'en',

        // Spanish
        'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'CL': 'es',
        'PE': 'es', 'VE': 'es', 'EC': 'es', 'GT': 'es', 'CU': 'es',
        'BO': 'es', 'DO': 'es', 'HN': 'es', 'PY': 'es', 'SV': 'es',
        'NI': 'es', 'CR': 'es', 'PA': 'es', 'UY': 'es', 'GQ': 'es',

        // French
        'FR': 'fr', 'BE': 'fr', 'CH': 'fr', 'LU': 'fr', 'MC': 'fr',
        'CI': 'fr', 'SN': 'fr', 'CM': 'fr', 'MG': 'fr', 'ML': 'fr',
        'BF': 'fr', 'NE': 'fr', 'TD': 'fr', 'GN': 'fr', 'BJ': 'fr',
        'TG': 'fr', 'CF': 'fr', 'CD': 'fr', 'CG': 'fr', 'GA': 'fr',
        'GW': 'fr', 'CV': 'fr', 'KM': 'fr', 'DJ': 'fr', 'MR': 'fr',
        'HT': 'fr', 'PF': 'fr',

        // German
        'DE': 'de', 'AT': 'de',

        // Portuguese
        'BR': 'pt', 'PT': 'pt', 'AO': 'pt', 'MZ': 'pt', 'ST': 'pt',

        // Arabic
        'SA': 'ar', 'AE': 'ar', 'EG': 'ar', 'IQ': 'ar', 'SY': 'ar',
        'JO': 'ar', 'LB': 'ar', 'KW': 'ar', 'QA': 'ar', 'BH': 'ar',
        'OM': 'ar', 'YE': 'ar', 'LY': 'ar', 'TN': 'ar', 'DZ': 'ar',
        'MA': 'ar', 'SD': 'ar', 'SO': 'ar', 'MR': 'ar',

        // Chinese
        'CN': 'zh-CN', 'TW': 'zh-TW', 'HK': 'zh-TW', 'MO': 'zh-TW',

        // Japanese
        'JP': 'ja',

        // Korean
        'KR': 'ko',

        // Russian
        'RU': 'ru', 'BY': 'ru', 'KZ': 'ru',

        // Ukrainian
        'UA': 'uk',

        // Turkish
        'TR': 'tr', 'AZ': 'tr',

        // Italian
        'IT': 'it', 'SM': 'it',

        // Dutch
        'NL': 'nl',

        // Polish
        'PL': 'pl',

        // Hindi (only for non-India users who want Hindi)
        // Not auto-applied; available in selector

        // Indonesian
        'ID': 'id',

        // Vietnamese
        'VN': 'vi',

        // Thai
        'TH': 'th',

        // Malaysian
        'MY': 'ms',

        // Swahili
        'KE': 'sw', 'TZ': 'sw',

        // Farsi / Persian
        'IR': 'fa',

        // Hebrew
        'IL': 'iw',

        // Greek
        'GR': 'el', 'CY': 'el',

        // Romanian
        'RO': 'ro', 'MD': 'ro',

        // Hungarian
        'HU': 'hu',

        // Czech
        'CZ': 'cs',

        // Slovak
        'SK': 'sk',

        // Bulgarian
        'BG': 'bg',

        // Croatian
        'HR': 'hr',

        // Serbian
        'RS': 'sr',

        // Finnish
        'FI': 'fi',

        // Swedish
        'SE': 'sv', 'AX': 'sv',

        // Norwegian
        'NO': 'no',

        // Danish
        'DK': 'da',

        // Icelandic
        'IS': 'is',

        // Catalan (Spain region - still use es)
        // Afrikaans
        'ZA': 'af',

        // Amharic
        'ET': 'am',

        // Bengali
        'BD': 'bn',

        // Nepali
        'NP': 'ne',

        // Sinhalese
        'LK': 'si',

        // Burmese
        'MM': 'my',

        // Khmer
        'KH': 'km',

        // Lao
        'LA': 'lo',

        // Mongolian
        'MN': 'mn',

        // Azerbaijani
        'AZ': 'az',

        // Georgian
        'GE': 'ka',

        // Armenian
        'AM': 'hy',

        // Albanian
        'AL': 'sq',

        // Macedonian
        'MK': 'mk',

        // Bosnian
        'BA': 'bs',

        // Slovenian
        'SI': 'sl',

        // Lithuanian
        'LT': 'lt',

        // Latvian
        'LV': 'lv',

        // Estonian
        'EE': 'et',

        // Kazakh
        'KZ': 'kk',

        // Uzbek
        'UZ': 'uz',

        // Tajik
        'TJ': 'tg',

        // Kyrgyz
        'KG': 'ky',

        // Turkmen
        'TM': 'tk',

        // Haitian Creole
        'HT': 'ht',

        // Swahili
        'TZ': 'sw',

        // Igbo / Yoruba (Nigeria → English official)
        // Myanmar
        'MM': 'my',

        // Papua New Guinea
        'PG': 'en'
    };

    /* ────────────────────────────────────────────────────────────────────
       COUNTRIES WHERE ENGLISH IS LOW — auto-translate these
    ──────────────────────────────────────────────────────────────────── */
    const LOW_ENGLISH_COUNTRIES = new Set([
        'ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO',
        'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'GQ',
        'FR', 'BE', 'LU', 'MC', 'CI', 'SN', 'CM', 'MG', 'ML', 'BF', 'NE',
        'TD', 'GN', 'BJ', 'TG', 'CF', 'CD', 'CG', 'GA', 'HT',
        'DE', 'AT',
        'PT', 'BR', 'AO', 'MZ',
        'SA', 'AE', 'EG', 'IQ', 'SY', 'JO', 'KW', 'QA', 'BH', 'OM', 'YE',
        'LY', 'TN', 'DZ', 'MA', 'SD',
        'CN', 'TW', 'HK', 'MO',
        'JP',
        'KR',
        'RU', 'BY',
        'TR',
        'IT',
        'NL',
        'PL', 'CZ', 'SK', 'HU', 'RO', 'BG', 'HR', 'RS', 'UA',
        'ID', 'VN', 'TH', 'MY', 'KH', 'LA', 'MM',
        'IR', 'IL',
        'GR', 'AL', 'MK', 'BA', 'SI',
        'LT', 'LV', 'EE',
        'KZ', 'UZ', 'AZ', 'GE', 'AM',
        'SE', 'FI', 'NO', 'DK', 'IS',
        'MN', 'TJ',
    ]);

    /* ────────────────────────────────────────────────────────────────────
       COUNTRY → CURRENCY MAP  (120+ currencies)
    ──────────────────────────────────────────────────────────────────── */
    const COUNTRY_CURRENCY = {
        'US': 'USD', 'EC': 'USD', 'SV': 'USD', 'PA': 'USD', 'ZW': 'USD',
        'GB': 'GBP', 'GG': 'GBP', 'JE': 'GBP', 'IM': 'GBP',
        'IN': 'INR',
        'EU': 'EUR', 'DE': 'EUR', 'FR': 'EUR', 'ES': 'EUR', 'IT': 'EUR',
        'NL': 'EUR', 'BE': 'EUR', 'AT': 'EUR', 'PT': 'EUR', 'GR': 'EUR',
        'FI': 'EUR', 'IE': 'EUR', 'LU': 'EUR', 'SK': 'EUR', 'SI': 'EUR',
        'EE': 'EUR', 'LV': 'EUR', 'LT': 'EUR', 'HR': 'EUR', 'MT': 'EUR',
        'CY': 'EUR', 'MC': 'EUR', 'SM': 'EUR', 'VA': 'EUR', 'AD': 'EUR',
        'AE': 'AED', 'SA': 'SAR', 'QA': 'QAR', 'KW': 'KWD', 'BH': 'BHD',
        'OM': 'OMR', 'JO': 'JOD', 'IQ': 'IQD', 'YE': 'YER',
        'JP': 'JPY',
        'CN': 'CNY', 'TW': 'TWD', 'HK': 'HKD', 'MO': 'MOP',
        'KR': 'KRW',
        'AU': 'AUD', 'CX': 'AUD', 'CC': 'AUD', 'NF': 'AUD', 'KI': 'AUD',
        'NR': 'AUD', 'TV': 'AUD',
        'CA': 'CAD',
        'NZ': 'NZD', 'CK': 'NZD', 'NU': 'NZD', 'PN': 'NZD', 'TK': 'NZD',
        'SG': 'SGD',
        'CH': 'CHF', 'LI': 'CHF',
        'BR': 'BRL',
        'MX': 'MXN',
        'RU': 'RUB', 'BY': 'BYN',
        'ZA': 'ZAR', 'LS': 'ZAR', 'NA': 'NAD', 'SZ': 'SZL', 'BW': 'BWP',
        'NG': 'NGN', 'GH': 'GHS', 'KE': 'KES', 'UG': 'UGX', 'TZ': 'TZS',
        'ET': 'ETB', 'SD': 'SDG', 'EG': 'EGP', 'MA': 'MAD', 'TN': 'TND',
        'DZ': 'DZD', 'LY': 'LYD', 'SO': 'SOS', 'DJ': 'DJF', 'ER': 'ERN',
        'MU': 'MUR', 'SC': 'SCR', 'MG': 'MGA', 'MW': 'MWK', 'ZM': 'ZMW',
        'MZ': 'MZN', 'AO': 'AOA', 'CD': 'CDF', 'CG': 'XAF', 'CM': 'XAF',
        'GA': 'XAF', 'TD': 'XAF', 'CF': 'XAF', 'GQ': 'XAF',
        'SN': 'XOF', 'ML': 'XOF', 'BF': 'XOF', 'NE': 'XOF', 'GN': 'GNF',
        'CI': 'XOF', 'TG': 'XOF', 'BJ': 'XOF', 'GW': 'XOF',
        'AR': 'ARS', 'CL': 'CLP', 'CO': 'COP', 'PE': 'PEN', 'VE': 'VES',
        'BO': 'BOB', 'PY': 'PYG', 'UY': 'UYU', 'GT': 'GTQ', 'HN': 'HNL',
        'NI': 'NIO', 'CR': 'CRC', 'DO': 'DOP', 'CU': 'CUP', 'JM': 'JMD',
        'TT': 'TTD', 'BS': 'BSD', 'BB': 'BBD', 'GY': 'GYD', 'SR': 'SRD',
        'HT': 'HTG', 'BZ': 'BZD', 'PA': 'PAB',
        'PK': 'PKR', 'BD': 'BDT', 'LK': 'LKR', 'NP': 'NPR', 'BT': 'BTN',
        'MV': 'MVR', 'MM': 'MMK', 'TH': 'THB', 'VN': 'VND', 'ID': 'IDR',
        'MY': 'MYR', 'PH': 'PHP', 'KH': 'KHR', 'LA': 'LAK', 'BN': 'BND',
        'MN': 'MNT', 'KP': 'KPW', 'KZ': 'KZT', 'UZ': 'UZS', 'AZ': 'AZN',
        'GE': 'GEL', 'AM': 'AMD', 'TJ': 'TJS', 'KG': 'KGS', 'TM': 'TMT',
        'TR': 'TRY', 'IL': 'ILS', 'IR': 'IRR', 'AF': 'AFN',
        'PL': 'PLN', 'CZ': 'CZK', 'HU': 'HUF', 'RO': 'RON', 'DK': 'DKK',
        'SE': 'SEK', 'NO': 'NOK', 'IS': 'ISK', 'UA': 'UAH', 'RS': 'RSD',
        'BA': 'BAM', 'MK': 'MKD', 'AL': 'ALL', 'BG': 'BGN', 'HR': 'EUR',
        'RW': 'RWF', 'BI': 'BIF', 'KM': 'KMF', 'CV': 'CVE',
        'FJ': 'FJD', 'PG': 'PGK', 'SB': 'SBD', 'VU': 'VUV', 'WS': 'WST',
        'TO': 'TOP', 'FO': 'DKK', 'GL': 'DKK',
        'FG': 'GNF', 'SL': 'SLL', 'LR': 'LRD', 'GM': 'GMD',
        'CF': 'XAF', 'SS': 'SSP', 'SY': 'SYP', 'LB': 'LBP',
        'PS': 'ILS', 'LY': 'LYD',
    };

    /* ────────────────────────────────────────────────────────────────────
       CURRENCY SYMBOL MAP  (for display)
    ──────────────────────────────────────────────────────────────────── */
    const CURRENCY_SYMBOLS = {
        'USD': '$', 'EUR': '€', 'GBP': '£', 'INR': '₹', 'JPY': '¥',
        'CNY': '¥', 'AED': 'د.إ', 'SAR': '﷼', 'QAR': '﷼', 'KWD': 'KD',
        'BHD': 'BD', 'OMR': '﷼', 'JOD': 'JD', 'ILS': '₪', 'TRY': '₺',
        'RUB': '₽', 'UAH': '₴', 'PLN': 'zł', 'CZK': 'Kč', 'HUF': 'Ft',
        'RON': 'lei', 'DKK': 'kr', 'SEK': 'kr', 'NOK': 'kr', 'ISK': 'kr',
        'CHF': 'CHF', 'AUD': 'A$', 'CAD': 'C$', 'NZD': 'NZ$', 'SGD': 'S$',
        'HKD': 'HK$', 'TWD': 'NT$', 'KRW': '₩', 'THB': '฿', 'VND': '₫',
        'IDR': 'Rp', 'MYR': 'RM', 'PHP': '₱', 'PKR': '₨', 'BDT': '৳',
        'LKR': 'Rs', 'NPR': 'Rs', 'MMK': 'K', 'KHR': '៛', 'MNT': '₮',
        'BRL': 'R$', 'ARS': '$', 'MXN': '$', 'CLP': '$', 'COP': '$',
        'PEN': 'S/', 'UYU': '$', 'BOB': 'Bs.', 'PYG': '₲', 'GTQ': 'Q',
        'HNL': 'L', 'NIO': 'C$', 'CRC': '₡', 'DOP': 'RD$', 'JMD': 'J$',
        'TTD': 'TT$', 'BBD': '$', 'GYD': '$', 'BSD': '$', 'BZD': 'BZ$',
        'NGN': '₦', 'GHS': '₵', 'KES': 'KSh', 'UGX': 'USh', 'TZS': 'TSh',
        'ZAR': 'R', 'ETB': 'Br', 'EGP': '£', 'MAD': 'MAD', 'TND': 'DT',
        'DZD': 'DA', 'RWF': 'Fr', 'AZN': '₼', 'GEL': '₾', 'AMD': '֏',
        'KZT': '₸', 'UZS': 'so\'m', 'KGS': 'с', 'TJS': 'SM', 'TMT': 'T',
        'IRR': '﷼', 'AFN': '؋', 'IQD': 'IQD', 'SYP': '£', 'YER': '﷼',
        'LBP': '£', 'JOD': 'JD', 'BWP': 'P', 'FJD': 'FJ$', 'MUR': 'Rs',
    };

    /* ────────────────────────────────────────────────────────────────────
       FALLBACK EXCHANGE RATES (USD base — updated periodically)
    ──────────────────────────────────────────────────────────────────── */
    const FALLBACK_RATES = {
        'USD': 1, 'EUR': 0.92, 'GBP': 0.79, 'INR': 83.5, 'JPY': 149.5,
        'CNY': 7.24, 'AED': 3.67, 'SAR': 3.75, 'QAR': 3.64, 'KWD': 0.31,
        'AUD': 1.53, 'CAD': 1.36, 'NZD': 1.63, 'SGD': 1.34, 'CHF': 0.89,
        'HKD': 7.82, 'TWD': 31.8, 'KRW': 1330, 'THB': 34.5, 'VND': 24500,
        'IDR': 15700, 'MYR': 4.65, 'PHP': 56.2, 'PKR': 278, 'BDT': 110,
        'BRL': 5.05, 'ARS': 840, 'MXN': 17.2, 'CLP': 942, 'COP': 3900,
        'PEN': 3.72, 'TRY': 32.1, 'RUB': 92.5, 'UAH': 37.2, 'PLN': 3.98,
        'CZK': 22.8, 'HUF': 358, 'RON': 4.57, 'DKK': 6.88, 'SEK': 10.45,
        'NOK': 10.58, 'ISK': 138, 'ZAR': 18.6, 'NGN': 1450, 'KES': 128,
        'EGP': 30.9, 'MAD': 9.97, 'ILS': 3.71, 'IRR': 42000, 'KZT': 452,
        'AZN': 1.7, 'GEL': 2.65, 'MXN': 17.2, 'LKR': 310, 'NPR': 133,
    };

    /* ════════════════════════════════════════════════════════════════════
       MAIN ENGINE
    ════════════════════════════════════════════════════════════════════ */
    const LocalizationEngine = {

        config: {
            GEO_API_PRIMARY: 'https://ipapi.co/json/',
            GEO_API_FALLBACK: 'https://ipwho.is/',
            EXCHANGE_API: 'https://api.exchangerate-api.com/v4/latest/USD',
            BASE_CURRENCY: 'INR',   // Prices on site are set in INR
            DEFAULT_LANG: 'en',
            DEFAULT_CURRENCY: 'USD',
            CACHE_TTL_MS: 24 * 60 * 60 * 1000, // 24 hours
            LS_KEYS: {
                lang: 'lh_lang',
                currency: 'lh_currency',
                country: 'lh_country',
                countryName: 'lh_country_name',
                geoTs: 'lh_geo_ts',
                popupDismissed: 'lh_popup_dismissed',
                manualOverride: 'lh_manual',
            }
        },

        state: {
            userCountry: null,
            userCountryName: null,
            userCurrency: null,
            userLang: null,
            rates: {},
            initialized: false,
        },

        /* ── INIT ─────────────────────────────────────────────────── */
        async init() {
            const ls = this.config.LS_KEYS;
            const manualOverride = localStorage.getItem(ls.manualOverride) === '1';
            const savedLang     = localStorage.getItem(ls.lang);
            const savedCurrency = localStorage.getItem(ls.currency);
            const savedCountry  = localStorage.getItem(ls.country);
            const savedName     = localStorage.getItem(ls.countryName);
            const geoTs         = parseInt(localStorage.getItem(ls.geoTs) || '0', 10);
            const cacheValid    = (Date.now() - geoTs) < this.config.CACHE_TTL_MS;

            // ── If user manually chose lang/currency, restore and exit early ──
            if (manualOverride && savedLang && savedCurrency) {
                this.state.userLang     = savedLang;
                this.state.userCurrency = savedCurrency;
                this.state.userCountry  = savedCountry;
                this.state.userCountryName = savedName;
                await this.fetchRates();
                this.applySelectors();
                this.applyLanguage(savedLang);
                this.updateCurrencyUI();
                return;
            }

            // ── Use cached geo data if valid ──
            if (cacheValid && savedCountry) {
                this.state.userCountry     = savedCountry;
                this.state.userCountryName = savedName;
                this.state.userLang        = savedLang || this.detectLanguage(savedCountry);
                this.state.userCurrency    = savedCurrency || this.detectCurrency(savedCountry);
            } else {
                // ── Fetch fresh geo data ──
                await this.fetchGeoData();
            }

            await this.fetchRates();
            this.applySelectors();

            // ── Apply language (India stays English) ──
            if (this.state.userCountry === 'IN') {
                this.state.userLang = 'en';
            }
            this.applyLanguage(this.state.userLang);
            this.updateCurrencyUI();

            // ── Show geo popup if non-English country and not dismissed ──
            if (
                this.state.userCountry !== 'IN' &&
                LOW_ENGLISH_COUNTRIES.has(this.state.userCountry) &&
                !localStorage.getItem(ls.popupDismissed)
            ) {
                setTimeout(() => this.showGeoPopup(), 1500);
            }

            this.state.initialized = true;
        },

        /* ── GEOLOCATION ──────────────────────────────────────────── */
        async fetchGeoData() {
            let geoData = null;
            try {
                const res = await fetch(this.config.GEO_API_PRIMARY, { signal: AbortSignal.timeout(5000) });
                if (res.ok) geoData = await res.json();
            } catch (_) {}

            // Fallback
            if (!geoData || !geoData.country_code) {
                try {
                    const res2 = await fetch(this.config.GEO_API_FALLBACK, { signal: AbortSignal.timeout(5000) });
                    if (res2.ok) {
                        const d = await res2.json();
                        geoData = { country_code: d.country_code, country_name: d.country };
                    }
                } catch (_) {}
            }

            const code = (geoData?.country_code || 'US').toUpperCase();
            const name = geoData?.country_name || geoData?.country || '';

            this.state.userCountry     = code;
            this.state.userCountryName = name;
            this.state.userLang        = this.detectLanguage(code);
            this.state.userCurrency    = this.detectCurrency(code);

            // Cache to localStorage
            const ls = this.config.LS_KEYS;
            localStorage.setItem(ls.country, code);
            localStorage.setItem(ls.countryName, name);
            localStorage.setItem(ls.lang, this.state.userLang);
            localStorage.setItem(ls.currency, this.state.userCurrency);
            localStorage.setItem(ls.geoTs, Date.now().toString());
        },

        detectLanguage(code) {
            return COUNTRY_LANG[code] || 'en';
        },

        detectCurrency(code) {
            return COUNTRY_CURRENCY[code] || 'USD';
        },

        /* ── EXCHANGE RATES ───────────────────────────────────────── */
        async fetchRates() {
            try {
                const res = await fetch(this.config.EXCHANGE_API, { signal: AbortSignal.timeout(6000) });
                if (res.ok) {
                    const data = await res.json();
                    this.state.rates = data.rates || FALLBACK_RATES;
                    return;
                }
            } catch (_) {}
            this.state.rates = FALLBACK_RATES;
        },

        /* ── LANGUAGE ─────────────────────────────────────────────── */
        applyLanguage(lang) {
            if (!lang || lang === 'en') return;
            const maxWait = 30, interval = 500;
            let tries = 0;
            const tryApply = () => {
                const combo = document.querySelector('.goog-te-combo');
                if (combo) {
                    combo.value = lang;
                    combo.dispatchEvent(new Event('change'));
                } else if (tries++ < maxWait) {
                    setTimeout(tryApply, interval);
                }
            };
            tryApply();
        },

        setLanguage(lang) {
            this.state.userLang = lang;
            localStorage.setItem(this.config.LS_KEYS.lang, lang);
            localStorage.setItem(this.config.LS_KEYS.manualOverride, '1');

            if (lang === 'en') {
                // Reset to English using Google Translate's restore link
                const iframe = document.querySelector('.goog-te-banner-frame');
                if (iframe) {
                    const restoreBtn = iframe.contentDocument?.querySelector('.goog-te-button button');
                    if (restoreBtn) { restoreBtn.click(); return; }
                }
                // Alternative: force reload with no translation
                const combo = document.querySelector('.goog-te-combo');
                if (combo) { combo.value = ''; combo.dispatchEvent(new Event('change')); }
            } else {
                this.applyLanguage(lang);
            }
        },

        /* ── CURRENCY ─────────────────────────────────────────────── */
        setCurrency(currency) {
            this.state.userCurrency = currency;
            localStorage.setItem(this.config.LS_KEYS.currency, currency);
            localStorage.setItem(this.config.LS_KEYS.manualOverride, '1');
            this.updateCurrencyUI();
            // Trigger any page-specific handlers
            if (typeof window.runROI === 'function') window.runROI();
            if (typeof window.runQuote === 'function') window.runQuote();
            document.dispatchEvent(new CustomEvent('lh:currencyChanged', { detail: { currency } }));
        },

        updateCurrencyUI() {
            const targetCurrency = this.state.userCurrency;
            const baseCurrency   = this.config.BASE_CURRENCY;
            const rates          = this.state.rates;

            if (!rates[targetCurrency] || !rates[baseCurrency]) return;

            const factor = rates[targetCurrency] / rates[baseCurrency];
            const symbol = this.getCurrencySymbol(targetCurrency);

            document.querySelectorAll('[data-base-price]').forEach(el => {
                const base = parseFloat(el.getAttribute('data-base-price'));
                if (isNaN(base)) return;
                const converted = Math.round(base * factor);
                try {
                    el.textContent = converted.toLocaleString(undefined, {
                        style: 'currency',
                        currency: targetCurrency,
                        maximumFractionDigits: 0
                    });
                } catch (_) {
                    el.textContent = symbol + converted.toLocaleString();
                }
                // Hide adjacent standalone symbol element if any
                const prevSib = el.previousElementSibling;
                if (prevSib?.classList.contains('currency-symbol')) prevSib.style.display = 'none';
            });

            // Update standalone currency symbols
            document.querySelectorAll('.currency-symbol').forEach(el => {
                if (el.nextElementSibling?.hasAttribute('data-base-price')) return;
                el.textContent = symbol;
            });
        },

        getCurrencySymbol(code) {
            if (CURRENCY_SYMBOLS[code]) return CURRENCY_SYMBOLS[code];
            try {
                return (0).toLocaleString('en-US', { style: 'currency', currency: code, minimumFractionDigits: 0 })
                    .replace(/[\d,.\s]/g, '').trim();
            } catch (_) { return code; }
        },

        /* ── UI SELECTORS ─────────────────────────────────────────── */
        applySelectors() {
            const langSel = document.getElementById('langSelector');
            const currSel = document.getElementById('currencySelector');
            if (langSel) langSel.value = this.state.userLang || 'en';
            if (currSel) currSel.value = this.state.userCurrency || 'USD';
        },

        /* ── GEO POPUP ────────────────────────────────────────────── */
        showGeoPopup() {
            const popup = document.getElementById('geo-popup');
            if (!popup) return;

            const countryName = this.state.userCountryName || this.state.userCountry;
            const currency    = this.state.userCurrency || 'USD';
            const lang        = this.supportedLangLabel(this.state.userLang);
            const flag        = this.countryFlag(this.state.userCountry);

            document.getElementById('geo-country-name').textContent = countryName + ' ' + flag;
            document.getElementById('geo-currency-code').textContent = currency;
            document.getElementById('geo-lang-name').textContent = lang;

            popup.classList.add('geo-popup--visible');
        },

        supportedLangLabel(code) {
            const labels = {
                'es': 'Spanish', 'fr': 'French', 'de': 'German', 'pt': 'Portuguese',
                'ar': 'Arabic', 'zh-CN': 'Chinese', 'zh-TW': 'Chinese', 'ja': 'Japanese',
                'ko': 'Korean', 'ru': 'Russian', 'tr': 'Turkish', 'it': 'Italian',
                'nl': 'Dutch', 'pl': 'Polish', 'id': 'Indonesian', 'vi': 'Vietnamese',
                'th': 'Thai', 'ms': 'Malay', 'uk': 'Ukrainian', 'hi': 'Hindi',
                'gu': 'Gujarati', 'bn': 'Bengali', 'fa': 'Persian', 'iw': 'Hebrew',
                'el': 'Greek', 'ro': 'Romanian', 'hu': 'Hungarian', 'cs': 'Czech',
                'sv': 'Swedish', 'no': 'Norwegian', 'da': 'Danish', 'fi': 'Finnish',
                'sk': 'Slovak', 'bg': 'Bulgarian', 'hr': 'Croatian', 'sr': 'Serbian',
                'lt': 'Lithuanian', 'lv': 'Latvian', 'et': 'Estonian',
            };
            return labels[code] || 'English';
        },

        countryFlag(code) {
            if (!code || code.length !== 2) return '🌍';
            // Convert country code to flag emoji
            const cp = [...code.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65);
            return String.fromCodePoint(...cp);
        },

        dismissPopup(accept) {
            const popup = document.getElementById('geo-popup');
            if (popup) popup.classList.remove('geo-popup--visible');
            localStorage.setItem(this.config.LS_KEYS.popupDismissed, '1');

            if (accept) {
                // Apply detected language and currency
                const langSel = document.getElementById('langSelector');
                const currSel = document.getElementById('currencySelector');
                if (langSel) { langSel.value = this.state.userLang; }
                if (currSel) { currSel.value = this.state.userCurrency; }
                this.setLanguage(this.state.userLang);
                this.setCurrency(this.state.userCurrency);
            }
        },
    };

    /* ────────────────────────────────────────────────────────────────────
       GOOGLE TRANSLATE INIT CALLBACK
    ──────────────────────────────────────────────────────────────────── */
    window.googleTranslateElementInit = function () {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
        }, 'google_translate_element');
    };

    /* ────────────────────────────────────────────────────────────────────
       EXPOSE TO GLOBAL SCOPE
    ──────────────────────────────────────────────────────────────────── */
    window.LocalizationEngine = LocalizationEngine;

    /* ────────────────────────────────────────────────────────────────────
       BOOT
    ──────────────────────────────────────────────────────────────────── */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => LocalizationEngine.init());
    } else {
        LocalizationEngine.init();
    }

})();
