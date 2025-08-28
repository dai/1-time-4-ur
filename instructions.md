# タイムゾーンコンバーター - 開発・メンテナンス用ガイド

## プロジェクト概要

このアプリケーションは、異なるタイムゾーン間での時刻変換と、複数の世界時計表示を行うWebアプリケーションです。React + TypeScript + Vite をベースとし、shadcn/ui コンポーネントライブラリを使用しています。

## 技術スタック

- **フレームワーク**: React 18 + TypeScript
- **ビルドツール**: Vite
- **スタイリング**: Tailwind CSS
- **UIコンポーネント**: shadcn/ui v4
- **アイコン**: Phosphor Icons
- **多言語対応**: カスタム翻訳システム（日本語/英語）
- **データ永続化**: GitHub Spark KV ストレージ

## プロジェクト構造

```
src/
├── components/
│   ├── ui/              # shadcn/ui コンポーネント（自動生成）
│   ├── LanguageSwitcher.tsx  # 言語切り替えコンポーネント
│   ├── TimezoneConverter.tsx # タイムゾーン変換コンポーネント
│   └── WorldClock.tsx   # 世界時計コンポーネント
├── contexts/
│   └── LanguageContext.tsx   # 言語切り替えコンテキスト
├── hooks/
│   ├── useTranslation.ts     # 翻訳フック
│   └── use-mobile.ts         # モバイル判定フック
├── lib/
│   ├── translations.ts       # 翻訳定義
│   ├── timezone-utils.ts     # タイムゾーン関連ユーティリティ
│   └── utils.ts             # 汎用ユーティリティ
├── types/
│   └── timezone.ts          # タイムゾーン関連の型定義
├── App.tsx                  # メインアプリケーション
├── index.css               # Tailwind CSS設定とテーマ
└── main.tsx               # エントリーポイント（編集禁止）
```

## 開発環境のセットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

### 3. ビルド

```bash
npm run build
```

## 主要コンポーネントの説明

### App.tsx
- メインアプリケーションコンポーネント
- LanguageProvider でラップして多言語対応を提供
- ヘッダー、コンバーター、世界時計の配置

### TimezoneConverter.tsx
- 2つのタイムゾーン間での時刻変換機能
- 日付・時刻の入力とリアルタイム変換
- タイムゾーンの入れ替え機能

### WorldClock.tsx
- 複数のタイムゾーンの時刻を同時表示
- タイムゾーンの追加・削除機能
- データは KV ストレージに永続化

### LanguageSwitcher.tsx
- 日本語/英語の切り替え機能
- 現在の言語設定を KV ストレージに保存

## 多言語対応システム

### 翻訳の追加・編集

`src/lib/translations.ts` ファイルで翻訳を管理:

```typescript
export const translations = {
  ja: {
    app: {
      title: 'タイムゾーンコンバーター',
      description: '...'
    },
    // ...
  },
  en: {
    app: {
      title: 'Timezone Converter',
      description: '...'
    },
    // ...
  }
};
```

### 翻訳の使用方法

```typescript
import { useTranslation } from '../hooks/useTranslation';

const { t } = useTranslation();
const title = t('app.title'); // ネストしたキーをドット記法で指定
```

### 新しい言語の追加

1. `src/lib/translations.ts` に新しい言語オブジェクトを追加
2. `src/contexts/LanguageContext.tsx` の Language 型に新しい言語コードを追加
3. `LanguageSwitcher.tsx` に新しい言語のオプションを追加

## スタイリングとテーマ

### カラーパレット
- 暖かみのあるサンセット系カラー
- OKLCH色空間を使用した高品質な色定義
- アクセシビリティを考慮したコントラスト比

### カスタマイズ方法

`src/index.css` の `:root` セクションでカラー変数を編集:

```css
:root {
  --primary: oklch(0.58 0.15 65);     /* メインカラー */
  --secondary: oklch(0.85 0.08 85);   /* セカンダリカラー */
  --accent: oklch(0.78 0.12 45);      /* アクセントカラー */
  /* ... */
}
```

## データ永続化

### KV ストレージの使用

```typescript
import { useKV } from '@github/spark/hooks';

// 永続化が必要なデータ
const [worldClocks, setWorldClocks] = useKV('world-clocks', []);
const [language, setLanguage] = useKV('language', 'ja');

// 一時的なデータ（通常のstate）
const [inputTime, setInputTime] = useState('');
```

### データの種類
- **永続化**: 言語設定、追加された世界時計
- **一時的**: フォーム入力値、UI状態

## タイムゾーン処理

### サポートされているタイムゾーン

`src/lib/timezone-utils.ts` で定義された主要なタイムゾーン:
- アジア太平洋地域
- ヨーロッパ・アフリカ地域  
- 北米・南米地域

### タイムゾーンの追加

```typescript
// timezone-utils.ts に新しいタイムゾーンを追加
export const timezones: Timezone[] = [
  // 既存のタイムゾーン...
  {
    id: 'Pacific/Auckland',
    label: 'Auckland',
    country: 'New Zealand',
    offset: '+12:00'
  },
];
```

## よくある作業

### 新しいタイムゾーンの追加

1. `src/lib/timezone-utils.ts` にタイムゾーン定義を追加
2. 必要に応じて翻訳ファイルに地域名の翻訳を追加

### UIコンポーネントの追加

1. shadcn/ui コンポーネントを使用する場合: `npx shadcn@latest add [component-name]`
2. カスタムコンポーネント: `src/components/` に作成

### 翻訳の追加

1. `src/lib/translations.ts` に新しいキーと翻訳を追加
2. コンポーネントで `t('新しいキー')` を使用

### スタイルの調整

1. Tailwind クラスを使用
2. カスタムスタイルが必要な場合は `src/index.css` に追加

## トラブルシューティング

### 翻訳が表示されない
- 翻訳キーが正しくネストされているか確認
- `useTranslation` フックが正しく使用されているか確認
- LanguageProvider でコンポーネントがラップされているか確認

### タイムゾーン変換が正しくない
- ブラウザのタイムゾーンデータベースに依存
- Intl.DateTimeFormat を使用しているため、最新のブラウザが必要

### スタイルが反映されない
- Tailwind クラス名が正しいか確認
- カスタムCSS変数が正しく定義されているか確認

## パフォーマンス最適化

### 推奨事項
- 重い計算は useMemo を使用
- 頻繁に更新される時刻表示は適切な間隔で更新
- 不要なre-renderを避けるためコンポーネントを細分化

### モニタリング
- React DevTools でre-renderを監視
- ネットワークタブでバンドルサイズを確認

## デプロイメント

このアプリケーションは GitHub Spark プラットフォーム用に最適化されており、以下の特徴があります:

- 静的ファイルとしてビルド可能
- KV ストレージによるデータ永続化
- ブラウザAPIのみを使用（サーバー依存なし）

## 貢献ガイドライン

### コードスタイル
- TypeScript を適切に使用
- コンポーネントは機能ごとに分割
- 翻訳対応を考慮したテキスト実装
- アクセシビリティを意識した実装

### コミットメッセージ
- 日本語または英語で明確に記述
- 変更内容を簡潔に説明

## ライセンス

このプロジェクトのライセンス情報については、プロジェクトルートのライセンスファイルを参照してください。