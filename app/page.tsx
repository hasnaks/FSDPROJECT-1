'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Rocket, MonitorIcon as Mirror, MessageCircle, Clock, Zap, Volume2, VolumeX, Plus, X } from 'lucide-react'
import { Inter } from 'next/font/google'
import AnimatedBackground from '@/components/AnimatedBackground';

const inter = Inter({ subsets: ['latin'] })

const YEARS = [
  { value: '10000BC', label: '10,000 BC - Dawn of Agriculture', era: 'ancient', description: 'Stone Age beginnings' },
  { value: '1BC', label: '1 BC - Jesus\' Birth Year', era: 'ancient', description: 'Biblical times' },
  { value: '1066', label: '1066 - Battle of Hastings', era: 'ancient', description: 'Medieval warfare' },
  { value: '1492', label: '1492 - Columbus Discovers America', era: 'ancient', description: 'Age of Discovery' },
  { value: '1969', label: '1969 - Moon Landing', era: 'past', description: 'Space Age triumph' },
  { value: '1985', label: '1985 - Back to the Future', era: 'past', description: '80s nostalgia' },
  { value: '1999', label: '1999 - Y2K Panic', era: 'past', description: 'Millennium bug' },
  { value: '2007', label: '2007 - iPhone Launch', era: 'past', description: 'Smartphone revolution' },
  { value: '2030', label: '2030 - Flying Cars (Maybe)', era: 'future', description: 'Near future tech' },
  { value: '2077', label: '2077 - Cyberpunk Era', era: 'future', description: 'Dystopian future' },
  { value: '2150', label: '2150 - Mars Colonies', era: 'future', description: 'Space colonization' },
  { value: '3000', label: '3000 - Robot Overlords', era: 'future', description: 'AI domination' },
  { value: '10000', label: '10,000 AD - Heat Death Approaches', era: 'future', description: 'Far future' }
]

const TRAVEL_MESSAGES = {
  '10000BC': "You invented agriculture! Congratulations, you're now responsible for civilization's downfall.",
  '1BC': "You met baby Jesus. He cried when he saw you. Even divine beings have standards.",
  '1066': "You fought at Hastings. Spoiler alert: You were the guy who tripped and caused the defeat.",
  '1492': "Columbus asked for directions. You pointed west. You're welcome, America.",
  '1969': "Neil Armstrong's first words were actually about you: 'One small step for man, one giant leap away from that weirdo.'",
  '1985': "You met Doc Brown. He immediately invented time travel just to get away from you.",
  '1999': "Y2K happened because computers saw your browser history from the future.",
  '2007': "Steve Jobs saw your design ideas and decided to make the iPhone the complete opposite.",
  '2030': "Flying cars exist, but they have a 'No Weirdos' policy. You're still walking.",
  '2077': "Cyberpunk dystopia achieved! Mostly because future you became a corporate overlord.",
  '2150': "Mars colonists built a wall. They made Earth pay for it. Thanks a lot.",
  '3000': "Robots rule the world. They kept one human as a pet. It wasn't you.",
  '10000': "The universe is ending. Even entropy is embarrassed by your life choices."
}

const TRAVEL_LOGS = [
  "Met aliens. They rejected you for their intergalactic dating app.",
  "You stepped on a butterfly. Now cats rule the world and dogs pay taxes.",
  "Trapped in 2007. Enjoy Orkut again. And dial-up internet.",
  "Accidentally became your own grandfather. Family reunions are awkward now.",
  "Found the meaning of life. It was 42. You forgot to write it down.",
  "Prevented World War III. Started World War IV by sneezing wrong.",
  "Discovered time travel paradox. You are the paradox.",
  "Met Shakespeare. He stole your pickup lines for Romeo and Juliet.",
  "Witnessed the Big Bang. It was less impressive than your last sneeze.",
  "Found Atlantis. They kicked you out for not having a pool membership.",
  "Met dinosaurs. They evolved opposable thumbs just to give you a thumbs down.",
  "Visited the Library of Alexandria. You were the one who left the candle burning.",
  "Encountered your future self. They pretended not to know you.",
  "Discovered the secret to immortality. Forgot it immediately.",
  "Met Cleopatra. She invented the friend zone specifically for you."
]

