export type Language = 'ja' | 'en';

export const translations = {
  ja: {
    app: {
      title: 'タイムゾーンコンバーター',
      description: '異なるタイムゾーン間での時刻変換と、複数の世界時計を表示します。会議のスケジュールやグローバルチームとの連携に最適です。',
      footer: 'すべての時刻は、お使いのブラウザのタイムゾーンデータベースを使用して計算されます'
    },

    converter: {
      title: 'タイムゾーン変換',
      from: '変換元',
      to: '変換先',
      time: '時刻',
      date: '日付',
      result: '変換結果',
      swap: 'タイムゾーンを入れ替え'
    },

    worldclock: {
      title: '世界時計',
      add: 'タイムゾーンを追加',
      remove: '削除',
      empty: 'タイムゾーンが追加されていません',
      emptyDescription: '下のボタンからタイムゾーンを追加して、複数の地域の時刻を同時に確認できます。'
    },

    common: {
      select: '選択してください',
      search: '検索...',
      clear: 'クリア',
      cancel: 'キャンセル',
      save: '保存',
      delete: '削除',
      add: '追加',
      edit: '編集',
      close: '閉じる'
    },

    language: {
      switch: '言語を切り替え',
      japanese: '日本語',
      english: 'English'
    },

    time: {
      now: '現在',
      today: '今日',
      tomorrow: '明日',
      yesterday: '昨日'
    },

    day: {
      sunday: '日曜日',
      monday: '月曜日',
      tuesday: '火曜日',
      wednesday: '水曜日',
      thursday: '木曜日',
      friday: '金曜日',
      saturday: '土曜日'
    },

    month: {
      january: '1月',
      february: '2月',
      march: '3月',
      april: '4月',
      may: '5月',
      june: '6月',
      july: '7月',
      august: '8月',
      september: '9月',
      october: '10月',
      november: '11月',
      december: '12月'
    }
  },
  en: {
    app: {
      title: 'Timezone Converter',
      description: 'Convert times between different timezones and keep track of multiple world clocks. Perfect for scheduling meetings and coordinating across global teams.',
      footer: 'All times are calculated using your browser\'s timezone database'
    },

    converter: {
      title: 'Timezone Converter',
      from: 'From',
      to: 'To',
      time: 'Time',
      date: 'Date',
      result: 'Converted Time',
      swap: 'Swap timezones'
    },

    worldclock: {
      title: 'World Clock',
      add: 'Add Timezone',
      remove: 'Remove',
      empty: 'No timezones added',
      emptyDescription: 'Add timezones using the button below to view multiple times at once.'
    },

    common: {
      select: 'Select',
      search: 'Search...',
      clear: 'Clear',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      add: 'Add',
      edit: 'Edit',
      close: 'Close'
    },

    language: {
      switch: 'Switch language',
      japanese: '日本語',
      english: 'English'
    },

    time: {
      now: 'Now',
      today: 'Today',
      tomorrow: 'Tomorrow',
      yesterday: 'Yesterday'
    },

    day: {
      sunday: 'Sunday',
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday'
    },

    month: {
      january: 'January',
      february: 'February',
      march: 'March',
      april: 'April',
      may: 'May',
      june: 'June',
      july: 'July',
      august: 'August',
      september: 'September',
      october: 'October',
      november: 'November',
      december: 'December'
    }
  },
};