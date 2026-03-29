/**
 * ローマ字変換エンジン
 * 日本語ひらがなのローマ字入力を包括的にサポート
 * っ（促音）、ん（撥音）、拗音（しゃ等）の複数入力方式に対応
 */

export interface Chunk {
  kana: string;
  options: string[];
}

// 単体ひらがな → ローマ字（よく使われる順）
const SINGLE_KANA: Record<string, string[]> = {
  // 母音
  'あ': ['a'], 'い': ['i'], 'う': ['u'], 'え': ['e'], 'お': ['o'],
  // か行
  'か': ['ka'], 'き': ['ki'], 'く': ['ku'], 'け': ['ke'], 'こ': ['ko'],
  // さ行
  'さ': ['sa'], 'し': ['shi', 'si'], 'す': ['su'], 'せ': ['se'], 'そ': ['so'],
  // た行
  'た': ['ta'], 'ち': ['chi', 'ti'], 'つ': ['tsu', 'tu'], 'て': ['te'], 'と': ['to'],
  // な行
  'な': ['na'], 'に': ['ni'], 'ぬ': ['nu'], 'ね': ['ne'], 'の': ['no'],
  // は行
  'は': ['ha'], 'ひ': ['hi'], 'ふ': ['fu', 'hu'], 'へ': ['he'], 'ほ': ['ho'],
  // ま行
  'ま': ['ma'], 'み': ['mi'], 'む': ['mu'], 'め': ['me'], 'も': ['mo'],
  // や行
  'や': ['ya'], 'ゆ': ['yu'], 'よ': ['yo'],
  // ら行
  'ら': ['ra'], 'り': ['ri'], 'る': ['ru'], 'れ': ['re'], 'ろ': ['ro'],
  // わ行
  'わ': ['wa'], 'を': ['wo'],
  // ん（デフォルト：後続文字に応じて parseWord で上書きされる）
  'ん': ['nn', 'xn'],
  // 濁音 が行
  'が': ['ga'], 'ぎ': ['gi'], 'ぐ': ['gu'], 'げ': ['ge'], 'ご': ['go'],
  // 濁音 ざ行
  'ざ': ['za'], 'じ': ['ji', 'zi'], 'ず': ['zu'], 'ぜ': ['ze'], 'ぞ': ['zo'],
  // 濁音 だ行
  'だ': ['da'], 'ぢ': ['di'], 'づ': ['du', 'dzu'], 'で': ['de'], 'ど': ['do'],
  // 濁音 ば行
  'ば': ['ba'], 'び': ['bi'], 'ぶ': ['bu'], 'べ': ['be'], 'ぼ': ['bo'],
  // 半濁音 ぱ行
  'ぱ': ['pa'], 'ぴ': ['pi'], 'ぷ': ['pu'], 'ぺ': ['pe'], 'ぽ': ['po'],
  // 小書きかな
  'ぁ': ['xa', 'la'], 'ぃ': ['xi', 'li'], 'ぅ': ['xu', 'lu'],
  'ぇ': ['xe', 'le'], 'ぉ': ['xo', 'lo'],
  'ゃ': ['xya', 'lya'], 'ゅ': ['xyu', 'lyu'], 'ょ': ['xyo', 'lyo'],
  'っ': ['xtu', 'ltsu', 'xtsu', 'ltu'],
  // 長音符
  'ー': ['-'],
};

