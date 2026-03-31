/**
 * ローマ字変換エンジン v2
 * 全特殊入力パターン対応: っ, ん, 拗音, cha/tya/cya等
 */

export interface Chunk {
  kana: string;
  options: string[];
}

const SINGLE_KANA: Record<string, string[]> = {
  'あ': ['a'], 'い': ['i'], 'う': ['u', 'wu', 'whu'], 'え': ['e'], 'お': ['o'],
  'か': ['ka', 'ca'], 'き': ['ki'], 'く': ['ku', 'cu', 'qu'], 'け': ['ke'], 'こ': ['ko', 'co'],
  'さ': ['sa'], 'し': ['si', 'shi', 'ci'], 'す': ['su'], 'せ': ['se', 'ce'], 'そ': ['so'],
  'た': ['ta'], 'ち': ['ti', 'chi'], 'つ': ['tu', 'tsu'], 'て': ['te'], 'と': ['to'],
  'な': ['na'], 'に': ['ni'], 'ぬ': ['nu'], 'ね': ['ne'], 'の': ['no'],
  'は': ['ha'], 'ひ': ['hi'], 'ふ': ['hu', 'fu'], 'へ': ['he'], 'ほ': ['ho'],
  'ま': ['ma'], 'み': ['mi'], 'む': ['mu'], 'め': ['me'], 'も': ['mo'],
  'や': ['ya'], 'ゆ': ['yu'], 'よ': ['yo'],
  'ら': ['ra'], 'り': ['ri'], 'る': ['ru'], 'れ': ['re'], 'ろ': ['ro'],
  'わ': ['wa'], 'ゐ': ['wi'], 'ゑ': ['we'], 'を': ['wo'],
  'ん': ['nn', 'xn'],
  'が': ['ga'], 'ぎ': ['gi'], 'ぐ': ['gu'], 'げ': ['ge'], 'ご': ['go'],
  'ざ': ['za'], 'じ': ['zi', 'ji'], 'ず': ['zu'], 'ぜ': ['ze'], 'ぞ': ['zo'],
  'だ': ['da'], 'ぢ': ['di'], 'づ': ['du', 'dzu'], 'で': ['de'], 'ど': ['do'],
  'ば': ['ba'], 'び': ['bi'], 'ぶ': ['bu'], 'べ': ['be'], 'ぼ': ['bo'],
  'ぱ': ['pa'], 'ぴ': ['pi'], 'ぷ': ['pu'], 'ぺ': ['pe'], 'ぽ': ['po'],
  'ぁ': ['xa', 'la'], 'ぃ': ['xi', 'li'], 'ぅ': ['xu', 'lu'],
  'ぇ': ['xe', 'le'], 'ぉ': ['xo', 'lo'],
  'ゃ': ['xya', 'lya'], 'ゅ': ['xyu', 'lyu'], 'ょ': ['xyo', 'lyo'],
  'っ': ['xtu', 'xtsu', 'ltu', 'ltsu'],
  'ゎ': ['xwa', 'lwa'],
  'ー': ['-'],
  'ゔ': ['vu'],
};

