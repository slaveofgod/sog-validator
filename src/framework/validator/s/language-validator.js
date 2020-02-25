Object.assign(sogv, function () {
    'use strict';

    /**
     * @constructor
     * @name sogv.LanguageValidator
     * @extends sogv.AbstractValidator
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

    // PROPERTIES

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

    var LanguageValidator = function (data, options, optionRules, lang, internal) {
        sogv.AbstractValidator.call(this, data, options, {
            message: optionRules.message || 'type:{"type":"string"}|length:{"min":3,"max":255}'
        }, lang, internal);

        this.message = this.__options.message || 'This value is not a valid language.';

        this.__languages = ['aa', 'ab', 'ace', 'ach', 'ada', 'ady', 'ae', 'aeb', 'af', 'afh', 'agq', 'ain', 'ak', 'akk', 'akz', 'ale', 'aln', 'alt', 'am', 'an', 'ang', 'anp', 'ar', 'arc', 'arn', 'aro', 'arp', 'arq', 'ars', 'arw', 'ary', 'arz', 'as', 'asa', 'ase', 'ast', 'av', 'avk', 'awa', 'ay', 'az', 'ba', 'bal', 'ban', 'bar', 'bas', 'bax', 'bbc', 'bbj', 'be', 'bej', 'bem', 'bew', 'bez', 'bfd', 'bfq', 'bg', 'bgn', 'bho', 'bi', 'bik', 'bin', 'bjn', 'bkm', 'bla', 'bm', 'bn', 'bo', 'bpy', 'bqi', 'br', 'bra', 'brh', 'brx', 'bs', 'bss', 'bua', 'bug', 'bum', 'byn', 'byv', 'ca', 'cad', 'car', 'cay', 'cch', 'ccp', 'ce', 'ceb', 'cgg', 'ch', 'chb', 'chg', 'chk', 'chm', 'chn', 'cho', 'chp', 'chr', 'chy', 'cic', 'ckb', 'co', 'cop', 'cps', 'cr', 'crh', 'crs', 'cs', 'csb', 'cu', 'cv', 'cy', 'da', 'dak', 'dar', 'dav', 'de', 'del', 'den', 'dgr', 'din', 'dje', 'doi', 'dsb', 'dtp', 'dua', 'dum', 'dv', 'dyo', 'dyu', 'dz', 'dzg', 'ebu', 'ee', 'efi', 'egl', 'egy', 'eka', 'el', 'elx', 'en', 'enm', 'eo', 'es', 'esu', 'et', 'eu', 'ewo', 'ext', 'fa', 'fan', 'fat', 'ff', 'fi', 'fil', 'fit', 'fj', 'fo', 'fon', 'fr', 'frc', 'frm', 'fro', 'frp', 'frr', 'frs', 'fur', 'fy', 'ga', 'gaa', 'gag', 'gan', 'gay', 'gba', 'gbz', 'gd', 'gez', 'gil', 'gl', 'glk', 'gmh', 'gn', 'goh', 'gom', 'gon', 'gor', 'got', 'grb', 'grc', 'gsw', 'gu', 'guc', 'gur', 'guz', 'gv', 'gwi', 'ha', 'hai', 'hak', 'haw', 'he', 'hi', 'hif', 'hil', 'hit', 'hmn', 'ho', 'hr', 'hsb', 'hsn', 'ht', 'hu', 'hup', 'hy', 'hz', 'ia', 'iba', 'ibb', 'id', 'ie', 'ig', 'ii', 'ik', 'ilo', 'inh', 'io', 'is', 'it', 'iu', 'izh', 'ja', 'jam', 'jbo', 'jgo', 'jmc', 'jpr', 'jrb', 'jut', 'jv', 'ka', 'kaa', 'kab', 'kac', 'kaj', 'kam', 'kaw', 'kbd', 'kbl', 'kcg', 'kde', 'kea', 'ken', 'kfo', 'kg', 'kgp', 'kha', 'kho', 'khq', 'khw', 'ki', 'kiu', 'kj', 'kk', 'kkj', 'kl', 'kln', 'km', 'kmb', 'kn', 'ko', 'koi', 'kok', 'kos', 'kpe', 'kr', 'krc', 'kri', 'krj', 'krl', 'kru', 'ks', 'ksb', 'ksf', 'ksh', 'ku', 'kum', 'kut', 'kv', 'kw', 'ky', 'la', 'lad', 'lag', 'lah', 'lam', 'lb', 'lez', 'lfn', 'lg', 'li', 'lij', 'liv', 'lkt', 'lmo', 'ln', 'lo', 'lol', 'lou', 'loz', 'lrc', 'lt', 'ltg', 'lu', 'lua', 'lui', 'lun', 'luo', 'lus', 'luy', 'lv', 'lzh', 'lzz', 'mad', 'maf', 'mag', 'mai', 'mak', 'man', 'mas', 'mde', 'mdf', 'mdr', 'men', 'mer', 'mfe', 'mg', 'mga', 'mgh', 'mgo', 'mh', 'mi', 'mic', 'min', 'mk', 'ml', 'mn', 'mnc', 'mni', 'moh', 'mos', 'mr', 'mrj', 'ms', 'mt', 'mua', 'mus', 'mwl', 'mwr', 'mwv', 'my', 'mye', 'myv', 'mzn', 'na', 'nan', 'nap', 'naq', 'nb', 'nd', 'nds', 'ne', 'new', 'ng', 'nia', 'niu', 'njo', 'nl', 'nmg', 'nn', 'nnh', 'no', 'nog', 'non', 'nov', 'nqo', 'nr', 'nso', 'nus', 'nv', 'nwc', 'ny', 'nym', 'nyn', 'nyo', 'nzi', 'oc', 'oj', 'om', 'or', 'os', 'osa', 'ota', 'pa', 'pag', 'pal', 'pam', 'pap', 'pau', 'pcd', 'pcm', 'pdc', 'pdt', 'peo', 'pfl', 'phn', 'pi', 'pl', 'pms', 'pnt', 'pon', 'prg', 'pro', 'ps', 'pt', 'qu', 'quc', 'qug', 'raj', 'rap', 'rar', 'rgn', 'rif', 'rm', 'rn', 'ro', 'rof', 'rom', 'rtm', 'ru', 'rue', 'rug', 'rup', 'rw', 'rwk', 'sa', 'sad', 'sah', 'sam', 'saq', 'sas', 'sat', 'saz', 'sba', 'sbp', 'sc', 'scn', 'sco', 'sd', 'sdc', 'sdh', 'se', 'see', 'seh', 'sei', 'sel', 'ses', 'sg', 'sga', 'sgs', 'sh', 'shi', 'shn', 'shu', 'si', 'sid', 'sk', 'sl', 'sli', 'sly', 'sm', 'sma', 'smj', 'smn', 'sms', 'sn', 'snk', 'so', 'sog', 'sq', 'sr', 'srn', 'srr', 'ss', 'ssy', 'st', 'stq', 'su', 'suk', 'sus', 'sux', 'sv', 'sw', 'swb', 'syc', 'syr', 'szl', 'ta', 'tcy', 'te', 'tem', 'teo', 'ter', 'tet', 'tg', 'th', 'ti', 'tig', 'tiv', 'tk', 'tkl', 'tkr', 'tl', 'tlh', 'tli', 'tly', 'tmh', 'tn', 'to', 'tog', 'tpi', 'tr', 'tru', 'trv', 'ts', 'tsd', 'tsi', 'tt', 'ttt', 'tum', 'tvl', 'tw', 'twq', 'ty', 'tyv', 'tzm', 'udm', 'ug', 'uga', 'uk', 'umb', 'ur', 'uz', 'vai', 've', 'vec', 'vep', 'vi', 'vls', 'vmf', 'vo', 'vot', 'vro', 'vun', 'wa', 'wae', 'wal', 'war', 'was', 'wbp', 'wo', 'wuu', 'xal', 'xh', 'xmf', 'xog', 'yao', 'yap', 'yav', 'ybb', 'yi', 'yo', 'yrl', 'yue', 'za', 'zap', 'zbl', 'zea', 'zen', 'zgh', 'zh', 'zu', 'zun', 'zza'];

        this.name = 'LanguageValidator';
    };
    LanguageValidator.prototype = Object.create(sogv.AbstractValidator.prototype);
    LanguageValidator.prototype.constructor = LanguageValidator;

    Object.defineProperty(LanguageValidator.prototype, 'alias', {
        get: function () {
            return [
                'language',
                'lang'
            ];
        }
    });

    Object.defineProperty(LanguageValidator.prototype, 'options', {
        get: function () {
            return [];
        }
    });

    Object.assign(LanguageValidator.prototype, {
        /**
         * @private
         * @function
         * @name sogv.LanguageValidator#__validate
         * @description
         * <p>Validate data.</p>
         */
        __validate: function () {
            var language = this.data.toLowerCase().split(/[-_]/);
            if (false === this.__languages.includes(language[0])) {
                this.__setErrorMessage(this.message, this.__messageParameters());
                return ;
            }
        },

        /**
         * @private
         * @function
         * @name sogv.LanguageValidator#__beforeValidate
         * @description
         * <p>Execute before validation is running.</p>
         */
        __beforeValidate: function () {
            // Cancel validation if data is empty
            if (true === this.__isEmptyData()) {
                this.__skip = true;
                return ;
            }

            // Check if value is scalar
            var errorMessage = sogv.isValidWithErrorMessage(this.data, 'type:{"type":"scalar"}', this.lang, true);
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
         * @name sogv.LanguageValidator#__messageParameters
         * @description
         * <p>Returned parameters for error message which needs to be replaced.</p>
         * @returns {Object} List of parameters
         */
        __messageParameters: function () {
            return {
                'value': this.data
            }
        }
    });

    return {
        LanguageValidator: LanguageValidator
    };
}());

sogv.registerValidator(sogv.LanguageValidator);