// 2文字拗音 → ローマ字
const COMBO_KANA: Record<string, string[]> = {
  // き + 拗音
  'きゃ': ['kya'], 'きゅ': ['kyu'], 'きょ': ['kyo'],
  // し + 拗音
  'しゃ': ['sha', 'sya'], 'しゅ': ['shu', 'syu'], 'しょ': ['sho', 'syo'],
  // ち + 拗音
  'ちゃ': ['cha', 'tya'], 'ちゅ': ['chu', 'tyu'], 'ちょ': ['cho', 'tyo'],
  // に + 拗音
  'にゃ': ['nya'], 'にゅ': ['nyu'], 'にょ': ['nyo'],
  // ひ + 拗音
  'ひゃ': ['hya'], 'ひゅ': ['hyu'], 'ひょ': ['hyo'],
  // み + 拗音
  'みゃ': ['mya'], 'みゅ': ['myu'], 'みょ': ['myo'],
  // り + 拗音
  'りゃ': ['rya'], 'りゅ': ['ryu'], 'りょ': ['ryo'],
  // ぎ + 拗音
  'ぎゃ': ['gya'], 'ぎゅ': ['gyu'], 'ぎょ': ['gyo'],
  // じ + 拗音
  'じゃ': ['ja', 'zya', 'jya'], 'じゅ': ['ju', 'zyu', 'jyu'], 'じょ': ['jo', 'zyo', 'jyo'],
  // ぢ + 拗音
  'ぢゃ': ['dya'], 'ぢゅ': ['dyu'], 'ぢょ': ['dyo'],
  // び + 拗音
  'びゃ': ['bya'], 'びゅ': ['byu'], 'びょ': ['byo'],
  // ぴ + 拗音
  'ぴゃ': ['pya'], 'ぴゅ': ['pyu'], 'ぴょ': ['pyo'],
  // ふ + 母音
  'ふぁ': ['fa'], 'ふぃ': ['fi'], 'ふぇ': ['fe'], 'ふぉ': ['fo'],
  // て/で + ぃ
  'てぃ': ['thi'], 'でぃ': ['dhi'],
};

/**
 * 指定位置のかな（2文字拗音 → 1文字）を取得
 */
function getKanaAt(word: string, pos: number): { kana: string; options: string[] } | null {
  if (pos >= word.length) return null;
  // 2文字拗音を優先チェック
  if (pos + 1 < word.length) {
    const combo = word.slice(pos, pos + 2);
    if (COMBO_KANA[combo]) {
      return { kana: combo, options: COMBO_KANA[combo] };
    }
  }
  // 1文字かな
  const ch = word[pos];
  if (SINGLE_KANA[ch]) {
    return { kana: ch, options: SINGLE_KANA[ch] };
  }
  // 未知の文字はそのまま
  return { kana: ch, options: [ch] };
}

/**
 * ローマ字選択肢の先頭が母音・n・yで始まるか判定
 * ん の後に来る文字がこれに該当する場合、nn を強制する
 */
function startsWithAmbiguous(options: string[]): boolean {
  return options.some(opt => 'aiueony'.includes(opt[0]));
}

/**
 * ひらがな文字列をチャンク配列にパース
 * っ → 次のかなの子音を重複  /  ん → 後続文字に応じて n or nn
 */
export function parseWord(word: string): Chunk[] {
  const chunks: Chunk[] = [];
  let i = 0;

  while (i < word.length) {
    const ch = word[i];

    // ── っ（促音）処理 ──
    if (ch === 'っ') {
      const next = getKanaAt(word, i + 1);
      if (next) {
        // 次のかなの子音を重複: "ka" → "kka", "shi" → "sshi"
        const doubled = next.options.map(opt => opt[0] + opt);
        // xtu / ltu / xtsu / ltsu + 次のかなも許可
        const explicit = ['xtu', 'ltu', 'xtsu', 'ltsu'].flatMap(
          prefix => next.options.map(opt => prefix + opt)
        );
        const allOpts = [...doubled, ...explicit];
        // 重複除去
        const unique = Array.from(new Set(allOpts));
        chunks.push({ kana: 'っ' + next.kana, options: unique });
        i += 1 + next.kana.length;
      } else {
        // 末尾の っ（単独）
        chunks.push({ kana: 'っ', options: ['xtu', 'ltsu', 'xtsu', 'ltu'] });
        i++;
      }
      continue;
    }

    // ── ん（撥音）処理 ──
    if (ch === 'ん') {
      const next = getKanaAt(word, i + 1);
      if (!next || !startsWithAmbiguous(next.options)) {
        // 子音の前 or 末尾: 単独 n でも OK
        chunks.push({ kana: 'ん', options: ['n', 'nn', 'xn'] });
      } else {
        // 母音・y・n の前: nn 必須（na と ん+あ の曖昧性回避）
        chunks.push({ kana: 'ん', options: ['nn', 'xn'] });
      }
      i++;
      continue;
    }

    // ── 通常のかな ──
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

/**
 * チャンク配列から表示用ローマ字を生成（各チャンクの第一候補を結合）
 */
export function getDisplayRomaji(chunks: Chunk[]): string {
  return chunks.map(c => c.options[0]).join('');
}
