/**
 * @name sogv
 * @namespace
 * @description Root namespace for the SOG Validator Library
 */
declare namespace sogv {
    /**
     * @abstract
     * @constructor
     * @name sogv.BaseComparisonValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Abstract base class that implements functionality for validation.</p>
     * <p>Provides a base class for the validation of property comparisons.</p>
     * @description Create a new Validator.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options
     * @param {String} lang The language used by the application. Defaults to 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     */
    class BaseComparisonValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
    }
    /**
     * @abstract
     * @constructor
     * @name sogv.BaseValidator
     * @classdesc Abstract base class that implements functionality for validation.
     * @description Create a new validation extension.
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options
     * @param {String} lang Language of error messages.
     * @param {Boolean} lang Language of error messages.
     * @constructor
     */
    class BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: boolean, lang: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
    }
    /**
     * @function
     * @name sogv.globalScope
     * @description
     * <p>Return variable by name from the global scope.</p>
     * @param {String} name Variable name.
     * @returns {Window | *}
     */
    function globalScope(name: string): Window | any;
    /**
     * @function
     * @name sogv.registerValidator
     * @description
     * <p>Register validator.</p>
     * @param {Function} validator The validator.
     */
    function registerValidator(validator: (...params: any[]) => any): void;
    /**
     * @function
     * @name sogv.getType
     * @description
     * <p>Get data type.</p>
     * @param {*} data Data, which type needs to be defined.
     * @returns {String} Data type
     */
    function getType(data: any): string;
    /**
     * @function
     * @name sogv.isType
     * @description
     * <p>Parse validation rules from string.</p>
     * @param {String} type Type string.
     * @param {*} data Data, which type needs to be checked.
     * @returns {Boolean} Is correct data type.
     */
    function isType(type: string, data: any): boolean;
    /**
     * @function
     * @name sogv.makeValidator
     * @description
     * <p>Create object of the validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {String} validator Validator name.
     * @param {Object} options The setting options.
     * @param {Object} optionRules The validation rules for setting options.
     * @param {Object} lang The language used by the application. Defaults to 'en'.
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @returns {Object} The object of validator.
     */
    function makeValidator(data: any, validator: string, options: any, optionRules: any, lang: any, internal: boolean): any;
    /**
     * @function
     * @name sogv.isValid
     * @description
     * <p>Check if data valid according to validation rules.</p>
     * @param {*} data The data which needs to be validated.
     * @param {String} rules Validation rules in string format.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal It means, that validation called from core.
     * @returns {Boolean} Validation status.
     */
    function isValid(data: any, rules: string, lang: string, internal: boolean): boolean;
    /**
     * @function
     * @name sogv.isValidWithErrorMessage
     * @description
     * <p>Check if data valid according to validation rules.</p>
     * @param {*} data The data which needs to be validated.
     * @param {String} rules Validation rules in string format.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal It means, that validation called from core.
     * @returns {Null|String} If valid this function return null otherwise error message.
     */
    function isValidWithErrorMessage(data: any, rules: string, lang: string, internal: boolean): null | string;
    /**
     * @function
     * @name sogv.convertToType
     * @description Convert data to one of the type.
     * @param {*} data The data which needs to be converted
     * @param {String} strTypes Data types. (Example: 'integer|date-string')
     * @returns {*} The converted data
     */
    function convertToType(data: any, strTypes: string): any;
    /**
     * @constructor
     * @name sogv.Application
     * @classdesc A sogv.Application represents and manages your Validation application.
     * @description Create a new Application.
     * @param {Object} options The setting options
     * @example
     * var validationEngine = new sogv.Application({
     *     lang: 'en'
     * });
     *
     * var form = validationEngine.make({
     *   first_name: 'Leo',
     *   last_lame: 'Lane',
     *   email: 'leo.lane38@example.com',
     *   birthday: '1977-03-07',
     *   creditCard: '4111111111111111',
     *   ip: '8.8.8.8',
     *   locale: 'cy_GB',
     *   country: 'US',
     *   language: 'en_gb',
     *   homepage: 'https://github.com//slaveofgod/sog-validator'
     * }, {
     *   first_name: 'required|string|length:{"min":2,"max":255}',
     *   last_lame: 'required|string|length:{"min":2,"max":255}',
     *   email: 'required|email',
     *   birthday: 'required|date',
     *   creditCard: 'required|string|card-scheme:{"schemes":["VISA"]}',
     *   ip: 'required|string|ip',
     *   locale: 'required|string|locale',
     *   country: 'required|string|country',
     *   language: 'required|string|language',
     *   homepage: 'required|string|url'
     * });
     *
     * if (false === form.isValid()) {
     *     if (false === form.get('name').isValid()) {
     *         form.get('name').errors().first();
     *     }
     *     // ...
     * }
     */
    class Application {
        constructor(options: any);
        /**
         * @name sogv.Application#lang
         * @type {String}
         * @description
         * <p>The language used by the application.</p>
         * <p>Defaults to 'en' ({@link https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes|List of ISO 639-1 codes}).</p>
         * @example
         * // Set the language for the application
         * this.app.lang = 'en';
         */
        lang: string;
        /**
         * @name sogv.Application#internal
         * @type {Boolean}
         * @description If this parameter is true, it means, that validation called from core.
         */
        internal: boolean;
        /**
         * @function
         * @name sogv.Application#make
         * @description Create validators for all the fields
         * @param {Object} data The data which needs to be validated
         * @param {Object} rules The validation rules
         * @returns {sogv.ValidatorHandler}
         */
        make(data: any, rules: any): sogv.ValidatorHandler;
        /**
         * @function
         * @name sogv.Application#makeSingle
         * @description Create single validator
         * @param {*} data The data which needs to be validated
         * @param {String} rules The validation rules
         * @example
         * var validationEngine = new sogv.Application({
         *     lang: 'en'
         * });
         *
         * validator = validationEngine.makeSingle(
         *     'leo.lane38@example.com',
         *     'required|email'
         * );
         *
         * if (false === validator.isValid()) {
         *     validator.errors().first();
         * }
         * @returns {Object} Validator object
         */
        makeSingle(data: any, rules: string): any;
    }
    /**
     * @constructor
     * @name sogv.AnyValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is valid at least for one of the rule.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>any</code>', '<code>one-of</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.AnyValidator(data, contains);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class AnyValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.AnyValidator#message
         * @type {String}
         * @description
         * <p>This is the message that will be shown if the value is not valid.</p>
         * <p>Default: "<code>This value should be valid at least for one rule.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.AnyValidator#rules
         * @type {String}
         * @description
         * <p>This option is required.</p>
         * <p>It defines the value to check the containing.</p>
         */
        rules: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>any</code>', '<code>one-of</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.ContainsValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value contains given substring.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>contains</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.ContainsValidator(data, contains);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class ContainsValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.ContainsValidator#message
         * @type {String}
         * @description
         * <p>This is the message that will be shown if the value is not contains given substring.</p>
         * <p>Default: "<code>This value should contains the given substring.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.ContainsValidator#value
         * @type {String}
         * @description
         * <p>This option is required.</p>
         * <p>It defines the value to check the containing.</p>
         */
        value: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>contains</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.AcceptedValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must be <code>yes</code>, <code>on</code>, <code>1</code>, or <code>true</code>.</p>
     * <p>This is useful for validating "Terms of Service" acceptance.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>accepted</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.AcceptedValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class AcceptedValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>accepted</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.ActiveUrlValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must have a valid <code>A</code> or <code>AAAA</code> record</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>active_url</code>','<code>active-url</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.ActiveUrlValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class ActiveUrlValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>active_url</code>','<code>active-url</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.AfterOrEqualValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must be a value <code>after</code> or <code>equal</code> to the given <code>date</code>.</p>
     * <p>For more information, see the after rule.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>after_or_equal</code>', '<code>after-or-equal</code>', '<code>aoe</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.AfterOrEqualValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class AfterOrEqualValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.AfterOrEqualValidator#value
         * @type {*}
         * @description
         * <p>This option is required.<p>
         * <p>It defines the value to compare to.<p>
         * <p>The data type could be <code>string</code>, <code>number</code> or <code>date</code>.<p>
         */
        value: any;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>after_or_equal</code>', '<code>after-or-equal</code>', '<code>aoe</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.AfterValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must be a value after a given date.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>after</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.AfterValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class AfterValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.AfterValidator#value
         * @type {*}
         * @description
         * <p>This option is required.</p>
         * <p>It defines the value to compare to.</p>
         * <p>The data type could be <code>string</code>, <code>number</code> or <code>date</code>.<p>
         */
        value: any;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>after</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.AlphaDashValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation may have <code>alpha-numeric</code> characters, as well as <code>dashes</code> and <code>underscores</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>alpha_dash</code>', '<code>alpha-dash</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.AlphaDashValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class AlphaDashValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>alpha_dash</code>', '<code>alpha-dash</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.AlphaNumValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must be entirely <code>alpha-numeric</code> characters.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>alpha_num</code>', '<code>alpha-num</code>', '<code>alnum</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.AlphaNumValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class AlphaNumValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>alpha_num</code>', '<code>alpha-num</code>', '<code>alnum</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.AlphaValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must be entirely alphabetic characters.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>alpha</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.AlphaValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class AlphaValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>alpha</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.ArrayValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must be an array.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>array</code>', '<code>arr</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.ArrayValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class ArrayValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>array</code>', '<code>arr</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.BeforeOrEqualValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must be a value before or equal to the given <code>date</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>before_or_equal</code>', '<code>before-or-equal</code>', '<code>boe</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.BeforeOrEqualValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class BeforeOrEqualValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BeforeOrEqualValidator#value
         * @type {*}
         * @description
         * <p>This option is required.</p>
         * <p>It defines the value to compare to.</p>
         * <p>The data type could be <code>string</code>, <code>number</code> or <code>date</code>.<p>
         */
        value: any;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>before_or_equal</code>', '<code>before-or-equal</code>', '<code>boe</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.BeforeValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must be a value before a given <code>date</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>before</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.BeforeValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class BeforeValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BeforeValidator#value
         * @type {*}
         * @description
         * <p>This option is required.</p>
         * <p>It defines the value to compare to.</p>
         * <p>The data type could be <code>string</code>, <code>number</code> or <code>date</code>.<p>
         */
        value: any;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>before</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.BetweenValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must have a <code>size</code> between the given <code>min</code> and <code>max</code>.</p>
     * <p><code>Strings</code>, <code>numerics</code>, <code>arrays</code> and <code>dates</code> are evaluated in the same fashion as the size rule.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>between</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.BetweenValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class BetweenValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BetweenValidator#max
         * @type {Integer}
         * @description
         * <p>This option is the "<code>max</code>" count value. Validation will fail if the given collection elements count is greater than this max value.</p>
         * <p>This option is required when the min option is not defined.</p>
         */
        max: Integer;
        /**
         * @name sogv.BetweenValidator#min
         * @type {Integer}
         * @description
         * <p>This option is the "<code>min</code>" count value. Validation will fail if the given collection elements count is less than this min value.</p>
         * <p>This option is required when the max option is not defined.</p>
         */
        min: Integer;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>between</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.BooleanValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must be able to be cast as a <code>boolean</code>. Accepted input are <code>true</code>, <code>false</code>, <code>1</code>, <code>0</code>, "<code>1</code>", and "<code>0</code>".</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>boolean</code>', '<code>bool</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.BooleanValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class BooleanValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>boolean</code>', '<code>bool</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.CallableValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Verify that the contents of a variable can be called as a <code>function</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>callable</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.CallableValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class CallableValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>callable</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.CntrlValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Check for <code>control</code> character(s).</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>cntrl</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.CntrlValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class CntrlValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>cntrl</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.DateEqualsValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must be <code>equal</code> to the given <code>date</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>date_equals</code>', '<code>date-equals</code>', '<code>de</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.DateEqualsValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class DateEqualsValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>date_equals</code>', '<code>date-equals</code>', '<code>de</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.DigitValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Check for <code>numeric</code> character(s).</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>digit</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.DigitValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class DigitValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>digit</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.DigitsBetweenValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must be <code>numeric</code> and must have a length between the given <code>min</code> and <code>max</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>digits_between</code>', '<code>digits-between</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.DigitsBetweenValidator(data, {"min": 5, "max": 10});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class DigitsBetweenValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.DigitsBetweenValidator#min
         * @type {Integer}
         * @description
         * This option is required. It defines the min count of digits.
         */
        min: Integer;
        /**
         * @name sogv.DigitsBetweenValidator#max
         * @type {Integer}
         * @description
         * This option is required. It defines the max count of digits.
         */
        max: Integer;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>digits_between</code>', '<code>digits-between</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.DigitsValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must be <code>numeric</code> and must have an exact <code>length</code> of value.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>digits</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.DigitsValidator(data, {"length": 10});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class DigitsValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.DigitsValidator#length
         * @type {*}
         * @description This option is required. It defines the exact count of digits.
         */
        length: any;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>digits</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.DistinctValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>When working with <code>arrays</code>, the field under validation must not have any duplicate values.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>distinct</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.DistinctValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class DistinctValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>distinct</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.DoubleValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Finds whether the type of a variable is <code>double</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>double</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.DoubleValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class DoubleValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>double</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.EndsWithValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must end with one of the given values.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>ends_with</code>', '<code>ends-with</code>', '<code>ends</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.EndsWithValidator(data, {ends: ['abc','def']});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class EndsWithValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.EndsWithValidator#ends
         * @type {String|Array}
         * @description
         * <p>The option is required.</p>
         * <p>The list of ends.</p>
         * <p>One of the "<code>end</code>" needs to be the end of the passed value.</p>
         */
        ends: string | any[];
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>ends_with</code>', '<code>ends-with</code>', '<code>ends</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.FloatValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must be able to be cast as a <code>float</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>float</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.FloatValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class FloatValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>float</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.GraphValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Check for any <code>printable</code> character(s) except space.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>graph</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.GraphValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class GraphValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>graph</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.GtValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The data must be <code>greater</code> than the given value.</p>
     * <p><code>Strings</code>, <code>numerics</code>, <code>arrays</code>, and <code>dates</code> are evaluated using the same conventions as the size rule.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>gt</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.GtValidator(data, {"value": 10});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class GtValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.GtValidator#value
         * @type {*}
         * @description
         * <p>This option is required.</p>
         * <p>It defines the value to compare to.</p>
         * <p>The data type could be <code>string</code>, <code>number</code>, <code>array</code> or <code>date</code>.<p>
         */
        value: any;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>gt</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.GteValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must be <code>greater</code> than or <code>equal</code> to the given field.</p>
     * <p><code>Strings</code>, <code>numerics</code>, <code>arrays</code>, and <code>dates</code> are evaluated using the same conventions as the size rule.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>gte</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.GteValidator(data, {"value": 10});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class GteValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.GteValidator#value
         * @type {*}
         * @description
         * <p>This option is required.</p>
         * <p>It defines the value to compare to.</p>
         * <p>The data type could be <code>string</code>, <code>number</code>, <code>array</code> or <code>date</code>.<p>
         */
        value: any;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>gte</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.InValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must be <code>included</code> in the given list of values.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>in</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.InValidator("Liam", [
     *   "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah",
     *   "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
     *   "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
     *   "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
     * ]);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class InValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.InValidator#choices
         * @type {Array}
         * @description
         * <p>A required option - The field under validation must be included in the given list of values.</p>
         * <p>The input value will be matched against this array.</p>
         */
        choices: any[];
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>in</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.IntegerValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must be an integer.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>integer</code>', '<code>int</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.IntegerValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class IntegerValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>integer</code>', '<code>int</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.Ipv4Validator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must be an <code>IPv4</code> address.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>ipv4</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.Ipv4Validator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class Ipv4Validator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>ipv4</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.Ipv6Validator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must be an <code>IPv6</code> address.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>ipv6</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.Ipv6Validator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class Ipv6Validator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>ipv6</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.IterableValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Verify that the contents of a variable is an <code>iterable</code> value.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>iterable</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.IterableValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class IterableValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>iterable</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.LowerValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Check for <code>lowercase</code> character(s).</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>lower</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.LowerValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class LowerValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>lower</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.LtValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must be <code>less</code> than the given field.<p>
     * <p><code>Strings</code>, <code>numerics</code>, <code>arrays</code>, and <code>dates</code> are evaluated using the same conventions as the size rule.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>lt</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.LtValidator(data, {"value": 10});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class LtValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.LtValidator#value
         * @type {*}
         * @description
         * <p>This option is required.</p>
         * <p>It defines the value to compare to.</p>
         * <p>The data type could be <code>string</code>, <code>number</code>, <code>array</code> or <code>date</code>.<p>
         */
        value: any;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>lt</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.LteValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must be <code>less</code> than or <code>equal</code> to the given field.</p>
     * <p><code>Strings</code>, <code>numerics</code>, <code>arrays</code>, and <code>dates</code> are evaluated using the same conventions as the size rule.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>lte</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.LteValidator(data, {"value": 10});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class LteValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.LteValidator#value
         * @type {*}
         * @description
         * <p>This option is required.</p>
         * <p>It defines the value to compare to.</p>
         * <p>The data type could be <code>string</code>, <code>number</code>, <code>array</code> or <code>date</code>.<p>
         */
        value: any;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>lte</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.NotInValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must <code>not be included</code> in the given list of values.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>not_in</code>', '<code>not-in</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.NotInValidator("Bob", [
     *   "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah",
     *   "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
     *   "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
     *   "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
     * ]);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class NotInValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.NotInValidator#choices
         * @type {Array}
         * @description
         * <p>A required option - this is the array of options that should be considered in the valid set.</p>
         * <p>The input value will be matched against this array.</p>
         */
        choices: any[];
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>not_in</code>', '<code>not-in</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.NumericValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must be numeric.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>numeric</code>', '<code>num</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.NumericValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class NumericValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>numeric</code>', '<code>num</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.ObjectValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Finds whether a variable is an <code>object</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>object</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.ObjectValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class ObjectValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>object</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.PrintValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Check for <code>printable</code> character(s).</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>print</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.PrintValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class PrintValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>print</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.PunctValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Check for any <code>printable</code> character which is <code>not whitespace</code> or an <code>alphanumeric</code> character.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>punct</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.PunctValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class PunctValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>punct</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.RealValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Finds whether the type of a variable is <code>real</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>real</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.RealValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class RealValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>real</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.ScalarValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Finds whether a variable is a scalar. Scalar variables are those containing an <code>integer</code>, <code>float</code>, <code>string</code> or <code>boolean</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>scalar</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.ScalarValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class ScalarValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>scalar</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.SizeValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must have a size matching the given value.</p>
     * <p>For <code>string</code> data, value corresponds to the number of characters.</p>
     * <p>For <code>numeric</code> data, value corresponds to a given integer value.</p>
     * <p>For an <code>array</code>, size corresponds to the count of the array.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>size</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.SizeValidator(data, {min: 10});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class SizeValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.SizeValidator#value
         * @type {Integer}
         * @description
         * <p>This option is required.</p>
         * <p>It defines the value to compare to.</p>
         */
        value: Integer;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>size</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.SpaceValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Check for <code>whitespace</code> character(s).</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>space</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.SpaceValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class SpaceValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>space</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.StartsWithValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must start with one of the given values.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>starts_with</code>', '<code>starts-with</code>', '<code>starts</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.StartsWithValidator(data, {starts: ['abc','def']});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class StartsWithValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.StartsWithValidator#starts
         * @type {String|Array}
         * @description
         * <p>The option is required.</p>
         * <p>The list of starts.</p>
         * <p>One of the "<code>start</code>" needs to be the end of the passed value.</p>
         */
        starts: string | any[];
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>starts_with</code>', '<code>starts-with</code>', '<code>starts</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.StringValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>The field under validation must be a string.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>string</code>', '<code>str</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.StringValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class StringValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>string</code>', '<code>str</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.UpperValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Check for <code>uppercase</code> character(s).</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>upper</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.UpperValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class UpperValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>upper</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.XdigitValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Check for character(s) representing a <code>hexadecimal digit</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>xdigit</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.XdigitValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class XdigitValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>xdigit</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.AllValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is valid according to list of validation rules.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} rules Validation rules.
     * @param {Object} options The setting options.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>all</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var rules = 'required|email';
     * var data = 'iamtheslaveofgod@gmail.com'
     * var validator = new sogv.AllValidator(data, rules, {
     *      lang: 'en'
     * });
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class AllValidator extends sogv.BaseValidator {
        constructor(data: any, rules: any, options: any);
        /**
         * @name sogv.AllValidator#rules
         * @type {String}
         * @description Validation rules.
         */
        rules: string;
        /**
         * @function
         * @name sogv.AllValidator#add
         * @description Add new validator
         * @param {String} name The validator name
         * @param {Object} options The validation settings
         */
        add(name: string, options: any): void;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>all</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.BicValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>This constraint is used to ensure that a value has the proper format of a {@link https://en.wikipedia.org/wiki/Business_Identifier_Code|Business Identifier Code (BIC)}.</p>
     * <p><code>BIC</code> is an internationally agreed means to uniquely identify both financial and non-financial institutions.</p>
     * <p>You may also check that the <code>BIC</code> is associated with a given <code>IBAN</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>bic</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.BicValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class BicValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BicValidator#iban
         * @type {String}
         * @description
         * <p>An IBAN value to validate that the BIC is associated with it.</p>
         * <p>Default: <code>null</code>.</p>
         */
        iban: string;
        /**
         * @name sogv.BicValidator#ibanMessage
         * @type {String}
         * @description
         * <p>The default message supplied when the value does not pass the combined BIC/IBAN check.</p>
         * <p>Default: "<code>This Business Identifier Code (BIC) is not associated with IBAN %%iban%%.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%iban%%</code></td>
         *             <td>The current IBAN value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        ibanMessage: string;
        /**
         * @name sogv.BicValidator#message
         * @type {String}
         * @description
         * <p>The default message supplied when the value does not pass the BIC check.</p>
         * <p>Default: "<code>This is not a valid Business Identifier Code (BIC).</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) BIC value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>bic</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.BlankValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is blank - meaning equal to an <code>empty string</code> or <code>null</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>blank</code>', '<code>empty</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.BlankValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class BlankValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.BlankValidator#message
         * @type {String}
         * @description
         * <p>This is the message that will be shown if the value is not blank.</p>
         * <p>Default: "<code>This value should be blank.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>blank</code>', '<code>empty</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.CardSchemeValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>This constraint ensures that a credit card number is valid for a given credit card company.</p>
     * <p>It can be used to validate the number before trying to initiate a payment through a payment gateway.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>card-scheme</code>', '<code>cs</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.CardSchemeValidator(data, schemes);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class CardSchemeValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.CardSchemeValidator#message
         * @type {String}
         * @description
         * <p>The message shown when the value does not pass the CardScheme check.</p>
         * <p>Default: "Unsupported card type or invalid card number."
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.CardSchemeValidator#schemes
         * @type {String|Array}
         * @description
         * <p>This option is required and represents the name of the number scheme used to validate the credit card number, it can either be a string or an array.</p>
         * <p>Valid values are:</p>
         * <ul>
         *     <li><b>AMEX</b></li>
         *     <li><b>CHINA_UNIONPAY</b></li>
         *     <li><b>DINERS</b></li>
         *     <li><b>DISCOVER</b></li>
         *     <li><b>INSTAPAYMENT</b></li>
         *     <li><b>JCB</b></li>
         *     <li><b>LASER</b></li>
         *     <li><b>MAESTRO</b></li>
         *     <li><b>MASTERCARD</b></li>
         *     <li><b>MIR</b></li>
         *     <li><b>UATP</b></li>
         *     <li><b>VISA</b></li>
         * </ul>
         * <p>For more information about the used schemes, see {@link https://en.wikipedia.org/wiki/Bank_card_number#Issuer_identification_number_.28IIN.29|Wikipedia: Issuer identification number (IIN)}.</p>
         */
        schemes: string | any[];
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>card-scheme</code>', '<code>cs</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.ChoiceValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>This constraint is used to ensure that the given value is one of a given set of valid choices.</p>
     * <p>It can also be used to validate that each item in an array of items is one of those valid choices.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>choice</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.ChoiceValidator(["Liam", "Noah", "William", "James"], {
     *     'choice': {
     *         "choices": [
     *             "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah",
     *             "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel",
     *             "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian",
     *             "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke"
     *         ],
     *         "multiple": true,
     *         "min": 5
     *     }
     * });
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class ChoiceValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.ChoiceValidator#callback
         * @type {String|Array|Closure}
         * @description
         * <p>This is a callback method that can be used instead of the choices option to return the choices array.</p>
         */
        callback: string | any[] | Closure;
        /**
         * @name sogv.ChoiceValidator#choices
         * @type {Array}
         * @description
         * <p>A required option (unless callback is specified) - this is the array of options that should be considered in the valid set.</p>
         * <p>The input value will be matched against this array.</p>
         */
        choices: any[];
        /**
         * @name sogv.ChoiceValidator#max
         * @type {Integer}
         * @description
         * <p>If the multiple option is true, then you can use the max option to force no more than XX number of values to be selected.</p>
         * <p>For example, if max is 3, but the input array contains 4 valid items, the validation will fail.</p>
         */
        max: Integer;
        /**
         * @name sogv.ChoiceValidator#maxMessage
         * @type {String}
         * @description
         * <p>This is the validation error message that's displayed when the user chooses too many options per the max option.</p>
         * <p>Default: "<code>You must select at most {{ limit }} choices.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%limit%%</code></td>
         *             <td>Max count of selected options</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%choices%%</code></td>
         *             <td>A comma-separated list of available choices</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        maxMessage: string;
        /**
         * @name sogv.ChoiceValidator#message
         * @type {String}
         * @description
         * <p>This is the message that you will receive if the multiple option is set to false and the underlying value is not in the valid array of choices.</p>
         * <p>Default: "<code>The value you selected is not a valid choice.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.ChoiceValidator#min
         * @type {Integer}
         * @description
         * <p>If the multiple option is true, then you can use the min option to force at least XX number of values to be selected.</p>
         * <p>For example, if min is 3, but the input array only contains 2 valid items, the validation will fail.</p>
         */
        min: Integer;
        /**
         * @name sogv.ChoiceValidator#minMessage
         * @type {String}
         * @description
         * <p>This is the validation error message that's displayed when the user chooses too few choices per the min option.</p>
         * <p>Default: "<code>You must select at least {{ limit }} choices.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%limit%%</code></td>
         *             <td>Min count of selected options</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%choices%%</code></td>
         *             <td>A comma-separated list of available choices</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        minMessage: string;
        /**
         * @name sogv.ChoiceValidator#multiple
         * @type {Boolean}
         * @description
         * <p>If this option is true, the input value is expected to be an array instead of a single, scalar value.</p>
         * <p>The constraint will check that each value of the input array can be found in the array of valid choices.</p>
         * <p>If even one of the input values cannot be found, the validation will fail.</p>
         * <p>Default: <code>false</code></p>
         */
        multiple: boolean;
        /**
         * @name sogv.ChoiceValidator#multipleMessage
         * @type {String}
         * @description
         * <p>This is the message that you will receive if the multiple option is set to true and one of the values on the underlying array being checked is not in the array of valid choices.</p>
         * <p>Default: "<code>One or more of the given values is invalid.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        multipleMessage: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>choice</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.CountValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a given collection's (i.e. an array or an object that implements Countable) element <code>count</code> is <code>between</code> some <code>minimum</code> and <code>maximum</code> value.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>count</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.CountValidator(data, {"min": 10, "max": 20});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class CountValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.CountValidator#exactMessage
         * @type {String}
         * @description
         * <p>The message that will be shown if min and max values are equal and the underlying collection elements count is not exactly this value.</p>
         * <p>Default: "<code>This collection should contain exactly %%limit%% elements.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%count%%</code></td>
         *             <td>The current collection size</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%limit%%</code></td>
         *             <td>The exact expected collection size</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        exactMessage: string;
        /**
         * @name sogv.CountValidator#max
         * @type {Integer}
         * @description
         * <p>This option is the "<code>max</code>" count value. Validation will fail if the given collection elements count is greater than this max value.</p>
         * <p>This option is required when the min option is not defined.</p>
         */
        max: Integer;
        /**
         * @name sogv.CountValidator#maxMessage
         * @type {String}
         * @description
         * <p>The message that will be shown if the underlying collection elements count is more than the max option.</p>
         * <p>Default: "<code>This collection should contain %%limit%% elements or less.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%count%%</code></td>
         *             <td>The current collection size</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%limit%%</code></td>
         *             <td>The upper limit</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        maxMessage: string;
        /**
         * @name sogv.CountValidator#min
         * @type {Integer}
         * @description
         * <p>This option is the "<code>min</code>" count value. Validation will fail if the given collection elements count is less than this min value.</p>
         * <p>This option is required when the max option is not defined.</p>
         */
        min: Integer;
        /**
         * @name sogv.CountValidator#minMessage
         * @type {String}
         * @description
         * <p>The message that will be shown if the underlying collection elements count is less than the min option.</p>
         * <p>Default: "<code>This collection should contain %%limit%% elements or more.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%count%%</code></td>
         *             <td>The current collection size</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%limit%%</code></td>
         *             <td>The lower limit</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        minMessage: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>count</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.CountryValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is a valid {@link https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes/ISO 3166-1 alpha-2} <code>country</code> code.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>country</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.CountryValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class CountryValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.CountryValidator#message
         * @type {String}
         * @description
         * <p>This message is shown if the <code>string</code> is not a valid country code.</p>
         * <p>Default:"<code>This value is not a valid country.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) country code</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>country</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.CurrencyValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is a valid {@link https://en.wikipedia.org/wiki/ISO_4217|3-letter ISO 4217} <code>currency</code> name.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>currency</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.CurrencyValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class CurrencyValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.CurrencyValidator#message
         * @type {String}
         * @description
         * This is the message that will be shown if the value is not a valid currency.</p>
         * <p>Default: "<code>This value is not a valid currency.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>currency</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.DateTimeValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is a valid "<code>datetime</code>", meaning a string (or an object that can be cast into a string) that follows a specific format.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>date-time</code>', '<code>date_format</code>', '<code>date-format</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.DateTimeValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class DateTimeValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.DateTimeValidator#message
         * @type {String}
         * @description
         * <p>This message is shown if the underlying data is not a valid datetime.</p>
         * <p>Default: "This value is not a valid datetime."</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.DateTimeValidator#format
         * @type {String}
         * @description
         * <p>This option allows to validate a custom date format.</p>
         * <p>Default: "<code>YYYY-MM-DD HH:mm:ss</code>"</p>
         * <p><h2>Year, month, and day tokens</h2></p>
         * <p><i>Tokens are case-sensitive.</i></p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Input</th>
         *             <th>Example</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>YYYY</code></td>
         *             <td><code>2014</code></td>
         *             <td>4 or 2 digit year</td>
         *         </tr>
         *         <tr>
         *             <td><code>YY</code></td>
         *             <td><code>14</code></td>
         *             <td>2 digit year</td>
         *         </tr>
         *         <tr>
         *             <td><code>Y</code></td>
         *             <td><code>-25</code></td>
         *             <td>Year with any number of digits and sign</td>
         *         </tr>
         *         <tr>
         *             <td><code>Q</code></td>
         *             <td><code>1..4</code></td>
         *             <td>Quarter of year. Sets month to first month in quarter.</td>
         *         </tr>
         *         <tr>
         *             <td><code>M MM</code></td>
         *             <td><code>1..12</code></td>
         *             <td>Month number</td>
         *         </tr>
         *         <tr>
         *             <td><code>MMM MMMM</code></td>
         *             <td><code>Jan..December</code></td>
         *             <td>Month name in locale that is specified</td>
         *         </tr>
         *         <tr>
         *             <td><code>D DD</code></td>
         *             <td><code>1..31</code></td>
         *             <td>Day of month</td>
         *         </tr>
         *         <tr>
         *             <td><code>Do</code></td>
         *             <td><code>1st..31st</code></td>
         *             <td>Day of month with ordinal</td>
         *         </tr>
         *         <tr>
         *             <td><code>DDD DDDD</code></td>
         *             <td><code>1..365</code></td>
         *             <td>Day of year</td>
         *         </tr>
         *         <tr>
         *             <td><code>X</code></td>
         *             <td><code>1410715640.579</code></td>
         *             <td>Unix timestamp</td>
         *         </tr>
         *         <tr>
         *             <td><code>x</code></td>
         *             <td><code>1410715640579</code></td>
         *             <td>Unix ms timestamp</td>
         *         </tr>
         *     </tbody>
         * </table>
         * <p><h2>Week year, week, and weekday tokens</h2></p>
         * <p><i>Tokens are case-sensitive.</i></p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Input</th>
         *             <th>Example</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>gggg</code></td>
         *             <td><code>2014</code></td>
         *             <td>Locale 4 digit week year</td>
         *         </tr>
         *         <tr>
         *             <td><code>gg</code>
         *             </td><td><code>14</code></td>
         *             <td>Locale 2 digit week year</td>
         *         </tr>
         *         <tr>
         *             <td><code>w ww</code></td>
         *             <td><code>1..53</code></td>
         *             <td>Locale week of year</td>
         *         </tr>
         *         <tr>
         *             <td><code>e</code></td>
         *             <td><code>0..6</code></td>
         *             <td>Locale day of week</td>
         *         </tr>
         *         <tr>
         *             <td><code>ddd dddd</code></td>
         *             <td><code>Mon...Sunday</code></td>
         *             <td>Day name in locale that is specified</td>
         *         </tr>
         *         <tr>
         *             <td><code>GGGG</code></td>
         *             <td><code>2014</code></td>
         *             <td>ISO 4 digit week year</td>
         *         </tr>
         *         <tr>
         *             <td><code>GG</code></td>
         *             <td><code>14</code></td>
         *             <td>ISO 2 digit week year</td>
         *         </tr>
         *         <tr>
         *             <td><code>W WW</code></td>
         *             <td><code>1..53</code></td>
         *             <td>ISO week of year</td>
         *         </tr>
         *         <tr>
         *             <td><code>E</code></td>
         *             <td><code>1..7</code></td>
         *             <td>ISO day of week</td>
         *         </tr>
         *     </tbody>
         * </table>
         * <p><h2>Locale aware formats</h2></p>
         * <p><i>Tokens are case-sensitive.</i></p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Input</th>
         *             <th>Example</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>L</code></td>
         *             <td><code>04/09/1986</code></td>
         *             <td>Date (in local format)</td>
         *         </tr>
         *         <tr>
         *             <td><code>LL</code></td>
         *             <td><code>September 4 1986</code></td>
         *             <td>Month name, day of month, year</td>
         *         </tr>
         *         <tr>
         *             <td><code>LLL</code></td>
         *             <td><code>September 4 1986 8:30 PM</code></td>
         *             <td>Month name, day of month, year, time</td>
         *         </tr>
         *         <tr>
         *             <td><code>LLLL</code></td>
         *             <td><code>Thursday, September 4 1986 8:30 PM</code></td>
         *             <td>Day of week, month name, day of month, year, time</td>
         *         </tr>
         *         <tr>
         *             <td><code>LT</code></td>
         *             <td><code>08:30 PM</code></td>
         *             <td>Time (without seconds)</td>
         *         </tr>
         *         <tr>
         *             <td><code>LTS</code></td>
         *             <td><code>08:30:00 PM</code></td>
         *             <td>Time (with seconds)</td>
         *         </tr>
         *     </tbody>
         * </table>
         * <p><h2>Hour, minute, second, millisecond, and offset tokens</h2></p>
         * <p><i>Tokens are case-sensitive.</i></p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Input</th>
         *             <th>Example</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>H HH</code></td>
         *             <td><code>0..23</code></td>
         *             <td>Hours (24 hour time)</td>
         *         </tr>
         *         <tr>
         *             <td><code>h hh</code></td>
         *             <td><code>1..12</code></td>
         *             <td>Hours (12 hour time used with <code>a A</code>.)</td>
         *         </tr>
         *         <tr>
         *             <td><code>k kk</code></td>
         *             <td><code>1..24</code></td>
         *             <td>Hours (24 hour time from 1 to 24)</td>
         *         </tr>
         *         <tr>
         *             <td><code>a A</code></td>
         *             <td><code>am pm</code></td>
         *             <td>Post or ante meridiem (Note the one character <code>a p</code> are also considered valid)</td>
         *         </tr>
         *         <tr>
         *             <td><code>m mm</code></td>
         *             <td><code>0..59</code></td>
         *             <td>Minutes</td>
         *         </tr>
         *         <tr>
         *             <td><code>s ss</code></td>
         *             <td><code>0..59</code></td>
         *             <td>Seconds</td>
         *         </tr>
         *         <tr>
         *             <td><code>S SS SSS</code></td>
         *             <td><code>0..999</code></td>
         *             <td>Fractional seconds</td>
         *         </tr>
         *         <tr>
         *             <td><code>Z ZZ</code></td>
         *             <td><code>+12:00</code></td>
         *             <td>Offset from UTC as <code>+-HH:mm</code>, <code>+-HHmm</code>, or <code>Z</code></td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        format: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>date-time</code>', '<code>date_format</code>', '<code>date-format</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.DateValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is a valid <code>date</code>, meaning a string (or an object that can be cast into a string) that follows a valid <code>YYYY-MM-DD</code> format.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>date</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.DateValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class DateValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.DateValidator#message
         * @type {String}
         * @description
         * <p>This message is shown if the underlying data is not a valid date.</p>
         * <p>Default: "<code>This value is not a valid date.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>date</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.DivisibleByValidator
     * @extends sogv.BaseComparisonValidator
     * @classdesc
     * <p>Validates that a value is divisible by another value, defined in the options.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>divisible-by</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.DivisibleByValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class DivisibleByValidator extends sogv.BaseComparisonValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.DivisibleByValidator#message
         * @type {String}
         * @description
         * <p>This is the message that will be shown if the value is not divisible by the comparison value.</p>
         * <p>Default: "<code>This value should be a multiple of %%compared_value%%.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%compared_value%%</code></td>
         *             <td>The expected value</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%compared_value_type%%</code></td>
         *             <td>The expected value type</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.DivisibleByValidator#value
         * @type {*}
         * @description
         * <p>This option is required.</p>
         * <p>It defines the value to compare to.</p>
         * <p>It can be a <code>number</code> or <code>date object</code>.</p>
         */
        value: any;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>divisible-by</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.EmailValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is a valid <code>email address</code>.</p>
     * <p>The underlying value is cast to a string before being validated.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>email</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.EmailValidator(data, {data: 'loose'});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class EmailValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.EmailValidator#mode
         * @type {String}
         * @description
         * <p>This option is optional and defines the pattern the <code>email</code> address is validated against.</p>
         * <p>Default: '<code>html5</code>'</p>
         * <p>Valid values are:</p>
         * <ul>
         *     <li><b>loose</b> - A simple regular expression. Allows all values with an "@" symbol in, and a "." in the second host part of the email address.</li>
         *     <!--li><b>strict</b> - Uses the egulias/email-validator library to perform an RFC compliant validation. You will need to install that library to use this mode.</li-->
         *     <li><b>html5</b> - This matches the pattern used for the {@link https://www.w3.org/TR/html5/sec-forms.html#email-state-typeemail|HTML5 email input element}.</li>
         * </ul>
         */
        mode: string;
        /**
         * @name sogv.EmailValidator#normalize
         * @type {Boolean}
         * @description
         * <p>Normalizer string before validate (trim, etc.).</p>
         * <p>Default: <code>false</code></p>
         */
        normalize: boolean;
        /**
         * @name sogv.EmailValidator#message
         * @type {String}
         * @description
         * <p>This message is shown if the underlying data is not a valid email address.</p>
         * <p>Default: "<code>This value is not a valid email address.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>email</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.EqualToValidator
     * @extends sogv.BaseComparisonValidator
     * @classdesc
     * <p>Validates that a value is equal to another value, defined in the options.</p>
     * <p>This constraint compares using <code>==</code>, so <code>3</code> and "<code>3</code>" are considered equal. Use <code>sogv.IdenticalTo</code> to compare with <code>===</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>equal-to</code>', '<code>equal</code>', '<code>same</code>', '<code>et</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.EqualToValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class EqualToValidator extends sogv.BaseComparisonValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.EqualToValidator#message
         * @type {String}
         * @description
         * <p>This is the message that will be shown if the value is not equal.</p>
         * <p>Default: "<code>This value should be equal to %%compared_value%%.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%compared_value%%</code></td>
         *             <td>The expected value</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%compared_value_type%%</code></td>
         *             <td>The expected value type</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.EqualToValidator#value
         * @type {*}
         * @description
         * <p>This option is required.</p>
         * <p>It defines the value to compare to.</p>
         * <p>It can be a <code>string</code>, <code>number</code> or <code>object</code>.</p>
         */
        value: any;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>equal-to</code>', '<code>equal</code>', '<code>same</code>', '<code>et</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.GreaterThanOrEqualValidator
     * @extends sogv.BaseComparisonValidator
     * @classdesc
     * <p>Validates that a value is <code>greater than</code> or <code>equal</code> to another value, defined in the options.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>greater_than_or_equal</code>', '<code>greater-than-or-equal</code>', '<code>min</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.GreaterThanOrEqualValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class GreaterThanOrEqualValidator extends sogv.BaseComparisonValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.GreaterThanOrEqualValidator#message
         * @type {String}
         * @description
         * <p>This is the message that will be shown if the value is not greater than or equal to the comparison value.</p>
         * <p>Default: "<code>This value should be greater than or equal to %%compared_value%%.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%compared_value%%</code></td>
         *             <td>The expected value</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%compared_value_type%%</code></td>
         *             <td>The expected value type</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.GreaterThanOrEqualValidator#value
         * @type {*}
         * @description
         * <p>This option is required.</p>
         * <p>It defines the value to compare to.</p>
         * <p>It can be a <code>string</code>, <code>number</code> or <code>date object</code>.</p>
         */
        value: any;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>greater_than_or_equal</code>', '<code>greater-than-or-equal</code>', '<code>min</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.GreaterThanValidator
     * @extends sogv.BaseComparisonValidator
     * @classdesc
     * <p>Validates that a value is <code>greater</code> than another value, defined in the options.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>greater_than</code>', '<code>greater-than</code>', '<code>greater</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.GreaterThanValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class GreaterThanValidator extends sogv.BaseComparisonValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.GreaterThanValidator#message
         * @type {String}
         * @description
         * <p>This is the message that will be shown if the value is not greater than the comparison value.</p>
         * <p>Default: "<code>This value should be greater than %%compared_value%%.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%compared_value%%</code></td>
         *             <td>The expected value</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%compared_value_type%%</code></td>
         *             <td>The expected value type</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.GreaterThanValidator#value
         * @type {*}
         * @description
         * <p>This option is required.</p>
         * <p>It defines the value to compare to.</p>
         * <p>It can be a <code>string</code>, <code>number</code> or <code>date object</code>.</p>
         */
        value: any;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>greater_than</code>', '<code>greater-than</code>', '<code>greater</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.IbanValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>This constraint is used to ensure that a bank account number has the proper format of an {@link https://en.wikipedia.org/wiki/International_Bank_Account_Number|International Bank Account Number (IBAN)}.</p>
     * <p><code>IBAN</code> is an internationally agreed means of identifying bank accounts across national borders with a reduced risk of propagating transcription errors.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>iban</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.IbanValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class IbanValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.IbanValidator#message
         * @type {String}
         * @description
         * <p>The default message supplied when the value does not pass the <code>IBAN</code> check.</p>
         * <p>Default: "<code>This is not a valid International Bank Account Number (IBAN).</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>iban</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.IdenticalToValidator
     * @extends sogv.BaseComparisonValidator
     * @classdesc
     * <p>Validates that a value is identical to another value, defined in the options.</p>
     * <p>This constraint compares using <code>===</code>, so <code>3</code> and "<code>3</code>" are not considered equal.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>identical-to</code>', '<code>identical</code>', '<code>it</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.IdenticalToValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class IdenticalToValidator extends sogv.BaseComparisonValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.IdenticalToValidator#message
         * @type {String}
         * @description
         * <p>This is the message that will be shown if the value is not identical.</p>
         * <p>Default: "<code>This value should be identical to %%compared_value_type%% %%compared_value%%.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%compared_value%%</code></td>
         *             <td>The expected value</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%compared_value_type%%</code></td>
         *             <td>The expected value type</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.IdenticalToValidator#value
         * @type {*}
         * @description
         * <p>This option is <code>required</code>.</p>
         * <p>It defines the value to compare to.</p>
         * <p>It can be a <code>string</code>, <code>number</code> or <code>object</code>.</p>
         */
        value: any;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>identical-to</code>', '<code>identical</code>', '<code>it</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.IpValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is a valid IP address.</p>
     * <p>By default, this will validate the value as <code>IPv4</code>, but a number of different options exist to validate as <code>IPv6</code> and many other combinations.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>ip</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.IpValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class IpValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.IpValidator#message
         * @type {String}
         * @description
         * <p>This message is shown if the string is not a valid IP address.</p>
         * <p>Default: "<code>This is not a valid IP address.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.IpValidator#normalize
         * @type {Boolean}
         * @description
         * <p>Normalizer string before validate (trim, etc.).</p>
         * <p>Default: <code>false</code>.</p>
         */
        normalize: boolean;
        /**
         * @name sogv.IpValidator#version
         * @type {String}
         * @description
         * <p>This determines exactly how the IP address is validated and can take one of a variety of different values.</p>
         * <p>Default: "<code>4</code>".</p>
         * <b>All ranges</b>
         * <ul>
         *     <li><b>4</b> - Validates for IPv4 addresses</li>
         *     <li><b>6</b> - Validates for IPv6 addresses</li>
         *     <li><b>all</b> - Validates all IP formats</li>
         * </ul>
         * <b>No private ranges</b>
         * <ul>
         *     <li><b>4_no_priv</b> - Validates for IPv4 but without private IP ranges</li>
         *     <li><b>6_no_priv</b> - Validates for IPv6 but without private IP ranges</li>
         *     <li><b>all_no_priv</b> - Validates for all IP formats but without private IP ranges</li>
         * </ul>
         * <b>No reserved ranges</b>
         * <ul>
         *     <li><b>4_no_res</b> - Validates for IPv4 but without reserved IP ranges</li>
         *     <li><b>6_no_res</b> - Validates for IPv6 but without reserved IP ranges</li>
         *     <li><b>all_no_res</b> - Validates for all IP formats but without reserved IP ranges</li>
         * </ul>
         * <b>Only public ranges</b>
         * <ul>
         *     <li><b>4_public</b> - Validates for IPv4 but without private and reserved ranges</li>
         *     <li><b>6_public</b> - Validates for IPv6 but without private and reserved ranges</li>
         *     <li><b>all_public</b> - Validates for all IP formats but without private and reserved ranges</li>
         * </ul>
         */
        version: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>ip</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.IsFalseValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is <code>false</code>.</p>
     * <p>Specifically, this checks to see if the value is exactly <code>false</code>, exactly the integer <code>0</code>, or exactly the string <code>"0"</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>is-false</code>', '<code>false</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.IsFalseValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class IsFalseValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.IsFalseValidator#message
         * @type {String}
         * @description
         * <p>This message is shown if the underlying data is not false.</p>
         * <p>Default: "<code>This value should be false.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>is-false</code>', '<code>false</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.IsNullValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is exactly equal to <code>null</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>is-null</code>', '<code>null</code>', '<code>nullable</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.IsNullValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class IsNullValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.IsNullValidator#message
         * @type {String}
         * @description
         * <p>This is the message that will be shown if the value is not null.</p>
         * <p>Default: "<code>This value should be null.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>is-null</code>', '<code>null</code>', '<code>nullable</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.IsTrueValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is <code>true</code>.</p>
     * <p>Specifically, this checks if the value is exactly <code>true</code>, exactly the integer <code>1</code>, or exactly the string <code>"1"</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>is-true</code>', '<code>true</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.IsTrueValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class IsTrueValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.IsTrueValidator#message
         * @type {String}
         * @description
         * <p>This message is shown if the underlying data is not true.</p>
         * <p>Default: "<code>This value should be true.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>is-true</code>', '<code>true</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.IsbnValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>This constraint validates that an {@link https://en.wikipedia.org/wiki/Isbn|International Standard Book Number (ISBN)} is either a valid <code>ISBN-10</code> or a valid <code>ISBN-13</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>isbn</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.IsbnValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class IsbnValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.IsbnValidator#bothIsbnMessage
         * @type {String}
         * @description
         * <p>The message that will be shown if the type option is null and the given value does not pass any of the <code>ISBN</code> checks.</p>
         * <p>Default: "<code>This value is neither a valid ISBN-10 nor a valid ISBN-13.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        bothIsbnMessage: string;
        /**
         * @name sogv.IsbnValidator#isbn10Message
         * @type {String}
         * @description
         * <p>The message that will be shown if the type option is isbn10 and the given value does not pass the <code>ISBN-10</code> check.</p>
         * <p>Default: "<code>This value is not a valid ISBN-10.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        isbn10Message: string;
        /**
         * @name sogv.IsbnValidator#isbn13Message
         * @type {String}
         * @description
         * <p>The message that will be shown if the type option is <code>isbn13</code> and the given value does not pass the <code>ISBN-13</code> check.</p>
         * <p>Default: "<code>This value is not a valid ISBN-13.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        isbn13Message: string;
        /**
         * @name sogv.IsbnValidator#message
         * @type {String}
         * @description
         * <p>The message that will be shown if the value is not valid. If not <code>null</code>, this message has priority over all the other messages.</p>
         * <p>Default: <code>null</code></p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.IsbnValidator#type
         * @type {String}
         * @description
         * <p>The type of ISBN to validate against. Valid values are <code>isbn10</code>, <code>isbn13</code> and <code>null</code> to accept any kind of <code>ISBN</code>.</p>
         * <p>Default: <code>null</code></p>
         */
        type: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>isbn</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.IssnValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is a valid {@link https://en.wikipedia.org/wiki/Issn|International Standard Serial Number (ISSN)}.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>issn</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.IssnValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class IssnValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.IssnValidator#caseSensitive
         * @type {Boolean}
         * @description
         * <p>The validator will allow <code>ISSN</code> values to end with a lower case '<code>x</code>' by default.</p>
         * <p>When switching this to <code>true</code>, the validator requires an upper case '<code>X</code>'.</p>
         * <p>Default: <code>false</code></p>
         */
        caseSensitive: boolean;
        /**
         * @name sogv.IssnValidator#requireHyphen
         * @type {Boolean}
         * @description
         * <p>The validator will allow non hyphenated <code>ISSN</code> values by default.</p>
         * <p>When switching this to <code>true</code>, the validator requires a hyphenated <code>ISSN</code> value.</p>
         * <p>Default: <code>false</code></p>
         */
        requireHyphen: boolean;
        /**
         * @name sogv.IssnValidator#message
         * @type {String}
         * @description
         * <p>The message shown if the given value is not a valid ISSN.</p>
         * <p>Default: "<code>This value is not a valid ISSN.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>issn</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.JsonValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value has valid <code>JSON</code> syntax.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>json</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.JsonValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class JsonValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.JsonValidator#message
         * @type {String}
         * @description
         * <p>This message is shown if the underlying data is not a valid JSON value.</p>
         * <p>Default: "<code>This value should be valid JSON.</code>"</p>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>json</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.LanguageValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is a valid <code>language</code> Unicode language identifier (e.g. <code>fr</code> or <code>ar-dz</code>).</p>
     * <p>Available languages:</p>
     * <p>'<code>aa</code>', '<code>ab</code>', '<code>ace</code>', '<code>ach</code>', '<code>ada</code>', '<code>ady</code>', '<code>ae</code>', '<code>aeb</code>', '<code>af</code>', '<code>afh</code>', '<code>agq</code>', '<code>ain</code>', '<code>ak</code>', '<code>akk</code>', '<code>akz</code>', '<code>ale</code>', '<code>aln</code>', '<code>alt</code>', '<code>am</code>', '<code>an</code>', '<code>ang</code>', '<code>anp</code>', '<code>ar</code>', '<code>arc</code>', '<code>arn</code>', '<code>aro</code>', '<code>arp</code>', '<code>arq</code>', '<code>ars</code>', '<code>arw</code>', '<code>ary</code>', '<code>arz</code>', '<code>as</code>', '<code>asa</code>', '<code>ase</code>', '<code>ast</code>', '<code>av</code>', '<code>avk</code>', '<code>awa</code>', '<code>ay</code>', '<code>az</code>', '<code>ba</code>', '<code>bal</code>', '<code>ban</code>', '<code>bar</code>', '<code>bas</code>', '<code>bax</code>', '<code>bbc</code>', '<code>bbj</code>', '<code>be</code>', '<code>bej</code>', '<code>bem</code>', '<code>bew</code>', '<code>bez</code>', '<code>bfd</code>', '<code>bfq</code>', '<code>bg</code>', '<code>bgn</code>', '<code>bho</code>', '<code>bi</code>', '<code>bik</code>', '<code>bin</code>', '<code>bjn</code>', '<code>bkm</code>', '<code>bla</code>', '<code>bm</code>', '<code>bn</code>', '<code>bo</code>', '<code>bpy</code>', '<code>bqi</code>', '<code>br</code>', '<code>bra</code>', '<code>brh</code>', '<code>brx</code>', '<code>bs</code>', '<code>bss</code>', '<code>bua</code>', '<code>bug</code>', '<code>bum</code>', '<code>byn</code>', '<code>byv</code>', '<code>ca</code>', '<code>cad</code>', '<code>car</code>', '<code>cay</code>', '<code>cch</code>', '<code>ccp</code>', '<code>ce</code>', '<code>ceb</code>', '<code>cgg</code>', '<code>ch</code>', '<code>chb</code>', '<code>chg</code>', '<code>chk</code>', '<code>chm</code>', '<code>chn</code>', '<code>cho</code>', '<code>chp</code>', '<code>chr</code>', '<code>chy</code>', '<code>cic</code>', '<code>ckb</code>', '<code>co</code>', '<code>cop</code>', '<code>cps</code>', '<code>cr</code>', '<code>crh</code>', '<code>crs</code>', '<code>cs</code>', '<code>csb</code>', '<code>cu</code>', '<code>cv</code>', '<code>cy</code>', '<code>da</code>', '<code>dak</code>', '<code>dar</code>', '<code>dav</code>', '<code>de</code>', '<code>del</code>', '<code>den</code>', '<code>dgr</code>', '<code>din</code>', '<code>dje</code>', '<code>doi</code>', '<code>dsb</code>', '<code>dtp</code>', '<code>dua</code>', '<code>dum</code>', '<code>dv</code>', '<code>dyo</code>', '<code>dyu</code>', '<code>dz</code>', '<code>dzg</code>', '<code>ebu</code>', '<code>ee</code>', '<code>efi</code>', '<code>egl</code>', '<code>egy</code>', '<code>eka</code>', '<code>el</code>', '<code>elx</code>', '<code>en</code>', '<code>enm</code>', '<code>eo</code>', '<code>es</code>', '<code>esu</code>', '<code>et</code>', '<code>eu</code>', '<code>ewo</code>', '<code>ext</code>', '<code>fa</code>', '<code>fan</code>', '<code>fat</code>', '<code>ff</code>', '<code>fi</code>', '<code>fil</code>', '<code>fit</code>', '<code>fj</code>', '<code>fo</code>', '<code>fon</code>', '<code>fr</code>', '<code>frc</code>', '<code>frm</code>', '<code>fro</code>', '<code>frp</code>', '<code>frr</code>', '<code>frs</code>', '<code>fur</code>', '<code>fy</code>', '<code>ga</code>', '<code>gaa</code>', '<code>gag</code>', '<code>gan</code>', '<code>gay</code>', '<code>gba</code>', '<code>gbz</code>', '<code>gd</code>', '<code>gez</code>', '<code>gil</code>', '<code>gl</code>', '<code>glk</code>', '<code>gmh</code>', '<code>gn</code>', '<code>goh</code>', '<code>gom</code>', '<code>gon</code>', '<code>gor</code>', '<code>got</code>', '<code>grb</code>', '<code>grc</code>', '<code>gsw</code>', '<code>gu</code>', '<code>guc</code>', '<code>gur</code>', '<code>guz</code>', '<code>gv</code>', '<code>gwi</code>', '<code>ha</code>', '<code>hai</code>', '<code>hak</code>', '<code>haw</code>', '<code>he</code>', '<code>hi</code>', '<code>hif</code>', '<code>hil</code>', '<code>hit</code>', '<code>hmn</code>', '<code>ho</code>', '<code>hr</code>', '<code>hsb</code>', '<code>hsn</code><b', '<code>ht</code>', '<code>hu</code>', '<code>hup</code>', '<code>hy</code>', '<code>hz</code>', '<code>ia</code>', '<code>iba</code>', '<code>ibb</code>', '<code>id</code>', '<code>ie</code>', '<code>ig</code>', '<code>ii</code>', '<code>ik</code>', '<code>ilo</code>', '<code>inh</code>', '<code>io</code>', '<code>is</code>', '<code>it</code>', '<code>iu</code>', '<code>izh</code>', '<code>ja</code>', '<code>jam</code>', '<code>jbo</code>', '<code>jgo</code>', '<code>jmc</code>', '<code>jpr</code>', '<code>jrb</code>', '<code>jut</code>', '<code>jv</code>', '<code>ka</code>', '<code>kaa</code>', '<code>kab</code>', '<code>kac</code>', '<code>kaj</code>', '<code>kam</code>', '<code>kaw</code>', '<code>kbd</code>', '<code>kbl</code>', '<code>kcg</code>', '<code>kde</code>', '<code>kea</code>', '<code>ken</code>', '<code>kfo</code>', '<code>kg</code>', '<code>kgp</code>', '<code>kha</code>', '<code>kho</code>', '<code>khq</code>', '<code>khw</code>', '<code>ki</code>', '<code>kiu</code>', '<code>kj</code>', '<code>kk</code>', '<code>kkj</code>', '<code>kl</code>', '<code>kln</code>', '<code>km</code>', '<code>kmb</code>', '<code>kn</code>', '<code>ko</code>', '<code>koi</code>', '<code>kok</code>', '<code>kos</code>', '<code>kpe</code>', '<code>kr</code>', '<code>krc</code>', '<code>kri</code>', '<code>krj</code>', '<code>krl</code>', '<code>kru</code>', '<code>ks</code>', '<code>ksb</code>', '<code>ksf</code>', '<code>ksh</code>', '<code>ku</code>', '<code>kum</code>', '<code>kut</code>', '<code>kv</code>', '<code>kw</code>', '<code>ky</code>', '<code>la</code>', '<code>lad</code>', '<code>lag</code>', '<code>lah</code>', '<code>lam</code>', '<code>lb</code>', '<code>lez</code>', '<code>lfn</code>', '<code>lg</code>', '<code>li</code>', '<code>lij</code>', '<code>liv</code>', '<code>lkt</code>', '<code>lmo</code>', '<code>ln</code>', '<code>lo</code>', '<code>lol</code>', '<code>lou</code>', '<code>loz</code>', '<code>lrc</code>', '<code>lt</code>', '<code>ltg</code>', '<code>lu</code>', '<code>lua</code>', '<code>lui</code>', '<code>lun</code>', '<code>luo</code>', '<code>lus</code>', '<code>luy</code>', '<code>lv</code>', '<code>lzh</code>', '<code>lzz</code>', '<code>mad</code>', '<code>maf</code>', '<code>mag</code>', '<code>mai</code>', '<code>mak</code>', '<code>man</code>', '<code>mas</code>', '<code>mde</code>', '<code>mdf</code>', '<code>mdr</code>', '<code>men</code>', '<code>mer</code>', '<code>mfe</code>', '<code>mg</code>', '<code>mga</code>', '<code>mgh</code>', '<code>mgo</code>', '<code>mh</code>', '<code>mi</code>', '<code>mic</code>', '<code>min</code>', '<code>mk</code>', '<code>ml</code>', '<code>mn</code>', '<code>mnc</code>', '<code>mni</code>', '<code>moh</code>', '<code>mos</code>', '<code>mr</code>', '<code>mrj</code>', '<code>ms</code>', '<code>mt</code>', '<code>mua</code>', '<code>mus</code>', '<code>mwl</code>', '<code>mwr</code>', '<code>mwv</code>', '<code>my</code>', '<code>mye</code>', '<code>myv</code>', '<code>mzn</code>', '<code>na</code>', '<code>nan</code>', '<code>nap</code>', '<code>naq</code>', '<code>nb</code>', '<code>nd</code>', '<code>nds</code>', '<code>ne</code>', '<code>new</code>', '<code>ng</code>', '<code>nia</code>', '<code>niu</code>', '<code>njo</code>', '<code>nl</code>', '<code>nmg</code>', '<code>nn</code>', '<code>nnh</code>', '<code>no</code>', '<code>nog</code>', '<code>non</code>', '<code>nov</code>', '<code>nqo</code>', '<code>nr</code>', '<code>nso</code>', '<code>nus</code>', '<code>nv</code>', '<code>nwc</code>', '<code>ny</code>', '<code>nym</code>', '<code>nyn</code>', '<code>nyo</code>', '<code>nzi</code>', '<code>oc</code>', '<code>oj</code>', '<code>om</code>', '<code>or</code>', '<code>os</code>', '<code>osa</code>', '<code>ota</code>', '<code>pa</code>', '<code>pag</code>', '<code>pal</code>', '<code>pam</code>', '<code>pap</code>', '<code>pau</code>', '<code>pcd</code>', '<code>pcm</code>', '<code>pdc</code>', '<code>pdt</code>', '<code>peo</code>', '<code>pfl</code>', '<code>phn</code>', '<code>pi</code>', '<code>pl</code>', '<code>pms</code>', '<code>pnt</code>', '<code>pon</code>', '<code>prg</code>', '<code>pro</code>', '<code>ps</code>', '<code>pt</code>', '<code>qu</code>', '<code>quc</code>', '<code>qug</code>', '<code>raj</code>', '<code>rap</code>', '<code>rar</code>', '<code>rgn</code>', '<code>rif</code>', '<code>rm</code>', '<code>rn</code>', '<code>ro</code>', '<code>rof</code>', '<code>rom</code>', '<code>rtm</code>', '<code>ru</code>', '<code>rue</code>', '<code>rug</code>', '<code>rup</code>', '<code>rw</code>', '<code>rwk</code>', '<code>sa</code>', '<code>sad</code>', '<code>sah</code>', '<code>sam</code>', '<code>saq</code>', '<code>sas</code>', '<code>sat</code>', '<code>saz</code>', '<code>sba</code>', '<code>sbp</code>', '<code>sc</code>', '<code>scn</code>', '<code>sco</code>', '<code>sd</code>', '<code>sdc</code>', '<code>sdh</code>', '<code>se</code>', '<code>see</code>', '<code>seh</code>', '<code>sei</code>', '<code>sel</code>', '<code>ses</code>', '<code>sg</code>', '<code>sga</code>', '<code>sgs</code>', '<code>sh</code>', '<code>shi</code>', '<code>shn</code>', '<code>shu</code>', '<code>si</code>', '<code>sid</code>', '<code>sk</code>', '<code>sl</code>', '<code>sli</code>', '<code>sly</code>', '<code>sm</code>', '<code>sma</code>', '<code>smj</code>', '<code>smn</code>', '<code>sms</code>', '<code>sn</code>', '<code>snk</code>', '<code>so</code>', '<code>sog</code>', '<code>sq</code>', '<code>sr</code>', '<code>srn</code>', '<code>srr</code>', '<code>ss</code>', '<code>ssy</code>', '<code>st</code>', '<code>stq</code>', '<code>su</code>', '<code>suk</code>', '<code>sus</code>', '<code>sux</code>', '<code>sv</code>', '<code>sw</code>', '<code>swb</code>', '<code>syc</code>', '<code>syr</code>', '<code>szl</code>', '<code>ta</code>', '<code>tcy</code>', '<code>te</code>', '<code>tem</code>', '<code>teo</code>', '<code>ter</code>', '<code>tet</code>', '<code>tg</code>', '<code>th</code>', '<code>ti</code>', '<code>tig</code>', '<code>tiv</code>', '<code>tk</code>', '<code>tkl</code>', '<code>tkr</code>', '<code>tl</code>', '<code>tlh</code>', '<code>tli</code>', '<code>tly</code>', '<code>tmh</code>', '<code>tn</code>', '<code>to</code>', '<code>tog</code>', '<code>tpi</code>', '<code>tr</code>', '<code>tru</code>', '<code>trv</code>', '<code>ts</code>', '<code>tsd</code>', '<code>tsi</code>', '<code>tt</code>', '<code>ttt</code>', '<code>tum</code>', '<code>tvl</code>', '<code>tw</code>', '<code>twq</code>', '<code>ty</code>', '<code>tyv</code>', '<code>tzm</code>', '<code>udm</code>', '<code>ug</code>', '<code>uga</code>', '<code>uk</code>', '<code>umb</code>', '<code>ur</code>', '<code>uz</code>', '<code>vai</code>', '<code>ve</code>', '<code>vec</code>', '<code>vep</code>', '<code>vi</code>', '<code>vls</code>', '<code>vmf</code>', '<code>vo</code>', '<code>vot</code>', '<code>vro</code>', '<code>vun</code>', '<code>wa</code>', '<code>wae</code>', '<code>wal</code>', '<code>war</code>', '<code>was</code>', '<code>wbp</code>', '<code>wo</code>', '<code>wuu</code>', '<code>xal</code>', '<code>xh</code>', '<code>xmf</code>', '<code>xog</code>', '<code>yao</code>', '<code>yap</code>', '<code>yav</code>', '<code>ybb</code>', '<code>yi</code>', '<code>yo</code>', '<code>yrl</code>', '<code>yue</code>', '<code>za</code>', '<code>zap</code>', '<code>zbl</code>', '<code>zea</code>', '<code>zen</code>', '<code>zgh</code>', '<code>zh</code>', '<code>zu</code>', '<code>zun</code>', '<code>zza</code>'</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>language</code>', '<code>lang</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.LanguageValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class LanguageValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.LanguageValidator#message
         * @type {String}
         * @description
         * <p>This message is shown if the string is not a valid language code.</p>
         * <p>Default: "<code>This value is not a valid language.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>language</code>', '<code>lang</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.LengthValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a given string length is between some <code>minimum</code> and <code>maximum</code> value.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>length</code>', '<code>len</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.LengthValidator(data, {min: 10});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class LengthValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.LengthValidator#allowEmptyString
         * @type {Boolean}
         * @description
         * <p>If set to true, empty strings are considered valid.</p>
         * <p>The default false value considers empty strings not valid.</p>
         * <p>Default: <code>false</code>.</p>
         */
        allowEmptyString: boolean;
        /**
         * @name sogv.LengthValidator#exactMessage
         * @type {String}
         * @description
         * <p>The message that will be shown if min and max values are equal and the underlying value's length is not exactly this value.</p>
         * <p>Default: "<code>This value should have exactly %%limit%% characters.</code>".</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <tr>
         *         <td><b>Parameter</b></td>
         *         <td><b>Description</b></td>
         *     </tr>
         *     <tr>
         *         <td><code>%%limit%%</code></td>
         *         <td>The exact expected length</td>
         *     </tr>
         *     <tr>
         *         <td><code>%%value%%</code></td>
         *         <td>The current (invalid) value</td>
         *     </tr>
         * </table>
         */
        exactMessage: string;
        /**
         * @name sogv.LengthValidator#max
         * @type {Integer}
         * @description This option is the "max" length value. Validation will fail if the given value's length is greater than this max value.
         * This option is required when the "min: option is not defined.
         */
        max: Integer;
        /**
         * @name sogv.LengthValidator#maxMessage
         * @type {String}
         * @description
         * <p>The message that will be shown if the underlying value's length is more than the max option.</p>
         * <p>Default: "<code>This value is too long. It should have %%limit%% characters or less.</code>".
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <tr>
         *         <td><b>Parameter</b></td>
         *         <td><b>Description</b></td>
         *     </tr>
         *     <tr>
         *         <td><code>%%limit%%</code></td>
         *         <td>The expected maximum length</td>
         *     </tr>
         *     <tr>
         *         <td><code>%%value%%</code></td>
         *         <td>The current (invalid) value</td>
         *     </tr>
         * </table>
         */
        maxMessage: string;
        /**
         * @name sogv.LengthValidator#min
         * @type {Integer}
         * @description
         * This option is the "min" length value. Validation will fail if the given value's length is less than this min value.
         * This option is required when the max option is not defined.
         * It is important to notice that NULL values and empty strings are considered valid no matter if the constraint required a minimum length. Validators are triggered only if the value is not blank.
         */
        min: Integer;
        /**
         * @name sogv.LengthValidator#minMessage
         * @type {String}
         * @description
         * <p>The message that will be shown if the underlying value's length is less than the min option.</p>
         * <p>Default: "<code>This value is too short. It should have %%limit%% characters or more.</code>".</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <tr>
         *         <td><b>Parameter</b></td>
         *         <td><b>Description</b></td>
         *     </tr>
         *     <tr>
         *         <td><code>%%limit%%</code></td>
         *         <td>The expected minimum length</td>
         *     </tr>
         *     <tr>
         *         <td><code>%%value%%</code></td>
         *         <td>The current (invalid) value</td>
         *     </tr>
         * </table>
         */
        minMessage: string;
        /**
         * @name sogv.LengthValidator#normalize
         * @type {Boolean}
         * @description
         * <p>Normalizer string before validate (trim, etc.).</p>
         * <p>Default: <code>false</code></p>
         */
        normalize: boolean;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>length</code>', '<code>len</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.LessThanOrEqualValidator
     * @extends sogv.BaseComparisonValidator
     * @classdesc
     * <p>Validates that a value is <code>less than</code> or <code>equal</code> to another value, defined in the options.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>less_than_or_equal</code>'', '<code>less-than-or-equal</code>', '<code>max</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.LessThanOrEqualValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class LessThanOrEqualValidator extends sogv.BaseComparisonValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.LessThanOrEqualValidator#message
         * @type {String}
         * @description
         * <p>This is the message that will be shown if the value is not less than or equal to the comparison value.</p>
         * <p>Default: "<code>This value should be less than or equal to %%compared_value%%.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%compared_value%%</code></td>
         *             <td>The expected value</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%compared_value_type%%</code></td>
         *             <td>The expected value type</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.LessThanOrEqualValidator#value
         * @type {*}
         * @description
         * <p>This option is required.</p>
         * <p>It defines the value to compare to.</p>
         * <p>It can be a <code>string</code>, <code>number</code> or <code>date object</code>.</p>
         */
        value: any;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>less_than_or_equal</code>'', '<code>less-than-or-equal</code>', '<code>max</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.LessThanValidator
     * @extends sogv.BaseComparisonValidator
     * @classdesc
     * <p>Validates that a value is less than another value, defined in the options.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>less_than</code>', '<code>less-than</code>', '<code>less</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.LessThanValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class LessThanValidator extends sogv.BaseComparisonValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.LessThanValidator#message
         * @type {String}
         * @description
         * <p>This is the message that will be shown if the value is not less than the comparison value.</p>
         * <p>Default: "<code>This value should be less than %%compared_value%%.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%compared_value%%</code></td>
         *             <td>The expected value</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%compared_value_type%%</code></td>
         *             <td>The expected value type</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.LessThanValidator#value
         * @type {*}
         * @description
         * <p>This option is required.</p>
         * <p>It defines the value to compare to.</p>
         * <p>It can be a <code>string</code>, <code>number</code> or <code>date object</code>.</p>
         */
        value: any;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>less_than</code>', '<code>less-than</code>', '<code>less</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.LocaleValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is a valid <code>locale</code>.</p>
     * <p>The "<code>value</code>" for each locale is any of the {@link http://userguide.icu-project.org/locale|ICU format locale IDs}.</p>
     * <p>For example, the two letter {@link https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes|ISO 639-1} language code (e.g. <code>fr</code>), or the language code followed by an underscore (<code>_</code>) and the {@link https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes|ISO 3166-1 alpha-2} country code (e.g. fr_FR for French/France).</p>
     * <p>The given locale values are canonicalized before validating them to avoid issues with wrong uppercase/lowercase values and to remove unneeded elements (e.g. <code>FR-fr.utf8</code> will be validated as <code>fr_FR</code>).</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>locale</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.LocaleValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class LocaleValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.LocaleValidator#message
         * @type {String}
         * @description
         * <p>This message is shown if the string is not a valid locale.</p>
         * <p>Default: "<code>This value is not a valid locale.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>locale</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.LuhnValidator
     * @extends sogv.BaseComparisonValidator
     * @classdesc
     * <p>This constraint is used to ensure that a <code>credit card</code> number passes the {@link https://en.wikipedia.org/wiki/Luhn_algorithm|Luhn algorithm}.</p>
     * <p>It is useful as a first step to validating a credit card: before communicating with a payment gateway.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>luhn</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.LuhnValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class LuhnValidator extends sogv.BaseComparisonValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.LuhnValidator#message
         * @type {String}
         * @description
         * <p>The default message supplied when the value does not pass the Luhn check.</p>
         * <p>Default: "<code>Invalid card number.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>luhn</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.NegativeOrZeroValidator
     * @extends sogv.BaseComparisonValidator
     * @classdesc
     * <p>Validates that a value is a negative <code>number</code> or <code>equal</code> to <code>zero</code>.</p>
     * <p>If you don't want to allow <code>zero</code> as value, use <code>sogv.Negative</code> instead.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>negative-or-zero</code>', '<code>noz</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.NegativeOrZeroValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class NegativeOrZeroValidator extends sogv.BaseComparisonValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.NegativeOrZeroValidator#message
         * @type {String}
         * @description
         * <p>The default message supplied when the value is not less than or equal to zero.</p>
         * <p>Default: "<code>This value should be either negative or zero.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%compared_value%%</code></td>
         *             <td>The expected value</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%compared_value_type%%</code></td>
         *             <td>The expected value type</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>negative-or-zero</code>', '<code>noz</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.NegativeValidator
     * @extends sogv.BaseComparisonValidator
     * @classdesc
     * <p>Validates that a value is a <code>negative</code> number.</p>
     * <p>Zero is neither positive nor negative, so you must use <code>sogv.NegativeOrZero</code> if you want to allow zero as value.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>negative</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.NegativeValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class NegativeValidator extends sogv.BaseComparisonValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.NegativeValidator#message
         * @type {String}
         * @description
         * <p>The default message supplied when the value is not less than zero.</p>
         * <p>Default: "<code>This value should be negative.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%compared_value%%</code></td>
         *             <td>The expected value</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%compared_value_type%%</code></td>
         *             <td>The expected value type</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>negative</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.NotBlankValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is not blank - meaning not equal to a blank string, a blank array, <code>false</code> or <code>null</code> (null behavior is configurable).</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>not-blank</code>', '<code>not-empty</code>', '<code>filled</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.NotBlankValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class NotBlankValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.NotBlankValidator#allowNull
         * @type {Boolean}
         * @description
         * If set to <code>true</code>, <code>null</code> values are considered valid and won't trigger a constraint violation.</p>
         * Default: <code>false</code>
         */
        allowNull: boolean;
        /**
         * @name sogv.NotBlankValidator#normalize
         * @type {Boolean}
         * @description
         * <p>Normalizer string before validate (trim, etc.).</p>
         * <p>Default: <code>false</code></p>
         */
        normalize: boolean;
        /**
         * @name sogv.NotBlankValidator#message
         * @type {String}
         * @description
         * This is the message that will be shown if the value is blank.</p>
         * <p>Default: "<code>This value should not be blank.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>not-blank</code>', '<code>not-empty</code>', '<code>filled</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.NotEqualToValidator
     * @extends sogv.BaseComparisonValidator
     * @classdesc
     * <p>Validates that a value is not equal to another value, defined in the options.</p>
     * <p>This constraint compares using <code>!=</code>, so <code>3</code> and "<code>3</code>" are considered equal. <code>sogv.Use NotIdenticalTo</code> to compare with <code>!==</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>not-equal-to</code>', '<code>not-equal</code>', '<code>net</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.NotEqualToValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class NotEqualToValidator extends sogv.BaseComparisonValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.NotEqualToValidator#message
         * @type {String}
         * @description
         * <p>This is the message that will be shown if the value is not equal.</p>
         * <p>Default: "<code>This value should not be equal to %%compared_value%%.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%compared_value%%</code></td>
         *             <td>The expected value</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%compared_value_type%%</code></td>
         *             <td>The expected value type</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.NotEqualToValidator#value
         * @type {*}
         * @description
         * <p>This option is required.</p>
         * <p>It defines the value to compare to.</p>
         * <p>It can be a <code>string</code>, <code>number</code> or <code>object</code>.</p>
         */
        value: any;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>not-equal-to</code>', '<code>not-equal</code>', '<code>net</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.NotIdenticalToValidator
     * @extends sogv.BaseComparisonValidator
     * @classdesc
     * <p>Validates that a value is not identical to another value, defined in the options.</p>
     * <p>This constraint compares using <code>!==</code>, so <code>3</code> and "<code>3</code>" are considered not equal.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>not-identical-to</code>', '<code>not-identical</code>', '<code>nit</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.NotIdenticalToValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class NotIdenticalToValidator extends sogv.BaseComparisonValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.NotIdenticalToValidator#message
         * @type {String}
         * @description
         * This is the message that will be shown if the value is identical.</p>
         * <p>Default: "<code>This value should not be identical to %%compared_value_type%% %%compared_value%%.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%compared_value%%</code></td>
         *             <td>The expected value</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%compared_value_type%%</code></td>
         *             <td>The expected value type</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.NotIdenticalToValidator#value
         * @type {*}
         * @description
         * <p>This option is required.</p>
         * <p>It defines the value to compare to.</p>
         * <p>It can be a <code>string</code>, <code>number</code> or <code>object</code>.</p>
         */
        value: any;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>not-identical-to</code>', '<code>not-identical</code>', '<code>nit</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.NotNullValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is not strictly equal to <code>null</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>not-null</code>', '<code>required</code>', '<code>present</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.NotNullValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class NotNullValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.NotNullValidator#message
         * @type {String}
         * @description
         * <p>This is the message that will be shown if the value is null.</p>
         * <p>Default: "<code>This value should not be null.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>not-null</code>', '<code>required</code>', '<code>present</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.PositiveOrZeroValidator
     * @extends sogv.BaseComparisonValidator
     * @classdesc
     * <p>Validates that a value is a <code>positive</code> number or <code>equal</code> to <code>zero</code>.</p>
     * <p>If you don't want to allow zero as value, use <code>sogv.Positive</code> instead.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>positive-or-zero</code>', '<code>poz</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.PositiveOrZeroValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class PositiveOrZeroValidator extends sogv.BaseComparisonValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.PositiveOrZeroValidator#message
         * @type {String}
         * @description
         * <p>The default message supplied when the value is not <code>greater</code> than or <code>equal</code> to <code>zero</code>.</p>
         * <p>Default: "<code>This value should be either positive or zero.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%compared_value%%</code></td>
         *             <td>The expected value</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%compared_value_type%%</code></td>
         *             <td>The expected value type</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>positive-or-zero</code>', '<code>poz</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.PositiveValidator
     * @extends sogv.BaseComparisonValidator
     * @classdesc
     * <p>Validates that a value is a positive number.</p>
     * <p>Zero is neither positive nor negative, so you must use <code>sogv.PositiveOrZero</code> if you want to allow zero as value.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>positive</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.PositiveValidator(data, {"value": "the value to compare to"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class PositiveValidator extends sogv.BaseComparisonValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.PositiveValidator#message
         * @type {String}
         * @description
         * <p>The default message supplied when the value is not greater than zero.</p>
         * <p>Default: "<code>This value should be positive.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%compared_value%%</code></td>
         *             <td>The expected value</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%compared_value_type%%</code></td>
         *             <td>The expected value type</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>positive</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.RangeValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a given <code>number</code> or <code>Date object</code> is between some <code>minimum</code> and <code>maximum</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>range</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.RangeValidator('1991-12-17T03:24:00', {"min":"1990-12-17T03:24:00","max":"1995-12-17T03:24:00"});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class RangeValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.RangeValidator#invalidMessage
         * @type {String}
         * @description
         * <p>The message that will be shown if the underlying value is not a number.</p>
         * <p>Default: "<code>This value should be a valid number.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        invalidMessage: string;
        /**
         * @name sogv.RangeValidator#max
         * @type {Number|String|Date}
         * @description
         * This required option is the "max" value. Validation will fail if the given value is greater than this max value.
         */
        max: number | string | Date;
        /**
         * @name sogv.RangeValidator#maxMessage
         * @type {String}
         * @description
         * <p>The message that will be shown if the underlying value is more than the max option.</p>
         * <p>Default: "<code>This value should be %%limit%% or less.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <tr>
         *         <td><b>Parameter</b></td>
         *         <td><b>Description</b></td>
         *     </tr>
         *     <tr>
         *         <td><code>%%limit%%</code></td>
         *         <td>The upper limit</td>
         *     </tr>
         *     <tr>
         *         <td><code>%%value%%</code></td>
         *         <td>The current (invalid) value</td>
         *     </tr>
         * </table>
         */
        maxMessage: string;
        /**
         * @name sogv.RangeValidator#min
         * @type {Number|String|Date}
         * @description
         * This required option is the "min" value. Validation will fail if the given value is less than this min value.
         */
        min: number | string | Date;
        /**
         * @name sogv.RangeValidator#minMessage
         * @type {String}
         * @description
         * <p>The message that will be shown if the underlying value is less than the min option.</p>
         * <p>Default: "<code>This value should be %%limit%% or more.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <tr>
         *         <td><b>Parameter</b></td>
         *         <td><b>Description</b></td>
         *     </tr>
         *     <tr>
         *         <td><code>%%limit%%</code></td>
         *         <td>The lower limit</td>
         *     </tr>
         *     <tr>
         *         <td><code>%%value%%</code></td>
         *         <td>The current (invalid) value</td>
         *     </tr>
         * </table>
         */
        minMessage: string;
        /**
         * @name sogv.RangeValidator#notInRangeMessage
         * @type {String}
         * @description
         * <p>The message that will be shown if the underlying value is less than the min option or greater than the max option.</p>
         * <p>Default: "<code>This value should be between %%min%% and %%max%%.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <tr>
         *         <td><b>Parameter</b></td>
         *         <td><b>Description</b></td>
         *     </tr>
         *     <tr>
         *         <td><code>%%max%%</code></td>
         *         <td>The upper limit</td>
         *     </tr>
         *     <tr>
         *         <td><code>%%min%%</code></td>
         *         <td>The lower limit</td>
         *     </tr>
         *     <tr>
         *         <td><code>%%value%%</code></td>
         *         <td>The current (invalid) value</td>
         *     </tr>
         * </table>
         */
        notInRangeMessage: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>range</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.RegexValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value matches a regular expression.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>regex</code>', '<code>regexp</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.RegexValidator(data, {pattern: 'regular expression'});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class RegexValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.RegexValidator#match
         * @type {Boolean}
         * @description
         * <p>If <code>true</code> (or not set), this validator will pass if the given string matches the given pattern regular expression.</p>
         * <p>However, when this option is set to false, the opposite will occur: validation will pass only if the given string does not match the pattern regular expression.</p>
         * <p>Default: <code>true</code>.</p>
         */
        match: boolean;
        /**
         * @name sogv.RegexValidator#message
         * @type {String}
         * @description
         * This is the message that will be shown if this validator fails.</p>
         * <p>Default: "<code>This value is not valid.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.RegexValidator#pattern
         * @type {String}
         * @description
         * <p>This required option is the regular expression pattern that the input will be matched against.</p>
         * <p>By default, this validator will fail if the input string does not match this regular expression.</p>
         * <p>However, if match is set to <code>false</code>, then validation will fail if the input string does match this pattern.</p>
         */
        pattern: string;
        /**
         * @name sogv.RegexValidator#normalize
         * @type {Boolean}
         * @description
         * <p>Normalizer string before validate (trim, etc.).</p>
         * <p>Default: <code>false</code></p>
         */
        normalize: boolean;
        /**
         * @name sogv.RegexValidator#lang
         * @type {String}
         * @description Language of messages.
         */
        lang: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>regex</code>', '<code>regexp</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.TimeValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is a valid <code>time</code>, meaning a string (or an object that can be cast into a string) that follows a valid <code>HH:mm:ss</code> format.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>time</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.TimeValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class TimeValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.TimeValidator#message
         * @type {String}
         * @description
         * <p>This message is shown if the underlying data is not a valid time.</p>
         * <p>Default: "<code>This value is not a valid time.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>time</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.TimezoneValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is a valid timezone identifier (e.g. <code>Europe/Paris</code>).</p>
     * <p>{@link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones|List of tz database time zones}.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>timezone</code>', '<code>tz</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.TimezoneValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class TimezoneValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.TimezoneValidator#message
         * @type {String}
         * @description
         * <p>This message is shown if the underlying data is not a valid timezone identifier.</p>
         * <p>Default: "<code>This value is not a valid timezone.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>timezone</code>', '<code>tz</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.TypeValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is of a specific <code>data</code> type.</p>
     * <p>For example, if a variable should be an array, you can use this constraint with the <code>array</code> type option to validate this.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>type</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.TypeValidator(data, {type: 'array'});
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class TypeValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.TypeValidator#type
         * @type {String|Array}
         * @description
         * This required option defines the type or collection of types allowed for the given value.</p>
         * The following types are available:
         * <ul>
         *     <li><b>array</b> - Finds whether a variable is an array.</li>
         *     <li><b>bool</b>, <b>boolean</b> - Finds out whether a variable is a boolean.</li>
         *     <li><b>callable</b> - Verify that the contents of a variable can be called as a function.</li>
         *     <li><b>float</b> - Finds whether the type of a variable is float.</li>
         *     <li><b>double</b> - Finds whether the type of a variable is double.</li>
         *     <li><b>int</b>, <b>integer</b> - Find whether the type of a variable is integer.</li>
         *     <li><b>iterable</b> - Verify that the contents of a variable is an iterable value.</li>
         *     <li><b>null</b> - Finds whether a variable is NULL.</li>
         *     <li><b>numeric</b> - Finds whether a variable is a number or a numeric string.</li>
         *     <li><b>object</b> - Finds whether a variable is an object.</li>
         *     <li><b>real</b> - Finds whether the type of a variable is real.</li>
         *     <li><b>scalar</b> - Finds whether a variable is a scalar. <i>Scalar variables are those containing an integer, float, string or boolean.</i></li>
         *     <li><b>string</b> - Find whether the type of a variable is string.</li>
         *     <li><b>alnum</b> - Check for alphanumeric character(s).</li>
         *     <li><b>alpha</b> - Check for alphabetic character(s).</li>
         *     <li><b>cntrl</b> - Check for control character(s).</li>
         *     <li><b>digit</b> - Check for numeric character(s).</li>
         *     <li><b>graph</b> - Check for any printable character(s) except space.</li>
         *     <li><b>lower</b> - Check for lowercase character(s).</li>
         *     <li><b>print</b> - Check for printable character(s).</li>
         *     <li><b>punct</b> - Check for any printable character which is not whitespace or an alphanumeric character.</li>
         *     <li><b>space</b> - Check for whitespace character(s).</li>
         *     <li><b>upper</b> - Check for uppercase character(s).</li>
         *     <li><b>xdigit</b> - Check for character(s) representing a hexadecimal digit.</li>
         * </ul>
         */
        type: string | any[];
        /**
         * @name sogv.TypeValidator#any
         * @type {Boolean}
         * @description
         * <p>If <code>true</code>, one of data type needs to be valid, otherwise passed data should be valid for all types.</p>
         * <p>Default: <code>false</code></p>
         */
        any: boolean;
        /**
         * @name sogv.TypeValidator#message
         * @type {String}
         * @description
         * <p>The message if the underlying data is not of the given type.</p>
         * <p>Default: "<code>This value should be of type %%type%%.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%type%%</code></td>
         *             <td>The expected type</td>
         *         </tr>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>type</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.UniqueValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that all the elements of the given collection are <code>unique</code> (none of them is present more than once).</p>
     * <p>Elements are compared strictly, so '<code>7</code>' and <code>7</code> are considered different elements (a string and an integer, respectively).</p>
     * <p>It can be a <code>string</code> or <code>array</code>.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>unique</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.UniqueValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class UniqueValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.UniqueValidator#message
         * @type {String}
         * @description
         * <p>This is the message that will be shown if at least one element is repeated in the collection.</p>
         * <p>Default: "<code>This collection should contain only unique elements.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The repeated value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>unique</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.UrlValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is a valid <code>URL</code> string.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>url</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.UrlValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class UrlValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.UrlValidator#message
         * @type {String}
         * @description
         * This message is shown if the URL is invalid.</p>
         * <p>Default: "<code>This value is not a valid URL.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.UrlValidator#normalize
         * @type {Boolean}
         * @description
         * Normalizer string before validate (trim, etc.).
         * Default: <code>false</code>.
         */
        normalize: boolean;
        /**
         * @name sogv.UrlValidator#protocols
         * @type {Array}
         * @description
         * The protocols considered to be valid for the URL.
         * For example, if you also consider the ftp:// type URLs to be valid, redefine the protocols array, listing http, https, and also ftp.
         * Default: <code>['http', 'https', 'ftp']</code>
         */
        protocols: any[];
        /**
         * @name sogv.UrlValidator#relativeProtocol
         * @type {Boolean}
         * @description
         * If true, the protocol is considered optional when validating the syntax of the given URL.
         * This means that both http:// and https:// are valid but also relative URLs that contain no protocol (e.g. //example.com).
         * Default: <code>false</code>.
         */
        relativeProtocol: boolean;
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>url</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.UuidValidator
     * @extends sogv.BaseValidator
     * @classdesc
     * <p>Validates that a value is a valid {@link https://en.wikipedia.org/wiki/Universally_unique_identifier|Universally unique identifier (UUID)} per {@link https://tools.ietf.org/html/rfc4122|RFC 4122}.</p>
     * <p>By default, this will validate the format according to the RFC's guidelines, but this can be relaxed to accept non-standard <code>UUIDs</code> that other systems (like PostgreSQL) accept.</p>
     * <p><code>UUID</code> versions can also be restricted using a whitelist.</p>
     * @description
     * <p>Create a new Validator.</p>
     * @param {*} data The data which needs to be validated.
     * @param {Object} options The setting options
     * @param {Object} optionRules The validation rules for setting options.
     * @param {String} lang The language used by the application. Default: "<code>en</code>".
     * @param {Boolean} internal If this parameter is true, it means, that validation called from core.
     * @property {Array} alias
     * <p>The aliases for the current validator.</p>
     * <p>They could be used in the short validation format.</p>
     * <p>Defined aliases: ['<code>uuid</code>'].</p>
     * @property {Object} options The description of the required options.
     * @example
     * var validator = new sogv.UuidValidator(data);
     * if (false === validator.isValid()) {
     *      validator.errors().first();
     * }
     */
    class UuidValidator extends sogv.BaseValidator {
        constructor(data: any, options: any, optionRules: any, lang: string, internal: boolean);
        /**
         * @name sogv.UuidValidator#message
         * @type {String}
         * @description
         * <p>This message is shown if the string is not a valid <code>UUID</code>.</p>
         * <p>Default: "<code>This is not a valid UUID.</code>"</p>
         * <p>You can use the following parameters in this message:</p>
         * <table>
         *     <thead>
         *         <tr>
         *             <th>Parameter</th>
         *             <th>Description</th>
         *         </tr>
         *     </thead>
         *     <tbody>
         *         <tr>
         *             <td><code>%%value%%</code></td>
         *             <td>The current (invalid) value</td>
         *         </tr>
         *     </tbody>
         * </table>
         */
        message: string;
        /**
         * @name sogv.UuidValidator#normalize
         * @type {Boolean}
         * @description
         * <p>Normalizer string before validate (trim, etc.).</p>
         * <p>Default: <code>false</code>.</p>
         */
        normalize: boolean;
        /**
         * @name sogv.UuidValidator#strict
         * @type {Boolean}
         * @description
         * <p>If this option is set to true the constraint will check if the <code>UUID</code> is formatted per the RFC's input format rules: <code>216fff40-98d9-11e3-a5e2-0800200c9a66</code>.</p>
         * <p>Default: <code>true</code>.</p>
         * <p>Setting this to false will allow alternate input formats like:</p>
         * </p>
         * <ul>
         *     <li><b>216f-ff40-98d9-11e3-a5e2-0800-200c-9a66</b></li>
         *     <li><b>{216fff40-98d9-11e3-a5e2-0800200c9a66}</b></li>
         *     <li><b>216fff4098d911e3a5e20800200c9a66</b></li>
         * </ul>
         */
        strict: boolean;
        /**
         * @name sogv.UuidValidator#versions
         * @type {Array}
         * @description
         * <p>This option can be used to only allow specific {@link https://en.wikipedia.org/wiki/Universally_unique_identifier#Variants_and_versions|UUID versions}.</p>
         * <p>Valid versions are <code>1</code> - <code>5</code>.</p>
         * <p>Default: <code>[1,2,3,4,5]</code>.</p>
         * <p>The following PHP constants can also be used:</p>
         * <ul>
         *     <li><b>1</b> - Date-Time and MAC address</li>
         *     <li><b>2</b> - Date-Time and MAC address, DCE security version</li>
         *     <li><b>3</b> - Namespace name-based (MD5)</li>
         *     <li><b>4</b> - Random</li>
         *     <li><b>5</b> - Namespace name-based (SHA-1)</li>
         * </ul>
         */
        versions: any[];
        /**
         * @name sogv.BaseValidator#data
         * @type {*}
         * @description Data that needs to be validated.
         */
        data: any;
        /**
         * @name sogv.BaseValidator#lang
         * @type {String}
         * @description Language of error messages.
         */
        lang: string;
        /**
         * @function
         * @name sogv.BaseValidator#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.BaseValidator#errors
         * @description
         * <p>Return error errors</p>
         * @returns {sogv.Error} Error messages
         */
        errors(): sogv.Error;
        /**
         * <p>The aliases for the current validator.</p>
        <p>They could be used in the short validation format.</p>
        <p>Defined aliases: ['<code>uuid</code>'].</p>
        */
        alias: any[];
        /**
         * The description of the required options.
        */
        options: any;
    }
    /**
     * @constructor
     * @name sogv.ErrorHandler
     * @classdesc This service provides handling of all error messages
     * @description Create a new error handler.
     * @param {Object} options The setting options.
     */
    class ErrorHandler {
        constructor(options: any);
        /**
         * @function
         * @name sogv.ErrorHandler#has
         * @description Check if messages exist
         * @return {Boolean} Status
         */
        has(): boolean;
        /**
         * @function
         * @name sogv.ErrorHandler#add
         * @description Add new message
         * @param {String} message Message text
         * @param {Object} parameters Message parameters
         */
        add(message: string, parameters: any): void;
        /**
         * @function
         * @name sogv.ErrorHandler#get
         * @description Get message by position
         * @param {Integer} position Message position
         * @return {String} Message
         */
        get(position: Integer): string;
        /**
         * @function
         * @name sogv.ErrorHandler#first
         * @description Get first message
         * @return {String} Message
         */
        first(): string;
        /**
         * @function
         * @name sogv.ErrorHandler#count
         * @description Count of messages
         * @return {String} Count
         */
        count(): string;
    }
    /**
     * @namespace
     * @name sogv.I18nHandler
     * @description
     * <p>I18n handler</p>
     */
    namespace I18nHandler {
        /**
         * @function
         * @name sogv.I18nHandler#add
         * @description
         * <p>Add new message or messages to global collection for specific language.</p>
         * @param {String} lang The current language
         * @param {Array} messages Message or messages
         * @example
         * sogv.I18nHandler.add('fr', [{
         *     "source": "The value you selected is not a valid choice.",
         *     "target": "Cette valeur doit être l'un des choix proposés."
         * }]);
         *
         * // The first part of the message: "You must select at least %%limit%% choice." - this is the singular form
         * // The second part of the message: "You must select at least %%limit%% choices." - this is the plural form
         * // The form depends on value of "%%limit%%". If value "1", "0" or "-1" - singular form, otherwise - plural form
         * sogv.I18nHandler.add('fr', [{
         *     "source": "You must select at least %%limit%% choice.|You must select at least %%limit%% choices.",
         *     "target": "Vous devez sélectionner au moins %%limit%% choix.|Vous devez sélectionner au moins %%limit%% choix."
         * }]);
         */
        function add(lang: string, messages: any[]): void;
        /**
         * @function
         * @name sogv.I18nHandler#get
         * @description
         * <p>Get translated message for specific language by origin message.</p>
         * @param {String} lang The current language
         * @param {String} sourceMessage The source message
         * @returns {String|Null} The translated message
         */
        function get(lang: string, sourceMessage: string): string | null;
        /**
         * @function
         * @name sogv.I18nHandler#prepare
         * @description
         * <p>Prepare message.</p>
         * @param {String} message Message text
         * @param {Object} parameters Message parameters
         * @returns {String} Processed message
         */
        function prepare(message: string, parameters: any): string;
    }
    /**
     * @namespace
     * @name sogv.ValidationSettingsHandler
     * @description
     * <p>Validation settings handler.</p>
     * <p>This handler provides different types of validation settings parsers (validator's name and settings).</p>
     * @example
     * var validators = sogv.ValidationSettingsHandler.parse('required|email:{"mode":"html5"}');
     */
    namespace ValidationSettingsHandler {
        /**
         * @function
         * @name sogv.ValidationSettingsHandler#parse
         * @description Prepare validation settings
         * @param {String|JSON|Object} settings Validation settings
         * @returns {Object} Processed settings
         */
        function parse(settings: string | JSON | any): any;
    }
    /**add
     * @constructor
     * @name sogv.ValidatorHandler
     * @classdesc This service provides handling validation of form
     * @description
     * <p>Create a new validator handler.</p>
     */
    class ValidatorHandler {
        /**
         * @function
         * @name sogv.ValidatorHandler#add
         * @description
         * <p>Add new validator for field.</p>
         * @param {String} key Field key
         * @param {sogv.AllValidator} validator Validator
         */
        add(key: string, validator: sogv.AllValidator): void;
        /**
         * @function
         * @name sogv.ValidatorHandler#get
         * @description
         * <p>Get validator for field.</p>
         * @param {String} key Field key
         * @returns {sogv.AllValidator}
         */
        get(key: string): sogv.AllValidator;
        /**
         * @function
         * @name sogv.ValidatorHandler#isValid
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValid(): boolean;
        /**
         * @function
         * @name sogv.ValidatorHandler#isValidWithErrorMessage
         * @description
         * <p>Check if data valid.</p>
         * @returns {Boolean} Validation status
         */
        isValidWithErrorMessage(): boolean;
    }
    /**
     * @constructor
     * @name sogv.I18n
     * @classdesc
     * <p>Handles translation. Responsible for the translation. Can also handle plural forms.</p>
     * @param {String} lang The current language. This parameter is required.
     * @example
     * var translator = new sogv.I18n(lang);
     * var translatedMessage = translator.getText(message, parameters);
     */
    class I18n {
        constructor(lang: string);
        /**
         * @function
         * @name sogv.I18n#translate
         * @description Returns the translation.
         * @param {String} message The message which need to be translated
         * @param {Object} parameters The message parameters
         * @returns {String} Translated and processed message
         */
        translate(message: string, parameters: any): string;
    }
}

