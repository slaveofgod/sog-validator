Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.LocaleValidator
     * @extends sogv.AbstractValidator
     * @classdesc
     * <p>Validates that a value is a valid <code>locale</code>.</p>
     * <p>The "<code>value</code>" for each locale is any of the @link(http://userguide.icu-project.org/locale|ICU format locale IDs).</p>
     * <p>For example, the two letter {@link https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes|ISO 639-1}language code (e.g. <code>fr</code>), or the language code followed by an underscore (<code>_</code>) and the {@link https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes|ISO 3166-1 alpha-2} country code (e.g. fr_FR for French/France).</p>
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

    // PROPERTIES

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

    var LocaleValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'This value is not a valid locale.';

        this.__locales = {"eu":"Basque","hr_BA":"Croatian (Bosnia & Herzegovina)","en_CM":"English (Cameroon)","en_BI":"English (Burundi)","rw_RW":"Kinyarwanda (Rwanda)","ast":"Asturian","en_SZ":"English (Swaziland)","he_IL":"Hebrew (Israel)","ar":"Uzbek (Arabic)","Arabicuz_Arab":"Uzbek (Arabic)","en_PN":"English (Pitcairn Islands)","as":"Assamese","en_NF":"English (Norfolk Island)","ks_IN":"Kashmiri (India)","rwk_TZ":"Rwa (Tanzania)","zh_Hant_TW":"Chinese (Traditional, Taiwan)","en_CN":"English (China)","gsw_LI":"Swiss German (Liechtenstein)","ta_IN":"Tamil (India)","th_TH":"Thai (Thailand)","es_EA":"Spanish (Ceuta & Melilla)","fr_GF":"French (French Guiana)","ar_001":"Arabic (World)","en_RW":"English (Rwanda)","tr_TR":"Turkish (Turkey)","de_CH":"German (Switzerland)","ee_TG":"Ewe (Togo)","en_NG":"English (Nigeria)","fr_TG":"French (Togo)","az":"Azerbaijani","fr_SC":"French (Seychelles)","es_HN":"Spanish (Honduras)","en_AG":"English (Antigua & Barbuda)","ru_KZ":"Russian (Kazakhstan)","gsw":"Swiss German","dyo":"Jola-Fonyi","so_ET":"Somali (Ethiopia)","zh_Hant_MO":"Chinese (Traditional, Macau [China])","de_BE":"German (Belgium)","nus_SS":"Nuer (South Sudan)","km_KH":"Khmer (Cambodia)","my_MM":"Burmese (Myanmar [Burma])","mgh_MZ":"Makhuwa-Meetto (Mozambique)","ee_GH":"Ewe (Ghana)","es_EC":"Spanish (Ecuador)","kw_GB":"Cornish (United Kingdom)","rm_CH":"Romansh (Switzerland)","en_ME":"English (Montenegro)","nyn":"Nyankole","mk_MK":"Macedonian (Macedonia)","bs_Cyrl_BA":"Bosnian (Cyrillic, Bosnia & Herzegovina)","ar_MR":"Arabic (Mauritania)","en_BM":"English (Bermuda)","ms_Arab":"Malay (Arabic)","en_AI":"English (Anguilla)","gl_ES":"Galician (Spain)","en_PR":"English (Puerto Rico)","ff_CM":"Fulah (Cameroon)","ne_IN":"Nepali (India)","or_IN":"Oriya (India)","khq_ML":"Koyra Chiini (Mali)","en_MG":"English (Madagascar)","pt_TL":"Portuguese (Timor-Leste)","en_LC":"English (St. Lucia)","ta_SG":"Tamil (Singapore)","iu_CA":"Inuktitut (Canada)","jmc_TZ":"Machame (Tanzania)","om_ET":"Oromo (Ethiopia)","lv_LV":"Latvian (Latvia)","es_US":"Spanish (United States)","en_PT":"English (Portugal)","vai_Latn_LR":"Vai (Latin, Liberia)","yue_HK":"Cantonese (Hong Kong [China])","en_NL":"English (Netherlands)","to_TO":"Tongan (Tonga)","cgg_UG":"Chiga (Uganda)","ta":"Tamil","en_MH":"English (Marshall Islands)","zu_ZA":"Zulu (South Africa)","shi_Latn_MA":"Tachelhit (Latin, Morocco)","brx_IN":"Bodo (India)","ar_KM":"Arabic (Comoros)","en_AL":"English (Albania)","te":"Telugu","chr_US":"Cherokee (United States)","yo_BJ":"Yoruba (Benin)","fr_VU":"French (Vanuatu)","pa":"Punjabi","tg":"Tajik","kea":"Kabuverdianu","ksh_DE":"Colognian (Germany)","sw_CD":"Swahili (Congo - Kinshasa)","te_IN":"Telugu (India)","fr_RE":"French (Réunion)","th":"Thai","ur_IN":"Urdu (India)","yo_NG":"Yoruba (Nigeria)","ti":"Tigrinya","guz_KE":"Gusii (Kenya)","tk":"Turkmen","kl_GL":"Kalaallisut (Greenland)","ksf_CM":"Bafia (Cameroon)","mua_CM":"Mundang (Cameroon)","lag_TZ":"Langi (Tanzania)","lb":"Luxembourgish","fr_TN":"French (Tunisia)","es_PA":"Spanish (Panama)","pl_PL":"Polish (Poland)","to":"Tongan","hi_IN":"Hindi (India)","dje_NE":"Zarma (Niger)","es_GQ":"Spanish (Equatorial Guinea)","en_BR":"English (Brazil)","kok_IN":"Konkani (India)","pl":"Polish","fr_GN":"French (Guinea)","bem":"Bemba","ha":"Hausa","ckb":"Central Kurdish","lg":"Ganda","tr":"Turkish","en_PW":"English (Palau)","en_NO":"English (Norway)","nyn_UG":"Nyankole (Uganda)","sr_Latn_RS":"Serbian (Latin, Serbia)","gsw_FR":"Swiss German (France)","pa_Guru":"Punjabi (Gurmukhi)","he":"Hebrew","sn_ZW":"Shona (Zimbabwe)","qu_BO":"Quechua (Bolivia)","lu_CD":"Luba-Katanga (Congo - Kinshasa)","mgo_CM":"Metaʼ (Cameroon)","ps_AF":"Pashto (Afghanistan)","en_BS":"English (Bahamas)","da":"Danish","ps":"Pashto","ln":"Lingala","pt":"Portuguese","hi":"Hindi","lo":"Lao","ebu":"Embu","de":"German","gu_IN":"Gujarati (India)","seh":"Sena","en_CX":"English (Christmas Island)","en_ZM":"English (Zambia)","fr_HT":"French (Haiti)","fr_GP":"French (Guadeloupe)","lt":"Lithuanian","lu":"Luba-Katanga","ln_CD":"Lingala (Congo - Kinshasa)","vai_Latn":"Vai (Latin)","el_GR":"Greek (Greece)","lv":"Latvian","en_KE":"English (Kenya)","sbp":"Sangu","hr":"Croatian","en_CY":"English (Cyprus)","es_GT":"Spanish (Guatemala)","twq_NE":"Tasawaq (Niger)","zh_Hant_HK":"Chinese (Traditional, Hong Kong [China])","kln_KE":"Kalenjin (Kenya)","fr_GQ":"French (Equatorial Guinea)","chr":"Cherokee","hu":"Hungarian","es_UY":"Spanish (Uruguay)","fr_CA":"French (Canada)","ms_BN":"Malay (Brunei)","en_NR":"English (Nauru)","mer":"Meru","shi":"Tachelhit","es_PE":"Spanish (Peru)","fr_SN":"French (Senegal)","bez":"Bena","sw_TZ":"Swahili (Tanzania)","wae_CH":"Walser (Switzerland)","kkj":"Kako","hy":"Armenian","teo_KE":"Teso (Kenya)","en_CZ":"English (Czech Republic)","dz_BT":"Dzongkha (Bhutan)","teo":"Teso","ar_JO":"Arabic (Jordan)","mer_KE":"Meru (Kenya)","khq":"Koyra Chiini","ln_CF":"Lingala (Central African Republic)","nn_NO":"Norwegian Nynorsk (Norway)","en_MO":"English (Macau [China])","ar_TD":"Arabic (Chad)","dz":"Dzongkha","ses":"Koyraboro Senni","en_BW":"English (Botswana)","en_AS":"English (American Samoa)","ar_IL":"Arabic (Israel)","nnh":"Ngiemboon","bo_CN":"Tibetan (China)","teo_UG":"Teso (Uganda)","hy_AM":"Armenian (Armenia)","ln_CG":"Lingala (Congo - Brazzaville)","sr_Latn_BA":"Serbian (Latin, Bosnia & Herzegovina)","en_MP":"English (Northern Mariana Islands)","ksb_TZ":"Shambala (Tanzania)","ar_SA":"Arabic (Saudi Arabia)","smn_FI":"Inari Sami (Finland)","ar_LY":"Arabic (Libya)","en_AT":"English (Austria)","so_KE":"Somali (Kenya)","fr_CD":"French (Congo - Kinshasa)","af_NA":"Afrikaans (Namibia)","en_NU":"English (Niue)","es_PH":"Spanish (Philippines)","en_KI":"English (Kiribati)","en_JE":"English (Jersey)","lkt":"Lakota","en_AU":"English (Australia)","fa_IR":"Persian (Iran)","uz_Latn_UZ":"Uzbek (Latin, Uzbekistan)","zh_Hans_CN":"Chinese (Simplified, China)","ewo_CM":"Ewondo (Cameroon)","fr_PF":"French (French Polynesia)","ca_IT":"Catalan (Italy)","en_BZ":"English (Belize)","ar_KW":"Arabic (Kuwait)","pt_GW":"Portuguese (Guinea-Bissau)","fr_FR":"French (France)","am_ET":"Amharic (Ethiopia)","en_VC":"English (St. Vincent & Grenadines)","fr_DJ":"French (Djibouti)","fr_CF":"French (Central African Republic)","es_SV":"Spanish (El Salvador)","en_MS":"English (Montserrat)","pt_ST":"Portuguese (São Tomé & Príncipe)","ar_SD":"Arabic (Sudan)","luy_KE":"Luyia (Kenya)","gd_GB":"Scottish Gaelic (United Kingdom)","de_LI":"German (Liechtenstein)","fr_CG":"French (Congo - Brazzaville)","ckb_IQ":"Central Kurdish (Iraq)","zh_Hans_SG":"Chinese (Simplified, Singapore)","en_MT":"English (Malta)","ha_NE":"Hausa (Niger)","ewo":"Ewondo","af_ZA":"Afrikaans (South Africa)","os_GE":"Ossetic (Georgia)","om_KE":"Oromo (Kenya)","nl_SR":"Dutch (Suriname)","es_ES":"Spanish (Spain)","es_DO":"Spanish (Dominican Republic)","ar_IQ":"Arabic (Iraq)","fr_CH":"French (Switzerland)","nnh_CM":"Ngiemboon (Cameroon)","es_419":"Spanish (Latin America)","en_MU":"English (Mauritius)","en_US_POSIX":"English (United States, Computer)","yav_CM":"Yangben (Cameroon)","luo_KE":"Luo (Kenya)","dua_CM":"Duala (Cameroon)","et_EE":"Estonian (Estonia)","en_IE":"English (Ireland)","ak_GH":"Akan (Ghana)","rwk":"Rwa","es_CL":"Spanish (Chile)","kea_CV":"Kabuverdianu (Cape Verde)","fr_CI":"French (Côte d’Ivoire)","ckb_IR":"Central Kurdish (Iran)","fr_BE":"French (Belgium)","se":"Northern Sami","en_NZ":"English (New Zealand)","en_MV":"English (Maldives)","en_LR":"English (Liberia)","ha_NG":"Hausa (Nigeria)","en_KN":"English (St. Kitts & Nevis)","nb_SJ":"Norwegian Bokmål (Svalbard & Jan Mayen)","sg":"Sango","sr_Cyrl_RS":"Serbian (Cyrillic, Serbia)","ru_RU":"Russian (Russia)","en_ZW":"English (Zimbabwe)","sv_AX":"Swedish (Åland Islands)","si":"Sinhala","ga_IE":"Irish (Ireland)","en_VG":"English (British Virgin Islands)","ff_MR":"Fulah (Mauritania)","sk":"Slovak","ky_KG":"Kyrgyz (Kyrgyzstan)","agq_CM":"Aghem (Cameroon)","mzn":"Mazanderani","fr_BF":"French (Burkina Faso)","sl":"Slovenian","en_MW":"English (Malawi)","mr_IN":"Marathi (India)","az_Latn":"Azerbaijani (Latin)","en_LS":"English (Lesotho)","de_AT":"German (Austria)","ka":"Georgian","naq_NA":"Nama (Namibia)","sn":"Shona","sr_Latn_ME":"Serbian (Latin, Montenegro)","fr_NC":"French (New Caledonia)","so":"Somali","is_IS":"Icelandic (Iceland)","twq":"Tasawaq","ig_NG":"Igbo (Nigeria)","sq":"Albanian","fo_FO":"Faroese (Faroe Islands)","sr":"Serbian","tzm":"Central Atlas Tamazight","ga":"Irish","om":"Oromo","en_LT":"English (Lithuania)","bas_CM":"Basaa (Cameroon)","se_NO":"Northern Sami (Norway)","ki":"Kikuyu","nl_BE":"Dutch (Belgium)","ar_QA":"Arabic (Qatar)","gd":"Scottish Gaelic","sv":"Swedish","kk":"Kazakh","sw":"Swahili","es_CO":"Spanish (Colombia)","az_Latn_AZ":"Azerbaijani (Latin, Azerbaijan)","rn_BI":"Rundi (Burundi)","or":"Oriya","kl":"Kalaallisut","ca":"Catalan","en_VI":"English (U.S. Virgin Islands)","km":"Khmer","os":"Ossetic","en_MY":"English (Malaysia)","kn":"Kannada","en_LU":"English (Luxembourg)","fr_SY":"French (Syria)","ar_TN":"Arabic (Tunisia)","en_JM":"English (Jamaica)","fr_PM":"French (St. Pierre & Miquelon)","ko":"Korean","fr_NE":"French (Niger)","ce":"Chechen","fr_MA":"French (Morocco)","gl":"Galician","ru_MD":"Russian (Moldova)","saq_KE":"Samburu (Kenya)","ks":"Kashmiri","fr_CM":"French (Cameroon)","lb_LU":"Luxembourgish (Luxembourg)","gv_IM":"Manx (Isle of Man)","fr_BI":"French (Burundi)","en_LV":"English (Latvia)","en_KR":"English (South Korea)","es_NI":"Spanish (Nicaragua)","en_GB":"English (United Kingdom)","kw":"Cornish","nl_SX":"Dutch (Sint Maarten)","dav_KE":"Taita (Kenya)","tr_CY":"Turkish (Cyprus)","ky":"Kyrgyz","en_UG":"English (Uganda)","en_TC":"English (Turks & Caicos Islands)","ar_EG":"Arabic (Egypt)","fr_BJ":"French (Benin)","gu":"Gujarati","es_PR":"Spanish (Puerto Rico)","fr_RW":"French (Rwanda)","sr_Cyrl_BA":"Serbian (Cyrillic, Bosnia & Herzegovina)","lrc_IQ":"Northern Luri (Iraq)","gv":"Manx","fr_MC":"French (Monaco)","cs":"Czech","bez_TZ":"Bena (Tanzania)","es_CR":"Spanish (Costa Rica)","asa_TZ":"Asu (Tanzania)","ar_EH":"Arabic (Western Sahara)","fo_DK":"Faroese (Denmark)","ms_Arab_BN":"Malay (Arabic, Brunei)","en_JP":"English (Japan)","sbp_TZ":"Sangu (Tanzania)","en_IL":"English (Israel)","lt_LT":"Lithuanian (Lithuania)","mfe":"Morisyen","en_GD":"English (Grenada)","cy":"Welsh","ug_CN":"Uyghur (China)","ca_FR":"Catalan (France)","es_BO":"Spanish (Bolivia)","fr_BL":"French (St. Barthélemy)","bn_IN":"Bengali (India)","uz_Cyrl_UZ":"Uzbek (Cyrillic, Uzbekistan)","lrc_IR":"Northern Luri (Iran)","az_Cyrl":"Azerbaijani (Cyrillic)","en_IM":"English (Isle of Man)","sw_KE":"Swahili (Kenya)","en_SB":"English (Solomon Islands)","pa_Arab":"Punjabi (Arabic)","ur_PK":"Urdu (Pakistan)","haw_US":"Hawaiian (United States)","ar_SO":"Arabic (Somalia)","en_IN":"English (India)","fil":"Filipino","fr_MF":"French (St. Martin)","en_WS":"English (Samoa)","es_CU":"Spanish (Cuba)","ja_JP":"Japanese (Japan)","fy_NL":"Western Frisian (Netherlands)","en_SC":"English (Seychelles)","en_IO":"English (British Indian Ocean Territory)","pt_PT":"Portuguese (Portugal)","en_HK":"English (Hong Kong [China])","en_GG":"English (Guernsey)","fr_MG":"French (Madagascar)","de_LU":"German (Luxembourg)","tzm_MA":"Central Atlas Tamazight (Morocco)","en_SD":"English (Sudan)","shi_Tfng":"Tachelhit (Tifinagh)","ln_AO":"Lingala (Angola)","as_IN":"Assamese (India)","en_GH":"English (Ghana)","ms_MY":"Malay (Malaysia)","ro_RO":"Romanian (Romania)","jgo_CM":"Ngomba (Cameroon)","dua":"Duala","en_UM":"English (U.S. Outlying Islands)","en_SE":"English (Sweden)","kn_IN":"Kannada (India)","en_KY":"English (Cayman Islands)","vun_TZ":"Vunjo (Tanzania)","kln":"Kalenjin","lrc":"Northern Luri","en_GI":"English (Gibraltar)","ca_ES":"Catalan (Spain)","rof":"Rombo","pt_CV":"Portuguese (Cape Verde)","kok":"Konkani","pt_BR":"Portuguese (Brazil)","ar_DJ":"Arabic (Djibouti)","yi_001":"Yiddish (World)","fi_FI":"Finnish (Finland)","zh":"Chinese","es_PY":"Spanish (Paraguay)","ar_SS":"Arabic (South Sudan)","mua":"Mundang","sr_Cyrl_ME":"Serbian (Cyrillic, Montenegro)","vai_Vaii_LR":"Vai (Vai, Liberia)","en_001":"English (World)","nl_NL":"Dutch (Netherlands)","en_TK":"English (Tokelau)","si_LK":"Sinhala (Sri Lanka)","en_SG":"English (Singapore)","sv_SE":"Swedish (Sweden)","fr_DZ":"French (Algeria)","ca_AD":"Catalan (Andorra)","pt_AO":"Portuguese (Angola)","vi":"Vietnamese","xog_UG":"Soga (Uganda)","xog":"Soga","en_IS":"English (Iceland)","nb":"Norwegian Bokmål","seh_MZ":"Sena (Mozambique)","ars":"Najdi Arabic","es_AR":"Spanish (Argentina)","sk_SK":"Slovak (Slovakia)","en_SH":"English (St. Helena)","ti_ER":"Tigrinya (Eritrea)","nd":"North Ndebele","az_Cyrl_AZ":"Azerbaijani (Cyrillic, Azerbaijan)","zu":"Zulu","ne":"Nepali","nd_ZW":"North Ndebele (Zimbabwe)","el_CY":"Greek (Cyprus)","en_IT":"English (Italy)","nl_BQ":"Dutch (Caribbean Netherlands)","da_GL":"Danish (Greenland)","ja":"Japanese","rm":"Romansh","fr_ML":"French (Mali)","rn":"Rundi","en_VU":"English (Vanuatu)","rof_TZ":"Rombo (Tanzania)","ro":"Romanian","ebu_KE":"Embu (Kenya)","ru_KG":"Russian (Kyrgyzstan)","en_SI":"English (Slovenia)","sg_CF":"Sango (Central African Republic)","mfe_MU":"Morisyen (Mauritius)","nl":"Dutch","brx":"Bodo","bs_Latn":"Bosnian (Latin)","fa":"Standard Moroccan Tamazight (Morocco)","Persianzgh_MA":"Standard Moroccan Tamazight (Morocco)","en_GM":"English (Gambia)","shi_Latn":"Tachelhit (Latin)","en_FI":"English (Finland)","nn":"Norwegian","Nynorsken_EE":"English (Estonia)","ru":"Russian","yue":"Cantonese","kam_KE":"Kamba (Kenya)","fur":"Friulian","vai_Vaii":"Vai (Vai)","ar_ER":"Arabic (Eritrea)","rw":"Kinyarwanda","ti_ET":"Tigrinya (Ethiopia)","ff":"Fulah","luo":"Luo","fa_AF":"Persian (Afghanistan)","nl_CW":"Dutch (Curaçao)","en_HR":"English (Croatia)","en_FJ":"English (Fiji)","fi":"Finnish","pt_MO":"Portuguese (Macau [China])","be":"Belarusian","en_US":"English (United States)","en_TO":"English (Tonga)","en_SK":"English (Slovakia)","bg":"Bulgarian","ru_BY":"Russian (Belarus)","it_IT":"Italian (Italy)","ml_IN":"Malayalam (India)","gsw_CH":"Swiss German (Switzerland)","qu_EC":"Quechua (Ecuador)","fo":"Faroese","sv_FI":"Swedish (Finland)","en_FK":"English (Falkland Islands)","nus":"Nuer","ta_LK":"Tamil (Sri Lanka)","vun":"Vunjo","sr_Latn":"Serbian (Latin)","es_BZ":"Spanish (Belize)","fr":"French","en_SL":"English (Sierra Leone)","bm":"Bambara","ar_BH":"Arabic (Bahrain)","guz":"Gusii","bn":"Bengali","bo":"Tibetan","ar_SY":"Arabic (Syria)","lo_LA":"Lao (Laos)","ne_NP":"Nepali (Nepal)","uz_Latn":"Uzbek (Latin)","be_BY":"Belarusian (Belarus)","es_IC":"Spanish (Canary Islands)","sr_Latn_XK":"Serbian (Latin, Kosovo)","ar_MA":"Arabic (Morocco)","pa_Guru_IN":"Punjabi (Gurmukhi, India)","br":"Breton","luy":"Luyia","kde_TZ":"Makonde (Tanzania)","bs":"Bosnian","fy":"Western Frisian","fur_IT":"Friulian (Italy)","hu_HU":"Hungarian (Hungary)","ar_AE":"Arabic (United Arab Emirates)","en_HU":"English (Hungary)","sah_RU":"Sakha (Russia)","zh_Hans":"Chinese (Simplified)","en_FM":"English (Micronesia)","sq_AL":"Albanian (Albania)","ko_KP":"Korean (North Korea)","en_150":"English (Europe)","en_DE":"English (Germany)","ce_RU":"Chechen (Russia)","en_CA":"English (Canada)","hsb_DE":"Upper Sorbian (Germany)","fr_MQ":"French (Martinique)","en_TR":"English (Turkey)","ro_MD":"Romanian (Moldova)","es_VE":"Spanish (Venezuela)","tg_TJ":"Tajik (Tajikistan)","fr_WF":"French (Wallis & Futuna)","mt_MT":"Maltese (Malta)","kab":"Kabyle","nmg_CM":"Kwasio (Cameroon)","ms_SG":"Malay (Singapore)","en_GR":"English (Greece)","ru_UA":"Russian (Ukraine)","fr_MR":"French (Mauritania)","zh_Hans_MO":"Chinese (Simplified, Macau [China])","ff_GN":"Fulah (Guinea)","bs_Cyrl":"Bosnian (Cyrillic)","sw_UG":"Swahili (Uganda)","ko_KR":"Korean (South Korea)","en_DG":"English (Diego Garcia)","bo_IN":"Tibetan (India)","en_CC":"English (Cocos [Keeling] Islands)","shi_Tfng_MA":"Tachelhit (Tifinagh, Morocco)","lag":"Langi","it_SM":"Italian (San Marino)","os_RU":"Ossetic (Russia)","en_TT":"English (Trinidad & Tobago)","ms_Arab_MY":"Malay (Arabic, Malaysia)","sq_MK":"Albanian (Macedonia)","bem_ZM":"Bemba (Zambia)","kde":"Makonde","ar_OM":"Arabic (Oman)","kk_KZ":"Kazakh (Kazakhstan)","cgg":"Chiga","bas":"Basaa","kam":"Kamba","wae":"Walser","es_MX":"Spanish (Mexico)","sah":"Sakha","zh_Hant":"Chinese (Traditional)","en_GU":"English (Guam)","fr_MU":"French (Mauritius)","fr_KM":"French (Comoros)","ar_LB":"Arabic (Lebanon)","en_BA":"English (Bosnia & Herzegovina)","en_TV":"English (Tuvalu)","sr_Cyrl":"Serbian (Cyrillic)","mzn_IR":"Mazanderani (Iran)","dje":"Zarma","kab_DZ":"Kabyle (Algeria)","fil_PH":"Filipino (Philippines)","se_SE":"Northern Sami (Sweden)","vai":"Vai","hr_HR":"Croatian (Croatia)","bs_Latn_BA":"Bosnian (Latin, Bosnia & Herzegovina)","nl_AW":"Dutch (Aruba)","dav":"Taita","so_SO":"Somali (Somalia)","ar_PS":"Arabic (Palestinian Territories)","en_FR":"English (France)","uz_Cyrl":"Uzbek (Cyrillic)","ff_SN":"Fulah (Senegal)","en_BB":"English (Barbados)","ki_KE":"Kikuyu (Kenya)","en_TW":"English (Taiwan)","naq":"Nama","en_SS":"English (South Sudan)","mg_MG":"Malagasy (Madagascar)","mas_KE":"Masai (Kenya)","en_RO":"English (Romania)","en_PG":"English (Papua New Guinea)","mgh":"Makhuwa-Meetto","dyo_SN":"Jola-Fonyi (Senegal)","mas":"Masai","agq":"Aghem","bn_BD":"Bengali (Bangladesh)","haw":"Hawaiian","yi":"Yiddish","nb_NO":"Norwegian Bokmål (Norway)","da_DK":"Danish (Denmark)","en_DK":"English (Denmark)","saq":"Samburu","ug":"Uyghur","cy_GB":"Welsh (United Kingdom)","fr_YT":"French (Mayotte)","jmc":"Machame","ses_ML":"Koyraboro Senni (Mali)","en_PH":"English (Philippines)","de_DE":"German (Germany)","ar_YE":"Arabic (Yemen)","bm_ML":"Bambara (Mali)","yo":"Yoruba","lkt_US":"Lakota (United States)","uz_Arab_AF":"Uzbek (Arabic, Afghanistan)","jgo":"Ngomba","sl_SI":"Slovenian (Slovenia)","uk":"Ukrainian","en_CH":"English (Switzerland)","asa":"Asu","lg_UG":"Ganda (Uganda)","qu_PE":"Quechua (Peru)","mgo":"Metaʼ","id_ID":"Indonesian (Indonesia)","en_NA":"English (Namibia)","en_GY":"English (Guyana)","zgh":"Standard Moroccan","Tamazightpt_MZ":"Portuguese (Mozambique)","fr_LU":"French (Luxembourg)","ta_MY":"Tamil (Malaysia)","mas_TZ":"Masai (Tanzania)","en_DM":"English (Dominica)","dsb":"Lower Sorbian","mg":"Malagasy","en_BE":"English (Belgium)","ur":"Urdu","fr_GA":"French (Gabon)","ka_GE":"Georgian (Georgia)","nmg":"Kwasio","en_TZ":"English (Tanzania)","eu_ES":"Basque (Spain)","ar_DZ":"Arabic (Algeria)","id":"Indonesian","so_DJ":"Somali (Djibouti)","hsb":"Upper Sorbian","yav":"Yangben","mk":"Macedonian","pa_Arab_PK":"Punjabi (Arabic, Pakistan)","ml":"Malayalam","en_ER":"English (Eritrea)","ig":"Igbo","se_FI":"Northern Sami (Finland)","mn":"Mongolian","ksb":"Shambala","uz":"Uzbek","vi_VN":"Vietnamese (Vietnam)","ii":"Sichuan Yi","qu":"Quechua","en_PK":"English (Pakistan)","ee":"Ewe","ast_ES":"Asturian (Spain)","mr":"Marathi","ms":"Malay","en_ES":"English (Spain)","ha_GH":"Hausa (Ghana)","it_CH":"Italian (Switzerland)","sq_XK":"Albanian (Kosovo)","mt":"Maltese","en_CK":"English (Cook Islands)","br_FR":"Breton (France)","tk_TM":"Turkmen (Turkmenistan)","sr_Cyrl_XK":"Serbian (Cyrillic, Kosovo)","ksf":"Bafia","en_SX":"English (Sint Maarten)","bg_BG":"Bulgarian (Bulgaria)","en_PL":"English (Poland)","af":"Afrikaans","el":"Greek","cs_CZ":"Czech (Czech Republic)","fr_TD":"French (Chad)","zh_Hans_HK":"Chinese (Simplified, Hong Kong [China])","is":"Icelandic","ksh":"Colognian","my":"Burmese","mn_MN":"Mongolian (Mongolia)","en":"English","it":"Italian","dsb_DE":"Lower Sorbian (Germany)","ii_CN":"Sichuan Yi (China)","smn":"Inari Sami","iu":"Inuktitut","eo":"Esperanto","en_ZA":"English (South Africa)","en_AD":"English (Andorra)","ak":"Akan","en_RU":"English (Russia)","kkj_CM":"Kako (Cameroon)","am":"Amharic","es":"Spanish","et":"Estonian","uk_UA":"Ukrainian (Ukraine)"};

        this.name = 'LocaleValidator';
    };
    LocaleValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    LocaleValidator.prototype.constructor = LocaleValidator;

    Object.defineProperty(LocaleValidator.prototype, 'alias', {
        get: function () {
            return [
                'locale'
            ];
        }
    });

    Object.defineProperty(LocaleValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(LocaleValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.LocaleValidator#__validate
         * @description
         * <p>Validate data</p>
         */
        __validate: function () {
            if ('undefined' === typeof this.__locales[this.data]) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.LocaleValidator#__beforeValidate
         * @description
         * <p>Execute before validation is running</p>
         */
        __beforeValidate: function () {
            // Check if empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }

            // Check if value is scalar
            var errorMessage = sogv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', true);
            if(null !== errorMessage) {
                this.__setErrorMessage(errorMessage, {});
                return ;
            }

            // Convert data to string
            try {
                if ('undefined' !== typeof this.data) {
                    this.data = this.data.toString();
                }
            } catch (e) {
                this.__setErrorMessage('This value ' + this.data + ' could not be converted to string.');
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.LocaleValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced</p>
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'value': this.data
            }
        }
    });

    return {
        LocaleValidator: LocaleValidator
    };
}());

sogv.registry(sogv.LocaleValidator);