/**
 * タイピングゲーム用ワードデータ
 * 難易度別に日本語ワードを定義
 */

export type Difficulty = 'easy' | 'normal' | 'hard';

export interface TypingWord {
  display: string;  // 表示テキスト（漢字・カタカナ可）
  reading: string;  // ひらがな読み（タイピング対象）
}

const EASY_POOL: TypingWord[] = [
  { display: '桜', reading: 'さくら' },
  { display: '猫', reading: 'ねこ' },
  { display: '犬', reading: 'いぬ' },
  { display: '空', reading: 'そら' },
  { display: '花', reading: 'はな' },
  { display: '海', reading: 'うみ' },
  { display: '山', reading: 'やま' },
  { display: '風', reading: 'かぜ' },
  { display: '星', reading: 'ほし' },
  { display: '夢', reading: 'ゆめ' },
  { display: '雨', reading: 'あめ' },
  { display: '寿司', reading: 'すし' },
  { display: '森', reading: 'もり' },
  { display: '月', reading: 'つき' },
  { display: '雲', reading: 'くも' },
  { display: '川', reading: 'かわ' },
  { display: '光', reading: 'ひかり' },
  { display: '水', reading: 'みず' },
  { display: '旅', reading: 'たび' },
  { display: '家', reading: 'いえ' },
  { display: '朝', reading: 'あさ' },
  { display: '夜', reading: 'よる' },
  { display: '色', reading: 'いろ' },
  { display: '音', reading: 'おと' },
  { display: '顔', reading: 'かお' },
];

const NORMAL_POOL: TypingWord[] = [
  { display: '学校', reading: 'がっこう' },
  { display: '電車', reading: 'でんしゃ' },
  { display: '新幹線', reading: 'しんかんせん' },
  { display: '切符', reading: 'きっぷ' },
  { display: '日本語', reading: 'にほんご' },
  { display: '写真', reading: 'しゃしん' },
  { display: '自転車', reading: 'じてんしゃ' },
  { display: '研究', reading: 'けんきゅう' },
  { display: '旅行', reading: 'りょこう' },
  { display: '病院', reading: 'びょういん' },
  { display: '教室', reading: 'きょうしつ' },
  { display: '音楽', reading: 'おんがく' },
  { display: '大学', reading: 'だいがく' },
  { display: '宿題', reading: 'しゅくだい' },
  { display: '携帯', reading: 'けいたい' },
  { display: '散歩', reading: 'さんぽ' },
  { display: '図書館', reading: 'としょかん' },
  { display: '天気予報', reading: 'てんきよほう' },
  { display: '牛乳', reading: 'ぎゅうにゅう' },
  { display: '警察', reading: 'けいさつ' },
  { display: '約束', reading: 'やくそく' },
  { display: '冒険', reading: 'ぼうけん' },
  { display: '未来', reading: 'みらい' },
  { display: '挑戦', reading: 'ちょうせん' },
  { display: '発明', reading: 'はつめい' },
];

const HARD_POOL: TypingWord[] = [
  { display: 'プログラミング', reading: 'ぷろぐらみんぐ' },
  { display: 'アルゴリズム', reading: 'あるごりずむ' },
  { display: 'セキュリティ', reading: 'せきゅりてぃ' },
  { display: 'データベース', reading: 'でーたべーす' },
  { display: 'ネットワーク', reading: 'ねっとわーく' },
  { display: '人工知能', reading: 'じんこうちのう' },
  { display: 'クラウド', reading: 'くらうど' },
  { display: 'チャットボット', reading: 'ちゃっとぼっと' },
  { display: 'モニタリング', reading: 'もにたりんぐ' },
  { display: 'デプロイメント', reading: 'でぷろいめんと' },
  { display: 'インフラ構築', reading: 'いんふらこうちく' },
  { display: 'コンテナ技術', reading: 'こんてなぎじゅつ' },
  { display: '機械学習', reading: 'きかいがくしゅう' },
  { display: 'オートメーション', reading: 'おーとめーしょん' },
  { display: 'アーキテクチャ', reading: 'あーきてくちゃ' },
  { display: '仮想マシン', reading: 'かそうましん' },
  { display: '認証基盤', reading: 'にんしょうきばん' },
  { display: '運用保守', reading: 'うんようほしゅ' },
  { display: '脆弱性診断', reading: 'ぜいじゃくせいしんだん' },
  { display: '負荷分散', reading: 'ふかぶんさん' },
  { display: '集中力', reading: 'しゅうちゅうりょく' },
  { display: 'タイピング', reading: 'たいぴんぐ' },
  { display: 'マイクロサービス', reading: 'まいくろさーびす' },
  { display: '冗長構成', reading: 'じょうちょうこうせい' },
  { display: '証明書', reading: 'しょうめいしょ' },
];

const WORD_COUNTS: Record<Difficulty, number> = {
  easy: 10,
  normal: 15,
  hard: 20,
};

/** Fisher-Yates シャッフル */
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * 難易度に応じたワード配列を返す（ランダム選択）
 */
export function getWords(difficulty: Difficulty): TypingWord[] {
  const pool = difficulty === 'easy' ? EASY_POOL
    : difficulty === 'normal' ? NORMAL_POOL
    : HARD_POOL;
  const count = WORD_COUNTS[difficulty];
  return shuffle(pool).slice(0, count);
}

export function getWordCount(difficulty: Difficulty): number {
  return WORD_COUNTS[difficulty];
}
