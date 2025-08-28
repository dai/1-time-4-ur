# Timezone Converter - 開発・メンテナンス指示書

## 概要
このプロジェクトは、複数のタイムゾーンでの時刻変換と世界時計表示を行うWebアプリケーションです。React + TypeScript + Tailwind CSSで構築されており、日本語をメイン言語とした多国語対応を行っています。

## 技術スタック
- **フレームワーク**: React 18 + TypeScript
- **ビルドツール**: Vite
- **スタイリング**: Tailwind CSS + shadcn/ui v4 components
- **アイコン**: Phosphor Icons React
- **状態管理**: React hooks (useState) + Spark KV storage
- **多国語化**: React Context + カスタムhooks

## プロジェクト構造

```
src/
├── App.tsx                 # メインアプリケーションコンポーネント
├── index.css              # グローバルスタイル・テーマ定義
├── prd.md                 # プロダクト要件定義書
├── components/
│   ├── TimezoneConverter.tsx  # タイムゾーン変換コンポーネント
│   ├── WorldClock.tsx         # 世界時計コンポーネント
│   ├── LanguageSwitcher.tsx   # 言語切り替えコンポーネント
│   └── ui/                    # shadcn/ui コンポーネント（事前インストール済み）
├── contexts/
│   └── LanguageContext.tsx    # 多国語化コンテキスト
├── hooks/
│   └── useTranslation.ts      # 翻訳フック
├── lib/
│   ├── utils.ts              # ユーティリティ関数
│   └── translations.ts       # 翻訳データ
└── types/
    └── index.ts              # TypeScript型定義
```

## 開発環境セットアップ

### 1. 必要なツール
- Node.js 18以上
- VS Code
- GitHub Copilot (推奨)

### 2. 推奨VS Code拡張機能
```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "GitHub.copilot",
    "GitHub.copilot-chat",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-json"
  ]
}
```

### 3. 開発サーバー起動
```bash
npm run dev
```

## 多国語化システム

### 言語サポート
- **プライマリ**: 日本語 (ja)
- **セカンダリ**: 英語 (en)

### 翻訳の追加・編集

#### 1. 翻訳データの場所
`src/lib/translations.ts` ファイルに全ての翻訳テキストが格納されています。

#### 2. 新しい翻訳キーの追加
```typescript
export const translations = {
  ja: {
    // 既存のキー...
    "new.key": "新しいテキスト",
    "nested": {
      "key": "ネストされたテキスト"
    }
  },
  en: {
    // 既存のキー...
    "new.key": "New text",
    "nested": {
      "key": "Nested text"
    }
  }
}
```

#### 3. コンポーネントでの使用方法
```typescript
import { useTranslation } from '../hooks/useTranslation';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('new.key')}</h1>
      <p>{t('nested.key')}</p>
    </div>
  );
}
```

### 新しい言語の追加

#### 1. 翻訳データに言語を追加
```typescript
// src/lib/translations.ts
export const translations = {
  ja: { /* 日本語翻訳 */ },
  en: { /* 英語翻訳 */ },
  ko: { /* 韓国語翻訳 */ }, // 新しい言語
}

export type Language = 'ja' | 'en' | 'ko'; // 型定義を更新
```

#### 2. 言語切り替えコンポーネントを更新
```typescript
// src/components/LanguageSwitcher.tsx
const languages = [
  { code: 'ja' as const, name: '日本語', flag: '🇯🇵' },
  { code: 'en' as const, name: 'English', flag: '🇺🇸' },
  { code: 'ko' as const, name: '한국어', flag: '🇰🇷' }, // 新しい言語
];
```

## コンポーネント開発ガイドライン

### 1. 新しいコンポーネントの作成
```typescript
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function NewComponent() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('component.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* コンテンツ */}
      </CardContent>
    </Card>
  );
}
```

### 2. 状態管理
- **一時的な状態**: `useState`を使用
- **永続化が必要な状態**: `useKV`フックを使用

```typescript
import { useState } from 'react';
import { useKV } from '@github/spark/hooks';

function Component() {
  // 一時的な状態（ページリロードで消える）
  const [inputValue, setInputValue] = useState('');
  
  // 永続化される状態（ページリロード後も保持）
  const [savedTimezones, setSavedTimezones] = useKV('user-timezones', []);
}
```

### 3. スタイリングガイドライン
- Tailwind CSSクラスを使用
- カスタムCSSは最小限に
- shadcn/uiコンポーネントを優先的に使用
- テーマ色は`index.css`で定義された変数を使用

## メンテナンス作業

### 1. 翻訳の更新
1. `src/lib/translations.ts`を編集
2. すべての言語で同じキーが存在することを確認
3. TypeScriptエラーがないことを確認

### 2. 新機能の追加
1. 必要に応じて翻訳キーを追加
2. TypeScript型定義を更新
3. コンポーネントを作成
4. App.tsxに統合

### 3. デザインの変更
1. `src/index.css`でテーマ色を調整
2. Tailwindクラスで個別スタイルを調整

### 4. バグ修正
1. TypeScriptエラーを最優先で修正
2. ブラウザコンソールのエラーを確認
3. 各言語での表示を確認

## デプロイメント

### ビルド
```bash
npm run build
```

### プレビュー
```bash
npm run preview
```

## トラブルシューティング

### よくある問題

#### 1. 翻訳が表示されない
- `translations.ts`にキーが存在するか確認
- タイポがないか確認
- デフォルト言語（日本語）に翻訳があるか確認

#### 2. TypeScriptエラー
- `npm run type-check`でエラー詳細を確認
- 型定義ファイルを更新

#### 3. スタイルが適用されない
- Tailwindクラス名のタイポを確認
- `index.css`のテーマ変数を確認

## GitHub Copilotとの連携

### 効果的なプロンプト例

#### コンポーネント作成
```
// 多国語対応のタイムゾーン選択コンポーネントを作成
// useTranslationフックを使用して翻訳対応
// shadcn/uiのSelectコンポーネントを使用
```

#### 翻訳追加
```
// 以下のテキストを日本語と英語で翻訳データに追加:
// "時刻を選択してください", "Select a time"
```

#### バグ修正
```
// このコンポーネントで時刻が正しく変換されない問題を修正
// 現在のコード: [コードを貼り付け]
```

## パフォーマンス最適化

### 1. メモ化
React.memoやuseMemo, useCallbackを適切に使用

### 2. 翻訳の最適化
- 不要な翻訳の削除
- 翻訳キーの統一

### 3. バンドルサイズの確認
```bash
npm run build && npx vite-bundle-analyzer dist
```

## セキュリティ考慮事項

### 1. 入力値の検証
- タイムゾーン名の検証
- 時刻形式の検証

### 2. XSS対策
- React標準のエスケープ機能を活用
- dangerouslySetInnerHTMLの使用禁止

## 今後の拡張予定

### 機能追加候補
- [ ] カスタムタイムゾーンの保存
- [ ] 会議時間の最適化提案
- [ ] カレンダー連携
- [ ] モバイルアプリ対応
- [ ] 他言語サポート（中国語、韓国語等）

### 技術的改善
- [ ] PWA対応
- [ ] オフライン機能
- [ ] パフォーマンス最適化
- [ ] アクセシビリティ向上

---

このドキュメントは開発・メンテナンス作業の指針として作成されました。質問や追加が必要な情報があれば、適宜更新してください。