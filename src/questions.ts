// 改进的题库结构 - 支持日语、中文、英文三语
// 主要语言：日语 | 第二语言：中文和英文

interface MultipleChoiceQuestion {
  id: number
  type: 'multiple'
  japanese: string
  romanji: string
  meaning: {
    zh: string  // 中文
    en: string  // 英文
  }
  options: string[]
  correct: number
}

interface PhraseOrderQuestion {
  id: number
  type: 'phrase_order'
  meaning: {
    zh: string
    en: string
  }
  phrase: string[]
  correctOrder: number[]
}

type Question = MultipleChoiceQuestion | PhraseOrderQuestion

// ========== 简单难度题库 (初級) ==========
// 适合：初学者、日语零基础
// 主要内容：基本问候、数字、颜色、简单名词、助词入门

export const EASY_QUESTIONS: Question[] = [
  // 基本问候 (Greeting)
  {
    id: 1,
    type: 'multiple',
    japanese: 'おはようございます',
    romanji: 'ohayou gozaimasu',
    meaning: {
      zh: '早上好（敬语）',
      en: 'Good morning (polite)'
    },
    options: ['おはようございます', 'こんにちは', 'こんばんは', 'おやすみなさい'],
    correct: 0
  },
  {
    id: 2,
    type: 'multiple',
    japanese: 'こんばんは',
    romanji: 'konbanwa',
    meaning: {
      zh: '晚上好',
      en: 'Good evening'
    },
    options: ['おはよう', 'こんにちは', 'こんばんは', 'さようなら'],
    correct: 2
  },
  {
    id: 3,
    type: 'multiple',
    japanese: 'さようなら',
    romanji: 'sayounara',
    meaning: {
      zh: '再见',
      en: 'Goodbye'
    },
    options: ['おはよう', 'さようなら', 'ありがとう', 'すみません'],
    correct: 1
  },

  // 感谢和道歉 (Thank you & Sorry)
  {
    id: 4,
    type: 'multiple',
    japanese: 'ありがとうございます',
    romanji: 'arigatou gozaimasu',
    meaning: {
      zh: '非常感谢',
      en: 'Thank you very much'
    },
    options: ['ありがとうございます', 'ごめんなさい', 'すみません', 'どうもありがとう'],
    correct: 0
  },
  {
    id: 5,
    type: 'multiple',
    japanese: 'ごめんなさい',
    romanji: 'gomenasai',
    meaning: {
      zh: '对不起',
      en: 'I am sorry'
    },
    options: ['ありがとう', 'ごめんなさい', 'はい', 'いいえ'],
    correct: 1
  },

  // 肯定和否定 (Yes & No)
  {
    id: 6,
    type: 'multiple',
    japanese: 'はい',
    romanji: 'hai',
    meaning: {
      zh: '是的',
      en: 'Yes'
    },
    options: ['いいえ', 'はい', 'たぶん', 'もしかして'],
    correct: 1
  },
  {
    id: 7,
    type: 'multiple',
    japanese: 'いいえ',
    romanji: 'iie',
    meaning: {
      zh: '不是',
      en: 'No'
    },
    options: ['はい', 'いいえ', 'どうぞ', 'ぜひ'],
    correct: 1
  },

  // 基本名词 - 食物 (Food)
  {
    id: 8,
    type: 'multiple',
    japanese: 'ご飯',
    romanji: 'gohan',
    meaning: {
      zh: '米饭',
      en: 'Rice'
    },
    options: ['ご飯', 'パン', 'うどん', '寿司'],
    correct: 0
  },
  {
    id: 9,
    type: 'multiple',
    japanese: 'パン',
    romanji: 'pan',
    meaning: {
      zh: '面包',
      en: 'Bread'
    },
    options: ['ご飯', 'パン', 'ラーメン', 'さかな'],
    correct: 1
  },
  {
    id: 10,
    type: 'multiple',
    japanese: '水',
    romanji: 'mizu',
    meaning: {
      zh: '水',
      en: 'Water'
    },
    options: ['水', 'お茶', 'ジュース', 'ビール'],
    correct: 0
  },

  // 基本名词 - 动物 (Animals)
  {
    id: 11,
    type: 'multiple',
    japanese: '猫',
    romanji: 'neko',
    meaning: {
      zh: '猫',
      en: 'Cat'
    },
    options: ['犬', '猫', '馬', '牛'],
    correct: 1
  },
  {
    id: 12,
    type: 'multiple',
    japanese: '犬',
    romanji: 'inu',
    meaning: {
      zh: '狗',
      en: 'Dog'
    },
    options: ['猫', '犬', '鳥', '魚'],
    correct: 1
  },

  // 颜色 (Colors)
  {
    id: 13,
    type: 'multiple',
    japanese: '赤い',
    romanji: 'akai',
    meaning: {
      zh: '红色',
      en: 'Red'
    },
    options: ['赤い', '青い', '白い', '黒い'],
    correct: 0
  },
  {
    id: 14,
    type: 'multiple',
    japanese: '青い',
    romanji: 'aoi',
    meaning: {
      zh: '蓝色',
      en: 'Blue'
    },
    options: ['赤い', '青い', '緑の', '黄色い'],
    correct: 1
  },
  {
    id: 15,
    type: 'multiple',
    japanese: '白い',
    romanji: 'shiroi',
    meaning: {
      zh: '白色',
      en: 'White'
    },
    options: ['白い', '黒い', '赤い', '青い'],
    correct: 0
  },

  // 数字 (Numbers)
  {
    id: 16,
    type: 'multiple',
    japanese: '一',
    romanji: 'ichi',
    meaning: {
      zh: '一',
      en: 'One'
    },
    options: ['一', '二', '三', '四'],
    correct: 0
  },
  {
    id: 17,
    type: 'multiple',
    japanese: '十',
    romanji: 'juu',
    meaning: {
      zh: '十',
      en: 'Ten'
    },
    options: ['五', '八', '十', '百'],
    correct: 2
  },

  // 基本动词 - 助词练习
  {
    id: 18,
    type: 'multiple',
    japanese: '私は学生＿です。',
    romanji: 'watashi wa gakusei _ desu',
    meaning: {
      zh: '填入正确的系词助词',
      en: 'Fill in the correct copula particle'
    },
    options: ['は', 'を', 'に', 'を'],
    correct: 0
  },
  {
    id: 19,
    type: 'multiple',
    japanese: '水＿飲みます。',
    romanji: 'mizu _ nomimasu',
    meaning: {
      zh: '填入目宾语标记',
      en: 'Fill in the object marker'
    },
    options: ['は', 'を', 'で', 'に'],
    correct: 1
  },
  {
    id: 20,
    type: 'multiple',
    japanese: '学校＿行きます。',
    romanji: 'gakkou _ ikimasu',
    meaning: {
      zh: '填入目标地点标记',
      en: 'Fill in the destination marker'
    },
    options: ['で', 'を', 'に', 'が'],
    correct: 2
  },

  // 词汇拓展 - 日常用语
  {
    id: 21,
    type: 'multiple',
    japanese: 'コンピュータ',
    romanji: 'konpyuta',
    meaning: {
      zh: '计算机（计算机）',
      en: 'Computer'
    },
    options: ['コンピュータ', 'テレビ', '携帯電話', 'ラジオ'],
    correct: 0
  },
  {
    id: 22,
    type: 'multiple',
    japanese: 'テレビ',
    romanji: 'terebi',
    meaning: {
      zh: '电视',
      en: 'Television'
    },
    options: ['ラジオ', 'テレビ', 'パソコン', '電話'],
    correct: 1
  },

  // 场景短语 (Simple Phrases)
  {
    id: 23,
    type: 'phrase_order',
    meaning: {
      zh: '我是学生。',
      en: 'I am a student.'
    },
    phrase: ['私は', '学生です'],
    correctOrder: [0, 1]
  },
  {
    id: 24,
    type: 'phrase_order',
    meaning: {
      zh: '早上好。',
      en: 'Good morning.'
    },
    phrase: ['おはよう', 'ございます'],
    correctOrder: [0, 1]
  },
  {
    id: 25,
    type: 'phrase_order',
    meaning: {
      zh: '请给我水。',
      en: 'Please give me water.'
    },
    phrase: ['水を', 'ください'],
    correctOrder: [0, 1]
  },

  // 疑问句 (Questions)
  {
    id: 26,
    type: 'multiple',
    japanese: 'あなたの名前は何ですか？',
    romanji: 'anata no namae wa nan desu ka',
    meaning: {
      zh: '你的名字是什么？',
      en: 'What is your name?'
    },
    options: ['何ですか', 'だれですか', '名前は何ですか', 'いつですか'],
    correct: 2
  },
  {
    id: 27,
    type: 'multiple',
    japanese: 'これは何ですか？',
    romanji: 'kore wa nan desu ka',
    meaning: {
      zh: '这是什么？',
      en: 'What is this?'
    },
    options: ['あれは何ですか', 'これは何ですか', 'どこですか', 'いつですか'],
    correct: 1
  },
  {
    id: 28,
    type: 'multiple',
    japanese: '何時ですか？',
    romanji: 'nanji desu ka',
    meaning: {
      zh: '现在几点？',
      en: 'What time is it?'
    },
    options: ['どこですか', '何ですか', '何時ですか', 'だれですか'],
    correct: 2
  },

  // 更多基本动词
  {
    id: 29,
    type: 'multiple',
    japanese: '食べます',
    romanji: 'tabemasu',
    meaning: {
      zh: '吃（敬语）',
      en: 'Eat (polite)'
    },
    options: ['飲みます', '食べます', '見ます', '聞きます'],
    correct: 1
  },
  {
    id: 30,
    type: 'multiple',
    japanese: '飲みます',
    romanji: 'nomimasu',
    meaning: {
      zh: '喝（敬语）',
      en: 'Drink (polite)'
    },
    options: ['食べます', '飲みます', '見ます', '歩きます'],
    correct: 1
  },
  // 更多基础词汇和短语
  {
    id: 31,
    type: 'multiple',
    japanese: '月曜日',
    romanji: 'getsuyoubi',
    meaning: {
      zh: '星期一',
      en: 'Monday'
    },
    options: ['火曜日', '月曜日', '水曜日', '木曜日'],
    correct: 1
  },
  {
    id: 32,
    type: 'multiple',
    japanese: '金曜日',
    romanji: 'kinyoubi',
    meaning: {
      zh: '星期五',
      en: 'Friday'
    },
    options: ['木曜日', '金曜日', '土曜日', '日曜日'],
    correct: 1
  },
  {
    id: 33,
    type: 'multiple',
    japanese: 'エレベーター',
    romanji: 'erebeta',
    meaning: {
      zh: '电梯',
      en: 'Elevator'
    },
    options: ['階段', 'エレベーター', 'ドア', '窓'],
    correct: 1
  },
  {
    id: 34,
    type: 'multiple',
    japanese: '病院',
    romanji: 'byouin',
    meaning: {
      zh: '医院',
      en: 'Hospital'
    },
    options: ['学校', '病院', '図書館', 'レストラン'],
    correct: 1
  },
  {
    id: 35,
    type: 'multiple',
    japanese: '銀行',
    romanji: 'ginkou',
    meaning: {
      zh: '银行',
      en: 'Bank'
    },
    options: ['郵便局', '銀行', 'コンビニ', '図書館'],
    correct: 1
  },
  {
    id: 36,
    type: 'multiple',
    japanese: 'きれい',
    romanji: 'kirei',
    meaning: {
      zh: '漂亮，干净',
      en: 'Beautiful, clean'
    },
    options: ['きれい', '汚い', '大きい', '小さい'],
    correct: 0
  },
  {
    id: 37,
    type: 'multiple',
    japanese: '汚い',
    romanji: 'kitanai',
    meaning: {
      zh: '脏',
      en: 'Dirty'
    },
    options: ['きれい', '汚い', '新しい', '古い'],
    correct: 1
  },
  {
    id: 38,
    type: 'multiple',
    japanese: '新しい',
    romanji: 'atarashii',
    meaning: {
      zh: '新的',
      en: 'New'
    },
    options: ['古い', '新しい', '小さい', '大きい'],
    correct: 1
  },
  {
    id: 39,
    type: 'phrase_order',
    meaning: {
      zh: '我的名字是田中。',
      en: 'My name is Tanaka.'
    },
    phrase: ['私の', '名前は', '田中です'],
    correctOrder: [0, 1, 2]
  },
  {
    id: 40,
    type: 'phrase_order',
    meaning: {
      zh: '这是一本书。',
      en: 'This is a book.'
    },
    phrase: ['これは', '本です'],
    correctOrder: [0, 1]
  },
  {
    id: 41,
    type: 'multiple',
    japanese: 'あります',
    romanji: 'arimasu',
    meaning: {
      zh: '有（非生命物）',
      en: 'There is/are (inanimate)'
    },
    options: ['います', 'あります', 'できます', 'なります'],
    correct: 1
  },
  {
    id: 42,
    type: 'multiple',
    japanese: 'います',
    romanji: 'imasu',
    meaning: {
      zh: '有（生命物或人）',
      en: 'There is/are (animate)'
    },
    options: ['あります', 'います', 'できます', 'なります'],
    correct: 1
  },
  {
    id: 43,
    type: 'multiple',
    japanese: 'トイレ',
    romanji: 'toiree',
    meaning: {
      zh: '洗手间',
      en: 'Toilet/Bathroom'
    },
    options: ['寝室', 'キッチン', 'トイレ', 'リビング'],
    correct: 2
  },
  {
    id: 44,
    type: 'multiple',
    japanese: '雨',
    romanji: 'ame',
    meaning: {
      zh: '雨',
      en: 'Rain'
    },
    options: ['雨', '晴れ', '雪', '風'],
    correct: 0
  },
  {
    id: 45,
    type: 'multiple',
    japanese: '晴れ',
    romanji: 'hare',
    meaning: {
      zh: '晴天',
      en: 'Sunny'
    },
    options: ['雨', '晴れ', '曇り', '雪'],
    correct: 1
  },
  {
    id: 46,
    type: 'multiple',
    japanese: '誰',
    romanji: 'dare',
    meaning: {
      zh: '谁',
      en: 'Who'
    },
    options: ['誰', '何', 'どこ', 'いつ'],
    correct: 0
  },
  {
    id: 47,
    type: 'multiple',
    japanese: '何',
    romanji: 'nani',
    meaning: {
      zh: '什么',
      en: 'What'
    },
    options: ['誰', '何', 'どこ', 'どうして'],
    correct: 1
  },
  {
    id: 48,
    type: 'phrase_order',
    meaning: {
      zh: '你好，很高兴认识你。',
      en: 'Hi, nice to meet you.'
    },
    phrase: ['こんにちは', 'よろしくお願いします'],
    correctOrder: [0, 1]
  },
  {
    id: 49,
    type: 'multiple',
    japanese: 'よろしくお願いします',
    romanji: 'yoroshiku onegaishimasu',
    meaning: {
      zh: '麻烦您了/请多关照',
      en: 'Thank you, please take care of me'
    },
    options: ['ありがとうございます', 'よろしくお願いします', 'すみません', 'おはようございます'],
    correct: 1
  }
]

