# Timezone Converter - 保守・開発ガイド

## プロジェクト概要

このプロジェクトは、複数のタイムゾーン間で時刻を変換し、世界各地の現在時刻を同時に表示するWebアプリケーションです。React + TypeScript + Tailwind CSSで構築されており、日本語をメイン言語とした多言語対応を実装しています。

## 技術スタック

- **フレームワーク**: React 18 + TypeScript
- **ビルドツール**: Vite
- **スタイリング**: Tailwind CSS + shadcn/ui v4
- **状態管理**: React Context + useKV (永続化)
- **アイコン**: Phosphor Icons
- **フォント**: Google Fonts (Roboto, Lora, Source Code Pro)

## プロジェクト構造

```
src/
├── components/           # Reactコンポーネント
│   ├── ui/              # shadcn/ui コンポーネント (事前インストール済み)
│   ├── WorldClock.tsx   # 世界時計コンポーネント
│   ├── TimezoneConverter.tsx # タイムゾーン変換コンポーネント
│   └── LanguageSwitcher.tsx  # 言語切り替えコンポーネント
├── contexts/            # React Context
│   └── LanguageContext.tsx  # 言語状態管理
├── hooks/               # カスタムフック
│   └── useTranslation.tsx   # 翻訳フック
├── translations/        # 翻訳ファイル
│   ├── ja.ts           # 日本語 (メイン言語)
│   └── en.ts           # 英語
├── lib/                 # ユーティリティ
│   └── utils.ts        # shadcn/ui ヘルパー
├── assets/             # 静的ファイル
├── App.tsx             # メインアプリケーション
├── index.css           # グローバルスタイル
├── main.tsx            # エントリーポイント (編集禁止)
└── prd.md             # 製品要求仕様書
```

## VS Code + Copilot での開発

### 推奨拡張機能

1. **必須**:
   - ES7+ React/Redux/React-Native snippets
   - TypeScript Importer
   - Tailwind CSS IntelliSense
   - GitHub Copilot
   - GitHub Copilot Chat

2. **推奨**:
   - Auto Rename Tag
   - Bracket Pair Colorizer
   - GitLens
   - Japanese Language Pack for Visual Studio Code

### Copilot活用のコツ

#### コンポーネント作成
```typescript
// Copilotプロンプト例:
// "Create a React component for displaying timezone selection with shadcn Select component"
// "日本語対応のタイムゾーン選択コンポーネントを作成"

// 期待される出力形式
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
```

#### 翻訳追加
```typescript
// Copilotプロンプト例:
// "Add Japanese translations for new timezone features"
// "新しい機能のための日本語翻訳を追加"

// translations/ja.ts に追加
export const ja = {
  // 既存の翻訳...
  newFeature: {
    title: "新機能",
    description: "説明文"
  }
};
```

## 多言語対応の開発ガイド

### 1. 新しい翻訳キーの追加

**手順**:
1. `src/translations/ja.ts` に日本語翻訳を追加（メイン言語）
2. `src/translations/en.ts` に英語翻訳を追加
3. コンポーネントで `useTranslation` フックを使用

**例**:
```typescript
// translations/ja.ts
export const ja = {
  // ...既存の翻訳
  newSection: {
    title: "新しいセクション",
    button: "実行する",
    message: "処理が完了しました"
  }
};

// translations/en.ts  
export const en = {
  // ...existing translations
  newSection: {
    title: "New Section", 
    button: "Execute",
    message: "Process completed"
  }
};

// コンポーネントでの使用
import { useTranslation } from '@/hooks/useTranslation';

function NewComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h2>{t('newSection.title')}</h2>
      <button>{t('newSection.button')}</button>
      <p>{t('newSection.message')}</p>
    </div>
  );
}
```

### 2. 新しい言語の追加

**手順**:
1. `src/translations/` に新しい言語ファイルを作成（例: `zh.ts`）
2. `src/contexts/LanguageContext.tsx` の `translations` オブジェクトに追加
3. `supportedLanguages` 配列に言語情報を追加

