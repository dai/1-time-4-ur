# タイムゾーンコンバーター - メンテナンス用ガイド

## 概要

このプロジェクトは、異なるタイムゾーン間での時刻変換と複数の世界時計を表示するWebアプリケーションです。React + TypeScript + Tailwind CSSで構築されており、日本語と英語の多言語対応をしています。

## プロジェクト構造

```
src/
├── components/           # Reactコンポーネント
│   ├── ui/              # shadcnコンポーネント（編集不要）
│   ├── LanguageSwitcher.tsx   # 言語切り替えボタン
│   ├── TimezoneConverter.tsx  # タイムゾーン変換機能
│   ├── TimezoneSelect.tsx     # タイムゾーン選択コンポーネント
│   └── WorldClock.tsx         # 世界時計表示
├── contexts/            # Reactコンテキスト
│   └── LanguageContext.tsx    # 言語状態管理
├── hooks/               # カスタムフック
│   ├── useTranslation.ts      # 翻訳機能
│   └── use-mobile.ts          # モバイル検出
├── lib/                 # ユーティリティ
│   ├── translations.ts        # 翻訳文言
│   ├── timezone-utils.ts      # タイムゾーン処理
│   └── utils.ts               # 汎用ユーティリティ
├── App.tsx              # メインアプリケーション
├── index.css            # グローバルスタイル
└── main.tsx             # エントリーポイント（編集禁止）
```

## 主要機能

### 1. タイムゾーン変換
- 任意の日時を異なるタイムゾーン間で変換
- 現在時刻の設定機能
- タイムゾーン間での日付差表示

### 2. 世界時計
- 複数のタイムゾーンを同時表示
- リアルタイム時刻更新
- タイムゾーンの追加・削除

### 3. 多言語対応
- 日本語（デフォルト）
- 英語
- 設定は永続化される

## 開発環境

### 必要な環境
- Node.js 18以上
- npm または yarn

### セットアップ
```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## ファイル編集ガイド

### 翻訳の追加・修正

翻訳文言は `src/lib/translations.ts` で管理されています。

```typescript
export const translations = {
  ja: {
    'app.title': 'タイムゾーンコンバーター',
    // 新しい翻訳を追加
    'new.key': '新しい文言',
  },
  en: {
    'app.title': 'Timezone Converter', 
    // 対応する英語翻訳を追加
    'new.key': 'New text',
  },
};
```

**使用方法:**
```typescript
const { t } = useTranslation();
const text = t('new.key'); // 現在の言語に応じた文言を取得
```

### 新しいタイムゾーンの追加

`src/lib/timezone-utils.ts`の`COMMON_TIMEZONES`配列に追加できます。

```typescript
export const COMMON_TIMEZONES: Timezone[] = [
  {
    value: 'Asia/Tokyo',
    label: 'GMT+9 (Asia/Tokyo)',
    city: 'Tokyo',
    country: 'Japan',
  },
  // 新しいタイムゾーンを追加
];
```

### コンポーネントの修正

各コンポーネントはモジュール化されており、独立して編集できます：

- **TimezoneConverter.tsx**: 変換機能の修正
- **WorldClock.tsx**: 世界時計の修正
- **TimezoneSelect.tsx**: タイムゾーン選択UIの修正
- **LanguageSwitcher.tsx**: 言語切り替えUIの修正

### スタイルの修正

`src/index.css`でテーマカラーを調整できます：

```css
:root {
  --primary: oklch(0.58 0.15 65);    /* メインカラー */
  --secondary: oklch(0.85 0.08 85);  /* サブカラー */
  --accent: oklch(0.78 0.12 45);     /* アクセントカラー */
  /* その他のカラー設定 */
}
```

## データの永続化

アプリケーションでは以下のデータが永続化されます：

- 選択された言語設定
- タイムゾーン変換の設定（元・先タイムゾーン、日時）
- 世界時計に追加されたタイムゾーン

これらは`useKV`フックを使用してブラウザのストレージに保存されます。

## トラブルシューティング

### 翻訳が表示されない
1. `src/lib/translations.ts`で該当のキーが定義されているか確認
2. `useTranslation`フックが正しくインポートされているか確認
3. `LanguageProvider`でコンポーネントがラップされているか確認

### タイムゾーンが正しく表示されない
1. ブラウザのタイムゾーンサポートを確認
2. `timezone-utils.ts`の`ALL_TIMEZONES`配列で該当タイムゾーンが定義されているか確認

### スタイルが適用されない
1. Tailwind CSSのクラス名が正しいか確認
2. カスタムCSSが`index.css`に正しく定義されているか確認

## 使用技術

- **React 18**: UIライブラリ
- **TypeScript**: 型安全性
- **Tailwind CSS**: ユーティリティファーストCSS
- **shadcn/ui**: UIコンポーネントライブラリ
- **Phosphor Icons**: アイコンライブラリ
- **Vite**: ビルドツール

## 注意事項

1. `src/main.tsx`は編集しないでください（システムファイル）
2. shadcnのUIコンポーネント（`src/components/ui/`）は基本的に編集不要
3. 新しい依存関係を追加する場合は、ブラウザ互換性を確認してください
4. 翻訳キーを追加する場合は、日本語・英語両方を必ず定義してください

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 更新履歴

- v1.0.0: 初期リリース
  - タイムゾーン変換機能
  - 世界時計機能
  - 日本語・英語多言語対応