const COMBO_KANA: Record<string, string[]> = {
  'きゃ': ['kya'], 'きぃ': ['kyi'], 'きゅ': ['kyu'], 'きぇ': ['kye'], 'きょ': ['kyo'],
  'しゃ': ['sya', 'sha'], 'しぃ': ['syi'], 'しゅ': ['syu', 'shu'], 'しぇ': ['sye', 'she'], 'しょ': ['syo', 'sho'],
  'ちゃ': ['tya', 'cha', 'cya'], 'ちぃ': ['tyi', 'cyi'], 'ちゅ': ['tyu', 'chu', 'cyu'], 'ちぇ': ['tye', 'che', 'cye'], 'ちょ': ['tyo', 'cho', 'cyo'],
  'にゃ': ['nya'], 'にぃ': ['nyi'], 'にゅ': ['nyu'], 'にぇ': ['nye'], 'にょ': ['nyo'],
  'ひゃ': ['hya'], 'ひぃ': ['hyi'], 'ひゅ': ['hyu'], 'ひぇ': ['hye'], 'ひょ': ['hyo'],
  'みゃ': ['mya'], 'みぃ': ['myi'], 'みゅ': ['myu'], 'みぇ': ['mye'], 'みょ': ['myo'],
  'りゃ': ['rya'], 'りぃ': ['ryi'], 'りゅ': ['ryu'], 'りぇ': ['rye'], 'りょ': ['ryo'],
  'ぎゃ': ['gya'], 'ぎぃ': ['gyi'], 'ぎゅ': ['gyu'], 'ぎぇ': ['gye'], 'ぎょ': ['gyo'],
  'じゃ': ['ja', 'zya', 'jya'], 'じぃ': ['zyi', 'jyi'], 'じゅ': ['ju', 'zyu', 'jyu'], 'じぇ': ['zye', 'je', 'jye'], 'じょ': ['jo', 'zyo', 'jyo'],
  'ぢゃ': ['dya'], 'ぢぃ': ['dyi'], 'ぢゅ': ['dyu'], 'ぢぇ': ['dye'], 'ぢょ': ['dyo'],
  'びゃ': ['bya'], 'びぃ': ['byi'], 'びゅ': ['byu'], 'びぇ': ['bye'], 'びょ': ['byo'],
  'ぴゃ': ['pya'], 'ぴぃ': ['pyi'], 'ぴゅ': ['pyu'], 'ぴぇ': ['pye'], 'ぴょ': ['pyo'],
  'ふぁ': ['fa', 'hwa'], 'ふぃ': ['fi', 'hwi'], 'ふぅ': ['fwu'], 'ふぇ': ['fe', 'hwe'], 'ふぉ': ['fo', 'hwo'],
  'ふゃ': ['fya'], 'ふゅ': ['fyu'], 'ふょ': ['fyo'],
  'てぃ': ['thi'], 'でぃ': ['dhi'],
  'てゅ': ['thu'], 'でゅ': ['dhu'],
  'とぅ': ['twu'], 'どぅ': ['dwu'],
  'うぁ': ['wha'], 'うぃ': ['whi', 'wi'], 'うぅ': ['whu'], 'うぇ': ['whe', 'we'], 'うぉ': ['who'],
  'ゔぁ': ['va'], 'ゔぃ': ['vi'], 'ゔぇ': ['ve'], 'ゔぉ': ['vo'],
  'ゔゃ': ['vya'], 'ゔゅ': ['vyu'], 'ゔょ': ['vyo'],
  'くぁ': ['qa', 'kwa'], 'くぃ': ['qi', 'kwi'], 'くぅ': ['kwu'], 'くぇ': ['qe', 'kwe'], 'くぉ': ['qo', 'kwo'],
  'ぐぁ': ['gwa'], 'ぐぃ': ['gwi'], 'ぐぅ': ['gwu'], 'ぐぇ': ['gwe'], 'ぐぉ': ['gwo'],
  'つぁ': ['tsa'], 'つぃ': ['tsi'], 'つぇ': ['tse'], 'つぉ': ['tso'],
};

function getKanaAt(word: string, pos: number): { kana: string; options: string[] } | null {
  if (pos >= word.length) return null;
  if (pos + 1 < word.length) {
    const combo = word.slice(pos, pos + 2);
    if (COMBO_KANA[combo]) return { kana: combo, options: COMBO_KANA[combo] };
  }
  const ch = word[pos];
  if (SINGLE_KANA[ch]) return { kana: ch, options: SINGLE_KANA[ch] };
  return { kana: ch, options: [ch] };
}

function startsWithAmbiguous(options: string[]): boolean {
  return options.some(opt => 'aiueony'.includes(opt[0]));
}

export function parseWord(word: string): Chunk[] {
  const chunks: Chunk[] = [];
  let i = 0;
  while (i < word.length) {
    const ch = word[i];
    if (ch === 'っ') {
      const next = getKanaAt(word, i + 1);
      if (next) {
        const doubled = next.options.map(opt => opt[0] + opt);
        const explicit = ['xtu', 'ltu', 'xtsu', 'ltsu'].flatMap(
          prefix => next.options.map(opt => prefix + opt)
        );
        chunks.push({ kana: 'っ' + next.kana, options: Array.from(new Set([...doubled, ...explicit])) });
        i += 1 + next.kana.length;
      } else {
        chunks.push({ kana: 'っ', options: ['xtu', 'ltsu', 'xtsu', 'ltu'] });
        i++;
      }
      continue;
    }
    if (ch === 'ん') {
      const next = getKanaAt(word, i + 1);
      if (!next || !startsWithAmbiguous(next.options)) {
        chunks.push({ kana: 'ん', options: ['n', 'nn', 'xn'] });
      } else {
        chunks.push({ kana: 'ん', options: ['nn', 'xn'] });
      }
      i++;
      continue;
    }
    const kana = getKanaAt(word, i);
    if (kana) {
      chunks.push({ kana: kana.kana, options: kana.options });
      i += kana.kana.length;
    } else {
      i++;
    }
  }
  return chunks;
}

export function getDisplayRomaji(chunks: Chunk[]): string {
  return chunks.map(c => c.options[0]).join('');
}