### 3. 翻訳のベストプラクティス

- **階層構造**: 関連する翻訳は論理的にグループ化
- **一貫性**: 同じ概念には同じ用語を使用
- **コンテキスト**: 翻訳キー名にコンテキストを含める
- **プレースホルダー**: 動的な値には `{value}` 形式を使用

## データ永続化

### useKVフックの使用

```typescript
import { useKV } from '@github/spark/hooks';

// ユーザー設定の永続化
const [language, setLanguage] = useKV("user-language", "ja");
const [savedTimezones, setSavedTimezones] = useKV("saved-timezones", []);

// 関数型更新（推奨）
setSavedTimezones(current => [...current, newTimezone]);

// 削除
setSavedTimezones(current => current.filter(tz => tz.id !== targetId));
```

### 一時的な状態

```typescript
import { useState } from 'react';

// ページリフレッシュで消える状態
const [inputValue, setInputValue] = useState("");
const [isLoading, setIsLoading] = useState(false);
```

## shadcn/ui コンポーネント

### よく使用するコンポーネント

```typescript
// ボタン
import { Button } from "@/components/ui/button";
<Button variant="default">クリック</Button>

// カード
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// セレクトボックス
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// インプット
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
```

### カスタマイズ

既存のshadcn/uiコンポーネントを変更する場合は、Tailwindクラスでオーバーライド:

```typescript
<Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
  カスタムボタン
</Button>
```

## スタイリング

### Tailwind CSS

- **レスポンシブ**: `sm:`, `md:`, `lg:`, `xl:` プレフィックス
- **テーマカラー**: `bg-primary`, `text-foreground`, `border-border` など
- **スペーシング**: `p-4`, `m-2`, `gap-6` など

### カスタムCSS変数

`src/index.css` でテーマカラーを調整:

```css
:root {
  --primary: oklch(0.58 0.15 65);
  --background: oklch(0.97 0.02 75);
  /* その他のカラー変数 */
}
```

## デバッグとテスト

### よくある問題

1. **翻訳が表示されない**
   - 翻訳キーが両言語ファイルに存在するか確認
   - typoがないか確認

2. **状態が保存されない**
   - `useKV` を使用しているか確認
   - キー名が一意であるか確認

3. **レイアウトが崩れる**
   - Tailwindクラスの競合を確認
   - レスポンシブブレークポイントを確認

### デバッグコマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プロダクションプレビュー
npm run preview

# 型チェック
npx tsc --noEmit
```

## パフォーマンス最適化

### 画像とアセット

```typescript
// 正しい画像インポート
import myImage from '@/assets/images/logo.png';
<img src={myImage} alt="ロゴ" />

// 間違い - 文字列パスは使用しない
<img src="@/assets/images/logo.png" alt="ロゴ" />
```

### コンポーネント最適化

- `useMemo` でexpensiveな計算をメモ化
- `useCallback` でイベントハンドラーをメモ化
- 大きなリストには仮想化を検討

## デプロイメント

このプロジェクトはGitHub Sparkプラットフォーム上で動作します。変更をコミットすると自動的にデプロイされます。

### 本番環境での注意点

- すべての翻訳が完備されているか確認
- 適切なエラーハンドリングが実装されているか確認
- パフォーマンステストを実行

## 今後の開発課題

### 優先度: 高
- [ ] より多くのタイムゾーンの追加
- [ ] カスタムタイムゾーンセットの保存機能
- [ ] 会議時間の最適化提案機能

### 優先度: 中
- [ ] ダークモード対応
- [ ] 他言語（中国語、韓国語）の追加
- [ ] PWA対応（オフライン機能）

### 優先度: 低
- [ ] タイムゾーンの検索機能
- [ ] 時刻の音声読み上げ
- [ ] カレンダー連携

## 連絡先とサポート

開発に関する質問やイシューがある場合は、GitHub Issueを作成してください。

---

**最終更新**: 2024年12月
**バージョン**: 1.0.0
**メンテナー**: GitHub Spark Team