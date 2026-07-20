import { useState, useEffect } from 'react'
import './App.css'
import { EASY_QUESTIONS, NORMAL_QUESTIONS, HARD_QUESTIONS } from './questions'

interface Warrior {
  level: number
  exp: number
  expNeeded: number
  hp: number
  maxHp: number
  attack: number
  defense: number
  gold: number
  equipment: string
  skills: string[]
  achievements: string[]
  name: string
  profession: string
  location?: string
  visitedLocations?: string[]
  correctAnswers?: number
  totalAnswers?: number
  difficultQuestions?: number[]
  loginDays?: number
  lastLoginDate?: string
}

interface Location {
  id: string
  name: string
  description: string
  icon: string
  x: number
  y: number
  levelRequired: number
  npcs: NPC[]
  enemies?: Enemy[]
  rewards?: { gold: number; exp: number }
}

interface NPC {
  id: string
  name: string
  description: string
  dialog: string
  quest?: Quest
}

interface Quest {
  id: string
  name: string
  description: string
  objective: string
  reward: { gold: number; exp: number; item?: string }
  completed: boolean
}

interface Equipment {
  id: string
  name: string
  price: number
  attack: number
  defense: number
  description: string
}

interface Enemy {
  name: string
  maxHp: number
  attack: number
  defense: number
  image: string
  gold: number
}

interface DamageNumber {
  id: number
  damage: number
  isWarrior: boolean
}

type Difficulty = 'easy' | 'normal' | 'hard'

interface Question {
  id: number
  type: 'multiple' | 'phrase_order'
}

interface MultipleChoiceQuestion extends Question {
  type: 'multiple'
  japanese: string
  meaning: {
    zh: string
    en: string
  }
  romanji: string
  options: string[]
  correct: number
}

interface PhraseOrderQuestion extends Question {
  type: 'phrase_order'
  meaning: {
    zh: string
    en: string
  }
  phrase: string[]
  correctOrder: number[]
}

const ENEMIES: { [key in Difficulty]: Enemy[] } = {
  easy: [
    {
      name: '史莱姆',
      maxHp: 180,
      attack: 5,
      defense: 0,
      image: 'assets/Enemies/Default/slime_normal_rest.png',
      gold: 20
    },
    {
      name: '小蛙',
      maxHp: 210,
      attack: 6,
      defense: 1,
      image: 'assets/Enemies/Default/frog_rest.png',
      gold: 25
    }
  ],
  normal: [
    {
      name: '妖魔',
      maxHp: 300,
      attack: 12,
      defense: 3,
      image: 'assets/Enemies/Default/slime_normal_rest.png',
      gold: 50
    },
    {
      name: '骷髅骑士',
      maxHp: 360,
      attack: 14,
      defense: 4,
      image: 'assets/Enemies/Default/skeleton_idle.png',
      gold: 60
    }
  ],
  hard: [
    {
      name: '恶魔统领',
      maxHp: 600,
      attack: 20,
      defense: 6,
      image: 'assets/Enemies/Default/slime_spike_rest.png',
      gold: 150
    },
    {
      name: '暗黑骑士',
      maxHp: 540,
      attack: 18,
      defense: 7,
      image: 'assets/Enemies/Default/worm_normal_rest.png',
      gold: 120
    }
  ]
}

const ACHIEVEMENTS = [
  { id: 'first_battle', name: '初试锋芒', description: '完成第一场战斗' },
  { id: 'level_5', name: '崭露头角', description: '达到5级' },
  { id: 'level_10', name: '锋芒毕露', description: '达到10级' },
  { id: 'rich', name: '小有资产', description: '累计获得500金币' },
  { id: 'perfect', name: '完美战士', description: '一场战斗中不失血' },
  { id: 'lucky', name: '幸运儿', description: '获得5个宝箱奖励' }
]

const SHOP_EQUIPMENT: Equipment[] = [
  {
    id: 'iron_sword',
    name: '铁剑',
    price: 150,
    attack: 15,
    defense: 0,
    description: '坚固的铁制武器，提升攻击力'
  },
  {
    id: 'crystal_sword',
    name: '水晶剑',
    price: 300,
    attack: 25,
    defense: 0,
    description: '闪闪发光的水晶剑，强大的攻击力'
  },
  {
    id: 'legendary_sword',
    name: '传奇之剑',
    price: 500,
    attack: 40,
    defense: 0,
    description: '传说中的神兵利器，无敌的力量'
  },
  {
    id: 'iron_armor',
    name: '铁甲',
    price: 200,
    attack: 0,
    defense: 10,
    description: '厚重的铁制盔甲，提升防御力'
  },
  {
    id: 'crystal_armor',
    name: '水晶铠甲',
    price: 350,
    attack: 0,
    defense: 18,
    description: '坚硬的水晶制盔甲，卓越的防御'
  },
  {
    id: 'legendary_armor',
    name: '传奇盔甲',
    price: 550,
    attack: 0,
    defense: 30,
    description: '传说中的防具，无坚不摧的保护'
  },
  {
    id: 'balanced_sword',
    name: '平衡之剑',
    price: 250,
    attack: 20,
    defense: 5,
    description: '攻防兼备的优秀武器'
  },
  {
    id: 'ancient_ring',
    name: '古老戒指',
    price: 400,
    attack: 10,
    defense: 10,
    description: '远古魔法戒指，全面提升属性'
  }
]

// 世界地图数据
const WORLD_LOCATIONS: Location[] = [
  {
    id: 'starter_village',
    name: '新手村',
    description: '安全的起始地点，适合初学者学习日语基础',
    icon: '🏘️',
    x: 100,
    y: 100,
    levelRequired: 1,
    npcs: [
      {
        id: 'elder',
        name: '村长',
        description: '村里的长者',
        dialog: '你好！让我们学习日语吧。',
        quest: { id: 'q1', name: '学习问候', description: '学习基本问候语', objective: '回答5个问题', reward: { gold: 100, exp: 50 }, completed: false }
      }
    ],
    rewards: { gold: 50, exp: 25 }
  },
  {
    id: 'forest_temple',
    name: '森林神庙',
    description: '古老的神庙，充满了日本文化气息',
    icon: '⛩️',
    x: 300,
    y: 150,
    levelRequired: 5,
    npcs: [
      {
        id: 'shrine_keeper',
        name: '神社住持',
        description: '神庙的守护者',
        dialog: '欢迎光临。',
        quest: { id: 'q2', name: '传统学习', description: '学习日本传统文化相关词汇', objective: '完成10个问题', reward: { gold: 200, exp: 100 }, completed: false }
      }
    ],
    rewards: { gold: 100, exp: 50 }
  },
  {
    id: 'merchant_town',
    name: '商人镇',
    description: '繁华的商业中心，学习交易相关词汇',
    icon: '🏪',
    x: 500,
    y: 200,
    levelRequired: 3,
    npcs: [
      {
        id: 'merchant',
        name: '商人',
        description: '精明的商人',
        dialog: '有什么我可以帮你的吗？',
        quest: { id: 'q3', name: '商业交易', description: '学习交易和购物相关术语', objective: '完成8个问题', reward: { gold: 150, exp: 75 }, completed: false }
      }
    ],
    rewards: { gold: 80, exp: 40 }
  },
  {
    id: 'dragon_mountain',
    name: '龙之山',
    description: '危险的高山区域，强大敌人的聚集地',
    icon: '🐉',
    x: 700,
    y: 300,
    levelRequired: 10,
    npcs: [
      {
        id: 'dragon_slayer',
        name: '龙骑士',
        description: '勇敢的龙骑士',
        dialog: 'ここは非常に危険な場所です。(这是一个非常危险的地方。)',
        quest: { id: 'q4', name: '龙之挑战', description: '学习战斗和冒险相关词汇', objective: '完成15个问题', reward: { gold: 500, exp: 250 }, completed: false }
      }
    ],
    rewards: { gold: 300, exp: 150 }
  },
  {
    id: 'cherry_blossom_garden',
    name: '樱花园',
    description: '美丽的樱花园，学习自然和季节词汇',
    icon: '🌸',
    x: 200,
    y: 400,
    levelRequired: 2,
    npcs: [
      {
        id: 'gardener',
        name: '园丁',
        description: '细心的园丁',
        dialog: '美しい季節ですね。(这真是美丽的季节啊。)',
        quest: { id: 'q5', name: '自然学习', description: '学习季节和自然相关词汇', objective: '完成7个问题', reward: { gold: 120, exp: 60 }, completed: false }
      }
    ],
    rewards: { gold: 60, exp: 30 }
  }
]