// ========== 中等难度题库 (中級) ==========
// 适合：学过1-3个月的学习者
// 主要内容：过去式、进行式、各种助词、中级词汇、短句子

export const NORMAL_QUESTIONS: Question[] = [
  // 过去式 (Past Tense)
  {
    id: 101,
    type: 'multiple',
    japanese: '昨日、映画を見ました。',
    romanji: 'kinou, eiga o mimashita',
    meaning: {
      zh: '昨天看了电影。',
      en: 'I watched a movie yesterday.'
    },
    options: ['見ます', '見ました', '見ている', '見たい'],
    correct: 1
  },
  {
    id: 102,
    type: 'multiple',
    japanese: '朝、ご飯を食べました。',
    romanji: 'asa, gohan o tabemashita',
    meaning: {
      zh: '早上吃了米饭。',
      en: 'I ate rice in the morning.'
    },
    options: ['食べます', '食べた', '食べました', '食べている'],
    correct: 2
  },

  // 进行式 (Progressive Form)
  {
    id: 103,
    type: 'multiple',
    japanese: '今、勉強しています。',
    romanji: 'ima, benkyou shite imasu',
    meaning: {
      zh: '现在正在学习。',
      en: 'I am studying now.'
    },
    options: ['勉強します', '勉強しました', '勉強しています', '勉強したい'],
    correct: 2
  },
  {
    id: 104,
    type: 'multiple',
    japanese: '彼は本を読んでいます。',
    romanji: 'kare wa hon o yonde imasu',
    meaning: {
      zh: '他正在读书。',
      en: 'He is reading a book.'
    },
    options: ['読みます', '読みました', '読んでいます', '読みたい'],
    correct: 2
  },

  // 希望表达 (Desire Expression)
  {
    id: 105,
    type: 'multiple',
    japanese: '私は日本に行きたいです。',
    romanji: 'watashi wa nihon ni ikitai desu',
    meaning: {
      zh: '我想去日本。',
      en: 'I want to go to Japan.'
    },
    options: ['行きます', '行きました', '行きたい', '行くべき'],
    correct: 2
  },
  {
    id: 106,
    type: 'multiple',
    japanese: '私はコーヒーを飲みたいです。',
    romanji: 'watashi wa koohii o nomitai desu',
    meaning: {
      zh: '我想喝咖啡。',
      en: 'I want to drink coffee.'
    },
    options: ['飲みます', '飲みました', '飲みたい', '飲むべき'],
    correct: 2
  },

  // 比较 (Comparison)
  {
    id: 107,
    type: 'multiple',
    japanese: 'AはBより大きいです。',
    romanji: 'A wa B yori ookii desu',
    meaning: {
      zh: 'A比B大。',
      en: 'A is bigger than B.'
    },
    options: ['と同じ', 'より', 'ほど', 'くらい'],
    correct: 1
  },
  {
    id: 108,
    type: 'multiple',
    japanese: '東京は大阪より人口が多いです。',
    romanji: 'tokyo wa osaka yori jinkou ga ooii desu',
    meaning: {
      zh: '东京的人口比大阪多。',
      en: 'Tokyo has a larger population than Osaka.'
    },
    options: ['ほど', 'くらい', 'より', 'と同じ'],
    correct: 2
  },

  // 原因和结果 (Cause & Reason)
  {
    id: 109,
    type: 'multiple',
    japanese: '雨が降っているので、出かけません。',
    romanji: 'ame ga futte iru node, dekakemasen',
    meaning: {
      zh: '因为下雨，所以我不出门。',
      en: 'Because it is raining, I will not go out.'
    },
    options: ['ので', 'から', 'のに', 'ため'],
    correct: 0
  },
  {
    id: 110,
    type: 'multiple',
    japanese: '病気だから、学校に行きません。',
    romanji: 'byouki dakara, gakkou ni ikimasen',
    meaning: {
      zh: '因为生病了，所以不去学校。',
      en: 'Because I am sick, I will not go to school.'
    },
    options: ['から', 'ので', 'のに', 'ため'],
    correct: 0
  },

  // 条件 (Condition)
  {
    id: 111,
    type: 'multiple',
    japanese: '明日雨が降ったら、試合は中止です。',
    romanji: 'ashita ame ga futtara, shiai wa chuushi desu',
    meaning: {
      zh: '如果明天下雨，比赛将取消。',
      en: 'If it rains tomorrow, the match will be cancelled.'
    },
    options: ['たら', 'ば', 'なら', 'ても'],
    correct: 0
  },
  {
    id: 112,
    type: 'multiple',
    japanese: 'もし時間があれば、手伝います。',
    romanji: 'moshi jikan ga areba, tetsudaimasu',
    meaning: {
      zh: '如果有时间，我会帮忙。',
      en: 'If I have time, I will help.'
    },
    options: ['たら', 'ば', 'なら', 'ても'],
    correct: 1
  },

  // 能力表达 (Ability)
  {
    id: 113,
    type: 'multiple',
    japanese: '私は日本語が話せます。',
    romanji: 'watashi wa nihongo ga hanasemasu',
    meaning: {
      zh: '我会说日语。',
      en: 'I can speak Japanese.'
    },
    options: ['話します', '話していますか', '話せます', '話すべき'],
    correct: 2
  },
  {
    id: 114,
    type: 'multiple',
    japanese: 'この字が読めますか？',
    romanji: 'kono ji ga yomemasu ka',
    meaning: {
      zh: '你能读这个字吗？',
      en: 'Can you read this character?'
    },
    options: ['読みます', '読みました', '読めます', '読むべき'],
    correct: 2
  },

  // 禁止和义务 (Prohibition & Obligation)
  {
    id: 115,
    type: 'multiple',
    japanese: '教室では走らないでください。',
    romanji: 'kyoushitsu de wa hashiranaide kudasai',
    meaning: {
      zh: '请不要在教室里跑步。',
      en: 'Please do not run in the classroom.'
    },
    options: ['走ってください', '走らないでください', '走るべき', '走っています'],
    correct: 1
  },
  {
    id: 116,
    type: 'multiple',
    japanese: '毎日、宿題をしなければなりません。',
    romanji: 'mainichi, shukudai o shinakereba narimasen',
    meaning: {
      zh: '每天必须做作业。',
      en: 'I must do homework every day.'
    },
    options: ['します', 'しました', 'しなければなりません', 'したい'],
    correct: 2
  },

  // 短句组合 (Phrase Ordering)
  {
    id: 121,
    type: 'phrase_order',
    meaning: {
      zh: '我昨天和朋友一起看了电影。',
      en: 'I watched a movie with my friend yesterday.'
    },
    phrase: ['私は', '昨日', '友達と', '映画を', '見ました'],
    correctOrder: [0, 1, 2, 3, 4]
  },
  {
    id: 122,
    type: 'phrase_order',
    meaning: {
      zh: '妈妈正在厨房里做饭。',
      en: 'Mother is cooking in the kitchen.'
    },
    phrase: ['母は', 'キッチンで', '料理を', '作っています'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 123,
    type: 'phrase_order',
    meaning: {
      zh: '他想学习更多的日语。',
      en: 'He wants to learn more Japanese.'
    },
    phrase: ['彼は', 'もっと', '日本語を', '勉強したいです'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 124,
    type: 'phrase_order',
    meaning: {
      zh: '因为天气很好，我们去公园。',
      en: 'Because the weather is nice, we go to the park.'
    },
    phrase: ['天気が', 'いいので', '公園に', '行きます'],
    correctOrder: [0, 1, 2, 3]
  },

  // 中级词汇
  {
    id: 131,
    type: 'multiple',
    japanese: '検討する',
    romanji: 'kentou suru',
    meaning: {
      zh: '仔细考虑',
      en: 'To consider carefully'
    },
    options: ['検討する', '決定する', '報告する', '作成する'],
    correct: 0
  },
  {
    id: 132,
    type: 'multiple',
    japanese: '影響',
    romanji: 'eikyou',
    meaning: {
      zh: '影响，效果',
      en: 'Impact, influence'
    },
    options: ['影響', '無視', '分離', '保持'],
    correct: 0
  },
  {
    id: 133,
    type: 'multiple',
    japanese: '運動',
    romanji: 'undou',
    meaning: {
      zh: '运动',
      en: 'Exercise, sport'
    },
    options: ['運動', '休憩', '仕事', '遊び'],
    correct: 0
  },
  {
    id: 134,
    type: 'multiple',
    japanese: 'レストラン',
    romanji: 'resutoran',
    meaning: {
      zh: '餐厅',
      en: 'Restaurant'
    },
    options: ['病院', '銀行', 'レストラン', '郵便局'],
    correct: 2
  },
  {
    id: 135,
    type: 'multiple',
    japanese: '駅',
    romanji: 'eki',
    meaning: {
      zh: '车站',
      en: 'Station'
    },
    options: ['駅', 'バス停', '空港', '港'],
    correct: 0
  },
  // 中等难度补充题目
  {
    id: 136,
    type: 'multiple',
    japanese: '毎日コーヒーを飲みます。',
    romanji: 'mainichi koohii o nomimasu',
    meaning: {
      zh: '每天喝咖啡。',
      en: 'I drink coffee every day.'
    },
    options: ['飲む', '飲みます', '飲みました', '飲みたい'],
    correct: 1
  },
  {
    id: 137,
    type: 'phrase_order',
    meaning: {
      zh: '我想学习日语文化。',
      en: 'I want to learn Japanese culture.'
    },
    phrase: ['私は', '日本の', '文化を', '学びたいです'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 138,
    type: 'multiple',
    japanese: '週末',
    romanji: 'shuumatsu',
    meaning: {
      zh: '周末',
      en: 'Weekend'
    },
    options: ['平日', '休日', '週末', 'GW'],
    correct: 2
  },
  {
    id: 139,
    type: 'multiple',
    japanese: '授業',
    romanji: 'jugyou',
    meaning: {
      zh: '课程，上课',
      en: 'Class, lesson'
    },
    options: ['部屋', '授業', '会社', 'スーパー'],
    correct: 1
  },
  {
    id: 140,
    type: 'multiple',
    japanese: '試験',
    romanji: 'shiken',
    meaning: {
      zh: '考试',
      en: 'Exam, test'
    },
    options: ['宿題', '試験', '習題', '復習'],
    correct: 1
  },
  {
    id: 141,
    type: 'multiple',
    japanese: '宿題をしなければなりません。',
    romanji: 'shukudai o shinakereba narimasen',
    meaning: {
      zh: '必须做作业。',
      en: 'I must do homework.'
    },
    options: ['します', 'しました', 'しなければなりません', 'したい'],
    correct: 2
  },
  {
    id: 142,
    type: 'phrase_order',
    meaning: {
      zh: '天气很好，我想去公园。',
      en: 'The weather is nice, and I want to go to the park.'
    },
    phrase: ['天気が', 'いいので', '公園へ', '行きたいです'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 143,
    type: 'multiple',
    japanese: '~かもしれません',
    romanji: 'kamoshire masen',
    meaning: {
      zh: '可能...（不确定）',
      en: 'Maybe, possibly'
    },
    options: ['でしょう', 'かもしれません', 'のです', 'べき'],
    correct: 1
  },
  {
    id: 144,
    type: 'multiple',
    japanese: '最近',
    romanji: 'saikin',
    meaning: {
      zh: '最近',
      en: 'Recently'
    },
    options: ['昨日', '最近', '来月', 'いつも'],
    correct: 1
  },
  {
    id: 145,
    type: 'multiple',
    japanese: 'ずっと',
    romanji: 'zutto',
    meaning: {
      zh: '一直，始终',
      en: 'All along, always'
    },
    options: ['時々', 'ずっと', 'また', '急に'],
    correct: 1
  },
  {
    id: 146,
    type: 'multiple',
    japanese: '~によって',
    romanji: 'ni yotte',
    meaning: {
      zh: '被...所；根据...',
      en: 'By, according to'
    },
    options: ['~で', '~に', '~によって', '~から'],
    correct: 2
  },
  {
    id: 147,
    type: 'phrase_order',
    meaning: {
      zh: '这本书很有意思。',
      en: 'This book is very interesting.'
    },
    phrase: ['この', '本は', 'とても', '面白いです'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 148,
    type: 'multiple',
    japanese: '面白い',
    romanji: 'omoshiroi',
    meaning: {
      zh: '有趣的',
      en: 'Interesting, funny'
    },
    options: ['つまらない', '面白い', '退屈', 'つきない'],
    correct: 1
  },
  {
    id: 149,
    type: 'multiple',
    japanese: '辞書',
    romanji: 'jisho',
    meaning: {
      zh: '字典',
      en: 'Dictionary'
    },
    options: ['本', '雑誌', '辞書', '新聞'],
    correct: 2
  },
  {
    id: 150,
    type: 'multiple',
    japanese: '温泉',
    romanji: 'onsen',
    meaning: {
      zh: '温泉',
      en: 'Hot spring'
    },
    options: ['滝', '湖', '温泉', '川'],
    correct: 2
  }
]

// ========== 困难难度题库 (上級) ==========
// 适合：学了6个月以上的学习者
// 主要内容：敬语、复杂语法、文言文、高级词汇

export const HARD_QUESTIONS: Question[] = [
  // 敬语系统 (Keigo - Polite Language)
  {
    id: 201,
    type: 'multiple',
    japanese: 'いらっしゃる',
    romanji: 'irassharu',
    meaning: {
      zh: '来/去/在（尊敬语）',
      en: 'To come/go/be (honorific)'
    },
    options: ['普通語', '丁寧語', '尊敬語', '謙譲語'],
    correct: 2
  },
  {
    id: 202,
    type: 'multiple',
    japanese: '伺う',
    romanji: 'ukagau',
    meaning: {
      zh: '去/问（谦逊语）',
      en: 'To go/ask (humble)'
    },
    options: ['尊敬語', '謙譲語', '丁寧語', '普通語'],
    correct: 1
  },
  {
    id: 203,
    type: 'multiple',
    japanese: 'おっしゃる',
    romanji: 'ossharu',
    meaning: {
      zh: '说（尊敬语）',
      en: 'To say (honorific)'
    },
    options: ['謙譲語', '尊敬語', '丁寧語', '普通語'],
    correct: 1
  },
  {
    id: 204,
    type: 'multiple',
    japanese: '申し上げます',
    romanji: 'moushagemasu',
    meaning: {
      zh: '说（谦逊语）',
      en: 'To say (humble)'
    },
    options: ['尊敬語', '謙譲語', '丁寧語', 'カジュアル'],
    correct: 1
  },

  // 复杂的语法结构 (Complex Grammar)
  {
    id: 205,
    type: 'multiple',
    japanese: '～ながら',
    romanji: 'nagara',
    meaning: {
      zh: '一边...一边...（同时进行两个动作）',
      en: 'While, as... (simultaneous actions)'
    },
    options: ['前後関係', '原因', '同時', '対比'],
    correct: 2
  },
  {
    id: 206,
    type: 'multiple',
    japanese: '～てしまう',
    romanji: 'te shimau',
    meaning: {
      zh: '完成了...（带有后悔感）',
      en: 'Have done... (with regret)'
    },
    options: ['可能', '完了/後悔', '命令', '意志'],
    correct: 1
  },
  {
    id: 207,
    type: 'multiple',
    japanese: '～ことができる',
    romanji: 'koto ga dekiru',
    meaning: {
      zh: '能够...',
      en: 'Be able to...'
    },
    options: ['義務', '禁止', '可能', '希望'],
    correct: 2
  },
  {
    id: 208,
    type: 'multiple',
    japanese: '～ばかりか',
    romanji: 'bakari ka',
    meaning: {
      zh: '不仅...而且...',
      en: 'Not only... but also...'
    },
    options: ['対比', '追加', '強調', '例示'],
    correct: 1
  },

  // 条件和假设 (Conditional Forms)
  {
    id: 209,
    type: 'multiple',
    japanese: '~もし～たら',
    romanji: 'moshi ~ tara',
    meaning: {
      zh: '如果...假如...',
      en: 'If... (hypothetical)'
    },
    options: ['確実な条件', '反事実', '仮定', '一般的条件'],
    correct: 2
  },
  {
    id: 210,
    type: 'multiple',
    japanese: '～べき',
    romanji: 'beki',
    meaning: {
      zh: '应该...必须...',
      en: 'Should, must, ought to'
    },
    options: ['可能', '推量', '義務', '希望'],
    correct: 2
  },

  // 受动和使役 (Passive & Causative)
  {
    id: 211,
    type: 'multiple',
    japanese: '受身形（受け身）',
    romanji: 'ukemi',
    meaning: {
      zh: '被动语态',
      en: 'Passive voice'
    },
    options: ['自発', '可能', '受身', '使役'],
    correct: 2
  },
  {
    id: 212,
    type: 'multiple',
    japanese: '使役形（～させる）',
    romanji: 'shieki',
    meaning: {
      zh: '使役形，让...做...',
      en: 'Causative form, make/let someone do'
    },
    options: ['受身', '使役', '命令', '希望'],
    correct: 1
  },
  {
    id: 213,
    type: 'multiple',
    japanese: '先生は学生に勉強させました。',
    romanji: 'sensei wa gakusei ni benkyou sasemashita',
    meaning: {
      zh: '老师让学生学习。',
      en: 'The teacher made the student study.'
    },
    options: ['させる', 'される', 'させられる', 'させられました'],
    correct: 0
  },
  {
    id: 214,
    type: 'multiple',
    japanese: 'この本は多くの人に読まれています。',
    romanji: 'kono hon wa ooku no hito ni yomarete imasu',
    meaning: {
      zh: '这本书被很多人阅读。',
      en: 'This book is being read by many people.'
    },
    options: ['読みます', '読まれています', '読ませます', '読ませられます'],
    correct: 1
  },

  // 高级连接词 (Advanced Conjunctions)
  {
    id: 215,
    type: 'multiple',
    japanese: '～にもかかわらず',
    romanji: 'ni mo kakawarazu',
    meaning: {
      zh: '虽然...仍然...（尽管）',
      en: 'Despite, in spite of'
    },
    options: ['原因', '対比', '譲歩', '強調'],
    correct: 2
  },
  {
    id: 216,
    type: 'multiple',
    japanese: '～によって',
    romanji: 'ni yotte',
    meaning: {
      zh: '被...所...; 根据...',
      en: 'By, due to, according to'
    },
    options: ['手段', '原因', '時間', '範囲'],
    correct: 1
  },

  // 复杂短语（高级）
  {
    id: 231,
    type: 'phrase_order',
    meaning: {
      zh: '如果下雨，比赛将取消。',
      en: 'If it rains, the match will be cancelled.'
    },
    phrase: ['もし', '雨が', '降ったら', '試合は', '中止に', 'なります'],
    correctOrder: [0, 1, 2, 3, 4, 5]
  },
  {
    id: 232,
    type: 'phrase_order',
    meaning: {
      zh: '尽管非常困难，他仍然继续学习。',
      en: 'Despite great difficulty, he continues to study.'
    },
    phrase: ['非常に', '困難にもかかわらず', '彼は', '勉強を', '続けています'],
    correctOrder: [0, 1, 2, 3, 4]
  },
  {
    id: 233,
    type: 'phrase_order',
    meaning: {
      zh: '这项政策将由新政府实施。',
      en: 'This policy will be implemented by the new government.'
    },
    phrase: ['この', 'ポリシーは', '新しい', '政府によって', '実施されます'],
    correctOrder: [0, 1, 2, 3, 4]
  },

  // 高级词汇和表达 (Advanced Vocabulary)
  {
    id: 241,
    type: 'multiple',
    japanese: '革新',
    romanji: 'kakushin',
    meaning: {
      zh: '创新，革新',
      en: 'Innovation, reform'
    },
    options: ['革新', '保守', '伝統', '習慣'],
    correct: 0
  },
  {
    id: 242,
    type: 'multiple',
    japanese: '多角的',
    romanji: 'takakuteki',
    meaning: {
      zh: '多方面的，多角度的',
      en: 'Multi-faceted, multifaceted'
    },
    options: ['単純', '多角的', '単なる', '基本的'],
    correct: 1
  },
  {
    id: 243,
    type: 'multiple',
    japanese: '絶対',
    romanji: 'zettai',
    meaning: {
      zh: '绝对，必然',
      en: 'Absolute, certain'
    },
    options: ['相対', '絶対', '可能', '変動'],
    correct: 1
  },
  {
    id: 244,
    type: 'multiple',
    japanese: '論理的',
    romanji: 'ronriteki',
    meaning: {
      zh: '逻辑的，合理的',
      en: 'Logical, rational'
    },
    options: ['感情的', '論理的', '主観的', '判断的'],
    correct: 1
  },
  {
    id: 245,
    type: 'multiple',
    japanese: '相互',
    romanji: 'sougo',
    meaning: {
      zh: '相互的，互相的',
      en: 'Mutual, reciprocal'
    },
    options: ['一方的', '相互', '独立', '従属'],
    correct: 1
  },
  // 上級難度補充題目
  {
    id: 246,
    type: 'multiple',
    japanese: '～ものなら',
    romanji: 'mono nara',
    meaning: {
      zh: '如果...的话；即使...也',
      en: 'If, in case'
    },
    options: ['～と', '～から', '～ものなら', '～まで'],
    correct: 2
  },
  {
    id: 247,
    type: 'multiple',
    japanese: '～ばかりでなく',
    romanji: 'bakari denaku',
    meaning: {
      zh: '不仅...而且；不但...还...',
      en: 'Not only... but also...'
    },
    options: ['～だけ', '～ばかりでなく', '～ほど', '～まで'],
    correct: 1
  },
  {
    id: 248,
    type: 'phrase_order',
    meaning: {
      zh: '这个问题虽然困难，但我想挑战它。',
      en: 'Although this problem is difficult, I want to challenge it.'
    },
    phrase: ['この', '問題は', '難しいのに', '私は', '挑戦したいです'],
    correctOrder: [0, 1, 2, 3, 4]
  },
  {
    id: 249,
    type: 'multiple',
    japanese: '存在する',
    romanji: 'sonzai suru',
    meaning: {
      zh: '存在，存在于',
      en: 'To exist'
    },
    options: ['生成する', '存在する', '消滅する', '変化する'],
    correct: 1
  },
  {
    id: 250,
    type: 'multiple',
    japanese: '文化',
    romanji: 'bunka',
    meaning: {
      zh: '文化',
      en: 'Culture'
    },
    options: ['文化', '社会', '政治', '経済'],
    correct: 0
  },
  {
    id: 251,
    type: 'multiple',
    japanese: '状況',
    romanji: 'joukyou',
    meaning: {
      zh: '状况，情况',
      en: 'Situation, circumstance'
    },
    options: ['状況', '現象', '背景', '環境'],
    correct: 0
  },
  {
    id: 252,
    type: 'multiple',
    japanese: '～とともに',
    romanji: 'to tomoni',
    meaning: {
      zh: '与...一起；随着...；伴随着',
      en: 'Together with, as'
    },
    options: ['～と', '～とともに', '～では', '～によって'],
    correct: 1
  },
  {
    id: 253,
    type: 'phrase_order',
    meaning: {
      zh: '随着科技的发展，生活变得更加便利。',
      en: 'With the development of technology, life becomes more convenient.'
    },
    phrase: ['科学技術の', '進展とともに', '生活は', 'より便利に', 'なります'],
    correctOrder: [0, 1, 2, 3, 4]
  },
  {
    id: 254,
    type: 'multiple',
    japanese: '対する',
    romanji: 'taisuru',
    meaning: {
      zh: '对抗；针对',
      en: 'Against, towards, to'
    },
    options: ['～で', '対する', '～に', '～から'],
    correct: 1
  },
  {
    id: 255,
    type: 'multiple',
    japanese: '影響を与える',
    romanji: 'eikyou o ataeru',
    meaning: {
      zh: '产生影响，施加影响',
      en: 'To have an effect, to influence'
    },
    options: ['影響を与える', '影響を受ける', '影響する', '効果がある'],
    correct: 0
  },
  {
    id: 256,
    type: 'multiple',
    japanese: '～につれて',
    romanji: 'ni tsurerete',
    meaning: {
      zh: '随着...；伴随着...',
      en: 'As, along with'
    },
    options: ['～に', '～につれて', '～ため', '～まで'],
    correct: 1
  },
  {
    id: 257,
    type: 'phrase_order',
    meaning: {
      zh: '年龄增长，责任也随之增加。',
      en: 'As one grows older, responsibility increases accordingly.'
    },
    phrase: ['年を', 'とるにつれて', '責任が', '増えていきます'],
    correctOrder: [0, 1, 2, 3]
  },
  {
    id: 258,
    type: 'multiple',
    japanese: '原理',
    romanji: 'genri',
    meaning: {
      zh: '原理，原则',
      en: 'Principle, origin'
    },
    options: ['理由', '原理', '目的', '結果'],
    correct: 1
  },
  {
    id: 259,
    type: 'multiple',
    japanese: '不可能',
    romanji: 'fukanou',
    meaning: {
      zh: '不可能',
      en: 'Impossible'
    },
    options: ['可能', '不可能', '必然', '偶然'],
    correct: 1
  },
  {
    id: 260,
    type: 'multiple',
    japanese: '超越する',
    romanji: 'chouetsu suru',
    meaning: {
      zh: '超越，克服',
      en: 'To surpass, to overcome'
    },
    options: ['達成する', '超越する', '判断する', 'まねぐ'],
    correct: 1
  }
]