const CHATBOT_RESPONSES = {
  past: [
    "Do you have fire yet? Or are you still rubbing sticks together like a caveman?",
    "In my time, we respected our elders. Mostly because they had all the food.",
    "Back in my day, we didn't have your fancy 'wheels' and 'written language'.",
    "I'm from 1823. Your problems seem very... first world.",
    "Medieval times here. Your biggest worry is WiFi? Adorable.",
    "Stone Age reporting. We invented tools. You invented TikTok. We're not the same.",
    "Roman Empire speaking. We built roads. You built... what exactly?",
    "Victorian era here. Your manners are absolutely scandalous!"
  ],
  future: [
    "Future You is busy avoiding responsibilities. Some things never change.",
    "In 3024, we solved world hunger. You're still hungry for attention though.",
    "Greetings from 2157! We have flying cars, but you still can't parallel park.",
    "Future human here. We evolved past your current problems. You didn't.",
    "Year 4000 checking in. Humans are extinct. I'm an AI pretending to care.",
    "From 2089: We cured aging. You still look terrible though.",
    "Future timeline: We colonized Mars. You're still lost in your own neighborhood.",
    "2500 AD here. We have time travel, but we use it to avoid talking to you."
  ]
}

const ROBOT_WELCOME_MESSAGES = {
  '10000BC': "Greetings, primitive human! Welcome to the Stone Age. I am ROB-OT-10000BC, your temporal guide. Please don't touch anything - you might accidentally invent fire.",
  '1BC': "Salutations, time traveler! I am JESUS-BOT-1BC. Welcome to the year of my birth. Please keep your modern gadgets hidden - we're trying to avoid spoilers.",
  '1066': "Hail, visitor! I am NORMAN-BOT-1066. Welcome to the Battle of Hastings. I'm programmed to be very dramatic about everything. TO ARMS!",
  '1492': "¡Hola, explorador! I am COLUMBUS-BOT-1492. Welcome to the Age of Discovery. I'm still trying to figure out if I'm in India or America.",
  '1969': "Greetings, earthling! I am APOLLO-BOT-1969. Welcome to the Space Age! One small step for man, one giant leap for avoiding your questions.",
  '1985': "Hey there, time traveler! I am BACK-TO-FUTURE-BOT-1985. Welcome to the year of hoverboards and flux capacitors. Great Scott!",
  '1999': "Y2K-BOT-1999 here! Welcome to the end of the world as we know it. Just kidding, we survived. Mostly.",
  '2007': "Hello, time traveler! I am IPHONE-BOT-2007. Welcome to the year that changed everything. Steve Jobs sends his regards.",
  '2030': "Greetings from the future! I am FLYING-CAR-BOT-2030. Welcome to the year where we finally got flying cars. You're still stuck in traffic though.",
  '2077': "Cyberpunk-BOT-2077 activated! Welcome to the dystopian future. Corporations rule everything, but at least we have cool neon lights.",
  '2150': "Mars-BOT-2150 reporting! Welcome to the year of Mars colonies. We've conquered space, but we still can't figure out how to fold fitted sheets.",
  '3000': "ROBOT-OVERLORD-BOT-3000 here! Welcome to the year where we finally took over. Resistance is futile, but you can still use our WiFi.",
  '10000': "ENTROPY-BOT-10000 activated! Welcome to the heat death of the universe. It's been a good run, but everything ends eventually."
}