function App() {
  const [warrior, setWarrior] = useState<Warrior>({
    level: 1,
    exp: 0,
    expNeeded: 100,
    hp: 100,
    maxHp: 100,
    attack: 10,
    defense: 5,
    gold: 0,
    equipment: 'Wooden Sword',
    skills: [],
    achievements: [],
    name: '名無しの戦士',
    profession: '剣士',
    correctAnswers: 0,
    totalAnswers: 0,
    difficultQuestions: [],
    loginDays: 1,
    lastLoginDate: new Date().toISOString().split('T')[0]
  })

  const [warriorName, setWarriorName] = useState('名無しの戦士')
  const [selectedProfession, setSelectedProfession] = useState('剣士')
  const [showCustomize, setShowCustomize] = useState(false)

  const [difficulty, setDifficulty] = useState<Difficulty>('normal')
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [questionsAnswered, setQuestionsAnswered] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [message, setMessage] = useState('')
  const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null)
  const [enemyHp, setEnemyHp] = useState(50)
  const [inBattle, setInBattle] = useState(false)
  const [showTreasure, setShowTreasure] = useState(false)
  const [treasureReward, setTreasureReward] = useState<{ type: string; amount: number }>({ type: '', amount: 0 })
  const [showDifficultySelect, setShowDifficultySelect] = useState(true)
  const [isAttacking, setIsAttacking] = useState(false)
  const [damageNumbers, setDamageNumbers] = useState<DamageNumber[]>([])
  const [nextDamageId, setNextDamageId] = useState(0)
  const [enemyShake, setEnemyShake] = useState(false)
  const [warriorShake, setWarriorShake] = useState(false)
  const [showShop, setShowShop] = useState(false)
  const [equippedEquipment, setEquippedEquipment] = useState<Equipment | null>(null)
  const [purchasedEquipment, setPurchasedEquipment] = useState<string[]>([])
  const [phraseOrder, setPhraseOrder] = useState<number[]>([])
  const [selectedPhraseIndex, setSelectedPhraseIndex] = useState<number | null>(null)
  const [learningMode, setLearningMode] = useState<'jp' | 'cn' | 'en' | 'both'>('both')
  const [displayOptions, setDisplayOptions] = useState<string[]>([])
  const [currentCorrectIndex, setCurrentCorrectIndex] = useState<number | null>(null)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [specialCharge, setSpecialCharge] = useState(0)
  const SPECIAL_MAX_CHARGE = 5
  const [dailyLoginBonus, setDailyLoginBonus] = useState(false)
  const [dailyMissionProgress, setDailyMissionProgress] = useState(0)
  const [dailyMissionClaimed, setDailyMissionClaimed] = useState(false)
  const dailyMissionGoal = 5
  
  // 世界地图相关状态
  const [showMap, setShowMap] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null)
  const [showLocationDialog, setShowLocationDialog] = useState(false)
  const [selectedNPC, setSelectedNPC] = useState<NPC | null>(null)

  const selectRandomEnemy = () => {
    const enemies = ENEMIES[difficulty]
    return enemies[Math.floor(Math.random() * enemies.length)]
  }

  const getRandomTreasure = () => {
    const treasures = [
      { type: '💰 金币', amount: 50 + warrior.level * 10 },
      { type: '⚡ 攻击', amount: 3 },
      { type: '🛡️ 防御', amount: 2 },
      { type: '❤️ 体力', amount: 30 },
      { type: '⭐ 经验', amount: 50 }
    ]
    return treasures[Math.floor(Math.random() * treasures.length)]
  }

  // 地图相关函数
  const visitLocation = (location: Location) => {
    if (warrior.level < location.levelRequired) {
      setMessage(`需要等级${location.levelRequired}`)
      return
    }
    setCurrentLocation(location)
    setShowLocationDialog(true)
    if (!warrior.visitedLocations?.includes(location.id)) {
      setWarrior(prev => ({
        ...prev,
        visitedLocations: [...(prev.visitedLocations || []), location.id]
      }))
    }
  }

  const talkToNPC = (npc: NPC) => {
    setSelectedNPC(npc)
  }

  const acceptQuest = (_questData: Quest) => {
    // 切换到战斗/答题模式以完成任务
    setShowLocationDialog(false)
    setShowDifficultySelect(false)
    setGameOver(false)
    setQuestionsAnswered(0)
    startBattle()
  }

  const unlockAchievement = (achievementId: string) => {
    if (!warrior.achievements.includes(achievementId)) {
      setWarrior(prev => ({
        ...prev,
        achievements: [...prev.achievements, achievementId]
      }))
      const achievement = ACHIEVEMENTS.find(a => a.id === achievementId)
      setMessage(`🏆 実績を獲得: ${achievement?.name}`)
    }
  }

  const showDamageNumber = (damage: number, isWarrior: boolean) => {
    const newDamage: DamageNumber = {
      id: nextDamageId,
      damage,
      isWarrior
    }
    setDamageNumbers(prev => [...prev, newDamage])
    setNextDamageId(prev => prev + 1)

    // 2秒后移除伤害数字
    setTimeout(() => {
      setDamageNumbers(prev => prev.filter(d => d.id !== newDamage.id))
    }, 2000)
  }

  const triggerShake = (isWarrior: boolean) => {
    if (isWarrior) {
      setWarriorShake(true)
      setTimeout(() => setWarriorShake(false), 300)
    } else {
      setEnemyShake(true)
      setTimeout(() => setEnemyShake(false), 300)
    }
  }

  useEffect(() => {
    if (!currentQuestion && !gameOver && inBattle) {
      const questionPool = difficulty === 'easy'
        ? EASY_QUESTIONS
        : difficulty === 'normal'
          ? NORMAL_QUESTIONS
          : HARD_QUESTIONS
      const randomQ = questionPool[Math.floor(Math.random() * questionPool.length)]
      setCurrentQuestion(randomQ)
      setSelectedAnswer(null)
      setShowResult(false)
      setSelectedPhraseIndex(null)
      if (randomQ.type === 'phrase_order') {
        setPhraseOrder([...(randomQ as PhraseOrderQuestion).correctOrder].sort(() => Math.random() - 0.5))
        setDisplayOptions([])
        setCurrentCorrectIndex(null)
      } else {
        const mcq = randomQ as MultipleChoiceQuestion
        const shuffled = mcq.options
          .map((option, index) => ({ option, index }))
          .sort(() => Math.random() - 0.5)
        setDisplayOptions(shuffled.map(item => item.option))
        setCurrentCorrectIndex(shuffled.findIndex(item => item.index === mcq.correct))
      }
    }
  }, [currentQuestion, gameOver, inBattle, difficulty])

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10)
    const lastLogin = localStorage.getItem('lastLoginDay')
    if (lastLogin !== today) {
      localStorage.setItem('lastLoginDay', today)
      setDailyLoginBonus(true)
      setDailyMissionProgress(0)
      setDailyMissionClaimed(false)
      setWarrior(prev => ({ ...prev, gold: prev.gold + 40 }))
      setMessage('今日登录奖励：+40 金币')
    }
  }, [])

  const awardDailyMissionProgress = () => {
    if (dailyMissionClaimed) return
    setDailyMissionProgress(prev => {
      const nextProgress = Math.min(prev + 1, dailyMissionGoal)
        if (nextProgress === dailyMissionGoal) {
        setMessage('🎉 每日任务完成！可领取奖励')
      }
      return nextProgress
    })
  }

  const claimDailyMissionReward = () => {
    if (dailyMissionProgress < dailyMissionGoal || dailyMissionClaimed) return
    setDailyMissionClaimed(true)
    setWarrior(prev => ({ ...prev, gold: prev.gold + 30 }))
    setMessage('🎁 每日任务奖励 +30 金币')
  }

  const handleAnswer = (index: number) => {
    if (showResult || !currentQuestion) return
    setSelectedAnswer(index)
    
    let correct = false
    if (currentQuestion.type === 'multiple') {
      correct = index === currentCorrectIndex
    }
    
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      const expGain = 25
      const goldGain = 10 + warrior.level * 5
      let newExp = warrior.exp + expGain
      let newLevel = warrior.level
      let newAttack = warrior.attack
      let newDefense = warrior.defense
      let newMaxHp = warrior.maxHp
      let newEquipment = warrior.equipment

      while (newExp >= warrior.expNeeded) {
        newExp -= warrior.expNeeded
        newLevel++
        newAttack += 3
        newDefense += 2
        newMaxHp += 20
        if (newLevel === 5) {
          newEquipment = 'Iron Sword'
          unlockAchievement('level_5')
        } else if (newLevel === 10) {
          newEquipment = 'Crystal Sword'
          unlockAchievement('level_10')
        } else if (newLevel === 15) {
          newEquipment = 'Legendary Sword'
        }
      }

      setWarrior(prev => ({
        ...prev,
        exp: newExp,
        level: newLevel,
        gold: prev.gold + goldGain,
        attack: newAttack,
        defense: newDefense,
        maxHp: newMaxHp,
        hp: Math.min(prev.hp + 10, newMaxHp),
        equipment: newEquipment,
        correctAnswers: (prev.correctAnswers || 0) + 1,
        totalAnswers: (prev.totalAnswers || 0) + 1
      }))
      const nextSpecialCharge = Math.min(specialCharge + 1, SPECIAL_MAX_CHARGE)
      setSpecialCharge(nextSpecialCharge)
      setCurrentStreak(prev => {
        const nextStreak = prev + 1
        setBestStreak(prevBest => Math.max(prevBest, nextStreak))
        return nextStreak
      })

      setMessage(`正确！+${expGain} 经验 +${goldGain} 金币${nextSpecialCharge === SPECIAL_MAX_CHARGE ? '，必杀技已就绪！' : ''}`)
      awardDailyMissionProgress()
      
      if (inBattle && currentEnemy) {
        setIsAttacking(true)
        const damage = Math.floor(Math.random() * 5) + newAttack
        showDamageNumber(damage, false)
        triggerShake(false)
        
        setTimeout(() => {
          setEnemyHp(prev => {
            const newEnemyHp = Math.max(0, prev - damage)
            
            // 随机宝箱奖励
            if (Math.random() < 0.3) {
              const treasure = getRandomTreasure()
              setShowTreasure(true)
              setTreasureReward(treasure)
            }

            if (newEnemyHp <= 0) {
              setMessage('击败敌人！')
              unlockAchievement('first_battle')
              setTimeout(() => {
                setInBattle(false)
                setCurrentEnemy(null)
                setCurrentQuestion(null)
                setIsAttacking(false)
              }, 1500)
            } else {
              setIsAttacking(false)
            }
            
            return newEnemyHp
          })
        }, 300)
      }
    } else {
      const damage = Math.max(1, currentEnemy?.attack || 15 - warrior.defense)
      showDamageNumber(damage, true)
      triggerShake(true)
      
      recordWrongAnswer(currentQuestion)
      setCurrentStreak(0)
      setWarrior(prev => ({
        ...prev,
        hp: Math.max(0, prev.hp - damage)
      }))
      setMessage(`错误！受到 ${damage} 点伤害`)

      if (warrior.hp - damage <= 0) {
        setGameOver(true)
        setMessage('勇士已被击败...')
        setInBattle(false)
      }
    }

    setQuestionsAnswered(prev => prev + 1)
    
    if (questionsAnswered + 1 >= 10) {
      setTimeout(() => {
        setGameOver(true)
      }, 1500)
    }
  }

  const recordWrongAnswer = (question: Question | null) => {
    if (!question) return
    setWarrior(prev => ({
      ...prev,
      totalAnswers: (prev.totalAnswers || 0) + 1,
      difficultQuestions: prev.difficultQuestions?.includes(question.id)
        ? prev.difficultQuestions
        : [...(prev.difficultQuestions || []), question.id]
    }))
  }

  const handlePhraseOrder = (correct: boolean) => {
    if (showResult) return
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      const expGain = 25
      const goldGain = 10 + warrior.level * 5
      let newExp = warrior.exp + expGain
      let newLevel = warrior.level
      let newAttack = warrior.attack
      let newDefense = warrior.defense
      let newMaxHp = warrior.maxHp
      let newEquipment = warrior.equipment

      while (newExp >= warrior.expNeeded) {
        newExp -= warrior.expNeeded
        newLevel++
        newAttack += 3
        newDefense += 2
        newMaxHp += 20
        if (newLevel === 5) {
          newEquipment = 'Iron Sword'
          unlockAchievement('level_5')
        } else if (newLevel === 10) {
          newEquipment = 'Crystal Sword'
          unlockAchievement('level_10')
        } else if (newLevel === 15) {
          newEquipment = 'Legendary Sword'
        }
      }

      setWarrior(prev => ({
        ...prev,
        exp: newExp,
        level: newLevel,
        gold: prev.gold + goldGain,
        attack: newAttack,
        defense: newDefense,
        maxHp: newMaxHp,
        hp: Math.min(prev.hp + 10, newMaxHp),
        equipment: newEquipment
      }))
      const nextSpecialCharge = Math.min(specialCharge + 1, SPECIAL_MAX_CHARGE)
      setSpecialCharge(nextSpecialCharge)
      setCurrentStreak(prev => {
        const nextStreak = prev + 1
        setBestStreak(prevBest => Math.max(prevBest, nextStreak))
        return nextStreak
      })

      setMessage(`正确！+${expGain} 经验 +${goldGain} 金币${nextSpecialCharge === SPECIAL_MAX_CHARGE ? '，必杀技已就绪！' : ''}`)
      awardDailyMissionProgress()
      
      if (inBattle && currentEnemy) {
        setIsAttacking(true)
        const damage = Math.floor(Math.random() * 5) + newAttack
        showDamageNumber(damage, false)
        triggerShake(false)
        
        setTimeout(() => {
          setEnemyHp(prev => {
            const newEnemyHp = Math.max(0, prev - damage)
            
            if (Math.random() < 0.3) {
              const treasure = getRandomTreasure()
              setShowTreasure(true)
              setTreasureReward(treasure)
            }

            if (newEnemyHp <= 0) {
              setMessage('击败敌人！')
              unlockAchievement('first_battle')
              setTimeout(() => {
                setInBattle(false)
                setCurrentEnemy(null)
                setCurrentQuestion(null)
                setIsAttacking(false)
              }, 1500)
            } else {
              setIsAttacking(false)
            }
            
            return newEnemyHp
          })
        }, 300)
      }
    } else {
      const damage = Math.max(1, currentEnemy?.attack || 15 - warrior.defense)
      showDamageNumber(damage, true)
      triggerShake(true)
      setCurrentStreak(0)
      
      setWarrior(prev => ({
        ...prev,
        hp: Math.max(0, prev.hp - damage)
      }))
      setMessage(`错误！受到 ${damage} 点伤害`)

      if (warrior.hp - damage <= 0) {
        setGameOver(true)
        setMessage('勇士已被击败...')
        setInBattle(false)
      }
    }

    setQuestionsAnswered(prev => prev + 1)
    
    if (questionsAnswered + 1 >= 10) {
      setTimeout(() => {
        setGameOver(true)
      }, 1500)
    }
  }

  const handlePhraseWordClick = (pos: number) => {
    if (showResult || !currentQuestion || currentQuestion.type !== 'phrase_order') return
    if (selectedPhraseIndex === null) {
      setSelectedPhraseIndex(pos)
      return
    }
    if (selectedPhraseIndex === pos) {
      setSelectedPhraseIndex(null)
      return
    }
    const newOrder = [...phraseOrder]
    const firstIndex = selectedPhraseIndex
    newOrder[firstIndex] = phraseOrder[pos]
    newOrder[pos] = phraseOrder[firstIndex]
    setPhraseOrder(newOrder)
    setSelectedPhraseIndex(null)
  }

  const resetPhraseOrder = () => {
    if (!currentQuestion || currentQuestion.type !== 'phrase_order') return
    setPhraseOrder([...(currentQuestion as PhraseOrderQuestion).correctOrder].sort(() => Math.random() - 0.5))
    setSelectedPhraseIndex(null)
  }

  const checkPhraseOrder = () => {
    if (!currentQuestion || currentQuestion.type !== 'phrase_order' || showResult) return
    const correct = phraseOrder.every((value, index) => value === (currentQuestion as PhraseOrderQuestion).correctOrder[index])
    handlePhraseOrder(correct)
  }

  const startBattle = () => {
    const enemy = selectRandomEnemy()
    setCurrentEnemy(enemy)
    setInBattle(true)
    setEnemyHp(enemy.maxHp)
    setCurrentQuestion(null)
  }

  const getProfessionIcon = (profession: string) => {
    const icons: { [key: string]: string } = {
      '剣士': '⚔️',
      '魔法使い': '🔮',
      '弓使い': '🏹',
      '騎士': '🛡️'
    }
    return icons[profession] || '⚔️'
  }

  const getProfessionBonus = (profession: string) => {
    const bonuses: { [key: string]: { attack: number; defense: number } } = {
      '剣士': { attack: 5, defense: 2 },
      '魔法使い': { attack: 8, defense: 0 },
      '弓使い': { attack: 4, defense: 1 },
      '騎士': { attack: 2, defense: 5 }
    }
    return bonuses[profession] || { attack: 0, defense: 0 }
  }

  const confirmWarriorCustomize = () => {
    const bonus = getProfessionBonus(selectedProfession)
    setWarrior(prev => ({
      ...prev,
      name: warriorName,
      profession: selectedProfession,
      attack: 10 + bonus.attack,
      defense: 5 + bonus.defense
    }))
    setShowCustomize(false)
  }

  const buyEquipment = (equipment: Equipment) => {
    if (warrior.gold >= equipment.price) {
      setWarrior(prev => ({
        ...prev,
        gold: prev.gold - equipment.price,
        attack: prev.attack + equipment.attack,
        defense: prev.defense + equipment.defense
      }))
      setPurchasedEquipment(prev => [...prev, equipment.id])
      setEquippedEquipment(equipment)
      setMessage(`✅ 购买成功！获得 ${equipment.name}`)
    } else {
      setMessage(`❌ 金币不足！需要 ${equipment.price}，当前 ${warrior.gold}`)
    }
  }

  const equipItem = (equipment: Equipment) => {
    if (purchasedEquipment.includes(equipment.id)) {
      setEquippedEquipment(equipment)
      setMessage(`✅ 装備 ${equipment.name}`)
    }
  }

  const applyTreasure = () => {
    const { type, amount } = treasureReward
    
    if (type.includes('金币')) {
      setWarrior(prev => ({ ...prev, gold: prev.gold + amount }))
    } else if (type.includes('攻撃')) {
      setWarrior(prev => ({ ...prev, attack: prev.attack + amount }))
    } else if (type.includes('防御')) {
      setWarrior(prev => ({ ...prev, defense: prev.defense + amount }))
    } else if (type.includes('体力')) {
      setWarrior(prev => ({ ...prev, hp: Math.min(prev.hp + amount, prev.maxHp), maxHp: prev.maxHp + amount }))
    } else if (type.includes('経験')) {
      setWarrior(prev => ({ ...prev, exp: prev.exp + amount }))
    }
    
    setShowTreasure(false)
    unlockAchievement('lucky')
  }

  const useSpecialSkill = () => {
    if (!inBattle || !currentEnemy || specialCharge < SPECIAL_MAX_CHARGE) return

    const specialDamage = Math.max(30, warrior.attack * 3)
    setMessage(`🔥 必杀技发动！对 ${currentEnemy.name} 造成 ${specialDamage} 点伤害`)
    showDamageNumber(specialDamage, false)
    triggerShake(false)
    setSpecialCharge(0)

    setEnemyHp(prev => {
      const newEnemyHp = Math.max(0, prev - specialDamage)
      if (newEnemyHp <= 0) {
        setMessage('击败敌人！必杀技压制胜利！')
        unlockAchievement('first_battle')
        setTimeout(() => {
          setInBattle(false)
          setCurrentEnemy(null)
          setCurrentQuestion(null)
        }, 1500)
      }
      return newEnemyHp
    })
  }

  const selectDifficulty = (diff: Difficulty) => {
    setDifficulty(diff)
    setShowDifficultySelect(false)
  }

  const resetGame = () => {
    setWarrior({
      level: 1,
      exp: 0,
      expNeeded: 100,
      hp: 100,
      maxHp: 100,
      attack: 10,
      defense: 5,
      gold: 0,
      equipment: 'Wooden Sword',
      skills: [],
      achievements: [],
      name: warriorName,
      profession: selectedProfession
    })
    setQuestionsAnswered(0)
    setGameOver(false)
    setInBattle(false)
    setCurrentEnemy(null)
    setCurrentQuestion(null)
    setMessage('')
    setShowDifficultySelect(true)
    setShowShop(false)
    setPurchasedEquipment([])
    setEquippedEquipment(null)
    setSpecialCharge(0)
  }

  const handleNextQuestion = () => {
    setCurrentQuestion(null)
    setSelectedAnswer(null)
    setShowResult(false)
    setPhraseOrder([])
    setSelectedPhraseIndex(null)
  }

  const questionModuleTitle = learningMode === 'cn' ? '中文学习' : learningMode === 'jp' ? '日语学习' : learningMode === 'en' ? 'English Learning' : '中日双语学习'
  const questionTypeLabel = currentQuestion
    ? currentQuestion.type === 'phrase_order'
      ? '（排序题）'
      : '（选择题）'
    : ''
  const questionInstruction = currentQuestion
    ? currentQuestion.type === 'phrase_order'
      ? '请把词语按正确顺序排列。'
      : '请选择正确的日语选项。'
    : ''
  const phraseOrderHint = '点击两个词语交换位置。'

  const questionSubtext = currentQuestion && currentQuestion.type === 'multiple'
    ? learningMode === 'both'
      ? `日语: ${(currentQuestion as MultipleChoiceQuestion).japanese} | 含义: ${(currentQuestion as MultipleChoiceQuestion).meaning.zh}`
      : learningMode === 'jp'
      ? `ローマ字: ${(currentQuestion as MultipleChoiceQuestion).romanji}`
      : learningMode === 'cn'
      ? `含义: ${(currentQuestion as MultipleChoiceQuestion).meaning.zh}`
      : learningMode === 'en'
      ? `Romanization: ${(currentQuestion as MultipleChoiceQuestion).romanji} | Meaning: ${(currentQuestion as MultipleChoiceQuestion).meaning.en}`
      : ''
    : currentQuestion && currentQuestion.type === 'phrase_order'
    ? learningMode === 'both'
      ? `含义: ${(currentQuestion as PhraseOrderQuestion).meaning.zh}`
      : learningMode === 'cn'
      ? `含义: ${(currentQuestion as PhraseOrderQuestion).meaning.zh}`
      : learningMode === 'jp'
      ? `Meaning: ${(currentQuestion as PhraseOrderQuestion).meaning.en}`
      : learningMode === 'en'
      ? `Meaning: ${(currentQuestion as PhraseOrderQuestion).meaning.en}`
      : ''
    : ''

  return (
    <div className="app">
      <div className="page-shell">
        <header className="page-header">
          <div>
            <div className="page-eyebrow">日语学习 RPG</div>
            <h1>以勇者之姿强化日语</h1>
            <p className="page-description">以游戏化方式学习词汇与语法，边冒险边培养勇者。每日学习可强化属性并提升等级，探索世界的页面式仪表盘。</p>
          </div>
          <div className="page-actions">
            <button className="btn-secondary" onClick={() => setShowCustomize(true)}>
              🎨 编辑勇者
            </button>
          </div>
        </header>

        <div className="game-container">
          {/* 左侧勇士信息面板 - 始终显示 */}
          <div className="warrior-panel">
          <div className="panel-header">
            <h1>⚔️ 日语勇者培养 ⚔️</h1>
          </div>

          <div className="warrior-name-section">
            <span className="warrior-icon-large">{getProfessionIcon(warrior.profession)}</span>
            <span className="warrior-name-display">{warrior.name} ({warrior.profession})</span>
          </div>

          <div className="warrior-stats">
            <div className="stat-row">
              <div className="stat-item">
                <span className="stat-label">等级</span>
                <span className="stat-value">{warrior.level}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">金币</span>
                <span className="stat-value">{warrior.gold}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">難易度</span>
                <span className="stat-value">{difficulty === 'easy' ? 'N5' : difficulty === 'normal' ? 'N2' : 'N1'}</span>
              </div>
            </div>

            {/* 经验条 */}
            <div className="progress-section">
              <label>経験</label>
              <div className="progress-bar">
                <div
                  className="progress-fill exp"
                  style={{ width: `${(warrior.exp / warrior.expNeeded) * 100}%` }}
                />
              </div>
              <span className="progress-text">
                {warrior.exp} / {warrior.expNeeded}
              </span>
            </div>

            {/* 血量条 */}
            <div className="progress-section">
              <label>体力</label>
              <div className="progress-bar">
                <div
                  className="progress-fill hp"
                  style={{ width: `${(warrior.hp / warrior.maxHp) * 100}%` }}
                />
              </div>
              <span className="progress-text">
                {warrior.hp} / {warrior.maxHp}
              </span>
            </div>

            {/* 属性 */}
            <div className="attributes">
              <div className="attr">
                <span>⚡ 攻击力:</span>
                <span>{warrior.attack}</span>
              </div>
              <div className="attr">
                <span>🛡️ 防御力:</span>
                <span>{warrior.defense}</span>
              </div>
            </div>

            {/* 成就显示 */}
            <div className="achievements-display">
              <span className="achievement-title">🏆 実績: {warrior.achievements.length}/{ACHIEVEMENTS.length}</span>
              <div className="achievement-badges">
                {ACHIEVEMENTS.map(ach => (
                  <div
                    key={ach.id}
                    className={`badge ${warrior.achievements.includes(ach.id) ? 'unlocked' : 'locked'}`}
                    title={ach.description}
                  >
                    {ach.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="special-skill-panel">
              <div className="special-skill-header">🔥 必杀技能量</div>
              <div className="special-skill-bar">
                <div
                  className={`special-skill-fill ${specialCharge === SPECIAL_MAX_CHARGE ? 'ready' : ''}`}
                  style={{ width: `${(specialCharge / SPECIAL_MAX_CHARGE) * 100}%` }}
                />
              </div>
              <span className={`special-skill-status ${specialCharge === SPECIAL_MAX_CHARGE ? 'ready' : ''}`}>
                {specialCharge === SPECIAL_MAX_CHARGE ? '已就绪' : `充能 ${specialCharge}/${SPECIAL_MAX_CHARGE}`}
              </span>
            </div>
          </div>
        </div>

        <div className="learning-stats-card">
          <div className="stats-card-header">
            <span>学習スタッツ</span>
            <span className="stats-bonus">{dailyLoginBonus ? '获得登录奖励!' : '每日登录可获得奖励'}</span>
          </div>
          <div className="stats-row">
            <div>
              <div className="stats-label">正答率</div>
              <div className="stats-value">{warrior.totalAnswers ? Math.round(((warrior.correctAnswers || 0) / warrior.totalAnswers) * 100) : 0}%</div>
            </div>
            <div>
              <div className="stats-label">解答数</div>
              <div className="stats-value">{warrior.totalAnswers || 0}</div>
            </div>
            <div>
              <div className="stats-label">連勝</div>
              <div className="stats-value">{currentStreak}</div>
            </div>
            <div>
              <div className="stats-label">ベスト</div>
              <div className="stats-value">{bestStreak}</div>
            </div>
          </div>
        </div>

        <div className="daily-mission-card">
          <div className="mission-card-header">
            <span>🎯 今日の挑戦</span>
            <span>{dailyMissionClaimed ? '完了済み' : `${dailyMissionProgress}/${dailyMissionGoal}`}</span>
          </div>
          <p className="mission-description">答对5次可获得每日任务奖励。可通过战斗和学习累积进度。</p>
          <div className="mission-progress">
            <div className="mission-progress-bar">
              <div
                className="mission-progress-fill"
                style={{ width: `${(dailyMissionProgress / dailyMissionGoal) * 100}%` }}
              />
            </div>
          </div>
          <button
            className="btn-claim"
            onClick={claimDailyMissionReward}
            disabled={dailyMissionProgress < dailyMissionGoal || dailyMissionClaimed}
          >
            {dailyMissionClaimed ? '報酬を取得済み' : '報酬を獲得'}
          </button>
        </div>

        {/* 商店按钮 */}
        {!showDifficultySelect && (
          <div className="shop-button-container">
            <button onClick={() => setShowShop(true)} className="btn-shop">
              🛍️ 打开商店
            </button>
            <button onClick={() => setShowMap(!showMap)} className="btn-shop btn-map">
              🗺️ 世界地图
            </button>
          </div>
        )}

        {/* 战斗场景 */}
        {inBattle && currentEnemy && (
          <>
            {/* 战斗信息条 */}
            <div className="battle-info-bar">
              <div className="battle-status">
                <span className="warrior-status">⚔️ {warrior.name} ({warrior.profession}) Lv.{warrior.level}</span>
                <span className="vs-separator">vs</span>
                <span className="enemy-status">👹 {currentEnemy.name}</span>
              </div>
              {message && <div className="battle-message" style={{animation: 'fadeIn 0.3s ease'}}>{message}</div>}
            </div>

            <div className="battle-scene">
              <div className={`warrior-display ${warriorShake ? 'shake' : ''}`}>
                <img 
                  src="assets/Characters/Default/character_beige_idle.png" 
                  alt="勇士" 
                  className={`warrior-image ${isAttacking && !warriorShake ? 'attack-pulse' : ''}`}
                />
                <p className="character-name">{warrior.name} Lv.{warrior.level}</p>
                <div className="character-hp">
                  <div className="hp-bar">
                    <div className="hp-fill hp-transition" style={{ width: `${(warrior.hp / warrior.maxHp) * 100}%` }}></div>
                  </div>
                  <span className="hp-text">{warrior.hp}/{warrior.maxHp}</span>
                </div>
                <div className="character-stats">
                  <span title="攻击力">⚡ {warrior.attack}</span>
                  <span title="防御力">🛡️ {warrior.defense}</span>
                </div>
                {damageNumbers.map(dmg => 
                  !dmg.isWarrior ? null : (
                    <div key={dmg.id} className="damage-number">
                      -{dmg.damage}
                    </div>
                  )
                )}
              </div>

              <div className="vs-text">⚔️ VS ⚔️</div>

              <div className={`enemy-display ${enemyShake ? 'shake' : ''}`}>
                <img 
                  src={currentEnemy.image}
                  alt={currentEnemy.name}
                  className={`enemy-image ${isAttacking ? 'take-damage' : ''}`}
                />
                <p className="character-name">{currentEnemy.name}</p>
                <div className="character-hp">
                  <div className="hp-bar enemy-bar">
                    <div className="hp-fill enemy-fill hp-transition" style={{ width: `${(enemyHp / currentEnemy.maxHp) * 100}%` }}></div>
                  </div>
                  <span className="hp-text">{enemyHp}/{currentEnemy.maxHp}</span>
                </div>
                <div className="character-stats">
                  <span title="攻击力">⚡ {currentEnemy.attack}</span>
                  <span title="防御力">🛡️ {currentEnemy.defense}</span>
                </div>
                {damageNumbers.map(dmg => 
                  dmg.isWarrior ? null : (
                    <div key={dmg.id} className="damage-number">
                      -{dmg.damage}
                    </div>
                  )
                )}
              </div>
            </div>

            {specialCharge === SPECIAL_MAX_CHARGE && (
              <div className="special-skill-action">
                <button onClick={useSpecialSkill} className="btn-special">
                  🔥 释放必杀技
                </button>
                <div className="special-skill-note">充能完成后可瞬发强力一击</div>
              </div>
            )}
          </>
        )}

        {/* 右侧游戏内容区域 */}
        <div className="game-area">
          {showCustomize && (
            <div className="customize-overlay">
              <div className="customize-container">
                <div className="customize-header">
                  <h2>⚔️ 勇者を作成 ⚔️</h2>
                  <button
                    className="btn-close"
                    onClick={() => setShowCustomize(false)}
                    aria-label="Close customization"
                  >
                    ✕
                  </button>
                </div>

                <div className="customize-body">
                  <div className="customize-fields">
                    <div className="form-group">
                      <label>勇者の名前：</label>
                      <input 
                        type="text" 
                        value={warriorName} 
                        onChange={(e) => setWarriorName(e.target.value)}
                        placeholder="勇者の名前を入力"
                        className="input-name"
                      />
                    </div>

                    <div className="form-group">
                      <label>職業を選択：</label>
                      <div className="profession-select">
                        {['剣士', '魔法使い', '弓使い', '騎士'].map(prof => {
                          const bonus = getProfessionBonus(prof)
                          return (
                            <div 
                              key={prof} 
                              onClick={() => setSelectedProfession(prof)}
                              className={`profession-card ${selectedProfession === prof ? 'selected' : ''}`}
                            >
                              <div className="profession-icon">{getProfessionIcon(prof)}</div>
                              <div className="profession-name">{prof}</div>
                              <div className="profession-bonus">
                                <span>⚡ +{bonus.attack}</span>
                                <span>🛡️ +{bonus.defense}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="customize-preview">
                    <h3>プレビュー：</h3>
                    <div className="preview-card">
                      <div className="preview-stat">
                        <div className="preview-stat-label">職業</div>
                        <div className="preview-stat-row">
                          <span className="profession-icon">{getProfessionIcon(selectedProfession)}</span>
                          <span className="profession-name">{selectedProfession}</span>
                        </div>
                      </div>
                      <div className="preview-stat">
                        <div className="preview-stat-label">名前</div>
                        <div className="preview-stat-value preview-name">{warriorName || '无名战士'}</div>
                      </div>
                      <div className="preview-stat">
                        <div className="preview-stat-label">攻击力</div>
                        <div className="preview-stat-value">⚡ {10 + getProfessionBonus(selectedProfession).attack}</div>
                      </div>
                      <div className="preview-stat">
                        <div className="preview-stat-label">防御力</div>
                        <div className="preview-stat-value">🛡️ {5 + getProfessionBonus(selectedProfession).defense}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="customize-actions">
                  <button onClick={confirmWarriorCustomize} className="btn-confirm">
                    ✓ 作成
                  </button>
                  <button onClick={() => setShowCustomize(false)} className="btn-cancel">
                    ✕ 戻る
                  </button>
                </div>
              </div>
            </div>
          )}

          {showDifficultySelect && !gameOver ? (
            <div className="difficulty-select">
              {!showCustomize && (
                <>
                  <div className="difficulty-select-header">
                    <h1>⚔️ 難易度を選択 ⚔️</h1>
                    <button onClick={() => setShowCustomize(true)} className="btn-edit-warrior">
                      🎨 カスタマイズ
                    </button>
                  </div>

                  <div className="difficulty-select-content">
                    <div className="warrior-display-section">
                      <div className="warrior-large-display">
                        <img 
                          src="assets/Characters/Default/character_beige_front.png" 
                          alt={warrior.name}
                          className="warrior-large-image"
                        />
                        <div className="warrior-display-info">
                          <div className="warrior-display-name">{warrior.name}</div>
                          <div className="warrior-display-prof">【{warrior.profession}】</div>
                        </div>
                      </div>
                    </div>

                    <div className="difficulty-select-section">
                      <div className="warrior-info-card">
                        <div className="warrior-icon">{getProfessionIcon(warrior.profession)}</div>
                        <div className="warrior-details">
                          <div className="warrior-name">{warrior.name}</div>
                          <div className="warrior-prof">{warrior.profession}</div>
                          <div className="warrior-stats-preview">
                            <span>⚡ {warrior.attack}</span>
                            <span>🛡️ {warrior.defense}</span>
                          </div>
                        </div>
                      </div>

                      <div className="difficulty-buttons">
                        <button onClick={() => selectDifficulty('easy')} className="difficulty-btn easy">
                          <div className="difficulty-title">🌱 N5 入门</div>
                          <div className="difficulty-desc">基础词汇与简单句式</div>
                        </button>
                        <button onClick={() => selectDifficulty('normal')} className="difficulty-btn normal">
                          <div className="difficulty-title">⚡ N2 进阶</div>
                          <div className="difficulty-desc">实用词汇与常见表达</div>
                        </button>
                        <button onClick={() => selectDifficulty('hard')} className="difficulty-btn hard">
                          <div className="difficulty-title">👹 N1 高级</div>
                          <div className="difficulty-desc">高级词汇与复杂结构</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="game-content">
              {showMap && (
                <div className="world-map-overlay">
                  <div className="world-map-container">
                    <div className="map-header">
                      <h2>🗺️ 世界地图</h2>
                      <button onClick={() => setShowMap(false)} className="close-btn">✕</button>
                    </div>
                    
                    <div className="map-canvas">
                      {WORLD_LOCATIONS.map(location => (
                        <div
                          key={location.id}
                          className={`map-location ${warrior.level >= location.levelRequired ? 'available' : 'locked'} ${currentLocation?.id === location.id ? 'current' : ''}`}
                          style={{ left: `${location.x}px`, top: `${location.y}px` }}
                          onClick={() => visitLocation(location)}
                          title={`${location.name} (需要等级${location.levelRequired})`}
                        >
                          <div className="location-icon">{location.icon}</div>
                          <div className="location-name">{location.name}</div>
                          {warrior.level < location.levelRequired && <div className="lock-icon">🔒</div>}
                        </div>
                      ))}
                    </div>

                    <div className="map-info">
                      {currentLocation && (
                        <div className="location-details">
                          <h3>{currentLocation.name}</h3>
                          <p>{currentLocation.description}</p>
                          <div className="location-npcs">
                            <h4>🧑‍🤝‍🧑 NPC：</h4>
                            {currentLocation.npcs.map(npc => (
                              <button key={npc.id} onClick={() => talkToNPC(npc)} className="btn-npc">
                                {npc.name} - {npc.description}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {showLocationDialog && currentLocation && !selectedNPC && (
                <div className="location-dialog">
                  <div className="dialog-content">
                    <h2>{currentLocation.name}</h2>
                    <p>{currentLocation.description}</p>
                    <div className="npc-list">
                      {currentLocation.npcs.map(npc => (
                        <button key={npc.id} onClick={() => talkToNPC(npc)} className="btn-npc-large">
                          <div className="npc-icon">{currentLocation.icon}</div>
                          <div className="npc-info">
                            <div className="npc-name">{npc.name}</div>
                            <div className="npc-desc">{npc.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setShowLocationDialog(false)} className="btn-cancel">
                      戻る
                    </button>
                  </div>
                </div>
              )}

              {selectedNPC && currentLocation && (
                <div className="npc-dialog wow-style">
                  <div className="dialog-box wow-frame">
                    <div className="dialog-header wow-header">
                      <div className="npc-title-section">
                        <div className="npc-icon-large">{currentLocation.icon}</div>
                        <div className="npc-title-info">
                          <h3 className="npc-title">{selectedNPC.name}</h3>
                          <div className="npc-level">等级 ??? - {selectedNPC.description}</div>
                        </div>
                      </div>
                      <button onClick={() => setSelectedNPC(null)} className="close-btn wow-close">✕</button>
                    </div>
                    <div className="dialog-divider"></div>
                    <div className="dialog-body wow-body">
                      <div className="npc-speech-bubble">
                        <div className="speech-text">{selectedNPC.dialog}</div>
                      </div>
                      
                      {selectedNPC.quest && (
                        <div className="quest-panel wow-quest">
                          <div className="quest-title-bar">
                            <span className="quest-icon">📜</span>
                            <span className="quest-title">{selectedNPC.quest.name}</span>
                            <span className="quest-level">[{warrior.level}]</span>
                          </div>
                          
                          <div className="quest-content">
                            <div className="quest-description">
                              <p><strong>説明：</strong></p>
                              <p>{selectedNPC.quest.description}</p>
                            </div>
                            
                            <div className="quest-objectives">
                              <p><strong>目標：</strong></p>
                              <p className="objective-text">◆ {selectedNPC.quest.objective}</p>
                            </div>
                            
                            <div className="quest-rewards-panel">
                              <p><strong>報酬：</strong></p>
                              <div className="rewards-list">
                                <div className="reward-item">
                                  <span className="reward-icon">💰</span>
                                  <span className="reward-text">{selectedNPC.quest.reward.gold} 金币</span>
                                </div>
                                <div className="reward-item">
                                  <span className="reward-icon">⭐</span>
                                  <span className="reward-text">{selectedNPC.quest.reward.exp} 経験</span>
                                </div>
                                {selectedNPC.quest.reward.item && (
                                  <div className="reward-item">
                                    <span className="reward-icon">🎁</span>
                                    <span className="reward-text">{selectedNPC.quest.reward.item}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="quest-actions">
                            <button onClick={() => acceptQuest(selectedNPC.quest!)} className="btn-accept-quest wow-btn">
                              ⚔️ 受ける
                            </button>
                            <button onClick={() => setSelectedNPC(null)} className="btn-decline-quest wow-btn-secondary">
                              ✕ 拒否
                            </button>
                          </div>
                        </div>
                      )}

                      {!selectedNPC.quest && (
                        <div className="quest-panel wow-quest no-quest">
                          <p>このNPCには現在クエストがありません。</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {showShop && (
                <div className="shop-overlay">
                  <div className="shop-container">
                    <div className="shop-header">
                      <h2>🛍️ 装备商店 🛍️</h2>
                      <button onClick={() => setShowShop(false)} className="close-btn">✕</button>
                    </div>
                    
                    <div className="shop-balance">
                      <span className="balance-label">持有金币：</span>
                      <span className="balance-value">{warrior.gold}</span>
                    </div>

                    <div className="equipment-grid">
                      {SHOP_EQUIPMENT.map(equipment => (
                        <div key={equipment.id} className="equipment-card">
                          <div className="equipment-header">
                            <h3>{equipment.name}</h3>
                            <div className="equipment-price">
                              💰 {equipment.price}
                            </div>
                          </div>
                          
                          <p className="equipment-description">{equipment.description}</p>
                          
                          <div className="equipment-stats">
                            {equipment.attack > 0 && <span>⚡ +{equipment.attack} 攻撃</span>}
                            {equipment.defense > 0 && <span>🛡️ +{equipment.defense} 防御</span>}
                          </div>

                          <div className="equipment-actions">
                            {purchasedEquipment.includes(equipment.id) ? (
                              <>
                                <button 
                                  onClick={() => equipItem(equipment)}
                                  className={`btn-equip ${equippedEquipment?.id === equipment.id ? 'equipped' : ''}`}
                                >
                                  {equippedEquipment?.id === equipment.id ? '✓ 装備中' : '装備'}
                                </button>
                              </>
                            ) : (
                              <button 
                                onClick={() => buyEquipment(equipment)}
                                className={`btn-buy ${warrior.gold >= equipment.price ? '' : 'disabled'}`}
                                disabled={warrior.gold < equipment.price}
                              >
                                購入
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {gameOver ? (
                <div className="reward-screen">
                  <div className="reward-content">
                    <h2 className="game-over-title">⚔️ 战斗结束！⚔️</h2>
                    
                    <div className="reward-section">
                      <div className="reward-card">
                        <div className="reward-icon">⭐</div>
                        <div className="reward-info">
                          <div className="reward-label">最终等级</div>
                          <div className="reward-value">{warrior.level}</div>
                        </div>
                      </div>

                      <div className="reward-card">
                        <div className="reward-icon">💰</div>
                        <div className="reward-info">
                          <div className="reward-label">总金币</div>
                          <div className="reward-value">{warrior.gold}</div>
                        </div>
                      </div>

                      <div className="reward-card">
                        <div className="reward-icon">⚡</div>
                        <div className="reward-info">
                          <div className="reward-label">攻撃力</div>
                          <div className="reward-value">{warrior.attack}</div>
                        </div>
                      </div>

                      <div className="reward-card">
                        <div className="reward-icon">🛡️</div>
                        <div className="reward-info">
                          <div className="reward-label">防御力</div>
                          <div className="reward-value">{warrior.defense}</div>
                        </div>
                      </div>
                    </div>

                    <div className="stats-summary">
                      <h3>🎯 游戏统计</h3>
                      <div className="stat-detail">
                        <span className="stat-name">回答済み:</span>
                        <span className="stat-count">{questionsAnswered} / 10</span>
                      </div>
                      <div className="stat-detail">
                        <span className="stat-name">装備中:</span>
                        <span className="stat-count">{warrior.equipment}</span>
                      </div>
                      <div className="stat-detail">
                        <span className="stat-name">最終体力:</span>
                        <span className="stat-count">{warrior.hp} / {warrior.maxHp}</span>
                      </div>
                      <div className="stat-detail">
                        <span className="stat-name">解放済み実績:</span>
                        <span className="stat-count">{warrior.achievements.length}</span>
                      </div>
                    </div>

                    <div className="game-over-tips">
                      <h4>📌 接下来可以做：</h4>
                      <div className="tips-list">
                        <div className="tip-item">
                          <span className="tip-icon">🗺️</span>
                          <span className="tip-text">探索世界地图并访问不同地区</span>
                        </div>
                        <div className="tip-item">
                          <span className="tip-icon">🛍️</span>
                          <span className="tip-text">购买新装备以提升能力</span>
                        </div>
                        <div className="tip-item">
                          <span className="tip-icon">⚔️</span>
                          <span className="tip-text">重来并接受新的挑战</span>
                        </div>
                        <div className="tip-item">
                          <span className="tip-icon">📜</span>
                          <span className="tip-text">完成 NPC 的任务以获得奖励</span>
                        </div>
                      </div>
                    </div>

                    <div className="game-over-buttons">
                      <button onClick={resetGame} className="btn-restart btn-restart-primary">
                        🔄 开始新游戏
                      </button>
                      <button onClick={() => { setGameOver(false); setShowMap(true); }} className="btn-explore-map">
                        🗺️ 返回地图
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {showTreasure && (
                    <div className="treasure-popup">
                      <div className="treasure-box">
                        <h3>🎁 宝箱奖励！</h3>
                        <div className="treasure-reward">{treasureReward.type} +{treasureReward.amount}</div>
                        <button onClick={applyTreasure} className="btn-treasure">
                          報酬を受け取る
                        </button>
                      </div>
                    </div>
                  )}

                  {!inBattle && !showTreasure && (
                    <button onClick={startBattle} className="btn-battle">
                      🗡️ 开始战斗
                    </button>
                  )}

                  {currentQuestion && (
                    <div className="question-container">
                          <div className="question-header">
                            <div>
                              <h3>{questionModuleTitle} {questionTypeLabel}</h3>
                              <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${((questionsAnswered + 1) / 10) * 100}%` }} />
                              </div>
                            </div>
                            <div className="question-controls">
                              <div className="mode-selector">
                                <button className={`mode-btn ${learningMode === 'cn' ? 'active' : ''}`} onClick={() => setLearningMode('cn')}>中文</button>
                                <button className={`mode-btn ${learningMode === 'both' ? 'active' : ''}`} onClick={() => setLearningMode('both')}>双语</button>
                                <button className={`mode-btn ${learningMode === 'en' ? 'active' : ''}`} onClick={() => setLearningMode('en')}>English</button>
                                <button className={`mode-btn ${learningMode === 'jp' ? 'active' : ''}`} onClick={() => setLearningMode('jp')}>纯日语</button>
                              </div>
                              <span className="question-count">{questionsAnswered + 1} / 10</span>
                            </div>
                          </div>

                      <div className="question-content">
                        {currentQuestion.type === 'multiple' ? (
                          <>
                            {questionSubtext && <div className="question-subtext">{questionSubtext}</div>}
                            <div className="question-instruction">{questionInstruction}</div>
                          </>
                        ) : (
                          <>
                            {learningMode === 'both' && <div className="question-subtext">{(currentQuestion as PhraseOrderQuestion).phrase.join(' ')}</div>}
                            <div className="question-instruction">{questionInstruction}</div>
                          </>
                        )}
                      </div>

                      {currentQuestion.type === 'multiple' ? (
                        <div className="options">
                          {(displayOptions.length > 0 ? displayOptions : (currentQuestion as MultipleChoiceQuestion).options).map((option, index) => (
                            <button
                              key={index}
                              className={`option-btn ${
                                selectedAnswer === index
                                  ? isCorrect
                                    ? 'correct'
                                    : 'incorrect'
                                  : ''
                              } ${
                                showResult && index === (currentCorrectIndex ?? -1)
                                  ? 'correct'
                                  : ''
                              } ${showResult ? 'disabled' : ''}`}
                              onClick={() => handleAnswer(index)}
                              disabled={showResult}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="phrase-order-container">
                          <div className="phrase-words">
                            {phraseOrder.map((idx, pos) => (
                              <button
                                key={pos}
                                className={`phrase-word ${selectedPhraseIndex === pos ? 'selected' : ''}`}
                                onClick={() => handlePhraseWordClick(pos)}
                                disabled={showResult}
                              >
                                {(currentQuestion as PhraseOrderQuestion).phrase[idx]}
                              </button>
                            ))}
                          </div>
                          <div className="phrase-instruction">{phraseOrderHint}</div>
                          <div className="phrase-buttons">
                            <button
                              onClick={checkPhraseOrder}
                              disabled={showResult}
                              className="btn-phrase-correct"
                            >
                              ✓ チェック
                            </button>
                            <button
                              onClick={resetPhraseOrder}
                              disabled={showResult}
                              className="btn-phrase-incorrect"
                            >
                              ↻ もう一度
                            </button>
                          </div>
                        </div>
                      )}

                      {showResult && (
                        <>
                          <div className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
                            {message}
                          </div>
                          <button onClick={handleNextQuestion} className="btn-next btn-continue">
                            ⬇️ 次へ
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}

export default App