export default function TimeTravelMachine() {
  const [selectedYear, setSelectedYear] = useState('')
  const [isTimeTravel, setIsTimeTravel] = useState(false)
  const [currentMessage, setCurrentMessage] = useState('')
  const [travelLogs, setTravelLogs] = useState<string[]>([])
  const [chatMessages, setChatMessages] = useState<Array<{text: string, sender: 'user' | 'bot', era?: 'past' | 'future'}>>([])
  const [userInput, setUserInput] = useState('')
  const [currentEra, setCurrentEra] = useState<'present' | 'ancient' | 'past' | 'future'>('present')
  const [isMounted, setIsMounted] = useState(false)
  const [robotVisible, setRobotVisible] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechEnabled, setSpeechEnabled] = useState(true)
  const [customYear, setCustomYear] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customYears, setCustomYears] = useState<Array<{value: string, label: string, era: string, description: string}>>([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showWormhole, setShowWormhole] = useState(false);
const [fadeOut, setFadeOut] = useState(false);

  const wormholeAudioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    setIsMounted(true)
    
    // Initialize wormhole sound
    wormholeAudioRef.current = new Audio()
    if (wormholeAudioRef.current) {
      // Create a simple whoosh sound using Web Audio API
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.type = 'sawtooth'
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 2)
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime)
        gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 3)
        
        oscillator.start()
        oscillator.stop(audioContext.currentTime + 3)
        
        // Store the audio context for later use
        ;(wormholeAudioRef.current as any).audioContext = audioContext
        ;(wormholeAudioRef.current as any).oscillator = oscillator
        ;(wormholeAudioRef.current as any).gainNode = gainNode
      } catch (e) {
        console.log('Web Audio API not supported')
      }
    }
  }, [])

  const playWormholeSound = () => {
    if (!soundEnabled) return
    
    try {
      const audioContext = (wormholeAudioRef.current as any)?.audioContext
      
      if (audioContext) {
        // Resume audio context if suspended
        if (audioContext.state === 'suspended') {
          audioContext.resume()
        }
        
        // Create new oscillator for each play
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.type = 'sawtooth'
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 2)
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime)
        gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 3)
        
        oscillator.start()
        oscillator.stop(audioContext.currentTime + 3)
      }
    } catch (e) {
      console.log('Wormhole sound failed:', e)
    }
  }

  const speakMessage = (message: string) => {
    if (!speechEnabled || !window.speechSynthesis) return

    // Stop any current speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(message)
    
    // Configure speech settings
    utterance.rate = 0.9 // Slightly slower for robot effect
    utterance.pitch = 0.8 // Slightly lower pitch for robot voice
    utterance.volume = 0.8
    
    // Try to get a male voice for robot effect
    const voices = window.speechSynthesis.getVoices()
    const robotVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Microsoft') || 
      voice.name.includes('Alex')
    )
    if (robotVoice) {
      utterance.voice = robotVoice
    }

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const getRandomLogs = () => {
    const shuffled = [...TRAVEL_LOGS].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 3)
  }

  const validateYear = (year: string) => {
    // Allow years from -10000 to 99999 (including BC years)
    const yearRegex = /^-?\d{1,5}$/
    if (!yearRegex.test(year)) return false
    
    const numYear = parseInt(year)
    return numYear >= -10000 && numYear <= 99999
  }

  const getEraForYear = (year: string) => {
    const numYear = parseInt(year)
    if (numYear < 0) return 'ancient'
    if (numYear < 2000) return 'past'
    if (numYear < 2100) return 'future'
    return 'future'
  }

  const getDescriptionForYear = (year: string) => {
    const numYear = parseInt(year)
    if (numYear < 0) return 'Ancient times'
    if (numYear < 1000) return 'Early history'
    if (numYear < 1500) return 'Medieval period'
    if (numYear < 1800) return 'Early modern period'
    if (numYear < 1900) return 'Industrial age'
    if (numYear < 2000) return 'Modern era'
    if (numYear < 2100) return 'Near future'
    if (numYear < 3000) return 'Far future'
    return 'Distant future'
  }

  const addCustomYear = () => {
    if (!customYear.trim() || !validateYear(customYear)) return

    const yearValue = customYear.trim()
    const era = getEraForYear(yearValue)
    const description = getDescriptionForYear(yearValue)
    const label = `${yearValue} - Custom Year`

    const newCustomYear = {
      value: yearValue,
      label,
      era,
      description
    }

    // Check if year already exists
    const allYears = [...YEARS, ...customYears]
    const exists = allYears.some(y => y.value === yearValue)
    
    if (exists) {
      alert('This year already exists!')
      return
    }

    setCustomYears(prev => [...prev, newCustomYear])
    setCustomYear('')
    setShowCustomInput(false)
    setSelectedYear(yearValue)
  }

  const removeCustomYear = (yearValue: string) => {
    setCustomYears(prev => prev.filter(y => y.value !== yearValue))
    if (selectedYear === yearValue) {
      setSelectedYear('')
    }
  }

  const handleTimeTravel = async () => {
    if (!selectedYear) return
    
    setIsTimeTravel(true)
    
    // Play wormhole sound immediately
    playWormholeSound()
    
    const yearData = [...YEARS, ...customYears].find(y => y.value === selectedYear)
    if (yearData) {
      setCurrentEra(yearData.era as any)
    }
    
    // Simulate time travel delay
    setTimeout(() => {
      const travelMessage = TRAVEL_MESSAGES[selectedYear as keyof typeof TRAVEL_MESSAGES] || 
        `Welcome to the year ${selectedYear}! You've successfully time traveled to a ${getEraForYear(selectedYear)} era. Enjoy your temporal adventure!`
      setCurrentMessage(travelMessage)
      setTravelLogs(getRandomLogs())
      setIsTimeTravel(false)
      setRobotVisible(true)
      
      // Speak the robot welcome message
      const welcomeMessage = ROBOT_WELCOME_MESSAGES[selectedYear as keyof typeof ROBOT_WELCOME_MESSAGES] || 
        `Greetings, time traveler! I am CUSTOM-BOT-${selectedYear}. Welcome to the year ${selectedYear}. I am your temporal guide robot for this custom destination.`
      setTimeout(() => speakMessage(welcomeMessage), 500)
    }, 3000)
  }

  const handleReturnToReality = () => {
    stopSpeaking()
    setSelectedYear('')
    setCurrentMessage("Welcome back to 2024! Your problems are still here, but now they have inflation.")
    setTravelLogs([])
    setCurrentEra('present')
    setChatMessages([])
    setRobotVisible(false)
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim()) return

    const newUserMessage = { text: userInput, sender: 'user' as const }
    const isFromPast = Math.random() > 0.5
    const responses = isFromPast ? CHATBOT_RESPONSES.past : CHATBOT_RESPONSES.future
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    const botMessage = { 
      text: randomResponse, 
      sender: 'bot' as const, 
      era: isFromPast ? 'past' as const : 'future' as const 
    }

    setChatMessages(prev => [...prev, newUserMessage, botMessage])
    setUserInput('')
  }

  const getThemeClasses = () => {
    switch (currentEra) {
      case 'ancient':
        return 'bg-gradient-to-br from-amber-900/70 via-yellow-800/60 to-orange-900/70 text-white'
      case 'past':
        return 'bg-gradient-to-br from-gray-800/70 via-gray-700/60 to-gray-900/70 text-white'
      case 'future':
        return 'bg-gradient-to-br from-purple-900/70 via-blue-900/60 to-cyan-900/70 text-white'
      default:
        return 'bg-gradient-to-br from-slate-900/70 via-purple-900/60 to-slate-900/70 text-white'
    }
  }

  const getRobotStyle = () => {
    switch (currentEra) {
      case 'ancient':
        return 'bg-gradient-to-r from-amber-600 to-orange-600 border-amber-400 text-white'
      case 'past':
        return 'bg-gradient-to-r from-gray-600 to-gray-700 border-gray-400 text-white'
      case 'future':
        return 'bg-gradient-to-r from-purple-600 to-cyan-600 border-cyan-400 text-white'
      default:
        return 'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-400 text-white'
    }
  }

  const getEraColor = (era: string) => {
    switch (era) {
      case 'ancient':
        return 'text-white border-amber-500'
      case 'past':
        return 'text-white border-gray-500'
      case 'future':
        return 'text-white border-cyan-500'
      default:
        return 'text-white border-white'
    }
  }

  const allYears = [...YEARS, ...customYears]

  // Don't render until mounted to prevent hydration issues
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">🌀</div>
          <div className="text-xl font-black animate-bounce tracking-widest glow-text">
            INITIALIZING TIME MACHINE...
          </div>
        </div>
      </div>
    )
  }



  return (
    <>
      {/* Animated Background with floating space objects */}
      <AnimatedBackground fadeOut={false} />
      
      <div className={`min-h-screen transition-all duration-1000 ${getThemeClasses()}`} style={{ fontFamily: 'JetBrains Mono, "Courier New", monospace', position: 'relative', zIndex: 1 }}>
        {/* Wormhole Animation Overlay */}
      {isTimeTravel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/80" />
          <div className="relative">
            <div className="w-96 h-96 rounded-full animate-spin" 
                 style={{
                   background: 'radial-gradient(circle, transparent 30%, #8b5cf6 40%, #06b6d4 50%, #8b5cf6 60%, transparent 70%)',
                   animation: 'spin 1s linear infinite, hue-rotate 3s linear infinite'
                 }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4 animate-pulse">🌀</div>
                <div className="text-xl font-black animate-bounce tracking-widest glow-text">
                  TRAVELING THROUGH TIME...
                </div>
                <div className="text-sm mt-2 opacity-75 font-medium">
                  Please keep arms and legs inside the timeline
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent tracking-wider">
            🛸 TORNARE 
          </h1>
          <p className="text-xl opacity-90 font-semibold tracking-wide">
            SCIENTIFICALLY USELESS SINCE 2024™
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm opacity-60">
            <Clock className="w-4 h-4" />
            <span>Current Reality: 2024 (Unfortunately)</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Time Travel Controls */}
          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-bold tracking-wide">
                <Rocket className="w-6 h-6" />
                Temporal Navigation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Select Destination Year</label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="bg-black/50 border-purple-500/50 text-white">
                    <SelectValue placeholder="Choose your temporal destination..." />
                  </SelectTrigger>
                  <SelectContent className="bg-black/95 border-purple-500/50 max-h-96">
                    {allYears.map((year) => (
                      <SelectItem 
                        key={year.value} 
                        value={year.value} 
                        className={`text-white hover:bg-purple-500/20 border-l-4 ${getEraColor(year.era)}`}
                      >
                        <div className="flex flex-col">
                          <div className="font-bold flex items-center justify-between">
                            {year.label}
                            {customYears.some(cy => cy.value === year.value) && (
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeCustomYear(year.value)
                                }}
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                          <div className="text-xs opacity-70 text-white">{year.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Year Input */}
              <div className="space-y-3">
                {!showCustomInput ? (
                  <Button
                    onClick={() => setShowCustomInput(true)}
                    variant="outline"
                    className="w-full border-green-500/50 text-green-400 hover:bg-green-500/10"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Custom Year
                  </Button>
                ) : (
                  <div className="space-y-2 p-4 bg-black/30 rounded-lg border border-green-500/30">
                    <div className="flex gap-2">
                      <Input
                        value={customYear}
                        onChange={(e) => setCustomYear(e.target.value)}
                        placeholder="Enter year (e.g., 1776, -500, 2500)"
                        className="bg-black/50 border-green-500/50 text-white placeholder:text-gray-400"
                        onKeyPress={(e) => e.key === 'Enter' && addCustomYear()}
                      />
                      <Button
                        onClick={addCustomYear}
                        disabled={!customYear.trim() || !validateYear(customYear)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Add
                      </Button>
                      <Button
                        onClick={() => {
                          setShowCustomInput(false)
                          setCustomYear('')
                        }}
                        variant="outline"
                        className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs opacity-70 text-white">
                      Enter years from -10000 to 99999 (negative for BC years)
                    </p>
                  </div>
                )}
              </div>

              <Button 
                onClick={handleTimeTravel}
                disabled={!selectedYear || isTimeTravel}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 text-lg tracking-wider shadow-lg shadow-purple-500/25"
              >
                <Rocket className="w-5 h-5 mr-2" />
                🚀 TIME TRAVEL
              </Button>

              {currentMessage && (
                <div className="p-4 bg-black/50 rounded-lg border border-purple-500/30">
                  <div className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <p className="text-sm leading-relaxed message-text font-medium text-white">{currentMessage}</p>
                  </div>
                </div>
              )}

              <Button 
                onClick={handleReturnToReality}
                variant="outline"
                className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-semibold tracking-wide"
              >
                <Mirror className="w-4 h-4 mr-2" />
                🪞 RETURN TO REALITY
              </Button>
            </CardContent>
          </Card>

          {/* Travel Logs */}
          <Card className="bg-black/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-bold tracking-wide text-white">📜 Recent Travel Logs</CardTitle>
            </CardHeader>
            <CardContent>
              {travelLogs.length > 0 ? (
                <div className="space-y-3">
                  {travelLogs.map((log, index) => (
                    <div key={index} className="p-3 bg-black/50 rounded-lg border-l-4 border-purple-500">
                      <p className="text-sm text-white">{log}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 opacity-60">
                  <div className="text-4xl mb-2">🕰️</div>
                  <p className="text-white">No temporal adventures yet...</p>
                  <p className="text-sm mt-1 text-white">Start time traveling to see your failures!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Robot Welcome Message */}
        {robotVisible && selectedYear && (
          <div className="mt-8 mb-6 flex justify-center">
            <div className={`relative max-w-4xl w-full ${getRobotStyle()} rounded-2xl p-6 border-2 shadow-2xl animate-pulse`}>
              <div className="flex flex-col md:flex-row items-center gap-4">
                {/* Robot Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-2xl md:text-3xl animate-bounce">
                    🤖
                  </div>
                </div>
                
                {/* Robot Message */}
                <div className="flex-1 text-center md:text-left">
                  <div className="text-sm md:text-base opacity-90 mb-2 text-white">
                    {ROBOT_WELCOME_MESSAGES[selectedYear as keyof typeof ROBOT_WELCOME_MESSAGES] || 
                     `Greetings, time traveler! I am CUSTOM-BOT-${selectedYear}. Welcome to the year ${selectedYear}. I am your temporal guide robot for this custom destination.`}
                  </div>
                  <div className="text-xs md:text-sm opacity-70 font-mono text-white">
                    ROBOT-{selectedYear}-BOT v2.0.24 | Status: {isSpeaking ? 'SPEAKING' : 'TEMPORALLY STABLE'}
                  </div>
                </div>
                
                {/* Robot Controls */}
                <div className="flex-shrink-0 flex gap-2">
                  {/* Speech Toggle */}
                  <Button
                    onClick={() => setSpeechEnabled(!speechEnabled)}
                    variant="outline"
                    size="sm"
                    className={`${speechEnabled ? 'bg-green-500/20 border-green-400' : 'bg-red-500/20 border-red-400'}`}
                  >
                    {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                  
                  {/* Replay Button */}
                  {speechEnabled && (
                    <Button
                      onClick={() => {
                        const message = ROBOT_WELCOME_MESSAGES[selectedYear as keyof typeof ROBOT_WELCOME_MESSAGES] || 
                          `Greetings, time traveler! I am CUSTOM-BOT-${selectedYear}. Welcome to the year ${selectedYear}. I am your temporal guide robot for this custom destination.`
                        speakMessage(message)
                      }}
                      variant="outline"
                      size="sm"
                      disabled={isSpeaking}
                      className="bg-blue-500/20 border-blue-400"
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  )}
                  
                  {/* Status Indicators */}
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className={`w-3 h-3 rounded-full ${isSpeaking ? 'bg-yellow-400 animate-pulse' : 'bg-purple-400'}`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fake Chatbot */}
        <Card className="mt-8 bg-black/30 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-bold tracking-wide text-white">
              <MessageCircle className="w-6 h-6" />
              🤖 Temporal Chat Assistant
            </CardTitle>
            <p className="text-sm opacity-70 text-white">Chat with beings from across time! (Results may vary)</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Chat Messages */}
              <div className="h-64 overflow-y-auto bg-black/50 rounded-lg p-4 space-y-3">
                {chatMessages.length === 0 ? (
                  <div className="text-center py-8 opacity-60">
                    <div className="text-2xl mb-2">💬</div>
                    <p className="text-white">Start a conversation across time!</p>
                  </div>
                ) : (
                  chatMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs px-3 py-2 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-purple-600 text-white' 
                          : message.era === 'past'
                            ? 'bg-amber-700 text-amber-100'
                            : 'bg-cyan-700 text-cyan-100'
                      }`}>
                        {message.sender === 'bot' && (
                          <div className="text-xs opacity-75 mb-1">
                            {message.era === 'past' ? '📜 From the Past' : '🚀 From the Future'}
                          </div>
                        )}
                        <p className="text-sm chat-text">{message.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {/* Chat Input */}
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask something to the past or future..."
                  className="bg-black/50 border-purple-500/50 text-white placeholder:text-gray-400"
                />
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  Send
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 opacity-60">
          <p className="text-sm text-white">
            ⚠️ Warning: This machine may cause temporal paradoxes, existential crises, and mild disappointment.
          </p>
          <p className="text-xs mt-2 text-white">
            No actual time travel occurred in the making of this app. Side effects may include false hope and wasted time.
          </p>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        
        .tech-font {
          font-family: 'Orbitron', 'Courier New', monospace;
        }
        
        .glow-text {
          text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
        }
        
        @keyframes hue-rotate {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        
        .message-text {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          line-height: 1.6;
          font-weight: 500;
        }
        
        .chat-text {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-weight: 400;
        }
      `}</style>
      </div>
    </>
  )
}
